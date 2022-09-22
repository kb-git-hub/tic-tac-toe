class Gameboard {
    constructor() {
        this.board = []
    }

    // build 9 board squares, apply IDs, push to this.board
    buildBoard() {
        for (let i = 0; i < 3; i++) {
            let letter = String.fromCharCode(65 + i)
            for (let j = 1; j <= 3; j++) {
                const boardSquare = document.createElement('div')
                const boardSquareID = `${letter}${j} `
                boardSquare.classList.add('boardSquare')
                boardSquare.setAttribute('id', `${boardSquareID}`)
                this.board.push(boardSquare)
            }
        }
    }

    // append this.board elements to GameBoard at interval
    displayBoard() {
        let intervalID   
        let divID = 0
        const gameBoard = document.querySelector('#gameBoard')
        intervalID = setInterval(() => {
            gameBoard.append(this.board[divID])
            divID++
            if (divID > 8) clearInterval(intervalID)
        }, 80)
    }

    // Place Piece
    placePiece(){}

    //Reset Board
    resetBoard(){}
}





class Player {
    constructor(piece = 'X', type = 'human'){
        this.piece = piece
        this.type = type
        this.wins = 0
    }
    updateWins(){}
 }


const player1 = new Player()

 class GameLogic { }




// game init
const board = new Gameboard()
board.buildBoard()
board.displayBoard()





