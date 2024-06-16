import React, { useState, useEffect } from 'react';
import { useZxing } from 'react-zxing';
import { useMediaDevices } from 'react-media-devices';

const ScannerCodigoBarras = ({ setResult, setShowVideoFeed }) => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const { devices, error: mediaDevicesError } = useMediaDevices({ video: true });

  useEffect(() => {
    if (devices && devices.length > 0) {
      setSelectedDevice(devices[0].deviceId);
    }
  }, [devices]);

  const deviceId = selectedDevice;
  const { ref } = useZxing({
    paused: !deviceId,
    deviceId,
    onDecodeResult: (result) => {
      setResult(result.getText());
      setShowVideoFeed(false);
    },
  });

  // Tratamento de erro ao acessar os dispositivos de mídia
  if (mediaDevicesError) {
    return <p>Erro ao acessar dispositivos de mídia: {mediaDevicesError.message}</p>;
  }

  return (
    <video ref={ref} style={{ width: '100%', maxWidth: '380px', height: '100%', maxHeight: '250px' }} autoPlay playsInline />
  );
};

export default ScannerCodigoBarras;
