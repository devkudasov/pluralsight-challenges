const {ipcRenderer: ipc, desktopCapturer, screen} = require('electron');
const path = require('path');
const fs = require('fs');

function getMainSource(desktopCapturer, screen, done) {
  const options = {
    types: ['screen'],
    thumbnailSize: screen.getPrimaryDisplay().workAreaSize
  }

  desktopCapturer.getSources(options, (err, sources) => {
    if (err) return console.error('Cannot capture screen: ' + err);

    const isMainSource = source => source.name === 'Entire screen' || source.name === 'Screen 1';

    done(sources.filter(isMainSource)[0]);
  });
}

function writeScreenshot(png, targetDir) {
  const options = {
    flag: 'w'
  }

  fs.writeFile(targetDir, png, options, err => {
    if (err) return console.error('Failed to write screen: ' + err);
  });
}

function onCapture(event, targetDir) {
  getMainSource(desktopCapturer, screen, source => {
    const png = source.thumbnail.toPNG();
    const date = new Date();
    const fileName = '' + date.getFullYear() + date.getMonth() + date.getDate() + '.png';
    const filePath = path.join(targetDir, fileName);

    writeScreenshot(png, filePath);
  });
}

ipc.on('capture', onCapture);