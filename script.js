class Gameboard{
    constructor(){
        this.board = []
    }
    buildBoard(){
        /*

        a1 a2 a3

        */

    }
}

// const board = new Gameboard()


for (let i = 0; i < 3; i++) {
    let letter = String.fromCharCode(65+i)
    for (let j = 1; j <=3; j++) {  
        let value = `${letter}${j} ` 
        console.log(value);    
    }
}


