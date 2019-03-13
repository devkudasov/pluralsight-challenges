const electron = require('electron');

const ipc = electron.ipcRenderer;

const startButton = document.getElementById('startButton');

startButton.addEventListener('click', _ => {
    ipc.send('countdown:start');
});

ipc.on('countdown', (ev, count) => {
    document.getElementById('count').innerHTML = count;
});