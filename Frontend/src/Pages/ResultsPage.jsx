import React from 'react';
import Header from '../Components/Header.jsx';

const ResultsPage = () => {
  const results = [
    { quiz: "Python Basics", score: "90%" },
    { quiz: "Data Structures", score: "78%" },
  ];

  return (
    <div className="w-3/4 p-6">
      <Header />
      <h1 className="text-3xl text-white font-bold mb-8">Results</h1>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="bg-[#2D2B3D] p-6 rounded-lg">
            <h2 className="text-xl text-white font-bold mb-2">{result.quiz}</h2>
            <p className="text-[#8F8F8F]">Score: {result.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;