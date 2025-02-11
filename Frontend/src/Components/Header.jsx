import React from 'react';
import { Search, Bell } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search resources..."
          className="bg-[#2D2B3D] text-white pl-12 pr-4 py-2 rounded-lg w-[300px] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-white">Welcome, User</span>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;