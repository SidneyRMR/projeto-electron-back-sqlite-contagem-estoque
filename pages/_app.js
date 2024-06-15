import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/themes.js'; // Importe o tema personalizado criado
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normaliza o CSS e aplica o tema */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
