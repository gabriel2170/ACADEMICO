import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider as AppContextProvider } from '../contexts/app';
import { Provider as AuthContextProvider } from '../contexts/auth';

function MyApp({ Component, pageProps }: AppProps) {

  // usando context de autenticação
  // usando o provider
  // Usando o component
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
