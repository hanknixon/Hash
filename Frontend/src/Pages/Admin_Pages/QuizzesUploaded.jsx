import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {motion, AnimatePresence} from 'framer-motion';
import {
    Bell,
    Search,
    UserCog,
    School,
    Briefcase,
    Microscope,
    Upload,
    CheckSquare,
    AlertOctagon,
    FileText,
    Book,
    BookMarked,
    Trophy,
    Users,
    LogOut,
    X,
    Filter,
    ChevronDown,
    Eye
} from 'lucide-react';

// Dummy data for quizzes
const quizzesData = [
    {
        id: 1,
        title: "Data Structures: Binary Trees",
        subject: "Data Structures",
        teacher: "Dr. Emily Wilson",
        year: 2,
        questions: 25,
        attendees: 45,
        totalStudents: 50,
        uploadDate: "2024-03-15"
    },
    {
        id: 2,
        title: "Network Protocols",
        subject: "Computer Networks",
        teacher: "Prof. John Davis",
        year: 3,
        questions: 30,
        attendees: 38,
        totalStudents: 40,
        uploadDate: "2024-03-14"
    },
    {
        id: 3,
        title: "Database Normalization",
        subject: "Database Management",
        teacher: "Dr. Lisa Kumar",
        year: 2,
        questions: 20,
        attendees: 42,
        totalStudents: 45,
        uploadDate: "2024-03-13"
    },
    {
        id: 4,
        title: "Machine Learning Basics",
        subject: "Artificial Intelligence",
        teacher: "Dr. Sarah Chen",
        year: 4,
        questions: 35,
        attendees: 28,
        totalStudents: 30,
        uploadDate: "2024-03-12"
    }
];

// List of teachers
const teachers = [
    "Dr. Emily Wilson",
    "Prof. John Davis",
    "Dr. Lisa Kumar",
    "Dr. Sarah Chen"
];

const QuizzesUploaded = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState('all');
    const [selectedYear, setSelectedYear] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showTeacherFilter, setShowTeacherFilter] = useState(false);
    const [showYearFilter, setShowYearFilter] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const filteredQuizzes = quizzesData.filter(quiz => {
        const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            quiz.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            quiz.teacher.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTeacher = selectedTeacher === 'all' || quiz.teacher === selectedTeacher;
        const matchesYear = selectedYear === 'all' || quiz.year === parseInt(selectedYear);

        return matchesSearch && matchesTeacher && matchesYear;
    });

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            {/* Sidebar */}
            <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col h-screen overflow-hidden">
                <div className="flex-1 flex flex-col min-h-0">
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
                            whileHover={{x: 4}}
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
                                <li className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg"
                                >
                                    <Upload size={18} className="mr-2"/> Quizzes Uploaded
                                </li>
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
                                <motion.li whileHover={{x: 4}}
                                           className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                           onClick={() => navigate("/AdminRanksPage")}>
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

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Navbar */}
                <div className="bg-[#1E1C2E] p-4 flex justify-between items-center shadow-md">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={20}/>
                            <input
                                type="text"
                                placeholder="Search quizzes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex space-x-4">
                            {/* Teacher Filter */}
                            <div className="relative">
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    onClick={() => setShowTeacherFilter(!showTeacherFilter)}
                                    className="flex items-center space-x-2 bg-[#2D2B3D] px-4 py-2 rounded-lg hover:bg-[#3A3750] transition-colors text-white"
                                >
                                    <Filter size={20}/>
                                    <span>{selectedTeacher === 'all' ? 'Teacher' : selectedTeacher.split(' ')[1]}</span>
                                    <ChevronDown size={16}/>
                                </motion.button>
                                <AnimatePresence>
                                    {showTeacherFilter && (
                                        <motion.div
                                            initial={{opacity: 0, y: -10}}
                                            animate={{opacity: 1, y: 0}}
                                            exit={{opacity: 0, y: -10}}
                                            className="absolute z-50 mt-2 w-48 bg-[#2D2B3D] rounded-lg shadow-lg py-2"
                                        >
                                            <div
                                                className="px-4 py-2 hover:bg-[#3A3750] cursor-pointer text-white"
                                                onClick={() => {
                                                    setSelectedTeacher('all');
                                                    setShowTeacherFilter(false);
                                                }}
                                            >
                                                All Teachers
                                            </div>
                                            {teachers.map((teacher, index) => (
                                                <div
                                                    key={index}
                                                    className="px-4 py-2 hover:bg-[#3A3750] cursor-pointer text-white"
                                                    onClick={() => {
                                                        setSelectedTeacher(teacher);
                                                        setShowTeacherFilter(false);
                                                    }}
                                                >
                                                    {teacher}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Year Filter */}
                            <div className="relative">
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    onClick={() => setShowYearFilter(!showYearFilter)}
                                    className="flex items-center space-x-2 bg-[#2D2B3D] px-4 py-2 rounded-lg hover:bg-[#3A3750] transition-colors text-white"
                                >
                                    <Filter size={20}/>
                                    <span>{selectedYear === 'all' ? 'Year' : `Year ${selectedYear}`}</span>
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
                                            {[1, 2, 3, 4].map((year) => (
                                                <div
                                                    key={year}
                                                    className="px-4 py-2 hover:bg-[#3A3750] cursor-pointer text-white"
                                                    onClick={() => {
                                                        setSelectedYear(year.toString());
                                                        setShowYearFilter(false);
                                                    }}
                                                >
                                                    Year {year}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
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

                {/* Quizzes Content */}
                <div className="p-8">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-2xl p-8"
                    >
                        <h2 className="text-3xl font-bold text-white mb-8">Uploaded Quizzes</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredQuizzes.map((quiz, index) => (
                                <motion.div
                                    key={quiz.id}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: index * 0.1}}
                                    className="bg-[#2D2B3D] rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-white font-semibold text-lg">{quiz.title}</h3>
                                            <p className="text-gray-400">{quiz.subject}</p>
                                        </div>
                                        <motion.button
                                            whileHover={{scale: 1.1}}
                                            className="text-purple-400 hover:text-purple-300"
                                        >
                                            <Eye size={20}/>
                                        </motion.button>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Teacher:</span>
                                            <span className="text-white">{quiz.teacher}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Year:</span>
                                            <span className="text-white">Year {quiz.year}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Questions:</span>
                                            <span className="text-white">{quiz.questions}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Attendance:</span>
                                            <span className="text-white">{quiz.attendees}/{quiz.totalStudents}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Upload Date:</span>
                                            <span className="text-white">{quiz.uploadDate}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-700">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400 text-sm">Completion Rate:</span>
                                            <span
                                                className="text-white font-semibold">{Math.round((quiz.attendees / quiz.totalStudents) * 100)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                                            <motion.div
                                                initial={{width: 0}}
                                                animate={{width: `${(quiz.attendees / quiz.totalStudents) * 100}%`}}
                                                className="bg-purple-500 h-2 rounded-full"
                                            />
                                        </div>
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
        </div>
    );
};

export default QuizzesUploaded;