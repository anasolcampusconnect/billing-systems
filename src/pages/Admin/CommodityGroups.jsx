import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Filter, Edit3, Trash2, X, 
  ChevronRight, CheckCircle2, LayoutGrid, 
  List, Package, Layers, Eye, ArrowUpRight,
  ShoppingCart, Smartphone, Shirt, Nut, Sparkles, Box
} from 'lucide-react';

const CommodityGroups = () => {
  const navigate = useNavigate();

  // --- 1. STATE MANAGEMENT ---
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  // --- 2. ICON MAP FOR PROFESSIONAL LOOK ---
  // Specific icons for each category instead of generic box
  const iconMap = {
    'Grocery': <ShoppingCart size={28} />,
    'Electronics': <Smartphone size={28} />,
    'Clothing': <Shirt size={28} />,
    'Dry Fruits': <Nut size={28} />,
    'Household': <Sparkles size={28} />,
    'default': <Box size={28} />
  };

  // Categories Data with Icon Keys
  const [groups, setGroups] = useState([
    { id: 'GRP-001', name: 'Grocery', description: 'Daily essential food items and cooking needs.', productCount: 145, status: 'Active' },
    { id: 'GRP-002', name: 'Electronics', description: 'Gadgets, home appliances, and accessories.', productCount: 32, status: 'Active' },
    { id: 'GRP-003', name: 'Clothing', description: 'Men, Women, and Kids premium fashion wear.', productCount: 89, status: 'Active' },
    { id: 'GRP-004', name: 'Dry Fruits', description: 'Premium quality imported dry fruits and nuts.', productCount: 12, status: 'Inactive' },
    { id: 'GRP-005', name: 'Household', description: 'Cleaning supplies and home maintenance utility.', productCount: 56, status: 'Active' },
  ]);

  const [formData, setFormData] = useState({ name: '', description: '', status: 'Active' });

  // Navigation Logic
  const handleViewProducts = (name) => navigate('/admin/inventory', { state: { selectedGroup: name } });

  const handleSave = (e) => {
    e.preventDefault();
    if (editingItem) {
      setGroups(groups.map(g => g.id === editingItem.id ? { ...g, ...formData } : g));
    } else {
      const newGroup = { ...formData, id: `GRP-00${groups.length + 1}`, productCount: 0 };
      setGroups([newGroup, ...groups]);
    }
    setShowModal(false);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this category?")) {
      setGroups(groups.filter(g => g.id !== id));
    }
  };

  // --- 3. FILTER & SEARCH LOGIC ---
  const filteredData = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    return groups.filter(g => 
      (g.name.toLowerCase().includes(query) || g.id.toLowerCase().includes(query)) &&
      (activeFilter === 'All' || g.status === activeFilter)
    );
  }, [groups, searchTerm, activeFilter]);

  return (
    <div className="space-y-8 pb-10 font-plus-jakarta">
      
      {/* 1. TOP ANALYTICS STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#11111a] p-6 rounded-3xl border border-white/5 shadow-2xl flex justify-between items-center group">
           <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Total Architectures</p>
              <h3 className="text-3xl font-extrabold text-white tracking-tighter">{groups.length} <span className="text-xs text-indigo-500 font-bold">Groups</span></h3>
           </div>
           <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl group-hover:scale-110 transition-transform"><Layers size={22}/></div>
        </div>
        <div className="bg-[#11111a] p-6 rounded-3xl border border-white/5 shadow-2xl flex justify-between items-center group">
           <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Active Status</p>
              <h3 className="text-3xl font-extrabold text-white tracking-tighter">04 <span className="text-xs text-gray-500 font-bold">/ {groups.length}</span></h3>
           </div>
           <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl group-hover:animate-pulse transition-transform"><CheckCircle2 size={22}/></div>
        </div>
        <div className="bg-[#11111a] p-6 rounded-3xl border border-white/5 shadow-2xl flex justify-between items-center group">
           <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mb-1">Total Unit Volume</p>
              <h3 className="text-3xl font-extrabold text-white tracking-tighter">334</h3>
           </div>
           <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl group-hover:rotate-12 transition-transform"><Package size={22}/></div>
        </div>
      </div>

      {/* 2. COMMAND TOOLBAR */}
      <div className="sticky top-2 z-30 py-2">
        <div className="bg-[#14141c]/90 backdrop-blur-2xl p-4 rounded-[32px] border border-white/10 flex flex-col lg:flex-row justify-between items-center gap-4 shadow-2xl">
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/10 shadow-inner">
              <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}><LayoutGrid size={20} /></button>
              <button onClick={() => setViewMode('table')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'table' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}><List size={20} /></button>
            </div>
            <div className="relative flex-1 min-w-[320px] group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input type="text" placeholder="Search Master ID or Category..." className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-12 py-3 text-xs text-white outline-none focus:border-indigo-500/50 transition-all shadow-inner font-medium" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
              {searchTerm && <button onClick={()=>setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"><X size={16}/></button>}
            </div>
          </div>
          <button onClick={() => { setEditingItem(null); setFormData({name:'', description:'', status:'Active'}); setShowModal(true); }} className="w-full lg:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-black px-8 py-3.5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl text-[10px] tracking-widest uppercase">
            <Plus size={20} strokeWidth={3}/> New Architecture
          </button>
        </div>
      </div>

      {/* 3. BENTO GRID / TABLE AREA */}
      <AnimatePresence mode='wait'>
        {filteredData.length > 0 ? (
          viewMode === 'grid' ? (
            <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredData.map((g, idx) => (
                <motion.div key={g.id} layout className="bg-[#1a1a24] rounded-[40px] border border-white/5 p-8 shadow-2xl relative group hover:border-indigo-500/30 transition-all duration-500">
                  <div className="flex justify-between items-start mb-6">
                     {/* --- IMPROVED ICON BOX: No more placeholder look --- */}
                     <div className={`p-4 rounded-[24px] bg-gradient-to-br from-indigo-500/20 to-blue-600/5 border border-white/5 text-indigo-400 group-hover:scale-110 transition-transform duration-500 shadow-inner flex items-center justify-center`}>
                        {iconMap[g.name] || iconMap['default']}
                     </div>
                     <div className="text-right">
                        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${g.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>{g.status}</span>
                        <p className="text-[10px] text-gray-600 font-mono mt-2 font-bold uppercase tracking-tighter">{g.id}</p>
                     </div>
                  </div>

                  <div className="space-y-2 mb-8">
                     <h4 className="text-2xl font-extrabold text-white tracking-tight group-hover:text-indigo-400 transition-colors uppercase">{g.name}</h4>
                     <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 font-medium">{g.description}</p>
                  </div>

                  {/* Visual Stats Area */}
                  <div className="bg-black/30 rounded-3xl p-5 border border-white/5 space-y-4 shadow-inner">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Inventory Linked</span>
                        <span className="text-sm font-black text-white tracking-tighter">{g.productCount} <span className="text-[10px] text-gray-500 font-normal ml-0.5">SKUs</span></span>
                     </div>
                     <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((g.productCount / 200) * 100, 100)}%` }} className="h-full bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.3)]" />
                     </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                    <button onClick={() => handleViewProducts(g.name)} className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-all group/btn">
                       Audit Registry <Eye size={14} className="group-hover/btn:scale-125 transition-transform"/>
                    </button>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                       <button onClick={() => { setEditingItem(g); setFormData({...g}); setShowModal(true); }} className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all"><Edit3 size={18}/></button>
                       <button onClick={() => handleDelete(g.id)} className="p-2.5 bg-red-500/5 hover:bg-red-500/20 border border-red-500/10 rounded-xl text-red-500 transition-all"><Trash2 size={18}/></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#1a1a24] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/40 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr><th className="p-6 pl-10">Entity Name</th><th className="p-6 text-right">Items</th><th className="p-6 text-center">Lifecycle</th><th className="p-6 text-center">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredData.map(g => (
                    <tr key={g.id} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="p-5 pl-10"><div><p className="text-white font-extrabold text-sm group-hover:text-indigo-400 uppercase tracking-tight">{g.name}</p><p className="text-[10px] text-gray-600 font-mono mt-1 font-bold">{g.id}</p></div></td>
                      <td className="p-5 text-right font-black text-indigo-400 text-base tracking-tighter">{g.productCount}</td>
                      <td className="p-5 text-center"><span className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${g.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>{g.status}</span></td>
                      <td className="p-5 flex justify-center gap-3">
                         <button onClick={() => handleViewProducts(g.name)} className="p-2 text-gray-500 hover:text-indigo-400 transition-all"><Eye size={18}/></button>
                         <button onClick={() => { setEditingItem(g); setFormData({...g}); setShowModal(true); }} className="p-2 text-gray-500 hover:text-white transition-all"><Edit3 size={18}/></button>
                         <button onClick={() => handleDelete(g.id)} className="p-2 text-gray-500 hover:text-red-500 transition-all"><Trash2 size={18}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )
        ) : (
          <div className="text-center py-20 bg-[#1a1a24] rounded-[40px] border-2 border-dashed border-white/5 opacity-50"><Box size={60} className="mx-auto text-gray-700 mb-4" /><h3 className="text-xl font-bold text-gray-500 uppercase tracking-widest">No Profiles Found</h3></div>
        )}
      </AnimatePresence>

      {/* --- 4. MODAL --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowModal(false)} />
            <motion.div initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }} className="relative bg-[#1a1a24] border border-white/10 rounded-[56px] shadow-2xl w-full max-w-md p-10 z-[110] overflow-hidden">
              <div className="flex justify-between items-center mb-10"><h3 className="text-2xl font-black text-white tracking-tighter uppercase">{editingItem ? 'Edit Profile' : 'Init Category'}</h3><button onClick={() => setShowModal(false)} className="bg-white/5 hover:bg-white/10 p-4 rounded-full text-white transition-all"><X size={24} /></button></div>
              <form onSubmit={handleSave} className="space-y-6">
                <input required placeholder="Assign Category Name" className="w-full bg-black/40 border border-white/10 rounded-3xl p-5 text-white outline-none focus:border-indigo-500 font-bold uppercase" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} />
                <textarea required placeholder="Service Description..." className="w-full bg-black/40 border border-white/10 rounded-3xl p-5 text-white outline-none focus:border-indigo-500 font-medium h-28 resize-none shadow-inner" value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} />
                <select className="w-full bg-black/40 border border-white/10 rounded-3xl p-5 text-white outline-none focus:border-indigo-500 font-black appearance-none" value={formData.status} onChange={(e)=>setFormData({...formData, status: e.target.value})}><option value="Active">ACTIVE</option><option value="Inactive">INACTIVE</option></select>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-6 rounded-[32px] shadow-2xl uppercase tracking-widest text-base border border-white/10 mt-6 flex items-center justify-center gap-3 transition-all"><CheckCircle2 size={24}/> {editingItem ? 'UPDATE CONFIG' : 'INITIALIZE PROFILE'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommodityGroups;