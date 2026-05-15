import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // --- LOGIN LOGIC ---
  const handleLogin = (e) => {
    e.preventDefault();
    const checkUser = username.trim().toLowerCase();
    const checkPass = password.trim();

    // Current Credentials
    if (checkUser === 'admin' && checkPass === 'admin123') {
      navigate('/admin');
    } else if (checkUser === 'staff' && checkPass === 'staff123') {
      navigate('/staff');
    } else {
      setError('Invalid Username or Password!');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden bg-gray-900">

      {/* --- NEW BACKGROUND IMAGE (Generic Retail/Billing Theme) --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1920&auto=format&fit=crop')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </motion.div>

      {/* --- BRANDING AREA (Generic Names) --- */}
      <div className="hidden lg:flex absolute top-[35%] left-[10%] flex-col items-start z-10">
        <div className="bg-blue-600 p-4 rounded-2xl mb-6 shadow-2xl">
           <Store size={60} className="text-white" />
        </div>
        <h1 className="text-white text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
          RETAIL<span className="text-blue-500">MASTER</span>
        </h1>
        <p className="text-gray-300 text-2xl tracking-widest font-light mt-2 drop-shadow-md">
          SMART BILLING SOLUTION
        </p>
        <div className="h-1 w-24 bg-blue-500 mt-6"></div>
      </div>

      {/* --- LOGIN FORM PANEL --- */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full md:w-[450px] h-screen ml-auto bg-black/40 backdrop-blur-xl flex flex-col justify-center px-10 md:px-14 shadow-2xl border-l border-white/10"
      >
        <div className="w-full max-w-sm mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
          <p className="text-gray-400 mb-10 text-sm">Access your billing dashboard</p>

          {error && (
            <div className="text-red-400 mb-6 text-sm font-medium bg-red-900/30 p-3 rounded-lg border border-red-500/20">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 text-xs font-semibold uppercase tracking-wider">Username</label>
              <input
                type="text"
                placeholder="Admin or Staff"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 text-white rounded-lg px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-white/10"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-300 mb-2 text-xs font-semibold uppercase tracking-wider">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 text-white rounded-lg px-4 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-white/10"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-[38px] text-gray-500 hover:text-white transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest rounded-lg px-4 py-4 mt-4 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              SIGN IN
            </button>
          </form>

          <p className="mt-12 text-center text-gray-500 text-[10px] uppercase tracking-[0.2em]">
            System Version 2.0.1 <br /> Secure Enterprise Access
          </p>
        </div>
      </motion.div>
    </div>
  );
}