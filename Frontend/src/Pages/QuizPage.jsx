import React, { useState } from 'react';
import Header from '../Components/Header.jsx';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = [
    {
      question: "What is the output of `print(2 ** 3)` in Python?",
      options: ["6", "8", "9", "Error"],
      answer: "8",
    },
    {
      question: "Which data structure uses LIFO?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: "Stack",
    },
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="w-3/4 p-6">
      <Header />
      <h1 className="text-3xl text-white font-bold mb-8">Quiz</h1>
      <div className="bg-[#2D2B3D] p-6 rounded-lg">
        <h2 className="text-xl text-white font-bold mb-4">{questions[currentQuestion].question}</h2>
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="w-full bg-[#1E1C2E] text-white p-3 rounded-lg hover:bg-[#7C3AED] transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="mt-6 w-full bg-[#7C3AED] text-white p-3 rounded-lg hover:bg-[#6D28D9] transition-colors"
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default QuizPage;