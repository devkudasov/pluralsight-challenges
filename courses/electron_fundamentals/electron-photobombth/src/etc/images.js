const path = require('path');
const fs = require('fs');

const errorLog = err => err && console.error(err);

exports.save = (picturePath, bytes) => {
  fs.writeFile(
    path.join(picturePath, `${new Date()}.png`),
    bytes.replace(/^data:image\/png;base64,/, ''),
    { encoding: 'base64' },
    errorLog
  );
};

exports.getPictureDir = app => {
  return path.join(app.getPath('pictures'), 'photobombth');
};

exports.mkdir = picturePath => {
  fs.stat(picturePath, (err, stats) => {
    if (err && err.code !== 'ENOENT') {
      errorLog(err);
    } else if (err || !stats.isDirectory()) {
      fs.mkdir(picturePath, errorLog);
    }
  });
};