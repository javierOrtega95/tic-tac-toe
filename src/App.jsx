import confetti from 'canvas-confetti';
import { useState } from 'react';
import './App.css';
import { Square } from './components/Square';
import { WinnerModal } from './components/WinnerModal';
import { TURNS, WINNER } from './constants';
import { checkEndGame, checkWinner } from './logic/board';
import { resetGameStorage, saveGameToStorage } from './logic/storage';

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem('winner');
    return winnerFromStorage ?? WINNER.NoWinner;
  });

  const updateBoard = index => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      confetti();
      setWinner(newWinner);
      saveGameToStorage({
        board: newBoard,
        turn: newTurn,
        winner: newWinner,
      });
    } else if (checkEndGame(newBoard)) {
      setWinner(WINNER.Tie);
      saveGameToStorage({
        board: newBoard,
        turn: newTurn,
        winner: WINNER.Tie,
      });
    }

    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(WINNER.NoWinner);

    resetGameStorage();
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
