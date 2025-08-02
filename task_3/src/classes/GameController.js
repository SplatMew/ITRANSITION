const FairRandomGenerator = require('./FairRandomGenerator');
const TableGenerator = require('./TableGenerator');
const CLIRenderer = require ('./CLIRenderer');

class GameController{

    constructor(dice){
        this.dice = dice;
        this.fairRandomGenerator = new FairRandomGenerator();
        this.tableGenerator = new TableGenerator();
        this.cliRenderer = new CLIRenderer();
    }

    start(){
        console.log("Let's determine who makes the first move.");
        const firstMoveResult = this.fairRandomGenerator.generateFairNumber(0, 1, msg => console.log(msg));
    
        if (firstMoveResult === null) {
            console.log("Game cancelled.");
            return;
        }
    
    const computerGoesFirst = firstMoveResult === 1;
    
    let computerDiceIndex, userDiceIndex;
    
    if (computerGoesFirst) {
        console.log("I make the first move.");
        computerDiceIndex = Math.floor(Math.random() * this.dice.length);
        console.log(`I choose the ${this.dice[computerDiceIndex]} dice.`);
      
        while (true) {
            userDiceIndex = this.cliRenderer.showDiceSelectionMenu(this.dice, computerDiceIndex);
        
            if (userDiceIndex === null) {
                console.log("Game cancelled.");
                return;
            } else if (userDiceIndex === '?') {
                this.showHelp();
                continue;
            } else {
                break;
            }
        }  
      
        console.log(`You choose the ${this.dice[userDiceIndex]} dice.`);
        } else {
            console.log("You make the first move.");
      
    
        while (true) {
            userDiceIndex = this.cliRenderer.showDiceSelectionMenu(this.dice);
        
            if (userDiceIndex === null) {
                console.log("Game cancelled.");
                return;
            } else if (userDiceIndex === '?') {
                this.showHelp();
                continue;
            } else {
                  break;
            }
        }
      
        console.log(`You choose the ${this.dice[userDiceIndex]} dice.`);
      
        do {
            computerDiceIndex = Math.floor(Math.random() * this.dice.length);
        } while (computerDiceIndex === userDiceIndex);
      
        console.log(`I choose the ${this.dice[computerDiceIndex]} dice.`);
    }
    
        console.log("It's time for my roll.");
        const computerRoll = this.fairRandomGenerator.performRoll(this.dice[computerDiceIndex], msg => console.log(msg));
        if (computerRoll === null) {
            console.log("Game cancelled.");
            return;
        }
    
        console.log("It's time for your roll.");
        const userRoll = this.fairRandomGenerator.performRoll(this.dice[userDiceIndex], msg => console.log(msg));
        if (userRoll === null) {
            console.log("Game cancelled.");
            return;
        }
    
        if (userRoll > computerRoll) {
            console.log(`You win (${userRoll} > ${computerRoll})!`);
        } else if (computerRoll > userRoll) {
            console.log(`I win (${computerRoll} > ${userRoll})!`);
        } else {
            console.log(`It's a tie (${userRoll} = ${computerRoll})!`);
        }
    }
  
    showHelp() {
        console.log(this.tableGenerator.generateProbabilityTable(this.dice));
    
        console.log("Game Instructions:");
        console.log("1. First, we determine who goes first using a fair random protocol");
        console.log("2. The first player selects a die");
        console.log("3. The second player selects a different die");
        console.log("4. Both players roll their dice using the fair random protocol");
        console.log("5. The player with the higher roll wins\n");
    }
}

module.exports = GameController;