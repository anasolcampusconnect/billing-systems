import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, LayoutGrid, List, Filter, Edit3, Trash2, 
  X, AlertTriangle, ShoppingBag, TrendingUp, Package,
  ArrowUpRight, CheckCircle2, ChevronRight
} from 'lucide-react';

const Products = () => {
  // --- 1. STATE MANAGEMENT ---
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Data from Products.jsx
  const [products, setProducts] = useState([
    { id: 'PRD-001', name: 'Premium Basmati Rice 5kg', group: 'Grocery', price: 850, stock: 120, status: 'Active', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-002', name: 'Sunflower Oil 1L', group: 'Grocery', price: 145, stock: 4, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-003', name: 'Wireless Mouse', group: 'Electronics', price: 499, stock: 15, status: 'Active', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=400' },
    { id: 'PRD-004', name: 'Almonds 500g', group: 'Dry Fruits', price: 450, stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1508061461508-cb18c242f556?auto=format&fit=crop&q=80&w=400' },
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

  // --- 3. HANDLERS ---
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
        ...formData, id: `PRD-${100 + products.length + 1}`,
        price: priceNum, stock: stockNum, status,
        image: formData.image || 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=400'
      };
      setProducts([newProduct, ...products]);
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) setProducts(products.filter(p => p.id !== id));
  };

  const ProductImage = ({ src, alt }) => {
    const [error, setError] = useState(false);
    return (
      <div className="w-full h-full bg-slate-50 flex items-center justify-center border-b border-slate-100 overflow-hidden">
        {!error ? (
          <img src={src} alt={alt} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[1s]" onError={() => setError(true)} />
        ) : (
          <div className="flex flex-col items-center text-slate-300"><Package size={40} /><span className="text-[10px] font-bold mt-2 uppercase">No Visual</span></div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 font-plus-jakarta pb-20">
      
      {/* 1. ANALYTICS STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
           <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Master Catalog</p>
              <h3 className="text-2xl font-black text-slate-800 mt-1">{products.length} <span className="text-xs text-blue-600 font-bold uppercase">SKUs</span></h3>
           </div>
           <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100"><ShoppingBag size={20}/></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
           <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Alerts</p>
              <h3 className="text-2xl font-black text-rose-600 mt-1">{metrics.low + metrics.empty}</h3>
           </div>
           <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100"><AlertTriangle size={20}/></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm md:col-span-2 flex items-center justify-between">
           <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Aggregate Valuation</p>
              <h3 className="text-2xl font-black text-emerald-600 font-mono mt-1">₹{metrics.totalValue.toLocaleString()}</h3>
           </div>
           <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100"><TrendingUp size={20}/></div>
        </div>
      </div>

      {/* 2. COMMAND TOOLBAR */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 flex flex-col lg:flex-row justify-between items-center gap-4 shadow-sm sticky top-2 z-30">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}><LayoutGrid size={18} /></button>
            <button onClick={() => setViewMode('table')} className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}><List size={18} /></button>
          </div>
          <div className="relative group min-w-[350px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search product ID, Name or Class..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 font-medium" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
        </div>
        <button onClick={() => { setEditingProduct(null); setFormData({name:'', group:'Grocery', price:'', stock:'', image:''}); setShowModal(true); }} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-100 transition-all text-xs tracking-widest">
          <Plus size={18} strokeWidth={3}/> ADD PRODUCT
        </button>
      </div>

      {/* 3. PRODUCT GRID / TABLE AREA */}
      <AnimatePresence mode='wait'>
        {filteredProducts.length > 0 ? (
          viewMode === 'grid' ? (
            <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(p => (
                <motion.div key={p.id} layout className="bg-white rounded-[32px] border border-slate-200 overflow-hidden group hover:shadow-2xl hover:border-blue-100 transition-all duration-500 relative">
                  <div className="h-52 relative">
                    <ProductImage src={p.image} alt={p.name} />
                    <div className="absolute top-4 left-4"><span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border shadow-sm ${p.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : p.status === 'Low Stock' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>{p.status}</span></div>
                    
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      <button onClick={() => { setEditingProduct(p); setFormData({...p}); setShowModal(true); }} className="p-2.5 bg-white text-blue-600 rounded-xl shadow-xl border border-slate-100 hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={16}/></button>
                      <button onClick={() => handleDelete(p.id)} className="p-2.5 bg-white text-rose-600 rounded-xl shadow-xl border border-slate-100 hover:bg-rose-600 hover:text-white transition-all"><Trash2 size={16}/></button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-slate-800 font-extrabold text-lg truncate group-hover:text-blue-600 transition-colors uppercase tracking-tight">{p.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{p.id} • {p.group}</p>
                    <div className="mt-5 pt-5 border-t border-slate-50 flex justify-between items-center">
                       <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Valuation</p>
                          <p className="text-xl font-black text-slate-800 font-mono tracking-tighter">₹{p.price.toLocaleString()}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Stock</p>
                          <p className={`text-sm font-black ${p.stock < 10 ? 'text-amber-600' : 'text-slate-600'}`}>{p.stock} Pcs</p>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-[0.15em] border-b border-slate-100">
                  <tr><th className="p-5 pl-10">Inventory Entity</th><th className="p-5">Group</th><th className="p-5 text-right">Price</th><th className="p-5 text-right">Stock</th><th className="p-5 text-center">Lifecycle</th><th className="p-5 pr-10"></th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-5 pl-10">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm"><img src={p.image} className="w-full h-full object-cover" alt=""/></div>
                            <div><p className="text-sm font-black text-slate-800 uppercase tracking-tight">{p.name}</p><p className="text-[10px] text-slate-400 font-bold font-mono">{p.id}</p></div>
                         </div>
                      </td>
                      <td className="p-5"><span className="px-2 py-0.5 rounded text-[9px] font-bold text-slate-500 uppercase border border-slate-200">{p.group}</span></td>
                      <td className="p-5 text-right font-black text-slate-800 text-sm font-mono">₹{p.price.toLocaleString()}</td>
                      <td className={`p-5 text-right font-black text-sm ${p.stock < 10 ? 'text-amber-600' : 'text-slate-600'}`}>{p.stock} Pcs</td>
                      <td className="p-5 text-center"><span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${p.status === 'Active' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>{p.status}</span></td>
                      <td className="p-5 pr-10 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setEditingProduct(p); setFormData({...p}); setShowModal(true); }} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={14}/></button>
                            <button onClick={() => handleDelete(p.id)} className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition-all"><Trash2 size={14}/></button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )
        ) : (
          <div className="p-20 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
             <Search size={48} className="mx-auto text-slate-200 mb-4" />
             <h3 className="text-lg font-black text-slate-400 uppercase tracking-widest">No matching SKUs found</h3>
          </div>
        )}
      </AnimatePresence>

      {/* 4. MODAL */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white border border-slate-200 rounded-[40px] shadow-2xl w-full max-w-md p-10 z-[110]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">{editingProduct ? 'Update SKU' : 'New Registry'}</h3>
                <button onClick={() => setShowModal(false)} className="bg-slate-50 p-3 rounded-full text-slate-400 hover:text-slate-800 transition-all"><X size={20} /></button>
              </div>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Identity Name</label>
                   <input required placeholder="Enter Product Name" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold uppercase" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Retail Val (₹)</label>
                    <input type="number" required placeholder="0.00" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 font-black" value={formData.price} onChange={(e)=>setFormData({...formData, price: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Stock Level</label>
                    <input type="number" required placeholder="0" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 font-black" value={formData.stock} onChange={(e)=>setFormData({...formData, stock: e.target.value})} />
                  </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[24px] shadow-xl uppercase tracking-widest text-xs flex items-center justify-center gap-2 mt-4 transition-all">
                   <CheckCircle2 size={18}/> DEPLOY TO CATALOG
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Products;