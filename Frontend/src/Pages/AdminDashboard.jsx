import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Bell, Search, User, BookOpen, Clock, CheckCircle, AlertCircle,
  FileText, Book, GraduationCap, Trophy, Users, LogOut, ChevronRight,
  Star, BookMarked, X, School, Briefcase, ClipboardList,
  MessagesSquare, UserCog, Microscope, Building2, ListChecks,
  Upload, CheckSquare, AlertOctagon, MessageCircle, Filter,
  ShieldAlert, CheckCircle2, Timer, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Dummy data for class progress
const classProgress = [
  {
    year: "Year 1 Students",
    currentQuiz: "Data Structures - Binary Trees",
    progress: 75,
    remaining: 5,
    subject: "Computer Science"
  },
  {
    year: "Year 2 Students",
    currentQuiz: "Database Management - Normalization",
    progress: 60,
    remaining: 8,
    subject: "Information Systems"
  },
  {
    year: "Year 3 Students",
    currentQuiz: "Computer Networks - OSI Model",
    progress: 85,
    remaining: 3,
    subject: "Networking"
  },
  {
    year: "Year 4 Students",
    currentQuiz: "Machine Learning - Neural Networks",
    progress: 45,
    remaining: 10,
    subject: "Artificial Intelligence"
  }
];

// Dummy data for teacher progress
const teacherProgress = [
  {
    name: "Dr. Emily Wilson",
    subject: "Data Structures",
    currentClass: "Year 1",
    topicsCompleted: 15,
    totalTopics: 20,
    progress: 75,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop"
  },
  {
    name: "Prof. John Davis",
    subject: "Computer Networks",
    currentClass: "Year 3",
    topicsCompleted: 12,
    totalTopics: 18,
    progress: 67,
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=50&h=50&fit=crop"
  },
  {
    name: "Dr. Lisa Kumar",
    subject: "Machine Learning",
    currentClass: "Year 4",
    topicsCompleted: 8,
    totalTopics: 15,
    progress: 53,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop"
  }
];

