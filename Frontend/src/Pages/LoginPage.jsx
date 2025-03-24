import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Eye, EyeOff} from 'lucide-react';
import {motion} from 'framer-motion';
import {FlipWords} from '../../ui/flip-words';
import {Spotlight} from '../../ui/spotlight-new';
import {LoadingScreen} from '../Components/LoadingScreen';

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showInitialLoading, setShowInitialLoading] = useState(true);

    const slides = [
        'Images/LoginPage-Background.jpg',
        'Images/LoginPage-Background2.jpg',
        'Images/LoginPage-Background3.jpg'
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 7000);

        const loadingTimer = setTimeout(() => {
            setShowInitialLoading(false);
        }, 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(loadingTimer);
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();
            console.log("🔥 Full API Response:", JSON.stringify(data, null, 2));

            if (response.ok && data?.role && data?.email) {
                if (data.role === "teacher" && !data.teacher_id) {
                    console.error("❌ Missing teacher_id in API response!");
                    setError("Login failed: teacher_id missing.");
                    return;
                }

                console.log("✅ Saving user to localStorage:", JSON.stringify(data));
                localStorage.setItem("user", JSON.stringify(data));

                let redirectPath = "/studentdashboard";
                if (data.role === "teacher") {
                    redirectPath = "/teacherdashboard";
                } else if (data.role === "admin") {
                    redirectPath = "/AdminDashboard";
                }

                setTimeout(() => {
                    window.location.href = redirectPath;
                }, 100);
            } else {
                setError("Invalid credentials or user not found.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const words = ["Learn", "Practice", "Test", "Rank", "Certify"];

    return (
        <>
            {showInitialLoading && <LoadingScreen/>}
            <div className="min-h-screen bg-[#2D2B3D] flex items-center justify-center p-4 relative overflow-hidden">
                <Spotlight/>
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5, delay: 2}}
                    className="w-full max-w-[1100px] bg-[#1E1C2E] rounded-3xl overflow-hidden flex shadow-2xl relative z-[50] pointer-events-auto"
                >
                    {/* Left Side - Image Section (Slideshow) */}
                    <div className="hidden lg:flex lg:w-1/2 relative">
                        {slides.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={false}
                                animate={{opacity: index === currentSlide ? 1 : 0}}
                                transition={{duration: 1}}
                                className="absolute inset-0 bg-cover bg-center"
                                style={{backgroundImage: `url('${image}')`}}
                            />
                        ))}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C2E]/80 to-transparent"/>
                        <div className="relative z-10 p-12 flex flex-col h-full">
                            <motion.div
                                initial={{scale: 0.5, opacity: 0}}
                                animate={{scale: 1, opacity: 1}}
                                transition={{duration: 0.5, delay: 2.2}}
                                className="absolute -top-4 left-1 bg-no-repeat bg-center bg-contain"
                                style={{backgroundImage: "url('Images/HashLogo.png')", width: "150px", height: "150px"}}
                            />
                            <div className="text-white mt-auto text-4xl font-bold">
                                <FlipWords words={words} className="text-white ml-[-10px]"/>
                            </div>
                            <div className="flex gap-2 mt-4">
                                {slides.map((_, index) => (
                                    <motion.div
                                        key={index}
                                        className={`w-8 h-1 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-500'}`}
                                        initial={false}
                                        animate={{scale: index === currentSlide ? 1.2 : 1}}
                                        transition={{duration: 0.3}}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form Section */}
                    <motion.div
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.5, delay: 2.4}}
                        className="w-full lg:w-1/2 p-8 md:p-12"
                    >
                        <div className="flex justify-between items-center mb-10">
                            <h1 className="text-3xl text-white font-bold">Login to your Account</h1>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: 2.6}}
                            >
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#2D2B3D] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                />
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: 2.8}}
                                className="relative"
                            >
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#2D2B3D] text-white rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F8F8F] hover:text-white transition-colors cursor-pointer z-20"
                                >
                                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                            </motion.div>

                            {error && (
                                <motion.p
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    className="text-red-500 text-sm mb-4"
                                >
                                    {error}
                                </motion.p>
                            )}

                            {loading ? (
                                <div className="flex justify-center">
                                    <motion.div
                                        animate={{rotate: 360}}
                                        transition={{duration: 1, repeat: Infinity, ease: "linear"}}
                                        className="h-8 w-8 border-4 border-white border-t-transparent rounded-full"
                                    />
                                </div>
                            ) : (
                                <motion.button
                                    type="submit"
                                    className="w-full bg-[#7C3AED] text-white rounded-lg p-3 font-medium hover:bg-[#6D28D9] transition-all duration-300 cursor-pointer"
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                >
                                    Login to your account
                                </motion.button>
                            )}

                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 0.5, delay: 3}}
                                className="relative my-10"
                            >
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[#2D2B3D]"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-[#1E1C2E] text-[#8F8F8F]">Or login with</span>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, delay: 3.2}}
                                className="flex gap-6"
                            >
                                <motion.button
                                    type="button"
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#2D2B3D] text-white rounded-lg p-3 hover:bg-[#363447] transition-all duration-300 cursor-pointer"
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                >
                                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5"/>
                                    Google
                                </motion.button>
                                <motion.button
                                    type="button"
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#2D2B3D] text-white rounded-lg p-3 hover:bg-[#363447] transition-all duration-300 cursor-pointer"
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                >
                                    <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5"/>
                                    Apple
                                </motion.button>
                            </motion.div>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}

export default LoginPage;