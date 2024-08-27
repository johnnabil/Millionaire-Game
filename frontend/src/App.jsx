import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Question from './components/Question.jsx';
import ScoreBar from './components/scoreBar.jsx';
import GameOver from './components/GameOver.jsx';
import AddQuestion from './components/AddQuestion.jsx'; // Import the AddQuestion component

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(2);
  const [showResult, setShowResult] = useState(false);
  const [isFriendHelperUsed, setIsFriendHelperUsed] = useState(false);
  const [isEliminateHelperUsed, setIsEliminateHelperUsed] = useState(false);
  const [isHintHelperUsed, setIsHintHelperUsed] = useState(false);
  const [isSkipHelperUsed, setIsSkipHelperUsed] = useState(false);
  const [timer, setTimer] = useState(0);
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [correctAnswerIndices, setCorrectAnswerIndices] = useState([]);
  const [name, setName] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [highestLevelReached, setHighestLevelReached] = useState(0);
  const [page, setPage] = useState('home'); // State to manage current page

  const timerRef = useRef(null);

  useEffect(() => {
    if (isNameEntered) {
      fetchQuestions();
    }
  }, [isNameEntered]);

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timer]);

  const fetchQuestions = () => {
    axios.get('http://millionaire-game-odbs7pukc-johnnabil1s-projects.vercel.app/questions')
      .then(response => {
        const shuffledQuestions = response.data.sort(() => Math.random() - 0.5);
        setQuestions(shuffledQuestions);
        resetGame();
        console.log('Fetched questions:', shuffledQuestions); // Debugging log
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  };

  const resetGame = () => {
    clearInterval(timerRef.current);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setLives(2);
    setShowResult(false);
    setIsFriendHelperUsed(false);
    setIsEliminateHelperUsed(false);
    setIsHintHelperUsed(false);
    setIsSkipHelperUsed(false);
    setSkippedQuestions([]);
    setCorrectAnswerIndices([]);
    setTimer(0); // Reset timer
    setIsGameOver(false); // Reset game over state
    setHighestLevelReached(0); // Reset highest level reached
  };

  const handleRestart = () => {
    setIsNameEntered(false); // Reset the name entered state
    setName(''); // Reset the name input
    resetGame(); // Reset game state
  };

  const handleFinish = () => {
    const playerScore = { name, score };
    axios.post('http://millionaire-game-odbs7pukc-johnnabil1s-projects.vercel.app/scores', playerScore)
      .then(response => {
        console.log('Score saved:', response.data);
        setIsGameOver(true); // Show game over page
      })
      .catch(error => {
        console.error('Error saving score:', error);
      });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const renderPage = () => {
    if (!isNameEntered && page === 'home') {
      return (
        <div className="name-input flex items-center justify-center h-screen flex-col relative">
          <div className="overlay"></div>
          <h1 className="text-6xl font-bold mb-8">اكتب اسم السداسي</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 text-4xl border border-gray-300 rounded text-center"
          />
          <button
            onClick={() => setIsNameEntered(true)}
            className="start-btn"
            disabled={!name}
          >
            Start
          </button>
          <button
            onClick={() => setPage('add-question')}
            className="add-question-btn"
          >
            Add New Question
          </button>
        </div>
      );
    } else if (page === 'add-question') {
      return <AddQuestion setPage={setPage} />;
    } else {
      return (
        <div className="relative min-h-screen flex">
          <div className="overlay"></div>
          {!isGameOver && (
            <ScoreBar 
              currentQuestionIndex={highestLevelReached}
              correctAnswerIndices={correctAnswerIndices}
            />
          )}
          <div className="flex flex-col items-center flex-grow ml-52">
            {isGameOver ? (
              <GameOver currentQuestionIndex={highestLevelReached} onRestart={handleRestart} />
            ) : (
              <>
                <header>
                  <h1 className="text-4xl font-bold">اشبال من سيربح المليون؟</h1>
                  <div className="text-3xl font-bold my-4">
                    Lives: {lives}
                  </div>
                </header>
                <button className="restart-button absolute top-4 right-4 p-2 bg-red-500 text-white text-sm rounded hover:bg-red-700 transition duration-300" onClick={handleRestart}>Restart</button>
                <div className="text-3xl font-bold my-4">
                  {timer > 0 && formatTime(timer)}
                </div>
                <main className="flex-grow flex flex-col items-center justify-center">
                  {questions.length > 0 ? (
                    <Question
                      questions={questions}
                      currentQuestionIndex={currentQuestionIndex}
                      setCurrentQuestionIndex={setCurrentQuestionIndex}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      score={score}
                      setScore={setScore}
                      lives={lives}
                      setLives={setLives}
                      showResult={showResult}
                      setShowResult={setShowResult}
                      isFriendHelperUsed={isFriendHelperUsed}
                      setIsFriendHelperUsed={setIsFriendHelperUsed}
                      isEliminateHelperUsed={isEliminateHelperUsed}
                      setIsEliminateHelperUsed={setIsEliminateHelperUsed}
                      isHintHelperUsed={isHintHelperUsed}
                      setIsHintHelperUsed={setIsHintHelperUsed}
                      isSkipHelperUsed={isSkipHelperUsed}
                      setIsSkipHelperUsed={setIsSkipHelperUsed}
                      setTimer={setTimer}
                      skippedQuestions={skippedQuestions}
                      setSkippedQuestions={setSkippedQuestions}
                      correctAnswerIndices={correctAnswerIndices}
                      setCorrectAnswerIndices={setCorrectAnswerIndices}
                      handleFinish={handleFinish}
                      setIsGameOver={setIsGameOver} // Pass the setter to the Question component
                      setHighestLevelReached={setHighestLevelReached} // Pass setter for highest level reached
                    />
                  ) : (
                    <p>Loading questions...</p> // Display loading message
                  )}
                </main>
              </>
            )}
          </div>
        </div>
      );
    }
  };

  return <div>{renderPage()}</div>;
};

export default App;
