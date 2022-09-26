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
    constructor(piece, name) {
        this.type = 'player'
        this.piece = piece
        this.wins = 0
        this.name = name
    }
    displayWins() { }
}



class GameLogic {
    constructor(p1, p2, gameType = 'pvp') {
        this.p1 = p1
        this.p2 = p2
        this.gameType = gameType
        this.activateGame = false
        this.turn = null
        this.piecesArray = []
        this.winner = ''
    }

    startGame() {
        this.activateGame = true
        this.turn = this.p1


    }

    resetGame() {
        this.activateGame = false
        this.winner = ''
    }

    checkSquareOccupied(square) {
        for (const row of this.piecesArray) {
            for (const squareObjects of row) {
                if (squareObjects.square === square) {
                    return (squareObjects.piece ? true : false)
                }
            }
        }
    }

    checkforWin(gameBoard) {
        //check rows
        let checkArray
        for (let i = 0; i < gameBoard.length; i++) {
            checkArray = [];
            for (let j = 0; j < gameBoard.length; j++) {
                checkArray.push(gameBoard[i][j].piece);
            }
            if (!!checkArray.reduce((a, b) => (a === b ? a : NaN))) {
                this.winner = checkArray[2]
                return true;
            }
        }

        // check columns
        for (let i = 0; i < gameBoard.length; i++) {
            checkArray = [];
            for (let j = 0; j < gameBoard.length; j++) {
                checkArray.push(gameBoard[j][i].piece);
            }
            if (!!checkArray.reduce((a, b) => (a === b ? a : NaN))) {
                this.winner = checkArray[2]
                return true;
            }
        }

        // check Diags
        checkArray = []
        for (let i = 0; i < gameBoard.length; i++) {
            checkArray.push(gameBoard[i][i].piece);
        }
        if (!!checkArray.reduce((a, b) => (a === b ? a : NaN))) {
            this.winner = checkArray[2]
            return true
        }

        checkArray = []
        for (let i = gameBoard.length - 1; i >= 0; i--) {
            let j = gameBoard.length - 1 - i
            checkArray.push(gameBoard[i][j].piece)
        }
        if (!!checkArray.reduce((a, b) => (a === b ? a : NaN))) {
            this.winner = checkArray[2]
            return true;

        }
    }


    checkforEmptySquares() {
        let checkEmptySquares = (row) => {
            for (let square of row) {
                if (square.piece === '') {
                    return true
                }
            }
        }
        if (this.piecesArray.some(checkEmptySquares)) return true
        else {
            this.winner = 'tie'
            return false
        }

    }

    getWinner() {
        if (this.winner === this.p1.piece) {
            this.p1.wins++
            return this.p1.name

        }
        else if (this.winner === this.p2.piece) {
            this.p2.wins++
            return this.p2.name
        }
        else return 'tie'
    }

    updatePiecesArray(gameBoard) {
        this.piecesArray = []
        let boardIterator = 0
        for (let i = 0; i < gameBoard.length / 3; i++) {
            let row = []
            for (let j = 0; j < gameBoard.length / 3; j++) {
                let squareData = {
                    square: gameBoard[boardIterator].getAttribute('id'),
                    piece: gameBoard[boardIterator].textContent
                }
                row.push(squareData)
                boardIterator++
            }
            this.piecesArray.push(row)
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
    startButton.disabled = true
}


const resetGame = () => {
    startButton.disabled = false
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
    activateHumanMove(e)

    if (game.gameType === 'pvc') {
        setTimeout(() => activateAIMove(), 300)
    }
}



const displayResult = () => {
    const winner = game.getWinner()
    if (winner === 'player 1') resultModalText.textContent = `${winner} wins!`
    else if (winner === 'player 2') resultModalText.textContent = `${winner} wins!`
    else resultModalText.textContent = 'tie game!'

    p1Score.textContent = player1.wins
    p2Score.textContent = player2.wins

    overlay.classList.add('active')
    resultModal.classList.add('active')
    startButton.disabled = false

}

const closeModals = () => {
    resultModal.classList.remove('active')
    overlay.classList.remove('active')
}


const handleKeyBoardInput = (e) => {
    if (e === 'escape') closeModals()
}

const activateHumanMove = (e) => {
    const clickedSquare = e.target
    const clickedSquareID = clickedSquare.getAttribute('id')
    if (game.activateGame) {
        if (!game.checkSquareOccupied(clickedSquareID)) {
            clickedSquare.textContent = game.turn.piece
            if (game.turn === game.p1) game.turn = game.p2
            else if (game.turn === game.p2) game.turn = game.p1
        }
        game.updatePiecesArray(board.board)

        if (game.checkforWin(game.piecesArray)) {
            game.activateGame = false
            displayResult()

        } else if (!game.checkforEmptySquares()) {
            game.activateGame = false
            displayResult()
        }
    }
}

const activateAIMove = () => {
    if (game.activateGame) {
        const aiMove = findBestMove(game.piecesArray)
        
        const convertAIMoveToSquare = (aiOutput) => {
            let row = aiOutput.row * 3
            let col = aiOutput.col
            return row + col
        }
        const aiTargetSquare = convertAIMoveToSquare(aiMove)
        board.board[aiTargetSquare].textContent = game.turn.piece
        if (game.turn === game.p1) game.turn = game.p2
        else if (game.turn === game.p2) game.turn = game.p1
        game.updatePiecesArray(board.board)

        if (game.checkforWin(game.piecesArray)) {
            game.activateGame = false
            displayResult()

        } else if (!game.checkforEmptySquares()) {
            game.activateGame = false
            displayResult()
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
    p2Score = document.querySelector('#p2Score'),

    resultModal = document.querySelector('#modal-result'),
    resultModalText = document.querySelector('#modal-result-text'),
    overlay = document.querySelector('#overlay'),
    playAgain = document.querySelector('#modal-play-again-btn'),
    exitModal = document.querySelector('#modal-close-btn')


/*
Game Init
*/
const board = new Gameboard(gameBoard)
board.buildBoard()
gameTypeSelectorPvP.classList.add('active')
const player1 = new Player('><', 'player 1')
const player2 = new Player('()', 'player 2')
const game = new GameLogic(player1, player2)
game.updatePiecesArray(board.board)


/*
Event Listeners
*/
window.onkeydown = handleKeyBoardInput
resetButton.onclick = resetGame
gameTypeSelectorPvP.onclick = selectGameType
gameTypeSelectorPvC.onclick = selectGameType
startButton.onclick = startGame
gameBoard.onclick = handleBoardClick
playAgain.addEventListener('click', () => {
    closeModals()
    resetGame()
    startGame()
})
overlay.addEventListener('click', () => {
    closeModals()
    resetGame()
})

exitModal.addEventListener('click', () => {
    closeModals()
    resetGame()
})
