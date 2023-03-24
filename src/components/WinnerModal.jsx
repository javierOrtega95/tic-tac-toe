import { WINNER } from '../constants.js';
import { Square } from './Square.jsx';

export const WinnerModal = ({ winner, resetGame }) => {
  const winnerText =
    winner === WINNER.Tie ? "It's a tie!" : `${winner.toUpperCase()} wins!`;

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>

        <footer>
          <button onClick={resetGame}>Reset game</button>
        </footer>
      </div>
    </section>
  );
};
