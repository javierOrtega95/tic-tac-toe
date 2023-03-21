import { Square } from './Square.jsx';

export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null;

  const winnerText = winner === 'Draw' ? 'Draw!' : 'Win:';

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>

        {winner !== 'Draw' && (
          <header className='win'>{winner && <Square>{winner}</Square>}</header>
        )}

        <footer>
          <button onClick={resetGame}>Reset game</button>
        </footer>
      </div>
    </section>
  );
};
