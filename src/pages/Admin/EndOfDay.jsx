import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Search, Plus, MoreVertical, X, FileText, Printer, 
  CheckCircle2, AlertTriangle, Filter, Download, 
  TrendingUp, Wallet, Banknote, Calendar, CheckCircle
} from 'lucide-react';

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

  const [formData, setFormData] = useState({ actualCash: '', notes: '' });

  // Dummy expected values
  const todayExpectedSales = 85400;
  const todayExpectedCash = 24500;

  // 2. Logic
  const filteredData = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return eodData.filter(item => 
      item.date.toLowerCase().includes(q) || item.id.toLowerCase().includes(q)
    );
  }, [eodData, searchTerm]);

  const handleSave = (e) => {
    e.preventDefault();
    const actualVal = parseFloat(formData.actualCash) || 0;
    const difference = actualVal - todayExpectedCash;
    let newStatus = 'Settled';
    if (difference < 0) newStatus = 'Shortage';
    if (difference > 0) newStatus = 'Overage';

    const newDate = new Date();
    const newEOD = {
      id: `EOD-${String(newDate.getMonth()+1).padStart(2,'0')}${String(newDate.getDate()).padStart(2,'0')}`,
      date: newDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      totalSales: todayExpectedSales,
      expectedCash: todayExpectedCash,
      actualCash: actualVal,
      diff: difference,
      status: newStatus,
      manager: 'Active Staff'
    };
    setEodData([newEOD, ...eodData]);
    setShowAddModal(false);
    setFormData({ actualCash: '', notes: '' });
  };

  return (
    <div className="space-y-6 font-plus-jakarta" onClick={() => setActiveDropdown(null)}>
      
      {/* 1. DAILY SETTLEMENT SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex items-center justify-between">
           <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Expected In-Drawer</p>
              <h3 className="text-2xl font-black text-slate-800 font-mono mt-1">₹{todayExpectedCash.toLocaleString()}</h3>
           </div>
           <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100"><Banknote size={20}/></div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex items-center justify-between">
           <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Gross Sales (Today)</p>
              <h4 className="text-2xl font-black text-slate-800 font-mono mt-1">₹{todayExpectedSales.toLocaleString()}</h4>
           </div>
           <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100"><TrendingUp size={20}/></div>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex items-center justify-between">
           <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Pending Settlements</p>
              <h4 className="text-2xl font-black text-amber-600 mt-1">01 <span className="text-xs font-bold uppercase tracking-normal">Terminal</span></h4>
           </div>
           <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100"><Moon size={20}/></div>
        </div>
      </div>

      {/* 2. COMMAND TOOLBAR */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative group min-w-[350px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
               type="text" 
               placeholder="Search by Report ID or Date..." 
               className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500/20" 
               value={searchTerm} 
               onChange={(e)=>setSearchTerm(e.target.value)} 
            />
          </div>
          <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 transition-all"><Calendar size={18}/></button>
          <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-slate-800 transition-all"><Download size={18}/></button>
        </div>
        <button onClick={() => setShowAddModal(true)} className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 transition-all text-xs tracking-widest">
          <CheckCircle2 size={18} strokeWidth={3}/> RUN TODAY'S EOD
        </button>
      </div>

      {/* 3. SETTLEMENT REGISTRY */}
      <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
         <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-[0.15em] border-b border-slate-100">
               <tr>
                  <th className="p-5 pl-10">Report Identity</th>
                  <th className="p-5 text-right">Gross Sales</th>
                  <th className="p-5 text-right">Actual Drawer</th>
                  <th className="p-5 text-right">Discrepancy</th>
                  <th className="p-5 text-center">Settlement</th>
                  <th className="p-5 pr-10"></th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {filteredData.map(item => (
                 <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-5 pl-10">
                       <div>
                          <p className="text-sm font-black text-slate-800">{item.date}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 tracking-tighter">{item.id} • Managed by {item.manager}</p>
                       </div>
                    </td>
                    <td className="p-5 text-right font-black text-slate-400 text-sm font-mono">₹{item.totalSales.toLocaleString()}</td>
                    <td className="p-5 text-right font-black text-slate-700 text-sm font-mono">₹{item.actualCash.toLocaleString()}</td>
                    <td className="p-5 text-right font-black text-sm">
                       {item.diff === 0 ? (
                          <span className="text-slate-400 font-mono">₹0</span>
                       ) : item.diff > 0 ? (
                          <span className="text-amber-500 font-mono">+₹{Math.abs(item.diff)}</span>
                       ) : (
                          <span className="text-rose-500 font-mono">-₹{Math.abs(item.diff)}</span>
                       )}
                    </td>
                    <td className="p-5 text-center">
                       <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase inline-flex items-center gap-1.5 border ${
                        item.status === 'Settled' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        item.status === 'Shortage' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                        'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {item.status === 'Settled' ? <CheckCircle size={10}/> : <AlertTriangle size={10}/>}
                        {item.status}
                      </span>
                    </td>
                    <td className="p-5 pr-10 text-right relative">
                       <button 
                         onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === item.id ? null : item.id); }}
                         className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
                       >
                          <MoreVertical size={16}/>
                       </button>

                       <AnimatePresence>
                         {activeDropdown === item.id && (
                           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute right-10 top-12 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden text-left" onClick={(e)=>e.stopPropagation()}>
                              <button className="w-full px-4 py-2.5 text-[10px] font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2"><FileText size={14}/> Full Audit</button>
                              <button className="w-full px-4 py-2.5 text-[10px] font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2"><Printer size={14}/> Z-Report</button>
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
         {filteredData.length === 0 && (
            <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">No Settlement Records Found</div>
         )}
      </div>

      {/* 4. RUN EOD MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white border border-slate-200 rounded-[40px] shadow-2xl w-full max-w-md p-10 z-[110]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">Shift Settlement</h3>
                <button onClick={() => setShowAddModal(false)} className="bg-slate-50 p-3 rounded-full text-slate-400 hover:text-slate-800"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleSave} className="space-y-6">
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-3xl flex justify-between items-center shadow-inner">
                   <div>
                      <p className="text-[10px] uppercase text-slate-400 font-black tracking-widest mb-1">System Expected</p>
                      <p className="text-2xl text-emerald-600 font-black font-mono">₹{todayExpectedCash.toLocaleString()}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] uppercase text-slate-400 font-black tracking-widest mb-1">Total Sales</p>
                      <p className="text-sm text-slate-500 font-black font-mono">₹{todayExpectedSales.toLocaleString()}</p>
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest ml-2">Actual Counted Cash (₹)</label>
                  <input 
                    type="number" required min="0" placeholder="Enter Cash in Drawer"
                    className="w-full bg-slate-50 border-2 border-emerald-100 rounded-2xl p-4 text-slate-800 outline-none focus:border-emerald-500 font-black text-xl shadow-inner" 
                    value={formData.actualCash} 
                    onChange={(e)=>setFormData({...formData, actualCash: e.target.value})} 
                  />
                  
                  {formData.actualCash && (
                     <div className="mt-3 px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-bold">
                        {parseFloat(formData.actualCash) - todayExpectedCash === 0 ? (
                           <span className="text-emerald-600 uppercase flex items-center gap-1"><CheckCircle2 size={12}/> Cash is perfectly balanced</span>
                        ) : parseFloat(formData.actualCash) - todayExpectedCash < 0 ? (
                           <span className="text-rose-600 uppercase flex items-center gap-1"><AlertTriangle size={12}/> Shortage detected: ₹{Math.abs(parseFloat(formData.actualCash) - todayExpectedCash)}</span>
                        ) : (
                           <span className="text-amber-600 uppercase flex items-center gap-1"><AlertTriangle size={12}/> Overage detected: ₹{Math.abs(parseFloat(formData.actualCash) - todayExpectedCash)}</span>
                        )}
                     </div>
                  )}
                </div>

                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-[24px] shadow-xl uppercase tracking-widest text-xs flex items-center justify-center gap-2 mt-4 transition-all">
                   <CheckCircle2 size={18}/> CONFIRM SETTLEMENT
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default EndOfDay;