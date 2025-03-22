import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Book, Plus, Edit2, Trash2, X, ChevronDown,
    CheckCircle, Clock, Upload
} from 'lucide-react';
import {motion, AnimatePresence} from "framer-motion";
import TeacherNavbar from '../../Components/TeacherNavbar';
import TeacherSidebar from '../../Components/TeacherSidebar';
import axios from 'axios';

const syllabusData = [
    {
        id: 1,
        subject: "Data Structures",
        units: [
            {
                title: "Unit 1: Introduction to Data Structures",
                topics: [
                    {name: "Arrays and Linked Lists", completed: true},
                    {name: "Stacks and Queues", completed: true},
                    {name: "Trees and Graphs", completed: false}
                ],
                progress: 66
            },
            {
                title: "Unit 2: Advanced Data Structures",
                topics: [
                    {name: "Binary Search Trees", completed: false},
                    {name: "AVL Trees", completed: false},
                    {name: "Hash Tables", completed: false}
                ],
                progress: 0
            }
        ]
    },
    {
        id: 2,
        subject: "Database Systems",
        units: [
            {
                title: "Unit 1: Database Fundamentals",
                topics: [
                    {name: "Introduction to DBMS", completed: true},
                    {name: "ER Diagrams", completed: true},
                    {name: "Relational Model", completed: true}
                ],
                progress: 100
            },
            {
                title: "Unit 2: SQL and Normalization",
                topics: [
                    {name: "Basic SQL", completed: true},
                    {name: "Advanced Queries", completed: false},
                    {name: "Normal Forms", completed: false}
                ],
                progress: 33
            }
        ]
    }
];

