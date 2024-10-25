import { useRouter } from 'next/router';
import { graphql } from 'react-relay';
import citiesData from '../data/cities.json';
import { fetchQuery } from 'react-relay/hooks'; // Importamos fetchQuery para lanzar la consulta desde el servidor
import RelayEnvironment from '../relay/RelayEnvironment';

// Datos de ciudades con nombre, latitud y longitud
const cityData = citiesData.cities;

// Consulta GraphQL para la disponibilidad
const AvailabilityQuery = graphql`
  query availabilityQuery(
    $nationality: String!
    $checkin: String!
    $checkout: String!
    $city: String
    $filters: [FilterTypeEnum]
    $details: [DetailsInputObject!]!
    $stars: [String!]!
    $category: CategoryTypeEnum
    $first: Int
    $after: String
    $latitude: String
    $longitude: String
  ) {
    availability(
      nationality: $nationality
      filters: $filters
      checkin: $checkin
      checkout: $checkout
      category: $category
      city: $city
      details: $details
      stars: $stars
      first: $first
      after: $after
      latitude: $latitude
      longitude: $longitude
    ) {
      search {
        number
      }
      hotels {
        edges {
          node {
            name
            stars
            address
            pictures
            latitude
            longitude
            position {
              center_distance
            }
            agreements {
              id
              total
              available
              roomType
              roomBasis
              mealBasis
              special
              cancelationPolicies
              rooms {
                type
                required
                occupancy
                price {
                  from
                  to
                  price
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
      id
    }
  }
`;

// Función para calcular el número de noches
const calculateNights = (checkin: string, checkout: string) => {
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);

  if (isNaN(checkinDate.getTime()) || isNaN(checkoutDate.getTime())) {
    return 0; // Si alguna de las fechas es inválida
  }

  const diffTime = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// `getServerSideProps` para lanzar la consulta en el servidor antes de renderizar la página
export async function getServerSideProps(context) {
  const { city, checkin, checkout } = context.query;

  // Si los parámetros no están definidos, devolver valores por defecto
  const validCity = city || 'VCEI';
  const validCheckin = checkin || '2024-11-24';
  const validCheckout = checkout || '2024-11-26';

  const selectedCity = cityData[validCity];

  if (!selectedCity) {
    return { notFound: true }; // Si no se encuentra la ciudad, devolver un error 404
  }

  // Hacer la consulta al servidor GraphQL con los parámetros de la URL
  const data = await fetchQuery(RelayEnvironment, AvailabilityQuery, {
    nationality: 'Italia',
    checkin: validCheckin,
    checkout: validCheckout,
    city: validCity,
    filters: ['BESTARRANGMENT'],
    details: [{ required: '1', occupancy: '2', extrabed: false, cot: 'false' }],
    stars: ['4', '5'],
    category: null,
    first: 10,
    after: null,
    latitude: selectedCity.latitude,
    longitude: selectedCity.longitude,
  }).toPromise();

  return {
    props: {
      data,
      query: {
        city: validCity,
        checkin: validCheckin,
        checkout: validCheckout,
        latitude: selectedCity.latitude,
        longitude: selectedCity.longitude,
        cityName: selectedCity.name,
      },
    },
  };
}

const Availability = ({ data, query }) => {
  const { city, checkin, checkout, latitude, longitude, cityName } = query;

  if (!data || !data.availability || !data.availability.hotels?.edges?.length) {
    return <div>No availability found for the given parameters.</div>;
  }

  const handleGoBack = () => {
    const router = useRouter();
    router.push({
      pathname: '/',
      query: {
        city,
        checkin,
        checkout,
      },
    });
  };

  return (
    <div className="availability-page">
      {/* Barra lateral con la información de búsqueda */}
      <aside className="sidebar">
        <h2>Search Summary</h2>
        <div className="summary-row"><strong>City:</strong> {cityName}</div>
        <div className="summary-row"><strong>City Code:</strong> {city}</div>
        <div className="summary-row"><strong>Latitude:</strong> {latitude}</div>
        <div className="summary-row"><strong>Longitude:</strong> {longitude}</div>
        <div className="summary-row"><strong>Check-in:</strong> {checkin}</div>
        <div className="summary-row"><strong>Check-out:</strong> {checkout}</div>
        <div className="summary-row"><strong>Number of nights:</strong> {calculateNights(checkin, checkout)}</div>
        <div className="summary-row"><strong>Stars:</strong> {'4, 5'}</div>
        <div className="summary-row"><strong>Room distribution:</strong> 2 adults, no extrabed, no cot</div>
        <div className="summary-row">
          <strong>Search Code:</strong> {`${data.availability.search.number}`}
        </div>
        <button className="go-back-button" onClick={handleGoBack}>Go back to search</button>
      </aside>

      {/* Sección central con la lista de hoteles */}
      <main className="content">
        <div className="availability-container">
          {data.availability.hotels.edges.map((edge) => {
            const node = edge?.node;
            if (!node) return null;

            return (
              <div key={node.name || 'unknown'} className="hotel-card">
                {/* Columna izquierda - Imagen */}
                <div className="hotel-image-container">
                  {node.pictures?.[0] && (
                    <img
                      className="hotel-image"
                      src={node.pictures?.[0] || '/placeholder.jpg'}
                      alt={node.name || 'Hotel Image'}
                    />
                  )}
                </div>

                {/* Columna central - Información del hotel */}
                <div className="hotel-info">
                  <h2>{node.name || 'Unknown Name'}</h2>
                  <p>{node.address || 'Address not available'}</p>
                  <p>Stars: {node.stars ? node.stars : 'No rating'}</p>
                  <p>Distance from center: {node.position?.center_distance ? `${node.position.center_distance} km` : 'N/A'}</p>
                  {node.agreements.map((agreement) => (
                    <div key={agreement.id}>
                      <p>Agreement ID: {agreement.id}</p>
                    </div>
                  ))}
                </div>

                {/* Columna derecha - Precio y botón */}
                <div className="hotel-price">
                  <span className="price">
                    ${parseFloat(node.agreements?.[0]?.total || '0').toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <button className="select-button">Select</button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Availability;
