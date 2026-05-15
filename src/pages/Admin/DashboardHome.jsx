import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Package,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const DashboardHome = () => {
  // --- MOCK DATA (Logic remains identical) ---
  const weeklySalesData = [
    { name: "Mon", revenue: 45000, profit: 12000 },
    { name: "Tue", revenue: 52000, profit: 15000 },
    { name: "Wed", revenue: 38000, profit: 9000 },
    { name: "Thu", revenue: 65000, profit: 20000 },
    { name: "Fri", revenue: 48000, profit: 13000 },
    { name: "Sat", revenue: 85000, profit: 28000 },
    { name: "Sun", revenue: 92000, profit: 32000 },
  ];

  const categoryData = [
    { name: "Groceries", value: 45000 },
    { name: "Electronics", value: 30000 },
    { name: "Clothing", value: 15000 },
    { name: "Household", value: 10000 },
  ];

  const recentTransactions = [
    {
      id: "INV-10234",
      customer: "Rahul K.",
      amount: "₹ 4,500",
      status: "Completed",
      time: "10 mins ago",
    },
    {
      id: "INV-10235",
      customer: "Sneha M.",
      amount: "₹ 1,250",
      status: "Completed",
      time: "45 mins ago",
    },
    {
      id: "INV-10236",
      customer: "Walk-in",
      amount: "₹ 850",
      status: "Completed",
      time: "1 hr ago",
    },
    {
      id: "INV-10237",
      customer: "Vikram R.",
      amount: "₹ 12,400",
      status: "Pending",
      time: "2 hrs ago",
    },
  ];

  const COLORS = ["#4f46e5", "#3b82f6", "#10b981", "#f59e0b"]; // Indigo, Blue, Green, Yellow

  // --- REUSABLE STAT CARD (Updated for Light Mode) ---
  const StatCard = ({ title, value, icon: Icon, trend, isUp, colorClass }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-4 rounded-2xl shadow-lg shadow-current/10 ${colorClass}`}
        >
          <Icon size={24} className="text-white" />
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-black ${isUp ? "text-green-500" : "text-red-500"}`}
        >
          {isUp ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-black text-gray-800">{value}</h3>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-10"
    >
      {/* 1. TOP STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="₹ 4,25,000"
          icon={IndianRupee}
          trend="+12.5%"
          isUp={true}
          colorClass="bg-gradient-to-br from-indigo-600 to-indigo-400"
        />
        <StatCard
          title="Total Orders"
          value="1,248"
          icon={Package}
          trend="+5.2%"
          isUp={true}
          colorClass="bg-gradient-to-br from-blue-600 to-blue-400"
        />
        <StatCard
          title="Active Customers"
          value="850"
          icon={Users}
          trend="-2.1%"
          isUp={false}
          colorClass="bg-gradient-to-br from-emerald-600 to-emerald-400"
        />
        <StatCard
          title="Avg. Order Value"
          value="₹ 340"
          icon={TrendingUp}
          trend="+8.4%"
          isUp={true}
          colorClass="bg-gradient-to-br from-orange-500 to-orange-300"
        />
      </div>

      {/* 2. CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Revenue Bar Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-gray-800 font-black text-xl">
                Weekly Performance
              </h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                Revenue vs Net Profit
              </p>
            </div>
            <select className="bg-gray-50 border border-gray-200 text-gray-600 text-xs font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all">
              <option>Current Week</option>
              <option>Previous Week</option>
            </select>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklySalesData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 700 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 700 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "16px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    fontWeight: "bold",
                  }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    paddingTop: "20px",
                  }}
                />
                <Bar
                  dataKey="revenue"
                  name="Gross Revenue"
                  fill="#4f46e5"
                  radius={[6, 6, 0, 0]}
                  barSize={15}
                />
                <Bar
                  dataKey="profit"
                  name="Net Profit"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  barSize={15}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category Pie Chart */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-gray-800 font-black text-xl">Market Share</h3>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Top Commodity Groups
            </p>
          </div>
          <div className="flex-1 min-h-[260px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value) => `₹${value}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-gray-800">04</span>
              <span className="text-[10px] text-gray-400 uppercase font-black">
                Sectors
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {categoryData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                ></div>
                <span className="text-[11px] font-bold text-gray-600">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. BOTTOM ROW: TABLES & ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <div>
              <h3 className="text-gray-800 font-black text-lg">
                Recent Transactions
              </h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                Live Terminal Receipts
              </p>
            </div>
            <button className="bg-white text-indigo-600 border border-indigo-100 px-4 py-2 rounded-xl text-xs font-black shadow-sm hover:bg-indigo-600 hover:text-white transition-all">
              View History
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-[10px] uppercase font-black tracking-widest border-b border-gray-50">
                  <th className="px-8 py-4">Ref ID</th>
                  <th className="px-8 py-4">Client Name</th>
                  <th className="px-8 py-4">Net Total</th>
                  <th className="px-8 py-4">Gateway</th>
                  <th className="px-8 py-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentTransactions.map((tx, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-indigo-50/30 transition-all group"
                  >
                    <td className="px-8 py-5 text-sm font-bold text-indigo-600">
                      #{tx.id.split("-")[1]}
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-gray-700">
                      {tx.customer}
                    </td>
                    <td className="px-8 py-5 text-sm font-black text-gray-900">
                      {tx.amount}
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`px-3 py-1 text-[10px] rounded-lg font-black uppercase tracking-tighter ${tx.status === "Completed" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-xs font-bold text-gray-400 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Clock size={12} /> {tx.time}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
            <h3 className="text-gray-800 font-black text-lg">
              Terminal Alerts
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 items-center p-4 bg-red-50 rounded-2xl border border-red-100 group hover:bg-red-500 transition-all duration-300">
              <div className="bg-white p-2.5 rounded-xl shadow-sm text-red-500">
                <Package size={18} />
              </div>
              <div>
                <h4 className="text-xs font-black text-red-600 group-hover:text-white uppercase">
                  Critical Stock
                </h4>
                <p className="text-[11px] font-bold text-red-400 group-hover:text-red-100">
                  5 items need immediate refill.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-center p-4 bg-indigo-50 rounded-2xl border border-indigo-100 group hover:bg-indigo-600 transition-all duration-300">
              <div className="bg-white p-2.5 rounded-xl shadow-sm text-indigo-600">
                <Users size={18} />
              </div>
              <div>
                <h4 className="text-xs font-black text-indigo-600 group-hover:text-white uppercase">
                  Shift Monitor
                </h4>
                <p className="text-[11px] font-bold text-indigo-400 group-hover:text-indigo-100">
                  T2 Cashier shift ends in 30m.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-center p-4 bg-amber-50 rounded-2xl border border-amber-100 group hover:bg-amber-500 transition-all duration-300">
              <div className="bg-white p-2.5 rounded-xl shadow-sm text-amber-500">
                <Clock size={18} />
              </div>
              <div>
                <h4 className="text-xs font-black text-amber-600 group-hover:text-white uppercase">
                  EOD Compliance
                </h4>
                <p className="text-[11px] font-bold text-amber-400 group-hover:text-amber-100">
                  Yesterday's report is pending.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;
