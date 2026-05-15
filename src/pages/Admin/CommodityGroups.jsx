import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Boxes, Search, Plus, MoreVertical, X, Edit, Eye, Trash2 } from 'lucide-react';

const CommodityGroups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 1. Static Data for Commodity Groups (Categories)
  const [groupsData, setGroupsData] = useState([
    { id: 'GRP-001', name: 'Grocery & Staples', description: 'Daily essential food items and cooking needs', productCount: 145, status: 'Active' },
    { id: 'GRP-002', name: 'Electronics', description: 'Gadgets, home appliances, and accessories', productCount: 32, status: 'Active' },
    { id: 'GRP-003', name: 'Clothing & Apparel', description: 'Men, Women, and Kids fashion wear', productCount: 89, status: 'Active' },
    { id: 'GRP-004', name: 'Dry Fruits & Nuts', description: 'Premium quality imported dry fruits', productCount: 12, status: 'Inactive' },
  ]);

  // 2. Form State for New Group
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submit
  const handleAddSubmit = (e) => {
    e.preventDefault();
    
    const newId = `GRP-00${groupsData.length + 1}`;

    const newGroup = {
      id: newId,
      name: formData.name,
      description: formData.description,
      productCount: 0, // Brand new group will have 0 products initially
      status: formData.status
    };

    setGroupsData([newGroup, ...groupsData]);
    setShowAddModal(false);
    setFormData({ name: '', description: '', status: 'Active' });
  };

  // Delete Function
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Category? Products inside might be unassigned.");
    if (confirmDelete) {
      setGroupsData(groupsData.filter(item => item.id !== id));
      setActiveDropdown(null);
    }
  };

  const filteredData = groupsData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative" onClick={() => activeDropdown && setActiveDropdown(null)}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        
        {/* Top Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600/20 p-3 rounded-lg border border-indigo-500/30">
              <Boxes className="text-indigo-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Commodity Groups</h2>
              <p className="text-sm text-gray-500">Manage main product categories and families</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full bg-[#121212] border border-gray-700 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-indigo-500 text-white text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm whitespace-nowrap shadow-[0_0_15px_rgba(79,70,229,0.3)]"
            >
              <Plus size={18} /> Add Category
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-visible shadow-lg">
          <div className="overflow-x-auto overflow-y-visible min-h-[300px]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#121212] border-b border-gray-800 text-gray-400 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="p-4 w-32">Group ID</th>
                  <th className="p-4 w-48">Category Name</th>
                  <th className="p-4">Description</th>
                  <th className="p-4 text-center">Total Products</th>
                  <th className="p-4 w-24">Status</th>
                  <th className="p-4 text-center w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-4 font-mono text-indigo-400 font-medium">{item.id}</td>
                    <td className="p-4 text-gray-200 font-bold">{item.name}</td>
                    <td className="p-4 text-gray-400 truncate max-w-[250px]">{item.description}</td>
                    <td className="p-4 text-center">
                      <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-bold border border-gray-700">
                        {item.productCount} Items
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === item.id ? null : item.id); }} 
                        className="text-gray-500 hover:text-indigo-500 transition-colors p-1"
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
                              <Eye size={14} /> View Products
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-xs text-gray-300 hover:bg-gray-800 hover:text-white flex items-center gap-2 transition-colors">
                              <Edit size={14} /> Edit Category
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
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      No commodity groups found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Add Category Modal */}
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
                  <Plus size={20} className="text-indigo-500"/> Create Category
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Category Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none" placeholder="e.g. Frozen Foods" />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Description</label>
                  <textarea 
                    name="description" 
                    required 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none min-h-[80px] resize-none" 
                    placeholder="Short description of this group..." 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Initial Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-indigo-500 outline-none font-bold">
                    <option value="Active" className="text-green-500">Active</option>
                    <option value="Inactive" className="text-red-500">Inactive</option>
                  </select>
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2.5 rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-lg transition-colors shadow-[0_0_15px_rgba(79,70,229,0.2)]">Save Category</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommodityGroups;