class ArgumentValidator{
    validate(args){
        if(!args || args.length < 3){
            throw new Error(
                "Please specify at least three (3) dice.\n" + 
                "Example: node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3"
            );
        }

        for (const arg of args){
            const faces = arg.split(',');

            if(faces.length < 4 || faces.length > 20){
                throw new Error( 
                    `Each die must have between 4 and 20 faces. Found ${faces.length} faces in '${arg}'.\n` +
                    "Example: node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3"
                );
            }

            for(const face of faces){
                if(!face.match(/^\d+$/)){
                    throw new Error(
                        `Die face values must be positive integers. Found an invalid input value: '${face}'/\n` +
                        "Example: node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3" 
                    );
                }

                const faceValue = parseInt(face);
                if(faceValue < 1 || faceValue > 20){
                    throw new Error(
                        `Die face values must be between 1 and 20. Found an out of range value: '${faceValue}'.\n` +
                        "Example: node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3"
                    );
                }
            }
        }
    } 
}

module.exports = ArgumentValidator;