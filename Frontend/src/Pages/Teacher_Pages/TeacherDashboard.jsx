import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Megaphone, Clock, AlertCircle, BookOpen, GraduationCap,
    Users, X, ChevronRight, PlusCircle
} from 'lucide-react';
import {motion, AnimatePresence} from "framer-motion";
import TeacherNavbar from '../../Components/TeacherNavbar';
import TeacherSidebar from '../../Components/TeacherSidebar';

// Dummy data for recent activities
const recentActivities = [
    {
        type: "quiz_completed",
        class: "CSE-A Year 2",
        subject: "Data Structures",
        score: "85%",
        time: "2 hours ago"
    },
    {
        type: "quiz_assigned",
        subject: "Algorithms",
        class: "CSE-B Year 3",
        time: "5 hours ago"
    },
    {
        type: "topic_completed",
        subject: "Database Systems",
        topic: "Normalization",
        class: "CSE-A Year 2",
        time: "1 day ago"
    }
];

// Dummy data for announcements
const announcements = [
    {
        id: 1,
        from: "Dr. Manoj T Joy (HOD)",
        content: "Faculty meeting scheduled for tomorrow at 2 PM",
        time: "1 hour ago",
        type: "important"
    },
    {
        id: 2,
        from: "Prof. Sarah Wilson",
        content: "Updated syllabus for Data Structures course is now available",
        time: "3 hours ago",
        type: "academic"
    },
    {
        id: 3,
        from: "You",
        content: "Quiz postponed for CSE-A Year 2 to next week",
        time: "5 hours ago",
        type: "announcement"
    }
];

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedYear, setSelectedYear] = useState('Year 2');

    // Class statistics based on selected year
    const classStats = {
        'Year 1': {
            students: 45,
            quizzes: 8,
            avgScore: 78,
            topicsLeft: 5,
            quizzesToAssign: 3
        },
        'Year 2': {
            students: 50,
            quizzes: 10,
            avgScore: 82,
            topicsLeft: 3,
            quizzesToAssign: 2
        },
        'Year 3': {
            students: 48,
            quizzes: 7,
            avgScore: 75,
            topicsLeft: 6,
            quizzesToAssign: 4
        },
        'Year 4': {
            students: 52,
            quizzes: 9,
            avgScore: 80,
            topicsLeft: 4,
            quizzesToAssign: 2
        }
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

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
                <TeacherSidebar onLogout={() => setLogoutModalOpen(true)}/>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1">
                <TeacherNavbar
                    isMobile={isMobile}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                    {/* Student List Section */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] p-6 rounded-xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white text-lg font-semibold">Student List</h3>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="bg-[#2D2B3D] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                {Object.keys(classStats).map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-[#2D2B3D] p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-400">Total Students</p>
                                    <Users className="text-purple-400" size={20}/>
                                </div>
                                <p className="text-2xl font-bold text-white mt-2">{classStats[selectedYear].students}</p>
                            </div>
                            <div className="bg-[#2D2B3D] p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-400">Class Average</p>
                                    <GraduationCap className="text-green-400" size={20}/>
                                </div>
                                <p className="text-2xl font-bold text-white mt-2">{classStats[selectedYear].avgScore}%</p>
                            </div>
                            <div className="bg-[#2D2B3D] p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-400">Topics Left</p>
                                    <BookOpen className="text-yellow-400" size={20}/>
                                </div>
                                <p className="text-2xl font-bold text-white mt-2">{classStats[selectedYear].topicsLeft}</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{scale: 1.02}}
                            onClick={() => navigate("/MyStudents")}
                            className="mt-4 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
                        >
                            View All Students
                        </motion.button>
                    </motion.div>

                    {/* Active Quizzes */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.1}}
                        className="bg-[#1E1C2E] p-6 rounded-xl"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-white text-lg font-semibold">Active Quizzes</h3>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                onClick={() => navigate("/AssignQuizzes")}
                                className="flex items-center space-x-2 bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                            >
                                <PlusCircle size={18}/>
                                <span>New Quiz</span>
                            </motion.button>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((quiz) => (
                                <motion.div
                                    key={quiz}
                                    whileHover={{scale: 1.01}}
                                    className="bg-[#2D2B3D] p-4 rounded-lg flex items-center justify-between"
                                >
                                    <div>
                                        <h4 className="text-white font-semibold">Data Structures Quiz {quiz}</h4>
                                        <p className="text-gray-400">Due in 2 days • CSE-A Year 2</p>
                                    </div>
                                    <motion.button
                                        whileHover={{scale: 1.05}}
                                        className="text-purple-400 hover:text-purple-300"
                                    >
                                        <ChevronRight size={20}/>
                                    </motion.button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Activity and Announcements Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Activity */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.2}}
                            className="bg-[#1E1C2E] rounded-xl p-6"
                        >
                            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                            <div className="space-y-4">
                                {recentActivities.map((activity, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{opacity: 0, x: -20}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{delay: 0.1 * (index + 1)}}
                                        className="bg-[#2D2B3D] p-4 rounded-lg"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-white font-semibold">
                                                    {activity.type === "quiz_completed" && `${activity.class} completed ${activity.subject}`}
                                                    {activity.type === "quiz_assigned" && `New quiz assigned for ${activity.class}`}
                                                    {activity.type === "topic_completed" && `Completed ${activity.topic} in ${activity.class}`}
                                                </h3>
                                                <p className="text-gray-400 text-sm">{activity.time}</p>
                                            </div>
                                            {activity.type === "quiz_completed" && (
                                                <span className="text-green-500 font-semibold">{activity.score}</span>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Announcements */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.3}}
                            className="bg-[#1E1C2E] rounded-xl p-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-white">Announcements</h2>
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    className="flex items-center space-x-2 bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                                >
                                    <Megaphone size={18}/>
                                    <span>New Announcement</span>
                                </motion.button>
                            </div>
                            <div className="space-y-4">
                                {announcements.map((announcement, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{opacity: 0, x: -20}}
                                        animate={{opacity: 1, x: 0}}
                                        transition={{delay: 0.1 * (index + 1)}}
                                        className="bg-[#2D2B3D] p-4 rounded-lg"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <span
                                                        className="text-purple-400 font-semibold">{announcement.from}</span>
                                                    <span className="text-gray-400">•</span>
                                                    <span className="text-gray-400 text-sm">{announcement.time}</span>
                                                </div>
                                                <p className="text-white mt-2">{announcement.content}</p>
                                            </div>
                                            {announcement.type === 'important' && (
                                                <AlertCircle className="text-red-400" size={20}/>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
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

export default TeacherDashboard;