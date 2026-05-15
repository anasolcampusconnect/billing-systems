import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Search, Plus, MoreVertical, X, Edit, Eye, Trash2 } from 'lucide-react';

const Assortments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New State for handling the Actions Dropdown
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 1. Static Data for Assortments/Bundles
  const [assortmentsData, setAssortmentsData] = useState([
    { id: 'AST-001', name: 'Premium Diwali Hamper', itemsCount: 12, basePrice: '₹3,500', discount: '15%', status: 'Active' },
    { id: 'AST-002', name: 'Monthly Grocery Kit - Family', itemsCount: 45, basePrice: '₹6,200', discount: '10%', status: 'Active' },
    { id: 'AST-003', name: 'Summer Drinks Bundle', itemsCount: 6, basePrice: '₹850', discount: '5%', status: 'Draft' },
    { id: 'AST-004', name: 'Work From Home Tech Kit', itemsCount: 4, basePrice: '₹4,999', discount: '0%', status: 'Inactive' },
  ]);

  const [formData, setFormData] = useState({
    name: '', itemsCount: '', basePrice: '', discount: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newId = `AST-00${assortmentsData.length + 1}`;
    const newAssortment = {
      id: newId,
      name: formData.name,
      itemsCount: parseInt(formData.itemsCount) || 0,
      basePrice: `₹${formData.basePrice}`,
      discount: formData.discount ? `${formData.discount}%` : '0%',
      status: 'Active'
    };

    setAssortmentsData([newAssortment, ...assortmentsData]);
    setShowAddModal(false);
    setFormData({ name: '', itemsCount: '', basePrice: '', discount: '' });
  };

  // --- NEW: Delete Function ---
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this assortment?");
    if (confirmDelete) {
      setAssortmentsData(assortmentsData.filter(item => item.id !== id));
      setActiveDropdown(null); // Close dropdown after delete
    }
  };

  const filteredData = assortmentsData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative" onClick={() => activeDropdown && setActiveDropdown(null)}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        
        {/* Top Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-teal-600/20 p-3 rounded-lg border border-teal-500/30">
              <Layers className="text-teal-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Product Assortments</h2>
              <p className="text-sm text-gray-500">Manage product bundles and collections</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search assortments..."
                className="w-full bg-[#121212] border border-gray-700 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-teal-500 text-white text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm whitespace-nowrap"
            >
              <Plus size={18} /> Add Assortment
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-visible shadow-lg">
          <div className="overflow-x-auto overflow-y-visible min-h-[300px]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#121212] border-b border-gray-800 text-gray-400 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="p-4">Assortment ID</th>
                  <th className="p-4">Collection Name</th>
                  <th className="p-4">Total Items</th>
                  <th className="p-4">Base Price</th>
                  <th className="p-4">Discount Applied</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-4 font-mono text-teal-400 font-medium">{item.id}</td>
                    <td className="p-4 text-gray-200 font-bold">{item.name}</td>
                    <td className="p-4 text-gray-300">{item.itemsCount} Products</td>
                    <td className="p-4 text-gray-200 font-mono">{item.basePrice}</td>
                    <td className="p-4 text-green-400 font-bold">{item.discount}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        item.status === 'Draft' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                        'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center relative">
                      
                      {/* --- ACTION BUTTON --- */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the parent div from closing it immediately
                          setActiveDropdown(activeDropdown === item.id ? null : item.id);
                        }} 
                        className="text-gray-500 hover:text-teal-500 transition-colors p-1"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* --- ACTION DROPDOWN MENU --- */}
                      <AnimatePresence>
                        {activeDropdown === item.id && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-10 top-4 w-36 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden"
                            onClick={(e) => e.stopPropagation()} // Click inside menu shouldn't close it
                          >
                            <button className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-2 transition-colors">
                              <Eye size={14} /> View Details
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-2 transition-colors">
                              <Edit size={14} /> Edit Bundle
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
                      No assortments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Add Assortment Modal */}
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
                  <Plus size={20} className="text-teal-500"/> Create Assortment
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Collection Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-teal-500 outline-none" placeholder="e.g. Winter Essentials" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Number of Items</label>
                  <input type="number" name="itemsCount" required min="1" value={formData.itemsCount} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-teal-500 outline-none" placeholder="e.g. 5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Base Price (₹)</label>
                    <input type="number" name="basePrice" required min="0" value={formData.basePrice} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-teal-500 outline-none font-mono" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Discount (%)</label>
                    <input type="number" name="discount" min="0" max="100" value={formData.discount} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-teal-500 outline-none font-mono" placeholder="0" />
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2.5 rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2.5 rounded-lg transition-colors">Save Collection</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Assortments;