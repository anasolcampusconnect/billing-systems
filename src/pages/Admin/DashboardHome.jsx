import React from 'react';
import { TrendingUp, AlertCircle, Layers, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const DashboardHome = () => {
  const stats = { turnover: "8,45,500", profit: "1,20,000", salesCount: 450 };
  const lowStockAlerts = [
    { id: 'SKU-002', name: 'Coffee Maker', qty: 3 },
    { id: 'SKU-005', name: 'Almonds 1kg', qty: 2 }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg hover:border-blue-500/50 transition-all">
          <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">Total Sales</p>
          <h3 className="text-3xl font-mono font-bold text-white">₹ {stats.turnover}</h3>
          <p className="text-green-400 text-xs mt-3 flex items-center gap-1"><TrendingUp size={14}/> +12% growth</p>
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg hover:border-blue-500/50 transition-all">
          <p className="text-blue-500 text-xs font-bold tracking-widest uppercase mb-2">Net Profit</p>
          <h3 className="text-3xl font-mono font-bold text-blue-500">₹ {stats.profit}</h3>
          <p className="text-green-400 text-xs mt-3 flex items-center gap-1"><TrendingUp size={14}/> +5% increase</p>
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg hover:border-blue-500/50 transition-all">
          <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">Orders Count</p>
          <h3 className="text-3xl font-mono font-bold text-white">{stats.salesCount}</h3>
          <p className="text-gray-500 text-xs mt-3">Current Month</p>
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 shadow-lg hover:border-blue-500/50 transition-all">
          <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">Staff Active</p>
          <h3 className="text-3xl font-mono font-bold text-white">08</h3>
          <p className="text-blue-400 text-xs mt-3 flex items-center gap-1"><Activity size={14}/> Online Now</p>
        </div>
      </div>

      {/* Tables & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] rounded-xl border border-red-900/30 shadow-lg overflow-hidden">
          <div className="bg-red-900/10 px-6 py-4 border-b border-red-900/30 flex justify-between items-center">
            <h3 className="text-red-400 font-bold flex items-center gap-2">
              <AlertCircle size={18} /> LOW STOCK ALERT
            </h3>
            <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded font-bold">{lowStockAlerts.length} Items</span>
          </div>
          <div className="p-2">
            <table className="w-full text-left text-sm">
              <thead className="text-gray-500 text-xs uppercase">
                <tr>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Product Name</th>
                  <th className="p-3 text-right">Stock</th>
                </tr>
              </thead>
              <tbody>
                {lowStockAlerts.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-800 last:border-0">
                    <td className="p-3 font-mono text-gray-400">{item.id}</td>
                    <td className="p-3 text-gray-300">{item.name}</td>
                    <td className="p-3 text-right font-bold text-red-400">{item.qty} Pcs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 shadow-lg overflow-hidden">
          <div className="bg-gray-800/30 px-6 py-4 border-b border-gray-800 flex justify-between items-center">
            <h3 className="text-blue-400 font-bold flex items-center gap-2">
              <Layers size={18} /> TOP SELLING CATEGORIES
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {['Electronics', 'Groceries', 'Home Appliances', 'Clothing'].map((cat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300">{cat}</span>
                    <span className="text-gray-500">{90 - (i * 15)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                     <div className="bg-blue-500 h-full" style={{ width: `${90 - (i * 15)}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;