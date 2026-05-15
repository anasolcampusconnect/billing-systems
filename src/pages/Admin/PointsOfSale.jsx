import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonitorSmartphone, Search, Plus, Wifi, WifiOff, Power, RefreshCw, MoreVertical, Activity } from 'lucide-react';

const PointsOfSale = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Static Data for POS Terminals
  const [terminalsData] = useState([
    { id: 'POS-01', name: 'Main Front Register', status: 'Online', cashier: 'Ramesh Kumar', todaySales: '₹45,200', connection: 'Ethernet', uptime: '14h 20m' },
    { id: 'POS-02', name: 'Apparel Section', status: 'Online', cashier: 'Priya Sharma', todaySales: '₹12,400', connection: 'Wi-Fi (Strong)', uptime: '8h 15m' },
    { id: 'POS-03', name: 'Self-Checkout Kiosk 1', status: 'Maintenance', cashier: 'Automated', todaySales: '₹8,500', connection: 'Wi-Fi (Weak)', uptime: '2h 10m' },
    { id: 'POS-04', name: 'Backroom Returns', status: 'Offline', cashier: 'None', todaySales: '₹0', connection: 'Disconnected', uptime: '0h 0m' },
  ]);

  const filteredData = terminalsData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants for grid items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6 relative" onClick={() => activeDropdown && setActiveDropdown(null)}>
      
      {/* Top Header & Actions */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-600/20 p-3 rounded-lg border border-cyan-500/30">
            <MonitorSmartphone className="text-cyan-500" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">POS Terminals</h2>
            <p className="text-sm text-gray-500">Live monitoring of all billing registers</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Find terminal..."
              className="w-full bg-[#121212] border border-gray-700 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-cyan-500 text-white text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm whitespace-nowrap shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Plus size={18} /> Add Terminal
          </button>
        </div>
      </motion.div>

      {/* Unique UI: Terminals Grid instead of Table */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredData.map((terminal) => (
          <motion.div key={terminal.id} variants={itemVariants} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 hover:border-cyan-500/50 transition-colors relative group shadow-lg">
            
            {/* Action Menu (3 Dots) */}
            <div className="absolute top-4 right-4">
               <button 
                  onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === terminal.id ? null : terminal.id); }} 
                  className="text-gray-500 hover:text-cyan-400 transition-colors p-1"
               >
                  <MoreVertical size={18} />
               </button>
               
               {/* Dropdown */}
               <AnimatePresence>
                  {activeDropdown === terminal.id && (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute right-0 top-6 w-40 bg-[#121212] border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden"
                     >
                        <button className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-gray-800 flex items-center gap-2"><RefreshCw size={14}/> Force Sync</button>
                        <button className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-gray-800 flex items-center gap-2"><Power size={14}/> Remote Restart</button>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>

            {/* Terminal Header */}
            <div className="flex items-center gap-4 mb-5">
              <div className={`p-3 rounded-full flex items-center justify-center ${
                 terminal.status === 'Online' ? 'bg-green-500/10 text-green-500' : 
                 terminal.status === 'Offline' ? 'bg-red-500/10 text-red-500' : 
                 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {terminal.status === 'Online' ? <MonitorSmartphone size={24} /> : <Power size={24} />}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">{terminal.name}</h3>
                <p className="text-xs font-mono text-cyan-500">{terminal.id}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-5">
               <div className="bg-[#121212] p-3 rounded-lg border border-gray-800/50">
                  <p className="text-[10px] uppercase text-gray-500 font-bold mb-1 tracking-wider">Active Cashier</p>
                  <p className="text-sm text-gray-200 font-medium truncate">{terminal.cashier}</p>
               </div>
               <div className="bg-[#121212] p-3 rounded-lg border border-gray-800/50">
                  <p className="text-[10px] uppercase text-gray-500 font-bold mb-1 tracking-wider">Today's Sales</p>
                  <p className="text-sm text-green-400 font-bold font-mono">{terminal.todaySales}</p>
               </div>
            </div>

            {/* Status Footer */}
            <div className="flex items-center justify-between border-t border-gray-800 pt-4">
               <div className="flex items-center gap-2">
                  {terminal.status === 'Online' ? (
                     <>
                        <span className="relative flex h-2.5 w-2.5">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-bold text-green-500 uppercase tracking-wider">Online</span>
                     </>
                  ) : terminal.status === 'Maintenance' ? (
                     <>
                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                        <span className="text-xs font-bold text-yellow-500 uppercase tracking-wider">Maint.</span>
                     </>
                  ) : (
                     <>
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                        <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Offline</span>
                     </>
                  )}
               </div>

               <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                     {terminal.status === 'Offline' ? <WifiOff size={12}/> : <Wifi size={12}/>}
                     {terminal.connection.split(' ')[0]}
                  </span>
                  <span className="flex items-center gap-1" title="Uptime">
                     <Activity size={12}/>
                     {terminal.uptime}
                  </span>
               </div>
            </div>

          </motion.div>
        ))}

        {filteredData.length === 0 && (
          <div className="col-span-full p-10 text-center text-gray-500 bg-[#1a1a1a] rounded-xl border border-dashed border-gray-700">
            No terminals matched your search.
          </div>
        )}
      </motion.div>

    </div>
  );
};

export default PointsOfSale;