import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Plus, Wand2, X
} from 'lucide-react';
import {motion, AnimatePresence} from "framer-motion";
import axios from 'axios';
import TeacherNavbar from '../../Components/TeacherNavbar';
import TeacherSidebar from '../../Components/TeacherSidebar';
import EditQuizModal from '../../Components/EditQuizModal';
import DatePicker from '../../Components/DatePicker';

const AssignQuizzes = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [modules, setModules] = useState([]);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedModuleId, setSelectedModuleId] = useState(null);
    const [generatedQuiz, setGeneratedQuiz] = useState(null);
    const [currentTeacherId, setCurrentTeacherId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [showDiscardConfirmation, setShowDiscardConfirmation] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    // Quiz configuration state
    const [quizConfig, setQuizConfig] = useState({
        subject: '',
        moduleId: '',
        topicId: '',
        difficulty: 'medium',
        questionCount: 10,
        timeLimit: 30,
        dueDate: '',
        student_year: ''
    });

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

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.teacher_id) {
            setCurrentTeacherId(user.teacher_id);
        }
    }, []);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                if (user?.teacher_id) {
                    const response = await axios.get(`http://localhost:8000/api/subjects/${user.teacher_id}`);
                    if (response.data?.subjects) {
                        setSubjects(response.data.subjects);
                    }
                }
            } catch (error) {
                console.error("Error fetching subjects:", error);
            }
        };
        fetchSubjects();
    }, []);

    useEffect(() => {
        const fetchModules = async () => {
            if (quizConfig.subject) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/modules/${quizConfig.subject}`);
                    setModules(response.data.modules);
                } catch (error) {
                    console.error('Error fetching modules:', error);
                }
            }
        };
        fetchModules();
    }, [quizConfig.subject]);

    useEffect(() => {
        const fetchTopics = async () => {
            if (selectedModuleId) {
                try {
                    const response = await axios.get(`http://localhost:8000/api/topics/${selectedModuleId}`);
                    if (response.data?.topics) {
                        setTopics(response.data.topics);
                    }
                } catch (error) {
                    console.error("Error fetching topics:", error);
                }
            }
        };
        if (selectedModuleId) {
            fetchTopics();
        }
    }, [selectedModuleId]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setQuizConfig(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenerateQuiz = async () => {
        setLoading(true);
        try {
            const payload = {
                topic_id: quizConfig.topicId,
                difficulty: quizConfig.difficulty,
                question_count: parseInt(quizConfig.questionCount),
                student_year: parseInt(quizConfig.student_year)
            };

            console.log("📌 Sending Payload to Backend:", payload);

            const response = await axios.post('http://localhost:8000/api/generate-quiz', payload);
            console.log("📌 Raw API Response:", response.data);

            if (response.data?.quiz) {
                let quizData = response.data.quiz;

                // Handle string JSON response
                if (typeof quizData === 'string') {
                    try {
                        quizData = quizData.replace(/```json\n?|\n?```/g, '').trim();
                        quizData = JSON.parse(quizData);
                    } catch (e) {
                        console.error("Failed to parse quiz JSON:", e);
                        throw new Error("Invalid quiz format received");
                    }
                }

                console.log("📌 Processed Quiz Data:", quizData);
                setGeneratedQuiz(quizData);
                setPreviewModalOpen(true);
            } else {
                throw new Error("No quiz data in response");
            }
        } catch (error) {
            console.error("❌ Error generating quiz:", error);
            alert("Failed to generate quiz. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleQuizUpdate = (updatedQuiz) => {
        setGeneratedQuiz(updatedQuiz);
        setEditModalOpen(false);
        setPreviewModalOpen(true);
    };

    const handleUploadQuiz = async () => {
        try {
            if (!generatedQuiz || !generatedQuiz.questions) {
                throw new Error("No quiz data available");
            }

            // Format the date to YYYY-MM-DD
            const formattedDate = quizConfig.dueDate;

            const quizData = {
                teacher_id: currentTeacherId,
                subject_id: quizConfig.subject,
                topic_id: quizConfig.topicId,
                difficulty: quizConfig.difficulty,
                questions: generatedQuiz.questions.map(q => ({
                    ...q,
                    correct_answer: q.correct_answer.toString() // Ensure correct_answer is a string
                })),
                time_limit: parseInt(quizConfig.timeLimit),
                due_date: formattedDate,
                student_year: parseInt(quizConfig.student_year)
            };

            console.log("📤 Uploading quiz data:", quizData);

            const response = await axios.post('http://localhost:8000/api/upload-quiz', quizData);
            console.log("📥 Upload response:", response.data);

            alert("Quiz uploaded successfully!");
            navigate('/TeacherDashboard');
        } catch (error) {
            console.error("❌ Error uploading quiz:", error);
            alert("Failed to upload quiz. Please try again.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const handleClosePreview = () => {
        if (!editModalOpen) {
            setShowDiscardConfirmation(true);
        }
    };

    const handleEditClick = () => {
        setPreviewModalOpen(false);
        setEditModalOpen(true);
    };

    // Preview Modal Component
    const PreviewModal = ({isOpen, onClose}) => {
        if (!isOpen || !generatedQuiz) return null;

        const handleBackdropClick = (e) => {
            if (e.target === e.currentTarget) {
                handleClosePreview();
            }
        };

        const styles = `
    .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
        background: #1E1C2E;
        border-radius: 4px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #3A3750;
        border-radius: 4px;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #4A4760;
    }
`;

        return (
            <>
                <style>{styles}</style>
                <AnimatePresence>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                        onClick={handleBackdropClick}
                    >
                        <motion.div
                            initial={{scale: 0.95, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.95, opacity: 0}}
                            className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-[800px] max-h-[80vh] relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div
                                className="sticky top-0 z-10 bg-[#1E1C2E] pt-2 pb-4 mb-4 flex justify-between items-center border-b border-gray-700">
                                <h2 className="text-2xl font-bold text-white">Quiz Preview</h2>
                                <button
                                    onClick={handleClosePreview}
                                    className="text-gray-400 hover:text-white hover:scale-110 transition-all"
                                >
                                    <X size={20}/>
                                </button>
                            </div>

                            <div className="overflow-y-auto max-h-[calc(80vh-180px)] pr-4 custom-scrollbar">
                                <div className="space-y-8">
                                    {generatedQuiz.questions.map((question, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{opacity: 0, y: 20}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: index * 0.1}}
                                            className="bg-[#2D2B3D] p-6 rounded-lg shadow-lg"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-grow">
                                                    <h3 className="text-lg font-semibold text-white mb-4">
                                                        {question.question}
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                                        {question.options.map((option, optionIndex) => {
                                                            const isCorrect = parseInt(question.correct_answer) === optionIndex;
                                                            return (
                                                                <motion.div
                                                                    key={optionIndex}
                                                                    whileHover={{scale: 1.02}}
                                                                    className={`p-4 rounded-lg border transition-all ${
                                                                        isCorrect
                                                                            ? 'bg-green-500/20 border-green-500 text-green-400'
                                                                            : 'bg-[#1E1C2E] border-gray-600 text-gray-300'
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <span
                                                                            className="w-6 h-6 rounded-full bg-[#2D2B3D] flex items-center justify-center text-sm">
                                                                            {String.fromCharCode(65 + optionIndex)}
                                                                        </span>
                                                                        <span>{option}</span>
                                                                    </div>
                                                                </motion.div>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className="bg-[#1E1C2E] p-4 rounded-lg">
                                                        <p className="text-green-400 font-semibold mb-2">
                                                            Correct
                                                            Answer: {question.options[parseInt(question.correct_answer)]}
                                                        </p>
                                                        <p className="text-gray-400">
                                                            <span
                                                                className="font-semibold text-purple-400">Explanation:</span> {question.explanation}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div
                                className="sticky bottom-0 bg-[#1E1C2E] pt-4 mt-6 border-t border-gray-700 flex justify-end space-x-4">
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    onClick={handleEditClick}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                                >
                                    Edit Quiz
                                </motion.button>
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    onClick={handleUploadQuiz}
                                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                                >
                                    Upload Quiz
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>

                    {showDiscardConfirmation && (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[60]"
                        >
                            <motion.div
                                initial={{scale: 0.95, opacity: 0}}
                                animate={{scale: 1, opacity: 1}}
                                exit={{scale: 0.95, opacity: 0}}
                                className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-96 text-white"
                            >
                                <h3 className="text-xl font-semibold mb-4">Discard Quiz?</h3>
                                <p className="text-gray-400 mb-6">Are you sure you want to discard this quiz? This
                                    action cannot be undone.</p>
                                <div className="flex justify-end space-x-4">
                                    <motion.button
                                        whileHover={{scale: 1.05}}
                                        onClick={() => setShowDiscardConfirmation(false)}
                                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        whileHover={{scale: 1.05}}
                                        onClick={() => {
                                            setShowDiscardConfirmation(false);
                                            setPreviewModalOpen(false);
                                        }}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Discard
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        );
    };

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
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
                <TeacherSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="AssignQuizzes"/>
            </motion.div>

            <div className="flex-1 overflow-auto">
                <TeacherNavbar
                    isMobile={isMobile}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <div className="p-6">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Create New Quiz</h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <select
                                        name="subject"
                                        value={quizConfig.subject}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="">Select subject</option>
                                        {subjects.map(subject => (
                                            <option key={subject.subject_id} value={subject.subject_id}>
                                                {subject.subject_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Module
                                    </label>
                                    <select
                                        name="moduleId"
                                        value={quizConfig.moduleId}
                                        onChange={(e) => {
                                            handleInputChange(e);
                                            setSelectedModuleId(e.target.value);
                                        }}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        disabled={!quizConfig.subject}
                                    >
                                        <option value="">Select module</option>
                                        {modules.map(module => (
                                            <option key={module.module_id} value={module.module_id}>
                                                {module.module_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Topic
                                    </label>
                                    <select
                                        name="topicId"
                                        value={quizConfig.topicId}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        disabled={!quizConfig.moduleId}
                                    >
                                        <option value="">Select topic</option>
                                        {topics.map(topic => (
                                            <option key={topic.topic_id} value={topic.topic_id}>
                                                {topic.topic_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Difficulty Level
                                    </label>
                                    <select
                                        name="difficulty"
                                        value={quizConfig.difficulty}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Number of Questions
                                    </label>
                                    <input
                                        type="number"
                                        name="questionCount"
                                        value={quizConfig.questionCount}
                                        onChange={handleInputChange}
                                        min="1"
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Time Limit (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        name="timeLimit"
                                        value={quizConfig.timeLimit}
                                        onChange={handleInputChange}
                                        min="1"
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Due Date
                                    </label>
                                    <DatePicker
                                        date={selectedDate}
                                        setDate={(date) => {
                                            setSelectedDate(date);
                                            handleInputChange({
                                                target: {
                                                    name: 'dueDate',
                                                    value: date ? date.toISOString().split('T')[0] : ''
                                                }
                                            });
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Select Student Year
                                </label>
                                <select
                                    name="student_year"
                                    value={quizConfig.student_year}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="">Select a year</option>
                                    <option value="1">Year 1</option>
                                    <option value="2">Year 2</option>
                                    <option value="3">Year 3</option>
                                    <option value="4">Year 4</option>
                                </select>
                            </div>

                            <div className="flex justify-end">
                                <motion.button
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                    onClick={handleGenerateQuiz}
                                    disabled={loading}
                                    className="flex items-center space-x-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Wand2 size={20}/>
                                    <span>{loading ? 'Generating...' : 'Generate Quiz'}</span>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <PreviewModal
                isOpen={previewModalOpen}
                onClose={() => setPreviewModalOpen(false)}
            />

            <EditQuizModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                quiz={generatedQuiz}
                onSave={handleQuizUpdate}
            />

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

export default AssignQuizzes;