export const saveGameToStorage = ({ board, turn, winner = null }) => {
  window.localStorage.setItem('board', JSON.stringify(board));
  window.localStorage.setItem('turn', turn);
  if (winner) window.localStorage.setItem('winner', winner);
};

export const resetGameStorage = () => {
  window.localStorage.removeItem('board');
  window.localStorage.removeItem('turn');
  window.localStorage.removeItem('winner');
};
