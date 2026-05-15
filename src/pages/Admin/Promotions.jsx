import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Gift,
  Calendar,
  Tag,
  Trash2,
  Pencil,
  TrendingUp,
  Percent,
  Plus,
  X,
  BadgeDollarSign,
  Sparkles,
  CheckCircle2,
  Filter,
  CircleDollarSign,
  ShoppingBag,
  TicketPercent,
  BarChart3,
} from "lucide-react";

const Promotions = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [activeFilter, setActiveFilter] =
    useState("All Promotions");

  const promotions = [
    {
      id: 1,
      title: "Festival Sale",
      discount: "20% OFF",
      status: "Active",
      validity: "10 Jun - 20 Jun",
      category: "Festival",
      type: "Festival",
      gradient: "from-blue-500 via-cyan-500 to-sky-500",
      badge: "bg-emerald-400",
    },

    {
      id: 2,
      title: "Weekend Offer",
      discount: "Buy 1 Get 1",
      status: "Expired",
      validity: "1 Jun - 5 Jun",
      category: "Groceries",
      type: "Expired",
      gradient: "from-orange-400 via-amber-400 to-yellow-400",
      badge: "bg-red-400",
    },

    {
      id: 3,
      title: "Mega Cashback",
      discount: "₹500 Cashback",
      status: "Active",
      validity: "15 Jun - 30 Jun",
      category: "Fashion",
      type: "Cashback",
      gradient: "from-emerald-400 via-teal-400 to-cyan-400",
      badge: "bg-emerald-400",
    },

    {
      id: 4,
      title: "Diwali Blast",
      discount: "40% OFF",
      status: "Active",
      validity: "1 Nov - 10 Nov",
      category: "Festival",
      type: "Festival",
      gradient: "from-pink-500 via-rose-500 to-orange-400",
      badge: "bg-emerald-400",
    },

    {
      id: 5,
      title: "Cashback Mania",
      discount: "₹1000 Cashback",
      status: "Active",
      validity: "5 Jul - 25 Jul",
      category: "Cashback",
      type: "Cashback",
      gradient: "from-violet-500 via-fuchsia-500 to-pink-500",
      badge: "bg-emerald-400",
    },
  ];

  const filters = [
    "All Promotions",
    "Active",
    "Expired",
    "Cashback",
    "Festival",
  ];

  // FILTER LOGIC
  const filteredPromotions = promotions.filter((promo) => {
    if (activeFilter === "All Promotions") return true;

    if (activeFilter === "Active")
      return promo.status === "Active";

    if (activeFilter === "Expired")
      return promo.status === "Expired";

    if (activeFilter === "Cashback")
      return promo.type === "Cashback";

    if (activeFilter === "Festival")
      return promo.type === "Festival";

    return true;
  });

  // FILTER UI DATA
  const getFilterInfo = () => {
    switch (activeFilter) {
      case "Active":
        return {
          title: "Active Promotions",
          description:
            "Currently running promotions in your billing software.",
          value: "12 Running",
          color: "text-blue-600",
          bg: "bg-blue-100",
        };

      case "Expired":
        return {
          title: "Expired Promotions",
          description:
            "Offers that are no longer available.",
          value: "5 Expired",
          color: "text-orange-500",
          bg: "bg-orange-100",
        };

      case "Cashback":
        return {
          title: "Cashback Campaigns",
          description:
            "Cashback offers boosting customer purchases.",
          value: "₹12K Cashback",
          color: "text-emerald-600",
          bg: "bg-emerald-100",
        };

      case "Festival":
        return {
          title: "Festival Offers",
          description:
            "Special festive discounts and seasonal sales.",
          value: "8 Festival Deals",
          color: "text-pink-600",
          bg: "bg-pink-100",
        };

      default:
        return {
          title: "All Promotions",
          description:
            "Overview of all campaigns and promotions.",
          value: "25 Total Promotions",
          color: "text-cyan-600",
          bg: "bg-cyan-100",
        };
    }
  };

  const filterInfo = getFilterInfo();

  const handleCreateOffer = () => {
    setShowModal(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50 p-6 overflow-hidden">
      <div className="max-w-[1700px] mx-auto">
        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 rounded-2xl shadow-lg">
              <Gift className="text-white" size={24} />
            </div>

            <div>
              <h1 className="text-5xl font-black text-slate-800 tracking-tight">
                Promotions & Offers
              </h1>

              <p className="text-slate-500 text-base mt-1 font-medium">
                Manage marketing campaigns and smart discounts
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-7 py-4 rounded-2xl shadow-xl flex items-center gap-3 text-lg font-semibold"
          >
            <Plus size={18} />
            Create Promotion
          </button>
        </div>

        {/* FILTER BOX */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-4 rounded-2xl">
              <Filter className="text-blue-600" size={20} />
            </div>

            <h2 className="text-3xl font-black text-slate-700">
              Promotion Filters
            </h2>
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap gap-4 mb-8">
            {filters.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(item)}
                className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  activeFilter === item
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* DYNAMIC UI */}
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${filterInfo.bg} rounded-3xl p-6 border border-white/50`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h2
                  className={`text-3xl font-black ${filterInfo.color}`}
                >
                  {filterInfo.title}
                </h2>

                <p className="text-slate-600 mt-2 text-base">
                  {filterInfo.description}
                </p>
              </div>

              <div className="bg-white px-8 py-5 rounded-3xl shadow-lg">
                <h3
                  className={`text-4xl font-black ${filterInfo.color}`}
                >
                  {filterInfo.value}
                </h3>

                <p className="text-slate-400 text-sm mt-1">
                  Live Promotion Data
                </p>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-500">
                  Promotion Performance
                </span>

                <span
                  className={`text-sm font-bold ${filterInfo.color}`}
                >
                  82%
                </span>
              </div>

              <div className="w-full bg-white h-4 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "82%" }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* PROMOTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredPromotions.map((promo) => (
            <motion.div
              key={promo.id}
              whileHover={{ y: -8 }}
              className={`bg-gradient-to-br ${promo.gradient} rounded-[32px] p-6 shadow-2xl text-white relative overflow-hidden`}
            >
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>

              {/* TOP */}
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-md">
                  <Gift size={24} />
                </div>

                <span
                  className={`${promo.badge} px-4 py-2 rounded-full text-xs font-bold`}
                >
                  {promo.status}
                </span>
              </div>

              {/* CONTENT */}
              <div className="relative z-10">
                <h2 className="text-4xl font-black leading-tight mb-3">
                  {promo.title}
                </h2>

                <p className="text-2xl font-bold mb-8 opacity-95">
                  {promo.discount}
                </p>

                <div className="space-y-3 text-sm mb-8 opacity-95">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {promo.validity}
                  </div>

                  <div className="flex items-center gap-2">
                    <Tag size={16} />
                    {promo.category}
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-white text-slate-800 py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm shadow-lg">
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button className="flex-1 bg-red-500 py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm shadow-lg">
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CREATE MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="bg-white w-full max-w-xl rounded-[36px] p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 bg-slate-100 hover:bg-slate-200 p-3 rounded-2xl"
              >
                <X size={18} className="text-slate-700" />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 rounded-2xl">
                  <Sparkles className="text-white" size={22} />
                </div>

                <div>
                  <h2 className="text-4xl font-black text-slate-800">
                    Create Promotion
                  </h2>

                  <p className="text-slate-500 text-base mt-1">
                    Add a new campaign or offer
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Promotion Title"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-base text-slate-700 outline-none"
                />

                <input
                  type="text"
                  placeholder="Discount / Cashback"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-base text-slate-700 outline-none"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-700 outline-none"
                  />

                  <input
                    type="date"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-700 outline-none"
                  />
                </div>

                <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-base text-slate-700 outline-none">
                  <option>Select Category</option>
                  <option>Electronics</option>
                  <option>Groceries</option>
                  <option>Fashion</option>
                </select>

                <textarea
                  rows="4"
                  placeholder="Promotion Description"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-base text-slate-700 outline-none resize-none"
                ></textarea>

                <button
                  onClick={handleCreateOffer}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl text-lg font-bold shadow-xl flex items-center justify-center gap-3"
                >
                  <BadgeDollarSign size={20} />
                  Create Offer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SUCCESS POPUP */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -60 }}
            className="fixed top-4 right-4 z-[100]"
          >
            <div className="bg-white border border-emerald-100 shadow-2xl rounded-3xl px-5 py-4 flex items-center gap-4 min-w-[320px]">
              <div className="bg-emerald-100 p-3 rounded-2xl">
                <CheckCircle2
                  className="text-emerald-600"
                  size={24}
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Offer Created Successfully
                </h3>

                <p className="text-slate-500 text-sm mt-1">
                  Promotion added successfully.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Promotions;