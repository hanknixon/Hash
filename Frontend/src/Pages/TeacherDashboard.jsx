import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, Users, ClipboardList, Activity, Search, Bell, LogOut, CheckCircle, Clock, AlertCircle, Book, BookMarked, Trophy, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const data = [
  { name: "Jan", quizzes: 30 },
  { name: "Feb", quizzes: 45 },
  { name: "Mar", quizzes: 60 },
  { name: "Apr", quizzes: 40 },
  { name: "May", quizzes: 70 },
  { name: "Jun", quizzes: 55 },
];

export default function TeacherDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#1E1C2E] text-white p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Hash - Quiz Learning Platform</h1>
        </div>
        <div className="border-b border-gray-700 mb-6"></div>
        <div className="text-lg font-semibold mb-4 cursor-pointer text-white hover:text-purple-400" onClick={() => navigate("/TeacherDashboard")}>Dashboard</div>
        <div className="border-b border-gray-700 mb-6"></div>


        {/* Assignments Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">ASSIGNMENTS</div>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <CheckCircle size={18} className="mr-2"/> Completed Quizzes
            </li>
            <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <ClipboardList size={18} className="mr-2"/> Assign Quizzes
            </li>
            <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <Eye size={18} className="mr-2"/> View Responses
            </li>
          </ul>
        </div>

        <div className="border-b border-gray-700 mb-6"></div>

        {/* Subjects Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">MY SUBJECTS</div>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <FileText size={18} className="mr-2"/> PYQs
            </li>
            <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <Book size={18} className="mr-2"/> Syllabus
            </li>
            <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <BookMarked size={18} className="mr-2"/> Materials / Notes
            </li>
          </ul>
        </div>

        <div className="border-b border-gray-700 mb-6"></div>

        {/* Ranks Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">RANKS</div>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <Trophy size={18} className="mr-2"/> View Ranks
            </li>
          </ul>
        </div>

        <div className="border-b border-gray-700 mb-6"></div>

        {/* Students Section */}
        <div className="mb-6">
          <div className="text-[#8F8F8F] text-sm mb-3">STUDENT</div>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-300 hover:text-white cursor-pointer">
              <Users size={18} className="mr-2"/> My Student
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <div className="mt-auto">
          <button onClick={() => {}} className="flex items-center text-gray-300 hover:text-white hover:bg-[#3A3750] transition-all duration-200 p-2 rounded-lg">
            <LogOut size={18} className="mr-2"/> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#1E1C2E] text-white flex flex-col p-6 space-y-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 border rounded-lg shadow-md flex items-center">
            <ClipboardList className="w-12 h-12 text-blue-500" />
            <div className="ml-4">
              <p className="text-xl font-semibold">24</p>
              <p className="text-gray-600">Quizzes Created</p>
            </div>
          </div>
          <div className="p-4 border rounded-lg shadow-md flex items-center">
            <Users className="w-12 h-12 text-green-500" />
            <div className="ml-4">
              <p className="text-xl font-semibold">150</p>
              <p className="text-gray-600">Students Engaged</p>
            </div>
          </div>
          <div className="p-4 border rounded-lg shadow-md flex items-center">
            <FileText className="w-12 h-12 text-purple-500" />
            <div className="ml-4">
              <p className="text-xl font-semibold">12</p>
              <p className="text-gray-600">Courses Managed</p>
            </div>
          </div>
          <div className="p-4 border rounded-lg shadow-md flex items-center">
            <Activity className="w-12 h-12 text-red-500" />
            <div className="ml-4">
              <p className="text-xl font-semibold">85%</p>
              <p className="text-gray-600">Student Progress</p>
            </div>
          </div>
          {/* Quiz Performance Chart */}
          <div className="p-6 border rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Quizzes Created Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quizzes" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

