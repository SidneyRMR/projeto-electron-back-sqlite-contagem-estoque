import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Modal } from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ScannerIcon from '@mui/icons-material/Scanner';
import ModalCodigoBarras from './ModalCodigoBarras';

export default function BarraDeBusca({
  termoBuscaNome,
  termoBuscaCodigo,
  handleMudancaBuscaNome,
  handleMudancaBuscaCodigo,
  handleLeituraCodigoBarras,
  handleAbrirModal
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [leitorAberto, setLeitorAberto] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

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

  const handleAbrirLeitor = () => {
    setLeitorAberto(true);
    setModalAberto(true);
  };

  const handleFecharLeitor = () => {
    setLeitorAberto(false);
    setModalAberto(false);
  };

  const handleDetected = (codigo) => {
    console.log('Código de barras detectado:', codigo);
    // Aqui você pode realizar qualquer ação com o código de barras detectado
    handleFecharLeitor();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', margin: 1 }}>
      <TextField
        label="ID"
        value={termoBuscaCodigo}
        onChange={handleMudancaBuscaCodigo}
        inputProps={{ maxLength: 3 }}
        sx={{ width: 80, marginRight: 1 }}
      />
      <TextField
        label="Digite um produto"
        value={termoBuscaNome}
        onChange={handleMudancaBuscaNome}
        sx={{ flex: 1, marginRight: 1 }}
      />
      {isMobile ? (
        <>
          <Button
            variant="contained"
            onClick={handleAbrirLeitor}
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
          <ModalCodigoBarras
            onDetected={handleDetected}
            modalAberto={modalAberto}
            setModalAberto={setModalAberto}
          />
        </>
      ) : (
        <>
            <Button
            variant="contained"
            onClick={handleAbrirLeitor}
            sx={{
              minWidth: 56,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
              marginRight: 1
            }}
          >
            <ScannerIcon />
            <span style={{ margin: "10px" }}>Leitor</span>
          </Button>
        <ModalCodigoBarras
            onDetected={handleDetected}
            modalAberto={modalAberto}
            setModalAberto={setModalAberto}
          />
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
          <span style={{ margin: "10px" }}>MOBILE</span>
        </Button>

          </>
      )}
    </Box>
  );
}
