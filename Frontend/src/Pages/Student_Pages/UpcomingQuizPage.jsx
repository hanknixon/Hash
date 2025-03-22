import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Calendar, BellRing, X
} from 'lucide-react';
import {motion, AnimatePresence} from "framer-motion";
import StudentNavbar from '../../Components/StudentNavbar';
import StudentSidebar from '../../Components/StudentSidebar';
import LogoutModal from '../../Components/LogoutModal';

// Dummy data for upcoming quizzes
const upcomingQuizzes = [
    {
        topic: "Advanced Data Structures",
        subject: "Data Structures and Algorithms",
        marks: 100,
        teacher: {
            name: "Dr. Emily Wilson",
            subject: "Data Structures"
        },
        date: "2024-03-25T10:00:00",
        isReminded: false
    },
    {
        topic: "TCP/IP Protocol Suite",
        subject: "Computer Networks",
        marks: 75,
        teacher: {
            name: "Prof. John Davis",
            subject: "Computer Networks"
        },
        date: "2024-03-27T14:30:00",
        isReminded: true
    },
    {
        topic: "Neural Networks",
        subject: "Artificial Intelligence",
        marks: 100,
        teacher: {
            name: "Dr. Lisa Kumar",
            subject: "AI & ML"
        },
        date: "2024-03-30T09:00:00",
        isReminded: false
    }
];

const UpcomingQuizPage = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [reminders, setReminders] = useState(
        upcomingQuizzes.reduce((acc, quiz, index) => ({
            ...acc,
            [index]: quiz.isReminded
        }), {})
    );

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const toggleReminder = (index) => {
        setReminders(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            <StudentSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="UpcomingQuizPage" />

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <StudentNavbar />

                {/* Upcoming Quizzes Content */}
                <div className="p-6">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Upcoming Quizzes</h2>
                        <div className="space-y-6">
                            {upcomingQuizzes.map((quiz, index) => (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, x: -20}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{delay: index * 0.1}}
                                    className="bg-[#2D2B3D] rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-4 flex-1">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white mb-2">{quiz.topic}</h3>
                                                <p className="text-gray-400">{quiz.subject}</p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <p className="text-gray-400 text-sm">Total Marks</p>
                                                    <p className="text-white font-semibold">{quiz.marks}</p>
                                                </div>
                                                <div className="col-span-2">
                                                    <p className="text-gray-400 text-sm">Teacher</p>
                                                    <p className="text-white font-semibold">
                                                        {quiz.teacher.name} ({quiz.teacher.subject})
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2 text-purple-400">
                                                <Calendar size={20}/>
                                                <p className="font-semibold">{formatDate(quiz.date)}</p>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{scale: 1.05}}
                                            onClick={() => toggleReminder(index)}
                                            className={`ml-6 p-3 rounded-lg transition-colors duration-300 ${
                                                reminders[index]
                                                    ? 'bg-purple-500 text-white'
                                                    : 'bg-[#1E1C2E] text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            <BellRing size={24}/>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <LogoutModal
                isOpen={logoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
};

export default UpcomingQuizPage;