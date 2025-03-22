import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {
    Bell, Search, UserCog, School, Briefcase, ClipboardList,
    MessagesSquare, Microscope, Building2, ListChecks,
    Upload, CheckSquare, AlertOctagon, FileText, Book,
    BookMarked, Trophy, Users, LogOut, X, Plus, Edit2, Trash2
} from 'lucide-react';
import {motion, AnimatePresence} from "framer-motion";

// Dummy data for students (20 students as example)
const initialStudentsData = [
    {
        id: 1,
        name: "Aaron Anderson",
        regNo: "CS2024001",
        type: "Hosteler",
        subjectGrades: {
            "Data Structures": "A",
            "Computer Networks": "A+",
            "Database Systems": "A",
            "Operating Systems": "B+",
            "Web Development": "A"
        },
        labGrades: {
            "DS Lab": "A",
            "CN Lab": "A+"
        },
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&fit=crop",
        dob: "2003-05-15",
        address: "123 College Ave, New York, NY"
    },
    {
        id: 2,
        name: "Beth Barnes",
        regNo: "CS2024002",
        type: "Day Scholar",
        subjectGrades: {
            "Data Structures": "A+",
            "Computer Networks": "A",
            "Database Systems": "A+",
            "Operating Systems": "A",
            "Web Development": "A+"
        },
        labGrades: {
            "DS Lab": "A+",
            "CN Lab": "A"
        },
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&fit=crop",
        dob: "2003-07-22",
        address: "456 University Blvd, Boston, MA"
    }
];

