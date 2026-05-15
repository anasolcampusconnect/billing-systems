import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Search, Plus, MoreVertical, X, FileText, Printer, CheckCircle, AlertTriangle } from 'lucide-react';

const EndOfDay = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 1. Static Data for Past EOD Statements
  const [eodData, setEodData] = useState([
    { id: 'EOD-0514', date: '14 May 2026', totalSales: 124500, expectedCash: 45000, actualCash: 45000, diff: 0, status: 'Settled', manager: 'Admin' },
    { id: 'EOD-0513', date: '13 May 2026', totalSales: 98200, expectedCash: 32500, actualCash: 32350, diff: -150, status: 'Shortage', manager: 'Admin' },
    { id: 'EOD-0512', date: '12 May 2026', totalSales: 105600, expectedCash: 41200, actualCash: 41250, diff: 50, status: 'Overage', manager: 'Admin' },
    { id: 'EOD-0511', date: '11 May 2026', totalSales: 112000, expectedCash: 38000, actualCash: 38000, diff: 0, status: 'Settled', manager: 'Admin' },
  ]);

  // 2. Form State for "Run EOD" Modal
  const [formData, setFormData] = useState({
    actualCash: '',
    notes: ''
  });

  // System generated (Dummy) expected values for today
  const todayExpectedSales = 85400;
  const todayExpectedCash = 24500;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle EOD Submit
  const handleAddSubmit = (e) => {
    e.preventDefault();
    
    const actualCashVal = parseFloat(formData.actualCash) || 0;
    const difference = actualCashVal - todayExpectedCash;
    
    let newStatus = 'Settled';
    if (difference < 0) newStatus = 'Shortage';
    if (difference > 0) newStatus = 'Overage';

    const newDate = new Date();
    const newId = `EOD-${String(newDate.getMonth() + 1).padStart(2, '0')}${String(newDate.getDate()).padStart(2, '0')}`;

    const newEOD = {
      id: newId,
      date: newDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      totalSales: todayExpectedSales,
      expectedCash: todayExpectedCash,
      actualCash: actualCashVal,
      diff: difference,
      status: newStatus,
      manager: 'Active Staff' // From current logged in user
    };

    setEodData([newEOD, ...eodData]);
    setShowAddModal(false);
    setFormData({ actualCash: '', notes: '' });
  };

  const filteredData = eodData.filter(item => 
    item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative" onClick={() => activeDropdown && setActiveDropdown(null)}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        
        {/* Top Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600/20 p-3 rounded-lg border border-emerald-500/30">
              <Moon className="text-emerald-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">End of Day (EOD)</h2>
              <p className="text-sm text-gray-500">Daily register closures and cash settlements</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search by date or ID..."
                className="w-full bg-[#121212] border border-gray-700 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-emerald-500 text-white text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm whitespace-nowrap shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <CheckCircle size={18} /> Run Today's EOD
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-visible shadow-lg">
          <div className="overflow-x-auto overflow-y-visible min-h-[300px]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#121212] border-b border-gray-800 text-emerald-500/70 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="p-4">Report ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Gross Sales</th>
                  <th className="p-4">Expected Cash</th>
                  <th className="p-4">Actual Drawer</th>
                  <th className="p-4">Discrepancy</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-4 font-mono text-gray-400">{item.id}</td>
                    <td className="p-4 text-gray-200 font-bold">{item.date}</td>
                    <td className="p-4 font-mono text-gray-300">₹{item.totalSales.toLocaleString('en-IN')}</td>
                    <td className="p-4 font-mono text-gray-400">₹{item.expectedCash.toLocaleString('en-IN')}</td>
                    <td className="p-4 font-mono text-white font-bold">₹{item.actualCash.toLocaleString('en-IN')}</td>
                    <td className="p-4 font-mono font-bold">
                      {item.diff === 0 ? (
                        <span className="text-gray-500">₹0</span>
                      ) : item.diff > 0 ? (
                        <span className="text-yellow-400">+₹{Math.abs(item.diff)}</span>
                      ) : (
                        <span className="text-red-400">-₹{Math.abs(item.diff)}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider w-fit border ${
                        item.status === 'Settled' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        item.status === 'Shortage' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                      }`}>
                        {item.status === 'Settled' ? <CheckCircle size={12}/> : <AlertTriangle size={12}/>}
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === item.id ? null : item.id); }} 
                        className="text-gray-500 hover:text-emerald-500 transition-colors p-1"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {activeDropdown === item.id && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-10 top-4 w-40 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-2 transition-colors">
                              <FileText size={14} /> View Full Report
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-2 transition-colors">
                              <Printer size={14} /> Print Z-Report
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-gray-500">
                      No EOD statements found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Run EOD Settle Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} 
              className="relative bg-[#1a1a1a] border border-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden z-[110]"
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Moon size={20} className="text-emerald-500"/> Settle Register (EOD)
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="p-5 space-y-5">
                {/* System Expected Values */}
                <div className="bg-[#121212] p-4 rounded-lg border border-gray-800 flex justify-between items-center">
                   <div>
                      <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">System Cash Expected</p>
                      <p className="text-xl text-emerald-500 font-mono font-bold">₹{todayExpectedCash.toLocaleString('en-IN')}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">Total Gross Sales</p>
                      <p className="text-sm text-gray-300 font-mono">₹{todayExpectedSales.toLocaleString('en-IN')}</p>
                   </div>
                </div>

                {/* Actual Input */}
                <div>
                  <label className="block text-xs font-bold text-emerald-500 uppercase tracking-wide mb-1.5">Actual Cash in Drawer (₹)</label>
                  <input 
                    type="number" 
                    name="actualCash" 
                    required 
                    min="0" 
                    value={formData.actualCash} 
                    onChange={handleInputChange} 
                    className="w-full bg-[#121212] border-2 border-emerald-500/50 rounded-lg p-3 text-white focus:border-emerald-500 outline-none font-mono text-lg" 
                    placeholder="Enter counted cash amount..." 
                  />
                  
                  {/* Live Difference Calculator */}
                  {formData.actualCash && (
                     <div className="mt-2 text-xs font-bold">
                        {parseFloat(formData.actualCash) - todayExpectedCash === 0 ? (
                           <span className="text-emerald-400">Perfect Match! Cash is balanced.</span>
                        ) : parseFloat(formData.actualCash) - todayExpectedCash < 0 ? (
                           <span className="text-red-400">Shortage of ₹{Math.abs(parseFloat(formData.actualCash) - todayExpectedCash)} detected.</span>
                        ) : (
                           <span className="text-yellow-400">Overage of ₹{Math.abs(parseFloat(formData.actualCash) - todayExpectedCash)} detected.</span>
                        )}
                     </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Closing Notes / Remarks</label>
                  <textarea 
                    name="notes" 
                    value={formData.notes} 
                    onChange={handleInputChange} 
                    className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-emerald-500 outline-none min-h-[60px] resize-none" 
                    placeholder="Optional details..." 
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]">Confirm Settlement</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EndOfDay;