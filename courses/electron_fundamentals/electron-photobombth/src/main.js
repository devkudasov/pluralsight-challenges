const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

let mainWindow = null;

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 725,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'ui', 'main-window', 'main-window.html'),
    protocol: 'file',
    slashes: true
  }));

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', _ => {
    mainWindow = null;
  });
});