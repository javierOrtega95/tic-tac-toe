import { useState } from 'react';
import './App.css';
import { Square } from './components/Square';
import { WinnerModal } from './components/WinnerModal';
import { TURNS, WINNER } from './constants';
import { checkEndGame, checkWinner } from './logic/board';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(WINNER.NoWinner);

  const updateBoard = index => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(WINNER.Tie);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(WINNER.NoWinner);
  };

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {winner !== WINNER.NoWinner && (
        <WinnerModal winner={winner} resetGame={resetGame} />
      )}
    </main>
  );
}

export default App;
