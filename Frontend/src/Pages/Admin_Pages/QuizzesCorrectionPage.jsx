import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {motion, AnimatePresence} from 'framer-motion';
import {
    Bell,
    Search,
    UserCog,
    School,
    Briefcase,
    ClipboardList,
    MessagesSquare,
    Microscope,
    Building2,
    ListChecks,
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
    Eye,
    CheckCircle2
} from 'lucide-react';

// Dummy data for student complaints
const complaintData = [
    {
        id: "COMP" + Math.floor(Math.random() * 10000),
        studentName: "Alex Thompson",
        year: "Year 2",
        branch: "Computer Science & Engineering",
        quiz: "Data Structures Quiz #3",
        subject: "Data Structures",
        questionNumbers: [4, 7, 12],
        description: "The answers marked as incorrect for questions 4, 7, and 12 seem to be correct according to the textbook references. Requesting review of the marking scheme.",
        status: "pending"
    },
    {
        id: "COMP" + Math.floor(Math.random() * 10000),
        studentName: "Sarah Chen",
        year: "Year 3",
        branch: "Computer Science & Engineering",
        quiz: "Database Management Quiz #2",
        subject: "Database Systems",
        questionNumbers: [5],
        description: "Question 5 had multiple correct answers but only one was accepted by the system. Please verify.",
        status: "pending"
    },
    {
        id: "COMP" + Math.floor(Math.random() * 10000),
        studentName: "Michael Park",
        year: "Year 1",
        branch: "Computer Science & Engineering",
        quiz: "Programming Fundamentals Quiz #4",
        subject: "Programming",
        questionNumbers: [2, 8],
        description: "Technical glitch during submission caused answers to questions 2 and 8 to not be saved properly.",
        status: "pending"
    }
];

const QuizzesCorrectionPage = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [complaints, setComplaints] = useState(complaintData);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const handleViewDetails = (complaint) => {
        setSelectedComplaint(complaint);
        setDetailsModalOpen(true);
    };

    const handleResolveComplaint = (complaintId) => {
        setComplaints(prevComplaints =>
            prevComplaints.map(complaint =>
                complaint.id === complaintId
                    ? {...complaint, status: "resolved"}
                    : complaint
            )
        );
        setDetailsModalOpen(false);
    };

    const filteredComplaints = complaints.filter(complaint =>
        complaint.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                                <motion.li whileHover={{x: 4}}
                                           className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                           onClick={() => navigate("/QuizzesUploaded")}>
                                    <Upload size={18} className="mr-2"/> Quizzes Uploaded
                                </motion.li>
                                <li className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg">
                                    <AlertOctagon size={18} className="mr-2"/> Quizzes Correction
                                </li>
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
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                        <input
                            type="text"
                            placeholder="Search complaints..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
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

                {/* Complaints Content */}
                <div className="p-8">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-2xl p-8"
                    >
                        <h2 className="text-3xl font-bold text-white mb-8">Quiz Correction Requests</h2>
                        <div className="space-y-4">
                            {filteredComplaints.map((complaint) => (
                                <motion.div
                                    key={complaint.id}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    className="bg-[#2D2B3D] rounded-xl p-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span
                                                    className="text-purple-400 font-semibold">Complaint #{complaint.id}</span>
                                                {complaint.status === "resolved" && (
                                                    <span
                                                        className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                                                        Resolved
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-white text-xl font-semibold mb-1">{complaint.studentName}</h3>
                                            <p className="text-gray-400">{complaint.year} • {complaint.branch}</p>
                                            <div className="mt-3">
                                                <p className="text-white">{complaint.quiz}</p>
                                                <p className="text-gray-400">{complaint.subject}</p>
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{scale: 1.1}}
                                            onClick={() => handleViewDetails(complaint)}
                                            className="text-purple-400 hover:text-purple-300 transition-colors"
                                            disabled={complaint.status === "resolved"}
                                        >
                                            <Eye size={24}/>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Details Modal */}
            <AnimatePresence>
                {detailsModalOpen && selectedComplaint && (
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
                            className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-[600px] text-white relative max-h-[80vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setDetailsModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            >
                                <X size={20}/>
                            </button>

                            <h2 className="text-2xl font-bold mb-6">Complaint Details</h2>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-gray-400 mb-1">Complaint ID</p>
                                    <p className="text-white font-semibold">{selectedComplaint.id}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400 mb-1">Student Information</p>
                                    <p className="text-white font-semibold">{selectedComplaint.studentName}</p>
                                    <p className="text-gray-400">{selectedComplaint.year} • {selectedComplaint.branch}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400 mb-1">Quiz Information</p>
                                    <p className="text-white font-semibold">{selectedComplaint.quiz}</p>
                                    <p className="text-gray-400">{selectedComplaint.subject}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400 mb-1">Questions Reported</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedComplaint.questionNumbers.map((num) => (
                                            <span
                                                key={num}
                                                className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full"
                                            >
                                                Question {num}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-gray-400 mb-1">Description</p>
                                    <p className="text-white bg-[#2D2B3D] p-4 rounded-lg">
                                        {selectedComplaint.description}
                                    </p>
                                </div>

                                <motion.button
                                    whileHover={{scale: 1.02}}
                                    onClick={() => handleResolveComplaint(selectedComplaint.id)}
                                    className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 flex items-center justify-center space-x-2 hover:bg-green-600 transition-colors"
                                >
                                    <CheckCircle2 size={20}/>
                                    <span>Mark as Resolved</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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

export default QuizzesCorrectionPage;