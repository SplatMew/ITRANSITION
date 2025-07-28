const CryptoProvider = require('./CryptoProvider');
const readlineSync = require('readline-sync');
const crypto = require('crypto');

class FairRandomGenerator {
    constructor(){
        this.cryptoProvider = new CryptoProvider();
    }

    generateFairNumber(min, max, displayCallback){
        const key = this.cryptoProvider.generateSecureKey();
        const computerNumber = crypto.randomInt(min, max + 1);          //I implemented, or rather: used the "out of the box" method from crypto to generate the randomInt here.
        const hmac = this.cryptoProvider.calculateHMAC(computerNumber,key);

        displayCallback(`I selected a random value in the range ${min} . . ${max} (HMAC=${hmac}).`);
        displayCallback("Trye to guess my selection.");

        for (let i = min; i <=max; i++){
            displayCallback(`${i} - ${i}`);
        }
        displayCallback("X - exit");
        displayCallback("? - help");

        const userNumber = this.getUserNumber(min, max);
        if(userNumber === null){
            return null;
        }

        displayCallback(`My selection: ${computerNumber} (KEY = ${key.toString('hex').toUpperCase()}).`);

        return computerNumber;
    }

    getUserNumber(min, max){
        while(true){
            const choice = readlineSync.question("Your selection: ");

            if(choice.toUpperCase() === 'X'){
                return null;
            } else if(choice === '?'){
                console.log("Please select a number to add to the computer's number.");
                continue;
            }
            const num = parseInt(choice);
            if(!isNaN(num) && num >= min && num <=max){
                return num;
            } else{
                console.log(`Invalid Selection. Please choose a number between ${min} and ${max}, 'X' to exit, or '?' for help.`);

            }
        }
    }

    performRoll(dice,displayCallback){
        const key = this.cryptoProvider.generateSecureKey();
        const computerNumber = crypto.randomInt(0, dice.faceCount - 1);
        const hmac = this.cryptoProvider.calculateHMAC(computerNumber, key);

        displayCallback(`I selected a random value in the range 0..${dice.faceCount - 1} (HMAC=${hmac}).`);
        displayCallback(`Add your number modulo ${dice.faceCount}.`);

        for(let i = 0; i<dice.faceCount; i++){
            displayCallback(`${i} - ${i}`);
        }
        displayCallback("X - exit");
        displayCallback("? - help");

        const userNumber = this.getUserNumber(0, dice.faceCount - 1 );
        if(userNumber === null){
            return null;
        }

        displayCallback(`My number is ${computerNumber} (KEY=${key.toString('hex').toUpperCase()}).`);
    
        const result = (computerNumber + userNumber) % dice.faceCount;
        displayCallback(`The fair number generation result is ${computerNumber} + ${userNumber} = ${result} (mod ${dice.faceCount}).`);
    
        const rollResult = dice.roll(result);
        displayCallback(`Roll result is ${rollResult}.`);
    
    return rollResult;
    }

}

module.exports = FairRandomGenerator;