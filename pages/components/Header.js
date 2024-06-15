// components/Header.js
const isMobile = require('react-device-detect').isMobile;
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = ({ gerarRelatorioPDF }) => (
  <AppBar position="static" sx={{ marginBottom: 4 }}>
    <Toolbar>
      <img src="/logo.jpg" alt="Logo" style={{ width: 40, marginRight: 16 }} />
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Controle de Estoque
      </Typography>
      {isMobile ? "" : <Button color="inherit" onClick={gerarRelatorioPDF}>Gerar Relatório PDF</Button>}
    </Toolbar>
  </AppBar>
);

export default Header;
