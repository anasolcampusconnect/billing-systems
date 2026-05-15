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

  const navClass = ({ isActive }) => 
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`;

  const subNavClass = ({ isActive }) => 
    `block pl-12 py-2.5 text-xs font-medium transition-colors ${isActive ? 'text-blue-400 bg-blue-500/10 border-l-2 border-blue-500' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'}`;

  return (
    <aside className="w-72 bg-[#121212] border-r border-blue-500/20 flex flex-col shadow-2xl z-30 h-screen sticky top-0">
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl"><Store className="text-white" size={24} /></div>
        <h1 className="text-white text-xl font-black tracking-tight">Retail<span className="text-blue-500">Master</span></h1>
      </div>

      <div className="px-6 py-4 border-b border-gray-800 space-y-4">
        <NavLink to="/admin/notifications" className={({isActive}) => `flex items-center gap-3 text-sm font-medium transition-colors ${isActive ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}>
          <Bell size={18} /> Notifications
        </NavLink>
        <div className="flex items-center gap-3 text-blue-500 font-bold text-sm">
          <Store size={18} /> Store 1
        </div>
      </div>

      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        <NavLink to="/admin" end className={navClass}><LayoutDashboard size={20} /> Dashboard</NavLink>
        <NavLink to="/admin/inventory" className={navClass}><Package size={20} /> Inventory</NavLink>
        <NavLink to="/admin/hospitality" className={navClass}><Coffee size={20} /> Hospitality</NavLink>
        <NavLink to="/admin/ticketing" className={navClass}><Ticket size={20} /> Ticketing</NavLink>

        <div>
          <button onClick={() => setIsSalesOpen(!isSalesOpen)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${isSalesOpen ? 'text-gray-200 bg-gray-800/30' : 'text-gray-400 hover:bg-gray-800'}`}>
            <div className="flex items-center gap-3"><Receipt size={20} /> Sales</div>
            {isSalesOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {isSalesOpen && (
            <div className="mt-1 space-y-1">
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

      <div className="p-4 border-t border-gray-800">
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white rounded-xl transition-all font-bold text-sm">
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;