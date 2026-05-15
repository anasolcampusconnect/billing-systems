import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Receipt, Search, Printer, MoreVertical, X, Eye, Download, Trash2, CreditCard, Banknote, QrCode, FileText } from 'lucide-react';

const Receipts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [viewReceipt, setViewReceipt] = useState(null); // State for View Modal

  // 1. Static Data for Past Receipts
  const [receiptsData, setReceiptsData] = useState([
    { id: 'REC-8842', date: '15 May 2026', customer: 'Ramesh Kumar', amount: 1250, itemsCount: 4, mode: 'UPI', status: 'Paid', items: [{name: 'Rice 5kg', qty: 1, price: 850}, {name: 'Oil 1L', qty: 2, price: 200}] },
    { id: 'REC-8841', date: '15 May 2026', customer: 'Walking Customer', amount: 450, itemsCount: 1, mode: 'Cash', status: 'Paid', items: [{name: 'Detergent', qty: 1, price: 450}] },
    { id: 'REC-8840', date: '14 May 2026', customer: 'Suresh Verma', amount: 8900, itemsCount: 2, mode: 'Card', status: 'Paid', items: [{name: 'Smart Watch', qty: 1, price: 3999}, {name: 'Headphones', qty: 1, price: 4901}] },
    { id: 'REC-8839', date: '14 May 2026', customer: 'Priya Sharma', amount: 2450, itemsCount: 5, mode: 'UPI', status: 'Refunded', items: [{name: 'Groceries Bundle', qty: 1, price: 2450}] },
  ]);

  // --- 2. EXPORT ALL LOGIC (CSV Download) ---
  const handleExport = () => {
    if (receiptsData.length === 0) return alert("No data to export!");

    // Create CSV Header
    const headers = ["Receipt ID", "Date", "Customer", "Amount", "Mode", "Status"];
    const rows = receiptsData.map(r => [r.id, r.date, r.customer, r.amount, r.mode, r.status]);

    // Format as CSV string
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    // Create hidden download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Receipts_Export_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 3. Void Receipt Logic
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to void this receipt?")) {
      setReceiptsData(receiptsData.filter(item => item.id !== id));
      setActiveDropdown(null);
    }
  };

  const filteredData = receiptsData.filter(item => 
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative" onClick={() => activeDropdown && setActiveDropdown(null)}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-rose-600/20 p-3 rounded-lg border border-rose-500/30">
              <Receipt className="text-rose-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Transaction Receipts</h2>
              <p className="text-sm text-gray-500">History of all generated bills</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search Bill ID or Customer..."
                className="w-full bg-[#121212] border border-gray-700 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-rose-500 text-white text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={handleExport}
              className="bg-gray-800 hover:bg-rose-600 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm border border-gray-700 hover:border-rose-500"
            >
              <Download size={18} /> Export All
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-visible shadow-lg">
          <div className="overflow-x-auto overflow-y-visible min-h-[400px]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#121212] border-b border-gray-800 text-gray-400 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="p-4">Receipt ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4 text-center">Items</th>
                  <th className="p-4">Grand Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-4 font-mono text-rose-400 font-bold">{item.id}</td>
                    <td className="p-4 text-gray-400 text-xs">{item.date}</td>
                    <td className="p-4 text-gray-200 font-bold">{item.customer}</td>
                    <td className="p-4 text-center text-gray-400">{item.itemsCount}</td>
                    <td className="p-4 font-mono font-bold text-white">₹{item.amount.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${
                        item.status === 'Paid' ? 'text-green-500 bg-green-500/10 border-green-500/20' : 'text-red-400 bg-red-400/10 border-red-400/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === item.id ? null : item.id); }} 
                        className="text-gray-500 hover:text-rose-500 transition-colors p-1"
                      >
                        <MoreVertical size={18} />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.id && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute right-10 top-4 w-40 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden"
                          >
                            <button 
                              onClick={() => { setViewReceipt(item); setActiveDropdown(null); }}
                              className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-2 transition-colors"
                            >
                              <Eye size={14} /> View Items
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-2 transition-colors">
                              <Printer size={14} /> Re-print
                            </button>
                            <div className="border-t border-gray-800 my-1"></div>
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="w-full text-left px-4 py-2.5 text-xs text-red-400 hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                            >
                              <Trash2 size={14} /> Void Bill
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* --- 4. VIEW RECEIPT MODAL --- */}
      <AnimatePresence>
        {viewReceipt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setViewReceipt(null)}
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden z-[110]"
            >
              <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#121212]">
                <div>
                   <h3 className="text-xl font-bold text-white flex items-center gap-2"><FileText className="text-rose-500"/> Receipt Details</h3>
                   <p className="text-xs text-gray-500 mt-1">Transaction ID: {viewReceipt.id}</p>
                </div>
                <button onClick={() => setViewReceipt(null)} className="text-gray-400 hover:text-white"><X size={24} /></button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                   <span className="text-gray-500">Customer: <b className="text-gray-200">{viewReceipt.customer}</b></span>
                   <span className="text-gray-500">Date: <b className="text-gray-200">{viewReceipt.date}</b></span>
                </div>

                <div className="bg-black/40 rounded-xl border border-gray-800 p-4">
                  <table className="w-full text-left text-xs">
                    <thead className="text-gray-500 uppercase font-bold border-b border-gray-800">
                      <tr>
                        <th className="pb-2">Item Name</th>
                        <th className="pb-2 text-center">Qty</th>
                        <th className="pb-2 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {viewReceipt.items.map((it, i) => (
                        <tr key={i}>
                          <td className="py-3 text-gray-200 font-medium">{it.name}</td>
                          <td className="py-3 text-center text-gray-400">{it.qty}</td>
                          <td className="py-3 text-right text-gray-200">₹{it.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-4 border-t border-dashed border-gray-800 space-y-2">
                   <div className="flex justify-between text-sm text-gray-400"><span>Payment Method</span><span>{viewReceipt.mode}</span></div>
                   <div className="flex justify-between text-lg font-bold text-white pt-2"><span>Total Amount</span><span className="text-rose-500">₹{viewReceipt.amount.toLocaleString('en-IN')}</span></div>
                </div>

                <button 
                   onClick={() => window.print()}
                   className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 mt-4 shadow-lg shadow-rose-600/20 transition-all"
                >
                   <Printer size={18}/> Print Copy
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Receipts;