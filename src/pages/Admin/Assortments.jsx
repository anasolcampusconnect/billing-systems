import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search, Layers, Eye, Download, Filter, Plus, Box,
  Tag, CheckCircle2, AlertCircle, Archive, MoreHorizontal, 
  Trash2, Edit, ChevronDown, X, PackageOpen
} from "lucide-react";

const Assortments = () => {
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 1. DATA REGISTRY
  const [assortments, setAssortments] = useState([
    { id: "AST-9001", name: "Summer Essentials 2026", category: "Seasonal", items: 145, value: 450000, status: "Active", lastUpdated: "2026-05-18" },
    { id: "AST-9002", name: "Tier 1 Metro Stores Bundle", category: "Store Allocation", items: 850, value: 2500000, status: "Active", lastUpdated: "2026-05-15" },
    { id: "AST-9003", name: "Clearance & Liquidation (Q1)", category: "Promotional", items: 320, value: 120000, status: "Draft", lastUpdated: "2026-05-14" },
    { id: "AST-9004", name: "Corporate Gift Hampers", category: "B2B Custom", items: 45, value: 850000, status: "Active", lastUpdated: "2026-05-12" },
    { id: "AST-9005", name: "Winter Collection 2025", category: "Seasonal", items: 210, value: 680000, status: "Archived", lastUpdated: "2026-02-28" },
    { id: "AST-9006", name: "Organic Groceries Pack", category: "Bundles", items: 18, value: 4500, status: "Active", lastUpdated: "2026-05-10" },
    { id: "AST-9007", name: "Electronics Diwali Setup", category: "Promotional", items: 55, value: 4200000, status: "Draft", lastUpdated: "2026-05-08" },
  ]);

  const [formData, setFormData] = useState({ name: "", category: "Seasonal", items: "", value: "", status: "Draft" });

  // 2. SEARCH LOGIC
  const filteredAssortments = useMemo(() => {
    const q = search.toLowerCase().trim();
    return assortments.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [search, assortments]);

  // 3. EXPORT LOGIC
  const handleExport = () => {
    alert("Exporting Assortments CSV...");
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `AST-${9000 + assortments.length + 1}`,
      name: formData.name,
      category: formData.category,
      items: Number(formData.items),
      value: Number(formData.value),
      status: formData.status,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setAssortments([newEntry, ...assortments]);
    setFormData({ name: "", category: "Seasonal", items: "", value: "", status: "Draft" });
    setShowModal(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    // ROOT: Changed from h-screen/overflow-hidden to min-h-screen for natural scrolling
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col font-sans">
      
      {/* CONTENT WRAPPER: Removed flex-1 and min-h-0 */}
      <div className="flex flex-col w-full p-6 lg:p-8 gap-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0">
          <div>
             <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
               Product Assortments
             </h1>
             <p className="text-sm text-slate-500 font-medium mt-1">Manage product groupings, store allocations, and seasonal bundles.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
             <button 
                onClick={handleExport} 
                className="h-10 px-4 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-2 shadow-sm transition-all text-sm whitespace-nowrap"
             >
                <Download size={16}/> Export List
             </button>
             <button 
                onClick={() => setShowModal(true)}
                className="h-10 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-2 shadow-sm transition-all text-sm whitespace-nowrap"
              >
               <Plus size={16} strokeWidth={3}/> Create Assortment
             </button>
          </div>
        </div>

        {/* FLUID KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full shrink-0">
          {[
            { label: "Active Assortments", val: "24", icon: Layers, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Total SKUs Grouped", val: "8,420", icon: PackageOpen, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Draft Collections", val: "5", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Est. Assortment Value", val: "₹1.4Cr", icon: Tag, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
               <div className="flex items-start justify-between">
                  <div>
                     <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{stat.label}</p>
                     <h2 className="text-2xl font-black text-slate-900 font-mono tracking-tight">{stat.val}</h2>
                  </div>
                  <div className={`p-3 ${stat.bg} ${stat.color} rounded-xl shrink-0`}><stat.icon size={20} strokeWidth={2.5}/></div>
               </div>
            </div>
          ))}
        </div>

        {/* FULL-WIDTH DATA TABLE CONTAINER: Removed flex-1, overflow-hidden, and min-h-0 */}
        <div className="flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm w-full">
          
          {/* Table Toolbar */}
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0">
            <div className="relative w-full sm:max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input 
                  type="text" placeholder="Search assortments by name, ID, or category..." 
                  className="w-full h-10 pl-9 pr-4 text-sm font-medium bg-white border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                  value={search} onChange={(e)=>setSearch(e.target.value)}
               />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
               <button className="h-10 px-4 bg-white border border-slate-200 rounded-lg flex items-center gap-2 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap">
                 Category: All <ChevronDown size={14} className="text-slate-400" />
               </button>
               <button className="h-10 px-4 bg-white border border-slate-200 rounded-lg flex items-center gap-2 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap">
                 <Filter size={16} className="text-slate-400" /> Filters
               </button>
            </div>
          </div>

          {/* Table Area: Switched to just overflow-x-auto for horizontal scrolling on small screens */}
          <div className="overflow-x-auto bg-white">
             <table className="w-full text-left text-sm border-collapse table-fixed min-w-[800px]">
                <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm outline outline-1 outline-slate-200">
                   <tr className="text-[11px] uppercase tracking-widest text-slate-500 font-bold">
                      <th className="px-6 py-4 w-[30%]">Assortment Name & ID</th>
                      <th className="px-6 py-4 w-[15%]">Category</th>
                      <th className="px-6 py-4 w-[15%] text-center">Total Items</th>
                      <th className="px-6 py-4 w-[15%]">Status</th>
                      <th className="px-6 py-4 w-[15%] text-right">Est. Value</th>
                      <th className="px-6 py-4 w-[10%] text-center">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {filteredAssortments.map((a, idx) => (
                      <motion.tr 
                        key={a.id} 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}
                        className="hover:bg-slate-50/80 transition-colors group cursor-default"
                      >
                         <td className="px-6 py-4 truncate">
                            <div className="flex items-center gap-3">
                               <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border 
                                 ${a.status === 'Active' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                                   a.status === 'Draft' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                   'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                 <Layers size={18}/>
                               </div>
                               <div className="min-w-0 flex-1">
                                  <div className="font-bold text-slate-900 truncate" title={a.name}>{a.name}</div>
                                  <div className="text-xs text-slate-500 mt-0.5 truncate">{a.id} • Updated {formatDate(a.lastUpdated)}</div>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-4 truncate">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold shadow-sm truncate max-w-full">
                               <Tag size={12}/> {a.category}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-center font-bold text-slate-700 truncate">
                            {a.items} <span className="text-xs text-slate-400 font-medium ml-1">SKUs</span>
                         </td>
                         <td className="px-6 py-4 truncate">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${
                              a.status === 'Active' ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 
                              a.status === 'Draft' ? 'text-amber-700 bg-amber-50 border border-amber-100' :
                              'text-slate-600 bg-slate-100 border border-slate-200'
                            }`}>
                              {a.status === 'Active' && <CheckCircle2 size={14}/>}
                              {a.status === 'Draft' && <AlertCircle size={14}/>}
                              {a.status === 'Archived' && <Archive size={14}/>}
                              {a.status}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-right font-mono font-black text-base text-slate-900">
   {formatCurrency(a.value)}
</td>
                         <td className="px-6 py-4 text-center relative">
                            <button
                              onClick={() => setActiveMenu(activeMenu === a.id ? null : a.id)}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-flex"
                            >
                              <MoreHorizontal size={18} />
                            </button>

                            {activeMenu === a.id && (
                              <>
                                <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)}></div>
                                <div className="absolute right-8 top-10 w-40 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 py-1 text-left">
                                  <button className="w-full px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-sm text-slate-700 font-medium">
                                    <Eye size={16} className="text-slate-400" /> View Items
                                  </button>
                                  <button className="w-full px-4 py-2 hover:bg-slate-50 flex items-center gap-3 text-sm text-slate-700 font-medium">
                                    <Edit size={16} className="text-slate-400" /> Edit Config
                                  </button>
                                  <div className="h-px bg-slate-100 my-1"></div>
                                  <button className="w-full px-4 py-2 hover:bg-rose-50 flex items-center gap-3 text-sm text-rose-600 font-bold">
                                    <Trash2 size={16} /> Delete
                                  </button>
                                </div>
                              </>
                            )}
                         </td>
                      </motion.tr>
                   ))}
                </tbody>
             </table>
             {filteredAssortments.length === 0 && (
                <div className="px-6 py-16 text-center text-slate-500">
                   <div className="flex flex-col items-center justify-center">
                      <Box size={32} className="text-slate-300 mb-3" />
                      <p className="font-bold text-slate-700 text-lg">No assortments found</p>
                      <p className="text-sm mt-1">Adjust your search or create a new collection.</p>
                   </div>
                </div>
             )}
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between shrink-0 rounded-b-2xl">
            <span className="text-sm font-medium text-slate-500">Showing {filteredAssortments.length} assortments</span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-slate-200 rounded-md text-sm font-bold text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-md text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">Next</button>
            </div>
          </div>
        </div>

      </div>

      {/* Slide-Over Modal for Creating Assortment */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="relative w-full sm:w-[480px] h-screen bg-white shadow-2xl flex flex-col animate-in slide-in-from-right border-l border-slate-200">
            
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <div>
                 <h2 className="text-xl font-black text-slate-900">Create Assortment</h2>
                 <p className="text-sm font-medium text-slate-500 mt-0.5">Bundle products for stores or events.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"><X size={20}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
               <form id="assortmentForm" onSubmit={handleSave} className="space-y-5">
                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Assortment Name <span className="text-rose-500">*</span></label>
                     <input
                        required type="text" value={formData.name} placeholder="e.g. Diwali Electronics Bundle"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-11 px-4 font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Category <span className="text-rose-500">*</span></label>
                     <select
                        value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full h-11 px-4 font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm appearance-none"
                     >
                        <option>Seasonal</option>
                        <option>Store Allocation</option>
                        <option>Promotional</option>
                        <option>B2B Custom</option>
                        <option>Bundles</option>
                     </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Est. SKU Count</label>
                        <input
                           required type="number" min="0" value={formData.items} placeholder="0"
                           onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                           className="w-full h-11 px-4 font-mono font-bold text-slate-900 bg-white border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Est. Value (₹)</label>
                        <input
                           required type="number" min="0" value={formData.value} placeholder="0.00"
                           onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                           className="w-full h-11 px-4 font-mono font-bold text-slate-900 bg-white border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Initial Status</label>
                     <select
                        value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full h-11 px-4 font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm appearance-none"
                     >
                        <option>Draft</option>
                        <option>Active</option>
                     </select>
                  </div>
               </form>
            </div>

            <div className="p-6 border-t border-slate-200 bg-slate-50 flex gap-4 shrink-0">
               <button type="button" onClick={() => setShowModal(false)} className="flex-1 h-12 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-sm">
                  Cancel
               </button>
               <button type="submit" form="assortmentForm" className="flex-1 h-12 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md transition-colors">
                  Create Collection
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assortments;