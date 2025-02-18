import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import StudentNavbar from '../../components/StudentNavbar';
import StudentSidebar from '../../components/StudentSidebar';
import LogoutModal from '../../components/LogoutModal';
import ExpandableCard from '../../components/ExpandableCard';

const PYQsPage = () => {
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

  const pyqs = [
    "AAD/KTUS6IT/QNP2019SC/MAR2022",
    "AAD/KTUS6IT/QNP2018SC/SEP2021",
    "AAD/KTUS6IT/QNP2017SC/JUN2020",
  ];

  return (
    <div className="flex h-screen bg-[#2D2B3D]">
      <StudentSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="PYQsPage" />

      <div className="flex-1 overflow-auto">
        <StudentNavbar />

        {/* PYQs Content */}
        <div className="p-6">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="bg-[#1E1C2E] rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Previous Year Question Papers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject, index) => (
                <ExpandableCard
                  key={index}
                  title={subject}
                  isExpanded={expandedSubject === index}
                  onToggle={() => setExpandedSubject(expandedSubject === index ? null : index)}
                >
                  <h4 className="text-gray-300 mb-2">PYQs:</h4>
                  <ul className="space-y-2">
                    {pyqs.map((pyq, pyqIndex) => (
                      <motion.li
                        key={pyqIndex}
                        initial={{x: -10, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        transition={{delay: 0.1 * (pyqIndex + 1)}}
                        className="text-gray-400 hover:text-white cursor-pointer flex items-center space-x-2"
                      >
                        <FileText size={16}/>
                        <span>{pyq}</span>
                      </motion.li>
                    ))}
                  </ul>
                </ExpandableCard>
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

export default PYQsPage;