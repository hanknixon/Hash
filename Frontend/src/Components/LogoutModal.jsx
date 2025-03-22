import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="bg-[#1E1C2E] p-6 rounded-lg shadow-lg w-80 text-white relative"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            <X size={20}/>
          </button>

          <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
          <p className="text-gray-400 mb-6">Are you sure you want to log out?</p>

          <div className="flex justify-between">
            <motion.button
              whileHover={{scale: 1.05}}
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg transition-all duration-200"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{scale: 1.05}}
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-200"
            >
              Yes, Logout
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LogoutModal;