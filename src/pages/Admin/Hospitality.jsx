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
      gradient:
        "from-[#DCEBFF] via-[#CDE1FF] to-[#BFD7FF]",
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
      gradient:
        "from-[#FFE7CC] via-[#FFE0BD] to-[#FFD6A5]",
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
      gradient:
        "from-[#D7FFF7] via-[#CBFAF2] to-[#B6F5EA]",
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
      gradient:
        "from-[#F0D9FF] via-[#EAD0FF] to-[#E4C7FF]",
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
      gradient:
        "from-[#DFFFE9] via-[#D3FADB] to-[#C4F7D4]",
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
      gradient:
        "from-[#FFDCE8] via-[#FFD2E0] to-[#FFC6D8]",
    },
  ];

  const [services, setServices] = useState(initialServices);

  const [deletedItem, setDeletedItem] =
    useState(null);

  const [activeFilter, setActiveFilter] =
    useState("All");

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

  const [editTitle, setEditTitle] =
    useState("");

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

  // CREATE

  const handleCreateService = () => {
    setShowCreateModal(false);

    setShowSuccessPopup(true);

    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  // DELETE

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
      setServices((prev) => [
        ...prev,
        deletedItem,
      ]);

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
    <div className="min-h-screen bg-slant-50 p-4 overflow-hidden relative">
      {/* BACKGROUND */}

      <div className="absolute top-0 left-0 w-[320px] h-[320px] bg-cyan-300/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-pink-300/20 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-6 bg-white border border-gray-300 rounded-[30px] p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-3xl shadow-lg shrink-0">
              <Coffee
                size={22}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-4xl font-black text-gray-900">
                Hospitality Module
              </h1>

              <p className="text-gray-600 text-sm mt-1">
                Smart hospitality & luxury service
                management
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              setShowCreateModal(true)
            }
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-3xl text-sm font-semibold flex items-center gap-2 shadow-lg text-white shrink-0"
          >
            <Plus size={16} />
            Add Hospitality Service
          </button>
        </div>

        {/* FILTERS */}

        <div className="bg-white border border-gray-300 rounded-[30px] p-5 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-cyan-100 p-3 rounded-2xl shrink-0">
              <BellRing
                size={16}
                className="text-cyan-600"
              />
            </div>

            <h2 className="text-xl font-black text-gray-900">
              Hospitality Filters
            </h2>
          </div>

          {/* SEARCH */}

          <div className="bg-[#F3F4F6] border border-gray-300 rounded-3xl px-5 py-3 flex items-center gap-3 mb-5">
            <Search
              size={16}
              className="text-gray-500 shrink-0"
            />

            <input
              type="text"
              placeholder="Search hospitality services..."
              className="bg-transparent outline-none text-sm text-gray-900 w-full placeholder:text-gray-500"
            />
          </div>

          {/* FILTER BUTTONS */}

          <div className="flex flex-wrap gap-3">
            {filters.map((item, index) => (
              <button
                key={index}
                onClick={() =>
                  setActiveFilter(item)
                }
                className={`px-5 py-2 rounded-2xl text-xs font-semibold transition-colors duration-200 ${
                  activeFilter === item
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "bg-[#F3F4F6] text-gray-700 hover:bg-gray-200"
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
                  y: -3,
                }}
                transition={{
                  duration: 0.2,
                }}
                className={`bg-gradient-to-br ${service.gradient} rounded-[32px] overflow-hidden shadow-lg h-[610px] relative border border-white/50`}
              >
                <div className="absolute inset-0 bg-white/10"></div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* IMAGE */}

                  <div className="relative h-[50%]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent"></div>

                    {/* TOP */}

                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                      {/* LEFT */}

                      <div className="flex items-center gap-2">
                        <div className="bg-white/70 p-3 rounded-3xl border border-white/40 shrink-0">
                          <Icon
                            size={15}
                            className="text-gray-900"
                          />
                        </div>

                        <span className="bg-white/70 px-4 py-2 rounded-full text-[11px] font-semibold border border-white/40 text-gray-900 shrink-0">
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
                          className="w-10 h-10 rounded-3xl bg-white/70 border border-white/40 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors duration-200 shrink-0"
                        >
                          <Pencil size={14} />
                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            handleDelete(service)
                          }
                          className="w-10 h-10 rounded-3xl bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors duration-200 text-white shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* STATUS */}

                    <div className="absolute bottom-4 right-4">
                      <span
                        className={`px-4 py-2 rounded-full text-[11px] font-bold shadow-lg text-white ${
                          service.status === "Active"
                            ? "bg-green-500"
                            : service.status ===
                              "Pending"
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }`}
                      >
                        {service.status}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="text-[2rem] leading-tight font-black mb-4 text-gray-900">
                        {service.title}
                      </h2>

                      <p className="text-gray-700 text-[0.95rem] leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* INFO BOXES */}

                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {/* STAFF */}

                      <div className="bg-white/70 rounded-[28px] p-4 border border-white/40 h-[135px] flex flex-col justify-between">
                        <Users
                          size={16}
                          className="text-gray-900 shrink-0"
                        />

                        <div>
                          <p className="text-xs text-gray-600 mb-1">
                            Staff
                          </p>

                          <h4 className="text-2xl font-black text-gray-900">
                            15+
                          </h4>
                        </div>
                      </div>

                      {/* TIMING */}

                      <div className="bg-white/70 rounded-[28px] p-4 border border-white/40 h-[135px] flex flex-col justify-between">
                        <CalendarDays
                          size={16}
                          className="text-gray-900 shrink-0"
                        />

                        <div>
                          <p className="text-xs text-gray-600 mb-1">
                            Timing
                          </p>

                          <h4 className="text-2xl font-black text-gray-900">
                            24/7
                          </h4>
                        </div>
                      </div>

                      {/* RATING */}

                      <div className="bg-white/70 rounded-[28px] p-4 border border-white/40 h-[135px] flex flex-col justify-between">
                        <Star
                          size={16}
                          className="text-yellow-500 fill-yellow-500 shrink-0"
                        />

                        <div>
                          <p className="text-xs text-gray-600 mb-1">
                            Rating
                          </p>

                          <h4 className="text-2xl font-black text-gray-900">
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-300 w-full max-w-lg rounded-[34px] p-7 shadow-2xl relative">
            <button
              onClick={() =>
                setShowCreateModal(false)
              }
              className="absolute top-5 right-5 bg-gray-100 p-3 rounded-2xl"
            >
              <X
                size={16}
                className="text-gray-900"
              />
            </button>

            <div className="flex items-center gap-4 mb-7">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-3xl shrink-0">
                <Plus
                  size={18}
                  className="text-white"
                />
              </div>

              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  Add Hospitality Service
                </h2>

                <p className="text-gray-600 text-sm mt-1">
                  Create and manage hospitality
                  services
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Service Name"
                className="w-full bg-[#F3F4F6] border border-gray-300 rounded-3xl px-5 py-4 text-sm text-gray-900 outline-none"
              />

              <textarea
                rows="4"
                placeholder="Service Description"
                className="w-full bg-[#F3F4F6] border border-gray-300 rounded-3xl px-5 py-4 text-sm text-gray-900 outline-none resize-none"
              ></textarea>

              <button
                onClick={handleCreateService}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-3xl text-sm font-semibold shadow-lg text-white"
              >
                Create Hospitality Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-300 w-full max-w-lg rounded-[34px] p-7 shadow-2xl relative">
            <button
              onClick={() =>
                setShowEditModal(false)
              }
              className="absolute top-5 right-5 bg-gray-100 p-3 rounded-2xl"
            >
              <X
                size={16}
                className="text-gray-900"
              />
            </button>

            <h2 className="text-3xl font-black mb-6 text-gray-900">
              Edit Hospitality Service
            </h2>

            <div className="space-y-5">
              <input
                type="text"
                value={editTitle}
                onChange={(e) =>
                  setEditTitle(e.target.value)
                }
                className="w-full bg-[#F3F4F6] border border-gray-300 rounded-3xl px-5 py-4 text-sm text-gray-900 outline-none"
              />

              <textarea
                rows="4"
                value={editDescription}
                onChange={(e) =>
                  setEditDescription(
                    e.target.value
                  )
                }
                className="w-full bg-[#F3F4F6] border border-gray-300 rounded-3xl px-5 py-4 text-sm text-gray-900 outline-none resize-none"
              ></textarea>

              <button
                onClick={handleSaveEdit}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-3xl text-sm font-semibold text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}

      {showSuccessPopup && (
        <div className="fixed top-6 right-6 bg-white border border-green-300 px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-4 z-50">
          <CheckCircle2
            className="text-green-500 shrink-0"
            size={20}
          />

          <div>
            <h3 className="font-bold text-gray-900 text-sm">
              Changes Saved
            </h3>

            <p className="text-gray-500 text-xs">
              Hospitality service updated
              successfully
            </p>
          </div>
        </div>
      )}

      {/* DELETE POPUP */}

      {showDeletePopup && (
        <div className="fixed bottom-6 right-6 bg-white border border-red-300 px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-5 z-50">
          <div>
            <h3 className="font-bold text-gray-900 text-sm">
              Service Deleted
            </h3>

            <p className="text-gray-500 text-xs">
              You can undo this action
            </p>
          </div>

          <button
            onClick={handleUndoDelete}
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-2xl text-xs font-bold text-white transition-colors duration-200"
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
};

export default Hospitality;