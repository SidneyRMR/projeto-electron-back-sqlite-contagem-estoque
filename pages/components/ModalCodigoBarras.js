import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Toolbar } from '@mui/material';
import { useMediaDevices } from 'react-media-devices';
import ScannerCodigoBarras from './ScannerCodigoBarras'; // Importe o componente ScannerCodigoBarras aqui

const ModalCodigoBarras = ({ onDetected, modalAberto, setModalAberto }) => {
  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [erroCamera, setErroCamera] = useState(null);
  const [result, setResult] = useState('');
  const [showVideoFeed, setShowVideoFeed] = useState(true);
  const { devices } = useMediaDevices({ video: true });

  useEffect(() => {
    const verificarSuporteCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          console.log('Stream de vídeo acessado com sucesso');
          stream.getTracks().forEach(track => track.stop()); // Parar o stream após verificar
        } else {
          throw new Error('API navigator.mediaDevices.getUserMedia não suportada');
        }
      } catch (error) {
        console.error('Erro ao acessar a câmera:', error);
        setErroCamera('Erro ao acessar a câmera. Verifique as permissões.');
        setCameraAtiva(false);
      }
    };

    verificarSuporteCamera();
  }, []);

  const handleOpenCamera = () => {
    setCameraAtiva(true);
    setModalAberto(true); // Garantir que a modal está aberta ao clicar em "Ativar Câmera"
  };

  const handleClose = () => {
    setCameraAtiva(false);
    setModalAberto(false);
    setShowVideoFeed(true);
    setResult(''); // Limpar o resultado ao fechar
  };

  const handleStartScanning = () => {
    // Implemente lógica de escaneamento aqui, se necessário
  };

  const handleStopScanning = () => {
    // Implemente lógica de parar escaneamento aqui, se necessário
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
        {cameraAtiva ? (
          <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            {showVideoFeed && <video style={{ width: '100%', height: '100%' }} autoPlay playsInline />}
            {!showVideoFeed && (
              <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                Código de Barras detectado: {result}
              </Typography>
            )}
            <Button onClick={handleStopScanning} variant="contained" sx={{ mt: 2 }}>
              Parar de Escanear
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
            <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
              Clique no botão abaixo para ativar a câmera e escanear o código de barras.
            </Typography>
            {erroCamera && (
              <Typography variant="body2" color="error">
                Erro ao acessar a câmera: {erroCamera}
              </Typography>
            )}
            <Button onClick={handleOpenCamera} variant="contained">
              Ativar Câmera
            </Button>
          </Box>
        )}
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button onClick={handleClose} variant="contained">
            Fechar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
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
