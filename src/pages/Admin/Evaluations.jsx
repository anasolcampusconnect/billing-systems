import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IndianRupee,
  Building2,
  TrendingUp,
  CalendarDays,
  Trophy,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  RefreshCw,
  ChevronDown,
  Users,
  Target,
  Star,
  AlertCircle,
  X,
  PieChart,
  Printer,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  DollarSign,
  Clock,
  Award,
  Zap,
  Globe,
  Bell,
  User,
  Search,
  Eye,
  CheckCircle,
  Activity,
  Package,
  FileText,
  LogOut,
  Menu,
  Sparkles,
  CreditCard,
  Calendar,
  MapPin,
  Grid3x3,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line as ReLine,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";

// ==================== DATA ====================
const monthlySales = [
  { month: "Jan", sales: 120000, target: 100000, profit: 48000 },
  { month: "Feb", sales: 150000, target: 110000, profit: 60000 },
  { month: "Mar", sales: 135000, target: 120000, profit: 54000 },
  { month: "Apr", sales: 170000, target: 130000, profit: 68000 },
  { month: "May", sales: 210000, target: 150000, profit: 84000 },
  { month: "Jun", sales: 195000, target: 160000, profit: 78000 },
  { month: "Jul", sales: 225000, target: 170000, profit: 90000 },
  { month: "Aug", sales: 245000, target: 180000, profit: 98000 },
  { month: "Sep", sales: 230000, target: 190000, profit: 92000 },
  { month: "Oct", sales: 260000, target: 200000, profit: 104000 },
  { month: "Nov", sales: 280000, target: 210000, profit: 112000 },
  { month: "Dec", sales: 310000, target: 230000, profit: 124000 },
];

const yearlySales = [
  { year: "2019", sales: 850000, profit: 340000, expenses: 510000 },
  { year: "2020", sales: 920000, profit: 368000, expenses: 552000 },
  { year: "2021", sales: 1100000, profit: 440000, expenses: 660000 },
  { year: "2022", sales: 1350000, profit: 540000, expenses: 810000 },
  { year: "2023", sales: 1650000, profit: 660000, expenses: 990000 },
  { year: "2024", sales: 2100000, profit: 840000, expenses: 1260000 },
  { year: "2025", sales: 2600000, profit: 1040000, expenses: 1560000 },
];

const branchData = [
  { name: "Hyderabad", value: 38, sales: 988000, growth: 22, customers: 12500, satisfaction: 94, manager: "Mr. Sharma", established: "2015" },
  { name: "Vijayawada", value: 24, sales: 624000, growth: 18, customers: 8200, satisfaction: 91, manager: "Ms. Reddy", established: "2017" },
  { name: "Guntur", value: 20, sales: 520000, growth: 15, customers: 6800, satisfaction: 88, manager: "Mr. Krishna", established: "2018" },
  { name: "Vizag", value: 18, sales: 468000, growth: 12, customers: 5900, satisfaction: 86, manager: "Ms. Lakshmi", established: "2019" },
];

const productPerformance = [
  { name: "Electronics", sales: 850000, growth: 28, margin: 22, color: "#6366f1", units: 12500, revenue: 850000 },
  { name: "Clothing", sales: 620000, growth: 15, margin: 35, color: "#10b981", units: 18500, revenue: 620000 },
  { name: "Home & Living", sales: 480000, growth: 32, margin: 28, color: "#f59e0b", units: 8900, revenue: 480000 },
  { name: "Sports", sales: 320000, growth: 42, margin: 18, color: "#ef4444", units: 5600, revenue: 320000 },
  { name: "Beauty", sales: 230000, growth: 38, margin: 42, color: "#8b5cf6", units: 7200, revenue: 230000 },
];

const weeklyTrend = [
  { day: "Mon", orders: 245, revenue: 245000 },
  { day: "Tue", orders: 268, revenue: 268000 },
  { day: "Wed", orders: 292, revenue: 292000 },
  { day: "Thu", orders: 315, revenue: 315000 },
  { day: "Fri", orders: 388, revenue: 388000 },
  { day: "Sat", orders: 432, revenue: 432000 },
  { day: "Sun", orders: 398, revenue: 398000 },
];

