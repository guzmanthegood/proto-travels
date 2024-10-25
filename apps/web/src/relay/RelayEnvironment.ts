import { Environment, Network, RecordSource, Store } from 'relay-runtime';

// Define cómo Relay se comunica con tu servidor GraphQL
function fetchQuery(operation: any, variables: any) {
  const logRequest = process.env.NEXT_PUBLIC_LOG_REQUEST === 'true' || false;
  const logResponse = process.env.NEXT_PUBLIC_LOG_RESPONSE === 'true' || false;

  if (logRequest) {
    const cleanedQuery = operation.text.replace(/\s+/g, ' ');
    const cleanedVariables = JSON.stringify(variables);

    console.log('>>>> query: ', cleanedQuery);
    console.log('>>>> variables: ', cleanedVariables);
  }

  return fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text, // La consulta de GraphQL
      variables,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (logResponse) {
        console.log('<<<< response:', JSON.stringify(json).replace(/\s+/g, ' '));
      }
      return json;
    })
    .catch((error) => {
      console.error('<<<< GraphQL Error:', error);
      throw error;
    });
}

// Crear el entorno de Relay
const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
