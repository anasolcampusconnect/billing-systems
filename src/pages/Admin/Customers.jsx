import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Search, Plus, MoreVertical, X, Edit, Eye, Trash2, Phone, Award } from 'lucide-react';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 1. Static Data for Customers
  const [customersData, setCustomersData] = useState([
    { id: 'CUST-1001', name: 'Ramesh Kumar', mobile: '+91 9876543210', visits: 12, totalSpent: 14500, lastVisit: '10 May 2026', tier: 'Gold' },
    { id: 'CUST-1002', name: 'Suresh Verma', mobile: '+91 9123456780', visits: 5, totalSpent: 3200, lastVisit: '12 May 2026', tier: 'Silver' },
    { id: 'CUST-1003', name: 'Priya Sharma', mobile: '+91 9988776655', visits: 24, totalSpent: 45800, lastVisit: '14 May 2026', tier: 'Platinum' },
    { id: 'CUST-1004', name: 'Anil Reddy', mobile: '+91 9898989898', visits: 1, totalSpent: 850, lastVisit: '15 May 2026', tier: 'Bronze' },
  ]);

  // 2. Form State for New Customer
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    initialSpent: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submit
  const handleAddSubmit = (e) => {
    e.preventDefault();
    
    const newId = `CUST-${1004 + customersData.length}`;
    const spentAmount = parseFloat(formData.initialSpent) || 0;

    // Auto-calculate Tier based on spending
    let customerTier = 'Bronze';
    if (spentAmount >= 25000) customerTier = 'Platinum';
    else if (spentAmount >= 10000) customerTier = 'Gold';
    else if (spentAmount >= 3000) customerTier = 'Silver';

    const newCustomer = {
      id: newId,
      name: formData.name,
      mobile: formData.mobile.startsWith('+91') ? formData.mobile : `+91 ${formData.mobile}`,
      visits: 1,
      totalSpent: spentAmount,
      lastVisit: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      tier: customerTier
    };

    setCustomersData([newCustomer, ...customersData]);
    setShowAddModal(false);
    setFormData({ name: '', mobile: '', initialSpent: '' });
  };

  // Delete Function
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this customer record?");
    if (confirmDelete) {
      setCustomersData(customersData.filter(item => item.id !== id));
      setActiveDropdown(null);
    }
  };

  const filteredData = customersData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mobile.includes(searchTerm) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative" onClick={() => activeDropdown && setActiveDropdown(null)}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        
        {/* Top Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600/20 p-3 rounded-lg border border-purple-500/30">
              <Users className="text-purple-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Customer Directory</h2>
              <p className="text-sm text-gray-500">Manage client profiles, visits, and loyalty tiers</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search name or mobile..."
                className="w-full bg-[#121212] border border-gray-700 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-purple-500 text-white text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm whitespace-nowrap shadow-[0_0_15px_rgba(147,51,234,0.3)]"
            >
              <Plus size={18} /> Add Customer
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-visible shadow-lg">
          <div className="overflow-x-auto overflow-y-visible min-h-[300px]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#121212] border-b border-gray-800 text-gray-400 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="p-4">Customer Info</th>
                  <th className="p-4">Mobile Number</th>
                  <th className="p-4">Loyalty Tier</th>
                  <th className="p-4">Store Visits</th>
                  <th className="p-4">Total Spent</th>
                  <th className="p-4">Last Visit</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-800/30 transition-colors group">
                    <td className="p-4">
                       <div className="flex flex-col">
                          <span className="text-gray-200 font-bold">{item.name}</span>
                          <span className="text-[10px] text-purple-500 font-mono mt-0.5">{item.id}</span>
                       </div>
                    </td>
                    <td className="p-4">
                       <span className="flex items-center gap-2 text-gray-300">
                          <Phone size={14} className="text-gray-500 group-hover:text-purple-400 transition-colors"/> 
                          {item.mobile}
                       </span>
                    </td>
                    <td className="p-4">
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider w-fit border ${
                        item.tier === 'Platinum' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                        item.tier === 'Gold' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                        item.tier === 'Silver' ? 'bg-gray-400/10 text-gray-300 border-gray-400/20' :
                        'bg-orange-500/10 text-orange-400 border-orange-500/20' // Bronze
                      }`}>
                        <Award size={12} /> {item.tier}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300 font-bold">{item.visits} <span className="text-gray-500 font-normal text-xs">Times</span></td>
                    <td className="p-4 font-mono font-bold text-green-400">₹{item.totalSpent.toLocaleString('en-IN')}</td>
                    <td className="p-4 text-gray-400 text-xs">{item.lastVisit}</td>
                    <td className="p-4 text-center relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === item.id ? null : item.id); }} 
                        className="text-gray-500 hover:text-purple-500 transition-colors p-1"
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
                              <Eye size={14} /> View History
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-2 transition-colors">
                              <Edit size={14} /> Edit Details
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
                    <td colSpan="7" className="p-8 text-center text-gray-500">
                      No customer records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Add Customer Modal */}
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
                  <Plus size={20} className="text-purple-500"/> Register Customer
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Full Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-purple-500 outline-none" placeholder="e.g. John Doe" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Mobile Number</label>
                  <input type="tel" name="mobile" required value={formData.mobile} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-purple-500 outline-none" placeholder="10-digit mobile number" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Initial Bill Amount (₹)</label>
                  <input type="number" name="initialSpent" min="0" value={formData.initialSpent} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-purple-500 outline-none font-mono" placeholder="0.00" />
                  <p className="text-[10px] text-gray-500 mt-1">Tier will be auto-assigned based on spending.</p>
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2.5 rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-lg transition-colors">Register</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Customers;