const Syllabus = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [addSubjectModalOpen, setAddSubjectModalOpen] = useState(false);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [parsedData, setParsedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [addTopicModalOpen, setAddTopicModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [expandedSubjects, setExpandedSubjects] = useState(new Set());
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const fileInputRef = useRef(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentTeacherId, setCurrentTeacherId] = useState(null);

    useEffect(() => {
        const storedTeacherId = localStorage.getItem("teacherId");
        if (storedTeacherId) {
            setCurrentTeacherId(storedTeacherId);
        } else {
            console.error("⚠️ No teacherId found in localStorage!");
        }
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };


    const toggleSubject = (id) => {
        const newExpanded = new Set(expandedSubjects);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedSubjects(newExpanded);
    };

    const handleAddSubject = () => {
        setAddSubjectModalOpen(true);
    };

    const handleAddTopic = (subject, unit) => {
        setSelectedSubject(subject);
        setSelectedUnit(unit);
        setAddTopicModalOpen(true);
    };

    const handleEditTopic = (subject, unit, topic) => {
        setSelectedSubject(subject);
        setSelectedUnit(unit);
        setEditModalOpen(true);
    };

    const handleDeleteTopic = (subject, unit, topic) => {
        setSelectedSubject(subject);
        setSelectedUnit(unit);
        setDeleteModalOpen(true);
    };

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (!file || file.type !== 'application/pdf') {
            alert('Please select a valid PDF file');
            return;
        }

        setSelectedFile(file);
        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/api/syllabus/parse', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log("📜 API Response:", response.data); // ✅ Debugging log

            if (!response.data || !response.data.parsed_data) {
                console.error("❌ parsed_data is missing in the response.");
                alert("Failed to parse syllabus. Please try again.");
                return;
            }

            setParsedData(response.data.parsed_data);
            setPreviewModalOpen(true);
        } catch (error) {
            console.error('⚠️ Error parsing syllabus:', error);
            alert("An error occurred while parsing the syllabus.");
        } finally {
            setLoading(false);
        }
    };


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
                        className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-full max-w-md text-white relative"
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

    const PreviewModal = ({isOpen, onClose, data, teacherId}) => {
        if (!isOpen || !data || Object.keys(data).length === 0) {
            return null;
        }

        console.log("📌 Received teacherId in PreviewModal:", teacherId); // Debugging

        const handleUpload = async () => {
            if (!data || !data.Subject) {
                alert("Error: Subject name is missing!");
                return;
            }

            if (!teacherId) {
                alert("Error: Teacher ID is missing!");
                return;
            }

            const formattedData = {
                subject_name: data.Subject,
                teacher_id: teacherId,  // ✅ Include teacher ID
                modules: data.Syllabus?.map((mod, index) => ({
                    module_no: index + 1,
                    module_name: mod.module,
                    topics: mod.topic.map(topicName => ({
                        topic_name: topicName
                    }))
                }))
            };

            try {
                console.log("📤 Final Sent Data:", JSON.stringify(formattedData, null, 2)); // Debugging log

                const response = await axios.post(
                    "http://localhost:8000/api/syllabus/upload",
                    JSON.stringify(formattedData),
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (response.status === 201) {
                    alert("Syllabus uploaded successfully!");
                    onClose();
                } else {
                    alert("Failed to upload syllabus.");
                }
            } catch (error) {
                console.error("Upload error:", error.response?.data || error.message);
                alert(`Error uploading syllabus: ${error.response?.data?.detail || "Unknown error"}`);
            }
        };

        return (
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
                    className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-[800px] max-h-[80vh] overflow-y-auto text-white relative"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    >
                        <X size={20}/>
                    </button>
                    <h2 className="text-xl font-semibold mb-6">Syllabus Preview</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-purple-400">Subject</h3>
                            <p className="text-white">{data.Subject || "No subject available"}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-purple-400 mb-4">Modules</h3>
                            {data.Syllabus ? (
                                data.Syllabus.map((module, index) => (
                                    <div key={index} className="bg-[#2D2B3D] p-4 rounded-lg mb-4">
                                        <h4 className="font-semibold text-white mb-2">{module.module || "No module name"}</h4>
                                        <p className="text-gray-400 mb-2">{module.subject || "No subject description"}</p>
                                        <div className="space-y-2">
                                            <h5 className="text-sm font-medium text-purple-400">Topics:</h5>
                                            <ul className="list-disc list-inside text-gray-300">
                                                {module.topic && module.topic.length > 0 ? (
                                                    module.topic.map((topic, topicIndex) => (
                                                        <li key={topicIndex}>{topic}</li>
                                                    ))
                                                ) : (
                                                    <li>No topics available</li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">No syllabus data available.</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpload}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                            Upload Syllabus
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        );
    };


    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col h-screen overflow-hidden">
                <TeacherSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="Syllabus"/>
            </div>

            <div className="flex-1 overflow-auto">
                <TeacherNavbar/>

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
                                onClick={handleAddSubject}
                                className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                            >
                                <Plus size={20}/>
                                <span>Add Subject</span>
                            </motion.button>
                        </div>

                        <div className="space-y-6">
                            {syllabusData.map((subject) => (
                                <motion.div
                                    key={subject.id}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    className="bg-[#2D2B3D] rounded-xl overflow-hidden"
                                >
                                    <div
                                        className="p-6 cursor-pointer"
                                        onClick={() => toggleSubject(subject.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <Book className="text-purple-500" size={24}/>
                                                <h2 className="text-xl font-semibold text-white">{subject.subject}</h2>
                                            </div>
                                            <motion.div
                                                animate={{rotate: expandedSubjects.has(subject.id) ? 180 : 0}}
                                                transition={{duration: 0.3}}
                                            >
                                                <ChevronDown size={24} className="text-gray-400"/>
                                            </motion.div>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {expandedSubjects.has(subject.id) && (
                                            <motion.div
                                                initial={{height: 0, opacity: 0}}
                                                animate={{height: "auto", opacity: 1}}
                                                exit={{height: 0, opacity: 0}}
                                                transition={{duration: 0.3}}
                                                className="border-t border-gray-700"
                                            >
                                                {subject.units.map((unit, unitIndex) => (
                                                    <div key={unitIndex}
                                                         className="p-6 border-b border-gray-700 last:border-b-0">
                                                        <div className="flex justify-between items-center mb-4">
                                                            <h3 className="text-lg font-semibold text-white">{unit.title}</h3>
                                                            <motion.button
                                                                whileHover={{scale: 1.05}}
                                                                onClick={() => handleAddTopic(subject, unit)}
                                                                className="flex items-center space-x-2 bg-[#1E1C2E] text-white px-3 py-1 rounded-lg hover:bg-[#3A3750] transition-colors"
                                                            >
                                                                <Plus size={16}/>
                                                                <span>Add Topic</span>
                                                            </motion.button>
                                                        </div>
                                                        <div className="space-y-3">
                                                            {unit.topics.map((topic, topicIndex) => (
                                                                <motion.div
                                                                    key={topicIndex}
                                                                    initial={{opacity: 0, x: -20}}
                                                                    animate={{opacity: 1, x: 0}}
                                                                    className="flex items-center justify-between bg-[#1E1C2E] p-3 rounded-lg"
                                                                >
                                                                    <div className="flex items-center space-x-3">
                                                                        {topic.completed ? (
                                                                            <CheckCircle className="text-green-500"
                                                                                         size={20}/>
                                                                        ) : (
                                                                            <Clock className="text-yellow-500"
                                                                                   size={20}/>
                                                                        )}
                                                                        <span
                                                                            className="text-white">{topic.name}</span>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <motion.button
                                                                            whileHover={{scale: 1.1}}
                                                                            onClick={() => handleEditTopic(subject, unit, topic)}
                                                                            className="text-blue-400 hover:text-blue-300"
                                                                        >
                                                                            <Edit2 size={16}/>
                                                                        </motion.button>
                                                                        <motion.button
                                                                            whileHover={{scale: 1.1}}
                                                                            onClick={() => handleDeleteTopic(subject, unit, topic)}
                                                                            className="text-red-400 hover:text-red-300"
                                                                        >
                                                                            <Trash2 size={16}/>
                                                                        </motion.button>
                                                                    </div>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                        <div className="mt-4">
                                                            <div
                                                                className="flex items-center justify-between text-sm text-gray-400 mb-2">
                                                                <span>Progress</span>
                                                                <span>{unit.progress}%</span>
                                                            </div>
                                                            <div className="w-full bg-[#1E1C2E] rounded-full h-2">
                                                                <motion.div
                                                                    initial={{width: 0}}
                                                                    animate={{width: `${unit.progress}%`}}
                                                                    className="bg-purple-600 h-2 rounded-full"
                                                                ></motion.div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <Modal
                isOpen={addSubjectModalOpen}
                onClose={() => setAddSubjectModalOpen(false)}
                title="Upload Syllabus"
            >
                <div className="space-y-4">
                    <div
                        className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="mx-auto mb-4 text-gray-400" size={32}/>
                        <p className="text-gray-400">Click to upload syllabus PDF</p>
                        <p className="text-sm text-gray-500 mt-2">Only PDF files are supported</p>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileSelect}
                    />
                    {loading && (
                        <div className="text-center text-gray-400">
                            <p>Parsing syllabus...</p>
                        </div>
                    )}
                </div>
            </Modal>

            <PreviewModal
                isOpen={previewModalOpen}
                onClose={() => setPreviewModalOpen(false)}
                data={parsedData}
                teacherId={currentTeacherId}
            />

            <Modal
                isOpen={addTopicModalOpen}
                onClose={() => setAddTopicModalOpen(false)}
                title="Add New Topic"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Topic Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter topic name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            rows={3}
                            placeholder="Enter topic description"
                        />
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={() => setAddTopicModalOpen(false)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                            Add Topic
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                title="Edit Topic"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Topic Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter topic name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            className="w-full px-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            rows={3}
                            placeholder="Enter topic description"
                        />
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                        <input
                            type="checkbox"
                            id="completed"
                            className="rounded bg-[#2D2B3D] border-gray-600 text-purple-500 focus:ring-purple-500"
                        />
                        <label htmlFor="completed" className="text-gray-300">
                            Mark as completed
                        </label>
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={() => setEditModalOpen(false)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Confirm Delete"
            >
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Are you sure you want to delete this topic? This action cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={() => setDeleteModalOpen(false)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>

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

export default Syllabus;