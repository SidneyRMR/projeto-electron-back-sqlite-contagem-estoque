import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Toolbar } from '@mui/material';
import ScannerCodigoBarras from './ScannerCodigoBarras'; // Importe o componente ScannerCodigoBarras aqui

const ModalCodigoBarras = ({ onDetected, modalAberto, setModalAberto, produtosFiltrados }) => {

  const handleClose = () => {
    setModalAberto(false);
  };

  return (
    <Modal
      open={modalAberto}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Toolbar sx={{ bgcolor: 'primary.main', justifyContent: 'center' }}>
          <Typography variant="h6" component="div" sx={{ color: 'primary.contrastText' }}>
            LEITOR CÓDIGO DE BARRAS
          </Typography>
        </Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <ScannerCodigoBarras handleClose={handleClose} onDetected={onDetected} produtosFiltrados={produtosFiltrados}/>
        </Box>
        {/* <Box sx={{ textAlign: 'center', mt: 0 }}>
          <Button onClick={() => setModalAberto(false)} variant="contained">
            Fechar
          </Button>
        </Box> */}
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Ajuste para telas menores
  maxWidth: 400, // Largura máxima para telas maiores
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

export default ModalCodigoBarras;
