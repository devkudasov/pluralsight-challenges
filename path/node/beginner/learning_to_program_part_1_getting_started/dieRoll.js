exports.getDieRoll = (dieSize) => {
    return Math.ceil(Math.random() * dieSize);
}