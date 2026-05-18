import React, { useState } from 'react';
import { Search, Plus, Calendar, Tag, Edit3, Trash2, X, Gift, Layers } from 'lucide-react';

const PromotionsManagement = () => {
  // Static Dummy Data
  const initialPromotions = [
    { id: 1, title: "Midnight Flash Sale", discount: "Flat ₹500 OFF", category: "Electronics", validTill: "18 May 2026", status: "Live" },
    { id: 2, title: "Weekend Fashion Bonanza", discount: "20% OFF", category: "Apparel", validTill: "17 May 2026", status: "Ending Soon" },
    { id: 3, title: "Monsoon BOGO Treat", discount: "Buy 1 Get 1", category: "Groceries", validTill: "30 May 2026", status: "Scheduled" },
    { id: 5, title: "First Users Welcome Pack", discount: "Flat ₹150 OFF", category: "All Categories", validTill: "31 June 2026", status: "Live" }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Add');
  const [selectedPromoTitle, setSelectedPromoTitle] = useState('');

  const tabs = ['All', 'Live', 'Ending Soon', 'Scheduled', 'Expired'];

  const openModal = (type, title = '') => {
    setModalType(type);
    setSelectedPromoTitle(title);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert(`Success: Promotion details saved successfully!`);
  };

  const handleDelete = (title) => {
    if(window.confirm(`Are you sure you want to delete "${title}"?`)) {
       alert(`Action: Delete request triggered for "${title}"`);
    }
  };

  const filteredPromotions = initialPromotions.filter(promo => {
    const matchesSearch = promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.discount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || promo.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 font-plus-jakarta pb-20 p-4 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-[18px] bg-blue-50 flex items-center justify-center border border-blue-100">
              <Gift size={26} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800">Promotions</h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">Manage campaigns, offers, and sales</p>
            </div>
          </div>
          <button
            onClick={() => openModal('Add')}
            className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-6 py-3 rounded-[16px] font-bold flex items-center gap-2 text-sm shadow-lg shadow-blue-600/20"
          >
            <Plus size={18} strokeWidth={3} /> ADD PROMOTION
          </button>
        </div>
      </div>

      {/* COMMAND TOOLBAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm mb-6">
        {/* Search Box */}
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 font-medium transition-all"
          />
        </div>

        {/* Table Tab Filters */}
        <div className="flex items-center overflow-x-auto gap-2 custom-scrollbar pb-1 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest whitespace-nowrap rounded-xl border transition-all duration-200 ${activeTab === tab
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                : 'text-slate-500 border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-700'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* PROMOTION CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromotions.length > 0 ? (
          filteredPromotions.map((promo) => {
            const statusConfig =
              promo.status === 'Live' ? { border: 'border-l-emerald-500', badge: 'bg-emerald-50 text-emerald-600 border-emerald-100' } :
                promo.status === 'Ending Soon' ? { border: 'border-l-amber-500', badge: 'bg-amber-50 text-amber-600 border-amber-100' } :
                  promo.status === 'Scheduled' ? { border: 'border-l-blue-500', badge: 'bg-blue-50 text-blue-600 border-blue-100' } :
                    { border: 'border-l-slate-400', badge: 'bg-slate-100 text-slate-600 border-slate-200' };

            return (
              <div
                key={promo.id}
                className={`bg-white border border-slate-200 ${statusConfig.border} border-l-4 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
              >
                <div>
                  {/* Top Header Row inside Card */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-slate-50 text-slate-500 px-3 py-1.5 rounded-lg border border-slate-100">
                      <Tag size={12} className="text-amber-500" />
                      {promo.category}
                    </span>

                    <span className={`text-[9px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border ${statusConfig.badge}`}>
                      {promo.status}
                    </span>
                  </div>

                  {/* Promotion Main Titles */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{promo.title}</p>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors duration-200">
                      {promo.discount}
                    </h2>
                  </div>
                </div>

                {/* Separator Line */}
                <div className="w-full h-[1px] bg-slate-100 my-5" />

                {/* Footer Section */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    <Calendar size={14} className="text-blue-500" />
                    <span>Valid till: <span className="text-slate-700">{promo.validTill}</span></span>
                  </div>

                  {/* Actions Utility Grid */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal('Edit', promo.title)}
                      className="p-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-400 hover:text-blue-600 rounded-xl transition-all shadow-sm"
                      title="Edit Campaign"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(promo.title)}
                      className="p-2 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-400 hover:text-rose-600 rounded-xl transition-all shadow-sm"
                      title="Remove Campaign"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-20 bg-white rounded-[32px] border border-dashed border-slate-200 text-center">
            <Gift size={48} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-lg font-black text-slate-400 uppercase tracking-widest">No matching campaigns found</h3>
          </div>
        )}
      </div>

      {/* CREATE / EDIT PROMOTION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl">

            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                {modalType === 'Add' ? <Gift size={20} className="text-blue-600" /> : <Layers size={20} className="text-blue-600" />}
                {modalType === 'Add' ? 'Create New Promotion' : 'Edit Promotion'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 bg-white p-2 rounded-full border border-slate-200 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Campaign Name</label>
                <input
                  type="text"
                  placeholder="e.g., Year End Bash"
                  defaultValue={modalType === 'Edit' ? selectedPromoTitle : ''}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Offer / Discount</label>
                  <input
                    type="text"
                    placeholder="e.g., 30% OFF"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Category</label>
                  <input
                    type="text"
                    placeholder="e.g., Footwear"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Expiry Date</label>
                  <input
                    type="date"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Status</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all cursor-pointer">
                    <option>Live</option>
                    <option>Scheduled</option>
                    <option>Ending Soon</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-end gap-3 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-blue-600/20"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default PromotionsManagement;
