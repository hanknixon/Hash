import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {
    Bell, Search, CheckCircle, FileText, Book,
    Users, LogOut, ChevronRight, Menu, ChevronLeft,
    X, PlusCircle, BookOpen, GraduationCap, Trophy,
    ChevronDown, Filter, Download, Eye, BookMarked
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Dummy data for completed quizzes
const completedQuizzes = [
    {
        id: 1,
        subject: "Data Structures",
        topic: "Binary Trees",
        class: "CSE-A",
        studentsCompleted: 45,
        totalStudents: 50,
        averageScore: 82,
        date: "2024-03-15"
    },
    {
        id: 2,
        subject: "Algorithms",
        topic: "Dynamic Programming",
        class: "CSE-B",
        studentsCompleted: 38,
        totalStudents: 48,
        averageScore: 75,
        date: "2024-03-14"
    },
    {
        id: 3,
        subject: "Database Systems",
        topic: "SQL Queries",
        class: "CSE-A",
        studentsCompleted: 42,
        totalStudents: 50,
        averageScore: 88,
        date: "2024-03-13"
    }
];

const CompletedQuizzes = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const handleViewDetails = (quizId) => {
        // Navigate to quiz details page
        navigate(`/quiz-details/${quizId}`);
    };

    const handleExportData = (quizId) => {
        // Handle exporting quiz data
        console.log('Exporting data for quiz:', quizId);
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="mb-8 whitespace-nowrap">
                <Link to="/TeacherDashboard">
                    <img
                        src="../Images/HashLogoDashboard.png"
                        alt="Hash Logo"
                        className="h-12 w-auto transition-transform duration-200 transform hover:scale-110"
                    />
                </Link>
            </div>

            <div className="border-b border-gray-700 mb-6"></div>

            <Link
                to="/TeacherDashboard"
                className="text-lg font-semibold mb-4 whitespace-nowrap text-white hover:text-purple-400 transition-colors"
            >
                Dashboard
            </Link>

            <div className="border-b border-gray-700 mb-6"></div>

            {/* Quizzes Section */}
            <div className="mb-6 whitespace-nowrap">
                <div className="text-[#8F8F8F] text-sm mb-3">QUIZZES</div>
                <ul className="space-y-3">
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/AssignQuizzes")}
                    >
                        <PlusCircle size={18} className="mr-2"/> Assign Quiz
                    </motion.li>
                    <li className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg">
                        <CheckCircle size={18} className="mr-2"/> Completed Quizzes
                    </li>
                </ul>
            </div>

            <div className="border-b border-gray-700 mb-6"></div>

            {/* Resources Section */}
            <div className="mb-6 whitespace-nowrap">
                <div className="text-[#8F8F8F] text-sm mb-3">RESOURCES</div>
                <ul className="space-y-3">
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/Syllabus")}
                    >
                        <Book size={18} className="mr-2"/> Syllabus
                    </motion.li>
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/PYQs")}
                    >
                        <FileText size={18} className="mr-2"/> PYQs
                    </motion.li>
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/Materials")}
                    >
                        <BookMarked size={18} className="mr-2"/> Materials
                    </motion.li>
                </ul>
            </div>

            <div className="border-b border-gray-700 mb-6"></div>

            {/* Students Section */}
            <div className="mb-6 whitespace-nowrap">
                <div className="text-[#8F8F8F] text-sm mb-3">STUDENTS</div>
                <ul className="space-y-3">
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/MyStudents")}
                    >
                        <Users size={18} className="mr-2"/> Student Section
                    </motion.li>
                    <motion.li
                        whileHover={{x: 4}}
                        className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate("/ViewRanks")}
                    >
                        <Trophy size={18} className="mr-2"/> Ranks Section
                    </motion.li>
                </ul>
            </div>

            {/* Logout at bottom */}
            <div className="mt-auto whitespace-nowrap">
                <button
                    onClick={() => setLogoutModalOpen(true)}
                    className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] transition-all duration-200 p-2 rounded-lg w-full"
                >
                    <LogOut size={18} className="mr-2"/> Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#2D2B3D]">
            {/* Sidebar */}
            <motion.div
                initial={false}
                animate={{
                    width: sidebarOpen ? "16rem" : isMobile ? "0rem" : "16rem",
                    padding: sidebarOpen ? "1.5rem" : isMobile ? "0rem" : "1.5rem",
                    opacity: sidebarOpen ? 1 : isMobile ? 0 : 1
                }}
                transition={{duration: 0.3}}
                className={`bg-[#1E1C2E] text-white h-screen sticky top-0 overflow-hidden ${isMobile ? 'absolute z-30' : ''}`}
            >
                <SidebarContent/>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Top Navigation */}
                <div className="bg-[#1E1C2E] p-4 flex justify-between items-center sticky top-0 z-10">
                    <div className="flex items-center space-x-4">
                        {isMobile && (
                            <motion.button
                                whileHover={{scale: 1.1}}
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-white hover:text-purple-400 transition-colors"
                            >
                                {sidebarOpen ? <ChevronLeft size={24}/> : <Menu size={24}/>}
                            </motion.button>
                        )}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                            <input
                                type="text"
                                placeholder="Search quizzes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full sm:w-64 pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <motion.div
                            whileHover={{scale: 1.02}}
                            className="relative"
                        >
                            <button
                                className="flex items-center space-x-2 bg-[#2D2B3D] px-4 py-2 rounded-lg hover:bg-[#3A3750] transition-colors text-white"
                            >
                                <Filter size={20}/>
                                <span>Filter</span>
                                <ChevronDown size={16}/>
                            </button>
                        </motion.div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <motion.button whileHover={{scale: 1.1}} className="relative">
                            <Bell size={24} className="text-gray-300 hover:text-white"/>
                            <span
                                className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">3</span>
                        </motion.button>
                        <div className="flex items-center space-x-3">
                            <span className="text-white hidden sm:inline">Dr. Smith</span>
                            <motion.img
                                whileHover={{scale: 1.1}}
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Quiz List */}
                <div className="p-6 space-y-4">
                    {completedQuizzes.map((quiz) => (
                        <motion.div
                            key={quiz.id}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            className="bg-[#1E1C2E] p-6 rounded-xl hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                                <div>
                                    <h3 className="text-xl font-semibold text-white">{quiz.subject}</h3>
                                    <p className="text-gray-400">{quiz.topic}</p>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <span className="text-sm text-gray-400">Class: {quiz.class}</span>
                                        <span className="text-sm text-gray-400">Date: {quiz.date}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-purple-500">{quiz.averageScore}%</p>
                                        <p className="text-sm text-gray-400">Average Score</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-green-500">
                                            {quiz.studentsCompleted}/{quiz.totalStudents}
                                        </p>
                                        <p className="text-sm text-gray-400">Completed</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-4">
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    onClick={() => handleExportData(quiz.id)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-[#2D2B3D] rounded-lg hover:bg-[#3A3750] transition-colors text-white"
                                >
                                    <Download size={18}/>
                                    <span>Export</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    onClick={() => handleViewDetails(quiz.id)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors text-white"
                                >
                                    <Eye size={18}/>
                                    <span>View Details</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            <AnimatePresence>
                {logoutModalOpen && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    >
                        <motion.div
                            initial={{scale: 0.95, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.95, opacity: 0}}
                            className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-80 text-white relative"
                        >
                            <button
                                onClick={() => setLogoutModalOpen(false)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            >
                                <X size={20}/>
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
                            <p className="text-gray-400 mb-6">Are you sure you want to log out?</p>
                            <div className="flex justify-between">
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    onClick={() => setLogoutModalOpen(false)}
                                    className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg transition-all duration-200"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{scale: 1.05}}
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

export default CompletedQuizzes;