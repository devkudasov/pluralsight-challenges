(function timer(delay) {
    setTimeout(() => {
        console.log(`Hello World. ${delay}`);
        timer(delay + 1);
    }, delay * 1000);
})(1);