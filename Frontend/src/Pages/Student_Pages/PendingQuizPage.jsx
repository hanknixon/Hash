import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Calendar, AlertTriangle, Gauge
} from 'lucide-react';
import {motion, AnimatePresence} from "framer-motion";
import StudentNavbar from '../../Components/StudentNavbar';
import StudentSidebar from '../../Components/StudentSidebar';
import LogoutModal from '../../Components/LogoutModal';

// Dummy data for pending quizzes
const pendingQuizzes = [
    {
        id: 1,
        topic: "Graph Algorithms",
        subject: "Data Structures and Algorithms",
        totalQuestions: 25,
        difficulty: "Hard",
        teacher: {
            name: "Dr. Emily Wilson",
            subject: "Data Structures"
        },
        deadline: "2024-03-24T23:59:59",
        marks: 100
    },
    {
        id: 2,
        topic: "OSI Model",
        subject: "Computer Networks",
        totalQuestions: 20,
        difficulty: "Medium",
        teacher: {
            name: "Prof. John Davis",
            subject: "Computer Networks"
        },
        deadline: "2024-03-25T22:00:00",
        marks: 75
    },
    {
        id: 3,
        topic: "Deep Learning Fundamentals",
        subject: "Artificial Intelligence",
        totalQuestions: 30,
        difficulty: "Expert",
        teacher: {
            name: "Dr. Lisa Kumar",
            subject: "AI & ML"
        },
        deadline: "2024-03-26T18:30:00",
        marks: 100
    }
];

const PendingQuizPage = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const handleStartQuiz = (quiz) => {
        navigate('/QuizPage', {
            state: {
                quizData: {
                    ...quiz,
                    currentQuestion: 0,
                    timeStarted: new Date().toISOString()
                }
            }
        });
    };

    const getDifficultyIcon = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'easy':
                return <Brain className="text-green-400" size={20}/>;
            case 'medium':
                return <Zap className="text-yellow-400" size={20}/>;
            case 'hard':
                return <Flame className="text-red-400" size={20}/>;
            case 'expert':
                return <AlertTriangle className="text-red-400" size={20}/>;
            default:
                return null;
        }
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

    const getTimeRemaining = (dateString) => {
        const now = new Date();
        const deadline = new Date(dateString);
        const diff = deadline - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) return `${days} days remaining`;
        if (hours > 0) return `${hours} hours remaining`;
        return `${minutes} minutes remaining`;
    };

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            <StudentSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="PendingQuizPage" />

            <div className="flex-1 overflow-auto">
                <StudentNavbar />

                {/* Pending Quizzes Content */}
                <div className="p-6">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Pending Quizzes</h2>
                        <div className="space-y-6">
                            {pendingQuizzes.map((quiz, index) => (
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
                                                    <p className="text-gray-400 text-sm">Total Questions</p>
                                                    <p className="text-white font-semibold">{quiz.totalQuestions}</p>
                                                </div>
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

                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center space-x-2">
                                                    <Gauge size={20} className="text-purple-400"/>
                                                    <p className="text-gray-400">Difficulty:</p>
                                                    <p className="text-white font-semibold">{quiz.difficulty}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2 text-purple-400">
                                                <Calendar size={20}/>
                                                <p className="font-semibold">{formatDate(quiz.deadline)}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end space-y-4">
                                            <motion.div
                                                whileHover={{scale: 1.05}}
                                                className="bg-[#1E1C2E] px-4 py-2 rounded-lg"
                                            >
                                                <p className="text-yellow-400 font-semibold">{getTimeRemaining(quiz.deadline)}</p>
                                            </motion.div>

                                            <motion.button
                                                whileHover={{scale: 1.02}}
                                                onClick={() => handleStartQuiz(quiz)}
                                                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-300"
                                            >
                                                Start Quiz
                                            </motion.button>
                                        </div>
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

export default PendingQuizPage;