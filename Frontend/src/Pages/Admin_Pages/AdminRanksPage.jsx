import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {motion, AnimatePresence} from 'framer-motion';
import {
    Bell, Search, UserCog, School, Briefcase, ClipboardList,
    MessagesSquare, Microscope, Building2, ListChecks,
    Upload, CheckSquare, AlertOctagon, FileText, Book,
    BookMarked, Trophy, Users, LogOut, X, Brain, Lightbulb,
    Target, Glasses, GraduationCap, Cpu, Compass, Award,
    Crown, Star, Filter, ChevronDown, Download
} from 'lucide-react';
import {HoverBorderGradient} from "../../../ui/hover-border-gradient";

// Rank system data
const rankSystem = [
    {title: "Novice", icon: Brain, description: "Just getting started.", points: 0, color: "text-gray-400"},
    {title: "Apprentice", icon: Lightbulb, description: "Building a foundation.", points: 1000, color: "text-gray-400"},
    {
        title: "Challenger",
        icon: Target,
        description: "Actively engaging in quizzes.",
        points: 2000,
        color: "text-gray-500"
    },
    {
        title: "Analyst",
        icon: Glasses,
        description: "Developing critical thinking.",
        points: 3000,
        color: "text-gray-400"
    },
    {
        title: "Scholar",
        icon: GraduationCap,
        description: "Strong subject understanding.",
        points: 4000,
        color: "text-gray-500"
    },
    {
        title: "Mastermind",
        icon: Cpu,
        description: "Excelling in multiple topics.",
        points: 5000,
        color: "text-gray-400"
    },
    {
        title: "Strategist",
        icon: Compass,
        description: "Applying knowledge with precision.",
        points: 6000,
        color: "text-gray-500"
    },
    {
        title: "Expert",
        icon: Award,
        description: "Consistently achieving high scores.",
        points: 7000,
        color: "text-purple-400"
    },
    {title: "Elite", icon: Crown, description: "Among the top performers.", points: 8000, color: "text-red-500"},
    {
        title: "Grandmaster",
        icon: Star,
        description: "The pinnacle of knowledge.",
        points: 10000,
        color: "text-yellow-500"
    }
];

// Dummy data for top performers by year
const topPerformersByYear = {
    "Year 1": [
        {
            name: "John Smith",
            rank: "Grandmaster",
            score: 15000,
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
        },
        {
            name: "Emma Davis",
            rank: "Elite",
            score: 12000,
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
        },
        {
            name: "Michael Chen",
            rank: "Expert",
            score: 10000,
            avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop"
        }
    ],
    "Year 2": [
        {
            name: "Sarah Wilson",
            rank: "Grandmaster",
            score: 14500,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
        },
        {
            name: "James Lee",
            rank: "Elite",
            score: 11800,
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop"
        },
        {
            name: "Anna Brown",
            rank: "Expert",
            score: 9800,
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop"
        }
    ],
    "Year 3": [
        {
            name: "David Park",
            rank: "Grandmaster",
            score: 15500,
            avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop"
        },
        {
            name: "Lisa Zhang",
            rank: "Elite",
            score: 12500,
            avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop"
        },
        {
            name: "Kevin Patel",
            rank: "Expert",
            score: 10200,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
        }
    ],
    "Year 4": [
        {
            name: "Rachel Kim",
            rank: "Grandmaster",
            score: 16000,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop"
        },
        {
            name: "Thomas Wang",
            rank: "Elite",
            score: 13000,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
        },
        {
            name: "Maria Garcia",
            rank: "Expert",
            score: 10500,
            avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop"
        }
    ]
};

