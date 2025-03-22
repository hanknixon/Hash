import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {motion, AnimatePresence} from 'framer-motion';
import {
    Bell, Search, UserCog, School, Briefcase, ClipboardList,
    MessagesSquare, Microscope, Building2, ListChecks,
    Upload, CheckSquare, AlertOctagon, FileText, Book,
    BookMarked, Trophy, Users, LogOut, X, ChevronDown,
    GraduationCap, Award, BookOpen, Plus, Edit2, Trash2
} from 'lucide-react';

// Lab Faculty data
const initialLabFacultyData = [
    {
        name: "R Harikrishnan",
        position: "Lab Instructor",
        department: "Computer Science & Engineering",
        education: "B.Tech in Computer Science",
        specialization: "System Maintenance, Hardware",
        experience: "12+ years in lab management",
        research: "Improving lab efficiency for practical learning",
        image: "Images/Hari.jpg"
    },
    {
        name: "P G Renjithkumar",
        position: "Lab Instructor",
        department: "Computer Science & Engineering",
        education: "Diploma in Computer Science",
        specialization: "Networking, System Administration",
        experience: "10+ years in academia",
        research: "Optimizing lab infrastructure",
        image: "Images/Renjith.jpg"
    }
];

const AdminLabfacPage = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [expandedId, setExpandedId] = useState(null);
    const [facultyData, setFacultyData] = useState(initialLabFacultyData);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Form state for add/edit
    const [formData, setFormData] = useState({
        name: '',
        position: 'Lab Instructor', // Default position for lab faculty
        department: '',
        education: '',
        specialization: '',
        experience: '',
        research: '',
        image: ''
    });

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleAdd = () => {
        setFormData({
            name: '',
            position: 'Lab Instructor',
            department: '',
            education: '',
            specialization: '',
            experience: '',
            research: '',
            image: ''
        });
        setAddModalOpen(true);
    };

    const handleEdit = (teacher) => {
        setSelectedTeacher(teacher);
        setFormData(teacher);
        setEditModalOpen(true);
    };

    const handleDelete = (teacher) => {
        setSelectedTeacher(teacher);
        setDeleteModalOpen(true);
    };

    const handleSubmitAdd = () => {
        const newTeacher = {
            id: facultyData.length + 1,
            ...formData
        };
        setFacultyData([...facultyData, newTeacher]);
        setAddModalOpen(false);
    };

    const handleSubmitEdit = () => {
        const updatedFaculty = facultyData.map(teacher =>
            teacher.id === selectedTeacher.id ? {...formData, id: teacher.id} : teacher
        );
        setFacultyData(updatedFaculty);
        setEditModalOpen(false);
    };

    const handleConfirmDelete = () => {
        const updatedFaculty = facultyData.filter(teacher => teacher.id !== selectedTeacher.id);
        setFacultyData(updatedFaculty);
        setDeleteModalOpen(false);
    };

    const filteredFaculty = facultyData.filter(teacher =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.specialization.toLowerCase().includes(searchQuery.toLowerCase())
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
                                <li className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg">
                                    <Microscope size={18} className="mr-2"/> Lab Instructors
                                </li>
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
                            placeholder="Search lab faculty..."
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

                {/* Lab Faculty Content */}
                <div className="p-8">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-2xl p-8"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-white">Lab Faculty Management</h2>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                onClick={handleAdd}
                                className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                            >
                                <Plus size={20}/>
                                <span>Add New Lab Faculty</span>
                            </motion.button>
                        </div>

                        <div className="space-y-4">
                            {filteredFaculty.map((faculty) => (
                                <motion.div
                                    layout
                                    key={faculty.id}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    className="bg-[#2D2B3D] rounded-xl overflow-hidden"
                                >
                                    <motion.div
                                        layout="position"
                                        className="p-6 cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <motion.img
                                                    layout="position"
                                                    src={faculty.image}
                                                    alt={faculty.name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <div>
                                                    <motion.h3 layout="position"
                                                               className="text-white font-semibold">
                                                        {faculty.name}
                                                    </motion.h3>
                                                    <motion.p layout="position" className="text-purple-400">
                                                        {faculty.position}
                                                    </motion.p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <motion.button
                                                    whileHover={{scale: 1.1}}
                                                    onClick={() => handleEdit(faculty)}
                                                    className="text-blue-400 hover:text-blue-300"
                                                >
                                                    <Edit2 size={20}/>
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{scale: 1.1}}
                                                    onClick={() => handleDelete(faculty)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <Trash2 size={20}/>
                                                </motion.button>
                                                <motion.div
                                                    onClick={() => toggleExpand(faculty.id)}
                                                    animate={{rotate: expandedId === faculty.id ? 180 : 0}}
                                                    transition={{duration: 0.3}}
                                                >
                                                    <ChevronDown className="text-gray-400 cursor-pointer"/>
                                                </motion.div>
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {expandedId === faculty.id && (
                                                <motion.div
                                                    initial={{height: 0, opacity: 0}}
                                                    animate={{height: "auto", opacity: 1}}
                                                    exit={{height: 0, opacity: 0}}
                                                    transition={{duration: 0.3}}
                                                    className="mt-4 pt-4 border-t border-gray-700"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-3">
                                                            <motion.div
                                                                initial={{x: -20, opacity: 0}}
                                                                animate={{x: 0, opacity: 1}}
                                                                transition={{delay: 0.3}}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <GraduationCap className="text-purple-400" size={20}/>
                                                                <p className="text-gray-300">{faculty.education}</p>
                                                            </motion.div>
                                                            <motion.div
                                                                initial={{x: -20, opacity: 0}}
                                                                animate={{x: 0, opacity: 1}}
                                                                transition={{delay: 0.4}}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <Award className="text-purple-400" size={20}/>
                                                                <p className="text-gray-300">{faculty.specialization}</p>
                                                            </motion.div>
                                                        </div>
                                                        <div className="space-y-3">
                                                            <motion.div
                                                                initial={{x: 20, opacity: 0}}
                                                                animate={{x: 0, opacity: 1}}
                                                                transition={{delay: 0.5}}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <Users className="text-purple-400" size={20}/>
                                                                <p className="text-gray-300">{faculty.experience}</p>
                                                            </motion.div>
                                                            <motion.div
                                                                initial={{x: 20, opacity: 0}}
                                                                animate={{x: 0, opacity: 1}}
                                                                transition={{delay: 0.6}}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <BookOpen className="text-purple-400" size={20}/>
                                                                <p className="text-gray-300">{faculty.research}</p>
                                                            </motion.div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Add Lab Faculty Modal */}
            <Modal
                isOpen={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                title="Add New Lab Faculty"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-2">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Department</label>
                        <input
                            type="text"
                            value={formData.department}
                            onChange={(e) => setFormData({...formData, department: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Education</label>
                        <input
                            type="text"
                            value={formData.education}
                            onChange={(e) => setFormData({...formData, education: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Specialization</label>
                        <input
                            type="text"
                            value={formData.specialization}
                            onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Experience</label>
                        <input
                            type="text"
                            value={formData.experience}
                            onChange={(e) => setFormData({...formData, experience: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Research</label>
                        <textarea
                            value={formData.research}
                            onChange={(e) => setFormData({...formData, research: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                            rows={3}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Image URL</label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={() => setAddModalOpen(false)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmitAdd}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                            Add Lab Faculty
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit Lab Faculty Modal */}
            <Modal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                title="Edit Lab Faculty"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-2">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Department</label>
                        <input
                            type="text"
                            value={formData.department}
                            onChange={(e) => setFormData({...formData, department: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Education</label>
                        <input
                            type="text"
                            value={formData.education}
                            onChange={(e) => setFormData({...formData, education: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Specialization</label>
                        <input
                            type="text"
                            value={formData.specialization}
                            onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Experience</label>
                        <input
                            type="text"
                            value={formData.experience}
                            onChange={(e) => setFormData({...formData, experience: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Research</label>
                        <textarea
                            value={formData.research}
                            onChange={(e) => setFormData({...formData, research: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                            rows={3}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Image URL</label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
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
                            onClick={handleSubmitEdit}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Confirm Delete"
            >
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Are you sure you want to delete {selectedTeacher?.name}? This action cannot be undone.
                    </p>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            onClick={() => setDeleteModalOpen(false)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmDelete}
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

export default AdminLabfacPage;