import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HelpCircle, Bell, ShieldCheck } from 'lucide-react';

const AdminHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Dynamic Title Logic - Keeping all your logic intact
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
    <header className="px-10 py-5 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-20 shadow-sm">
      <div className="flex flex-col">
        {/* Colorful Gradient Title */}
        <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent tracking-tight">
          {getPageTitle()}
        </h2>
        <div className="flex items-center gap-2 mt-1">
           <div className="flex gap-1">
             <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
             <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
           </div>
           <span className="text-[10px] text-gray-400 uppercase tracking-widest font-extrabold">Enterprise Admin Console</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
         {/* Colorful Status Box */}
         <div className="hidden md:flex items-center gap-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 px-5 py-2.5 rounded-2xl shadow-inner">
            <div className="flex flex-col items-end">
               <span className="text-[10px] text-indigo-400 uppercase font-black tracking-tighter">Terminal Security</span>
               <div className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-green-500" />
                  <span className="text-gray-700 font-bold text-xs">Live & Encrypted</span>
               </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-blue-100">
               <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse ring-4 ring-green-500/20"></div>
            </div>
         </div>

         {/* Icons with Hover Effects */}
         <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
            <button 
              onClick={() => navigate('/admin/notifications')}
              className={`p-3 rounded-xl transition-all duration-300 border ${location.pathname === '/admin/notifications' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' : 'bg-gray-50 text-gray-500 border-gray-100 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'}`}
            >
               <Bell size={20} />
            </button>
            <button className="p-3 rounded-xl bg-gray-50 text-gray-500 border border-gray-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300">
               <HelpCircle size={20} />
            </button>
         </div>
      </div>
    </header>
  );
};

export default AdminHeader;