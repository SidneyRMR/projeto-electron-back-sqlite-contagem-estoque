import { useEffect, useState } from "react";
import {
  BrowserMultiFormatReader,
  DecodeHintType,
  BarcodeFormat, NotFoundException
} from "@zxing/library";
import { useMediaQuery, useTheme } from '@mui/material';


export default function BarcodeScanner() {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const [code, setCode] = useState("");
  const codeReader = new BrowserMultiFormatReader();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const formats = [
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.QR_CODE,
    // Adicione outros formatos aqui conforme necessário
  ];
  const hints = new Map();
  hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
  hints.set(DecodeHintType.TRY_HARDER, true);

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
        console.error("Error listing video devices:", error);
      }
    };
    

    listVideoDevices();

    return () => {
      codeReader.reset();
      setCode("");
    };
  }, []);

  const startScan = () => {
    if (selectedDeviceId) {
      codeReader.decodeFromInputVideoDeviceContinuously(selectedDeviceId, "video", (result, error) => {
        if (result && result.text) {
          console.log(`Found ${result.format} code:`, result);
          setCode(result.text);
          console.log
        }
        if (error && !(error instanceof NotFoundException)) {
          console.error("Decode error:", error);
          setCode("");
        }
      }, hints);
      console.log(`Started continuous decode from camera with id ${selectedDeviceId}`);
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

  return (
    <main className="wrapper" style={{ paddingTop: "2em" }}>
      <section className="container" id="demo-content">
        <div>
          <button className="button" id="startButton" onClick={startScan}>Start</button>
          <button className="button" id="resetButton" onClick={resetScan}>Reset</button>
        </div>

        <div>
        <video
  id="video"
  style={{
    width: "100%",
    height: "100%",
    border: "2px solid gray",
    objectFit: "cover", // Preenche o espaço sem distorcer a imagem
    transform: "scale(1.0)" // Exemplo de ajuste de zoom (aumenta em 20%)
  }}
></video>

        </div>

        <div id="sourceSelectPanel" style={{ display: videoInputDevices.length > 1 ? "block" : "none" }}>
          <label htmlFor="sourceSelect">Change video source:</label>
          <select id="sourceSelect" style={{ maxWidth: "400px" }} onChange={handleDeviceChange} value={selectedDeviceId}>
            {videoInputDevices.map(device => (
              <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
            ))}
          </select>
        </div>

        <label>Result:</label>
        <pre><code id="result">{code}</code></pre></section>

    </main>
  );
}
