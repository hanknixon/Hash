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
import TeacherSidebar from "../../components/TeacherSidebar.jsx";
import TeacherNavbar from "../../components/TeacherNavbar.jsx";

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
            <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col h-screen overflow-hidden">
                <TeacherSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="Materials" />
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <TeacherNavbar searchPlaceholder="Search PYQs..." searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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