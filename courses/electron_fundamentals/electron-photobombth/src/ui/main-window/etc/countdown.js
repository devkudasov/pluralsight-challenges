let timerId = null;

exports.start = (counterEl, delay, done) => {
  counterEl.innerHTML = delay--;

  const id = setInterval(function() {
    if (timerId !== null && timerId !== id) {
      clearInterval(timerId);
    } else {
      timerId = id;
    }

    if (!delay) {
      done();
      clearInterval(timerId);
      counterEl.innerHTML = '';
    } else {
      counterEl.innerHTML = delay--;
    }
  }, 1000);
};