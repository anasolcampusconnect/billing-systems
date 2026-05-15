import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Ticket,
  Plus,
  Calendar,
  Clock3,
  User,
  CheckCircle2,
  Filter,
  X,
  BadgePlus,
  MessageSquare,
  Headphones,
  Pencil,
  Trash2,
  Send,
  Undo2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Ticketing = () => {
  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [showSavedPopup, setShowSavedPopup] =
    useState(false);

  const [showDeletePopup, setShowDeletePopup] =
    useState(false);

  const [selectedTicket, setSelectedTicket] =
    useState(null);

  const [modalType, setModalType] =
    useState("");

  const [deletedTicket, setDeletedTicket] =
    useState(null);

  const [activeFilter, setActiveFilter] =
    useState("All Tickets");

  const [currentSlide, setCurrentSlide] =
    useState(0);

  const filters = [
    "All Tickets",
    "Open",
    "Pending",
    "Resolved",
    "High Priority",
  ];

  const initialTickets = [
    {
      id: "#TK1024",
      customer: "Rahul Sharma",
      issue: "Billing issue in POS system",
      status: "Open",
      priority: "High",
      date: "12 Jun 2026",
      assigned: "Support Team",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      gradient:
        "from-[#6D92E8] via-[#7EA1EC] to-[#9CB9F3]",
      badge: "bg-red-500/90",
      priorityBg: "bg-blue-900/40",
    },

    {
      id: "#TK1025",
      customer: "Ananya Patel",
      issue: "Invoice printing problem",
      status: "Pending",
      priority: "Medium",
      date: "13 Jun 2026",
      assigned: "Tech Team",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      gradient:
        "from-[#E7AA2B] via-[#E8B84C] to-[#F0CB78]",
      badge: "bg-pink-500/90",
      priorityBg: "bg-orange-900/40",
    },

    {
      id: "#TK1026",
      customer: "Kiran Kumar",
      issue: "Login access problem",
      status: "Resolved",
      priority: "Low",
      date: "14 Jun 2026",
      assigned: "Admin Team",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
      gradient:
        "from-[#38C7B8] via-[#52D4C5] to-[#82E2D6]",
      badge: "bg-green-500/90",
      priorityBg: "bg-emerald-900/40",
    },

    {
      id: "#TK1027",
      customer: "Suresh Reddy",
      issue: "Server connection failed",
      status: "Open",
      priority: "High",
      date: "15 Jun 2026",
      assigned: "Infrastructure Team",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
      gradient:
        "from-[#D86EB5] via-[#DE8AC3] to-[#E8AAD3]",
      badge: "bg-red-500/90",
      priorityBg: "bg-pink-900/40",
    },
  ];

  const [tickets, setTickets] =
    useState(initialTickets);

  const filteredTickets = tickets.filter((ticket) => {
    if (activeFilter === "All Tickets") return true;

    if (activeFilter === "Open")
      return ticket.status === "Open";

    if (activeFilter === "Pending")
      return ticket.status === "Pending";

    if (activeFilter === "Resolved")
      return ticket.status === "Resolved";

    if (activeFilter === "High Priority")
      return ticket.priority === "High";

    return true;
  });

  // AUTO SLIDER

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === filteredTickets.length - 1
          ? 0
          : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredTickets.length]);

  const handleCreateTicket = () => {
    setShowCreateModal(false);

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleSaveChanges = () => {
    setSelectedTicket(null);

    setShowSavedPopup(true);

    setTimeout(() => {
      setShowSavedPopup(false);
    }, 3000);
  };

  const handleDelete = (ticket) => {
    setDeletedTicket(ticket);

    const updatedTickets = tickets.filter(
      (item) => item.id !== ticket.id
    );

    setTickets(updatedTickets);

    setSelectedTicket(null);

    setShowDeletePopup(true);

    setTimeout(() => {
      setShowDeletePopup(false);
    }, 5000);
  };

  const handleUndoDelete = () => {
    if (deletedTicket) {
      setTickets((prev) => [
        ...prev,
        deletedTicket,
      ]);

      setDeletedTicket(null);

      setShowDeletePopup(false);
    }
  };

  const openModal = (ticket, type) => {
    setSelectedTicket(ticket);

    setModalType(type);
  };

  return (
    <div className="min-h-screen bg-[#050816] p-5 overflow-hidden text-white">
      {/* BACKGROUND */}

      <div className="fixed top-0 left-0 w-[420px] h-[420px] bg-blue-500/10 blur-[130px] rounded-full"></div>

      <div className="fixed bottom-0 right-0 w-[420px] h-[420px] bg-pink-500/10 blur-[130px] rounded-full"></div>

      <div className="max-w-[1500px] mx-auto relative z-10">
        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-7">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-3xl shadow-xl">
              <Ticket
                className="text-white"
                size={22}
              />
            </div>

            <div>
              <h1 className="text-4xl font-black text-white">
                Ticketing System
              </h1>

              <p className="text-slate-400 text-sm mt-1">
                Manage support tickets and customer
                issues
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-3xl shadow-lg flex items-center gap-3 text-sm font-semibold"
          >
            <Plus size={16} />
            Create Ticket
          </button>
        </div>

        {/* FILTERS */}

        <div className="bg-[#0F172A] border border-slate-700 rounded-[32px] p-5 shadow-2xl mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-cyan-500/15 p-3 rounded-2xl">
              <Filter
                className="text-cyan-400"
                size={16}
              />
            </div>

            <h2 className="text-2xl font-black text-white">
              Ticket Filters
            </h2>
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

        {/* SLIDER */}

        <div className="relative">
          {/* LEFT ARROW */}

          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0
                  ? filteredTickets.length - 1
                  : prev - 1
              )
            }
            className="absolute left-[-8px] top-[45%] z-20 bg-[#111827] border border-slate-700 w-11 h-11 rounded-full flex items-center justify-center"
          >
            <ChevronLeft size={16} />
          </button>

          {/* RIGHT ARROW */}

          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === filteredTickets.length - 1
                  ? 0
                  : prev + 1
              )
            }
            className="absolute right-[-8px] top-[45%] z-20 bg-[#111827] border border-slate-700 w-11 h-11 rounded-full flex items-center justify-center"
          >
            <ChevronRight size={16} />
          </button>

          {/* TICKET CARD */}

          <AnimatePresence mode="wait">
            {filteredTickets
              .slice(currentSlide, currentSlide + 1)
              .map((ticket) => (
                <motion.div
                  key={ticket.id}
                  initial={{
                    opacity: 0,
                    x: 100,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -100,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`bg-gradient-to-br ${ticket.gradient} rounded-[34px] overflow-hidden shadow-2xl relative max-w-[1250px] mx-auto`}
                >
                  <div className="absolute inset-0 bg-black/10"></div>

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[430px]">
                    {/* IMAGE */}

                    <div className="relative h-full">
                      <img
                        src={ticket.image}
                        alt={ticket.issue}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>

                      {/* TOP BUTTONS */}

                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                          <Ticket size={16} />
                        </div>

                        <div className="flex items-center gap-2">
                          {/* EDIT */}

                          <button
                            onClick={() =>
                              openModal(
                                ticket,
                                "edit"
                              )
                            }
                            className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/30 transition-all"
                          >
                            <Pencil
                              size={14}
                              className="text-white"
                            />
                          </button>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              openModal(
                                ticket,
                                "delete"
                              )
                            }
                            className="w-11 h-11 rounded-2xl bg-red-500/85 flex items-center justify-center hover:bg-red-600 transition-all"
                          >
                            <Trash2
                              size={14}
                              className="text-white"
                            />
                          </button>
                        </div>
                      </div>

                      {/* STATUS */}

                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <span
                          className={`${ticket.badge} px-3 py-1.5 rounded-full text-[11px] font-bold`}
                        >
                          {ticket.status}
                        </span>

                        <span
                          className={`${ticket.priorityBg} px-3 py-1.5 rounded-full text-[11px] font-bold backdrop-blur-md`}
                        >
                          {ticket.priority}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}

                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h2 className="text-[2.4rem] leading-tight font-black mb-2">
                          {ticket.id}
                        </h2>

                        <h3 className="text-[1.9rem] leading-tight font-black mb-4">
                          {ticket.issue}
                        </h3>

                        <p className="text-white/90 text-sm mb-6">
                          Customer :{" "}
                          {ticket.customer}
                        </p>

                        {/* INFO CARDS */}

                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-black/15 backdrop-blur-md rounded-[24px] p-4 border border-white/10 h-[115px] flex flex-col justify-between">
                            <Calendar size={14} />

                            <div>
                              <p className="text-[11px] text-white/70 mb-1">
                                Date
                              </p>

                              <h4 className="text-base font-black">
                                {ticket.date}
                              </h4>
                            </div>
                          </div>

                          <div className="bg-black/15 backdrop-blur-md rounded-[24px] p-4 border border-white/10 h-[115px] flex flex-col justify-between">
                            <User size={14} />

                            <div>
                              <p className="text-[11px] text-white/70 mb-1">
                                Team
                              </p>

                              <h4 className="text-base font-black">
                                {ticket.assigned
                                  .split(" ")[0]}
                              </h4>
                            </div>
                          </div>

                          <div className="bg-black/15 backdrop-blur-md rounded-[24px] p-4 border border-white/10 h-[115px] flex flex-col justify-between">
                            <Clock3 size={14} />

                            <div>
                              <p className="text-[11px] text-white/70 mb-1">
                                Response
                              </p>

                              <h4 className="text-base font-black">
                                2 hrs
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CHAT */}

                      <button
                        onClick={() =>
                          openModal(ticket, "chat")
                        }
                        className="mt-6 bg-black/20 backdrop-blur-md border border-white/15 hover:bg-black/30 transition-all rounded-[24px] py-4 flex items-center justify-center gap-3 text-sm font-bold"
                      >
                        <MessageSquare size={16} />
                        Open Ticket Chat
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      {/* CREATE MODAL */}

      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-[#0F172A] border border-slate-700 w-full max-w-xl rounded-[36px] p-8 shadow-2xl relative">
              <button
                onClick={() =>
                  setShowCreateModal(false)
                }
                className="absolute top-5 right-5 bg-slate-800 p-3 rounded-2xl"
              >
                <X size={16} className="text-white" />
              </button>

              <div className="flex items-center gap-4 mb-7">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-3xl">
                  <BadgePlus size={18} />
                </div>

                <div>
                  <h2 className="text-3xl font-black">
                    Create Ticket
                  </h2>

                  <p className="text-slate-400 text-sm mt-1">
                    Create new support ticket
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Customer Name"
                  className="w-full bg-[#111827] border border-slate-700 rounded-3xl px-5 py-4 text-sm text-white outline-none"
                />

                <input
                  type="text"
                  placeholder="Issue Title"
                  className="w-full bg-[#111827] border border-slate-700 rounded-3xl px-5 py-4 text-sm text-white outline-none"
                />

                <textarea
                  rows="4"
                  placeholder="Describe the issue..."
                  className="w-full bg-[#111827] border border-slate-700 rounded-3xl px-5 py-4 text-sm text-white outline-none resize-none"
                ></textarea>

                <button
                  onClick={handleCreateTicket}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-3xl text-sm font-bold flex items-center justify-center gap-3"
                >
                  <Headphones size={16} />
                  Create Ticket
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* POPUPS */}

      <AnimatePresence>
        {showSuccess && (
          <div className="fixed top-4 right-4 z-[100]">
            <div className="bg-[#0F172A] border border-slate-700 shadow-2xl rounded-3xl px-5 py-4 flex items-center gap-4 min-w-[320px]">
              <CheckCircle2
                className="text-green-400"
                size={22}
              />

              <div>
                <h3 className="text-base font-bold text-white">
                  Ticket Created Successfully
                </h3>

                <p className="text-slate-400 text-xs mt-1">
                  Support ticket added successfully.
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSavedPopup && (
          <div className="fixed top-4 right-4 z-[100]">
            <div className="bg-[#0F172A] border border-slate-700 shadow-2xl rounded-3xl px-5 py-4 flex items-center gap-4 min-w-[320px]">
              <CheckCircle2
                className="text-blue-400"
                size={22}
              />

              <div>
                <h3 className="text-base font-bold text-white">
                  Changes Saved
                </h3>

                <p className="text-slate-400 text-xs mt-1">
                  Ticket updated successfully.
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeletePopup && (
          <div className="fixed top-4 right-4 z-[100]">
            <div className="bg-[#0F172A] border border-red-500/30 shadow-2xl rounded-3xl px-5 py-4 flex items-center gap-4 min-w-[340px]">
              <Trash2
                className="text-red-400"
                size={22}
              />

              <div className="flex-1">
                <h3 className="text-base font-bold text-white">
                  Ticket Deleted
                </h3>

                <p className="text-slate-400 text-xs mt-1">
                  The ticket has been removed.
                </p>
              </div>

              <button
                onClick={handleUndoDelete}
                className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-semibold"
              >
                <Undo2 size={14} />
                Undo
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Ticketing;