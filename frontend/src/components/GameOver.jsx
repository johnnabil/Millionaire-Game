import React from 'react';
import ScoreBar from './scoreBar.jsx';

const steps = [
    "$1", "$100", "$500", "$1,000", "$2,000", "$4,000", "$8,000", "$16,000", "$32,000","$48,000", "$64,000", "$100,000",
    "$125,000", "$250,000", "$500,000", "$1,000,000",  "$1,000,000", "$1,000,000",  "$1,000,000",  "$1,000,000", 
    "$1,000,000",  "$1,000,000", "$1,000,000",  "$1,000,000",  "$1,000,000", 
    "$1,000,000",  "$1,000,000", "$1,000,000",  "$1,000,000",  "$1,000,000"
  ];

const GameOver = ({ currentQuestionIndex, onRestart }) => {
  const finalScore = steps[Math.max(currentQuestionIndex - 1, 0)];

  return (
    <div className="game-over flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">انت وصلت ل</h1>
      <p className="text-2xl mb-8">{finalScore}</p>
      <ScoreBar currentQuestionIndex={currentQuestionIndex} correctAnswerIndices={Array.from({ length: currentQuestionIndex }, (_, i) => i)} />
      <button onClick={onRestart} className="p-4 bg-blue-500 text-white text-2xl rounded mt-8">Restart</button>
    </div>
  );
};

export default GameOver;
