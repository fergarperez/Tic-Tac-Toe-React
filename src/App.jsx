import { useState } from "react";
import { Square } from "./components/Square.jsx";

const TURN = {
  X: 'x',
  O: 'o',
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState( Array(9).fill(null) );
  const [turn, setTurn] = useState(TURN.X);
  // null = no hay ganador, false = empate
  const [winner, setWinner] = useState(null);

  function checkWinner (boardToCheck) {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a];
      }
    }
    return null;
  }

  function updateBoard (index) {
    if(board[index] || winner) return;

    const newBoard = [...board]; // copia el array board
    newBoard[index] = turn; // para el indice que hemos clicado ponemos el valor del turno
    setBoard(newBoard); // actualizamos el board

    const newTurn = turn === TURN.X ? TURN.O : TURN.X; // cambiamos el turno
    setTurn(newTurn); // actualizamos el turno

    const newWinner = checkWinner(newBoard);
    if(newWinner) {
      setWinner(newWinner);
    } else if ( checkEndGame(newBoard) ) {
      setWinner(false);
    }
  }

  function checkEndGame(newBoard) {
    return newBoard.every((square) => square !== null);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn(TURN.X);
    setWinner(null);
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <section className="game">
        {
          board.map( (_, index) => {
            return (
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected = {turn === TURN.X}>
          {TURN.X}
        </Square>
        <Square isSelected = {turn === TURN.O}>
          {TURN.O}
        </Square>
      </section>

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? 
                  'Empate' :
                  'Gano:'
                }
              </h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
