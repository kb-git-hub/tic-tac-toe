class aiMove{
	constructor(){
		let row,col;
	}
}

let 
    player = player1, 
    computerAI = player2

// game.checkforEmptySquares()
// function isMovesLeft(board)

// game.checkforWin(gameBoard)
// function evaluate(b)


function minimax(board, depth, isMax)
{
	let score = game.checkforWin(board);

	// Maximizer (><) win
	if (score === player.piece)
		return 10;

	// Minimizer (()) win
	if (score == computerAI.piece)
		return -10;

    // tie
	if (!game.checkforEmptySquares())
		return 0;

	// If this maximizer's move
	if (isMax)
	{
		let best = -1000;

		// Traverse all cells
		for(let i = 0; i < 3; i++)
		{
			for(let j = 0; j < 3; j++)
			{
				
				// Check if cell is empty
				if (board[i][j]=='_')
				{
					
					// Make the move
					board[i][j] = player;

					// Call minimax recursively
					// and choose the maximum value
					best = Math.max(best, minimax(board,
									depth + 1, !isMax));

					// Undo the move
					board[i][j] = '_';
				}
			}
		}
		return best;
	}

	// If this minimizer's move
	else
	{
		let best = 1000;

		// Traverse all cells
		for(let i = 0; i < 3; i++)
		{
			for(let j = 0; j < 3; j++)
			{
				
				// Check if cell is empty
				if (board[i][j] == '_')
				{
					
					// Make the move
					board[i][j] = computerAI;

					// Call minimax recursively and
					// choose the minimum value
					best = Math.min(best, minimax(board,
									depth + 1, !isMax));

					// Undo the move
					board[i][j] = '_';
				}
			}
		}
		return best;
	}
}

// This will return the best possible
// move for the player
function findBestMove(board)
{
	let bestVal = -1000;
	let bestMove = new aiMove();
	bestMove.row = -1;
	bestMove.col = -1;

	// Traverse all cells, evaluate
	// minimax function for all empty
	// cells. And return the cell
	// with optimal value.
	for(let i = 0; i < 3; i++)
	{
		for(let j = 0; j < 3; j++)
		{
			
			// Check if cell is empty
			if (board[i][j].piece == '')
			{
				
				// Make the move
				board[i][j] = player;

				// compute evaluation function
				// for this move.
				let moveVal = minimax(board, 0, false);

				// Undo the move
				board[i][j] = '';

				// If the value of the current move
				// is more than the best value, then
				// update best
				if (moveVal > bestVal)
				{
					bestMove.row = i;
					bestMove.col = j;
					bestVal = moveVal;
				}
			}
		}
	}
	return bestMove;
}


// let board = game.piecesArray
let bestMove = findBestMove(game.piecesArray);
console.log('🚀 | file: minimax.js | line 150 | bestMove', bestMove)
