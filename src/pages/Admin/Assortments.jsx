import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit3, Trash2, X, ChevronRight, 
  Package, CheckCircle2, TrendingUp, Shapes, 
  ArrowUpRight, Copy, Boxes
} from 'lucide-react';

const Assortments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [assortments, setAssortments] = useState([
    { id: 'BNDL-771', name: 'Premium Diwali Hamper', group: 'Gifting', status: 'Active', price: 3500, margin: 18, items: ['Kaju Katli', 'Scented Candles', 'Ferrero Rocher', 'Diya Set'] },
    { id: 'BNDL-882', name: 'Family Essentials Kit', group: 'Grocery', status: 'Active', price: 6200, margin: 12, items: ['Basmati Rice', 'Refined Oil', 'Sugar', 'Salt', 'Dals'] },
    { id: 'BNDL-443', name: 'Student Tech Bundle', group: 'Electronics', status: 'Draft', price: 12500, margin: 15, items: ['Backpack', 'Mouse', 'Keyboard', 'USB Cable'] },
    { id: 'BNDL-221', name: 'Gourmet Cheese Platter', group: 'Food', status: 'Active', price: 1800, margin: 22, items: ['Cheddar', 'Brie', 'Crackers', 'Olives'] },
  ]);

  const filteredData = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return assortments.filter(a => 
      (a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q)) &&
      (activeFilter === 'All' || a.group === activeFilter)
    );
  }, [assortments, searchTerm, activeFilter]);

  const categories = ['All', 'Gifting', 'Grocery', 'Electronics', 'Food'];

  return (
    <div className="space-y-6 pb-20 font-plus-jakarta">
      
      {/* 1. SLIM ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#11111a] p-6 rounded-3xl border border-white/5 shadow-xl flex justify-between items-center group">
           <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Architecture Count</p>
              <h3 className="text-3xl font-extrabold text-white tracking-tighter">{assortments.length} <span className="text-xs text-gray-500 font-bold">Active</span></h3>
           </div>
           <div className="p-3 bg-teal-500/10 text-teal-500 rounded-2xl group-hover:scale-110 transition-transform"><Shapes size={20}/></div>
        </div>
        <div className="bg-[#11111a] p-6 rounded-3xl border border-white/5 shadow-xl flex justify-between items-center group">
           <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Net Margin Avg</p>
              <h3 className="text-3xl font-extrabold text-white tracking-tighter">16.5%</h3>
           </div>
           <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl group-hover:scale-110 transition-transform"><TrendingUp size={20}/></div>
        </div>
        <div className="bg-[#11111a] p-6 rounded-3xl border border-white/5 shadow-xl flex justify-between items-center group">
           <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Total Assets</p>
              <h3 className="text-3xl font-extrabold text-white tracking-tighter">142 <span className="text-xs text-gray-500 font-bold">Units</span></h3>
           </div>
           <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl group-hover:scale-110 transition-transform"><Boxes size={20}/></div>
        </div>
      </div>

      {/* 2. REFINED TOOLBAR (STICKY FIX) */}
      <div className="sticky top-[0px] z-30 py-2 bg-[#0d0d0d]">
        <div className="bg-[#14141c]/95 backdrop-blur-2xl p-4 rounded-[28px] border border-white/10 flex flex-col lg:flex-row justify-between items-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 min-w-[320px] group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-teal-400 transition-colors" size={18} />
              <input type="text" placeholder="Search Master ID or Profile Name..." className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-xs text-white outline-none focus:border-teal-500/50" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
            </div>
            <div className="flex bg-black/50 p-1 rounded-xl border border-white/5">
              {categories.slice(0,4).map(c => (
                <button key={c} onClick={()=>setActiveFilter(c)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeFilter === c ? 'bg-teal-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}>{c}</button>
              ))}
            </div>
          </div>
          <button onClick={() => { setEditingItem(null); setShowModal(true); }} className="bg-white hover:bg-teal-400 text-black font-black px-6 py-3 rounded-2xl flex items-center gap-2 transition-all active:scale-95 shadow-xl text-xs tracking-widest">
            <Plus size={18} strokeWidth={3}/> NEW ARCHITECTURE
          </button>
        </div>
      </div>

      {/* 3. CARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-8">
        {filteredData.map((a, idx) => (
          <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="group relative">
            <div className="absolute -top-3 left-10 w-28 h-8 bg-[#252533] rounded-t-2xl border-t border-x border-white/10 z-0"></div>
            <div className="bg-[#1a1a24] rounded-[40px] border border-white/10 p-8 shadow-2xl relative z-10 hover:border-teal-500/30 transition-all duration-500 hover:shadow-teal-500/5">
              <div className="flex justify-between items-start mb-8">
                 <div className="p-3.5 bg-teal-500/10 rounded-2xl text-teal-400 border border-teal-500/20 group-hover:scale-110 transition-transform"><Shapes size={24} /></div>
                 <div className="text-right">
                    <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${a.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-800 text-gray-500'}`}>{a.status}</span>
                    <p className="text-[10px] text-gray-600 font-mono mt-2 uppercase tracking-tighter">{a.id}</p>
                 </div>
              </div>

              <h4 className="text-xl font-extrabold text-white tracking-tight mb-1 group-hover:text-teal-400 transition-colors">{a.name}</h4>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-8">{a.group} Collection</p>

              <div className="space-y-4 mb-10">
                 <div className="flex justify-between items-center text-[10px] font-black text-gray-600 uppercase tracking-widest"><span>Component Stack</span><span>{a.items.length} Elements</span></div>
                 <div className="flex flex-wrap gap-2">
                    {a.items.map((item, i) => (
                      <span key={i} className="px-3 py-1.5 bg-black/40 rounded-xl text-[9px] text-gray-400 font-bold border border-white/5 hover:border-teal-500/30 transition-all cursor-default">{item}</span>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
                 <div><p className="text-[9px] font-black text-gray-600 uppercase mb-1">Valuation</p><p className="text-2xl font-black text-white font-mono tracking-tighter">₹{a.price.toLocaleString()}</p></div>
                 <div className="text-right"><p className="text-[9px] font-black text-gray-600 uppercase mb-1">Margin</p><p className="text-2xl font-black text-teal-400">+{a.margin}%</p></div>
              </div>

              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 flex gap-2">
                 <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 border border-white/10"><Copy size={16}/></button>
                 <button onClick={() => { setEditingItem(a); setShowModal(true); }} className="p-2.5 bg-white/5 hover:bg-teal-600 rounded-xl text-gray-400 hover:text-white border border-white/10"><Edit3 size={16}/></button>
                 <button className="p-2.5 bg-red-500/10 hover:bg-red-600 rounded-xl text-red-500 hover:text-white border border-red-500/10"><Trash2 size={16}/></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowModal(false)} />
            <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }} className="relative bg-[#1a1a24] border border-white/10 rounded-[48px] shadow-2xl w-full max-w-md p-10 z-[110] overflow-hidden font-plus-jakarta">
              <div className="flex justify-between items-center mb-10"><h3 className="text-2xl font-extrabold text-white tracking-tighter uppercase">{editingItem ? 'Edit Profile' : 'Init Bundle'}</h3><button onClick={() => setShowModal(false)} className="bg-white/5 hover:bg-white/10 p-3 rounded-full text-white transition-all"><X size={20} /></button></div>
              <form className="space-y-6">
                <input required placeholder="Assign Bundle Name" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-teal-500 font-bold" />
                <div className="grid grid-cols-2 gap-4">
                   <input type="number" required placeholder="Valuation (₹)" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-teal-500 font-black" />
                   <input type="number" required placeholder="Margin (%)" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-teal-500 font-black" />
                </div>
                <button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white font-black py-5 rounded-[24px] shadow-2xl shadow-teal-600/30 uppercase tracking-widest text-base border border-white/10 mt-4 flex items-center justify-center gap-2 transition-all"><CheckCircle2 size={20}/> {editingItem ? 'UPDATE PROFILE' : 'DEPLOY BUNDLE'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Assortments;