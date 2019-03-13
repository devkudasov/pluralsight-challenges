module.exports = function countdown(tick) {
    let count = 10;

    const timer = setInterval(_ => {
        tick(count--);

        if (count === 0) {
            clearInterval(timer);
        }
    }, 1000);
}