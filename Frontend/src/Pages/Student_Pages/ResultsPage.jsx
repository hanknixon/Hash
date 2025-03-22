import React, {useState} from 'react';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import {
    Search, Bell, CheckCircle, Clock, AlertCircle, FileText,
    Book, BookMarked, Trophy, Users, LogOut, X,
    Brain, Zap, Flame, ChevronDown, Award, Star
} from 'lucide-react';
import {PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';

// Dummy data for the quiz results
const quizResults = {
    topic: "Data Structures and Algorithms",
    subject: "Computer Science",
    teacher: "Dr. Manoj T Joy",
    score: 7,
    totalQuestions: 10,
    grade: "B+",
    performance: {
        easy: {correct: 2, total: 3},
        medium: {correct: 3, total: 4},
        hard: {correct: 2, total: 3}
    },
    questions: [
        {
            id: 1,
            difficulty: "easy",
            question: "What is the time complexity of searching an element in a sorted array using binary search?",
            userAnswer: "O(log n)",
            correctAnswer: "O(log n)",
            isCorrect: true,
            explanation: "Binary search repeatedly divides the search space in half, resulting in a logarithmic time complexity."
        },
        // ... more questions
    ],
    classPerformance: [
        {name: 'A+', students: 5},
        {name: 'A', students: 8},
        {name: 'B+', students: 12},
        {name: 'B', students: 15},
        {name: 'C+', students: 10},
        {name: 'C', students: 7},
        {name: 'F', students: 3}
    ]
};

const COLORS = ['#10B981', '#EF4444'];

const ResultsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const pieData = [
        {name: 'Correct', value: quizResults.score},
        {name: 'Incorrect', value: quizResults.totalQuestions - quizResults.score}
    ];

    const getDifficultyIcon = (difficulty) => {
        switch (difficulty) {
            case 'easy':
                return <Brain className="text-green-400" size={20}/>;
            case 'medium':
                return <Zap className="text-yellow-400" size={20}/>;
            case 'hard':
                return <Flame className="text-red-400" size={20}/>;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            {/* Sidebar */}
            <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col">
                {/* Logo */}
                <div className="mb-8 whitespace-nowrap">
                    <Link to="/StudentDashboard">
                        <img
                            src="../Images/HashLogoDashboard.png"
                            alt="Hash Logo"
                            className="h-12 w-auto transition-transform duration-200 transform hover:scale-110"/>
                    </Link>
                </div>
                <div className="border-b border-gray-700 mb-6"></div>

                <motion.div
                    whileHover={{scale: 1.02}}
                    className={`text-lg font-semibold mb-4 cursor-pointer transition-colors duration-200 ${
                        location.pathname === "/StudentDashboard" ? "text-purple-400" : "text-white hover:text-purple-400"
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
                        <motion.li whileHover={{x: 4}}
                                   className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                   onClick={() => navigate("/CompletedQuizPage")}>
                            <CheckCircle size={18} className="mr-2"/> Completed Quizzes
                        </motion.li>
                        <motion.li whileHover={{x: 4}}
                                   className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                   onClick={() => navigate("/UpcomingQuizPage")}>
                            <Clock size={18} className="mr-2"/> Upcoming Quizzes
                        </motion.li>
                        <motion.li whileHover={{x: 4}}
                                   className="flex items-center text-gray-300 hover:text-white cursor-pointer"
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
                        <motion.li whileHover={{x: 4}}
                                   className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                   onClick={() => navigate("/PYQsPage")}>
                            <FileText size={18} className="mr-2"/> PYQs
                        </motion.li>
                        <motion.li whileHover={{x: 4}}
                                   className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                   onClick={() => navigate("/SyllabusPage")}>
                            <Book size={18} className="mr-2"/> Syllabus
                        </motion.li>
                        <motion.li whileHover={{x: 4}}
                                   className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                   onClick={() => navigate("/MaterialsPage")}>
                            <BookMarked size={18} className="mr-2"/> Materials / Notes
                        </motion.li>
                    </ul>
                </div>

                <div className="border-b border-gray-700 mb-6"></div>

                {/* Ranks Section */}
                <div className="mb-6">
                    <div className="text-[#8F8F8F] text-sm mb-3">RANKS</div>
                    <ul className="space-y-3">
                        <motion.li whileHover={{x: 4}}
                                   className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                   onClick={() => navigate("/RanksPage")}>
                            <Trophy size={18} className="mr-2"/> View Ranks
                        </motion.li>
                    </ul>
                </div>

                <div className="border-b border-gray-700 mb-6"></div>

                {/* Teachers Section */}
                <div className="mb-6">
                    <div className="text-[#8F8F8F] text-sm mb-3">TEACHERS</div>
                    <ul className="space-y-3">
                        <motion.li whileHover={{x: 4}}
                                   className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                   onClick={() => navigate("/MyTeachersPage")}>
                            <Users size={18} className="mr-2"/> My Teachers
                        </motion.li>
                    </ul>
                </div>

                {/* Logout */}
                <motion.div whileHover={{scale: 1.02}} className="mt-auto">
                    <button
                        onClick={() => setLogoutModalOpen(true)}
                        className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] transition-all duration-200 p-2 rounded-lg w-full"
                    >
                        <LogOut size={18} className="mr-2"/> Logout
                    </button>
                </motion.div>
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
                    <div className="text-white">
                        <h1 className="text-xl font-bold">{quizResults.topic}</h1>
                        <p className="text-sm text-gray-400">{quizResults.subject} • {quizResults.teacher}</p>
                    </div>
                    <div className="flex items-center space-x-6">
                        <motion.button whileHover={{scale: 1.1}} className="relative">
                            <Bell size={24} className="text-gray-300 hover:text-white"/>
                            <span
                                className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">3</span>
                        </motion.button>
                        <div className="flex items-center space-x-3">
                            <span className="text-white">Welcome, User</span>
                            <motion.img
                                whileHover={{scale: 1.1}}
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Content */}
                <div className="p-8">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {/* Score Overview */}
                        <motion.div
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 0.1}}
                            className="bg-[#1E1C2E] rounded-xl p-6"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <Star className="text-yellow-400 mr-2"/>
                                Your Performance
                            </h2>
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-48 h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index]}/>
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-4xl font-bold text-white">{quizResults.score}/{quizResults.totalQuestions}</h3>
                                    <p className="text-gray-400">Total Score</p>
                                    <div className="mt-4">
                                        <span
                                            className="text-2xl font-bold text-purple-400">Grade: {quizResults.grade}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Class Performance */}
                        <motion.div
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 0.2}}
                            className="bg-[#1E1C2E] rounded-xl p-6"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                <Award className="text-purple-400 mr-2"/>
                                Class Performance
                            </h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={quizResults.classPerformance}>
                                        <XAxis dataKey="name" stroke="#9CA3AF"/>
                                        <YAxis stroke="#9CA3AF"/>
                                        <Tooltip
                                            contentStyle={{backgroundColor: '#1E1C2E', border: 'none'}}
                                            labelStyle={{color: '#fff'}}
                                        />
                                        <Bar dataKey="students" fill="#7C3AED"/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Detailed Analysis */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                        className="mt-8 bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Question Analysis</h2>
                        <div className="space-y-4">
                            {quizResults.questions.map((question, index) => (
                                <motion.div
                                    key={question.id}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: index * 0.1}}
                                    className={`bg-[#2D2B3D] rounded-xl p-6 border-l-4 ${
                                        question.isCorrect ? 'border-green-400' : 'border-red-400'
                                    }`}
                                >
                                    <div className="flex items-start justify-between cursor-pointer"
                                         onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}>
                                        <div className="flex items-start space-x-4">
                                            <div
                                                className="flex-shrink-0 w-8 h-8 bg-[#1E1C2E] rounded-full flex items-center justify-center">
                                                {question.isCorrect ? (
                                                    <CheckCircle className="text-green-400" size={20}/>
                                                ) : (
                                                    <X className="text-red-400" size={20}/>
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2 mb-2">
                                                    {getDifficultyIcon(question.difficulty)}
                                                    <span
                                                        className="text-gray-400 text-sm capitalize">{question.difficulty}</span>
                                                </div>
                                                <h3 className="text-white text-lg">{question.question}</h3>
                                            </div>
                                        </div>
                                        <motion.div
                                            animate={{rotate: expandedQuestion === question.id ? 180 : 0}}
                                            transition={{duration: 0.3}}
                                        >
                                            <ChevronDown className="text-gray-400"/>
                                        </motion.div>
                                    </div>

                                    <AnimatePresence>
                                        {expandedQuestion === question.id && (
                                            <motion.div
                                                initial={{height: 0, opacity: 0}}
                                                animate={{height: "auto", opacity: 1}}
                                                exit={{height: 0, opacity: 0}}
                                                transition={{duration: 0.3}}
                                                className="mt-4 pt-4 border-t border-gray-700"
                                            >
                                                <div className="space-y-2">
                                                    <p className="text-gray-400">
                                                        Your Answer: <span
                                                        className={question.isCorrect ? "text-green-400" : "text-red-400"}>
                              {question.userAnswer}
                            </span>
                                                    </p>
                                                    {!question.isCorrect && (
                                                        <p className="text-gray-400">
                                                            Correct Answer: <span
                                                            className="text-green-400">{question.correctAnswer}</span>
                                                        </p>
                                                    )}
                                                    <p className="text-gray-300 mt-4">{question.explanation}</p>
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
        </div>
    );
};

export default ResultsPage;