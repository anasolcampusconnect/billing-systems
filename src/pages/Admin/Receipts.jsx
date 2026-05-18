import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Receipt, Eye, Download, Printer, Filter, Plus,
  Calendar, ShoppingBag, CreditCard, Banknote, QrCode,
  CheckCircle2, AlertCircle, FileText, ChevronRight, MoreVertical,Trash2
} from "lucide-react";

const Receipts = () => {
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);

  // 1. DATA REGISTRY
  const [receipts] = useState([
    { id: "RCPT-1001", customer: "Rahul Sharma", payment: "UPI", cashier: "Saraswathi", amount: 4850, date: "15 May 2026", status: "Paid" },
    { id: "RCPT-1002", customer: "Sneha Patel", payment: "Cash", cashier: "Kiran", amount: 1240, date: "15 May 2026", status: "Pending" },
    { id: "RCPT-1003", customer: "Arjun Kumar", payment: "Card", cashier: "Rakesh", amount: 8420, date: "14 May 2026", status: "Paid" },
    { id: "RCPT-1004", customer: "Priya Reddy", payment: "Net Banking", cashier: "Saraswathi", amount: 2760, date: "14 May 2026", status: "Paid" },
  ]);

  // 2. SEARCH LOGIC
  const filteredReceipts = useMemo(() => {
    const q = search.toLowerCase().trim();
    return receipts.filter(
      (item) =>
        item.customer.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
    );
  }, [search, receipts]);

  // 3. EXPORT LOGIC
  const handleExport = () => {
    const headers = ["ID", "Customer", "Payment", "Cashier", "Amount", "Date", "Status"];
    const rows = filteredReceipts.map(r => [r.id, r.customer, r.payment, r.cashier, r.amount, r.date, r.status]);
    let csv = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", `Receipts_Report_${new Date().toLocaleDateString()}.csv`);
    link.click();
  };

  return (
    <div className="space-y-8 font-plus-jakarta pb-10" onClick={() => setActiveMenu(null)}>
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">Sales Manifest</h1>
           <p className="text-slate-500 font-bold text-sm mt-1">Audit transaction receipts and digital billing records</p>
        </div>
        <div className="flex gap-3">
           <button onClick={handleExport} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-slate-800 transition-all shadow-sm"><Download size={20}/></button>
           <button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-3.5 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-100 transition-all text-xs tracking-widest uppercase">
             <Plus size={18} strokeWidth={3}/> New Receipt
           </button>
        </div>
      </div>

      {/* KPI ANALYTICS STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Managed", val: "14,284", icon: Receipt, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Today's Volume", val: "₹4.8L", icon: ShoppingBag, color: "text-rose-600", bg: "bg-rose-50" },
          { label: "Unsettled", val: "124", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Average Ticket", val: "₹3,420", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all">
             <div className="flex justify-between items-start">
                <div>
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{stat.label}</p>
                   <h3 className="text-3xl font-black text-slate-800 mt-2">{stat.val}</h3>
                </div>
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}><stat.icon size={22}/></div>
             </div>
          </div>
        ))}
      </div>

      {/* SEARCH & COMMAND TOOLBAR */}
      <div className="bg-white p-3 rounded-[28px] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4 sticky top-2 z-30">
        <div className="relative flex-1 w-full">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           <input 
              type="text" placeholder="Search Receipt ID, Customer or Registry Reference..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
              value={search} onChange={(e)=>setSearch(e.target.value)}
           />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <button className="flex-1 md:flex-none px-6 py-3 bg-slate-50 border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 flex items-center justify-center gap-2 transition-all">
             <Filter size={14}/> Filters
           </button>
           <button className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
             <Calendar size={14}/> Date Range
           </button>
        </div>
      </div>

      {/* DATA REGISTRY TABLE */}
      <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
         <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
               <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-[0.15em] border-b border-slate-100">
                  <tr>
                     <th className="p-6 pl-10">Receipt Identity</th>
                     <th className="p-6">Entity / Customer</th>
                     <th className="p-6 text-center">Settlement Node</th>
                     <th className="p-6 text-right">Net Value</th>
                     <th className="p-6 text-center">Lifecycle</th>
                     <th className="p-6 pr-10"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {filteredReceipts.map((r, idx) => (
                    <motion.tr 
                      key={r.id} 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.05 }}
                      className="hover:bg-slate-50 transition-colors group cursor-default"
                    >
                       <td className="p-6 pl-10">
                          <div className="flex items-center gap-5">
                             <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner border border-blue-100"><Receipt size={22}/></div>
                             <div>
                                <p className="text-sm font-black text-slate-800 uppercase tracking-tight">{r.id}</p>
                                <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase">{r.date}</p>
                             </div>
                          </div>
                       </td>
                       <td className="p-6 font-black text-slate-700 text-sm tracking-tight">{r.customer}</td>
                       <td className="p-6 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 text-slate-500 text-[10px] font-black uppercase border border-slate-200">
                             {r.payment === 'Cash' ? <Banknote size={12}/> : r.payment === 'Card' ? <CreditCard size={12}/> : <QrCode size={12}/>}
                             {r.payment}
                          </span>
                       </td>
                       <td className="p-6 text-right font-black text-slate-800 text-sm font-mono tracking-tighter">₹{r.amount.toLocaleString()}</td>
                       <td className="p-6 text-center">
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                           r.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                          }`}>{r.status}</span>
                       </td>
                       <td className="p-6 pr-10 text-right relative">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-2.5 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-blue-600 transition-all shadow-sm" title="Audit Details"><Eye size={16}/></button>
                             <button className="p-2.5 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-slate-800 transition-all shadow-sm" title="Print Copy"><Printer size={16}/></button>
                             <button className="p-2.5 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-rose-600 transition-all shadow-sm" title="Void Transaction"><Trash2 size={16}/></button>
                          </div>
                          <MoreVertical size={18} className="text-slate-300 group-hover:hidden ml-auto"/>
                       </td>
                    </motion.tr>
                  ))}
               </tbody>
            </table>
         </div>
         {filteredReceipts.length === 0 && (
            <div className="p-20 text-center bg-white">
               <FileText size={48} className="mx-auto text-slate-200 mb-4" />
               <h3 className="text-lg font-black text-slate-400 uppercase tracking-widest">No matching bills found</h3>
            </div>
         )}
      </div>

    </div>
  );
};

export default Receipts;