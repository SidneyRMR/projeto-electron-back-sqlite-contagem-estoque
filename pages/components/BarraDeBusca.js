import React from 'react';
import { TextField, Button, Box } from '@mui/material';

export default function BarraDeBusca({ termoBuscaNome, termoBuscaCodigo, handleMudancaBuscaNome, handleMudancaBuscaCodigo, handleLeituraCodigoBarras, handleAbrirModal, isMobile }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
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
        <Button variant="contained" onClick={handleLeituraCodigoBarras}>
          Ler Código de Barras
        </Button>
      ) : (
        <Button variant="contained" onClick={handleAbrirModal}>
          QR Code Mobile
        </Button>
      )}
    </Box>
  );
}
