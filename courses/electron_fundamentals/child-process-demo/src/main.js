const path = require('path');
const url = require('url');

const { app, BrowserWindow } = require('electron');

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 100
    });

    mainWindow.webContents.openDevTools();

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'ui', "index.html"),
        protocol: "file:",
        slashes: true
    }));

    mainWindow.on('close', () => {
        mainWindow = null;
    });
});