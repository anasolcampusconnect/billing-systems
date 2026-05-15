import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, LayoutGrid, List, Filter, Edit3, Trash2, 
  X, AlertTriangle, ShoppingBag, TrendingUp,
  ArrowUpRight, CheckCircle2, Package
} from 'lucide-react';

const Products = () => {
  // --- 1. STATE MANAGEMENT ---
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 15 Diverse Products Data
  const [products, setProducts] = useState([
    { id: 'PRD-001', name: 'Premium Basmati Rice 5kg', group: 'Grocery', price: 850, stock: 120, status: 'Active', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-002', name: 'Sunflower Oil 1L', group: 'Grocery', price: 145, stock: 4, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-003', name: 'Wireless Mouse', group: 'Electronics', price: 499, stock: 15, status: 'Active', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-004', name: 'Almonds 500g', group: 'Dry Fruits', price: 450, stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1508061461508-cb18c242f556?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-005', name: 'Organic Honey 250g', group: 'Grocery', price: 320, stock: 45, status: 'Active', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-006', name: 'Cashew Nuts 250g', group: 'Dry Fruits', price: 380, stock: 60, status: 'Active', image: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-007', name: 'Whole Wheat Flour 5kg', group: 'Grocery', price: 290, stock: 8, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-008', name: 'Dishwashing Liquid 500ml', group: 'Household', price: 115, stock: 25, status: 'Active', image: 'https://images.unsplash.com/photo-1584622781564-1d9876a1ef3d?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-009', name: 'LED Bulb 9W', group: 'Electronics', price: 99, stock: 50, status: 'Active', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-010', name: 'Green Tea 25 Bags', group: 'Grocery', price: 210, stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-011', name: 'Pasta Penne 500g', group: 'Grocery', price: 85, stock: 35, status: 'Active', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-012', name: 'Dark Chocolate Bar', group: 'Snacks', price: 120, stock: 12, status: 'Active', image: 'https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-013', name: 'Toilet Cleaner 750ml', group: 'Household', price: 165, stock: 5, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-014', name: 'USB-C Charging Cable', group: 'Electronics', price: 299, stock: 100, status: 'Active', image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-015', name: 'Smart Watch Z2', group: 'Electronics', price: 2499, stock: 18, status: 'Active', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400' },
  ]);

  const [formData, setFormData] = useState({ name: '', group: 'Grocery', price: '', stock: '', image: '' });

  // --- 2. FILTER & SEARCH LOGIC ---
  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(query) || p.id.toLowerCase().includes(query);
      const matchesGroup = activeFilter === 'All' || p.group === activeFilter;
      return matchesSearch && matchesGroup;
    });
  }, [products, searchTerm, activeFilter]);

  const metrics = useMemo(() => {
    const low = products.filter(p => p.stock < 10 && p.stock > 0).length;
    const empty = products.filter(p => p.stock === 0).length;
    const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
    return { low, empty, totalValue };
  }, [products]);

  const categories = ['All', 'Grocery', 'Electronics', 'Clothing', 'Snacks', 'Household', 'Dry Fruits'];

  const handleSave = (e) => {
    e.preventDefault();
    const stockNum = parseInt(formData.stock) || 0;
    const priceNum = parseFloat(formData.price) || 0;
    let status = 'Active';
    if (stockNum === 0) status = 'Out of Stock';
    else if (stockNum < 10) status = 'Low Stock';

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData, price: priceNum, stock: stockNum, status } : p));
    } else {
      const newProduct = {
        ...formData,
        id: `PRD-0${products.length + 101}`,
        price: priceNum, stock: stockNum, status,
        image: formData.image || 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=400'
      };
      setProducts([newProduct, ...products]);
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      setProducts(products.filter(p => p.id !== id));
      setActiveDropdown(null);
    }
  };

  const ProductImage = ({ src, alt }) => {
    const [error, setError] = useState(false);
    return (
      <div className="w-full h-full bg-[#12121a] flex items-center justify-center">
        {!error ? (
          <img src={src} alt={alt} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[1.5s]" onError={() => setError(true)} />
        ) : (
          <div className="flex flex-col items-center text-gray-700 opacity-50"><Package size={40} /><span className="text-[8px] uppercase tracking-widest mt-2 font-bold">No Visual</span></div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-10" onClick={() => activeDropdown && setActiveDropdown(null)}>
      
      {/* 1. METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#1a1a24] p-6 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="flex items-center gap-4 text-blue-500 mb-2"><ShoppingBag size={22}/> <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Catalog</span></div>
          <h3 className="text-3xl font-black text-white">{products.length}</h3>
        </div>
        <div className="bg-[#1a1a24] p-6 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-4 text-red-500 mb-2"><AlertTriangle size={22}/> <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Alerts</span></div>
          <h3 className="text-3xl font-black text-white">{metrics.low + metrics.empty}</h3>
        </div>
        <div className="bg-[#1a1a24] p-6 rounded-3xl border border-white/5 shadow-2xl md:col-span-2 relative overflow-hidden group">
          <div className="flex items-center gap-4 text-emerald-500 mb-2"><TrendingUp size={22}/> <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Total Valuation</span></div>
          <h3 className="text-3xl font-black text-white font-mono">₹{metrics.totalValue.toLocaleString('en-IN')}</h3>
        </div>
      </div>

      {/* 2. PREMIUM TOOLBAR - EXACT MATCH TO YOUR IMAGE */}
      <div className="bg-[#14141c]/90 backdrop-blur-2xl p-4 rounded-[32px] border border-white/10 flex flex-col lg:flex-row justify-between items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)] sticky top-2 z-30">
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          {/* View Toggles */}
          <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/10 shadow-inner">
            <button 
              onClick={() => setViewMode('grid')} 
              className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('table')} 
              className={`p-2.5 rounded-xl transition-all ${viewMode === 'table' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <List size={20} />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 min-w-[320px] group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search SKU, Name or Category..." 
              className="w-full bg-black/50 border border-white/5 rounded-2xl pl-12 pr-12 py-3 text-white text-sm focus:border-blue-500/50 outline-none transition-all focus:bg-black/70 shadow-inner" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            <select 
              className="bg-black/50 border border-white/5 rounded-2xl pl-11 pr-10 py-3 text-white text-sm outline-none cursor-pointer font-bold appearance-none hover:bg-black/70 transition-all shadow-inner" 
              value={activeFilter} 
              onChange={(e) => setActiveFilter(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Add Product Button */}
        <button 
          onClick={() => { setEditingProduct(null); setFormData({name:'', group:'Grocery', price:'', stock:'', image:''}); setShowModal(true); }} 
          className="w-full lg:w-auto bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-3.5 rounded-2xl flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(37,99,235,0.3)] border border-white/10 active:scale-95 transition-all"
        >
          <Plus size={22} strokeWidth={3} /> ADD PRODUCT
        </button>
      </div>

      {/* 3. PRODUCT AREA */}
      <AnimatePresence mode='wait'>
        {filteredProducts.length > 0 ? (
          viewMode === 'grid' ? (
            <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(p => (
                <motion.div key={p.id} layout className="bg-[#1a1a24] rounded-[40px] border border-white/5 overflow-hidden group shadow-2xl relative transition-all duration-300 hover:border-blue-500/30">
                  <div className="h-56 relative overflow-hidden">
                    <ProductImage src={p.image} alt={p.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a24] via-transparent to-transparent opacity-80"></div>
                    <div className="absolute top-5 left-5"><span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] backdrop-blur-xl border shadow-lg ${p.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : p.status === 'Low Stock' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>{p.status}</span></div>
                    <div className="absolute top-5 right-5 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                      <button onClick={() => { setEditingProduct(p); setFormData({name: p.name, group: p.group, price: p.price, stock: p.stock, image: p.image}); setShowModal(true); }} className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl text-white border border-white/10 shadow-xl"><Edit3 size={18}/></button>
                      <button onClick={() => handleDelete(p.id)} className="p-3 bg-red-500/10 hover:bg-red-500/20 backdrop-blur-xl rounded-2xl text-red-500 border border-red-500/10 shadow-xl"><Trash2 size={18}/></button>
                    </div>
                    <div className="absolute bottom-6 left-8 text-3xl font-black text-white drop-shadow-2xl">₹{p.price.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="p-7 space-y-5">
                    <h4 className="text-white font-extrabold text-lg leading-tight truncate group-hover:text-blue-400 transition-colors">{p.name}</h4>
                    <div className="flex justify-between items-center pt-5 border-t border-white/5">
                      <div className="flex flex-col"><span className="text-[10px] text-gray-500 uppercase font-black tracking-tighter mb-0.5">Live Stock</span><span className={`text-base font-black ${p.stock < 10 ? 'text-amber-500' : 'text-gray-100'}`}>{p.stock} Pcs</span></div>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 shadow-inner"><ArrowUpRight size={22} className="text-gray-500 group-hover:text-white transition-all" /></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="table" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1a1a24] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/40 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  <tr><th className="p-6">Product</th><th className="p-6">Category</th><th className="p-6 text-right">Price</th><th className="p-6 text-right">Stock</th><th className="p-6 text-center">Manage</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-white/[0.03] transition-colors group">
                      <td className="p-5 flex items-center gap-5 pl-8">
                         <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-2xl border border-white/10"><ProductImage src={p.image} alt={p.name} /></div>
                         <div><p className="text-white font-extrabold text-sm group-hover:text-blue-400 transition-colors">{p.name}</p><p className="text-[10px] text-gray-500 font-mono mt-1">{p.id}</p></div>
                      </td>
                      <td className="p-5 text-gray-400 font-bold uppercase text-[11px] tracking-wide">{p.group}</td>
                      <td className="p-5 text-right font-black text-white text-base">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="p-5 text-right font-black text-gray-300 text-base">{p.stock}</td>
                      <td className="p-5 flex justify-center gap-3 relative">
                        <button onClick={() => { setEditingProduct(p); setFormData({name: p.name, group: p.group, price: p.price, stock: p.stock, image: p.image}); setShowModal(true); }} className="p-2.5 text-gray-500 hover:text-white bg-white/5 rounded-xl border border-white/5 transition-all"><Edit3 size={18}/></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2.5 text-gray-500 hover:text-red-500 bg-red-500/5 rounded-xl border border-red-500/5 transition-all"><Trash2 size={18}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )
        ) : (
          <div className="text-center py-20 bg-[#1a1a24] rounded-[40px] border-2 border-dashed border-white/5 shadow-2xl">
             <div className="bg-white/5 p-6 rounded-full w-fit mx-auto mb-6"><Search size={48} className="text-gray-600" /></div>
             <h3 className="text-2xl font-black text-white tracking-tighter">No items found</h3>
             <p className="text-gray-500 mt-2">Adjust your search or filter to find what you're looking for.</p>
          </div>
        )}
      </AnimatePresence>

      {/* 4. MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowModal(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 40 }} className="relative bg-[#1a1a24] border border-white/10 rounded-[56px] shadow-2xl w-full max-w-md p-10 z-[110] overflow-hidden">
              <div className="flex justify-between items-center mb-10"><h3 className="text-3xl font-black text-white tracking-tighter">{editingProduct ? 'Edit Details' : 'New Product'}</h3><button onClick={() => setShowModal(false)} className="bg-white/5 hover:bg-white/10 p-4 rounded-full text-white transition-all"><X size={24} /></button></div>
              <form onSubmit={handleSave} className="space-y-6">
                <input required placeholder="Product Title" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 font-bold" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input placeholder="Image URL" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" required placeholder="Price (₹)" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 font-black shadow-inner" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                  <input type="number" required placeholder="Stock" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 font-black shadow-inner" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                </div>
                <div className="space-y-2"><label className="text-[10px] uppercase font-black text-gray-500 ml-3 tracking-widest">Classification</label><select className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 font-bold shadow-inner" value={formData.group} onChange={(e) => setFormData({...formData, group: e.target.value})}>{categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-[24px] shadow-2xl shadow-blue-600/30 uppercase tracking-widest text-lg border border-white/10 mt-4 flex items-center justify-center gap-2 transition-all"><CheckCircle2 size={22}/> {editingProduct ? 'UPDATE ITEM' : 'CREATE ITEM'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;