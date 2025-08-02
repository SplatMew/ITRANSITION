const ArgumentValidator = require('./classes/ArgumentValidator');
const DiceParser = require('./classes/DiceParser');
const GameController = require('./classes/GameController');


    try {
        const args = process.argv.slice(2);
    
        const validator = new ArgumentValidator();
        validator.validate(args);
    
        const parser = new DiceParser();
        const dice = parser.parse(args);

        const game = new GameController(dice);
        game.start();
  } catch (error) {
        console.error(`Error: ${error.message}`);
  }

