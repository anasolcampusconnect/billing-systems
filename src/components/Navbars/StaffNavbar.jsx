import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Receipt, User, ShoppingCart } from 'lucide-react';

const StaffNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="bg-[#121212] border-b border-blue-500/30 px-6 py-4 flex justify-between items-center shadow-md">
      {/* Branding Area */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <ShoppingCart className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-white text-xl font-bold tracking-tight">
            Retail<span className="text-blue-500">Master</span>
          </h1>
          <p className="text-gray-500 text-[10px] tracking-[0.2em] uppercase mt-0.5">Staff Portal</p>
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <div className="flex bg-[#1a1a1a] rounded-lg p-1 border border-gray-800">
          <button className="flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-md font-semibold text-sm transition-all border border-blue-500/20">
            <Receipt size={16} />
            Quick Billing
          </button>
        </div>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-4 border-l border-gray-700 pl-6">
          <div className="flex items-center gap-2 text-gray-300">
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <User size={18} className="text-blue-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">Active Staff</span>
              <span className="text-[10px] text-gray-500">Terminal 01</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:bg-red-400/10 px-3 py-1.5 rounded-md transition-colors text-xs font-bold border border-red-400/20"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StaffNavbar;