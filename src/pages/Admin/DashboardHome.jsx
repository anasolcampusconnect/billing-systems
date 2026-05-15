import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Package, IndianRupee, ArrowUpRight, ArrowDownRight, Clock 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

const DashboardHome = () => {
  // --- MOCK DATA FOR CHARTS ---
  const weeklySalesData = [
    { name: 'Mon', revenue: 45000, profit: 12000 },
    { name: 'Tue', revenue: 52000, profit: 15000 },
    { name: 'Wed', revenue: 38000, profit: 9000 },
    { name: 'Thu', revenue: 65000, profit: 20000 },
    { name: 'Fri', revenue: 48000, profit: 13000 },
    { name: 'Sat', revenue: 85000, profit: 28000 },
    { name: 'Sun', revenue: 92000, profit: 32000 },
  ];

  const categoryData = [
    { name: 'Groceries', value: 45000 },
    { name: 'Electronics', value: 30000 },
    { name: 'Clothing', value: 15000 },
    { name: 'Household', value: 10000 },
  ];

  const recentTransactions = [
    { id: 'INV-10234', customer: 'Rahul K.', amount: '₹ 4,500', status: 'Completed', time: '10 mins ago' },
    { id: 'INV-10235', customer: 'Sneha M.', amount: '₹ 1,250', status: 'Completed', time: '45 mins ago' },
    { id: 'INV-10236', customer: 'Walk-in', amount: '₹ 850', status: 'Completed', time: '1 hr ago' },
    { id: 'INV-10237', customer: 'Vikram R.', amount: '₹ 12,400', status: 'Pending', time: '2 hrs ago' },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']; // Blue, Purple, Green, Yellow

  // --- REUSABLE STAT CARD COMPONENT ---
  const StatCard = ({ title, value, icon: Icon, trend, isUp, colorClass }) => (
    <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 shadow-lg hover:border-blue-500/30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorClass}`}>
          <Icon size={24} className="text-white" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-bold ${isUp ? 'text-green-400' : 'text-red-400'}`}>
          {isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-1">{title}</p>
        <h3 className="text-3xl font-mono font-bold text-white">{value}</h3>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      
      {/* 1. TOP STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="₹ 4,25,000" icon={IndianRupee} trend="+12.5%" isUp={true} colorClass="bg-blue-600" />
        <StatCard title="Total Orders" value="1,248" icon={Package} trend="+5.2%" isUp={true} colorClass="bg-purple-600" />
        <StatCard title="Active Customers" value="850" icon={Users} trend="-2.1%" isUp={false} colorClass="bg-green-600" />
        <StatCard title="Avg. Order Value" value="₹ 340" icon={TrendingUp} trend="+8.4%" isUp={true} colorClass="bg-orange-500" />
      </div>

      {/* 2. CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Revenue Bar Chart */}
        <div className="lg:col-span-2 bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="text-white font-bold text-lg">Weekly Sales & Profit</h3>
               <p className="text-gray-500 text-xs">Revenue vs Profit for the last 7 days</p>
            </div>
            <select className="bg-[#121212] border border-gray-700 text-gray-300 text-xs rounded px-3 py-1.5 outline-none">
               <option>This Week</option>
               <option>Last Week</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklySalesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#888" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121212', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="revenue" name="Gross Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="profit" name="Net Profit" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category Pie Chart */}
        <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 shadow-lg flex flex-col">
          <div className="mb-2">
             <h3 className="text-white font-bold text-lg">Sales by Category</h3>
             <p className="text-gray-500 text-xs">Top performing commodity groups</p>
          </div>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#121212', borderColor: '#333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value) => `₹${value}`}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text in Donut Chart */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-2xl font-bold text-white">4</span>
               <span className="text-[10px] text-gray-400 uppercase">Categories</span>
            </div>
          </div>
          {/* Custom Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
             {categoryData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                   <span className="text-xs text-gray-300">{item.name}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM ROW: TABLES & LISTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 bg-[#1a1a1a] rounded-2xl border border-gray-800 shadow-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-800 flex justify-between items-center">
            <div>
               <h3 className="text-white font-bold">Recent Transactions</h3>
               <p className="text-gray-500 text-xs">Latest receipts generated at POS</p>
            </div>
            <button className="text-blue-500 hover:text-blue-400 text-xs font-bold">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#121212] text-gray-500 text-[10px] uppercase tracking-wider">
                  <th className="px-6 py-3 font-medium">Invoice ID</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {recentTransactions.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-blue-400">{tx.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{tx.customer}</td>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-white">{tx.amount}</td>
                    <td className="px-6 py-4">
                       <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold ${tx.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                         {tx.status}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-right flex items-center justify-end gap-1">
                       <Clock size={12} /> {tx.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts / To-Do */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 shadow-lg p-6">
           <h3 className="text-white font-bold mb-1">System Alerts</h3>
           <p className="text-gray-500 text-xs mb-6">Action items requiring attention</p>
           
           <div className="space-y-4">
              <div className="flex gap-4 items-start p-3 bg-red-500/5 border border-red-500/20 rounded-xl">
                 <div className="bg-red-500/20 p-2 rounded-lg text-red-500"><Package size={16} /></div>
                 <div>
                    <h4 className="text-sm font-bold text-red-400">Low Stock Alert</h4>
                    <p className="text-xs text-gray-400 mt-0.5">5 items are running below minimum threshold.</p>
                 </div>
              </div>
              
              <div className="flex gap-4 items-start p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                 <div className="bg-blue-500/20 p-2 rounded-lg text-blue-500"><Users size={16} /></div>
                 <div>
                    <h4 className="text-sm font-bold text-blue-400">Staff Shift Ending</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Terminal 2 cashier shift ends in 30 mins.</p>
                 </div>
              </div>

              <div className="flex gap-4 items-start p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                 <div className="bg-yellow-500/20 p-2 rounded-lg text-yellow-500"><Clock size={16} /></div>
                 <div>
                    <h4 className="text-sm font-bold text-yellow-400">EOD Pending</h4>
                    <p className="text-xs text-gray-400 mt-0.5">End of Day statement not generated for yesterday.</p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default DashboardHome;