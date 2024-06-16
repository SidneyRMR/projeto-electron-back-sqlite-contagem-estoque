const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    frame: true, // Manter a moldura da janela
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // Certifique-se de que a integração de node está desativada
      contextIsolation: true, // Certifique-se de que o isolamento de contexto está ativado
    },
    icon: {
      // Caminho para os ícones da janela nas diferentes dimensões
      ico: path.join(__dirname, '/logo16x16.ico'),
      ico32: path.join(__dirname, '/logo32x32.ico'),
      ico48: path.join(__dirname, '/logo48x48.ico'),
    },
  });

  // Define o título da janela
  mainWindow.setTitle('Gestão de Estoque');

  mainWindow.setMenu(null); // Remove a barra de menu

  // Carrega a aplicação React-Next
  mainWindow.loadURL('http://localhost:3000'); // Assumindo que o servidor de desenvolvimento React está rodando na porta 3000

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
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

ipcMain.on('close-app', () => {
  app.quit();
});
