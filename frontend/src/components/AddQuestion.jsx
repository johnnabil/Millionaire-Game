import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const AddQuestion = ({ setPage }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      question,
      options,
      correct_option: parseInt(correctOption, 10),
    };

    axios.post(`${API_URL}/questions`, newQuestion)
      .then((response) => {
        console.log('Question added:', response.data);
        // Optionally, clear the form
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrectOption('');
      })
      .catch((error) => {
        console.error('Error adding question:', error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}>
    <div className="overlay"></div>
      <div className="bg-white bg-opacity-0 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Add a New Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Question:</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {options.map((option, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-lg font-semibold mb-2">Option {index + 1}:</label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Correct Option:</label>
            <select
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>Select the correct option</option>
              {options.map((_, index) => (
                <option key={index} value={index}>
                  Option {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Add Question
            </button>
            <button
              type="button"
              onClick={() => setPage('home')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Go Back Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
