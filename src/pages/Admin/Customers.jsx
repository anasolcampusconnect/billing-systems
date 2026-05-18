import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Search, Filter, Download, UserPlus, MoreHorizontal,
  Eye, Edit, Trash2, Mail, Phone, Crown, ShieldCheck, 
  CreditCard, CalendarDays, X, ChevronDown, CheckCircle2,
  AlertCircle
} from "lucide-react";

const Customers = () => {
  // --- STATE MANAGEMENT ---
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewCustomer, setViewCustomer] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Pagination & Filtering
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [filterTier, setFilterTier] = useState("All");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const initialForm = { name: "", email: "", phone: "", tier: "Silver", status: "Active" };
  const [formData, setFormData] = useState(initialForm);

  // MOCK DATA
  const [customers, setCustomers] = useState([
    { id: "CUST-8001", name: "Rahul Sharma", email: "rahul.s@example.com", phone: "+91 98765 43210", tier: "Platinum", totalSpent: 12500000, orders: 45, lastOrder: "2026-05-18", status: "Active", type: "B2B" },
    { id: "CUST-8002", name: "Priya Desai", email: "priya.d@example.com", phone: "+91 91234 56789", tier: "Gold", totalSpent: 450000, orders: 12, lastOrder: "2026-05-15", status: "Active", type: "Retail" },
    { id: "CUST-8003", name: "TechNova Solutions", email: "procurement@technova.in", phone: "+91 99887 76655", tier: "Platinum", totalSpent: 8500000, orders: 120, lastOrder: "2026-05-17", status: "Active", type: "B2B" },
    { id: "CUST-8004", name: "Anil Kumar", email: "anil.k99@example.com", phone: "+91 98712 34567", tier: "Silver", totalSpent: 25000, orders: 3, lastOrder: "2026-04-20", status: "Inactive", type: "Retail" },
    { id: "CUST-8005", name: "Global Traders Ltd", email: "contact@globaltraders.com", phone: "+91 90000 11111", tier: "Gold", totalSpent: 980000, orders: 34, lastOrder: "2026-05-10", status: "Active", type: "B2B" },
    { id: "CUST-8006", name: "Sneha Reddy", email: "sneha.r@example.com", phone: "+91 97777 88888", tier: "Silver", totalSpent: 15000, orders: 2, lastOrder: "2026-05-01", status: "Active", type: "Retail" },
  ]);

  // --- LOGIC: FILTERING ---
  const processedCustomers = useMemo(() => {
    let result = [...customers];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.phone.includes(q) ||
        item.id.toLowerCase().includes(q)
      );
    }

    if (filterTier !== "All") {
      result = result.filter(item => item.tier === filterTier);
    }

    return result;
  }, [search, customers, filterTier]);

  // --- LOGIC: PAGINATION ---
  const totalPages = Math.ceil(processedCustomers.length / itemsPerPage);
  const paginatedCustomers = processedCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // --- LOGIC: ACTIONS ---
  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setCustomers(prev => prev.map(c => c.id === editingId ? { ...c, ...formData } : c));
    } else {
      const newEntry = {
        id: `CUST-${8000 + customers.length + 1}`,
        ...formData,
        totalSpent: 0,
        orders: 0,
        lastOrder: "N/A",
        type: "Retail"
      };
      setCustomers([newEntry, ...customers]);
    }
    setFormData(initialForm);
    setEditingId(null);
    setShowModal(false);
  };

  const handleEdit = (customer) => {
    setFormData({ name: customer.name, email: customer.email, phone: customer.phone, tier: customer.tier, status: customer.status });
    setEditingId(customer.id);
    setActiveMenu(null);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this customer?")) {
      setCustomers(prev => prev.filter(c => c.id !== id));
      if (paginatedCustomers.length === 1 && currentPage > 1) setCurrentPage(prev => prev - 1);
    }
    setActiveMenu(null);
  };

  const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  const formatDate = (dateString) => dateString === "N/A" ? "N/A" : new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  // KPIs
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const b2bCount = customers.filter(c => c.type === "B2B").length;

  return (
    // FIX 1: Used h-full and max-w-full to prevent outer page scroll
    <div className="h-full w-full max-w-full bg-[#F8FAFC] flex flex-col font-sans text-slate-800">
      <div className="flex flex-col w-full p-4 md:p-6 gap-6 min-w-0">
        
        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Customers Directory</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Manage B2B/Retail clients, loyalty tiers, and order history.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex flex-wrap items-center gap-3">
            <button className="h-10 md:h-11 px-4 md:px-6 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold flex items-center gap-2 shadow-sm hover:shadow transition-all text-sm whitespace-nowrap">
              <Download size={18} /> Export List
            </button>
            <button onClick={() => { setFormData(initialForm); setEditingId(null); setShowModal(true); }} className="h-10 md:h-11 px-4 md:px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all text-sm whitespace-nowrap">
              <UserPlus size={18} strokeWidth={2.5}/> Add Customer
            </button>
          </motion.div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full min-w-0">
          {[
            { label: "Total Customers", val: customers.length.toString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
            { label: "B2B Clients", val: b2bCount.toString(), icon: ShieldCheck, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
            { label: "Platinum Members", val: customers.filter(c => c.tier === "Platinum").length.toString(), icon: Crown, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
            { label: "Lifetime Value (LTV)", val: formatCurrency(totalRevenue), icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }} className={`bg-white border ${stat.border} rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between min-w-0`}>
              {/* FIX 2: Added min-w-0 and truncate to prevent numbers from jumping out of box */}
              <div className="min-w-0 flex-1 pr-3">
                <p className="uppercase text-[10px] md:text-[11px] tracking-widest text-slate-500 font-black mb-1 truncate">{stat.label}</p>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 font-mono tracking-tight truncate" title={stat.val}>
                  {stat.val}
                </h2>
              </div>
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                <stat.icon size={24} strokeWidth={2.5} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* DATA TABLE CONTAINER */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="flex flex-col bg-white border border-slate-200/80 rounded-2xl shadow-sm w-full min-w-0">
          
          {/* TOOLBAR */}
          <div className="px-4 md:px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-t-2xl">
            <div className="relative w-full sm:max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search by name, email, or phone..." value={search} onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}} className="w-full h-11 pl-11 pr-4 text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm" />
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto relative">
              <button onClick={() => setShowFilterMenu(!showFilterMenu)} className="h-11 px-4 w-full sm:w-auto bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap">
                <Filter size={16} className={filterTier !== "All" ? "text-indigo-600" : "text-slate-400"} /> 
                Tier: {filterTier} <ChevronDown size={14} className="text-slate-400 ml-1" />
              </button>
              {showFilterMenu && (
                <div className="absolute right-0 top-12 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1">
                  {["All", "Platinum", "Gold", "Silver"].map(tier => (
                    <button key={tier} onClick={() => {setFilterTier(tier); setCurrentPage(1); setShowFilterMenu(false);}} className={`w-full px-4 py-2.5 text-left text-sm font-bold ${filterTier === tier ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'}`}>{tier}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* TABLE */}
          {/* FIX 3: overflow-x-auto combined with w-full ensures only the table scrolls sideways, not the whole page */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm border-collapse min-w-[950px]">
              <thead className="bg-white sticky top-0 z-10 border-b border-slate-200">
                <tr className="uppercase text-[11px] tracking-widest text-slate-400 font-black">
                  <th className="px-6 py-4">Customer Info</th>
                  <th className="px-6 py-4">Contact Details</th>
                  <th className="px-6 py-4">Loyalty Tier</th>
                  <th className="px-6 py-4">Total Spent & Orders</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {paginatedCustomers.map((item, idx) => (
                  <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="hover:bg-slate-50/80 transition-colors group">
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-black text-sm border border-slate-200 shrink-0">
                          {item.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-black text-slate-900 text-sm truncate">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400 font-mono font-bold">
                            {item.id} <span className="text-slate-300">•</span> <span className={`px-1.5 py-0.5 rounded uppercase tracking-wider ${item.type === 'B2B' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>{item.type}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1 text-xs font-semibold text-slate-600">
                        <div className="flex items-center gap-2"><Mail size={13} className="text-slate-400"/> <span className="truncate max-w-[150px]">{item.email}</span></div>
                        <div className="flex items-center gap-2"><Phone size={13} className="text-slate-400"/> {item.phone}</div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                        item.tier === 'Platinum' ? 'bg-indigo-50 text-indigo-700 border-indigo-200/50' : 
                        item.tier === 'Gold' ? 'bg-amber-50 text-amber-700 border-amber-200/50' : 
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {item.tier === 'Platinum' ? <Crown size={12}/> : item.tier === 'Gold' ? <Crown size={12}/> : <ShieldCheck size={12}/>}
                        {item.tier}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-0.5 text-sm">
                        <div className="font-black text-slate-900">{formatCurrency(item.totalSpent)}</div>
                        <div className="text-[11px] text-slate-500 font-bold flex items-center gap-1"><CalendarDays size={12}/> {formatDate(item.lastOrder)} ({item.orders})</div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {item.status === "Active" ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold"><CheckCircle2 size={14}/> Active</span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-slate-400 text-xs font-bold"><AlertCircle size={14}/> Inactive</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right relative">
                      <button onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-flex opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <MoreHorizontal size={18} />
                      </button>

                      <AnimatePresence>
                        {activeMenu === item.id && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)}></div>
                            <motion.div initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} transition={{ duration: 0.15 }} className="absolute right-8 top-8 w-44 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 py-1 text-left">
                              <button onClick={() => {setViewCustomer(item); setActiveMenu(null);}} className="w-full px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-sm font-bold text-slate-700 transition-colors"><Eye size={15} className="text-slate-400" /> View Profile</button>
                              <button onClick={() => handleEdit(item)} className="w-full px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-sm font-bold text-slate-700 transition-colors"><Edit size={15} className="text-slate-400" /> Edit Details</button>
                              <div className="h-px bg-slate-100 my-1"></div>
                              <button onClick={() => handleDelete(item.id)} className="w-full px-4 py-2 hover:bg-rose-50 flex items-center gap-2.5 text-sm font-bold text-rose-600 transition-colors"><Trash2 size={15} /> Remove</button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </td>

                  </motion.tr>
                ))}
              </tbody>
            </table>

            {processedCustomers.length === 0 && (
              <div className="p-16 text-center text-slate-500">
                <div className="flex flex-col items-center justify-center">
                  <div className="h-14 w-14 bg-slate-100 rounded-full flex items-center justify-center mb-3"><Search size={24} className="text-slate-400" /></div>
                  <p className="font-black text-slate-800 text-base">No customers found</p>
                  <p className="text-sm font-medium mt-1">Try adjusting your search or filters.</p>
                </div>
              </div>
            )}
          </div>

          {/* TABLE FOOTER / PAGINATION */}
          <div className="px-4 md:px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 rounded-b-2xl">
            <span className="text-xs font-bold text-slate-500">Showing page {currentPage} of {totalPages || 1}</span>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm transition-colors ${currentPage === 1 ? 'text-slate-400 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'}`}>Previous</button>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className={`px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm transition-colors ${currentPage === totalPages || totalPages === 0 ? 'text-slate-400 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'}`}>Next</button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ADD/EDIT MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setShowModal(false)}></motion.div>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative w-full sm:w-[450px] h-screen bg-white shadow-2xl flex flex-col border-l border-slate-200">
              <div className="flex items-center justify-between p-5 md:p-6 border-b border-slate-100 bg-white">
                <div>
                  <h2 className="text-lg md:text-xl font-black text-slate-900">{editingId ? 'Edit Customer' : 'Add New Customer'}</h2>
                  <p className="text-[13px] font-medium text-slate-500 mt-0.5">{editingId ? 'Update customer profile details.' : 'Register a new client.'}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"><X size={20} strokeWidth={2.5} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 md:p-6 bg-slate-50/30">
                <form id="customerForm" onSubmit={handleSave} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Full Name / Company <span className="text-rose-500">*</span></label>
                    <input required type="text" value={formData.name} placeholder="e.g. Rahul Sharma" onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full h-11 px-4 font-bold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Email Address <span className="text-rose-500">*</span></label>
                    <input required type="email" value={formData.email} placeholder="contact@example.com" onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full h-11 px-4 font-bold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Phone Number <span className="text-rose-500">*</span></label>
                    <input required type="text" value={formData.phone} placeholder="+91 XXXXX XXXXX" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full h-11 px-4 font-bold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Loyalty Tier</label>
                      <select value={formData.tier} onChange={(e) => setFormData({ ...formData, tier: e.target.value })} className="w-full h-11 px-4 font-bold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm appearance-none">
                        <option>Silver</option>
                        <option>Gold</option>
                        <option>Platinum</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Status</label>
                      <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full h-11 px-4 font-bold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm appearance-none">
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-5 border-t border-slate-100 bg-white flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 h-11 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm">Cancel</button>
                <button type="submit" form="customerForm" className="flex-1 h-11 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md transition-all">
                  {editingId ? 'Update' : 'Save'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW PROFILE MODAL */}
      <AnimatePresence>
        {viewCustomer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setViewCustomer(null)}></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative h-28 bg-gradient-to-r from-indigo-500 to-purple-600 p-5 flex justify-between items-start">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/20 text-white border border-white/20 shadow-sm backdrop-blur-md`}>
                  {viewCustomer.tier === 'Platinum' ? <Crown size={12}/> : viewCustomer.tier === 'Gold' ? <Crown size={12}/> : <ShieldCheck size={12}/>} {viewCustomer.tier}
                </span>
                <button onClick={() => setViewCustomer(null)} className="p-1.5 text-white hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"><X size={18} strokeWidth={3}/></button>
              </div>
              
              <div className="px-6 pb-6 pt-0 relative">
                <div className="h-16 w-16 rounded-2xl bg-white shadow-lg border-4 border-white flex items-center justify-center text-2xl font-black text-indigo-600 absolute -top-8">
                  {viewCustomer.name.charAt(0)}
                </div>
                
                <div className="pt-10 text-center border-b border-slate-100 pb-5">
                  <h3 className="text-xl font-black text-slate-900 leading-tight">{viewCustomer.name}</h3>
                  <p className="text-xs font-bold text-slate-500 mt-1">{viewCustomer.id} • {viewCustomer.type}</p>
                </div>

                <div className="py-5 space-y-3 border-b border-slate-100">
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0"><Mail size={14} className="text-slate-500"/></div>
                    <span className="truncate">{viewCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0"><Phone size={14} className="text-slate-500"/></div>
                    {viewCustomer.phone}
                  </div>
                </div>

                <div className="pt-5 grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Orders</p>
                    <p className="text-xl font-black text-slate-800">{viewCustomer.orders}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center min-w-0">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">LTV</p>
                    <p className="text-lg font-black text-indigo-600 truncate" title={formatCurrency(viewCustomer.totalSpent)}>{formatCurrency(viewCustomer.totalSpent)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Customers;