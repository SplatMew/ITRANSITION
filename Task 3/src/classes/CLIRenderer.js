const readlineSync = require('readline-sync');
class CLIRenderer{
    
    showDiceSelectionMenu(dice, excludeIndex = -1){
        console.log("Choose your dice: ");

        for (let i = 0; i < dice.length; i++){
            if(i != excludeIndex){
                console.log(`${i} - ${dice[i].faces.join(',')}`)
            }
        }

        console.log("X - exit");
        console.log("? - help");

        while(true){
            const choice = readlineSync.question("Your selection: ");
            if(choice.toUpperCase()==='X'){
                return null;
            } else if(choice === '?'){
                return '?';
            }

            const index = parseInt(choice);
            if(!isNaN(index) && index >=0 && index < dice.length &&index !== excludeIndex){
                return index;
            } else { 
                console.log("Invalid selection. Please Try again.");
            }
        }
    }
}

module.exports = CLIRenderer;