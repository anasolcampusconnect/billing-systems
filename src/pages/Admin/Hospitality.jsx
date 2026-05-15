import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  Coffee,
  UtensilsCrossed,
  Hotel,
  ChefHat,
  BellRing,
  Users,
  CalendarDays,
  Star,
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  CheckCircle2,
} from "lucide-react";

const Hospitality = () => {
  const initialServices = [
    {
      id: 1,
      title: "Restaurant Booking",
      description:
        "Manage premium restaurant reservations and table bookings.",
      status: "Active",
      category: "Restaurant",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
      icon: UtensilsCrossed,
      gradient: "from-[#6D92E8] via-[#7FA1EA] to-[#9AB7F0]",
    },

    {
      id: 2,
      title: "Room Service",
      description:
        "Track luxury room orders and hospitality requests.",
      status: "Pending",
      category: "Hotel",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
      icon: Hotel,
      gradient: "from-[#E2B26E] via-[#E6BF87] to-[#EED2AA]",
    },

    {
      id: 3,
      title: "Cafe Management",
      description:
        "Handle cafe billing and customer orders efficiently.",
      status: "Active",
      category: "Cafe",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
      icon: Coffee,
      gradient: "from-[#63C9B7] via-[#7AD5C4] to-[#9BE2D5]",
    },

    {
      id: 4,
      title: "Chef Scheduling",
      description:
        "Assign chefs and monitor kitchen operations smoothly.",
      status: "Inactive",
      category: "Kitchen",
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1200&auto=format&fit=crop",
      icon: ChefHat,
      gradient: "from-[#D39CC0] via-[#DFB0CE] to-[#EAC6DB]",
    },

    {
      id: 5,
      title: "Luxury Suites",
      description:
        "Manage suite bookings and premium guest services.",
      status: "Active",
      category: "Hotel",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
      icon: Hotel,
      gradient: "from-[#75A7F3] via-[#8CB8F6] to-[#A8CBFA]",
    },

    {
      id: 6,
      title: "Fine Dining",
      description:
        "Handle VIP dining reservations and guest management.",
      status: "Active",
      category: "Restaurant",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
      icon: UtensilsCrossed,
      gradient: "from-[#BB8AE8] via-[#C69AEF] to-[#D6B5F5]",
    },
  ];

  const [services, setServices] = useState(initialServices);

  const [deletedItem, setDeletedItem] = useState(null);

  const [activeFilter, setActiveFilter] = useState("All");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showSuccessPopup, setShowSuccessPopup] =
    useState(false);

  const [showDeletePopup, setShowDeletePopup] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedService, setSelectedService] =
    useState(null);

  const [editTitle, setEditTitle] = useState("");

  const [editDescription, setEditDescription] =
    useState("");

  const filters = [
    "All",
    "Restaurant",
    "Hotel",
    "Cafe",
    "Kitchen",
  ];

  const filteredServices =
    activeFilter === "All"
      ? services
      : services.filter(
          (item) => item.category === activeFilter
        );

  const handleCreateService = () => {
    setShowCreateModal(false);

    setShowSuccessPopup(true);

    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  // DELETE FUNCTION

  const handleDelete = (service) => {
    setDeletedItem(service);

    const updatedServices = services.filter(
      (item) => item.id !== service.id
    );

    setServices(updatedServices);

    setShowDeletePopup(true);

    setTimeout(() => {
      setShowDeletePopup(false);
    }, 5000);
  };

  // UNDO DELETE

  const handleUndoDelete = () => {
    if (deletedItem) {
      setServices((prev) => [...prev, deletedItem]);

      setDeletedItem(null);

      setShowDeletePopup(false);
    }
  };

  // EDIT OPEN

  const handleEditOpen = (service) => {
    setSelectedService(service);

    setEditTitle(service.title);

    setEditDescription(service.description);

    setShowEditModal(true);
  };

  // SAVE EDIT

  const handleSaveEdit = () => {
    const updatedServices = services.map((item) =>
      item.id === selectedService.id
        ? {
            ...item,
            title: editTitle,
            description: editDescription,
          }
        : item
    );

    setServices(updatedServices);

    setShowEditModal(false);

    setShowSuccessPopup(true);

    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#050816] p-4 text-white overflow-hidden relative">
      {/* BACKGROUND */}

      <div className="absolute top-0 left-0 w-[320px] h-[320px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-pink-500/10 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-3xl shadow-xl">
              <Coffee size={22} className="text-white" />
            </div>

            <div>
              <h1 className="text-4xl font-black">
                Hospitality Module
              </h1>

              <p className="text-slate-400 text-sm mt-1">
                Smart hospitality & luxury service management
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-3xl text-sm font-semibold flex items-center gap-2 shadow-lg"
          >
            <Plus size={16} />
            Add Hospitality Service
          </button>
        </div>

        {/* FILTERS */}

        <div className="bg-[#0F172A] border border-slate-700 rounded-[30px] p-5 shadow-2xl mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-cyan-500/15 p-3 rounded-2xl">
              <BellRing
                size={16}
                className="text-cyan-400"
              />
            </div>

            <h2 className="text-xl font-black">
              Hospitality Filters
            </h2>
          </div>

          <div className="bg-[#111827] border border-slate-700 rounded-3xl px-5 py-3 flex items-center gap-3 mb-5">
            <Search
              size={16}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search hospitality services..."
              className="bg-transparent outline-none text-sm text-white w-full placeholder:text-slate-500"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {filters.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(item)}
                className={`px-5 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  activeFilter === item
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "bg-[#111827] text-slate-300 hover:bg-slate-800"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredServices.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                whileHover={{
                  y: -5,
                  scale: 1.01,
                }}
                className={`bg-gradient-to-br ${service.gradient} rounded-[32px] overflow-hidden shadow-2xl h-[610px] relative`}
              >
                <div className="absolute inset-0 bg-black/12"></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* IMAGE */}

                  <div className="relative h-[50%]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"></div>

                    {/* TOP */}

                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      {/* LEFT */}

                      <div className="flex items-center gap-2">
                        <div className="bg-white/15 backdrop-blur-md p-3 rounded-3xl border border-white/20">
                          <Icon
                            size={15}
                            className="text-white"
                          />
                        </div>

                        <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-[11px] font-semibold border border-white/20">
                          {service.category}
                        </span>
                      </div>

                      {/* RIGHT ICONS */}

                      <div className="flex items-center gap-2">
                        {/* EDIT */}

                        <button
                          onClick={() =>
                            handleEditOpen(service)
                          }
                          className="w-10 h-10 rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/25 transition-all"
                        >
                          <Pencil
                            size={14}
                            className="text-white"
                          />
                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            handleDelete(service)
                          }
                          className="w-10 h-10 rounded-3xl bg-red-500/85 border border-red-300/20 flex items-center justify-center hover:bg-red-600 transition-all"
                        >
                          <Trash2
                            size={14}
                            className="text-white"
                          />
                        </button>
                      </div>
                    </div>

                    {/* STATUS */}

                    <div className="absolute bottom-4 right-4">
                      <span
                        className={`px-4 py-2 rounded-full text-[11px] font-bold shadow-lg ${
                          service.status === "Active"
                            ? "bg-green-500/90"
                            : service.status === "Pending"
                            ? "bg-orange-500/90"
                            : "bg-red-500/90"
                        }`}
                      >
                        {service.status}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="text-[2rem] leading-tight font-black mb-4">
                        {service.title}
                      </h2>

                      <p className="text-white/90 text-[0.95rem] leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* INFO BOXES */}

                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {/* STAFF */}

                      <div className="bg-black/15 backdrop-blur-md rounded-[28px] p-4 border border-white/10 h-[135px] flex flex-col justify-between">
                        <Users
                          size={16}
                          className="text-white"
                        />

                        <div>
                          <p className="text-xs text-white/70 mb-1">
                            Staff
                          </p>

                          <h4 className="text-2xl font-black">
                            15+
                          </h4>
                        </div>
                      </div>

                      {/* TIMING */}

                      <div className="bg-black/15 backdrop-blur-md rounded-[28px] p-4 border border-white/10 h-[135px] flex flex-col justify-between">
                        <CalendarDays
                          size={16}
                          className="text-white"
                        />

                        <div>
                          <p className="text-xs text-white/70 mb-1">
                            Timing
                          </p>

                          <h4 className="text-2xl font-black">
                            24/7
                          </h4>
                        </div>
                      </div>

                      {/* RATING */}

                      <div className="bg-black/15 backdrop-blur-md rounded-[28px] p-4 border border-white/10 h-[135px] flex flex-col justify-between">
                        <Star
                          size={16}
                          className="text-white"
                        />

                        <div>
                          <p className="text-xs text-white/70 mb-1">
                            Rating
                          </p>

                          <h4 className="text-2xl font-black">
                            4.8
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CREATE MODAL */}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F172A] border border-slate-700 w-full max-w-lg rounded-[34px] p-7 shadow-2xl relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-5 right-5 bg-slate-800 p-3 rounded-2xl"
            >
              <X size={16} className="text-white" />
            </button>

            <div className="flex items-center gap-4 mb-7">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-3xl">
                <Plus size={18} className="text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-white">
                  Add Hospitality Service
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Create and manage hospitality services
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Service Name"
                className="w-full bg-[#111827] border border-slate-700 rounded-3xl px-5 py-4 text-sm text-white outline-none"
              />

              <textarea
                rows="4"
                placeholder="Service Description"
                className="w-full bg-[#111827] border border-slate-700 rounded-3xl px-5 py-4 text-sm text-white outline-none resize-none"
              ></textarea>

              <button
                onClick={handleCreateService}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-3xl text-sm font-semibold shadow-lg"
              >
                Create Hospitality Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F172A] border border-slate-700 w-full max-w-lg rounded-[34px] p-7 shadow-2xl relative">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-5 right-5 bg-slate-800 p-3 rounded-2xl"
            >
              <X size={16} className="text-white" />
            </button>

            <h2 className="text-3xl font-black mb-6">
              Edit Hospitality Service
            </h2>

            <div className="space-y-5">
              <input
                type="text"
                value={editTitle}
                onChange={(e) =>
                  setEditTitle(e.target.value)
                }
                className="w-full bg-[#111827] border border-slate-700 rounded-3xl px-5 py-4 text-sm text-white outline-none"
              />

              <textarea
                rows="4"
                value={editDescription}
                onChange={(e) =>
                  setEditDescription(e.target.value)
                }
                className="w-full bg-[#111827] border border-slate-700 rounded-3xl px-5 py-4 text-sm text-white outline-none resize-none"
              ></textarea>

              <button
                onClick={handleSaveEdit}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-3xl text-sm font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}

      {showSuccessPopup && (
        <div className="fixed top-6 right-6 bg-[#0F172A] border border-green-500/40 px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-4 z-50">
          <CheckCircle2
            className="text-green-400"
            size={20}
          />

          <div>
            <h3 className="font-bold text-white text-sm">
              Changes Saved
            </h3>

            <p className="text-slate-400 text-xs">
              Hospitality service updated successfully
            </p>
          </div>
        </div>
      )}

      {/* DELETE POPUP */}

      {showDeletePopup && (
        <div className="fixed bottom-6 right-6 bg-[#0F172A] border border-red-500/30 px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-5 z-50">
          <div>
            <h3 className="font-bold text-white text-sm">
              Service Deleted
            </h3>

            <p className="text-slate-400 text-xs">
              You can undo this action
            </p>
          </div>

          <button
            onClick={handleUndoDelete}
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-2xl text-xs font-bold"
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
};

export default Hospitality;