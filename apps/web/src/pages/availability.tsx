import { useRouter } from 'next/router';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import { availabilityQuery } from '../relay/__generated__/availabilityQuery.graphql';
import citiesData from '../data/cities.json';

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
      hotels {
        edges {
          node {
            name
            stars
            address
            pictures
            position {
              center_distance
            }
            agreements {
              total
            }
          }
        }
      }
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

const Availability = () => {
  const router = useRouter();

  // Parámetros de búsqueda
  const city = typeof router.query.city === 'string' ? router.query.city : router.query.city?.[0] || 'VCEI';
  const checkin = typeof router.query.checkin === 'string' ? router.query.checkin : router.query.checkin?.[0] || '2024-11-24';
  const checkout = typeof router.query.checkout === 'string' ? router.query.checkout : router.query.checkout?.[0] || '2024-11-26';
  const stars = ['4', '5']; // Parámetro fijo de estrellas
  const rooms = 1; // Número fijo de habitaciones

  const selectedCity = cityData[city as keyof typeof cityData];

  if (!selectedCity) {
    return <div>City not found in the database.</div>;
  }

  const data = useLazyLoadQuery<availabilityQuery>(AvailabilityQuery, {
    nationality: 'Italia',
    checkin,
    checkout,
    city,
    filters: ['BESTARRANGMENT'],
    details: [{ required: '1', occupancy: '2', extrabed: false, cot: 'false' }],
    stars,
    category: null,
    first: 10,
    after: null,
    latitude: selectedCity.latitude,
    longitude: selectedCity.longitude,
  });

  if (!data || !data.availability || !data.availability.hotels?.edges?.length) {
    return <div>No availability found for the given parameters.</div>;
  }

  const handleGoBack = () => {
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
        <div className="summary-row"><strong>City:</strong> {selectedCity.name}</div>
        <div className="summary-row"><strong>City Code:</strong> {city}</div>
        <div className="summary-row"><strong>Latitude:</strong> {selectedCity.latitude}</div>
        <div className="summary-row"><strong>Longitude:</strong> {selectedCity.longitude}</div>
        <div className="summary-row"><strong>Check-in:</strong> {checkin}</div>
        <div className="summary-row"><strong>Check-out:</strong> {checkout}</div>
        <div className="summary-row"><strong>Number of nights:</strong> {calculateNights(checkin, checkout)}</div>
        <div className="summary-row"><strong>Stars:</strong> {stars.join(', ')}</div>
        <div className="summary-row"><strong>Room distribution:</strong> 2 adults, no extrabed, no cot</div>
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
                  <p>
                    Distance from center: {node.position?.center_distance ? `${node.position.center_distance} km` : 'N/A'}
                  </p>
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
