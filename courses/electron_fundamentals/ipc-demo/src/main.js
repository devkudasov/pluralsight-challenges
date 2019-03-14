const electron = require('electron');
const countdown = require('./countdown');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

let windows = [];

app.on('ready', _ => {
    let x = 100, y = 100;
    [1, 2, 3].forEach(_ => {
        const win = new BrowserWindow({
            height: 600,
            width: 800,
            x,
            y
        });

        x += 100;
        y += 100;

        win.loadURL(`file://${__dirname}/countdown.html`);

        win.on('closed', _ => {
            windows = [];
        });

        windows.push(win);
    });
});

ipc.on('countdown:start', _ => {
    countdown(count => {
        windows.forEach(win => {
            win.webContents.send('countdown', count);
        });
    });
});