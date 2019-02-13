let intervalCounter = 0;

const timerId = setInterval(() => {
    console.log('Hello World!');
    intervalCounter++;

    if (intervalCounter === 5) {
        console.log('Done!');
        clearInterval(timerId);
    }
}, 1000);