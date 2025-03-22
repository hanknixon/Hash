import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Bell, Search, AlertTriangle, X} from 'lucide-react';
import axios from 'axios';

// Dummy data for recent quizzes
const recentQuizzes = [
    {
        id: 1,
        title: "Data Structures: Binary Trees",
        questions: [
            {id: 1, text: "Q1 - What is a binary tree?"},
            {id: 2, text: "Q2 - Explain tree traversal methods"},
            {id: 3, text: "Q3 - What is a balanced tree?"}
        ]
    },
    {
        id: 2,
        title: "Network Protocols",
        questions: [
            {id: 1, text: "Q1 - What is TCP/IP?"},
            {id: 2, text: "Q2 - Explain DNS"},
            {id: 3, text: "Q3 - What is HTTP?"}
        ]
    },
    {
        id: 3,
        title: "Database Management",
        questions: [
            {id: 1, text: "Q1 - What is normalization?"},
            {id: 2, text: "Q2 - Explain ACID properties"},
            {id: 3, text: "Q3 - What is indexing?"}
        ]
    }
];

const StudentNavbar = () => {
    const [complaintModalOpen, setComplaintModalOpen] = useState(false);
    const [complaintType, setComplaintType] = useState('');
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [remarks, setRemarks] = useState('');
    const [userName, setUserName] = useState("Loading...");

    useEffect(() => {
        const fetchStudentName = () => {
            const storedUser = localStorage.getItem("user");

            if (!storedUser) {
                console.error("⚠️ User data not found in localStorage!");
                return;
            }

            try {
                const parsedUser = JSON.parse(storedUser);
                if (!parsedUser?.email) {
                    console.error("⚠️ User email not found in localStorage!");
                    return;
                }

                console.log("✅ User found in localStorage:", parsedUser);
                setUserName(parsedUser.name || "Unknown"); // Corrected from setStudentName
            } catch (error) {
                console.error("⚠️ Error parsing user data:", error);
            }
        };

        fetchStudentName();
    }, []);

    const handleSubmitComplaint = () => {
        // Here you would handle the complaint submission
        // For now, we'll just log it and close the modal
        console.log({
            studentInfo,
            complaintType,
            selectedQuiz,
            selectedQuestions,
            remarks
        });

        // Reset form
        setComplaintType('');
        setSelectedQuiz('');
        setSelectedQuestions([]);
        setRemarks('');
        setComplaintModalOpen(false);
    };

    return (
        <div className="bg-[#1E1C2E] p-4 flex justify-between items-center shadow-md">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
            <div className="flex items-center space-x-6">
                <motion.button
                    whileHover={{scale: 1.1}}
                    onClick={() => setComplaintModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#2D2B3D] text-white rounded-lg hover:bg-[#3A3750] transition-colors"
                >
                    <AlertTriangle size={20} className="text-yellow-500"/>
                    <span>Complaints</span>
                </motion.button>
                <motion.button whileHover={{scale: 1.1}} className="relative">
                    <Bell size={24} className="text-gray-300 hover:text-white"/>
                    <span
                        className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">
            3
          </span>
                </motion.button>
                <div className="flex items-center space-x-3">
                    <span className="text-white">Welcome, {userName}</span>
                    <motion.img
                        whileHover={{scale: 1.1}}
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                </div>
            </div>

            {/* Complaint Modal */}
            <AnimatePresence>
                {complaintModalOpen && (
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
                            className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-full max-w-md text-white relative"
                        >
                            <button
                                onClick={() => setComplaintModalOpen(false)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            >
                                <X size={20}/>
                            </button>
                            <h2 className="text-xl font-semibold mb-6">Submit a Complaint</h2>

                            <div className="space-y-4">
                                {/* Auto-filled Student Info */}
                                <div className="bg-[#2D2B3D] p-4 rounded-lg">
                                    <p className="text-gray-400">Student Name: <span
                                        className="text-white">{studentInfo.name}</span></p>
                                    <p className="text-gray-400">Year: <span
                                        className="text-white">{studentInfo.year}</span></p>
                                </div>

                                {/* Complaint Type Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Type of Complaint
                                    </label>
                                    <select
                                        value={complaintType}
                                        onChange={(e) => {
                                            setComplaintType(e.target.value);
                                            setSelectedQuiz('');
                                            setSelectedQuestions([]);
                                            setRemarks('');
                                        }}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="">Select type</option>
                                        <option value="quiz">Quiz Correction</option>
                                        <option value="technical">Platform Technical Issues</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Conditional Fields based on Complaint Type */}
                                {complaintType === 'quiz' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Select Quiz
                                            </label>
                                            <select
                                                value={selectedQuiz}
                                                onChange={(e) => {
                                                    setSelectedQuiz(e.target.value);
                                                    setSelectedQuestions([]);
                                                }}
                                                className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            >
                                                <option value="">Select quiz</option>
                                                {recentQuizzes.map(quiz => (
                                                    <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {selectedQuiz && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Select Questions
                                                </label>
                                                <div className="space-y-2">
                                                    {recentQuizzes
                                                        .find(q => q.id === parseInt(selectedQuiz))
                                                        ?.questions.map(question => (
                                                            <label key={question.id}
                                                                   className="flex items-center space-x-2">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedQuestions.includes(question.id)}
                                                                    onChange={(e) => {
                                                                        if (e.target.checked) {
                                                                            setSelectedQuestions([...selectedQuestions, question.id]);
                                                                        } else {
                                                                            setSelectedQuestions(selectedQuestions.filter(id => id !== question.id));
                                                                        }
                                                                    }}
                                                                    className="form-checkbox h-4 w-4 text-purple-500 rounded focus:ring-2 focus:ring-purple-500"
                                                                />
                                                                <span className="text-gray-300">{question.text}</span>
                                                            </label>
                                                        ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Remarks Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Remarks
                                    </label>
                                    <textarea
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder={
                                            complaintType === 'quiz' ? "Describe the issue with the selected questions..." :
                                                complaintType === 'technical' ? "Describe the technical issue you're experiencing..." :
                                                    complaintType === 'other' ? "Describe your concern..." :
                                                        "Please select a complaint type..."
                                        }
                                    />
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{scale: 1.02}}
                                    onClick={handleSubmitComplaint}
                                    className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors mt-6"
                                >
                                    Submit Complaint
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StudentNavbar;