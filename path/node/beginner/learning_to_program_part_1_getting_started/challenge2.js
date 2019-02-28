const { getDieRoll } = require('./dieRoll');

let roll = getDieRoll(6);
console.log(`Your roll is ${roll}`);

while (roll != 6) {
    roll = getDieRoll(6);
    console.log(`Your roll is ${roll}`);
}

console.log('Greate roll!!!');