import React, { useEffect, useState, useRef } from "react";
import {
  BrowserMultiFormatReader,
  DecodeHintType,
  BarcodeFormat,
  NotFoundException
} from "@zxing/library";
import { useMediaQuery, useTheme, Box, Button, Select, MenuItem, Grid } from "@mui/material";

export default function ScannerCodigoBarras({handleClose, onDetected, produtosFiltrados}) {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("red");
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
            console.log(`Formato de codigo ${result.format}:`, result.text);
            setCode(result.text);
            verificarCodigo(result.text);
          }
          if (error && !(error instanceof NotFoundException)) {
            console.error("Erro de decodificação:", error);
            setCode("");
          }
        },
        hints
      );
      console.log(`Usando dispositivo ${selectedDeviceId} para ler o código de barras`);
    }
  };

  const verificarCodigo = (codigo) => {
    const index = produtosFiltrados.findIndex(produto => produto.ean == codigo);
    if (index !== -1) {
      const produto = produtosFiltrados[index];
      console.log(`Produto encontrado: ${produto.nome}`);
      setMessage(`Produto encontrado: ${produto.nome}`);
      setMessageColor("green");
      onDetected(produto);

      // handleClose();

    } else {
      console.log("Produto não encontrado!");
      setMessage("Produto não encontrado!");
      setMessageColor("red");
    }
  };

  const resetScan = () => {
    codeReader.reset();
    setCode("");
    setMessage("");
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
    handleClose();
  };

  return (
    <main className="wrapper" style={{ paddingTop: 0 }}>
      <section className="container" id="demo-content">
        <div style={{ position: "relative" }}>
          <video
            ref={videoRef}
            id="video"
            style={{
              width: "100%",
              height: "100%",
              border: "2px solid gray",
              objectFit: "cover",
              transform: "scale(1.0)"
            }}
          ></video>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "140px",
              height: "80px",
              border: "2px solid red",
              zIndex: 10,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              // backgroundColor: messageColor,
              color: messageColor,
              textAlign: "center",
              padding: "5px 0",
              zIndex: 10,
              marginBottom:10
            }}
          >
            {message}
          </div>
        </div>

        <Box
          id="sourceSelectPanel"
          sx={{ display: videoInputDevices.length > 1 ? "block" : "none", mt: 0 }}
        >
          <Select
            id="sourceSelect"
            value={selectedDeviceId}
            onChange={handleDeviceChange}
            fullWidth
            variant="outlined"
            size="small"
          >
            {videoInputDevices.map((device) => (
              <MenuItem key={device.deviceId} value={device.deviceId}>
                {device.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ border: "1px solid #ccc", borderRadius: "4px", p: 1, mt: 1 }}>
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
