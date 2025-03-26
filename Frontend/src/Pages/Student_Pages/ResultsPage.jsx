import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle, X, Brain, Zap, Flame,
    ChevronDown, Award, Star
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StudentNavbar from '../../Components/StudentNavbar';
import StudentSidebar from '../../Components/StudentSidebar';
import LogoutModal from '../../Components/LogoutModal';

const COLORS = ['#10B981', '#EF4444'];

const ResultsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [quizResults, setQuizResults] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            if (!location.state?.quizId || !location.state?.studentId) {
                navigate('/StudentDashboard');
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:8000/api/quiz/results/${location.state.quizId}/${location.state.studentId}`
                );
                const data = await response.json();

                if (response.ok) {
                    setQuizResults({
                        ...data,
                        result: location.state.result
                    });
                } else {
                    console.error("Failed to fetch results");
                }
            } catch (error) {
                console.error("Error fetching results:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [location.state, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    if (loading) {
        return (
            <div className="flex h-screen bg-[#2D2B3D]">
                <StudentSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="ResultsPage"/>
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            </div>
        );
    }

    if (!quizResults) {
        return (
            <div className="flex h-screen bg-[#2D2B3D]">
                <StudentSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="ResultsPage"/>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-white text-xl">Results not found</div>
                </div>
            </div>
        );
    }

    const pieData = [
        { name: 'Correct', value: quizResults.result.correct_answers },
        { name: 'Incorrect', value: quizResults.result.incorrect_answers }
    ];

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            <StudentSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="ResultsPage"/>

            <div className="flex-1 overflow-auto">
                <StudentNavbar/>

                <div className="p-8">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
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
                                                animationBegin={0}
                                                animationDuration={1500}
                                                animationEasing="ease-out"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={COLORS[index]}
                                                        strokeWidth={2}
                                                    />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="ml-6">
                                    <h3 className="text-4xl font-bold text-white">
                                        {quizResults.result.correct_answers}/{quizResults.result.total}
                                    </h3>
                                    <p className="text-gray-400">Total Score</p>
                                    <div className="mt-4">
                                        <span className="text-2xl font-bold text-purple-400">
                                            Grade: {quizResults.result.grade}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

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
                                    <BarChart data={quizResults.class_performance}>
                                        <XAxis dataKey="grade" stroke="#9CA3AF"/>
                                        <YAxis stroke="#9CA3AF"/>
                                        <Tooltip
                                            contentStyle={{backgroundColor: '#1E1C2E', border: 'none'}}
                                            labelStyle={{color: '#fff'}}
                                        />
                                        <Bar dataKey="count" fill="#7C3AED"/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                        className="mt-8 bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Question Analysis</h2>
                        <div className="space-y-4">
                            {quizResults.questions.map((question, index) => {
                                const studentResponse = quizResults.quiz_responses.find(
                                    response => response.question_id === question.question_id
                                );
                                const isCorrect = studentResponse?.is_correct;

                                return (
                                    <motion.div
                                        key={question.question_id}
                                        initial={{opacity: 0, y: 20}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{delay: index * 0.1}}
                                        className={`bg-[#2D2B3D] rounded-xl p-6 border-l-4 ${
                                            isCorrect ? 'border-green-400' : 'border-red-400'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between cursor-pointer"
                                             onClick={() => setExpandedQuestion(
                                                 expandedQuestion === question.question_id ? null : question.question_id
                                             )}>
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0 w-8 h-8 bg-[#1E1C2E] rounded-full flex items-center justify-center">
                                                    {isCorrect ? (
                                                        <CheckCircle className="text-green-400" size={20}/>
                                                    ) : (
                                                        <X className="text-red-400" size={20}/>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-white text-lg">{question.question_text}</h3>
                                                </div>
                                            </div>
                                            <motion.div
                                                animate={{rotate: expandedQuestion === question.question_id ? 180 : 0}}
                                                transition={{duration: 0.3}}
                                            >
                                                <ChevronDown className="text-gray-400"/>
                                            </motion.div>
                                        </div>

                                        <AnimatePresence>
                                            {expandedQuestion === question.question_id && (
                                                <motion.div
                                                    initial={{height: 0, opacity: 0}}
                                                    animate={{height: "auto", opacity: 1}}
                                                    exit={{height: 0, opacity: 0}}
                                                    transition={{duration: 0.3}}
                                                    className="mt-4 pt-4 border-t border-gray-700"
                                                >
                                                    <div className="space-y-2">
                                                        <p className="text-gray-400">
                                                            Your Answer:{' '}
                                                            <span
                                                                className={
                                                                    isCorrect
                                                                        ? "text-green-400"
                                                                        : "text-red-400"
                                                                }
                                                            >
                                                                {question[`option_${parseInt(studentResponse?.selected_option) + 1}`]}
                                                            </span>
                                                        </p>
                                                        {!isCorrect && (
                                                            <p className="text-gray-400">
                                                                Correct Answer:{' '}
                                                                <span className="text-green-400">
                                                                    {question[`option_${parseInt(question.correct_answer) + 1}`]}
                                                                </span>
                                                            </p>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
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

export default ResultsPage;