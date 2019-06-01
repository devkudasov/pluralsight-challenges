const { app, BrowserWindow, ipcMain: ipc } = require('electron');
const url = require('url');
const path = require('path');

const images = require('./etc/images');

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

  images.mkdir(images.getPictureDir(app));

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', _ => {
    mainWindow = null;
  });
});

ipc.on('image-captured', (event, bytes) => {
  images.save(images.getPictureDir(app), bytes);
});