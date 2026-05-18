import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // <--- Dheenini add cheyandi
import {
  Search, Plus, MoreVertical, Package2, Store, CalendarRange,
  CheckCircle2, XCircle, Eye, Edit, Trash2, Layers3,
  Filter, Download, Sparkles, X, ChevronDown
} from "lucide-react";
const Assortments = () => {
  // --- 1. STATE MANAGEMENT ---
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    assortmentName: "", store: "", category: "", products: "",
    startDate: "", endDate: "", status: "Active",
  });

  const [assortments, setAssortments] = useState([
    { id: "AST-1001", assortmentName: "Summer Grocery Combo", store: "Hyderabad Central", category: "Grocery", products: 120, startDate: "2026-05-01", endDate: "2026-05-31", status: "Active" },
    { id: "AST-1002", assortmentName: "Festival Electronics", store: "Bangalore Mall", category: "Electronics", products: 65, startDate: "2026-05-10", endDate: "2026-06-10", status: "Scheduled" },
    { id: "AST-1003", assortmentName: "Dairy Essentials", store: "Store 12", category: "Dairy", products: 40, startDate: "2026-04-05", endDate: "2026-04-30", status: "Expired" },
  ]);

  // --- 2. CORE LOGIC (SEARCH & FILTER) ---
  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();
    return assortments.filter((item) => {
      const matchesSearch = 
        item.assortmentName.toLowerCase().includes(q) ||
        item.store.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q);
      
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [search, assortments, statusFilter]);

  // --- 3. EXPORT FUNCTIONALITY ---
  const handleExport = () => {
    if (filteredData.length === 0) return alert("No data to export!");

    const headers = ["ID", "Assortment Name", "Store", "Category", "Products", "Start Date", "End Date", "Status"];
    const rows = filteredData.map(a => [a.id, a.assortmentName, a.store, a.category, a.products, a.startDate, a.endDate, a.status]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Assortments_Report_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- 4. CRUD HANDLERS ---
  const handleSave = (e) => {
    e.preventDefault();
    if (editingItem) {
      setAssortments(assortments.map(a => a.id === editingItem.id ? { ...formData, id: a.id, products: Number(formData.products) } : a));
    } else {
      const newData = {
        ...formData,
        id: `AST-${1000 + assortments.length + 1}`,
        products: Number(formData.products),
      };
      setAssortments([newData, ...assortments]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this assortment?")) {
      setAssortments(assortments.filter(a => a.id !== id));
      setActiveMenu(null);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ ...item });
    } else {
      setEditingItem(null);
      setFormData({ assortmentName: "", store: "", category: "", products: "", startDate: "", endDate: "", status: "Active" });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen space-y-8 font-plus-jakarta" onClick={() => setActiveMenu(null)}>
      
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Assortments</h1>
          <p className="text-slate-500 font-semibold mt-2">Manage seasonal product bundles and category allocations</p>
        </div>
        <button onClick={() => openModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-indigo-100 transition-all active:scale-95 text-sm uppercase tracking-widest">
          <Plus size={20} strokeWidth={3} /> CREATE ASSORTMENT
        </button>
      </div>

      {/* ANALYTICS STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: "Total Managed", val: "248", icon: Layers3, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Active Nodes", val: "82", icon: Sparkles, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Assigned Stores", val: "35", icon: Store, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Coverage", val: "14.8K", icon: Package2, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 uppercase text-[10px] font-black tracking-[0.2em]">{stat.label}</p>
                <h2 className={`text-3xl font-black mt-2 ${stat.color}`}>{stat.val}</h2>
              </div>
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
                <stat.icon size={26} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* COMMAND TOOLBAR */}
      <div className="bg-white border border-slate-200 rounded-[32px] p-3 flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between shadow-sm sticky top-2 z-30">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative group flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search assortment, category or store identity..."
              className="bg-slate-50 border border-slate-200 rounded-2xl h-12 pl-12 pr-4 w-full outline-none focus:ring-2 focus:ring-indigo-100 font-medium text-sm text-slate-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative">
             <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
             <select 
               className="h-12 pl-10 pr-10 rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-widest appearance-none outline-none focus:ring-2 focus:ring-indigo-100 cursor-pointer"
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
             >
                <option value="All">Life-cycle: ALL</option>
                <option value="Active">Active</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Expired">Expired</option>
             </select>
             <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <button 
            onClick={handleExport}
            className="h-12 px-6 rounded-2xl border border-slate-200 bg-slate-50 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all active:scale-95"
          >
            <Download size={16} /> EXPORT MANIFEST
          </button>
        </div>
      </div>

      {/* REGISTRY TABLE */}
      <div className="bg-white border border-slate-200 rounded-[40px] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-slate-400 uppercase text-[10px] font-black tracking-[0.2em]">
                <th className="p-6 pl-10">Assortment Identity</th>
                <th className="p-6">Origin Store</th>
                <th className="p-6">Classification</th>
                <th className="p-6 text-center">Unit Count</th>
                <th className="p-6">Operation Timeline</th>
                <th className="p-6">Status</th>
                <th className="p-6 pr-10"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50 transition-all cursor-default">
                  <td className="p-6 pl-10">
                    <div>
                      <h3 className="font-black text-slate-800 text-sm group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{item.assortmentName}</h3>
                      <p className="text-slate-400 text-[10px] font-bold mt-1 font-mono">{item.id}</p>
                    </div>
                  </td>
                  <td className="p-6 text-slate-600 font-bold text-xs">{item.store}</td>
                  <td className="p-6">
                    <span className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-wider border border-indigo-100">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-6 text-center font-black text-slate-700 text-sm">{item.products} <span className="text-[10px] text-slate-400 font-normal ml-0.5">SKUs</span></td>
                  <td className="p-6 text-slate-500 text-xs font-bold font-mono">
                    <div className="flex items-center gap-2">
                      <CalendarRange size={14} className="text-slate-400" />
                      {item.startDate} / {item.endDate}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg border w-fit ${
                      item.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      item.status === "Scheduled" ? "bg-orange-50 text-orange-600 border-orange-100" :
                      "bg-rose-50 text-rose-600 border-rose-100"
                    }`}>
                      {item.status === "Active" ? <CheckCircle2 size={12} /> : item.status === "Scheduled" ? <CalendarRange size={12} /> : <XCircle size={12} />}
                      {item.status}
                    </span>
                  </td>
                  <td className="p-6 pr-10 relative">
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === item.id ? null : item.id); }}
                      className={`p-2 rounded-xl transition-all ${activeMenu === item.id ? 'bg-slate-800 text-white shadow-lg' : 'hover:bg-slate-200 text-slate-400 hover:text-slate-600'}`}
                    >
                      <MoreVertical size={20} />
                    </button>

                    <AnimatePresence>
                      {activeMenu === item.id && (
                        <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-12 top-14 bg-white border border-slate-200 rounded-2xl shadow-2xl w-48 overflow-hidden z-[50] py-1">
                          <button className="w-full px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-xs font-bold text-slate-600 transition-colors"><Eye size={14} /> Audit Details</button>
                          <button onClick={() => openModal(item)} className="w-full px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-xs font-bold text-slate-600 transition-colors"><Edit size={14} /> Update Config</button>
                          <div className="border-t border-slate-100 my-1" />
                          <button onClick={() => handleDelete(item.id)} className="w-full px-4 py-3 hover:bg-rose-50 flex items-center gap-3 text-xs font-bold text-rose-600 transition-colors"><Trash2 size={14} /> Purge Record</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="p-20 text-center text-slate-400 font-black uppercase tracking-[0.3em] text-xs">No Matching Architectures Found</div>
        )}
      </div>

      {/* CONFIGURATION MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[1000] p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="bg-white w-full max-w-2xl rounded-[48px] p-10 border border-slate-200 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">{editingItem ? 'Edit Profile' : 'Init Assortment'}</h2>
                  <p className="text-slate-500 font-bold text-sm mt-1">Configure product allocations and store lifecycle</p>
                </div>
                <button onClick={closeModal} className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-800 transition-all flex items-center justify-center"><X size={24} /></button>
              </div>

              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Portfolio Identity</label>
                  <input required type="text" placeholder="e.g. Winter Staples 2026" className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-200 px-5 outline-none focus:ring-2 focus:ring-indigo-100 font-black text-slate-700" value={formData.assortmentName} onChange={(e) => setFormData({ ...formData, assortmentName: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Target Node (Store)</label>
                  <input required type="text" className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-200 px-5 outline-none focus:ring-2 focus:ring-indigo-100 font-bold text-slate-700" value={formData.store} onChange={(e) => setFormData({ ...formData, store: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Industry Class</label>
                  <input required type="text" className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-200 px-5 outline-none focus:ring-2 focus:ring-indigo-100 font-bold text-slate-700" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Product Volume</label>
                  <input required type="number" className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-200 px-5 outline-none focus:ring-2 focus:ring-indigo-100 font-black text-slate-700" value={formData.products} onChange={(e) => setFormData({ ...formData, products: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Lifecycle Phase</label>
                  <select className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-200 px-5 outline-none focus:ring-2 focus:ring-indigo-100 font-black text-slate-700 appearance-none" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                    <option value="Active">ACTIVE</option>
                    <option value="Scheduled">SCHEDULED</option>
                    <option value="Expired">EXPIRED</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Start Sync</label>
                  <input required type="date" className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-200 px-5 outline-none focus:ring-2 focus:ring-indigo-100 font-bold text-slate-700 uppercase" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Termination Date</label>
                  <input required type="date" className="w-full h-14 rounded-2xl bg-slate-50 border border-slate-200 px-5 outline-none focus:ring-2 focus:ring-indigo-100 font-bold text-slate-700 uppercase" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
                </div>
                <button type="submit" className="md:col-span-2 w-full h-16 rounded-[24px] bg-indigo-600 hover:bg-indigo-700 text-white font-black tracking-widest uppercase transition-all shadow-xl shadow-indigo-100 mt-4 flex items-center justify-center gap-3">
                  <CheckCircle2 size={22} /> {editingItem ? 'Update Configuration' : 'Deploy Architecture'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Assortments;