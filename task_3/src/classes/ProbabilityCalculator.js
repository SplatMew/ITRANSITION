class ProbabilityCalculator{
    calculateProbabilities (dice){
        const n = dice.length;
        const probabilities = Array(n).fill().map(() => Array(n).fill(0));

        for(let i = 0; i < n; i++){
            for(let j = 0; j < n; j++){
                if(i!=j){
                    probabilities[i][j] = this.calculateWinProbability(dice[i], dice[j]);
                } else{
                    probabilities[i][j] = 0.5;
                }
            }
        }
        return probabilities;
    }

    calculateWinProbability(dice1, dice2){
        let wins = 0; 
        const totalCombinations = dice1.faces.length * dice2.faces.length;

        for(const face1 of dice1.faces){
            for(const face2 of dice2.faces){
                if(face1 > face2){
                    wins++;
                }
            }
        }
        return wins/totalCombinations;
    }
}

module.exports = ProbabilityCalculator;