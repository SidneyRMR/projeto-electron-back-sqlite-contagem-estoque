import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, Toolbar } from '@mui/material';
import QRCode from 'react-qr-code';
import ScannerCodigoBarras from './ScannerCodigoBarras';

export default function ModalQRCode({ modalAberto, setModalAberto, enderecoLocalIP, produtosFiltrados }) {
  const [result, setResult] = useState('');

  return (
    <Modal
      open={modalAberto}
      onClose={() => setModalAberto(false)}
    >
      <Box sx={modalStyle}>
        <Toolbar sx={{ bgcolor: 'primary.main', justifyContent: 'center' }}>
          <Typography variant="h6" component="div" sx={{ color: 'primary.contrastText' }}>
            ACESSO MOBILE
          </Typography>
        </Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <QRCode value={`https://${enderecoLocalIP}:3000/mobileApp?enderecoLocalIP=${enderecoLocalIP}`} />
          {/* <ScannerCodigoBarras/> */}
        </Box>
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Button onClick={() => setModalAberto(false)} variant="contained">
            Fechar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};
