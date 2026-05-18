import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet, Search, Filter, Download, ArrowDownRight, ArrowUpRight,
  Receipt, CalendarDays, Plus, MoreHorizontal, Eye, Edit, Trash2,
  TrendingUp, TrendingDown, X, ChevronDown, CheckCircle2
} from "lucide-react";

const BalanceStatements = () => {
  // --- STATE MANAGEMENT ---
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewModalData, setViewModalData] = useState(null); // For "View Details"
  const [editingId, setEditingId] = useState(null); // Tracks if we are editing

  // Pagination, Sorting, & Filtering states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortOrder, setSortOrder] = useState("desc"); // desc = Newest, asc = Oldest
  const [filterType, setFilterType] = useState("All"); // All, Credit, Debit
  
  // Dropdown toggles
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const initialFormState = { reference: "", type: "Credit", amount: "", paymentMode: "", date: "", remarks: "" };
  const [formData, setFormData] = useState(initialFormState);

  const [statements, setStatements] = useState([
    { id: "TRX-1001", reference: "Cash Counter Deposit", type: "Credit", amount: 24500, paymentMode: "Cash", date: "2026-05-15", remarks: "Morning shift settlement", status: "Completed" },
    { id: "TRX-1002", reference: "Supplier Payment (Fresh Produce)", type: "Debit", amount: 12800, paymentMode: "Bank Transfer", date: "2026-05-15", remarks: "Fresh vegetables stock", status: "Completed" },
    { id: "TRX-1003", reference: "UPI Collection", type: "Credit", amount: 8650, paymentMode: "UPI", date: "2026-05-14", remarks: "Evening sales", status: "Pending" },
    { id: "TRX-1004", reference: "Utility Bill - Electricity (April)", type: "Debit", amount: 14200, paymentMode: "Bank Transfer", date: "2026-05-13", remarks: "Monthly power bill", status: "Completed" },
    { id: "TRX-1005", reference: "B2B Bulk Order Advance Payment", type: "Credit", amount: 125000, paymentMode: "Bank Transfer", date: "2026-05-12", remarks: "Advance payment from Corporate", status: "Completed" },
    { id: "TRX-1006", reference: "Office Supplies", type: "Debit", amount: 3200, paymentMode: "Card", date: "2026-05-10", remarks: "Stationery for office", status: "Completed" },
    { id: "TRX-1007", reference: "Refund from Vendor", type: "Credit", amount: 5000, paymentMode: "Bank Transfer", date: "2026-05-09", remarks: "Overcharged previous invoice", status: "Completed" }
  ]);

  // --- LOGIC: FILTERING & SORTING ---
  const processedStatements = useMemo(() => {
    let result = [...statements];

    // 1. Search Filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(item =>
        item.reference.toLowerCase().includes(q) ||
        item.paymentMode.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
      );
    }

    // 2. Type Filter
    if (filterType !== "All") {
      result = result.filter(item => item.type === filterType);
    }

    // 3. Date Sorting
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [search, statements, filterType, sortOrder]);

  // --- LOGIC: PAGINATION ---
  const totalPages = Math.ceil(processedStatements.length / itemsPerPage);
  const paginatedStatements = processedStatements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- LOGIC: ACTION HANDLERS ---
  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing
      setStatements(prev => prev.map(item => 
        item.id === editingId ? { ...item, ...formData, amount: Number(formData.amount) } : item
      ));
    } else {
      // Create new
      const newEntry = {
        id: `TRX-${1000 + statements.length + 1}`,
        ...formData,
        amount: Number(formData.amount),
        status: "Completed",
      };
      setStatements([newEntry, ...statements]);
    }
    
    setFormData(initialFormState);
    setEditingId(null);
    setShowModal(false);
  };

  const handleEdit = (item) => {
    setFormData({
      reference: item.reference,
      type: item.type,
      amount: item.amount.toString(),
      paymentMode: item.paymentMode,
      date: item.date,
      remarks: item.remarks
    });
    setEditingId(item.id);
    setActiveMenu(null);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this transaction?")) {
      setStatements(prev => prev.filter(item => item.id !== id));
      // Adjust pagination if deleting last item on page
      if (paginatedStatements.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      }
    }
    setActiveMenu(null);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Reference", "Type", "Amount", "Mode", "Date", "Status", "Remarks"];
    const csvContent = [
      headers.join(","),
      ...processedStatements.map(row => 
        [row.id, `"${row.reference}"`, row.type, row.amount, row.paymentMode, row.date, row.status, `"${row.remarks}"`].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `ledger_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col font-sans text-slate-800">
      <div className="flex flex-col w-full p-6 lg:p-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Transaction Ledger</h1>
            <p className="text-sm text-slate-500 font-medium mt-1.5">Real-time monitoring of all credits, debits, and settlements.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-3">
            <button onClick={handleExportCSV} className="h-10 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold flex items-center gap-2 shadow-sm hover:shadow transition-all text-sm whitespace-nowrap">
              <Download size={16} /> Export CSV
            </button>
            <button
              onClick={() => { setFormData(initialFormState); setEditingId(null); setShowModal(true); }}
              className="h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all text-sm whitespace-nowrap"
            >
              <Plus size={16} strokeWidth={3} /> Record Transaction
            </button>
          </motion.div>
        </div>

        {/* KPI CARDS (Hardcoded for UI demo) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
          {[
            { title: "Available Balance", amount: "₹4,80,000.00", icon: Wallet, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
            { title: "Total Credits (MTD)", amount: "₹9,20,000.00", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
            { title: "Total Debits (MTD)", amount: "₹4,40,000.00", icon: TrendingDown, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" },
            { title: "Pending Settlements", amount: "18", icon: Receipt, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" }
          ].map((kpi, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1, duration: 0.4 }} className={`bg-white border ${kpi.border} rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 group-hover:text-slate-700 transition-colors">{kpi.title}</p>
                  <h2 className="text-2xl font-black text-slate-900 font-mono tracking-tight">{kpi.amount}</h2>
                </div>
                <div className={`p-3 ${kpi.bg} ${kpi.color} rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110`}><kpi.icon size={22} strokeWidth={2.5} /></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DATA TABLE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="flex flex-col bg-white border border-slate-200/80 rounded-2xl shadow-sm w-full">
          
          {/* Table Toolbar */}
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-t-2xl">
            <div className="relative w-full sm:max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search reference, ID, or mode..." value={search} onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}} className="w-full h-11 pl-10 pr-4 text-sm font-medium bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-sm" />
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* SORT DROPDOWN */}
              <div className="relative">
                <button onClick={() => setShowSortMenu(!showSortMenu)} className="h-11 px-4 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap">
                  Date: {sortOrder === 'desc' ? 'Newest' : 'Oldest'} <ChevronDown size={14} className="text-slate-400" />
                </button>
                {showSortMenu && (
                  <div className="absolute right-0 top-12 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1">
                    <button onClick={() => {setSortOrder("desc"); setShowSortMenu(false);}} className={`w-full px-4 py-2 text-left text-sm font-medium ${sortOrder === 'desc' ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'}`}>Newest First</button>
                    <button onClick={() => {setSortOrder("asc"); setShowSortMenu(false);}} className={`w-full px-4 py-2 text-left text-sm font-medium ${sortOrder === 'asc' ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'}`}>Oldest First</button>
                  </div>
                )}
              </div>

              {/* FILTER DROPDOWN */}
              <div className="relative">
                <button onClick={() => setShowFilterMenu(!showFilterMenu)} className="h-11 px-4 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap">
                  <Filter size={16} className={filterType !== "All" ? "text-indigo-600" : "text-slate-400"} /> 
                  {filterType === "All" ? "Filters" : filterType}
                </button>
                {showFilterMenu && (
                  <div className="absolute right-0 top-12 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1">
                    {["All", "Credit", "Debit"].map(type => (
                      <button key={type} onClick={() => {setFilterType(type); setCurrentPage(1); setShowFilterMenu(false);}} className={`w-full px-4 py-2 text-left text-sm font-medium ${filterType === type ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'}`}>{type} Transactions</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table Area */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[900px]">
              <thead className="bg-white sticky top-0 z-10 border-b border-slate-200">
                <tr className="text-[11px] uppercase tracking-widest text-slate-500 font-extrabold">
                  <th className="px-6 py-5 w-1/3">Transaction Details</th>
                  <th className="px-6 py-5 whitespace-nowrap">Date</th>
                  <th className="px-6 py-5 whitespace-nowrap">Type</th>
                  <th className="px-6 py-5 whitespace-nowrap">Mode</th>
                  <th className="px-6 py-5 whitespace-nowrap">Status</th>
                  <th className="px-6 py-5 whitespace-nowrap text-right">Amount</th>
                  <th className="px-6 py-5 whitespace-nowrap w-12 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {paginatedStatements.length > 0 ? (
                  paginatedStatements.map((item, idx) => (
                    <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 leading-snug">{item.reference}</div>
                        <div className="text-xs text-slate-500 font-mono mt-1">{item.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-slate-600 font-medium"><CalendarDays size={14} className="text-slate-400"/>{formatDate(item.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.type === "Credit" ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50/80 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-emerald-200/50"><ArrowDownRight size={14} className="text-emerald-500" /> Credit</span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-rose-700 bg-rose-50/80 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-rose-200/50"><ArrowUpRight size={14} className="text-rose-500" /> Debit</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-bold whitespace-nowrap">{item.paymentMode}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold ${item.status === "Completed" ? "text-slate-700 bg-slate-100 border border-slate-200" : "text-amber-700 bg-amber-50 border border-amber-200/60"}`}>
                          {item.status === "Pending" ? (
                            <span className="relative flex h-2 w-2 mr-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                          ) : (<span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>)}
                          {item.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-right font-mono font-black text-base whitespace-nowrap ${item.type === "Credit" ? "text-emerald-600" : "text-slate-900"}`}>
                        {item.type === "Debit" ? "-" : "+"}{formatCurrency(item.amount)}
                      </td>
                      <td className="px-6 py-4 text-center relative whitespace-nowrap">
                        <button onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-flex opacity-0 group-hover:opacity-100 focus:opacity-100">
                          <MoreHorizontal size={18} />
                        </button>
                        <AnimatePresence>
                          {activeMenu === item.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setActiveMenu(null)}></div>
                              <motion.div initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} transition={{ duration: 0.15 }} className="absolute right-10 top-10 w-48 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 py-1">
                                <button onClick={() => {setViewModalData(item); setActiveMenu(null);}} className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center gap-3 text-sm text-slate-700 font-medium transition-colors"><Eye size={16} className="text-slate-400" /> View Details</button>
                                <button onClick={() => handleEdit(item)} className="w-full px-4 py-2.5 hover:bg-slate-50 flex items-center gap-3 text-sm text-slate-700 font-medium transition-colors"><Edit size={16} className="text-slate-400" /> Edit Entry</button>
                                <div className="h-px bg-slate-100 my-1"></div>
                                <button onClick={() => handleDelete(item.id)} className="w-full px-4 py-2.5 hover:bg-rose-50 flex items-center gap-3 text-sm text-rose-600 font-bold transition-colors"><Trash2 size={16} /> Delete</button>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-20 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4"><Search size={28} className="text-slate-400" /></div>
                        <p className="font-bold text-slate-700 text-lg">No transactions found</p>
                        <p className="text-sm mt-1">Adjust your search filters or record a new transaction.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Table Pagination */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0 rounded-b-2xl">
            <span className="text-sm font-medium text-slate-500">Showing page {currentPage} of {totalPages || 1} ({processedStatements.length} total results)</span>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm transition-colors ${currentPage === 1 ? 'text-slate-400 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'}`}>Previous</button>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className={`px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold shadow-sm transition-colors ${currentPage === totalPages || totalPages === 0 ? 'text-slate-400 cursor-not-allowed' : 'text-slate-700 hover:bg-slate-50 hover:text-indigo-600'}`}>Next</button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CREATE/EDIT MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setShowModal(false)}></motion.div>
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="relative w-full sm:w-[500px] h-screen bg-white shadow-2xl flex flex-col border-l border-slate-200">
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white">
                <div>
                  <h2 className="text-xl font-black text-slate-900">{editingId ? 'Edit Transaction' : 'Record Transaction'}</h2>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">{editingId ? 'Update existing ledger details.' : 'Add a manual ledger entry.'}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"><X size={20} strokeWidth={2.5} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
                <form id="ledgerForm" onSubmit={handleSave} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Reference / Description <span className="text-rose-500">*</span></label>
                    <input required type="text" value={formData.reference} placeholder="e.g. Supplier Payment" onChange={(e) => setFormData({ ...formData, reference: e.target.value })} className="w-full h-12 px-4 font-bold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Type <span className="text-rose-500">*</span></label>
                      <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full h-12 px-4 font-bold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm appearance-none">
                        <option>Credit</option>
                        <option>Debit</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Amount (₹) <span className="text-rose-500">*</span></label>
                      <input required type="number" min="0" step="0.01" value={formData.amount} placeholder="0.00" onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full h-12 px-4 font-mono font-black text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Payment Mode <span className="text-rose-500">*</span></label>
                      <select required value={formData.paymentMode} onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })} className="w-full h-12 px-4 font-bold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm appearance-none">
                        <option value="">Select Mode</option>
                        <option>Cash</option>
                        <option>UPI</option>
                        <option>Card</option>
                        <option>Bank Transfer</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Date <span className="text-rose-500">*</span></label>
                      <input required type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full h-12 px-4 font-bold text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Internal Remarks</label>
                    <textarea rows="4" value={formData.remarks} placeholder="Add any notes here..." onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} className="w-full p-4 font-medium text-slate-900 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm resize-none"></textarea>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-slate-100 bg-white flex gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 h-12 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm">Cancel</button>
                <button type="submit" form="ledgerForm" className="flex-1 h-12 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md hover:-translate-y-0.5 transition-all">
                  {editingId ? 'Update Transaction' : 'Save Transaction'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW DETAILS MODAL */}
      <AnimatePresence>
        {viewModalData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setViewModalData(null)}></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-1 font-mono">{viewModalData.id}</div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">{viewModalData.reference}</h3>
                </div>
                <button onClick={() => setViewModalData(null)} className="p-2 text-slate-400 hover:bg-white rounded-full transition-colors bg-slate-100"><X size={18} strokeWidth={3}/></button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <span className="text-sm font-bold text-slate-500">Amount</span>
                  <span className={`text-2xl font-black font-mono ${viewModalData.type === 'Credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {viewModalData.type === 'Debit' ? '-' : '+'}{formatCurrency(viewModalData.amount)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <span className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</span>
                    <span className="font-bold text-slate-800 flex items-center gap-2"><CalendarDays size={14} className="text-slate-400"/> {formatDate(viewModalData.date)}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Payment Mode</span>
                    <span className="font-bold text-slate-800">{viewModalData.paymentMode}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Type</span>
                    <span className="font-bold text-slate-800">{viewModalData.type}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500"/> {viewModalData.status}</span>
                  </div>
                </div>
                {viewModalData.remarks && (
                  <div className="pt-6 border-t border-slate-100">
                    <span className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Remarks</span>
                    <p className="text-sm font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">{viewModalData.remarks}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default BalanceStatements;