import React from 'react';
import { useLocation } from 'react-router-dom';
import { HelpCircle, Bell } from 'lucide-react';

const AdminHeader = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/admin') return 'Dashboard Overview';
    if (path === '/admin/notifications') return 'System Notifications';
    if (path === '/admin/inventory') return 'Inventory Management';
    if (path === '/admin/hospitality') return 'Hospitality Module';
    if (path === '/admin/ticketing') return 'Ticketing System';
    if (path === '/admin/staff') return 'Employee & Performance';
    if (path === '/admin/promotions') return 'Marketing & Promotions';
    if (path === '/admin/invoicing') return 'Invoice Management';
    if (path === '/admin/evaluations') return 'Performance Evaluations';
    if (path === '/admin/settings') return 'Global Settings';

    // Sales Sub-routes
    if (path.includes('/admin/sales/assortments')) return 'Sales: Assortments';
    if (path.includes('/admin/sales/balance')) return 'Sales: Balance Statements';
    if (path.includes('/admin/sales/commodity')) return 'Sales: Commodity Groups';
    if (path.includes('/admin/sales/customers')) return 'Sales: Customer Database';
    if (path.includes('/admin/sales/eod')) return 'Sales: End of Day';
    if (path.includes('/admin/sales/pos')) return 'Sales: Points of Sale';
    if (path.includes('/admin/sales/products')) return 'Sales: Product Analytics';
    if (path.includes('/admin/sales/receipts')) return 'Sales: Transaction Receipts';

    return 'Management Portal';
  };

  return (
    <header className="px-10 py-6 border-b border-gray-800/50 flex justify-between items-center sticky top-0 bg-black/40 backdrop-blur-xl z-20">
      <div className="flex flex-col">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          {getPageTitle()}
        </h2>
        <div className="flex items-center gap-2 mt-1">
           <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
           <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Admin Level Access</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
         <div className="hidden md:flex items-center gap-3 bg-[#1a1a1a] border border-gray-800 px-4 py-2 rounded-xl text-sm">
            <div className="flex flex-col items-end">
               <span className="text-[10px] text-gray-500 uppercase font-bold">Terminal Status</span>
               <span className="text-green-500 font-bold text-xs">Live & Encrypted</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
            </div>
         </div>

         <div className="flex items-center gap-3 border-l border-gray-800 pl-6">
            <button className="p-2.5 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 transition-all border border-gray-700/50">
               <Bell size={18} />
            </button>
            <button className="p-2.5 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 transition-all border border-gray-700/50">
               <HelpCircle size={18} />
            </button>
         </div>
      </div>
    </header>
  );
};

export default AdminHeader;