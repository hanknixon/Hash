import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import StudentNavbar from '../../Components/StudentNavbar';
import StudentSidebar from '../../Components/StudentSidebar';
import LogoutModal from '../../Components/LogoutModal';
import PopupModal from '../../Components/PopupModal.jsx';

const SyllabusPage = () => {
  const navigate = useNavigate();
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/LoginPage");
  };

  const subjects = [
    "Internetworking with TCP/IP",
    "Algorithm Analysis & Design",
    "Data Science",
    "Industrial Economics & Foreign trade",
    "Digital Image Processing",
    "Soft Computing",
    "Course Viva",
    "Computer Networks Lab",
  ];

  return (
    <div className="flex h-screen bg-[#2D2B3D]">
      <StudentSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="SyllabusPage" />

      <div className="flex-1 overflow-auto">
        <StudentNavbar />

        {/* Syllabus Content */}
        <div className="p-6">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="bg-[#1E1C2E] rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Syllabus</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject, index) => (
                <PopupModal
                  key={index}
                  title={subject}
                  isExpanded={expandedSubject === index}
                  onToggle={() => setExpandedSubject(expandedSubject === index ? null : index)}
                >
                  <h4 className="text-gray-300 mb-2">Available Files:</h4>
                  <ul className="space-y-2">
                    <motion.li
                      initial={{x: -10, opacity: 0}}
                      animate={{x: 0, opacity: 1}}
                      transition={{delay: 0.1}}
                      className="text-gray-400 hover:text-white cursor-pointer flex items-center space-x-2"
                    >
                      <FileText size={16}/>
                      <span>Syllabus - {subject}</span>
                    </motion.li>
                  </ul>
                </PopupModal>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default SyllabusPage;