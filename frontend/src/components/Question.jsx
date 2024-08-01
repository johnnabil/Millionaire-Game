import React, { useState, useEffect } from 'react';

const Question = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  selectedOption,
  setSelectedOption,
  score,
  setScore,
  lives,
  setLives,
  showResult,
  setShowResult,
  isFriendHelperUsed,
  setIsFriendHelperUsed,
  isEliminateHelperUsed,
  setIsEliminateHelperUsed,
  isHintHelperUsed,
  setIsHintHelperUsed,
  isSkipHelperUsed,
  setIsSkipHelperUsed,
  setTimer,
  skippedQuestions,
  setSkippedQuestions,
  correctAnswerIndices,
  setCorrectAnswerIndices,
  handleFinish,
  setIsGameOver, // Add the setter for game over state
  setHighestLevelReached // Add setter for highest level reached
}) => {
  const [eliminatedOptions, setEliminatedOptions] = useState([]);
  const [hint, setHint] = useState("");

  useEffect(() => {
    setTimer(0); // Reset timer when component mounts or resets
    setEliminatedOptions([]);
    setHint("");
    console.log('Current Question:', questions[currentQuestionIndex]); // Debugging log
  }, [questions, currentQuestionIndex, setTimer]);

  const handleOptionClick = (index) => {
    // Only handle option click if the option is not eliminated
    if (eliminatedOptions.includes(index)) {
      return;
    }

    setSelectedOption(index);

    if (index === questions[currentQuestionIndex].correct_option) {
      setScore(score + 1);
      setCorrectAnswerIndices([...correctAnswerIndices, currentQuestionIndex]);
      setHighestLevelReached(currentQuestionIndex + 1);
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption(null);
          setEliminatedOptions([]);
          setHint("");
        } else {
          setShowResult(true);
          handleFinish();
        }
      }, 500); // Reduced timeout duration for faster transition
    } else {
      setLives(lives - 1);
      if (lives - 1 === 0) {
        setIsGameOver(true); // Set game over state
        setShowResult(true);
        handleFinish();
      } else {
        setTimeout(() => {
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setEliminatedOptions([]);
            setHint("");
          } else {
            setShowResult(true);
            handleFinish();
          }
        }, 500); // Reduced timeout duration for faster transition
      }
    }
  };

  const handleFriendHelper = () => {
    setIsFriendHelperUsed(true);
    setTimer(30);
  };

  const handleEliminateHelper = () => {
    setIsEliminateHelperUsed(true);
    const wrongOptions = questions[currentQuestionIndex].options
      .map((option, index) => ({ option, index }))
      .filter(({ index }) => index !== questions[currentQuestionIndex].correct_option);
    const optionsToEliminate = wrongOptions
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(({ index }) => index);
    setEliminatedOptions(optionsToEliminate);
  };

  const handleHintHelper = () => {
    setIsHintHelperUsed(true);
    setHint(questions[currentQuestionIndex].hint);
  };

  const handleSkipHelper = () => {
    setIsSkipHelperUsed(true);
    setSkippedQuestions([...skippedQuestions, currentQuestionIndex]);
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setEliminatedOptions([]);
        setHint("");
      } else {
        setShowResult(true);
        handleFinish();
      }
    }, 500); // Reduced timeout duration for faster transition
  };

  if (showResult) {
    return (
      <div>
        <h2>Your score: {score} / {questions.length}</h2>
      </div>
    );
  }

  const filteredOptions = questions[currentQuestionIndex]?.options.filter(
    (_, index) => !eliminatedOptions.includes(index)
  );

  return (
    <div className="max-w-xl mx-auto p-4 text-center"> {/* Center the question */}
      <h2 className="text-2xl font-bold mb-4">{questions[currentQuestionIndex]?.question}</h2>
      <div className="space-y-2">
        {filteredOptions && filteredOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(questions[currentQuestionIndex].options.indexOf(option))}
            className={`w-full p-2 rounded ${selectedOption === questions[currentQuestionIndex].options.indexOf(option) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {option}
          </button>
        ))}
      </div>
      {hint && <div className="mt-4">{hint}</div>}
      <div className="mt-4 flex justify-center space-x-2">
        <button 
          onClick={handleFriendHelper} 
          disabled={isFriendHelperUsed}
          className={`p-2 rounded bg-green-500 text-white ${isFriendHelperUsed ? 'opacity-50' : ''}`}
        >
          استعين بصديق
        </button>
        <button 
          onClick={handleEliminateHelper} 
          disabled={isEliminateHelperUsed}
          className={`p-2 rounded bg-yellow-500 text-white ${isEliminateHelperUsed ? 'opacity-50' : ''}`}
        >
          شيل اجابتين
        </button>
        <button 
          onClick={handleHintHelper} 
          disabled={isHintHelperUsed}
          className={`p-2 rounded bg-blue-500 text-white ${isHintHelperUsed ? 'opacity-50' : ''}`}
        >
          Hint
        </button>
        <button 
          onClick={handleSkipHelper} 
          disabled={isSkipHelperUsed}
          className={`p-2 rounded bg-purple-500 text-white ${isSkipHelperUsed ? 'opacity-50' : ''}`}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default Question;
