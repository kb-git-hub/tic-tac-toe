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



class GameLogic {
    constructor(p2 = 'player', gameType = 'pvp') {
        this.p1 = 'player'
        this.p2 = p2
        this.gameType = gameType
        this.activateGame = false
    }

    startGame() {
        this.activateGame = true
        this.createPlayers()
    }

    resetGame() {
        this.activateGame = false
    }

    createPlayers() {
   
     }


    checkEmptySquare() { }
    checkforWin() { }
    updateWinner() { }
}




/*
Functions
*/
const startGame = () => {
    startButton.classList.add('active')
    setTimeout(() => {
        startButton.textContent = 'playing'
    }, 100)

    const player1 = new Player(this.p1, 'X')
    const player2 = new Player(this.p2, 'O')
    game.startGame()
}



const resetGame = () => {
    board.resetBoard()
    game.resetGame()
    startButton.classList.remove('active')
    setTimeout(() => {
        startButton.textContent = 'start'
    }, 100)
}



const selectGameType = e => {
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
const game = new GameLogic()
const board = new Gameboard(gameBoard)
board.buildBoard()
gameTypeSelectorPvP.classList.add('active')
const player1 = new Player('X')
const player2 = new Player('O')


/*
Event Listeners
*/

//Event Delegator for Dynamic boardSquares
const handleBoardClick = e => {
    const clickedSquare = e.target
    if (game.activateGame) {
        e.target.textContent = 'X'
    }
    if (clickedSquare !== 'gameBoard') { console.log(clickedSquare.getAttribute('id'), e.target.textContent) }
}
gameBoard.addEventListener('click', handleBoardClick)


resetButton.onclick = resetGame
gameTypeSelectorPvP.onclick = selectGameType
gameTypeSelectorPvC.onclick = selectGameType
startButton.onclick = startGame