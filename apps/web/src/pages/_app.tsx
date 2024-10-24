import '../styles/globals.css';
import { AppProps } from 'next/app'; // Importa los tipos de AppProps de Next.js
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import relayEnvironment from '../relay/RelayEnvironment';

function MyApp({ Component, pageProps }: AppProps) { // Usa AppProps para definir los tipos
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  );
}

export default MyApp;
