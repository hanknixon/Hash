import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {motion, AnimatePresence} from 'framer-motion';
import {
    Bell, Search, UserCog, School, Briefcase, ClipboardList,
    MessagesSquare, Microscope, Building2, ListChecks,
    Upload, CheckSquare, AlertOctagon, FileText, Book,
    BookMarked, Trophy, Users, LogOut, X, ChevronDown,
    Plus, Edit2, Trash2, Download
} from 'lucide-react';
import ExpandableCard from '../../Components/PopupModal.jsx';

const AdminSyllabusPage = () => {
    const navigate = useNavigate();
    const [expandedSubject, setExpandedSubject] = useState(null);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedSyllabus, setSelectedSyllabus] = useState(null);
    const [newSyllabusName, setNewSyllabusName] = useState('');

    const [subjects, setSubjects] = useState([
        "Internetworking with TCP/IP",
        "Algorithm Analysis & Design",
        "Data Science",
        "Industrial Economics & Foreign trade",
        "Digital Image Processing",
        "Soft Computing",
        "Course Viva",
        "Computer Networks Lab",
    ]);

    const [syllabusData, setSyllabusData] = useState({
        "Internetworking with TCP/IP": [
            "TCP/IP_Syllabus_2022",
            "TCP/IP_Syllabus_2021",
            "TCP/IP_Syllabus_2020",
        ],
        "Algorithm Analysis & Design": [
            "AAD_Syllabus_2022",
            "AAD_Syllabus_2021",
            "AAD_Syllabus_2020",
        ],
        "Data Science": [
            "DS_Syllabus_2022",
            "DS_Syllabus_2021",
            "DS_Syllabus_2020",
        ],
        "Industrial Economics & Foreign trade": [
            "IEFT_Syllabus_2022",
            "IEFT_Syllabus_2021",
            "IEFT_Syllabus_2020",
        ],
        "Digital Image Processing": [
            "DIP_Syllabus_2022",
            "DIP_Syllabus_2021",
            "DIP_Syllabus_2020",
        ],
        "Soft Computing": [
            "SC_Syllabus_2022",
            "SC_Syllabus_2021",
            "SC_Syllabus_2020",
        ],
        "Course Viva": [
            "CV_Syllabus_2022",
            "CV_Syllabus_2021",
            "CV_Syllabus_2020",
        ],
        "Computer Networks Lab": [
            "CNL_Syllabus_2022",
            "CNL_Syllabus_2021",
            "CNL_Syllabus_2020",
        ],
    });

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const handleAddSubject = () => {
        if (selectedSubject && !subjects.includes(selectedSubject)) {
            setSubjects([...subjects, selectedSubject]);
            setSyllabusData({...syllabusData, [selectedSubject]: []});
            setSelectedSubject('');
            setAddModalOpen(false);
        }
    };

    const handleAddSyllabus = () => {
        if (selectedSubject && newSyllabusName) {
            const updatedSyllabus = {...syllabusData};
            if (!updatedSyllabus[selectedSubject]) {
                updatedSyllabus[selectedSubject] = [];
            }
            updatedSyllabus[selectedSubject] = [...updatedSyllabus[selectedSubject], newSyllabusName];
            setSyllabusData(updatedSyllabus);
            setNewSyllabusName('');
            setAddModalOpen(false);
        }
    };

    const handleEditSyllabus = () => {
        if (selectedSubject && selectedSyllabus && newSyllabusName) {
            const updatedSyllabus = {...syllabusData};
            const index = updatedSyllabus[selectedSubject].indexOf(selectedSyllabus.name);
            if (index !== -1) {
                updatedSyllabus[selectedSubject][index] = newSyllabusName;
                setSyllabusData(updatedSyllabus);
                setNewSyllabusName('');
                setEditModalOpen(false);
            }
        }
    };

    const handleDeleteSyllabus = () => {
        if (selectedSubject && selectedSyllabus) {
            const updatedSyllabus = {...syllabusData};
            updatedSyllabus[selectedSubject] = updatedSyllabus[selectedSubject].filter(
                syllabus => syllabus !== selectedSyllabus.name
            );
            setSyllabusData(updatedSyllabus);
            setDeleteModalOpen(false);
        }
    };

    const openAddModal = (subject = '') => {
        setSelectedSubject(subject);
        setNewSyllabusName('');
        setAddModalOpen(true);
    };

    const openEditModal = (subject, syllabus) => {
        setSelectedSubject(subject);
        setSelectedSyllabus({name: syllabus});
        setNewSyllabusName(syllabus);
        setEditModalOpen(true);
    };

    const openDeleteModal = (subject, syllabus) => {
        setSelectedSubject(subject);
        setSelectedSyllabus({name: syllabus});
        setDeleteModalOpen(true);
    };

    const filteredSubjects = subjects.filter(subject =>
        subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Modal Component
    const Modal = ({isOpen, onClose, title, children}) => (
        <AnimatePresence>
            {isOpen && (
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
                        className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-[500px] text-white relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        >
                            <X size={20}/>
                        </button>
                        <h2 className="text-xl font-semibold mb-4">{title}</h2>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
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
                                <motion.li whileHover={{x: 4}}
                                           className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                           onClick={() => navigate("/QuizzesCorrectionPage")}>
                                    <AlertOctagon size={18} className="mr-2"/> Quizzes Correction
                                </motion.li>
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
                                <li className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg">
                                    <Book size={18} className="mr-2"/> Syllabus
                                </li>
                                <motion.li whileHover={{x: 4}}
                                           className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                           onClick={() => navigate("/AdminMaterialsPage")}>
                                    <BookMarked size={18} className="mr-2"/> Materials / Notes
                                </motion.li>
                                <motion.li whileHover={{x: 4}}
                                           className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                           onClick={() => navigate("/AdminRanksPage")}>
                                    < Trophy size={18} className="mr-2"/> View Ranks
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
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={20}/>
                        <input
                            type="text"
                            placeholder="Search subjects..."
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

                {/* Syllabus Content */}
                <div className="p-6">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Course Syllabus</h2>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                onClick={() => openAddModal()}
                                className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                            >
                                <Plus size={20}/>
                                <span>Add Subject</span>
                            </motion.button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredSubjects.map((subject, index) => (
                                <ExpandableCard
                                    key={index}
                                    title={subject}
                                    isExpanded={expandedSubject === index}
                                    onToggle={() => setExpandedSubject(expandedSubject === index ? null : index)}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-gray-300">Syllabus:</h4>
                                        <motion.button
                                            whileHover={{scale: 1.05}}
                                            onClick={() => openAddModal(subject)}
                                            className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 text-sm"
                                        >
                                            <Plus size={16}/>
                                            <span>Add Syllabus</span>
                                        </motion.button>
                                    </div>
                                    <ul className="space-y-2">
                                        {syllabusData[subject]?.map((syllabus, syllabusIndex) => (
                                            <motion.li
                                                key={syllabusIndex}
                                                initial={{x: -10, opacity: 0}}
                                                animate={{x: 0, opacity: 1}}
                                                transition={{delay: 0.1 * (syllabusIndex + 1)}}
                                                className="text-gray-400 hover:text-white flex items-center justify-between"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <Book size={16}/>
                                                    <span>{syllabus}</span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <motion.button
                                                        whileHover={{scale: 1.1}}
                                                        onClick={() => openEditModal(subject, syllabus)}
                                                        className="text-blue-400 hover:text-blue-300"
                                                    >
                                                        <Edit2 size={16}/>
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{scale: 1.1}}
                                                        onClick={() => openDeleteModal(subject, syllabus)}
                                                        className="text-red-400 hover:text-red-300"
                                                    >
                                                        <Trash2 size={16}/>
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{scale: 1.1}}
                                                        className="text-green-400 hover:text-green-300"
                                                    >
                                                        <Download size={16}/>
                                                    </motion.button>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </ExpandableCard>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Add Subject/Syllabus Modal */}
            <Modal
                isOpen={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                title={selectedSubject ? "Add New Syllabus" : "Add New Subject"}
            >
                <div className="space-y-4">
                    {!selectedSubject ? (
                        <div>
                            <label className="block text-gray-400 mb-2">Subject Name</label>
                            <input
                                type="text"
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                                placeholder="Enter subject name"
                            />
                        </div>
                    ) : (
                        <div>
                            <label className="block text-gray-400 mb-2">Syllabus Name</label>
                            <input
                                type="text"
                                value={newSyllabusName}
                                onChange={(e) => setNewSyllabusName(e.target.value)}
                                className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                                placeholder="Enter syllabus name (e.g. DS_Syllabus_2022)"
                            />
                        </div>
                    )}
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={() => setAddModalOpen(false)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={selectedSubject ? handleAddSyllabus : handleAddSubject}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                            {selectedSubject ? "Add Syllabus" : "Add Subject"}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit Syllabus Modal */}
            <Modal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                title="Edit Syllabus"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-2">Syllabus Name</label>
                        <input
                            type="text"
                            value={newSyllabusName}
                            onChange={(e) => setNewSyllabusName(e.target.value)}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={() => setEditModalOpen(false)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleEditSyllabus}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Delete Syllabus Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Confirm Delete"
            >
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Are you sure you want to delete "{selectedSyllabus?.name}"? This action cannot be
                        undone.
                    </p>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={() => setDeleteModalOpen(false)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteSyllabus}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Logout Confirmation Modal */}
            <Modal
                isOpen={logoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                title="Confirm Logout"
            >
                <div className="space-y-4">
                    <p className="text-gray-300">Are you sure you want to log out?</p>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={() => setLogoutModalOpen(false)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminSyllabusPage;