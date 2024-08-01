import React from 'react';

const steps = [
  "$1", "$100", "$500", "$1,000", "$2,000", "$4,000", "$8,000", "$16,000", "$32,000","$48,000", "$64,000", "$100,000",
  "$125,000", "$250,000", "$500,000", "$1,000,000"
];

// const steps = [
//     "$1", "$2", "$3", "$5", "$8", "$13", "$21", "$34", "$55", "$89", "$144",
//     "$233", "$377", "$610", "$987", "$1,597", "$2,584", "$4,182", "$6,766", "$10,946",
//     "$17,713", "$28,660", "$46,373", "$75,034", "$121,407", "$196,441", "$317,848", "$514,288", "$832,136", "$1,000,000"
//   ];

const ScoreBar = ({ currentQuestionIndex, correctAnswerIndices }) => {
  // Calculate the number of correct answers
  const correctAnswers = correctAnswerIndices.length;

  return (
    <div className="sidebar">
      {steps.map((step, index) => (
        <div key={index} className={`score-bar ${index < correctAnswers ? 'active' : ''}`}>
          <div className="score-bar-text">{step}</div>
          <div className="score-bar-fill"></div>
        </div>
      ))}
    </div>
  );
};

export default ScoreBar;
