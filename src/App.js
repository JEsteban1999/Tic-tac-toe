import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    const boardCopy = [...board];
    if (boardCopy[index] || calculateWinner(boardCopy) || isBoardFull(boardCopy)) return;
    boardCopy[index] = isXNext ? 'X' : 'O';
    setBoard(boardCopy);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const isBoardFull = (squares) => {
    return squares.every(square => square !== null);
  };

  const renderSquare = (index) => {
    return (
      <button 
        className="w-24 h-24 bg-blue-500 border-2 border-black text-white text-2xl font-bold focus:outline-none" 
        onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const winner = calculateWinner(board);
  const status = winner 
    ? `Winner: ${winner}` 
    : isBoardFull(board) 
      ? 'It\'s a draw!' 
      : `Next player: ${isXNext ? 'X' : 'O'}`;
  
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className='p-14 text-5xl font-bold'>Tic-Tac-Toe Game</h1>
      <div className="flex flex-col">
        <div className="flex">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="flex">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="flex">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="mt-4 text-xl font-semibold">
        {status}
      </div>
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 focus:outline-none" 
        onClick={resetGame}>
        Reiniciar Juego
      </button>
    </div>
  );
};

export default App;
