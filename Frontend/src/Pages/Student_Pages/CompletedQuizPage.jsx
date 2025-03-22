import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";
import {Star} from 'lucide-react';
import StudentNavbar from '../../Components/StudentNavbar';
import StudentSidebar from '../../Components/StudentSidebar';
import LogoutModal from '../../Components/LogoutModal';

// Dummy data for completed quizzes
const completedQuizzes = [
    {
        topic: "Data Structures: Binary Trees",
        subject: "Data Structures and Algorithms",
        totalQuestions: 20,
        answeredCorrect: 18,
        wrongAnswers: 2,
        grade: "A",
        score: 90,
        topGrader: {
            name: "Alex Thompson",
            score: 95,
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
        },
        teacher: {
            name: "Dr. Emily Wilson",
            subject: "Data Structures"
        }
    },
    {
        topic: "Network Protocols",
        subject: "Computer Networks",
        totalQuestions: 25,
        answeredCorrect: 15,
        wrongAnswers: 10,
        grade: "C",
        score: 60,
        topGrader: {
            name: "Sarah Chen",
            score: 98,
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
        },
        teacher: {
            name: "Prof. John Davis",
            subject: "Computer Networks"
        }
    },
    {
        topic: "Machine Learning Basics",
        subject: "Artificial Intelligence",
        totalQuestions: 30,
        answeredCorrect: 28,
        wrongAnswers: 2,
        grade: "A+",
        score: 93,
        topGrader: {
            name: "Michael Park",
            score: 93,
            avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop"
        },
        teacher: {
            name: "Dr. Lisa Kumar",
            subject: "AI & ML"
        }
    }
];

const CompletedQuizPage = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const getGradeColor = (grade) => {
        switch (grade) {
            case 'A+':
                return 'text-green-400';
            case 'A':
                return 'text-green-500';
            case 'B':
                return 'text-blue-400';
            case 'C':
                return 'text-yellow-500';
            default:
                return 'text-red-500';
        }
    };

    const getScoreBackground = (score) => {
        if (score >= 90) return 'bg-green-500';
        if (score >= 80) return 'bg-blue-500';
        if (score >= 70) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            <StudentSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="CompletedQuizPage" />

            <div className="flex-1 overflow-auto">
                <StudentNavbar />

                {/* Completed Quizzes Content */}
                <div className="p-6">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Completed Quizzes</h2>
                        <div className="space-y-6">
                            {completedQuizzes.map((quiz, index) => (
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

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div>
                                                    <p className="text-gray-400 text-sm">Total Questions</p>
                                                    <p className="text-white font-semibold">{quiz.totalQuestions}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400 text-sm">Correct Answers</p>
                                                    <p className="text-green-400 font-semibold">{quiz.answeredCorrect}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400 text-sm">Wrong Answers</p>
                                                    <p className="text-red-400 font-semibold">{quiz.wrongAnswers}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400 text-sm">Grade</p>
                                                    <p className={`font-bold text-xl ${getGradeColor(quiz.grade)}`}>{quiz.grade}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <div
                                                    className={`${getScoreBackground(quiz.score)} px-3 py-1 rounded-full`}>
                                                    <p className="text-white font-semibold">{quiz.score}%</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <p className="text-gray-400">
                                                        by {quiz.teacher.name} ({quiz.teacher.subject})
                                                    </p>
                                                </div>
                                            </div>

                                            {quiz.score < 70 && (
                                                <motion.div
                                                    initial={{opacity: 0, y: 10}}
                                                    animate={{opacity: 1, y: 0}}
                                                    className="flex items-start space-x-2 bg-[#1E1C2E] p-3 rounded-lg"
                                                >
                                                    <div>
                                                        <p className="text-yellow-500 font-semibold">Recommendation</p>
                                                        <p className="text-gray-400">Review {quiz.topic} materials to
                                                            improve your understanding of this topic.</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>

                                        <div className="ml-6 flex flex-col items-center">
                                            <p className="text-gray-400 text-sm mb-2">Top Performer</p>
                                            <motion.img
                                                whileHover={{scale: 1.1}}
                                                src={quiz.topGrader.avatar}
                                                alt={quiz.topGrader.name}
                                                className="w-12 h-12 rounded-full mb-2"
                                            />
                                            <p className="text-white text-sm font-semibold">{quiz.topGrader.name}</p>
                                            <div className="flex items-center space-x-1 mt-1">
                                                <Star className="text-yellow-500" size={16}/>
                                                <p className="text-yellow-500 font-semibold">{quiz.topGrader.score}%</p>
                                            </div>
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

export default CompletedQuizPage;