class Gameboard {
    constructor() {
        this.board = []
        this.drawspeed = 65
    }

    // build 9 board squares, apply IDs, push to this.board
    buildBoard() {
        for (let i = 0; i < 3; i++) {
            let letter = String.fromCharCode(65 + i)
            for (let j = 1; j <= 3; j++) {
                const boardSquare = document.createElement('div')
                const boardSquareID = `${letter}${j}`
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
            gameBoard.appendChild(this.board[divID])
            divID++
            if (divID > 8) clearInterval(intervalID)
        }, this.drawspeed)
    }
    // Place Piece
    placePiece() { }
    //Reset Board
    resetBoard() { }
}



class Player {
    constructor(piece = 'X', type = 'human') {
        this.piece = piece
        this.type = type
        this.wins = 0
    }
    displayWins() { }
}




class GameLogic {
    constructor(p1 = 'player', p2 = 'player') {
        this.p1 = p1
        this.p2 = p2
    }
    verifyGameType() { }
    createPlayers() { }
    startGame() { }
    resetGame() { }
    checkEmptySquare() { }
    checkforWin() { }
    updateWinner() { }
}


// game init
const player1 = new Player()
const board = new Gameboard()
const game = new GameLogic()
board.buildBoard()
board.displayBoard()



// User interface
const
    gameBoard = document.querySelector('#gameBoard'),
    startButton = document.querySelector('#bn-new-game'),
    resetButton = document.querySelector('#bn-reset-game'),

    gameTypeSelectorPvP = document.querySelector('#btn-pvp'), 
    gameTypeSelectorPvAI = document.querySelector('#btn-pvc'),

    p1Score = document.querySelector('#p1Score'),
    p2Score = document.querySelector('#p2Score')

    
/*
Event Listeners
*/

//Event Delegator for Dynamic boardSquares
const handleBoardClick = e => {
    const clickedSquare = e.target.getAttribute('id')
    if (clickedSquare !== 'gameBoard'){console.log(clickedSquare)}
}
gameBoard.addEventListener('click', handleBoardClick)
