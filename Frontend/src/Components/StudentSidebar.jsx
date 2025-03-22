import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle, Clock, AlertCircle, FileText,
  Book, BookMarked, Trophy, Users, LogOut
} from 'lucide-react';

const StudentSidebar = ({ onLogout, currentPage }) => {
  const navigate = useNavigate();

  const getItemStyle = (pageName) => {
    return currentPage === pageName
      ? "flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg"
      : "flex items-center text-gray-300 hover:text-white cursor-pointer";
  };

  return (
    <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="mb-8 whitespace-nowrap">
        <Link to="/StudentDashboard">
          <img
            src="../Images/HashLogoDashboard.png"
            alt="Hash Logo"
            className="h-12 w-auto transition-transform duration-200 transform hover:scale-110"
          />
        </Link>
      </div>

      <div className="border-b border-gray-700 mb-6"></div>

      <motion.div
        whileHover={{scale: 1.02}}
        className={`text-lg font-semibold mb-4 cursor-pointer ${
          currentPage === "StudentDashboard" ? "text-purple-400" : "text-white hover:text-purple-400"
        }`}
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
            whileHover={{x: 4}}
            className={getItemStyle("CompletedQuizPage")}
            onClick={() => navigate("/CompletedQuizPage")}
          >
            <CheckCircle size={18} className="mr-2"/> Completed Quizzes
          </motion.li>
          <motion.li
            whileHover={{x: 4}}
            className={getItemStyle("UpcomingQuizPage")}
            onClick={() => navigate("/UpcomingQuizPage")}
          >
            <Clock size={18} className="mr-2"/> Upcoming Quizzes
          </motion.li>
          <motion.li
            whileHover={{x: 4}}
            className={getItemStyle("PendingQuizPage")}
            onClick={() => navigate("/PendingQuizPage")}
          >
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
            whileHover={{x: 4}}
            className={getItemStyle("PYQsPage")}
            onClick={() => navigate("/PYQsPage")}
          >
            <FileText size={18} className="mr-2"/> PYQs
          </motion.li>
          <motion.li
            whileHover={{x: 4}}
            className={getItemStyle("SyllabusPage")}
            onClick={() => navigate("/SyllabusPage")}
          >
            <Book size={18} className="mr-2"/> Syllabus
          </motion.li>
          <motion.li
            whileHover={{x: 4}}
            className={getItemStyle("MaterialsPage")}
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
            whileHover={{x: 4}}
            className={getItemStyle("RanksPage")}
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
            whileHover={{x: 4}}
            className={getItemStyle("MyTeachersPage")}
            onClick={() => navigate("/MyTeachersPage")}
          >
            <Users size={18} className="mr-2"/> My Teachers
          </motion.li>
        </ul>
      </div>

      {/* Logout at bottom */}
      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] transition-all duration-200 p-2 rounded-lg w-full"
        >
          <LogOut size={18} className="mr-2"/> Logout
        </button>
      </div>
    </div>
  );
};

export default StudentSidebar;