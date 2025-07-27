const Dice = require ('./Dice.js');

class DiceParser {
    parse(args){
        return args.map(arg => {
            const faces = arg.split(',');
            return new Dice(faces);
        });
    }
}

module.exports = DiceParser;