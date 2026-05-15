import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Edit3, Trash2, X, ChevronRight, CheckCircle2, 
  Layers3, Package2, Eye, ArrowUpRight, TrendingUp, TrendingDown,
  Download, Activity, CircleDollarSign, Boxes, Filter, LayoutGrid, Calendar
} from 'lucide-react';

const CommodityGroups = () => {
  const navigate = useNavigate();

  // --- 1. STATE MANAGEMENT ---
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Data Logic
  const [groups, setGroups] = useState([
    { id: "CG-1001", name: "Beverages", subtitle: "Soft drinks & packaged juices", products: 148, sales: 840000, stock: 1842, growth: 18.4, status: "Excellent" },
    { id: "CG-1002", name: "Frozen Foods", subtitle: "Ready-to-cook gourmet items", products: 62, sales: 310000, stock: 284, growth: -3.8, status: "Low Stock" },
    { id: "CG-1003", name: "Household", subtitle: "Daily cleaning & home essentials", products: 124, sales: 570000, stock: 942, growth: 12.2, status: "Growing" },
    { id: "CG-1004", name: "Personal Care", subtitle: "Premium beauty & hygiene", products: 96, sales: 490000, stock: 624, growth: 9.7, status: "Stable" },
  ]);

  const [formData, setFormData] = useState({ name: '', subtitle: '', products: '', status: 'Stable' });

  // --- 2. CORE LOGIC ---
  const filteredData = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return groups.filter(g => g.name.toLowerCase().includes(q) || g.id.toLowerCase().includes(q));
  }, [groups, searchTerm]);

  const handleExport = () => {
    const headers = ["ID", "Name", "Products", "Sales", "Stock", "Growth"];
    const rows = filteredData.map(g => [g.id, g.name, g.products, g.sales, g.stock, `${g.growth}%`]);
    let csv = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", `Commodity_Audit_Registry.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingItem) {
      setGroups(groups.map(g => g.id === editingItem.id ? { ...g, ...formData, products: Number(formData.products) } : g));
    } else {
      const newGroup = { ...formData, id: `CG-${1000 + groups.length + 1}`, products: Number(formData.products), sales: 0, stock: 0, growth: 0 };
      setGroups([newGroup, ...groups]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) setGroups(groups.filter(g => g.id !== id));
  };

  return (
    <div className="space-y-8 font-plus-jakarta pb-20">
      
      {/* 1. PREMIUM HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-1">
              <span className="h-1.5 w-6 bg-indigo-600 rounded-full"></span>
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Enterprise Admin Console</span>
           </div>
           <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">Commodity Hub</h1>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative group hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" placeholder="Find Group ID or Name..." 
                className="bg-white border border-slate-200 rounded-2xl h-12 pl-12 pr-4 w-[280px] text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
                value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}
              />
           </div>
           <button onClick={handleExport} className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl text-slate-500 transition-all active:scale-95 shadow-sm"><Download size={20}/></button>
           <button onClick={() => { setEditingItem(null); setFormData({name:'', subtitle:'', products:'', status:'Stable'}); setShowModal(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-12 rounded-2xl font-black flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all active:scale-95 text-xs uppercase tracking-widest">
             <Plus size={18} strokeWidth={3}/> New Group
           </button>
        </div>
      </div>

      {/* 2. KPIs WITH SOFT DESIGN */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: "Managed Nodes", val: groups.length, icon: Layers3, color: "text-indigo-600", bg: "bg-indigo-50", trend: "+12%" },
          { label: "Global Coverage", val: "2,840", icon: Boxes, color: "text-blue-600", bg: "bg-blue-50", trend: "+8.4%" },
          { label: "Yield Performance", val: "₹28.4L", icon: CircleDollarSign, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+18%" },
          { label: "Health Index", val: "92%", icon: Activity, color: "text-orange-600", bg: "bg-orange-50", trend: "-1.2%" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-[28px] shadow-sm hover:shadow-md transition-all group">
             <div className="flex justify-between items-start mb-4">
                <div className={`w-11 h-11 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}><stat.icon size={20}/></div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{stat.trend}</span>
             </div>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
             <h3 className="text-2xl font-black text-slate-800 mt-1">{stat.val}</h3>
          </div>
        ))}
      </div>

      {/* 3. REFINED GRID CARDS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <AnimatePresence mode='popLayout'>
          {filteredData.map((g, idx) => (
            <motion.div 
              key={g.id} 
              layout
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-slate-200 rounded-[32px] p-7 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              {/* Decorative Subtle Icon */}
              <div className="absolute -top-10 -right-10 p-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity"><Package2 size={180}/></div>

              <div className="relative z-10">
                 {/* Top Row: Info & Status */}
                 <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-indigo-600 flex items-center justify-center shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                          <Package2 size={24}/>
                       </div>
                       <div>
                          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">{g.name}</h2>
                          <p className="text-[11px] text-slate-400 font-bold mt-0.5">{g.subtitle}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                        g.status === 'Excellent' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        g.status === 'Low Stock' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                       }`}>{g.status}</span>
                       <p className="text-[9px] font-mono text-slate-300 font-bold mt-1 uppercase">{g.id}</p>
                    </div>
                 </div>

                 {/* Stats Section: High Density */}
                 <div className="grid grid-cols-3 gap-6 bg-slate-50/60 p-5 rounded-2xl border border-slate-100/50">
                    <div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">Total SKU</p>
                       <p className="text-lg font-black text-slate-700">{g.products}</p>
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">Valuation</p>
                       <p className="text-lg font-black text-indigo-600 font-mono tracking-tighter">₹{(g.sales/100000).toFixed(1)}L</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">Growth</p>
                       <p className={`text-lg font-black flex items-center justify-end gap-1 ${g.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {g.growth >= 0 ? <TrendingUp size={16}/> : <TrendingDown size={16}/>}
                          {Math.abs(g.growth)}%
                       </p>
                    </div>
                 </div>

                 {/* Footer Actions */}
                 <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100">
                    <button 
                       onClick={() => navigate('/admin/inventory', { state: { selectedGroup: g.name } })}
                       className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:text-slate-800 transition-colors"
                    >
                       AUDIT REGISTRY <ArrowUpRight size={14}/>
                    </button>
                    
                    <div className="flex gap-2">
                       <button onClick={() => { setEditingItem(g); setFormData({...g}); setShowModal(true); }} className="p-2.5 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-indigo-600 hover:border-indigo-600 transition-all shadow-sm"><Edit3 size={16}/></button>
                       <button onClick={() => handleDelete(g.id)} className="p-2.5 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-rose-600 hover:border-rose-600 transition-all shadow-sm"><Trash2 size={16}/></button>
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 4. PREMIUM MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white border border-slate-200 rounded-[32px] shadow-2xl w-full max-w-md p-10 z-[110]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">{editingItem ? 'Edit Profile' : 'Init Category'}</h3>
                <button onClick={() => setShowModal(false)} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-800"><X size={20} /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity Name</label>
                   <input required placeholder="Enter Group Name" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-100 font-bold uppercase" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Stock Level</label>
                   <input required type="number" placeholder="0" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-100 font-black" value={formData.products} onChange={(e)=>setFormData({...formData, products: e.target.value})} />
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100 uppercase tracking-widest text-xs flex items-center justify-center gap-2 mt-4 transition-all">
                   <CheckCircle2 size={18}/> DEPLOY TO CATALOG
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CommodityGroups;