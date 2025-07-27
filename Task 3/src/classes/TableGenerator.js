const Table = require('cli-table3');
const ProbabilityCalculator = require('./ProbabilityCalculator.js');
require ('colors');

class TableGenerator{
    generateProbabilityTable(dice){
        const probCalculator = new ProbabilityCalculator();
        const probabilities = probCalculator.calculateProbabilities(dice);

        console.log("\nNon-transitive Dice Game Help".bold);
        console.log("============================\n");
        console.log("This game uses dice with special number configurations that create a non-transitive relationship.");
        console.log("This means Die A might usually beat Die B, Die B might usually beat Die C, but Die C might usually beat Die A.");
        console.log("The table below shows the probability of the row dice winning against the column dice.\n");
        console.log("Probability of winning for the row dice against column dice:".underline);

        const diceStrings = dice.map(d => d.faces.join(','));
        const maxWidth = Math.max(...diceStrings.map(s => s.length)) + 2;

        const table = new Table({
            head: ['Row ↓ Col →'.cyan, ...diceStrings.map( s => s.cyan)],
            colWidths: [maxWidth, ...diceStrings.map(()=> maxWidth)],
            style:{}
        });

        for(let i = 0; i < dice.length; i++){
            const row = [diceStrings[i]];
            for(let j = 0; j < dice.length; j++){
                if(i === j){
                    row.push('-');
                }else{
                    const probability = probabilities[i][j].toFixed(4);
                    if(probabilities[i][j] > 0.5){
                        row.push(probability.green);
                    } else {
                        row.push(probability.red);
                    }
                }
            }
            table.push(row);
        }
        return table.toString() + "\n\nHigher values shown in " + "green".green + "indicate favorable matchups.\n";
    }
}

module.exports = TableGenerator;