const regionData = [
  { region: "North", sales: 620000, target: 580000, achievement: 107 },
  { region: "South", sales: 890000, target: 820000, achievement: 109 },
  { region: "East", sales: 450000, target: 480000, achievement: 94 },
  { region: "West", sales: 640000, target: 600000, achievement: 107 },
];

const salesPersonData = [
  { name: "Rajesh Kumar", sales: 425000, target: 400000, deals: 48, region: "South", avatar: "👨‍💼" },
  { name: "Priya Sharma", sales: 398000, target: 380000, deals: 42, region: "West", avatar: "👩‍💼" },
  { name: "Amit Verma", sales: 356000, target: 350000, deals: 38, region: "North", avatar: "👨‍💻" },
  { name: "Neha Gupta", sales: 312000, target: 320000, deals: 35, region: "East", avatar: "👩‍🎓" },
  { name: "Vikram Singh", sales: 289000, target: 300000, deals: 31, region: "South", avatar: "👨‍🏫" },
];

const productDetails = [
  { id: 1, name: "iPhone 15 Pro", category: "Electronics", price: 999, stock: 245, sold: 1890, revenue: 1888110, rating: 4.8 },
  { id: 2, name: "Sony WH-1000XM5", category: "Electronics", price: 399, stock: 128, sold: 2450, revenue: 977550, rating: 4.9 },
  { id: 3, name: "Nike Air Max", category: "Clothing", price: 129, stock: 456, sold: 5120, revenue: 660480, rating: 4.7 },
  { id: 4, name: "Levi's Jeans", category: "Clothing", price: 89, stock: 678, sold: 8900, revenue: 792100, rating: 4.5 },
  { id: 5, name: "Dyson Vacuum", category: "Home", price: 599, stock: 89, sold: 1200, revenue: 718800, rating: 4.8 },
  { id: 6, name: "Instant Pot", category: "Home", price: 129, stock: 234, sold: 3400, revenue: 438600, rating: 4.6 },
  { id: 7, name: "Samsung TV", category: "Electronics", price: 1299, stock: 45, sold: 890, revenue: 1156110, rating: 4.7 },
  { id: 8, name: "Adidas Ultraboost", category: "Clothing", price: 159, stock: 234, sold: 3200, revenue: 508800, rating: 4.8 },
];

const categorySummary = [
  { category: "Electronics", totalRevenue: 4118770, totalUnits: 5230, avgPrice: 799, growth: 28 },
  { category: "Clothing", totalRevenue: 1961380, totalUnits: 17220, avgPrice: 105, growth: 15 },
  { category: "Home", totalRevenue: 1157400, totalUnits: 4600, avgPrice: 364, growth: 32 },
];

const quarterlyReports = [
  { quarter: "Q1 2024", sales: 620000, profit: 248000, expenses: 372000, customers: 8450 },
  { quarter: "Q2 2024", sales: 715000, profit: 286000, expenses: 429000, customers: 9120 },
  { quarter: "Q3 2024", sales: 698000, profit: 279200, expenses: 418800, customers: 8890 },
  { quarter: "Q4 2024", sales: 845000, profit: 338000, expenses: 507000, customers: 10240 },
  { quarter: "Q1 2025", sales: 920000, profit: 368000, expenses: 552000, customers: 11500 },
];

