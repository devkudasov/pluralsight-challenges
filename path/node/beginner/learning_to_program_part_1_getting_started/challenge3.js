const { getDieRoll } = require('./dieRoll');

for (let i = 0; i < 10; i++) {
    let roll = getDieRoll(6);
    
    if (roll >3) {
        console.log('*');
    } else {
        console.log('-');
    }
}