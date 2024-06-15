import { createTheme } from '@mui/material/styles';

// Defina suas cores principais aqui
const theme = createTheme({
  palette: {
    primary: {
      main: '#363531', // Cor de fundo predominante (escura)
    },
    text: {
      primary: '#363531', // Cor do texto principal (branco)
      //primary: '#FFFFFF', // Cor do texto principal (branco)
    },
    secondary: {
      main: '#ff5722', // Cor de destaque/contorno (laranja)
    },
  },
});

export default theme;