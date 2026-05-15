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
    alert(`Action: Delete request triggered for "${title}"`);
  };

  const filteredPromotions = initialPromotions.filter(promo => {
    const matchesSearch = promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.discount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || promo.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-[#09090d] text-gray-200 p-6 md:p-2 font-sans">

      {/* Upgraded Engaging Professional Controls Layout Section */}
      <div className="bg-[#111116] border border-white/[0.04] rounded-2xl p-5 mb-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-white/[0.04]">

          {/* Enhanced Search Input */}
          <div className="relative w-full sm:w-80 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#161620] border border-white/[0.05] focus:border-blue-500/80 focus:bg-[#181826] rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-gray-200 placeholder-gray-600 outline-none transition-all shadow-inner"
            />
          </div>

          {/* Add Promotion Button */}
          <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
            <button
              onClick={() => openModal('Add')}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20 active:scale-98 w-full sm:w-auto"
            >
              <Plus size={16} className="stroke-[2.5]" /> Add Promotion
            </button>
          </div>
        </div>

        {/* Upgraded Premium Filter Tabs Row with Vibrant Active States */}
        <div className="flex items-center overflow-x-auto gap-2 pt-4 custom-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap rounded-lg border transition-all duration-200 ${activeTab === tab
                ? 'bg-gradient-to-r from-blue-600/15 to-indigo-600/15 text-blue-400 border-blue-500/40 shadow-md shadow-blue-500/5'
                : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/[0.02]'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Upgraded Premium Card Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromotions.length > 0 ? (
          filteredPromotions.map((promo) => {
            // Pick side border color based on status dynamically
            const statusConfig =
              promo.status === 'Live' ? { border: 'border-l-emerald-500', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' } :
                promo.status === 'Ending Soon' ? { border: 'border-l-amber-500', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20' } :
                  promo.status === 'Scheduled' ? { border: 'border-l-blue-500', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' } :
                    { border: 'border-l-gray-600', badge: 'bg-gray-800 text-gray-500 border-transparent' };

            return (
              <div
                key={promo.id}
                className={`relative bg-[#13131a]/60 backdrop-blur-md border border-white/[0.04] ${statusConfig.border} border-l-4 rounded-xl p-5 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:bg-[#161622]/80 transition-all duration-200 group`}
              >
                <div>
                  {/* Top Header Row inside Card */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    {/* Uniform clean style for all categories */}
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-white/[0.03] text-gray-400 px-2 py-1 rounded-md border border-white/[0.02]">
                      <Tag size={11} className="text-yellow-400" />
                      {promo.category}
                    </span>

                    <span className={`text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded border ${statusConfig.badge}`}>
                      {promo.status}
                    </span>
                  </div>

                  {/* Promotion Main Titles */}
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500 tracking-wide uppercase">{promo.title}</p>
                    <h2 className="text-2xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors duration-200">
                      {promo.discount}
                    </h2>
                  </div>
                </div>

                {/* Separator Line */}
                <div className="w-full h-[1px] bg-white/[0.03] my-4" />

                {/* Footer Section */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar size={13} className="text-gray-600" />
                    <span>Valid till: <span className="text-gray-400 font-medium">{promo.validTill}</span></span>
                  </div>

                  {/* Actions Utility Grid with consistent colored buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openModal('Edit', promo.title)}
                      className="p-1.5 bg-[#181824] hover:bg-amber-500/10 border border-white/[0.04] text-gray-400 hover:text-amber-400 rounded-md transition-all"
                      title="Edit Campaign"
                    >
                      <Edit3 size={13} className='text-green-400' />
                    </button>
                    <button
                      onClick={() => handleDelete(promo.title)}
                      className="p-1.5 bg-[#181824] hover:bg-red-500/10 border border-white/[0.04] text-gray-400 hover:text-red-400 rounded-md transition-all"
                      title="Remove Campaign"
                    >
                      <Trash2 size={13} className='text-red-400' />
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        ) : (
          <div className="col-span-full py-16 bg-[#121218]/50 border border-dashed border-gray-800 rounded-xl text-center text-sm text-gray-500">
            No active campaigns found matching the filters.
          </div>
        )}
      </div>

      {/* Simple Standard Popup Modal Frame */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#13131a] border border-white/[0.06] w-full max-w-md rounded-xl shadow-2xl overflow-hidden">

            <div className="flex items-center justify-between p-5 border-b border-gray-800/60">
              <h3 className="text-md font-bold text-white flex items-center gap-2">
                {modalType === 'Add' ? <Gift size={16} className="text-blue-500" /> : <Layers size={16} className="text-blue-500" />}
                {modalType === 'Add' ? 'Create New Promotion' : 'Edit Promotion'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Campaign Name</label>
                <input
                  type="text"
                  placeholder="e.g., Year End Bash"
                  defaultValue={modalType === 'Edit' ? selectedPromoTitle : ''}
                  required
                  className="w-full bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-gray-200 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Offer / Discount</label>
                  <input
                    type="text"
                    placeholder="e.g., 30% OFF"
                    required
                    className="w-full bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-gray-200 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Category</label>
                  <input
                    type="text"
                    placeholder="e.g., Footwear"
                    required
                    className="w-full bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-gray-200 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Expiry Date</label>
                  <input
                    type="date"
                    required
                    className="w-full bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-gray-300 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">Status</label>
                  <select className="w-full bg-gray-900/50 border border-gray-800 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-gray-300 outline-none transition-all cursor-pointer">
                    <option>Live</option>
                    <option>Scheduled</option>
                    <option>Ending Soon</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-800/60 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-blue-600/10"
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
