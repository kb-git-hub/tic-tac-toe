/*
Classes
*/
class Gameboard {
    constructor(gameBoard) {
        this.board = []
        this.drawspeed = 65
        this.gameBoard = gameBoard
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
        this.displayBoard()
    }

    // append this.board elements to GameBoard at interval
    displayBoard() {
        let intervalID
        let divID = 0
        intervalID = setInterval(() => {
            this.gameBoard.appendChild(this.board[divID])
            divID++
            if (divID > 8) clearInterval(intervalID)
        }, this.drawspeed)
    }

    //Reset Board
    resetBoard() {
        this.board = []
        this.gameBoard.innerHTML = ''
        this.buildBoard()
    }
}

class Player {
    constructor(piece) {
        this.type = 'player'
        this.piece = piece
        this.wins = 0
    }
    displayWins() { }
}

////////////////////////////////////

class GameLogic {
    constructor(p1, p2, gameType = 'pvp') {
        this.p1 = p1
        this.p2 = p2
        this.gameType = gameType
        this.activateGame = false
        this.turn = null
        this.piecesArray = []
    }

    startGame() {
        this.activateGame = true
        this.turn = this.p1


    }

    resetGame() {
        this.activateGame = false
    }

    checkSquareOccupied(square) {
        for (const arrayItem of this.piecesArray) {
            if (arrayItem.square === square) {
                return (arrayItem.piece ? true : false)
            }
        }
    }

    checkforResult() { }
    updateWinner() { }

    updatePiecesArray(gameBoard) {
        this.piecesArray = []
        for (const board of gameBoard) {
            let item = {
                square: board.getAttribute('id'),
                piece: board.textContent
            }
            this.piecesArray.push(item)
        }
    }
}


/*
Functions
*/
const startGame = () => {
    startButton.classList.add('active')
    setTimeout(() => {
        startButton.textContent = 'playing'
    }, 100)

    game.startGame()
}


const resetGame = () => {
    board.resetBoard()
    game.resetGame()
    game.updatePiecesArray(board.board)
    startButton.classList.remove('active')
    setTimeout(() => {
        startButton.textContent = 'start'
    }, 100)
}


const selectGameType = e => {
    if (game.activateGame === false) {
        const gameTypeSelector = e.currentTarget
        if (gameTypeSelector.id === 'btn-pvp') {
            gameTypeSelectorPvP.classList.add('active')
            gameTypeSelectorPvC.classList.remove('active')
            player2.type = 'player'
            game.gameType = 'pvp'
        } else if (gameTypeSelector.id === 'btn-pvc') {
            gameTypeSelectorPvC.classList.add('active')
            gameTypeSelectorPvP.classList.remove('active')
            player2.type = 'computer'
            game.gameType = 'pvc'
        }
    }
}

//Event Delegator for Dynamic boardSquares
const handleBoardClick = e => {
    const clickedSquare = e.target
    const clickedSquareID = clickedSquare.getAttribute('id')
    if (game.activateGame) {
        if (clickedSquareID !== 'gameBoard') {
            if (!game.checkSquareOccupied(clickedSquareID)) {
                clickedSquare.textContent = game.turn.piece
                if (game.turn === game.p1) game.turn = game.p2
                else if (game.turn === game.p2) game.turn = game.p1
            }
            game.updatePiecesArray(board.board)
        }
    }
}


/* 
User interface Variables
*/
const
    gameBoard = document.querySelector('#gameBoard'),
    startButton = document.querySelector('#btn-start-game'),
    resetButton = document.querySelector('#btn-reset-game'),

    gameTypeSelectorPvP = document.querySelector('#btn-pvp'),
    gameTypeSelectorPvC = document.querySelector('#btn-pvc'),

    p1Score = document.querySelector('#p1Score'),
    p2Score = document.querySelector('#p2Score')


/*
Game Init
*/

const board = new Gameboard(gameBoard)
board.buildBoard()
gameTypeSelectorPvP.classList.add('active')
const player1 = new Player('><')
const player2 = new Player('()')
const game = new GameLogic(player1, player2)
game.updatePiecesArray(board.board)
/*
Event Listeners
*/

resetButton.onclick = resetGame
gameTypeSelectorPvP.onclick = selectGameType
gameTypeSelectorPvC.onclick = selectGameType
startButton.onclick = startGame
gameBoard.onclick = handleBoardClick

//Once game is activated, can't change settings
