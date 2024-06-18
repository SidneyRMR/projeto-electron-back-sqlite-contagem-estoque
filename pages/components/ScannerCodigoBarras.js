import React, { useEffect, useState, useRef } from "react";
import {
  BrowserMultiFormatReader,
  DecodeHintType,
  BarcodeFormat,
  NotFoundException
} from "@zxing/library";
import { useMediaQuery, useTheme, Box, Button, InputLabel, Select, MenuItem, Typography, Grid } from "@mui/material";

export default function BarcodeScanner({handleClose}) {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const [code, setCode] = useState("");
  const codeReader = new BrowserMultiFormatReader();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const videoRef = useRef(null);

  useEffect(() => {
    const listVideoDevices = async () => {
      try {
        const devices = await codeReader.listVideoInputDevices();
        setVideoInputDevices(devices);

        if (isMobile) {
          setSelectedDeviceId(devices.length > 1 ? devices[1].deviceId : "");
        } else {
          setSelectedDeviceId(devices.length > 0 ? devices[0].deviceId : "");
        }
      } catch (error) {
        console.error("Erro ao listar dispositivos:", error);
      }
    };

    listVideoDevices();

    return () => {
      stopStream();
      codeReader.reset();
      setCode("");
    };
  }, []);

  const startScan = () => {
    if (selectedDeviceId) {
      const formats = [BarcodeFormat.EAN_13];
      const hints = new Map();
      hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
      
      codeReader.decodeFromInputVideoDeviceContinuously(
        selectedDeviceId,
        "video",
        (result, error) => {
          if (result && result.text) {
            console.log(`Found ${result.format} code:`, result);
            setCode(result.text);
          }
          if (error && !(error instanceof NotFoundException)) {
            console.error("Erro de decodificação:", error);
            setCode("");
          }
        },
        hints
      );
      console.log(`Usando dispositivo ${selectedDeviceId} par ler o código de barras`);
    }
  };

  const resetScan = () => {
    codeReader.reset();
    setCode("");
    console.log("Reset.");
  };

  const handleDeviceChange = (e) => {
    setSelectedDeviceId(e.target.value);
  };

  const stopStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    codeReader.reset();
    setSelectedDeviceId("");
    handleClose()
  };
  

  return (
    <main className="wrapper" style={{ paddingTop: "2em" }}>
      <section className="container" id="demo-content">

        <div style={{ position: "relative" }}>
          <video
            ref={videoRef} // Referência para o elemento <video>
            id="video"
            style={{
              width: "100%",
              height: "100%",
              border: "2px solid gray",
              objectFit: "cover", // Preenche o espaço sem distorcer a imagem
              transform: "scale(1.0)" // Ajuste opcional de zoom
            }}
          ></video>
          {/* Quadrado central */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "120px",
              height: "80px",
              border: "2px solid red",
              zIndex: 10,
            }}
          ></div>
        </div>

        <Box
          id="sourceSelectPanel"
          sx={{ display: videoInputDevices.length > 1 ? "block" : "none", mt: 0 }}
        >
          {/* <InputLabel htmlFor="sourceSelect" sx={{ mb: 0 }}>Mudar câmera:</InputLabel> */}
          <Select
            id="sourceSelect"
            value={selectedDeviceId}
            onChange={handleDeviceChange}
            fullWidth
            variant="outlined"
            size="small"
            // sx={{ maxWidth: "400px" }}
          >
            {videoInputDevices.map((device) => (
              <MenuItem key={device.deviceId} value={device.deviceId}>
                {device.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* <InputLabel htmlFor="sourceSelect" sx={{ mb: 0 }}>Codigo Lido:</InputLabel> */}
        <Box sx={{ border: "1px solid #ccc", borderRadius: "4px", p: 1, mt: 1, marginBotton:0 }}>
          <code>Codigo Lido: {code ? code : "Nenhum código lido"}</code>

        </Box>
      </section>
      <Box sx={{ textAlign: 'center', mt: 1 }}>
      <Grid container justifyContent="space-between" spacing={0.5}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={startScan} sx={{width:100}}>
            Ler 
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={resetScan} sx={{width:100}}>
            Limpar
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={stopStream} sx={{width:100}}>
            Fechar
          </Button>
        </Grid>
      </Grid>
      </Box>
    </main>
  );
}
