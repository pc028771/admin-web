import CssBaseline from '@mui/material/CssBaseline';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page);

  return <CssBaseline>{getLayout(<Component {...pageProps} />)}</CssBaseline>;
}
