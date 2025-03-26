import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AlertCircle, ChevronRight, ArrowRight, CheckCircle, AlertTriangle,
    Brain, Zap, Flame, X
} from 'lucide-react';

const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
        case 'easy':
            return 'border-green-500';
        case 'medium':
            return 'border-yellow-500';
        case 'hard':
            return 'border-red-500';
        default:
            return 'border-purple-500';
    }
};

const getDifficultyBadge = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
        case 'easy':
            return { color: 'bg-green-500/10 text-green-500', icon: Brain };
        case 'medium':
            return { color: 'bg-yellow-500/10 text-yellow-500', icon: Zap };
        case 'hard':
            return { color: 'bg-red-500/10 text-red-500', icon: Flame };
        default:
            return { color: 'bg-purple-500/10 text-purple-500', icon: Brain };
    }
};

const QuizPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [quizData, setQuizData] = useState(null);
    const [answers, setAnswers] = useState({});
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSidebar, setShowSidebar] = useState(false);
    const [loading, setLoading] = useState(true);
    const [studentInfo, setStudentInfo] = useState(null);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                setStudentInfo(user);

                if (!location.state?.quizData?.quiz_id) {
                    navigate('/PendingQuizPage');
                    return;
                }

                const response = await fetch(`http://localhost:8000/api/quiz/${location.state.quizData.quiz_id}`);
                const data = await response.json();

                if (response.ok) {
                    setQuizData(data);
                } else {
                    setErrorMessage("Failed to load quiz");
                    setShowError(true);
                }
            } catch (error) {
                console.error("Error fetching quiz:", error);
                setErrorMessage("Error loading quiz");
                setShowError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, [location.state, navigate]);

    const handleAnswer = (questionId, optionIndex) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const getUnansweredQuestions = () => {
        if (!quizData) return [];
        return quizData.questions.filter(q => answers[q.question_id] === undefined);
    };

    const scrollToQuestion = (questionId) => {
        const element = document.getElementById(`question-${questionId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleSubmit = async () => {
        const unanswered = getUnansweredQuestions();
        console.log("📌 Final Student Info Before Submission:", studentInfo);
        if (unanswered.length > 0) {
            setErrorMessage(`Please answer all questions. ${unanswered.length} questions remaining.`);
            setShowError(true);
            scrollToQuestion(unanswered[0].question_id);
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/quiz/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quiz_id: location.state.quizData.quiz_id,
                    student_id: studentInfo.student_id,
                    student_year: studentInfo.student_year || 2,
                    answers: answers
                }),
            });

            const result = await response.json();

            if (response.ok) {
                navigate('/ResultsPage', {
                    state: {
                        quizId: location.state.quizData.quiz_id,
                        studentId: studentInfo.student_id,
                        result: result
                    }
                });
            } else {
                setErrorMessage("Failed to submit quiz");
                setShowError(true);
            }
        } catch (error) {
            console.error("Error submitting quiz:", error);
            setErrorMessage("Error submitting quiz");
            setShowError(true);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#2D2B3D] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (!quizData) {
        return (
            <div className="min-h-screen bg-[#2D2B3D] flex items-center justify-center">
                <div className="text-white text-xl">Quiz not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#2D2B3D]">
            <div className="bg-[#1E1C2E] p-4 flex justify-between items-center shadow-md">
                <div className="text-white">
                    <h1 className="text-xl font-bold">{quizData.quiz_details.subject_name}</h1>
                    <p className="text-sm text-gray-400">
                        Information Technology • {quizData.quiz_details.teacher_name}
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <span className="text-white">Welcome, {studentInfo?.name || 'Student'}</span>
                    <motion.img
                        whileHover={{scale: 1.1}}
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 relative">
                <div className="space-y-8 mb-20">
                    {quizData.questions.map((question, index) => {
                        const difficultyBadge = getDifficultyBadge(question.difficulty_level);
                        const DifficultyIcon = difficultyBadge.icon;

                        return (
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: index * 0.1}}
                                key={question.question_id}
                                id={`question-${question.question_id}`}
                                className={`bg-[#1E1C2E] rounded-xl p-6 border-l-4 ${getDifficultyColor(question.difficulty_level)}`}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#2D2B3D] rounded-full flex items-center justify-center">
                                        {answers[question.question_id] !== undefined ? (
                                            <CheckCircle className="text-green-400" size={20}/>
                                        ) : (
                                            <span className="text-white">{index + 1}</span>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 mb-4">
                                            <h3 className="text-white text-lg">{question.question_text}</h3>
                                            <span className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${difficultyBadge.color}`}>
                                                <DifficultyIcon size={14} />
                                                {question.difficulty_level}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                question.option_1,
                                                question.option_2,
                                                question.option_3,
                                                question.option_4
                                            ].map((option, optionIndex) => (
                                                <motion.button
                                                    whileHover={{scale: 1.02}}
                                                    whileTap={{scale: 0.98}}
                                                    key={optionIndex}
                                                    onClick={() => handleAnswer(question.question_id, optionIndex)}
                                                    className={`p-4 rounded-lg text-left transition-all duration-200 ${
                                                        answers[question.question_id] === optionIndex
                                                            ? 'bg-purple-500 text-white'
                                                            : 'bg-[#2D2B3D] text-gray-300 hover:bg-[#3A3750]'
                                                    }`}
                                                >
                                                    <span className="mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                                                    {option}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{opacity: 0, x: 100}}
                    animate={{opacity: 1, x: 0}}
                    className="fixed top-1/2 right-4 transform -translate-y-1/2"
                >
                    <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="bg-[#1E1C2E] p-3 rounded-full shadow-lg text-white hover:bg-[#3A3750] transition-colors duration-200"
                    >
                        <ChevronRight size={24}/>
                    </button>
                </motion.div>

                <AnimatePresence>
                    {showSidebar && (
                        <motion.div
                            initial={{opacity: 0, x: 300}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: 300}}
                            className="fixed top-0 right-0 h-full w-72 bg-[#1E1C2E] shadow-xl p-6 overflow-y-auto"
                        >
                            <button
                                onClick={() => setShowSidebar(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                <X size={24}/>
                            </button>

                            <h3 className="text-white text-xl font-bold mb-6">Navigation</h3>

                            <div className="space-y-4">
                                <h4 className="text-gray-400 text-sm">Unanswered Questions</h4>
                                <div className="space-y-2">
                                    {getUnansweredQuestions().map((question, idx) => (
                                        <button
                                            key={question.question_id}
                                            onClick={() => {
                                                scrollToQuestion(question.question_id);
                                                setShowSidebar(false);
                                            }}
                                            className="flex items-center space-x-2 w-full p-2 rounded-lg bg-[#2D2B3D] text-white hover:bg-[#3A3750] transition-colors duration-200"
                                        >
                                            <AlertCircle size={16} className="text-yellow-400"/>
                                            <span>Question {idx + 1}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="fixed bottom-0 left-0 right-0 bg-[#1E1C2E] p-4 shadow-lg"
                >
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="text-white">
                            <span className="text-gray-400">Progress: </span>
                            {Object.keys(answers).length}/{quizData.questions.length} answered
                        </div>
                        <motion.button
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                            onClick={handleSubmit}
                            className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600 transition-colors duration-200 flex items-center space-x-2"
                        >
                            <span>Submit Quiz</span>
                            <ArrowRight size={20}/>
                        </motion.button>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {showError && (
                        <motion.div
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 50}}
                            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
                        >
                            <AlertTriangle size={20}/>
                            <span>{errorMessage}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default QuizPage;