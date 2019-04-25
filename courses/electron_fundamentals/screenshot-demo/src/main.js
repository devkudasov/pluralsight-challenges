const { app, BrowserWindow, BrowserWindowConstructorOptions, globalShortcut } = require('electron');

let mainWindow = null;

const mainWindowOptions = {
    width: 0,
    height: 0,
    resizable: false,
    frame: false
}

app.on('ready', _ => {
    mainWindow = new BrowserWindow(mainWindowOptions);

    mainWindow.loadURL(`file://${__dirname}/capture.html`);

    mainWindow.on('close', _ => {
        mainWindow = null;
    });

    globalShortcut.register('CmdOrCtrl+Alt+D', _ => {
        mainWindow && mainWindow.webContents.send('capture', app.getPath('pictures'));
    });
});