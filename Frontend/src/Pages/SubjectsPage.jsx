import React from 'react';
import Header from '../Components/Header.jsx';

const SubjectsPage = () => {
  const subjects = [
    { name: 'Python Programming', progress: 70 },
    { name: 'Data Structures', progress: 50 },
    { name: 'Machine Learning', progress: 30 },
  ];

  return (
    <div className="w-3/4 p-6">
      <Header />
      <h1 className="text-3xl text-white font-bold mb-8">Subjects</h1>
      <div className="space-y-4">
        {subjects.map((subject, index) => (
          <div key={index} className="bg-[#2D2B3D] p-6 rounded-lg">
            <h2 className="text-xl text-white font-bold mb-2">{subject.name}</h2>
            <div className="w-full bg-[#1E1C2E] rounded-full h-2">
              <div
                className="bg-[#7C3AED] h-2 rounded-full"
                style={{ width: `${subject.progress}%` }}
              />
            </div>
            <p className="text-[#8F8F8F] mt-2">{subject.progress}% Completed</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsPage;