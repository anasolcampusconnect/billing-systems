import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Search, Plus, MoreVertical, X, Edit, Eye, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const BalanceStatements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 1. Static Data for Balance Statements
  const [statementsData, setStatementsData] = useState([
    { id: 'BAL-1004', date: '15 May 2026', description: 'Daily Sales Settlement', type: 'Credit', amount: 45000, closingBalance: 245000, status: 'Completed' },
    { id: 'BAL-1003', date: '14 May 2026', description: 'Supplier Payment (Vendor A)', type: 'Debit', amount: 12500, closingBalance: 200000, status: 'Completed' },
    { id: 'BAL-1002', date: '14 May 2026', description: 'Store Rent - May', type: 'Debit', amount: 25000, closingBalance: 212500, status: 'Pending' },
    { id: 'BAL-1001', date: '13 May 2026', description: 'Opening Balance', type: 'Credit', amount: 237500, closingBalance: 237500, status: 'Completed' },
  ]);

  // 2. Form State for New Statement Entry
  const [formData, setFormData] = useState({
    description: '',
    type: 'Credit',
    amount: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submit
  const handleAddSubmit = (e) => {
    e.preventDefault();
    
    const newId = `BAL-${1004 + statementsData.length}`;
    const amountVal = parseFloat(formData.amount) || 0;
    
    // Auto-calculate dummy closing balance based on the first item in the list
    const lastBalance = statementsData.length > 0 ? statementsData[0].closingBalance : 0;
    const newClosingBalance = formData.type === 'Credit' ? lastBalance + amountVal : lastBalance - amountVal;

    const newStatement = {
      id: newId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      description: formData.description,
      type: formData.type,
      amount: amountVal,
      closingBalance: newClosingBalance,
      status: 'Completed'
    };

    setStatementsData([newStatement, ...statementsData]);
    setShowAddModal(false);
    setFormData({ description: '', type: 'Credit', amount: '' });
  };

  // Delete Function
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction record?");
    if (confirmDelete) {
      setStatementsData(statementsData.filter(item => item.id !== id));
      setActiveDropdown(null);
    }
  };

  const filteredData = statementsData.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative" onClick={() => activeDropdown && setActiveDropdown(null)}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        
        {/* Top Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-amber-600/20 p-3 rounded-lg border border-amber-500/30">
              <Scale className="text-amber-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Balance Statements</h2>
              <p className="text-sm text-gray-500">Track your store's credits, debits, and cash flow</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full bg-[#121212] border border-gray-700 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-amber-500 text-white text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm whitespace-nowrap shadow-[0_0_15px_rgba(217,119,6,0.3)]"
            >
              <Plus size={18} /> New Entry
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-visible shadow-lg">
          <div className="overflow-x-auto overflow-y-visible min-h-[300px]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#121212] border-b border-gray-800 text-gray-400 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="p-4">Txn ID</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Closing Bal.</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-4 font-mono text-amber-400 font-medium">{item.id}</td>
                    <td className="p-4 text-gray-400">{item.date}</td>
                    <td className="p-4 text-gray-200 font-bold">{item.description}</td>
                    <td className="p-4">
                      {item.type === 'Credit' ? (
                        <span className="flex items-center gap-1 text-green-400 font-bold text-xs bg-green-500/10 px-2 py-1 rounded w-fit">
                          <ArrowDownLeft size={14} /> IN
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-400 font-bold text-xs bg-red-500/10 px-2 py-1 rounded w-fit">
                          <ArrowUpRight size={14} /> OUT
                        </span>
                      )}
                    </td>
                    <td className={`p-4 font-mono font-bold ${item.type === 'Credit' ? 'text-green-400' : 'text-red-400'}`}>
                      {item.type === 'Credit' ? '+' : '-'}₹{item.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 text-gray-200 font-mono font-bold">₹{item.closingBalance.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'Completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === item.id ? null : item.id); }} 
                        className="text-gray-500 hover:text-amber-500 transition-colors p-1"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {activeDropdown === item.id && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-10 top-4 w-36 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-2 transition-colors">
                              <Eye size={14} /> View Receipt
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-2 transition-colors">
                              <Edit size={14} /> Edit Record
                            </button>
                            <div className="border-t border-gray-800 my-1"></div>
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="w-full text-left px-4 py-2.5 text-xs text-red-400 hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-gray-500">
                      No transaction records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Add Record Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} 
              className="relative bg-[#1a1a1a] border border-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden z-[110]"
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Plus size={20} className="text-amber-500"/> Add Transaction
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Description / Note</label>
                  <input type="text" name="description" required value={formData.description} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-amber-500 outline-none" placeholder="e.g. Electricity Bill" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Transaction Type</label>
                    <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-amber-500 outline-none font-bold">
                      <option value="Credit" className="text-green-500">Credit (Money IN)</option>
                      <option value="Debit" className="text-red-500">Debit (Money OUT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Amount (₹)</label>
                    <input type="number" name="amount" required min="1" value={formData.amount} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-amber-500 outline-none font-mono" placeholder="0.00" />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2.5 rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-lg transition-colors">Save Record</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BalanceStatements;