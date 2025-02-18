import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search, Bell, CheckCircle, Clock, AlertCircle, FileText,
  Book, BookMarked, Trophy, Users, LogOut,
  Brain, Lightbulb, Target, Glasses, GraduationCap,
  Cpu, Compass, Award, Crown, Star, X
} from 'lucide-react';
import {motion,AnimatePresence} from "framer-motion";
import { HoverBorderGradient } from "../../ui/hover-border-gradient";


// Dummy data for top ranks
const topRanks = [
  {
    name: "Mohammed Ziyan",
    rank: "Grandmaster",
    points: 15000,
    avatar: "Images/Ziyan.jpg"
  },
  {
    name: "Muhammed Hasheem",
    rank: "Elite",
    points: 12000,
    avatar: "Images/Hasheem.png"
  },
  {
    name: "Michael Park",
    rank: "Expert",
    points: 10000,
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop"
  }
];

// Rank system data
const rankSystem = [
  { title: "Novice", icon: Brain, description: "Just getting started.", points: 0, color: "text-gray-400" },
  { title: "Apprentice", icon: Lightbulb, description: "Building a foundation.", points: 1000, color: "text-gray-400" },
  { title: "Challenger", icon: Target, description: "Actively engaging in quizzes.", points: 2000, color: "text-gray-500" },
  { title: "Analyst", icon: Glasses, description: "Developing critical thinking.", points: 3000, color: "text-gray-400" },
  { title: "Scholar", icon: GraduationCap, description: "Strong subject understanding.", points: 4000, color: "text-gray-500" },
  { title: "Mastermind", icon: Cpu, description: "Excelling in multiple topics.", points: 5000, color: "text-gray-400" },
  { title: "Strategist", icon: Compass, description: "Applying knowledge with precision.", points: 6000, color: "text-gray-500" },
  { title: "Expert", icon: Award, description: "Consistently achieving high scores.", points: 7000, color: "text-purple-400" },
  { title: "Elite", icon: Crown, description: "Among the top performers.", points: 8000, color: "text-red-500" },
  { title: "Grandmaster", icon: Star, description: "The pinnacle of knowledge.", points: 10000, color: "text-yellow-500" }
];

const RanksPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/LoginPage");
  };

  return (
      <div className="flex h-screen bg-[#2D2B3D]">
          {/* Sidebar */}
          <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col">
              {/* Logo */}
              <div className="mb-8">
                  <h1 className="text-2xl font-bold">Hash - Quiz Learning Platform</h1>
              </div>
              <div className="border-b border-gray-700 mb-6"></div>

              <motion.div
                  whileHover={{scale: 1.02}}
                  className={`text-lg font-semibold mb-4 cursor-pointer transition-colors duration-200 ${
                      location.pathname === "/StudentDashboard" ? "text-purple-400" : "text-white hover:text-purple-400"
                  }`}
                  onClick={() => navigate("/StudentDashboard")}
              >
                  Dashboard
              </motion.div>

              <div className="border-b border-gray-700 mb-6"></div>

              {/* My Assignments Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">ASSIGNMENTS</div>
          <ul className="space-y-3">
            <motion.li whileHover={{ x: 4 }} className="flex items-center text-gray-300 hover:text-white cursor-pointer"
            onClick={() => navigate("/CompletedQuizPage")}>
              <CheckCircle size={18} className="mr-2"/> Completed Quizzes
            </motion.li>
            <motion.li whileHover={{ x: 4 }} className="flex items-center text-gray-300 hover:text-white cursor-pointer"
            onClick={() => navigate("/UpcomingQuizPage")}>
              <Clock size={18} className="mr-2"/> Upcoming Quizzes
            </motion.li>
            <motion.li whileHover={{ x: 4 }} className="flex items-center text-gray-300 hover:text-white cursor-pointer"
            onClick={() => navigate("/PendingQuizPage")}>
              <AlertCircle size={18} className="mr-2"/> Pending Quizzes
            </motion.li>
          </ul>
        </div>

              <div className="border-b border-gray-700 mb-6"></div>

              {/* Resources Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">RESOURCES</div>
          <ul className="space-y-3">
            <motion.li
                whileHover={{x: 4}}
                className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                onClick={() => navigate("/PYQsPage")}
                >
              <FileText size={18} className="mr-2"/> PYQs
            </motion.li>
            <motion.li whileHover={{x: 4}} className="flex items-center text-gray-300 hover:text-white cursor-pointer"
            onClick={() => navigate("/SyllabusPage")}>
              <Book size={18} className="mr-2"/> Syllabus
            </motion.li>
            <motion.li whileHover={{x: 4}} className="flex items-center text-gray-300 hover:text-white cursor-pointer"
            onClick={() => navigate("/MaterialsPage")}>
              <BookMarked size={18} className="mr-2"/> Materials / Notes
            </motion.li>
          </ul>
        </div>

              <div className="border-b border-gray-700 mb-6"></div>

              {/* Ranks Section */}
              <div className="mb-6">
                  <div className="text-[#8F8F8F] text-sm mb-3">RANKS</div>
                  <ul className="space-y-3">
                      <li className="flex items-center text-white bg-[#3A3750] cursor-default p-2 rounded-lg">
                          <Trophy size={18} className="mr-2"/> Ranks
                      </li>
                  </ul>
              </div>

              <div className="border-b border-gray-700 mb-6"></div>

              {/* Teachers Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">TEACHERS</div>
          <ul className="space-y-3">
            <motion.li whileHover={{x: 4}} className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                       onClick={() => navigate("/MyTeachersPage")}>
              <Users size={18} className="mr-2"/> My Teachers
            </motion.li>
          </ul>
        </div>

              {/* Logout at bottom */}
              <div className="mt-auto">
                  <button
                      onClick={() => setLogoutModalOpen(true)}
                      className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] transition-all duration-200 p-2 rounded-lg"
                  >
                      <LogOut size={18} className="mr-2"/> Logout
                  </button>
              </div>
          </div>
          {/* Logout Confirmation Modal */}
          <AnimatePresence>
        {logoutModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-80 text-white relative"
            >
              <button
                onClick={() => setLogoutModalOpen(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
              <p className="text-gray-400 mb-6">Are you sure you want to log out?</p>

              <div className="flex justify-between">
                <button
                  onClick={() => setLogoutModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Yes, Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    {/* Main Content */
    }
    <div className="flex-1 overflow-auto">
        {/* Navbar */}
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
                <button className="relative">
                    <Bell size={24} className="text-gray-300 hover:text-white"/>
                    <span
                        className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">3</span>
                </button>
                <div className="flex items-center space-x-3">
                    <span className="text-white">Welcome, User</span>
                    <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop"
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                </div>
            </div>
        </div>

        {/* Ranks Content */}
        <div className="p-8 space-y-8">
            {/* Top Ranks Section */}
            <div className="bg-[#1E1C2E] rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-8">Top Performers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {topRanks.map((ranker, index) => (
                        <div key={index}
                             className="bg-[#2D2B3D] rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <img src={ranker.avatar} alt={ranker.name} className="w-24 h-24 rounded-full mb-4"/>
                                    <div
                                        className={`absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full ${
                                            index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-300" : "bg-bronze-500"
                                        }`}>
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{ranker.name}</h3>
                                <p className="text-purple-400 font-semibold mb-2">{ranker.rank}</p>
                                <p className="text-gray-400">{ranker.points} points</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rank System Section */}
            <div className="bg-[#1E1C2E] rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-8">Rank System</h2>
                <div className="relative">
                    {/* Progress Line */}
                    <div
                        className="absolute top-1/2 left-0 right-0 h-2 bg-[#2D2B3D] transform -translate-y-1/2 rounded-full"></div>

                    {/* Ranks Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
                        {rankSystem.map((rank, index) => {
  const isSpecialRank = rank.title === "Expert" || rank.title === "Elite" || rank.title === "Grandmaster";
  const getHighlightColor = () => {
    switch (rank.title) {
      case "Expert":
        return "#7C3AED"; // Purple
      case "Elite":
        return "#EF4444"; // Red
      case "Grandmaster":
        return "#F59E0B"; // Gold
      default:
        return "#3275F8";
    }
  };

  const Card = isSpecialRank ? HoverBorderGradient : "div";
  const cardProps = isSpecialRank
    ? {
        highlightColor: getHighlightColor(),
        containerClassName: "w-full h-full transform hover:scale-105 transition-all duration-300",
        className: "p-6 bg-opacity-50",
        duration: 3,
      }
    : {
        className: "bg-[#2D2B3D] rounded-xl p-6 transform hover:scale-105 transition-transform duration-300",
      };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <Card {...cardProps}>
        <div className="flex flex-col items-center text-center relative z-20">
          <div className={`w-16 h-16 rounded-full bg-[#1E1C2E] flex items-center justify-center mb-4 ${rank.color}`}>
            <rank.icon size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{rank.title}</h3>
          <p className="text-gray-400 text-sm mb-3">{rank.description}</p>
          <p className="text-purple-400 font-semibold">{rank.points}+ points</p>
        </div>
      </Card>
    </motion.div>
  );
})}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RanksPage;