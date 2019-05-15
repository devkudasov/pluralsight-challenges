const video = require('./etc/video');

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
    const bytes = video.captureBytes(videoEl, canvasEl);
    photosEl.appendChild(formatImgTag(bytes));
  });
});