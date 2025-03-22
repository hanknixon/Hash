import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell, Search, MessageSquare, AlertTriangle, TrendingUp, Brain, Target, BookOpen, Clock,
    Plus, CheckCircle, FileText, Book, BookMarked, Trophy, Users, LogOut, X, Filter, ChevronDown
} from 'lucide-react';

// Dummy data for students
const studentsData = {
    "Year 1": [
        {
            id: 1,
            name: "Alice Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
            performance: 92,
            status: "Well Performing",
            subjects: ["Mathematics", "Physics"],
            strengths: ["Problem Solving", "Analytical Thinking"],
            weaknesses: ["Complex Equations"],
            recentActivity: {
                quizzes: 8,
                attendance: "95%",
                lastActive: "2 hours ago"
            },
            interventionNeeded: false
        },
        {
            id: 2,
            name: "Bob Smith",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop",
            performance: 65,
            status: "Needs Help",
            subjects: ["Chemistry", "Biology"],
            strengths: ["Lab Work", "Memorization"],
            weaknesses: ["Theory Application", "Time Management"],
            recentActivity: {
                quizzes: 5,
                attendance: "75%",
                lastActive: "3 days ago"
            },
            interventionNeeded: true
        }
    ],
    "Year 2": [
        {
            id: 3,
            name: "Carol Williams",
            avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop",
            performance: 88,
            status: "Well Performing",
            subjects: ["Physics", "Mathematics"],
            strengths: ["Conceptual Understanding"],
            weaknesses: ["Time Management"],
            recentActivity: {
                quizzes: 7,
                attendance: "90%",
                lastActive: "1 day ago"
            },
            interventionNeeded: false
        }
    ],
    "Year 3": [
        {
            id: 4,
            name: "David Brown",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop",
            performance: 45,
            status: "Inactive",
            subjects: ["Computer Science", "Mathematics"],
            strengths: ["Programming"],
            weaknesses: ["Attendance", "Assignment Submission"],
            recentActivity: {
                quizzes: 2,
                attendance: "60%",
                lastActive: "1 week ago"
            },
            interventionNeeded: true
        }
    ],
    "Year 4": [
        {
            id: 5,
            name: "Emma Davis",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
            performance: 95,
            status: "Well Performing",
            subjects: ["Data Structures", "Algorithms"],
            strengths: ["Problem Solving", "Coding"],
            weaknesses: ["Group Projects"],
            recentActivity: {
                quizzes: 9,
                attendance: "98%",
                lastActive: "1 hour ago"
            },
            interventionNeeded: false
        }
    ]
};

const MyStudents = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('Year 1');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const filteredStudents = studentsData[selectedYear]?.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = selectedFilter === 'all' ||
                            (selectedFilter === 'needsHelp' && student.status === 'Needs Help') ||
                            (selectedFilter === 'wellPerforming' && student.status === 'Well Performing') ||
                            (selectedFilter === 'inactive' && student.status === 'Inactive');
        return matchesSearch && matchesFilter;
    }) || [];

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            {/* Sidebar */}
            <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col h-screen overflow-hidden">
                <div className="flex-1 flex flex-col min-h-0">
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

                    <motion.div
                        whileHover={{x: 4}}
                        className="text-lg font-semibold mb-4 cursor-pointer text-white hover:text-purple-400"
                        onClick={() => navigate("/TeacherDashboard")}
                    >
                        Dashboard
                    </motion.div>

                    <div className="border-b border-gray-700 mb-6"></div>

                    {/* Quizzes Section */}
                    <div className="mb-6">
                        <div className="text-[#8F8F8F] text-sm mb-3">QUIZZES</div>
                        <ul className="space-y-3">
                            <motion.li
                                whileHover={{x: 4}}
                                className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                onClick={() => navigate("/AssignQuizzes")}
                            >
                                <Plus size={18} className="mr-2"/> Assign Quiz
                            </motion.li>
                            <motion.li
                                whileHover={{x: 4}}
                                className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                onClick={() => navigate("/CompletedQuizzes")}
                            >
                                <CheckCircle size={18} className="mr-2"/> Completed Quizzes
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
                    <div className="mb-6">
                        <div className="text-[#8F8F8F] text-sm mb-3">STUDENTS</div>
                        <ul className="space-y-3">
                            <li className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg">
                                <Users size={18} className="mr-2"/> Student Section
                            </li>
                            <motion.li
                                whileHover={{x: 4}}
                                className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                onClick={() => navigate("/ViewRanks")}
                            >
                                <Trophy size={18} className="mr-2"/> Ranks Section
                            </motion.li>
                        </ul>
                    </div>

                    {/* Logout button */}
                    <div className="mt-auto">
                        <button
                            onClick={() => setLogoutModalOpen(true)}
                            className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] transition-all duration-200 p-2 rounded-lg w-full"
                        >
                            <LogOut size={18} className="mr-2"/> Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Navbar */}
                <div className="bg-[#1E1C2E] p-4 flex justify-between items-center shadow-md">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                            <input
                                type="text"
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Year Filter */}
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {Object.keys(studentsData).map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>

                        {/* Status Filter */}
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className="px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="all">All Students</option>
                            <option value="needsHelp">Needs Help</option>
                            <option value="wellPerforming">Well Performing</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-6">
                        <motion.button whileHover={{scale: 1.1}} className="relative">
                            <Bell size={24} className="text-gray-300 hover:text-white"/>
                            <span
                                className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">3</span>
                        </motion.button>
                        <div className="flex items-center space-x-3">
                            <span className="text-white">Dr. Smith</span>
                            <motion.img
                                whileHover={{scale: 1.1}}
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop"
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Students Content */}
                <div className="p-8">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Student Management</h2>
                        <div className="space-y-6">
                            {filteredStudents.map((student) => (
                                <motion.div
                                    key={student.id}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    className="bg-[#2D2B3D] rounded-lg p-6"
                                >
                                    {/* Student Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center space-x-4">
                                            <motion.img
                                                whileHover={{scale: 1.1}}
                                                src={student.avatar}
                                                alt={student.name}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div>
                                                <h2 className="text-xl font-semibold text-white">{student.name}</h2>
                                                <div className="flex space-x-2 mt-1">
                                                    {student.subjects.map((subject, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="text-xs bg-[#1E1C2E] text-gray-300 px-2 py-1 rounded"
                                                        >
                                                            {subject}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-3">
                                            <motion.button
                                                whileHover={{scale: 1.05}}
                                                className="flex items-center space-x-2 bg-[#7C3AED] text-white px-4 py-2 rounded-lg hover:bg-[#6D2AE3] transition-colors"
                                            >
                                                <MessageSquare size={18}/>
                                                <span>Message</span>
                                            </motion.button>
                                            {student.interventionNeeded && (
                                                <motion.div
                                                    initial={{scale: 0.9}}
                                                    animate={{scale: 1}}
                                                    className="flex items-center space-x-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-lg"
                                                >
                                                    <AlertTriangle size={18}/>
                                                    <span>Needs Attention</span>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Performance Metrics */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        {/* Overall Performance */}
                                        <div className="bg-[#1E1C2E] p-4 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-gray-400">Overall Performance</span>
                                                <TrendingUp size={18}
                                                           className={student.performance >= 80 ? 'text-green-500' : 'text-yellow-500'}/>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded-full mb-2">
                                                <motion.div
                                                    initial={{width: 0}}
                                                    animate={{width: `${student.performance}%`}}
                                                    className={`h-full rounded-full ${
                                                        student.performance >= 90 ? 'bg-green-500' :
                                                            student.performance >= 70 ? 'bg-blue-500' :
                                                                'bg-yellow-500'
                                                    }`}
                                                />
                                            </div>
                                            <span className="text-white font-semibold">{student.performance}%</span>
                                        </div>

                                        {/* Recent Activity */}
                                        <div className="bg-[#1E1C2E] p-4 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-gray-400">Recent Activity</span>
                                                <Clock size={18} className="text-blue-500"/>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Quizzes Taken:</span>
                                                    <span
                                                        className="text-white">{student.recentActivity.quizzes}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Attendance:</span>
                                                    <span
                                                        className="text-white">{student.recentActivity.attendance}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Last Active:</span>
                                                    <span
                                                        className="text-white">{student.recentActivity.lastActive}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Learning Style */}
                                        <div className="bg-[#1E1C2E] p-4 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-gray-400">Learning Analysis</span>
                                                <Brain size={18} className="text-purple-500"/>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Target size={16} className="text-green-500"/>
                                                    <span className="text-gray-400">Strengths:</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {student.strengths.map((strength, idx) => (
                                                        <span key={idx}
                                                              className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded">
                                                            {strength}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center space-x-2 mt-3">
                                                    <AlertTriangle size={16} className="text-yellow-500"/>
                                                    <span className="text-gray-400">Areas for Improvement:</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {student.weaknesses.map((weakness, idx) => (
                                                        <span key={idx}
                                                              className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded">
                                                            {weakness}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-4">
                                        <motion.button
                                            whileHover={{scale: 1.02}}
                                            className="flex items-center space-x-2 bg-[#1E1C2E] text-white px-4 py-2 rounded-lg hover:bg-[#2A283A] transition-colors"
                                        >
                                            <BookOpen size={18}/>
                                            <span>View Detailed Progress</span>
                                        </motion.button>
                                        <motion.button
                                            whileHover={{scale: 1.02}}
                                            className="flex items-center space-x-2 bg-[#1E1C2E] text-white px-4 py-2 rounded-lg hover:bg-[#2A283A] transition-colors"
                                        >
                                            <Target size={18}/>
                                            <span>Set Learning Goals</span>
                                        </motion.button>
                                        <motion.button
                                            whileHover={{scale: 1.02}}
                                            className="flex items-center space-x-2 bg-[#1E1C2E] text-white px-4 py-2 rounded-lg hover:bg-[#2A283A] transition-colors"
                                        >
                                            <MessageSquare size={18}/>
                                            <span>Send Feedback</span>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Logout Modal */}
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

export default MyStudents;