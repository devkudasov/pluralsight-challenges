const { ipcRenderer: ipc } = require('electron');
const video = require('./etc/video');
const countdown = require('./etc/countdown');

function formatImgTag(bytes) {
  const div = document.createElement('div');
  div.classList.add('photo');
  const close = document.createElement('div');
  close.classList.add('photoClose');
  const img = new Image();
  img.classList.add('photoImg');
  img.src = bytes;
  div.appendChild(img);
  div.appendChild(close);
  return div;
}

document.addEventListener('DOMContentLoaded', _ => {
  const videoEl = document.getElementById('video');
  const canvasEl = document.getElementById('canvas');
  const recordEl = document.getElementById('record');
  const photosEl = document.querySelector('.photosContainer');
  const counterEl = document.getElementById('counter');

  video.init(navigator, videoEl);

  recordEl.addEventListener('click', _ => {
    countdown.start(counterEl, 3, _ => {
      const bytes = video.captureBytes(videoEl, canvasEl);
      ipc.send('image-captured', bytes);
      photosEl.appendChild(formatImgTag(bytes));
    });
  });
});