// Dummy data for top performers by year
const topPerformersByYear = {
  "Year 1": [
    { name: "John Smith", score: 95, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop" },
    { name: "Emma Davis", score: 92, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" },
    { name: "Michael Chen", score: 90, avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop" }
  ],
  "Year 2": [
    { name: "Sarah Wilson", score: 98, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop" },
    { name: "James Lee", score: 96, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop" },
    { name: "Anna Brown", score: 93, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop" }
  ],
  "Year 3": [
    { name: "David Park", score: 97, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50&h=50&fit=crop" },
    { name: "Lisa Zhang", score: 95, avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=50&h=50&fit=crop" },
    { name: "Kevin Patel", score: 94, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" }
  ],
  "Year 4": [
    { name: "Rachel Kim", score: 99, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop" },
    { name: "Thomas Wang", score: 98, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" },
    { name: "Maria Garcia", score: 97, avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=50&h=50&fit=crop" }
  ]
};

// Dummy data for complaints
const complaintsData = [
  {
    id: 1,
    student: "Alex Thompson",
    subject: "Quiz Platform Error",
    description: "Unable to submit quiz due to technical error",
    status: "pending",
    date: "2024-03-15",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop"
  },
  {
    id: 2,
    student: "Sarah Chen",
    subject: "Grade Discrepancy",
    description: "Marks not updated for recent quiz",
    status: "review",
    date: "2024-03-14",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop"
  },
  {
    id: 3,
    student: "Michael Park",
    subject: "Content Access Issue",
    description: "Cannot access study materials",
    status: "pending",
    date: "2024-03-13",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop"
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("Year 1");
  const [expandedComplaint, setExpandedComplaint] = useState(null);
  const [complaints, setComplaints] = useState(complaintsData);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/LoginPage");
  };

  const handleComplaintAction = (id, action) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(complaint =>
        complaint.id === id
          ? { ...complaint, status: action === 'resolve' ? 'resolved' : 'review' }
          : complaint
      )
    );
    setExpandedComplaint(null);
  };

  return (
    <div className="flex h-screen bg-[#2D2B3D] overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo */}
          <div className="mb-8 flex-shrink-0">
            <h1 className="text-2xl font-bold">Hash - Quiz Learning Platform</h1>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#1E1C2E] [&::-webkit-scrollbar-thumb]:bg-[#3A3750] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#4A4860] [&::-webkit-scrollbar-thumb]:transition-colors">
            <div className="border-b border-gray-700 mb-6"></div>

            <motion.div
                whileHover={{x: 4}}
                className="text-lg font-semibold mb-4 cursor-pointer text-white hover:text-purple-400"
            >
              Dashboard
            </motion.div>

            <div className="border-b border-gray-700 mb-6"></div>

            {/* Students Section */}
            <div className="mb-6">
              <div className="text-[#8F8F8F] text-sm mb-3">STUDENTS</div>
              <ul className="space-y-3">
                {[1, 2, 3, 4].map((year) => (
                    <motion.li
                        key={year}
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                    >
                      <School size={18} className="mr-2"/> Year {year} Students
                    </motion.li>
                ))}
              </ul>
            </div>

            <div className="border-b border-gray-700 mb-6"></div>

            {/* Faculty Section */}
            <div className="mb-6">
              <div className="text-[#8F8F8F] text-sm mb-3">FACULTY</div>
              <ul className="space-y-3">
                <motion.li whileHover={{x: 4}}
                           className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                  <Briefcase size={18} className="mr-2"/> Teachers
                </motion.li>
                <motion.li whileHover={{x: 4}}
                           className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                  <Microscope size={18} className="mr-2"/> Lab Instructors
                </motion.li>
                <motion.li whileHover={{x: 4}}
                           className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                  <UserCog size={18} className="mr-2"/> Administrators
                </motion.li>
              </ul>
            </div>

            <div className="border-b border-gray-700 mb-6"></div>

            {/* Quiz Tracker Section */}
            <div className="mb-6">
              <div className="text-[#8F8F8F] text-sm mb-3">QUIZ TRACKER</div>
              <ul className="space-y-3">
                <motion.li whileHover={{x: 4}}
                           className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                  <Upload size={18} className="mr-2"/> Quizzes Uploaded
                </motion.li>
                <motion.li whileHover={{x: 4}}
                           className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                  <CheckSquare size={18} className="mr-2"/> Quizzes Evaluated
                </motion.li>
                <motion.li whileHover={{x: 4}}
                           className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                  <AlertOctagon size={18} className="mr-2"/> Quizzes Correction
                </motion.li>
              </ul>
            </div>

            <div className="border-b border-gray-700 mb-6"></div>

            {/* Resources Section */}
            <div className="mb-6">
              <div className="text-[#8F8F8F] text-sm mb-3">RESOURCES / RANKS</div>
              <ul className="space-y-3">
                <motion.li whileHover={{x: 4}}
                           className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                  <FileText size={18} className="mr-2"/> PYQs
                </motion.li>
                <motion.li whileHover={{x: 4}}
                           className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                  <Book size={18} className="mr-2"/> Syllabus
                </motion.li>
                <motion.li whileHover={{x: 4}}
                           className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                  <BookMarked size={18} className="mr-2"/> Materials / Notes
                </motion.li>
                <motion.li whileHover={{x: 4}}
                           className="flex items-center text-gray-300 hover:text-white cursor-pointer">
                  <Trophy size={18} className="mr-2"/> View Ranks
                </motion.li>
              </ul>
            </div>
          </div>

          {/* Logout button */}
          <div className="flex-shrink-0 pt-6">
            <button
                onClick={() => setLogoutModalOpen(true)}
                className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] transition-all duration-200 p-2 rounded-lg w-full"
            >
              <LogOut size={18} className="mr-2"/> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Rest of the main content remains the same */}
        {/* Top Navigation */}
        <div className="bg-[#1E1C2E] p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
              <input
                type="text"
                placeholder="Search..."
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
              <span className="text-white">Welcome, Admin</span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center"
              >
                <UserCog size={24} className="text-white"/>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Class Progress Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1E1C2E] rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Class Progress Tracker</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {classProgress.map((classData, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#2D2B3D] p-4 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-white font-semibold">{classData.year}</h3>
                      <p className="text-gray-400 text-sm">
                        Current Quiz: {classData.currentQuiz}
                      </p>
                      <p className="text-purple-400 text-sm">
                        Subject: {classData.subject}
                      </p>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {classData.remaining} topics left
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${classData.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-[#7C3AED] h-2 rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-gray-400 text-sm">{classData.progress}% Complete</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Teacher Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1E1C2E] rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Teacher Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teacherProgress.map((teacher, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#2D2B3D] p-4 rounded-lg"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={teacher.avatar}
                      alt={teacher.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{teacher.name}</h3>
                      <p className="text-purple-400 text-sm">{teacher.subject}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">
                      Current Class: {teacher.currentClass}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Topics: {teacher.topicsCompleted}/{teacher.totalTopics}
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${teacher.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-[#7C3AED] h-2 rounded-full"
                      ></motion.div>
                    </div>
                    <p className="text-right text-sm text-gray-400">
                      {teacher.progress}% Complete
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Top Performers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1E1C2E] rounded-xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Top Performers</h2>
              <div className="flex space-x-2">
                {Object.keys(topPerformersByYear).map((year) => (
                  <motion.button
                    key={year}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedYear(year)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                      selectedYear === year
                        ? "bg-purple-500 text-white"
                        : "bg-[#2D2B3D] text-gray-400 hover:text-white"
                    }`}
                  >
                    {year}
                  </motion.button>
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedYear}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {topPerformersByYear[selectedYear].map((student, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#2D2B3D] p-4 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="text-white font-semibold">{student.name}</h3>
                        <p className="text-gray-400 text-sm">{selectedYear}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Star className="text-yellow-500" size={20}/>
                      </motion.div>
                      <span className="text-white">{student.score}%</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Complaints Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1E1C2E] rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Recent Complaints</h2>
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <motion.div
                  key={complaint.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#2D2B3D] p-4 rounded-lg"
                >
                  <div
                    className="flex justify-between items-start cursor-pointer"
                    onClick={() => setExpandedComplaint(
                      expandedComplaint === complaint.id ? null : complaint.id
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={complaint.avatar}
                        alt={complaint.student}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="text-white font-semibold">{complaint.student}</h3>
                        <p className="text-gray-400 text-sm">{complaint.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        complaint.status === 'resolved'
                          ? 'bg-green-500/20 text-green-400'
                          : complaint.status === 'review'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                      }`}>
                        {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                      </span>
                      <motion.div
                        animate={{ rotate: expandedComplaint === complaint.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="text-gray-400" size={20}/>
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedComplaint === complaint.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-700"
                      >
                        <p className="text-gray-300 mb-4">{complaint.description}</p>
                        <div className="flex justify-end space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleComplaintAction(complaint.id, 'review')}
                            className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg"
                          >
                            Put on Review
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleComplaintAction(complaint.id, 'resolve')}
                            className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg"
                          >
                            Resolve
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

export default AdminDashboard;