import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Trophy, Brain, Target, Star, Filter, ChevronDown
} from 'lucide-react';
import {motion, AnimatePresence} from "framer-motion";
import {HoverBorderGradient} from "../../../ui/hover-border-gradient";
import StudentNavbar from '../../Components/StudentNavbar';
import StudentSidebar from '../../Components/StudentSidebar';
import LogoutModal from '../../Components/LogoutModal';

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
    {title: "Novice", icon: Brain, description: "Just getting started.", points: 0, color: "text-gray-400"},
    {title: "Apprentice", icon: Brain, description: "Building a foundation.", points: 1000, color: "text-gray-400"},
    {
        title: "Challenger",
        icon: Target,
        description: "Actively engaging in quizzes.",
        points: 2000,
        color: "text-gray-500"
    },
    {
        title: "Analyst",
        icon: Brain,
        description: "Developing critical thinking.",
        points: 3000,
        color: "text-gray-400"
    },
    {
        title: "Scholar",
        icon: Brain,
        description: "Strong subject understanding.",
        points: 4000,
        color: "text-gray-500"
    },
    {
        title: "Mastermind",
        icon: Brain,
        description: "Excelling in multiple topics.",
        points: 5000,
        color: "text-gray-400"
    },
    {
        title: "Strategist",
        icon: Target,
        description: "Applying knowledge with precision.",
        points: 6000,
        color: "text-gray-500"
    },
    {
        title: "Expert",
        icon: Brain,
        description: "Consistently achieving high scores.",
        points: 7000,
        color: "text-purple-400"
    },
    {title: "Elite", icon: Star, description: "Among the top performers.", points: 8000, color: "text-red-500"},
    {
        title: "Grandmaster",
        icon: Star,
        description: "The pinnacle of knowledge.",
        points: 10000,
        color: "text-yellow-500"
    }
];

const RanksPage = () => {
    const navigate = useNavigate();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showYearFilter, setShowYearFilter] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/LoginPage");
    };

    return (
        <div className="flex h-screen bg-[#2D2B3D]">
            <StudentSidebar onLogout={() => setLogoutModalOpen(true)} currentPage="RanksPage" />

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <StudentNavbar />

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
                                            <img src={ranker.avatar} alt={ranker.name}
                                                 className="w-24 h-24 rounded-full mb-4"/>
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
                                            initial={{opacity: 0, y: 20}}
                                            animate={{opacity: 1, y: 0}}
                                            transition={{delay: index * 0.1}}
                                            className="h-full"
                                        >
                                            <Card {...cardProps}>
                                                <div className="flex flex-col items-center text-center relative z-20">
                                                    <div
                                                        className={`w-16 h-16 rounded-full bg-[#1E1C2E] flex items-center justify-center mb-4 ${rank.color}`}>
                                                        <rank.icon size={32}/>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white mb-2">{rank.title}</h3>
                                                    <p className="text-gray-400 text-sm mb-3">{rank.description}</p>
                                                    <p className="text-purple-400 font-semibold">{rank.points}+
                                                        points</p>
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

            <LogoutModal
                isOpen={logoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
};

export default RanksPage;