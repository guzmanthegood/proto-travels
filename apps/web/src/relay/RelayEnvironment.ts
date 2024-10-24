import { Environment, Network, RecordSource, Store } from 'relay-runtime';

// Define cómo Relay se comunica con tu servidor GraphQL
function fetchQuery(operation: any, variables: any) {
  return fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text, // La consulta de GraphQL
      variables,
    }),
  }).then(response => response.json());
}

// Crear el entorno de Relay
const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
