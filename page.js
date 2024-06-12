const { app, BrowserWindow } = require('electron');
const path = require('path');
const isMobile = require('react-device-detect').isMobile;
const DesktopApp = require('./DesktopApp');
const MobileApp = require('./MobileApp');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  const App = isMobile ? <MobileApp /> : <DesktopApp />;

  mainWindow.loadURL(App);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
