class aiMove{
	constructor(){
		let row,col;
	}
}

let 
    player = player1, 
    computerAI = player2


function minimax(board, depth, isMax)
{
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
				if (board[i][j].piece=='')
				{
					// Make the move
					board[i][j].piece = player.piece;

					// Call minimax recursively
					// and choose the maximum value
					best = Math.max(best, minimax(board,
									depth + 1, !isMax));

					// Undo the move
					board[i][j].piece = '';
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
				if (board[i][j].piece === '')
				{
					
					// Make the move
					board[i][j].piece = computerAI.piece;

					// Call minimax recursively and
					// choose the minimum value
					best = Math.min(best, minimax(board,
									depth + 1, !isMax));

					// Undo the move
					board[i][j].piece = '';
				}
			}
		}
		
		console.log('🌌 | file: minimax.js | line 99 | best', best)
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
			if (board[i][j].piece === '')
			{
				
				// Make the move
				board[i][j] = player.piece;

				// compute evaluation function
				// for this move.
				let moveVal = minimax(board, 0, false);

				// Undo the move
				board[i][j].piece = '';

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


