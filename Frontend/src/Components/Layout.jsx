import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Clock, CheckSquare, Award, Users, LogOut } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  const navItems = [
    { name: 'Dashboard', icon: BookOpen, path: '/' },
    { name: 'Subjects', icon: Clock, path: '/subjects' },
    { name: 'Quizzes', icon: CheckSquare, path: '/quiz' },
    { name: 'Results', icon: Award, path: '/results' },
    { name: 'Rankings', icon: Users, path: '/rankings' },
  ];

  return (
    <div className="min-h-screen bg-[#2D2B3D] flex items-center justify-center p-4">
      <div className="w-full max-w-[1100px] bg-[#1E1C2E] rounded-3xl overflow-hidden flex shadow-2xl p-8">
        <div className="w-1/4 bg-[#2D2B3D] rounded-lg p-6">
          <div className="text-white text-2xl font-bold mb-8">HASH</div>
          <nav className="space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 text-white hover:bg-[#7C3AED] p-2 rounded-lg transition-colors ${
                    location.pathname === item.path ? 'bg-[#7C3AED]' : ''
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <button className="flex items-center gap-3 text-white hover:bg-[#7C3AED] p-2 rounded-lg mt-auto w-full">
            <LogOut size={20} />
            Logout
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;