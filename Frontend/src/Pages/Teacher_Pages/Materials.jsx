import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import {
    Bell, Search, UserCog, School, Briefcase, ClipboardList,
    MessagesSquare, Microscope, Building2, ListChecks,
    Upload, CheckSquare, AlertOctagon, FileText, Book,
    BookMarked, Trophy, Users, LogOut, X, Plus, Edit2, Trash2,
    Download, Filter, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import PopupModal from '../../Components/PopupModal.jsx';

// Dummy data for materials
const initialMaterialsData = {
    "Internetworking with TCP/IP": [
        "Lecture Notes",
        "Reference Materials",
        "Practice Problems"
    ],
    "Algorithm Analysis & Design": [
        "Lecture Notes",
        "Reference Materials",
        "Algorithm Implementations"
    ],
    "Data Science": [
        "Lecture Notes",
        "Reference Materials",
        "Dataset Examples"
    ],
    "Industrial Economics & Foreign trade": [
        "Lecture Notes",
        "Reference Materials",
        "Case Studies"
    ],
    "Digital Image Processing": [
        "Lecture Notes",
        "Reference Materials",
        "Image Processing Examples"
    ],
    "Soft Computing": [
        "Lecture Notes",
        "Reference Materials",
        "Neural Network Models"
    ],
    "Course Viva": [
        "Lecture Notes",
        "Reference Materials",
        "Sample Questions"
    ],
    "Computer Networks Lab": [
        "Lecture Notes",
        "Reference Materials",
        "Lab Manuals"
    ],
};

const Materials = () => {
    const navigate = useNavigate();
    const [expandedSubject, setExpandedSubject] = useState(null);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [newMaterialName, setNewMaterialName] = useState('');
    const [materialsData, setMaterialsData] = useState(initialMaterialsData);
    const [subjects, setSubjects] = useState(Object.keys(initialMaterialsData));

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const handleAddSubject = () => {
        if (selectedSubject && !subjects.includes(selectedSubject)) {
            setSubjects([...subjects, selectedSubject]);
            setMaterialsData({...materialsData, [selectedSubject]: []});
            setSelectedSubject('');
            setAddModalOpen(false);
        }
    };

    const handleAddMaterial = () => {
        if (selectedSubject && newMaterialName) {
            const updatedMaterials = {...materialsData};
            if (!updatedMaterials[selectedSubject]) {
                updatedMaterials[selectedSubject] = [];
            }
            updatedMaterials[selectedSubject] = [...updatedMaterials[selectedSubject], newMaterialName];
            setMaterialsData(updatedMaterials);
            setNewMaterialName('');
            setAddModalOpen(false);
        }
    };

    const handleEditMaterial = () => {
        if (selectedSubject && selectedMaterial && newMaterialName) {
            const updatedMaterials = {...materialsData};
            const index = updatedMaterials[selectedSubject].indexOf(selectedMaterial.name);
            if (index !== -1) {
                updatedMaterials[selectedSubject][index] = newMaterialName;
                setMaterialsData(updatedMaterials);
                setNewMaterialName('');
                setEditModalOpen(false);
            }
        }
    };

    const handleDeleteMaterial = () => {
        if (selectedSubject && selectedMaterial) {
            const updatedMaterials = {...materialsData};
            updatedMaterials[selectedSubject] = updatedMaterials[selectedSubject].filter(
                material => material !== selectedMaterial.name
            );
            setMaterialsData(updatedMaterials);
            setDeleteModalOpen(false);
        }
    };

    const openAddModal = (subject = '') => {
        setSelectedSubject(subject);
        setNewMaterialName('');
        setAddModalOpen(true);
    };

    const openEditModal = (subject, material) => {
        setSelectedSubject(subject);
        setSelectedMaterial({name: material});
        setNewMaterialName(material);
        setEditModalOpen(true);
    };

    const openDeleteModal = (subject, material) => {
        setSelectedSubject(subject);
        setSelectedMaterial({name: material});
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
                        <Link to="/TeacherDashboard">
                            <img
                                src="../Images/HashLogoDashboard.png"
                                alt="Hash Logo"
                                className="h-12 w-auto transition-transform duration-200 transform hover:scale-110"/>
                        </Link>
                    </div>

                    <div className="border-b border-gray-700 mb-6"></div>

                    <motion.div
                        whileHover={{x: 4}}
                        className="text-lg font-semibold mb-4 cursor-pointer text-white hover:text-purple-400"
                        onClick={() => navigate("/TeacherDashboard")}
                    >
                        Dashboard
                    </motion.div>

                    <div className="border-b border-gray-700 mb-6"></div>

                    {/* Quizzes Section */}
                    <div className="mb-6">
                        <div className="text-[#8F8F8F] text-sm mb-3">QUIZZES</div>
                        <ul className="space-y-3">
                            <motion.li whileHover={{x: 4}}
                                       className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                       onClick={() => navigate("/AssignQuizzes")}>
                                <Plus size={18} className="mr-2"/> Assign Quiz
                            </motion.li>
                            <motion.li whileHover={{x: 4}}
                                       className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                       onClick={() => navigate("/CompletedQuizzes")}>
                                <CheckSquare size={18} className="mr-2"/> Completed Quizzes
                            </motion.li>
                        </ul>
                    </div>

                    <div className="border-b border-gray-700 mb-6"></div>

                    {/* Resources Section */}
                    <div className="mb-6">
                        <div className="text-[#8F8F8F] text-sm mb-3">RESOURCES</div>
                        <ul className="space-y-3">
                            <motion.li whileHover={{x: 4}}
                                       className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                       onClick={() => navigate("/Syllabus")}>
                                <Book size={18} className="mr-2"/> Syllabus
                            </motion.li>
                            <motion.li whileHover={{x: 4}}
                                       className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                       onClick={() => navigate("/PYQs")}>
                                <FileText size={18} className="mr-2"/> PYQs
                            </motion.li>
                            <li className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg">
                                <BookMarked size={18} className="mr-2"/> Materials
                            </li>
                        </ul>
                    </div>

                    <div className="border-b border-gray-700 mb-6"></div>

                    {/* Students Section */}
                    <div className="mb-6">
                        <div className="text-[#8F8F8F] text-sm mb-3">STUDENTS</div>
                        <ul className="space-y-3">
                            <motion.li whileHover={{x: 4}}
                                       className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                       onClick={() => navigate("/MyStudents")}>
                                <Users size={18} className="mr-2"/> Student Section
                            </motion.li>
                            <motion.li whileHover={{x: 4}}
                                       className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                       onClick={() => navigate("/ViewRanks")}>
                                <Trophy size={18} className="mr-2"/> Ranks Section
                            </motion.li>
                        </ul>
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
                            placeholder="Search materials..."
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
                            <span className="text-white">Welcome, Teacher</span>
                            <motion.div
                                whileHover={{scale: 1.1}}
                                className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center"
                            >
                                <UserCog size={24} className="text-white"/>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Materials Content */}
                <div className="p-6">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Materials/Notes</h2>
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
                                <PopupModal
                                    key={index}
                                    title={subject}
                                    isExpanded={expandedSubject === index}
                                    onToggle={() => setExpandedSubject(expandedSubject === index ? null : index)}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-gray-300">Available Files:</h4>
                                        <motion.button
                                            whileHover={{scale: 1.05}}
                                            onClick={() => openAddModal(subject)}
                                            className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 text-sm"
                                        >
                                            <Plus size={16}/>
                                            <span>Add Material</span>
                                        </motion.button>
                                    </div>
                                    <ul className="space-y-2">
                                        {materialsData[subject]?.map((material, materialIndex) => (
                                            <motion.li
                                                key={materialIndex}
                                                initial={{x: -10, opacity: 0}}
                                                animate={{x: 0, opacity: 1}}
                                                transition={{delay: 0.1 * (materialIndex + 1)}}
                                                className="text-gray-400 hover:text-white flex items-center justify-between"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <FileText size={16}/>
                                                    <span>{material}</span>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <motion.button
                                                        whileHover={{scale: 1.1}}
                                                        onClick={() => openEditModal(subject, material)}
                                                        className="text-blue-400 hover:text-blue-300"
                                                    >
                                                        <Edit2 size={16}/>
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{scale: 1.1}}
                                                        onClick={() => openDeleteModal(subject, material)}
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
                                </PopupModal>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Add Subject/Material Modal */}
            <Modal
                isOpen={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                title={selectedSubject ? "Add New Material" : "Add New Subject"}
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
                            <label className="block text-gray-400 mb-2">Material Name</label>
                            <input
                                type="text"
                                value={newMaterialName}
                                onChange={(e) => setNewMaterialName(e.target.value)}
                                className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                                placeholder="Enter material name (e.g. Lecture Notes)"
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
                            onClick={selectedSubject ? handleAddMaterial : handleAddSubject}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                            {selectedSubject ? "Add Material" : "Add Subject"}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit Material Modal */}
            <Modal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                title="Edit Material"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-2">Material Name</label>
                        <input
                            type="text"
                            value={newMaterialName}
                            onChange={(e) => setNewMaterialName(e.target.value)}
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
                            onClick={handleEditMaterial}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Delete Material Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Confirm Delete"
            >
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Are you sure you want to delete "{selectedMaterial?.name}"? This action cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={() => setDeleteModalOpen(false)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteMaterial}
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

export default Materials;