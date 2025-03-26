import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Calendar, AlertTriangle, Gauge, Sparkles
} from 'lucide-react';
import {motion, AnimatePresence} from "framer-motion";
import StudentNavbar from '../../Components/StudentNavbar';
import StudentSidebar from '../../Components/StudentSidebar';
import LogoutModal from '../../Components/LogoutModal';

const PendingQuizPage = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [pendingQuizzes, setPendingQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [emptyMessage, setEmptyMessage] = useState("");

    useEffect(() => {
        const fetchPendingQuizzes = async () => {
            try {
                const userStr = localStorage.getItem("user");
                console.log("🔍 LocalStorage User Data:", localStorage.getItem("user"));
                if (!userStr) {
                    throw new Error("User data not found. Please login again.");
                }

                const user = JSON.parse(userStr);
                console.log("📱 User Data:", user);

                // Extract student_year and student_id
                let studentYear = user.student_year;
                let studentId = user.student_id; // ✅ Include student_id

                if (!studentYear || !studentId) {
                    throw new Error("⚠️ Missing student year or ID from user data!");
                }

                console.log("📚 Fetching quizzes for Student Year:", studentYear, "Student ID:", studentId);

                // ✅ Now, send both `student_year` and `student_id`
                const apiUrl = `http://localhost:8000/api/pending-quizzes/${studentYear}/${studentId}`;
                console.log("🌍 Fetching from:", apiUrl);

                const response = await fetch(apiUrl);
                console.log("🔄 API Response Status:", response.status);

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("❌ API Error Response:", errorData);
                    throw new Error(errorData.detail ? JSON.stringify(errorData.detail) : "Unknown error");
                }

                const data = await response.json();
                console.log("✅ API Response Data:", data);

                setPendingQuizzes(data.quizzes || []);
                setEmptyMessage(data.message || "No pending quizzes found");
            } catch (err) {
                console.error("❌ Error fetching pending quizzes:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPendingQuizzes();
    }, []);

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getTimeRemaining = (dateString) => {
        const now = new Date();
        const deadline = new Date(dateString);
        const diff = deadline - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (days > 0) return `${days} days remaining`;
        if (hours > 0) return `${hours} hours remaining`;
        return `Due soon`;
    };

    // Empty state component
    const EmptyState = () => (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="flex flex-col items-center justify-center p-8 text-center"
        >
            <motion.div
                animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{duration: 2, repeat: Infinity}}
                className="mb-6"
            >
                <Sparkles className="w-16 h-16 text-purple-500"/>
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4">{emptyMessage}</h3>
            <p className="text-gray-400 max-w-md">
                Take this time to review your previous quizzes or explore new topics in your study materials.
            </p>
        </motion.div>
    );

    if (loading) {
        return (
            <div className="flex h-screen bg-[#2D2B3D]">
                <StudentSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="PendingQuizPage"/>
                <div className="flex-1 overflow-auto">
                    <StudentNavbar/>
                    <div className="flex items-center justify-center h-full">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            <StudentSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="PendingQuizPage"/>

            <div className="flex-1 overflow-auto">
                <StudentNavbar/>

                <div className="p-6">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Pending Quizzes</h2>

                        {error ? (
                            <div className="text-red-500 p-4 rounded-lg bg-[#2D2B3D]">
                                Error: {error}
                            </div>
                        ) : pendingQuizzes.length === 0 ? (
                            <EmptyState/>
                        ) : (
                            <div className="space-y-6">
                                {pendingQuizzes.map((quiz, index) => (
                                    <motion.div
                                        key={quiz.quiz_id}
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
                                                    <p className="text-yellow-400 font-semibold">
                                                        {getTimeRemaining(quiz.deadline)}
                                                    </p>
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
                        )}
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