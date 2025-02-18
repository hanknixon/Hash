import React, { useState } from "react";
import { Search, Bell, X } from "lucide-react";
import {
  FileText,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  Book,
  BookMarked,
  Trophy,
  Users,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const MaterialsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/LoginPage");
  };

  const subjects = [
    "Internetworking with TCP/IP",
    "Algorithm Analysis & Design",
    "Data Science",
    "Industrial Economics & Foreign trade",
    "Digital Image Processing",
    "Soft Computing",
    "Course Viva",
    "Computer Networks Lab",
  ];

  return (
    <div className="flex h-screen bg-[#2D2B3D]">
      {/* Sidebar */}
      <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Hash - Quiz Learning Platform</h1>
        </div>
        <div className="border-b border-gray-700 mb-6"></div>

        <div
          className={`text-lg font-semibold mb-4 cursor-pointer transition-colors duration-200 ${
            location.pathname === "/StudentDashboard"
              ? "text-purple-400"
              : "text-white hover:text-purple-400"
          }`}
          onClick={() => navigate("/StudentDashboard")}
        >
          Dashboard
        </div>

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
              <CheckCircle size={18} className="mr-2" /> Completed Quizzes
            </motion.li>
            <motion.li
              whileHover={{ x: 4 }}
              className="flex items-center text-gray-300 hover:text-white cursor-pointer"
              onClick={() => navigate("/UpcomingQuizpage")}
            >
              <Clock size={18} className="mr-2" /> Upcoming Quizzes
            </motion.li>
            <motion.li
              whileHover={{ x: 4 }}
              className="flex items-center text-gray-300 hover:text-white cursor-pointer"
              onClick={() => navigate("/PendingQuizPage")}
            >
              <AlertCircle size={18} className="mr-2" /> Pending Quizzes
            </motion.li>
          </ul>
        </div>

        <div className="border-b border-gray-700 mb-6"></div>

        {/* My Subjects Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">RESOURCES</div>
          <ul className="space-y-3">
            <motion.li
              whileHover={{ x: 4 }}
              className="flex items-center text-gray-300 hover:text-white cursor-pointer"
              onClick={() => navigate("/PYQsPage")}
            >
              <FileText size={18} className="mr-2" /> PYQs
            </motion.li>
            <motion.li
              whileHover={{ x: 4 }}
              className="flex items-center text-gray-300 hover:text-white cursor-pointer"
              onClick={() => navigate("/SyllabusPage")}
            >
              <Book size={18} className="mr-2" /> Syllabus
            </motion.li>
            <li className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg">
              <FileText size={18} className="mr-2" /> Materials / Notes
            </li>
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
              <Trophy size={18} className="mr-2" /> View Ranks
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
              <Users size={18} className="mr-2" /> My Teachers
            </motion.li>
          </ul>
        </div>

        {/* Logout at bottom */}
        <div className="mt-auto">
          <button
            onClick={() => setLogoutModalOpen(true)}
            className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] transition-all duration-200 p-2 rounded-lg w-full"
          >
            <LogOut size={18} className="mr-2" /> Logout
          </button>
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
                <button
                  onClick={() => setLogoutModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Yes, Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Navbar */}
        <div className="bg-[#1E1C2E] p-4 flex justify-between items-center shadow-md">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center space-x-6">
            <motion.button whileHover={{ scale: 1.1 }} className="relative">
              <Bell size={24} className="text-gray-300 hover:text-white" />
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

        {/* Materials Content */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1E1C2E] rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Materials/Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    layout: { duration: 0.3, ease: "easeOut" },
                    delay: index * 0.05,
                  }}
                  className={`bg-[#2D2B3D] rounded-lg overflow-hidden`}
                >
                  <motion.div
                    layout="position"
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedSubject(expandedSubject === index ? null : index)}
                  >
                    <div className="flex justify-between items-center">
                      <motion.h3 layout="position" className="text-white font-semibold">
                        {subject}
                      </motion.h3>
                      <motion.div
                        animate={{ rotate: expandedSubject === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="text-[#7C3AED]" size={20} />
                      </motion.div>
                    </div>

                    <AnimatePresence mode="wait">
                      {expandedSubject === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                              height: { duration: 0.3 },
                              opacity: { duration: 0.2, delay: 0.1 }
                            }
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.3 },
                              opacity: { duration: 0.2 }
                            }
                          }}
                        >
                          <motion.div
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            exit={{ y: -10 }}
                            className="mt-4 pt-4 border-t border-gray-700"
                          >
                            <h4 className="text-gray-300 mb-2">Available Files:</h4>
                            <ul className="space-y-2">
                              <motion.li
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-gray-400 hover:text-white cursor-pointer flex items-center space-x-2"
                              >
                                <FileText size={16} />
                                <span>Lecture Notes</span>
                              </motion.li>
                              <motion.li
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-gray-400 hover:text-white cursor-pointer flex items-center space-x-2"
                              >
                                <Book size={16} />
                                <span>Reference Materials</span>
                              </motion.li>
                            </ul>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MaterialsPage;