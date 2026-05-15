import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Users, Settings, LogOut, Store, 
  Bell, Coffee, Ticket, Receipt, ChevronDown, ChevronRight, 
  Gift, FileText, PieChart 
} from 'lucide-react';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isSalesOpen, setIsSalesOpen] = useState(false);

  const handleLogout = () => navigate('/');

  // Colorful Navigation Class Logic
  const navClass = ({ isActive }) => 
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
      isActive 
      ? 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-200' 
      : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'
    }`;

  // Sub-navigation Class Logic
  const subNavClass = ({ isActive }) => 
    `block pl-12 py-2.5 text-xs font-bold transition-all duration-300 rounded-r-full ${
      isActive 
      ? 'text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600' 
      : 'text-gray-400 hover:text-indigo-500 hover:bg-gray-50'
    }`;

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-xl z-30 h-screen sticky top-0">
      {/* Branding Area */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-500 p-2 rounded-xl shadow-md">
          <Store className="text-white" size={24} />
        </div>
        <h1 className="text-gray-800 text-xl font-black tracking-tight">
          Retail<span className="text-indigo-600">Master</span>
        </h1>
      </div>

      {/* Top Quick Links */}
      <div className="px-6 py-4 border-b border-gray-50 space-y-4">
        <NavLink 
          to="/admin/notifications" 
          className={({isActive}) => `flex items-center gap-3 text-sm font-bold transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-indigo-500'}`}
        >
          <Bell size={18} /> Notifications
        </NavLink>
        <div className="flex items-center gap-3 text-blue-500 font-black text-sm cursor-default">
          <Store size={18} /> Store 1
        </div>
      </div>

      {/* Scrollable Menu Area */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        <NavLink to="/admin" end className={navClass}><LayoutDashboard size={20} /> Dashboard</NavLink>
        <NavLink to="/admin/inventory" className={navClass}><Package size={20} /> Inventory</NavLink>
        <NavLink to="/admin/hospitality" className={navClass}><Coffee size={20} /> Hospitality</NavLink>
        <NavLink to="/admin/ticketing" className={navClass}><Ticket size={20} /> Ticketing</NavLink>

        {/* Sales Collapsible Menu */}
        <div>
          <button 
            onClick={() => setIsSalesOpen(!isSalesOpen)} 
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${isSalesOpen ? 'bg-indigo-50/50 text-indigo-600' : 'text-gray-500 hover:bg-indigo-50'}`}
          >
            <div className="flex items-center gap-3"><Receipt size={20} /> Sales</div>
            {isSalesOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          
          {isSalesOpen && (
            <div className="mt-1 space-y-1 border-l border-gray-100 ml-6">
               <NavLink to="/admin/sales/assortments" className={subNavClass}>Assortments</NavLink>
               <NavLink to="/admin/sales/balance" className={subNavClass}>Balance Statements</NavLink>
               <NavLink to="/admin/sales/commodity" className={subNavClass}>Commodity Groups</NavLink>
               <NavLink to="/admin/sales/customers" className={subNavClass}>Customers</NavLink>
               <NavLink to="/admin/sales/eod" className={subNavClass}>End of Day Statements</NavLink>
               <NavLink to="/admin/sales/pos" className={subNavClass}>Points of Sale</NavLink>
               <NavLink to="/admin/sales/products" className={subNavClass}>Products</NavLink>
               <NavLink to="/admin/sales/receipts" className={subNavClass}>Receipts</NavLink>
            </div>
          )}
        </div>

        <NavLink to="/admin/promotions" className={navClass}><Gift size={20} /> Promotions</NavLink>
        <NavLink to="/admin/invoicing" className={navClass}><FileText size={20} /> Invoicing</NavLink>
        <NavLink to="/admin/staff" className={navClass}><Users size={20} /> Employees</NavLink>
        <NavLink to="/admin/evaluations" className={navClass}><PieChart size={20} /> Evaluations</NavLink>
        <NavLink to="/admin/settings" className={navClass}><Settings size={20} /> Settings</NavLink>
      </div>

      {/* Sign Out Section */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 font-bold text-sm shadow-sm"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;