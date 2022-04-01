import '../styles/globals.css';
import { UserContextProvider } from '../contexts/user-context';
import AdminAppBar from '../components/AdminAppBar';

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <AdminAppBar>
        <Component {...pageProps} />
      </AdminAppBar>
    </UserContextProvider>
  );
}

export default MyApp;
