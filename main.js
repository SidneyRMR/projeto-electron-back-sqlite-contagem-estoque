const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    frame: true, // Manter a moldura da janela
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, // Certifique-se de que a integração de node está desativada
      contextIsolation: true, // Certifique-se de que o isolamento de contexto está ativado
    },
    icon: path.join(__dirname, 'logo16x16.ico'), // Caminho para o ícone da janela
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
