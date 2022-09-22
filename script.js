class Gameboard {
    constructor() {
        this.board = []
    }

    buildBoard() {
        // build 9 board squares, apply IDs, push to this.board
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
        // append this.board elements to GameBoard at interval
        let intervalID
        let divID = 0
        const gameBoard = document.querySelector('#gameBoard')
        intervalID = setInterval(() => {
            gameBoard.append(this.board[divID])
            divID++
            if (divID > 8) clearInterval(intervalID)
        }, 95)
    }

}




class GameLogic { }
class Player { }

const board = new Gameboard()

board.buildBoard()





