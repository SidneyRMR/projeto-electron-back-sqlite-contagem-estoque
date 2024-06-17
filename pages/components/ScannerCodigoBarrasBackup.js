import React, { useState, useEffect, useRef } from "react";
import {
  BrowserMultiFormatReader,
  NotFoundException
} from "@zxing/library";
import { Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

export default function ScannerCodigoBarras({ handleClose }) {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [code, setCode] = useState("");
  const [videoInputDevices, setVideoInputDevices] = useState([]);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();

  useEffect(() => {
    // Verifica se enumerateDevices é suportado
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          const videoDevices = devices.filter(device => device.kind === 'videoinput');
          setVideoInputDevices(videoDevices);
          if (videoDevices.length > 0) {
            setSelectedDeviceId(videoDevices[0].deviceId);
          }
        })
        .catch(error => console.error('enumerateDevices error: ', error));
    } else {
      console.log('enumerateDevices not supported');
      // Configuração padrão, caso enumerateDevices não seja suportado
      setVideoInputDevices([{ deviceId: 'default', label: 'Câmera Padrão' }]);
      setSelectedDeviceId('default');
    }
  }, []);

  const resetClick = () => {
    codeReader.reset();
    setCode("");
  };

  const decodeContinuously = (deviceId) => {
    const constraints = {
      video: {
        deviceId: { exact: deviceId }
      },
      audio: false
    };

    // Verifica se getUserMedia é suportado
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        const videoElement = videoRef.current;
        if (videoElement) {
          videoElement.srcObject = stream;
          videoElement.play();
          streamRef.current = stream;
          codeReader.decodeFromVideoElement(videoElement, (result, err) => {
            if (result) {
              console.log("Found QR code!", result);
              setCode(result.text);
            }
            if (err && !(err instanceof NotFoundException)) {
              console.error(err);
            }
          });
        }
      }).catch((err) => console.error('getUserMedia error: ', err));
    } else {
      console.log('getUserMedia not supported');
      // Tratamento de erro ou fallback
      alert('Este navegador não suporta acesso à câmera. Por favor, tente em outro navegador.');
    }
  };

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    codeReader.reset();
    setSelectedDeviceId("");
  };

  useEffect(() => {
    if (selectedDeviceId) {
      decodeContinuously(selectedDeviceId);
    } else {
      stopStream();
    }
    return () => {
      stopStream();
    };
  }, [selectedDeviceId]);

  return (
    <main className="wrapper">
      <FormControl variant="outlined" fullWidth sx={{ textAlign: 'center', marginBottom: 1 }}>
        <InputLabel id="sourceSelectLabel">Selecione a câmera:</InputLabel>
        <Select
          labelId="sourceSelectLabel"
          id="sourceSelect"
          value={selectedDeviceId}
          onChange={(e) => setSelectedDeviceId(e.target.value)}
          label="Selecione a câmera:"
        >
          {videoInputDevices.map((device) => (
            <MenuItem key={device.deviceId} value={device.deviceId}>
              {device.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div>
        <video ref={videoRef} id="video" width="100%" height="auto" autoPlay playsInline />
      </div>

      <label>Result:</label>
      <pre>
        <code id="result">{code}</code>
      </pre>
      <Box sx={{ textAlign: 'center', mt: 0 }}>
        <Button variant="contained" color="primary" onClick={resetClick} sx={{ m: 1 }}>
          Reset
        </Button>
        <Button variant="contained" color="secondary" onClick={stopStream} sx={{ m: 1 }}>
          Fechar Câmera
        </Button>
      </Box>
    </main>
  );
}
