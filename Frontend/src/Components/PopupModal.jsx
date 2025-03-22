import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {X, FileText} from 'lucide-react';

const PopupModal = ({title, isExpanded, onToggle, children}) => {
    return (
        <>
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.3, ease: "easeOut"}}
                className="bg-[#2D2B3D] rounded-lg overflow-hidden cursor-pointer"
                onClick={onToggle}
            >
                <div className="p-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-white font-semibold">{title}</h3>
                        <FileText className="text-[#7C3AED]" size={20}/>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isExpanded && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.2}}
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={onToggle}
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{opacity: 0, scale: 0.9}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.9}}
                            transition={{duration: 0.3, ease: "easeOut"}}
                            className="fixed inset-0 flex items-center justify-center bg-transparent z-50"
                        >
                            <div
                                className="bg-[#1E1C2E] rounded-xl p-6 shadow-xl w-11/12 max-w-lg max-h-[80vh] overflow-y-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                                    <button
                                        onClick={onToggle}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X size={24}/>
                                    </button>
                                </div>

                                <div className="mt-2">
                                    {children}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default PopupModal;
