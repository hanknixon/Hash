import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Bell, Search, User, BookOpen, Clock, CheckCircle, AlertCircle,
  FileText, Book, GraduationCap, Trophy, Users, LogOut, ChevronRight, Star, BookMarked, X
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Dummy data for ranks
const leaderboardData = [
  { name: "Alex Thompson", rank: "Grandmaster", score: 2500, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop" },
  { name: "Sarah Chen", rank: "Master", score: 2200, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" },
  { name: "Michael Park", rank: "Diamond", score: 2000, avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop" },
];

// Dummy data for teachers
const teachersData = [
  { name: "Dr. Emily Wilson", subject: "Mathematics", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop" },
  { name: "Prof. John Davis", subject: "Physics", avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=50&h=50&fit=crop" },
  { name: "Dr. Lisa Kumar", subject: "Chemistry", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop" },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/LoginPage");
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

        <div className="text-lg font-semibold mb-4">Dashboard</div>

        <div className="border-b border-gray-700 mb-6"></div>

        {/* My Assignments Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">ASSIGNMENTS</div>
          <ul className="space-y-3">
            <motion.li whileHover={{ x: 4 }} className="flex items-center text-gray-300 hover:text-white cursor-pointer"
            onClick={() => navigate("/CompletedQuizPage")}>
              <CheckCircle size={18} className="mr-2"/> Completed Quizzes
            </motion.li>
            <motion.li whileHover={{ x: 4 }} className="flex items-center text-gray-300 hover:text-white cursor-pointer"
            onClick={() => navigate("/UpcomingQuizPage")}>
              <Clock size={18} className="mr-2"/> Upcoming Quizzes
            </motion.li>
            <motion.li whileHover={{ x: 4 }} className="flex items-center text-gray-300 hover:text-white cursor-pointer"
            onClick={() => navigate("/PendingQuizPage")}>
              <AlertCircle size={18} className="mr-2"/> Pending Quizzes
            </motion.li>
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
        {/* Top Navigation */}
        <div className="bg-[#1E1C2E] p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
              <input
                type="text"
                placeholder="Search resources..."
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

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Continue Learning Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1E1C2E] rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#2D2B3D] p-4 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-semibold">Data Structures</h3>
                    <p className="text-gray-400 text-sm">Chapter 4: Binary Trees</p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#7C3AED] text-white text-xs px-2 py-1 rounded"
                  >
                    In Progress
                  </motion.div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-[#7C3AED] h-2 rounded-full"
                  ></motion.div>
                </div>
                <p className="text-gray-400 text-sm">60% Complete</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Recommended Materials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1E1C2E] rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Recommended Materials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="bg-[#2D2B3D] p-4 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-semibold">Advanced Algorithms</h3>
                    <p className="text-gray-400 text-sm">Recommended based on your progress</p>
                  </div>
                  <motion.div whileHover={{ rotate: 15 }}>
                    <BookOpen className="text-[#7C3AED]" size={24}/>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Leaderboard Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1E1C2E] rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Top Performers</h2>
            <div className="space-y-4">
              {leaderboardData.map((user, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#2D2B3D] p-4 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{user.name}</h3>
                      <p className="text-gray-400 text-sm">{user.rank}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Star className="text-yellow-500" size={20}/>
                    </motion.div>
                    <span className="text-white">{user.score}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Teachers Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1E1C2E] rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Your Teachers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teachersData.map((teacher, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#2D2B3D] p-4 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={teacher.avatar}
                      alt={teacher.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{teacher.name}</h3>
                      <p className="text-gray-400 text-sm">{teacher.subject}</p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="text-gray-400" size={20}/>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Semester */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#1E1C2E] rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Upcoming Semester</h2>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-[#2D2B3D] p-4 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">Semester 7</h3>
                  <p className="text-gray-400 text-sm">Starting from August 2024</p>
                </div>
                <motion.div
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <GraduationCap className="text-[#7C3AED]" size={24}/>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4"
              >
                <p className="text-gray-300 text-sm">New subjects:</p>
                <ul className="list-disc list-inside text-gray-400 text-sm mt-2">
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    Advanced Database Management
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    Cloud Computing
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    Artificial Intelligence
                  </motion.li>
                </ul>
              </motion.div>
            </motion.div>
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

export default StudentDashboard;