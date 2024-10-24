import { useRouter } from 'next/router';
import { graphql, useLazyLoadQuery } from 'react-relay/hooks';
import { availabilityQuery } from '../relay/__generated__/availabilityQuery.graphql';

// JSON que mapea el código de la ciudad con su nombre, latitud y longitud
const cityData = {
  VCEI: {
    name: 'Venice',
    latitude: '45.440379',
    longitude: '12.3159547',
  },
};

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

const Availability = () => {
  const router = useRouter();

  // Forzamos los parámetros a ser de tipo string, extrayendo el primer valor si es un array
  const city = typeof router.query.city === 'string' ? router.query.city : router.query.city?.[0] || 'VCEI';
  const checkin = typeof router.query.checkin === 'string' ? router.query.checkin : router.query.checkin?.[0] || '2024-11-24';
  const checkout = typeof router.query.checkout === 'string' ? router.query.checkout : router.query.checkout?.[0] || '2024-11-26';

  // Obtener latitud y longitud del mapa según el código de la ciudad
  const selectedCity = cityData[city as keyof typeof cityData];

  if (!selectedCity) {
    return <div>City not found in the database.</div>;
  }

  // Realizamos la consulta al GraphQL API usando Relay
  const data = useLazyLoadQuery<availabilityQuery>(AvailabilityQuery, {
    nationality: 'Italia',
    checkin,
    checkout,
    city,
    filters: ['BESTARRANGMENT'],
    details: [{ required: '1', occupancy: '2', extrabed: false, cot: 'false' }],
    stars: ['4', '5'],
    category: null,
    first: 10,
    after: null,
    latitude: selectedCity.latitude,
    longitude: selectedCity.longitude,
  });

  // Verifica si la data contiene hoteles
  if (!data || !data.availability || !data.availability.hotels?.edges?.length) {
    return <div>No availability found for the given parameters.</div>;
  }

  return (
    <div className="availability-container">
      {data.availability.hotels.edges.length > 0 ? (
        data.availability.hotels.edges.map((edge) => {
          const node = edge?.node;
          if (!node) return null;

          return (
            <div key={node.name || 'unknown'} className="hotel-card">
              {/* Verifica que haya imágenes antes de renderizarlas */}
              {node.pictures?.[0] && (
                <img
                  src={node.pictures?.[0] || '/placeholder.jpg'} // Usa un placeholder si no hay imagen
                  alt={node.name || 'Hotel Image'}
                  className="hotel-image"
                />
              )}
              <div className="hotel-details">
                <h2>{node.name || 'Unknown Name'}</h2>
                <p>{node.address || 'Address not available'}</p>
                <p>Stars: {node.stars ? node.stars : 'No rating'}</p>
                <p>
                  Distance from center:{' '}
                  {node.position?.center_distance
                    ? `${node.position.center_distance} km`
                    : 'N/A'}
                </p>
                <p>
                  Price: {node.agreements?.[0]?.total ? `${node.agreements[0].total}` : 'Price not available'}
                </p>
              </div>
              <button className="select-button">Select</button>
            </div>
          );
        })
      ) : (
        <div>No hotels available</div>
      )}
    </div>
  );
};

export default Availability;