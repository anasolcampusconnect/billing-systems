import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';

const Inventory = () => {
  const inventoryData = [
    { id: 'SKU-001', name: 'Wireless Headphones', category: 'Electronics', price: '₹ 2,500', qty: 15 },
    { id: 'SKU-002', name: 'Coffee Maker', category: 'Appliances', price: '₹ 5,200', qty: 3 },
    { id: 'SKU-003', name: 'Smart Watch', category: 'Electronics', price: '₹ 3,999', qty: 25 },
    { id: 'SKU-004', name: 'Designer Shirt', category: 'Clothing', price: '₹ 1,200', qty: 45 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
        <div className="relative w-96">
          <Search className="absolute left-3 top-3 text-gray-500" size={18} />
          <input type="text" placeholder="Search products..." className="w-full bg-[#121212] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:border-blue-500 text-white" />
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all">
          <Plus size={18} /> Add New Product
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {inventoryData.map(item => (
          <div key={item.id} className="bg-[#1a1a1a] border border-gray-800 p-6 rounded-xl hover:border-blue-500/30 transition-all">
             <div className="flex justify-between mb-4">
                <span className="text-[10px] bg-gray-800 px-2 py-1 rounded text-gray-400 font-bold uppercase">{item.category}</span>
                <span className={`text-[10px] px-2 py-1 rounded font-bold ${item.qty < 5 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                  {item.qty < 5 ? 'LOW STOCK' : 'IN STOCK'}
                </span>
             </div>
             <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
             <p className="text-xs text-gray-500 font-mono mb-4">ID: {item.id}</p>
             <div className="flex justify-between items-end border-t border-gray-800 pt-4">
                <div>
                   <p className="text-[10px] text-gray-500 uppercase">Price</p>
                   <p className="text-blue-500 font-bold text-xl">{item.price}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-gray-500 uppercase">Stock</p>
                   <p className="text-white font-bold">{item.qty} Pcs</p>
                </div>
             </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Inventory;