// components/Header.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = ({ gerarRelatorioPDF }) => (
  <AppBar position="static" sx={{ marginBottom: 0, marginTop: 0, padding: 0 }}>
    <Toolbar>
      <img src="/logo.jpg" alt="Logo" style={{ width: 80, marginRight: 4 }} />
      <Typography variant="h5" component="div" sx={{ flexGrow: 1 , marginLeft: 4}}>
        Controle de Estoque
      </Typography>
      <Button color="inherit" onClick={gerarRelatorioPDF} className="hide-on-mobile">
        Gerar Relatório PDF
      </Button>
    </Toolbar>
  </AppBar>
);

export default Header;