const salesReports = [
  { id: 1, date: "2025-05-15", invoiceNo: "INV-001", customer: "Tech Solutions Inc.", amount: 45999, status: "Paid", type: "B2B" },
  { id: 2, date: "2025-05-14", invoiceNo: "INV-002", customer: "Home Decor Ltd.", amount: 28999, status: "Paid", type: "B2B" },
  { id: 3, date: "2025-05-14", invoiceNo: "INV-003", customer: "Fashion Hub", amount: 15999, status: "Pending", type: "B2B" },
  { id: 4, date: "2025-05-13", invoiceNo: "INV-004", customer: "John Doe", amount: 8999, status: "Paid", type: "Retail" },
  { id: 5, date: "2025-05-13", invoiceNo: "INV-005", customer: "Jane Smith", amount: 12999, status: "Paid", type: "Retail" },
  { id: 6, date: "2025-05-12", invoiceNo: "INV-006", customer: "XYZ Corporation", amount: 67999, status: "Overdue", type: "B2B" },
];

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16"];

// ==================== COMPONENTS ====================
const card = "bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300";

const StatCard = ({ title, value, change, icon: Icon, gradient, subtext, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{value}</p>
        {change && (
          <div className={`flex items-center gap-1 mt-2 text-sm ${change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span className="font-medium">{Math.abs(change)}% from last month</span>
          </div>
        )}
        {subtext && <p className="text-gray-400 text-xs mt-1">{subtext}</p>}
      </div>
      <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
        <Icon className="text-white" size={24} />
      </div>
    </div>
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur border border-gray-100 rounded-xl p-3 shadow-xl">
        <p className="text-gray-600 text-sm font-medium">{label}</p>
        {payload.map((p, idx) => (
          <p key={idx} className="text-sm font-semibold mt-1" style={{ color: p.color }}>
            {p.name}: {p.name.includes("₹") ? p.value : `₹${p.value?.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-2xl border border-gray-100 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-500">
              <X size={20} />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const AlertBanner = ({ type, message, onClose }) => {
  const icons = {
    success: <CheckCircle size={18} />,
    warning: <AlertCircle size={18} />,
    info: <Activity size={18} />,
  };
  const gradients = {
    success: "from-emerald-50 to-green-50 border-emerald-200 text-emerald-700",
    warning: "from-amber-50 to-yellow-50 border-amber-200 text-amber-700",
    info: "from-blue-50 to-indigo-50 border-blue-200 text-blue-700",
  };
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      className={`flex items-center justify-between p-4 rounded-xl border bg-gradient-to-r ${gradients[type]} mb-6`}
    >
      <div className="flex items-center gap-3">
        {icons[type]}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button onClick={onClose} className="hover:bg-black/5 p-1 rounded transition">
        <X size={16} />
      </button>
    </motion.div>
  );
};

// ==================== MAIN DASHBOARD ====================
const Evaluations = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [showExport, setShowExport] = useState(false);
  const [showBranchDetails, setShowBranchDetails] = useState(false);
  const [selectedBranchDetail, setSelectedBranchDetail] = useState(null);
  const [showNotification, setShowNotification] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState("This Year");

  const totalSales = 2600000;
  const totalProfit = 1040000;
  const totalCustomers = 33400;
  const avgSatisfaction = 89.8;

  const handleBranchClick = (branch) => {
    setSelectedBranchDetail(branch);
    setShowBranchDetails(true);
  };

  const navItems = [
    { id: "overview", name: "Overview", icon: <Grid3x3 size={20} />, gradient: "from-blue-500 to-indigo-600" },
    { id: "analytics", name: "Analytics", icon: <TrendingUp size={20} />, gradient: "from-emerald-500 to-teal-600" },
    { id: "branches", name: "Branches", icon: <Building2 size={20} />, gradient: "from-purple-500 to-pink-600" },
    { id: "products", name: "Products", icon: <Package size={20} />, gradient: "from-orange-500 to-red-600" },
    { id: "reports", name: "Reports", icon: <FileText size={20} />, gradient: "from-rose-500 to-pink-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      
      {/* ==================== BOTTOM NAVIGATION BAR - Modern Floating ==================== */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/50 p-1.5 flex flex-row gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === item.id
                  ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium hidden sm:inline">{item.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="w-full">
        
        {/* Top Navigation Bar - Clean */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Sales Analytics
              </h1>
              <div className="hidden lg:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-1.5 ml-4">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm outline-none w-48 text-gray-600"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-all text-gray-600">
                <Bell size={20} />
              </button>
              <button onClick={() => setShowExport(true)} className="p-2 hover:bg-gray-100 rounded-xl transition-all text-gray-600">
                <Download size={20} />
              </button>
              <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl px-3 py-1.5 ml-1 shadow-md">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={12} className="text-white" />
                </div>
                <span className="text-sm text-white font-medium">Admin</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 pb-28">
          
          {/* Alert Banner */}
          <AnimatePresence>
            {showNotification && (
              <AlertBanner
                type="success"
                message="🎉 Amazing! Your Q4 sales target is 95% complete. Keep up the great momentum!"
                onClose={() => setShowNotification(false)}
              />
            )}
          </AnimatePresence>

          {/* Quick Stats Row - Modern Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 shadow-md border border-gray-100">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
                <Calendar size={16} className="text-white" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Period</p>
                <p className="font-semibold text-sm text-gray-800">{dateRange}</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 shadow-md border border-gray-100">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-md">
                <Zap size={16} className="text-white" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Growth</p>
                <p className="font-semibold text-sm text-emerald-600">+18.5%</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 shadow-md border border-gray-100">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-md">
                <Target size={16} className="text-white" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Target</p>
                <p className="font-semibold text-sm text-gray-800">92%</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 shadow-md border border-gray-100">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-md">
                <CreditCard size={16} className="text-white" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Avg. Transaction</p>
                <p className="font-semibold text-sm text-gray-800">₹4,280</p>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 shadow-md border border-gray-100">
              <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg shadow-md">
                <Star size={16} className="text-white" />
              </div>
              <div>
                <p className="text-gray-500 text-xs">Rating</p>
                <p className="font-semibold text-sm text-gray-800">4.8/5</p>
              </div>
            </div>
          </div>

          {/* Filters Bar - Compact */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
              <Filter size={14} className="text-gray-400" />
              <select
                className="bg-transparent outline-none text-sm text-gray-700"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
              <Globe size={14} className="text-gray-400" />
              <select
                className="bg-transparent outline-none text-sm text-gray-700"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option>All Branches</option>
                <option>Hyderabad</option>
                <option>Vijayawada</option>
                <option>Guntur</option>
                <option>Vizag</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
              <CalendarDays size={14} className="text-gray-400" />
              <select
                className="bg-transparent outline-none text-sm text-gray-700"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl px-4 py-2 text-sm transition shadow-md hover:shadow-lg">
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>

          {/* KPI CARDS - Gradient */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Sales"
              value={`₹${(totalSales / 100000).toFixed(1)}L`}
              change={18.5}
              icon={IndianRupee}
              gradient="from-emerald-500 to-teal-600"
              subtext="vs ₹21.0L last year"
              delay={0}
            />
            <StatCard
              title="Total Profit"
              value={`₹${(totalProfit / 100000).toFixed(1)}L`}
              change={22.3}
              icon={TrendingUp}
              gradient="from-blue-500 to-indigo-600"
              subtext="Margin: 40%"
              delay={0.1}
            />
            <StatCard
              title="Active Customers"
              value={totalCustomers.toLocaleString()}
              change={12.4}
              icon={Users}
              gradient="from-purple-500 to-pink-600"
              subtext="+3,200 new this year"
              delay={0.2}
            />
            <StatCard
              title="Avg. Satisfaction"
              value={`${avgSatisfaction}%`}
              change={4.2}
              icon={Star}
              gradient="from-amber-500 to-orange-600"
              subtext="Based on 4,200 reviews"
              delay={0.3}
            />
          </div>

          {/* TABS CONTENT */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  <motion.div className={card}>
                    <div className="flex justify-between items-center mb-5">
                      <h2 className="text-lg font-bold text-gray-800">Monthly Performance</h2>
                      <button className="text-gray-400 hover:text-gray-600 text-sm">Details →</button>
                    </div>
                    <ResponsiveContainer width="100%" height={350}>
                      <ComposedChart data={monthlySales}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                        <YAxis stroke="#94a3b8" fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="sales" fill="#6366f1" radius={[8, 8, 0, 0]} name="Sales" />
                        <ReLine dataKey="target" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Target" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </motion.div>

                  <motion.div className={card}>
                    <h2 className="text-lg font-bold mb-5 text-gray-800">Year-over-Year Growth</h2>
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={yearlySales}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                        <YAxis stroke="#94a3b8" fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="sales" stackId="1" stroke="#6366f1" fill="#6366f160" name="Sales" />
                        <Area type="monotone" dataKey="profit" stackId="2" stroke="#10b981" fill="#10b98160" name="Profit" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <motion.div className={card}>
                    <h2 className="text-lg font-bold mb-5 text-gray-800">Branch Contribution</h2>
                    <ResponsiveContainer width="100%" height={320}>
                      <PieChart>
                        <Pie
                          data={branchData}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={110}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          cursor="pointer"
                          onClick={(data) => handleBranchClick(data.payload)}
                        >
                          {branchData.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                    <p className="text-center text-gray-400 text-xs mt-2">Click any segment for details</p>
                  </motion.div>

                  <motion.div className={card}>
                    <h2 className="text-lg font-bold mb-5 text-gray-800">Branch Performance</h2>
                    <div className="space-y-3">
                      {branchData.map((branch, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                          onClick={() => handleBranchClick(branch)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                            <span className="font-medium text-gray-800">{branch.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${branch.growth >= 15 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                              ↑ {branch.growth}%
                            </span>
                          </div>
                          <div className="flex items-center gap-6">
                            <span className="font-bold text-gray-800">₹{(branch.sales / 1000).toFixed(0)}K</span>
                            <div className="w-20 bg-gray-200 rounded-full h-1.5">
                              <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${branch.value}%` }}></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <motion.div className={card}>
                    <h2 className="text-lg font-bold mb-5 text-gray-800">Weekly Orders</h2>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={weeklyTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                        <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} />
                        <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar yAxisId="left" dataKey="orders" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Orders" />
                        <ReLine yAxisId="right" dataKey="revenue" stroke="#ec4899" strokeWidth={2} name="Revenue" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>

                  <motion.div className={card}>
                    <h2 className="text-lg font-bold mb-5 text-gray-800">Top Products</h2>
                    <div className="space-y-4">
                      {productPerformance.slice(0, 3).map((product, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between mb-1 text-sm">
                            <span className="text-gray-700">{product.name}</span>
                            <span className="font-bold text-gray-800">₹{(product.sales / 1000).toFixed(0)}K</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{ width: `${(product.sales / 850000) * 100}%`, backgroundColor: product.color }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-gray-400">
                            <span className="text-emerald-600">↑ {product.growth}%</span>
                            <span>Margin: {product.margin}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <motion.div className={card}>
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-bold text-gray-800">Top Performers</h2>
                    <button className="text-sm text-indigo-600 hover:text-indigo-700">View All →</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-500 text-xs border-b border-gray-100">
                          <th className="pb-3">Rep</th>
                          <th className="pb-3">Region</th>
                          <th className="pb-3">Sales</th>
                          <th className="pb-3">Target</th>
                          <th className="pb-3">Achievement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesPersonData.map((rep, idx) => (
                          <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition">
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{rep.avatar}</span>
                                <span className="font-medium text-gray-800 text-sm">{rep.name}</span>
                              </div>
                            </td>
                            <td className="py-3 text-gray-500 text-sm">{rep.region}</td>
                            <td className="py-3 font-semibold text-gray-800 text-sm">₹{(rep.sales / 1000).toFixed(0)}K</td>
                            <td className="py-3 text-gray-500 text-sm">₹{(rep.target / 1000).toFixed(0)}K</td>
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(rep.sales / rep.target) * 100}%` }}></div>
                                </div>
                                <span className="text-xs text-gray-600">{Math.round((rep.sales / rep.target) * 100)}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  <motion.div className={card}>
                    <h2 className="text-lg font-bold mb-5 text-gray-800">Sales vs Expenses</h2>
                    <ResponsiveContainer width="100%" height={350}>
                      <ComposedChart data={yearlySales}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="year" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="sales" fill="#6366f1" name="Sales" />
                        <ReLine dataKey="expenses" stroke="#ef4444" strokeWidth={3} name="Expenses" />
                        <ReLine dataKey="profit" stroke="#10b981" strokeWidth={3} name="Profit" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </motion.div>

                  <motion.div className={card}>
                    <h2 className="text-lg font-bold mb-5 text-gray-800">Regional Performance</h2>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={regionData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis type="number" stroke="#94a3b8" />
                        <YAxis dataKey="region" type="category" stroke="#94a3b8" />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="sales" fill="#6366f1" name="Sales" />
                        <Bar dataKey="target" fill="#f59e0b" name="Target" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>

                <motion.div className={card}>
                  <h2 className="text-lg font-bold mb-5 text-gray-800">Branch Radar Analysis</h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={branchData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                      <PolarRadiusAxis stroke="#94a3b8" fontSize={12} />
                      <Radar name="Sales" dataKey="sales" stroke="#6366f1" fill="#6366f160" />
                      <Radar name="Customers" dataKey="customers" stroke="#10b981" fill="#10b98160" />
                      <Radar name="Satisfaction" dataKey="satisfaction" stroke="#f59e0b" fill="#f59e0b60" />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "branches" && (
              <motion.div
                key="branches"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {branchData.map((branch, idx) => (
                  <motion.div key={idx} className={card} whileHover={{ y: -5 }}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{branch.name}</h3>
                        <p className="text-gray-500 text-sm">Since {branch.established}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${branch.growth >= 15 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        ↑ {branch.growth}%
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-500 text-xs">Sales</p>
                        <p className="text-2xl font-bold text-gray-800">₹{(branch.sales / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Customers</p>
                        <p className="text-2xl font-bold text-gray-800">{branch.customers.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Satisfaction</p>
                        <p className="text-2xl font-bold text-gray-800">{branch.satisfaction}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Share</p>
                        <p className="text-2xl font-bold text-gray-800">{branch.value}%</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBranchClick(branch)}
                      className="w-full py-2 bg-gray-100 rounded-xl text-sm hover:bg-gray-200 transition text-gray-700"
                    >
                      View Details
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "products" && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {categorySummary.map((cat, idx) => (
                    <div key={idx} className={card}>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-gray-800">{cat.category}</h3>
                        <span className="text-emerald-600 text-sm">↑ {cat.growth}%</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">₹{(cat.totalRevenue / 100000).toFixed(1)}L</p>
                      <p className="text-xs text-gray-500 mt-1">{cat.totalUnits.toLocaleString()} units</p>
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs">
                        <span className="text-gray-500">Avg: ₹{cat.avgPrice}</span>
                        <span className="text-gray-500">Share: {Math.round((cat.totalRevenue / 7237550) * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <motion.div className={card}>
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-bold text-gray-800">Product Inventory</h2>
                    <button className="text-sm text-indigo-600">Add +</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-gray-100">
                        <tr className="text-left text-gray-500 text-xs">
                          <th className="pb-3">Product</th>
                          <th className="pb-3">Category</th>
                          <th className="pb-3">Price</th>
                          <th className="pb-3">Stock</th>
                          <th className="pb-3">Sold</th>
                          <th className="pb-3">Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productDetails.slice(0, 6).map((product) => (
                          <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                            <td className="py-3 font-medium text-gray-800 text-sm">{product.name}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                product.category === 'Electronics' ? 'bg-indigo-100 text-indigo-700' :
                                product.category === 'Clothing' ? 'bg-emerald-100 text-emerald-700' :
                                'bg-amber-100 text-amber-700'
                              }`}>
                                {product.category}
                              </span>
                            </td>
                            <td className="py-3 text-gray-700 text-sm">₹{product.price}</td>
                            <td className="py-3">
                              <span className={product.stock < 100 ? 'text-rose-600 font-medium text-sm' : 'text-gray-700 text-sm'}>
                                {product.stock}
                              </span>
                            </td>
                            <td className="py-3 text-gray-700 text-sm">{product.sold.toLocaleString()}</td>
                            <td className="py-3 font-semibold text-gray-800 text-sm">₹{(product.revenue / 1000).toFixed(0)}K</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "reports" && (
              <motion.div
                key="reports"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <motion.div className={card}>
                  <h2 className="text-lg font-bold mb-5 text-gray-800">Quarterly Performance</h2>
                  <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart data={quarterlyReports}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="quarter" stroke="#94a3b8" />
                      <YAxis yAxisId="left" stroke="#94a3b8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="sales" fill="#6366f1" name="Sales" />
                      <Bar yAxisId="left" dataKey="profit" fill="#10b981" name="Profit" />
                      <ReLine yAxisId="right" dataKey="customers" stroke="#f59e0b" strokeWidth={2} name="Customers" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </motion.div>

                <motion.div className={card}>
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-bold text-gray-800">Recent Transactions</h2>
                    <button className="text-sm text-indigo-600">Export</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-gray-100">
                        <tr className="text-left text-gray-500 text-xs">
                          <th className="pb-3">Date</th>
                          <th className="pb-3">Invoice</th>
                          <th className="pb-3">Customer</th>
                          <th className="pb-3">Amount</th>
                          <th className="pb-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesReports.map((report) => (
                          <tr key={report.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                            <td className="py-3 text-gray-600 text-sm">{report.date}</td>
                            <td className="py-3 font-mono text-sm text-gray-700">{report.invoiceNo}</td>
                            <td className="py-3 text-gray-800 text-sm">{report.customer}</td>
                            <td className="py-3 font-semibold text-gray-800 text-sm">₹{report.amount.toLocaleString()}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                report.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                                report.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                'bg-rose-100 text-rose-700'
                              }`}>
                                {report.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs">
              <p>© 2024 Sales Analytics | Updated {new Date().toLocaleDateString()}</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-gray-600 transition">Privacy</a>
                <a href="#" className="hover:text-gray-600 transition">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <Modal isOpen={showExport} onClose={() => setShowExport(false)} title="Export Report">
        <div className="space-y-4">
          <p className="text-gray-600">Select format:</p>
          <div className="grid grid-cols-2 gap-3">
            {["PDF", "Excel", "CSV"].map((format) => (
              <button key={format} className="flex items-center justify-center gap-2 p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition text-gray-700">
                <Download size={16} />
                {format}
              </button>
            ))}
          </div>
        </div>
      </Modal>

      <Modal isOpen={showBranchDetails} onClose={() => setShowBranchDetails(false)} title={`${selectedBranchDetail?.name} Details`}>
        {selectedBranchDetail && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <DollarSign className="mx-auto mb-2 text-emerald-600" size={24} />
                <p className="text-gray-500 text-xs">Sales</p>
                <p className="text-xl font-bold text-gray-800">₹{(selectedBranchDetail.sales / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <TrendingUp className="mx-auto mb-2 text-indigo-600" size={24} />
                <p className="text-gray-500 text-xs">Growth</p>
                <p className="text-xl font-bold text-emerald-600">+{selectedBranchDetail.growth}%</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Users className="mx-auto mb-2 text-purple-600" size={24} />
                <p className="text-gray-500 text-xs">Customers</p>
                <p className="text-xl font-bold text-gray-800">{selectedBranchDetail.customers.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Star className="mx-auto mb-2 text-amber-600" size={24} />
                <p className="text-gray-500 text-xs">Satisfaction</p>
                <p className="text-xl font-bold text-gray-800">{selectedBranchDetail.satisfaction}%</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600"><strong>Manager:</strong> {selectedBranchDetail.manager}</p>
            </div>
            <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white text-sm font-medium">
              Print Report
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Evaluations;