import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Search, Plus, MoreVertical, X } from 'lucide-react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // 1. Move Static Data to State
  const [productsData, setProductsData] = useState([
    { id: 'PRD-001', name: 'Premium Basmati Rice 5kg', group: 'Grocery', price: '₹850', stock: 120, status: 'Active' },
    { id: 'PRD-002', name: 'Sunflower Oil 1L', group: 'Grocery', price: '₹145', stock: 4, status: 'Low Stock' },
    { id: 'PRD-003', name: 'Wireless Mouse', group: 'Electronics', price: '₹499', stock: 15, status: 'Active' },
    { id: 'PRD-004', name: 'Almonds 500g', group: 'Dry Fruits', price: '₹450', stock: 0, status: 'Out of Stock' },
  ]);

  // 2. Form State for New Product
  const [formData, setFormData] = useState({
    name: '',
    group: 'Grocery',
    price: '',
    stock: ''
  });

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submit
  const handleAddSubmit = (e) => {
    e.preventDefault();
    
    const stockNum = parseInt(formData.stock) || 0;
    
    // Auto-calculate status
    let newStatus = 'Active';
    if (stockNum === 0) newStatus = 'Out of Stock';
    else if (stockNum < 10) newStatus = 'Low Stock';

    // Generate pseudo-ID
    const newId = `PRD-00${productsData.length + 1}`;

    const newProduct = {
      id: newId,
      name: formData.name,
      group: formData.group,
      price: `₹${formData.price}`,
      stock: stockNum,
      status: newStatus
    };

    // Update State (add to top of list)
    setProductsData([newProduct, ...productsData]);
    
    // Close Modal & Reset Form
    setShowAddModal(false);
    setFormData({ name: '', group: 'Grocery', price: '', stock: '' });
  };

  // Filter products based on search
  const filteredProducts = productsData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        
        {/* Top Header & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-3 rounded-lg border border-blue-500/30">
              <Package className="text-blue-500" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Products Catalog</h2>
              <p className="text-sm text-gray-500">Manage your items, pricing, and stock</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-[#121212] border border-gray-700 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-blue-500 text-white text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm whitespace-nowrap"
            >
              <Plus size={18} /> Add Product
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#121212] border-b border-gray-800 text-gray-400 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="p-4">Product ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Commodity Group</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredProducts.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-4 font-mono text-blue-400 font-medium">{item.id}</td>
                    <td className="p-4 text-gray-200 font-bold">{item.name}</td>
                    <td className="p-4 text-gray-400">{item.group}</td>
                    <td className="p-4 text-gray-200 font-mono">{item.price}</td>
                    <td className="p-4 text-gray-300">{item.stock} Pcs</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        item.status === 'Low Stock' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                        'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="text-gray-500 hover:text-blue-500 transition-colors p-1">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              className="relative bg-[#1a1a1a] border border-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden z-10"
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Plus size={20} className="text-blue-500"/> Add New Product
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Product Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none" 
                    placeholder="e.g. 1kg Sugar" 
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Commodity Group</label>
                  <select 
                    name="group"
                    value={formData.group}
                    onChange={handleInputChange}
                    className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none"
                  >
                    <option value="Grocery">Grocery</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Dry Fruits">Dry Fruits</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Price (₹)</label>
                    <input 
                      type="number" 
                      name="price"
                      required
                      min="0"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none font-mono" 
                      placeholder="0.00" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-1.5">Stock Quantity</label>
                    <input 
                      type="number" 
                      name="stock"
                      required
                      min="0"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="w-full bg-[#121212] border border-gray-700 rounded-lg p-2.5 text-white focus:border-blue-500 outline-none font-mono" 
                      placeholder="0" 
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2.5 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-lg transition-colors"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;