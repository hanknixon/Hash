import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {
    Bell, Search, UserCog, School, Briefcase, ClipboardList,
    MessagesSquare, Microscope, Building2, ListChecks,
    Upload, CheckSquare, AlertOctagon, FileText, Book,
    BookMarked, Trophy, Users, LogOut, X, Plus, Edit2, Trash2,
    Download, Brain, Target, Glasses, GraduationCap, Cpu,
    Compass, Award, Crown, Star, Filter, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { HoverBorderGradient } from "../../../ui/hover-border-gradient";

// Rank system data
const rankSystem = [
    { title: "Novice", icon: Brain, description: "Just getting started.", points: 0, color: "text-gray-400" },
    { title: "Apprentice", icon: Brain, description: "Building a foundation.", points: 1000, color: "text-gray-400" },
    { title: "Challenger", icon: Target, description: "Actively engaging in quizzes.", points: 2000, color: "text-gray-500" },
    { title: "Analyst", icon: Glasses, description: "Developing critical thinking.", points: 3000, color: "text-gray-400" },
    { title: "Scholar", icon: GraduationCap, description: "Strong subject understanding.", points: 4000, color: "text-gray-500" },
    { title: "Mastermind", icon: Cpu, description: "Excelling in multiple topics.", points: 5000, color: "text-gray-400" },
    { title: "Strategist", icon: Compass, description: "Applying knowledge with precision.", points: 6000, color: "text-gray-500" },
    { title: "Expert", icon: Award, description: "Consistently achieving high scores.", points: 7000, color: "text-purple-400" },
    { title: "Elite", icon: Crown, description: "Among the top performers.", points: 8000, color: "text-red-500" },
    { title: "Grandmaster", icon: Star, description: "The pinnacle of knowledge.", points: 10000, color: "text-yellow-500" }
];

// Dummy data for student rankings
const studentRankings = {
    "Year 1": {
        "Data Structures": [
            { name: "John Smith", rank: "Grandmaster", score: 15000, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop" },
            { name: "Emma Davis", rank: "Elite", score: 12000, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" },
            { name: "Michael Chen", rank: "Expert", score: 10000, avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop" },
            { name: "Sophia Patel", rank: "Intermediate", score: 8000, avatar: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=80&h=80&fit=crop" }
        ],
        "Algorithms": [
            { name: "David Lee", rank: "Grandmaster", score: 15500, avatar: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=80&h=80&fit=crop" },
            { name: "Olivia Brown", rank: "Elite", score: 12500, avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=80&h=80&fit=crop" },
            { name: "Liam Wilson", rank: "Expert", score: 10500, avatar: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=80&h=80&fit=crop" }
        ]
    },
    "Year 2": {
        "Machine Learning": [
            { name: "Alice Johnson", rank: "Grandmaster", score: 16000, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop" },
            { name: "Robert White", rank: "Elite", score: 13000, avatar: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=80&h=80&fit=crop" },
            { name: "William Martin", rank: "Expert", score: 11000, avatar: "https://images.unsplash.com/photo-1542202221-1ec12e52f5a2?w=80&h=80&fit=crop" }
        ],
        "Operating Systems": [
            { name: "Ethan Scott", rank: "Grandmaster", score: 15800, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" },
            { name: "Ava Thompson", rank: "Elite", score: 12800, avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=80&h=80&fit=crop" },
            { name: "Daniel Hall", rank: "Expert", score: 10800, avatar: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=80&h=80&fit=crop" }
        ]
    },
    "Year 3": {
        "Artificial Intelligence": [
            { name: "Henry Nelson", rank: "Grandmaster", score: 16500, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
            { name: "Emma Roberts", rank: "Elite", score: 13500, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&h=80&fit=crop" },
            { name: "Noah Carter", rank: "Expert", score: 11500, avatar: "https://images.unsplash.com/photo-1522091066250-66518628806a?w=80&h=80&fit=crop" }
        ],
        "Computer Networks": [
            { name: "Sophia Green", rank: "Grandmaster", score: 16200, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
            { name: "James Baker", rank: "Elite", score: 13200, avatar: "https://images.unsplash.com/photo-1517805686688-47dd930554b7?w=80&h=80&fit=crop" },
            { name: "Lily Adams", rank: "Expert", score: 11200, avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=80&h=80&fit=crop" }
        ]
    },
    "Year 4": {
        "Cybersecurity": [
            { name: "Lucas Mitchell", rank: "Grandmaster", score: 17000, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop" },
            { name: "Mia Parker", rank: "Elite", score: 14000, avatar: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=80&h=80&fit=crop" },
            { name: "Alexander King", rank: "Expert", score: 12000, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" }
        ],
        "Cloud Computing": [
            { name: "Evelyn Gonzalez", rank: "Grandmaster", score: 16800, avatar: "https://images.unsplash.com/photo-1542202221-1ec12e52f5a2?w=80&h=80&fit=crop" },
            { name: "Benjamin Harris", rank: "Elite", score: 13800, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&h=80&fit=crop" },
            { name: "Grace Lopez", rank: "Expert", score: 11800, avatar: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=80&h=80&fit=crop" }
        ]
    }
};

const subjects = [
    "Data Structures",
    "Algorithms",
    "Database Systems",
    "Operating Systems",
    "Computer Networks"
];

const ViewRanks = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState('Year 1');
    const [selectedSubject, setSelectedSubject] = useState('Data Structures');
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const filteredStudents = studentRankings[selectedYear][selectedSubject].filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                                <CheckSquare size={18} className="mr-2"/> Completed Quizzes
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
                            <motion.li
                                whileHover={{x: 4}}
                                className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                onClick={() => navigate("/MyStudents")}
                            >
                                <Users size={18} className="mr-2"/> Student Section
                            </motion.li>
                            <li className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg">
                                <Trophy size={18} className="mr-2"/> Ranks Section
                            </li>
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
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Filters */}
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {Object.keys(studentRankings).map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>

                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            {subjects.map((subject) => (
                                <option key={subject} value={subject}>{subject}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center space-x-6">
                        <motion.button whileHover={{scale: 1.1}} className="relative">
                            <Bell size={24} className="text-gray-300 hover:text-white"/>
                            <span
                                className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">3</span>
                        </motion.button>
                        <div className="flex items-center space-x-3">
                            <span className="text-white">Welcome, Teacher</span>
                            <motion.div
                                whileHover={{scale: 1.1}}
                                className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center"
                            >
                                <UserCog size={24} className="text-white"/>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-8 space-y-8">
                    {/* Rank System Section */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Rank System</h2>
                        <div className="relative">
                            {/* Progress Line */}
                            <div
                                className="absolute top-1/2 left-0 right-0 h-2 bg-[#2D2B3D] transform -translate-y-1/2 rounded-full"></div>

                            {/* Ranks Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
                                {rankSystem.map((rank, index) => {
                                    const isSpecialRank = rank.title === "Expert" || rank.title === "Elite" || rank.title === "Grandmaster";
                                    const getHighlightColor = () => {
                                        switch (rank.title) {
                                            case "Expert":
                                                return "#7C3AED"; // Purple
                                            case "Elite":
                                                return "#EF4444"; // Red
                                            case "Grandmaster":
                                                return "#F59E0B"; // Gold
                                            default:
                                                return "#3275F8";
                                        }
                                    };

                                    const Card = isSpecialRank ? HoverBorderGradient : "div";
                                    const cardProps = isSpecialRank
                                        ? {
                                            highlightColor: getHighlightColor(),
                                            containerClassName: "w-full h-full transform hover:scale-105 transition-all duration-300",
                                            className: "p-6 bg-opacity-50",
                                            duration: 3,
                                        }
                                        : {
                                            className: "bg-[#2D2B3D] rounded-xl p-6 transform hover:scale-105 transition-transform duration-300",
                                        };

                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{opacity: 0, y: 20}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: index * 0.1}}
                                            className="h-full"
                                        >
                                            <Card {...cardProps}>
                                                <div className="flex flex-col items-center text-center relative z-20">
                                                    <div
                                                        className={`w-16 h-16 rounded-full bg-[#1E1C2E] flex items-center justify-center mb-4 ${rank.color}`}>
                                                        <rank.icon size={32}/>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white mb-2">{rank.title}</h3>
                                                    <p className="text-gray-400 text-sm mb-3">{rank.description}</p>
                                                    <p className="text-purple-400 font-semibold">{rank.points}+ points</p>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Student Rankings */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Student Rankings - {selectedYear} - {selectedSubject}</h2>
                        <div className="space-y-4">
                            {filteredStudents.map((student, index) => (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, x: -20}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{delay: index * 0.1}}
                                    className="bg-[#2D2B3D] p-6 rounded-lg flex items-center justify-between"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <motion.img
                                                whileHover={{scale: 1.1}}
                                                src={student.avatar}
                                                alt={student.name}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            {index < 3 && (
                                                <div
                                                    className={`absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full text-white ${
                                                        index === 0 ? "bg-yellow-500" :
                                                            index === 1 ? "bg-gray-400" :
                                                                "bg-orange-500"
                                                    }`}
                                                >
                                                    {index + 1}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold">{student.name}</h3>
                                            <p className="text-purple-400">{student.rank}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-white">{student.score}</p>
                                            <p className="text-gray-400">points</p>
                                        </div>
                                        {index < 3 && (
                                            <motion.button
                                                whileHover={{scale: 1.1}}
                                                className="bg-purple-500 p-2 rounded-lg hover:bg-purple-600 transition-colors"
                                            >
                                                <Download size={20} className="text-white"/>
                                            </motion.button>
                                        )}
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

export default ViewRanks;