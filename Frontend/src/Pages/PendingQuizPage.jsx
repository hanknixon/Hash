import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Bell, Search, CheckCircle, Clock, AlertCircle,
  FileText, Book, BookMarked, Trophy, Users, LogOut,
  Calendar, AlertTriangle, Gauge, X
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Dummy data for pending quizzes
const pendingQuizzes = [
  {
    id: 1,
    topic: "Graph Algorithms",
    subject: "Data Structures and Algorithms",
    totalQuestions: 25,
    difficulty: "Hard",
    teacher: {
      name: "Dr. Emily Wilson",
      subject: "Data Structures"
    },
    deadline: "2024-03-24T23:59:59",
    marks: 100
  },
  {
    id: 2,
    topic: "OSI Model",
    subject: "Computer Networks",
    totalQuestions: 20,
    difficulty: "Medium",
    teacher: {
      name: "Prof. John Davis",
      subject: "Computer Networks"
    },
    deadline: "2024-03-25T22:00:00",
    marks: 75
  },
  {
    id: 3,
    topic: "Deep Learning Fundamentals",
    subject: "Artificial Intelligence",
    totalQuestions: 30,
    difficulty: "Expert",
    teacher: {
      name: "Dr. Lisa Kumar",
      subject: "AI & ML"
    },
    deadline: "2024-03-26T18:30:00",
    marks: 100
  }
];

const PendingQuizPage = () => {
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/LoginPage");
  };

  const handleStartQuiz = (quiz) => {
    navigate('/QuizPage', {
      state: {
        quizData: {
          ...quiz,
          currentQuestion: 0,
          timeStarted: new Date().toISOString()
        }
      }
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'hard':
        return 'text-orange-400';
      case 'expert':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatDeadline = (dateString) => {
    const deadline = new Date(dateString);
    return deadline.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeRemaining = (dateString) => {
    const now = new Date();
    const deadline = new Date(dateString);
    const diff = deadline - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days} days remaining`;
    if (hours > 0) return `${hours} hours remaining`;
    return `${minutes} minutes remaining`;
  };

  return (
    <div className="flex h-screen bg-[#2D2B3D]">
      {/* Sidebar */}
      <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Hash - Quiz Learning Platform</h1>
        </div>

        <div className="border-b border-gray-700 mb-6"></div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="text-lg font-semibold mb-4 cursor-pointer text-white hover:text-purple-400"
          onClick={() => navigate("/StudentDashboard")}
        >
          Dashboard
        </motion.div>

        <div className="border-b border-gray-700 mb-6"></div>

        {/* My Assignments Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">ASSIGNMENTS</div>
          <ul className="space-y-3">
            <motion.li
              whileHover={{ x: 4 }}
              className="flex items-center text-gray-300 hover:text-white cursor-pointer"
              onClick={() => navigate("/CompletedQuizPage")}
            >
              <CheckCircle size={18} className="mr-2"/> Completed Quizzes
            </motion.li>
            <motion.li
              whileHover={{ x: 4 }}
              className="flex items-center text-gray-300 hover:text-white cursor-pointer"
              onClick={() => navigate("/UpcomingQuizPage")}
            >
              <Clock size={18} className="mr-2"/> Upcoming Quizzes
            </motion.li>
            <li className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg">
              <AlertCircle size={18} className="mr-2"/> Pending Quizzes
            </li>
          </ul>
        </div>

        <div className="border-b border-gray-700 mb-6"></div>

        {/* Resources Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">RESOURCES</div>
          <ul className="space-y-3">
            <motion.li
              whileHover={{ x: 4 }}
              className="flex items-center text-gray-300 hover:text-white cursor-pointer"
              onClick={() => navigate("/PYQsPage")}
            >
              <FileText size={18} className="mr-2"/> PYQs
            </motion.li>
            <motion.li
              whileHover={{ x: 4 }}
              className="flex items-center text-gray-300 hover:text-white cursor-pointer"
              onClick={() => navigate("/SyllabusPage")}
            >
              <Book size={18} className="mr-2"/> Syllabus
            </motion.li>
            <motion.li
              whileHover={{ x: 4 }}
              className="flex items-center text-gray-300 hover:text-white cursor-pointer"
              onClick={() => navigate("/MaterialsPage")}
            >
              <BookMarked size={18} className="mr-2"/> Materials / Notes
            </motion.li>
          </ul>
        </div>

        <div className="border-b border-gray-700 mb-6"></div>

        {/* Ranks Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">RANKS</div>
          <ul className="space-y-3">
            <motion.li
              whileHover={{ x: 4 }}
              className="flex items-center text-gray-300 hover:text-white cursor-pointer"
              onClick={() => navigate("/RanksPage")}
            >
              <Trophy size={18} className="mr-2"/> View Ranks
            </motion.li>
          </ul>
        </div>

        <div className="border-b border-gray-700 mb-6"></div>

        {/* Teachers Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">TEACHERS</div>
          <ul className="space-y-3">
            <motion.li
              whileHover={{ x: 4 }}
              className="flex items-center text-gray-300 hover:text-white cursor-pointer"
              onClick={() => navigate("/MyTeachersPage")}
            >
              <Users size={18} className="mr-2"/> My Teachers
            </motion.li>
          </ul>
        </div>

        {/* Logout at bottom */}
        <div className="mt-auto">
          <button
            onClick={() => setLogoutModalOpen(true)}
            className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] transition-all duration-200 p-2 rounded-lg w-full"
          >
            <LogOut size={18} className="mr-2"/> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Navbar */}
        <div className="bg-[#1E1C2E] p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
              <input
                type="text"
                placeholder="Search pending quizzes..."
                className="pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <motion.button whileHover={{ scale: 1.1 }} className="relative">
              <Bell size={24} className="text-gray-300 hover:text-white"/>
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">
                3
              </span>
            </motion.button>
            <div className="flex items-center space-x-3">
              <span className="text-white">Welcome, User</span>
              <motion.img
                whileHover={{ scale: 1.1 }}
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Pending Quizzes Content */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1E1C2E] rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Pending Quizzes</h2>
            <div className="space-y-6">
              {pendingQuizzes.map((quiz, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#2D2B3D] rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{quiz.topic}</h3>
                        <p className="text-gray-400">{quiz.subject}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Gauge size={20} className={getDifficultyColor(quiz.difficulty)}/>
                        <span className={`font-semibold ${getDifficultyColor(quiz.difficulty)}`}>
                          {quiz.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Questions</p>
                        <p className="text-white font-semibold">{quiz.totalQuestions}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Total Marks</p>
                        <p className="text-white font-semibold">{quiz.marks}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Teacher</p>
                        <p className="text-white font-semibold">
                          {quiz.teacher.name} ({quiz.teacher.subject})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar size={20} className="text-purple-400"/>
                        <div>
                          <p className="text-gray-400 text-sm">Deadline</p>
                          <p className="text-white font-semibold">{formatDeadline(quiz.deadline)}</p>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#1E1C2E] px-4 py-2 rounded-lg"
                      >
                        <p className="text-yellow-400 font-semibold">{getTimeRemaining(quiz.deadline)}</p>
                      </motion.div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleStartQuiz(quiz)}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
                    >
                      Start Quiz
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {logoutModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-80 text-white relative"
            >
              <button
                onClick={() => setLogoutModalOpen(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
              <p className="text-gray-400 mb-6">Are you sure you want to log out?</p>
              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setLogoutModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Yes, Logout
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PendingQuizPage;