const AdminRanksPage = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showYearFilter, setShowYearFilter] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const filteredPerformers = selectedYear === 'all'
        ? Object.entries(topPerformersByYear).flatMap(([year, performers]) =>
            performers.map(p => ({...p, year}))
        )
        : topPerformersByYear[selectedYear];

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            {/* Sidebar */}
            <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col">
                {/* Logo */}
                <div className="mb-8 whitespace-nowrap">
                    <Link to="/AdminDashboard">
                        <img
                            src="../Images/HashLogoDashboard.png"
                            alt="Hash Logo"
                            className="h-12 w-auto transition-transform duration-200 transform hover:scale-110"/>
                    </Link>
                </div>

                {/* Scrollable content */}
                <div
                    className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#1E1C2E] [&::-webkit-scrollbar-thumb]:bg-[#3A3750] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#4A4860] [&::-webkit-scrollbar-thumb]:transition-colors">
                    <div className="border-b border-gray-700 mb-6"></div>

                    <motion.div
                        whileHover={{scale: 1.02}}
                        className="text-lg font-semibold mb-4 cursor-pointer text-white hover:text-purple-400"
                        onClick={() => navigate("/AdminDashboard")}
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
                                    onClick={() => navigate(`/Year${year}StudentsPage`)}
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
                                       className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                       onClick={() => navigate("/AdminTeachersPage")}>
                                <Briefcase size={18} className="mr-2"/> Teachers
                            </motion.li>
                            <motion.li whileHover={{x: 4}}
                                       className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                       onClick={() => navigate("/AdminLabfacPage")}>
                                <Microscope size={18} className="mr-2"/> Lab Instructors
                            </motion.li>
                            <motion.li whileHover={{x: 4}}
                                       className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                       onClick={() => navigate("/AdminAdminPage")}>
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
                                       className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                       onClick={() => navigate("/QuizzesUploaded")}>
                                <Upload size={18} className="mr-2"/> Quizzes Uploaded
                            </motion.li>
                            <motion.li whileHover={{x: 4}}
                                       className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                       onClick={() => navigate("/QuizzesCorrectionPage")}>
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
                                       className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                       onClick={() => navigate("/AdminPYQsPage")}>
                                <FileText size={18} className="mr-2"/> PYQs
                            </motion.li>
                            <motion.li whileHover={{x: 4}}
                                       className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                       onClick={() => navigate("/AdminSyllabusPage")}>
                                <Book size={18} className="mr-2"/> Syllabus
                            </motion.li>
                            <motion.li whileHover={{x: 4}}
                                       className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                       onClick={() => navigate("/AdminMaterialsPage")}>
                                <BookMarked size={18} className="mr-2"/> Materials / Notes
                            </motion.li>
                            <li className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg"
                                onClick={() => navigate("/AdminRanksPage")}>
                                <Trophy size={18} className="mr-2"/> View Ranks
                            </li>
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
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Navbar */}
                <div className="bg-[#1E1C2E] p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={20}/>
                            <input
                                type="text"
                                placeholder="Search students..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Year Filter */}
                        <div className="relative">
                            <motion.button
                                whileHover={{scale: 1.05}}
                                onClick={() => setShowYearFilter(!showYearFilter)}
                                className="flex items-center space-x-2 bg-[#2D2B3D] px-4 py-2 rounded-lg hover:bg-[#3A3750] transition-colors text-white"
                            >
                                <Filter size={20}/>
                                <span>{selectedYear === 'all' ? 'All Years' : selectedYear}</span>
                                <ChevronDown size={16}/>
                            </motion.button>

                            <AnimatePresence>
                                {showYearFilter && (
                                    <motion.div
                                        initial={{opacity: 0, y: -10}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: -10}}
                                        className="absolute z-50 mt-2 w-48 bg-[#2D2B3D] rounded-lg shadow-lg py-2"
                                    >
                                        <div
                                            className="px-4 py-2 hover:bg-[#3A3750] cursor-pointer text-white"
                                            onClick={() => {
                                                setSelectedYear('all');
                                                setShowYearFilter(false);
                                            }}
                                        >
                                            All Years
                                        </div>
                                        {Object.keys(topPerformersByYear).map((year) => (
                                            <div
                                                key={year}
                                                className="px-4 py-2 hover:bg-[#3A3750] cursor-pointer text-white"
                                                onClick={() => {
                                                    setSelectedYear(year);
                                                    setShowYearFilter(false);
                                                }}
                                            >
                                                {year}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <motion.button whileHover={{scale: 1.1}} className="relative">
                            <Bell size={24} className="text-gray-300 hover:text-white"/>
                            <span
                                className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">3</span>
                        </motion.button>
                        <div className="flex items-center space-x-3">
                            <span className="text-white">Welcome, Admin</span>
                            <motion.div
                                whileHover={{scale: 1.1}}
                                className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center"
                            >
                                <UserCog size={24} className="text-white"/>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Ranks Content */}
                <div className="p-8 space-y-8">
                    {/* Top Performers Section */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-2xl p-8"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Top Performers</h2>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                            >
                                <Download size={20}/>
                                <span>Export Rankings</span>
                            </motion.button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {filteredPerformers.slice(0, 3).map((performer, index) => (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: index * 0.1}}
                                    className="bg-[#2D2B3D] rounded-xl p-6 transform hover:scale-105 transition-transform duration-300"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="relative">
                                            <img
                                                src={performer.avatar}
                                                alt={performer.name}
                                                className="w-24 h-24 rounded-full mb-4 object-cover"
                                            />
                                            <div
                                                className={`absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full text-white ${
                                                    index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-300" : "bg-orange-500"
                                                }`}
                                            >
                                                {index + 1}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1">{performer.name}</h3>
                                        <p className="text-purple-400 font-semibold mb-2">{performer.rank}</p>
                                        <p className="text-gray-400">{performer.score} points</p>
                                        {selectedYear === 'all' && (
                                            <p className="text-gray-400 mt-2">{performer.year}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Rank System Section */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2}}
                        className="bg-[#1E1C2E] rounded-2xl p-8"
                    >
                        <h2 className="text-3xl font-bold text-white mb-8">Rank System</h2>
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
                                                    <p className="text-purple-400 font-semibold">{rank.points}+
                                                        points</p>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
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

export default AdminRanksPage;