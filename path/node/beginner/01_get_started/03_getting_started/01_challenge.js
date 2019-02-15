const printMessage = delay => {
    console.log(`Hello after ${delay} seconds`);
}

let delay = 4;
setTimeout(printMessage, delay * 1000, delay);

delay = 8;
setTimeout(printMessage, delay * 1000, delay);