const __constraints = {
  audio: false,
  video: {
    width: 853,
    height: 480,
  }
};

const __getUserMediaSuccess = (videoEl, stream) => {
  videoEl.srcObject = stream;
};

const __getUserMediaError = error => {
  console.error('Camera error: ', error);
};

exports.init = (nav, videoEl) => {
  nav.getUserMedia(__constraints, stream => __getUserMediaSuccess(videoEl, stream), __getUserMediaError);
};