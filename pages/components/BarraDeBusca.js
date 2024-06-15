import React, { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ScannerIcon from '@mui/icons-material/Scanner';

export default function BarraDeBusca({ termoBuscaNome, termoBuscaCodigo, handleMudancaBuscaNome, handleMudancaBuscaCodigo, handleLeituraCodigoBarras, handleAbrirModal }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
      <TextField
        label="ID"
        value={termoBuscaCodigo}
        onChange={handleMudancaBuscaCodigo}
        inputProps={{ maxLength: 3 }}
        sx={{ width: 80, marginRight: 1 }}
      />
      <TextField
        label="Buscar produtos por nome"
        value={termoBuscaNome}
        onChange={handleMudancaBuscaNome}
        sx={{ flex: 1, marginRight: 1 }}
      />
      {isMobile ? (
        <Button
          variant="contained"
          onClick={handleLeituraCodigoBarras}
          sx={{
            minWidth: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
        >
          <ScannerIcon />
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleAbrirModal}
          sx={{
            minWidth: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 2
          }}
        >
          <QrCodeIcon />
          <span style={{ margin: "10px"}}>MOBILE</span>
        </Button>
      )}
    </Box>
  );
}
