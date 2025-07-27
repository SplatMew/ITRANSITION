class Dice{
    constructor(faces){
        this.faces = faces.map(Number);
    }

    toString(){
        return `[${this.faces.join(',')}]`;
    }

    roll(faceIndex){
        return this.faces[faceIndex % this.faces.length];
    }

    get faceCount(){
        return this.faces.length;
    }
}

module.exports = Dice;