const Year1StudentsPage = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [studentsData, setStudentsData] = useState(initialStudentsData);
    const [searchQuery, setSearchQuery] = useState('');

    // CRUD Modal States
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    // Form Data State
    const [formData, setFormData] = useState({
        name: '',
        regNo: '',
        type: 'Day Scholar',
        subjectGrades: {},
        labGrades: {},
        image: '',
        dob: '',
        address: ''
    });

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    const calculateAverage = (grades) => {
        const gradeValues = {
            'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0
        };
        const total = Object.values(grades).reduce((sum, grade) => sum + gradeValues[grade], 0);
        return (total / Object.keys(grades).length).toFixed(2);
    };

    // CRUD Operations
    const handleAdd = () => {
        setFormData({
            name: '',
            regNo: '',
            type: 'Day Scholar',
            subjectGrades: {},
            labGrades: {},
            image: '',
            dob: '',
            address: ''
        });
        setAddModalOpen(true);
    };

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setFormData(student);
        setEditModalOpen(true);
    };

    const handleDelete = (student) => {
        setSelectedStudent(student);
        setDeleteModalOpen(true);
    };

    const handleSubmitAdd = () => {
        const newStudent = {
            ...formData,
            id: studentsData.length + 1
        };
        setStudentsData([...studentsData, newStudent]);
        setAddModalOpen(false);
    };

    const handleSubmitEdit = () => {
        const updatedStudents = studentsData.map(student =>
            student.id === selectedStudent.id ? {...formData, id: student.id} : student
        );
        setStudentsData(updatedStudents);
        setEditModalOpen(false);
    };

    const handleConfirmDelete = () => {
        const updatedStudents = studentsData.filter(student => student.id !== selectedStudent.id);
        setStudentsData(updatedStudents);
        setDeleteModalOpen(false);
    };

    // Filter students based on search
    const filteredStudents = studentsData.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.regNo.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="flex h-screen bg-[#2D2B3D] overflow-hidden">
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
                                <motion.li
                                    whileHover={{x: 4}}
                                    className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                    onClick={() => navigate("/Year1StudentsPage")}
                                >
                                    <School size={18} className="mr-2"/> Year 1 Students
                                </motion.li>
                                <motion.li
                                    whileHover={{x: 4}}
                                    className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg"
                                >
                                    <School size={18} className="mr-2"/> Year 2 Students
                                </motion.li>
                                <li className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                    onClick={() => navigate("/Year3StudentsPage")}>
                                    <School size={18} className="mr-2"/> Year 3 Students
                                </li>
                                <motion.li
                                    whileHover={{x: 4}}
                                    className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                                    onClick={() => navigate("/Year4StudentsPage")}
                                >
                                    <School size={18} className="mr-2"/> Year 4 Students
                                </motion.li>
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

            {/* Main content */}
            <div className="flex-1 overflow-auto">
                {/* Top Navigation */}
                <div className="bg-[#1E1C2E] p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={20}/>
                            <input
                                type="text"
                                placeholder="Search students..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-[#2D2B3D] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <motion.button whileHover={{scale: 1.1}} className="relative">
                            <Bell size={24} className="text-gray-300 hover:text-white"/>
                            <span
                                className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">
                3
              </span>
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

                {/* Students Content */}
                <div className="p-6">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-[#1E1C2E] rounded-xl p-6"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Year 2 Students</h2>
                            <motion.button
                                whileHover={{scale: 1.05}}
                                onClick={handleAdd}
                                className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                            >
                                <Plus size={20}/>
                                <span>Add New Student</span>
                            </motion.button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredStudents.map((student) => (
                                <motion.div
                                    key={student.id}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    className="bg-[#2D2B3D] rounded-lg p-6 flex"
                                >
                                    {/* Left Side */}
                                    <div className="flex-1 pr-4">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-white font-semibold text-lg mb-2">{student.name}</h3>
                                            <div className="flex space-x-2">
                                                <motion.button
                                                    whileHover={{scale: 1.1}}
                                                    onClick={() => handleEdit(student)}
                                                    className="text-blue-400 hover:text-blue-300"
                                                >
                                                    <Edit2 size={20}/>
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{scale: 1.1}}
                                                    onClick={() => handleDelete(student)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <Trash2 size={20}/>
                                                </motion.button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-gray-400">
                                                <span className="text-purple-400">Reg No:</span> {student.regNo}
                                            </p>
                                            <p className="text-gray-400">
                                                <span className="text-purple-400">Type:</span> {student.type}
                                            </p>
                                            <div>
                                                <p className="text-purple-400 mb-1">Subject Grades</p>
                                                <p className="text-gray-400">Average: {calculateAverage(student.subjectGrades)}</p>
                                            </div>
                                            <div>
                                                <p className="text-purple-400 mb-1">Lab Grades</p>
                                                <p className="text-gray-400">Average: {calculateAverage(student.labGrades)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side */}
                                    <div className="flex flex-col items-center">
                                        <motion.img
                                            whileHover={{scale: 1.1}}
                                            src={student.image}
                                            alt={student.name}
                                            className="w-20 h-20 rounded-full mb-4 object-cover"
                                        />
                                        <p className="text-gray-400 text-sm">
                                            <span className="text-purple-400">DOB:</span><br/>
                                            {new Date(student.dob).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-400 text-sm mt-2 text-center">
                                            <span className="text-purple-400">Address:</span><br/>
                                            {student.address}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Add Student Modal */}
            <Modal
                isOpen={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                title="Add New Student"
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
                        <label className="block text-gray-400 mb-2">Registration Number</label>
                        <input
                            type="text"
                            value={formData.regNo}
                            onChange={(e) => setFormData({...formData, regNo: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        >
                            <option value="Day Scholar">Day Scholar</option>
                            <option value="Hosteler">Hosteler</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Date of Birth</label>
                        <input
                            type="date"
                            value={formData.dob}
                            onChange={(e) => setFormData({...formData, dob: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Address</label>
                        <textarea
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
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
                            Add Student
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit Student Modal */}
            <Modal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                title="Edit Student"
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
                        <label className="block text-gray-400 mb-2">Registration Number</label>
                        <input
                            type="text"
                            value={formData.regNo}
                            onChange={(e) => setFormData({...formData, regNo: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Type</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        >
                            <option value="Day Scholar">Day Scholar</option>
                            <option value="Hosteler">Hosteler</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Date of Birth</label>
                        <input
                            type="date"
                            value={formData.dob}
                            onChange={(e) => setFormData({...formData, dob: e.target.value})}
                            className="w-full bg-[#2D2B3D] text-white rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Address</label>
                        <textarea
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
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
                        Are you sure you want to delete {selectedStudent?.name}? This action cannot be undone.
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

export default Year1StudentsPage;