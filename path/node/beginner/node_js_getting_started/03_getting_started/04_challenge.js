(function repeatTimer(delay) {
    let counter = 0;

    const timerId = setInterval(() => {
        console.log(`Hello World. ${delay}`);
        counter++;

        if (counter === 5) {
            clearInterval(timerId);
            repeatTimer(delay + 100);
        }
    }, delay);
})(100);