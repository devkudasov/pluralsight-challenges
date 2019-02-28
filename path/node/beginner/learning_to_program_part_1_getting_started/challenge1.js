const { getDieRoll } = require('./dieRoll');

const roll = getDieRoll(6);
console.log(`Your roll is ${roll}`);

if (roll != 1) {
    console.log('Greate roll!!!');
}

if (roll > 0 && roll < 4) {
    console.log('Greate roll!!!');
}

if (roll > 2 && roll < 6) {
    console.log('Greate roll!!!');
}

if (roll > 0 && roll < 4 || roll == 6) {
    console.log('Greate roll!!!');
}