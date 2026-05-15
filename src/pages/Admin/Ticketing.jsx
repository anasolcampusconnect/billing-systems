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
  Undo2,
  ChevronLeft,
  ChevronRight,
  Send,
} from "lucide-react";

const Ticketing = () => {
  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [showDeletePopup, setShowDeletePopup] =
    useState(false);

  const [deletedTicket, setDeletedTicket] =
    useState(null);

  const [activeFilter, setActiveFilter] =
    useState("All Tickets");

  const [currentSlide, setCurrentSlide] =
    useState(0);

  // EDIT STATES

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedTicket, setSelectedTicket] =
    useState(null);

  const [editIssue, setEditIssue] =
    useState("");

  const [editCustomer, setEditCustomer] =
    useState("");

  // CHAT STATES

  const [showChatModal, setShowChatModal] =
    useState(false);

  const [chatMessages, setChatMessages] =
    useState([
      {
        sender: "support",
        text: "Hello, we are checking your issue.",
      },

      {
        sender: "customer",
        text: "Thank you, waiting for update.",
      },
    ]);

  const [newMessage, setNewMessage] =
    useState("");

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
        "from-[#DCEBFF] via-[#CDE1FF] to-[#BFD7FF]",
      badge: "bg-red-500",
      priorityBg: "bg-blue-100",
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
        "from-[#FFE7CC] via-[#FFE0BD] to-[#FFD6A5]",
      badge: "bg-orange-500",
      priorityBg: "bg-orange-100",
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
        "from-[#D7FFF7] via-[#CBFAF2] to-[#B6F5EA]",
      badge: "bg-green-500",
      priorityBg: "bg-green-100",
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
        "from-[#FFDCE8] via-[#FFD2E0] to-[#FFC6D8]",
      badge: "bg-pink-500",
      priorityBg: "bg-pink-100",
    },
  ];

  const [tickets, setTickets] =
    useState(initialTickets);

  const filteredTickets = tickets.filter((ticket) => {
    if (activeFilter === "All Tickets")
      return true;

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

  // CREATE

  const handleCreateTicket = () => {
    setShowCreateModal(false);

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // DELETE

  const handleDelete = (ticket) => {
    setDeletedTicket(ticket);

    const updatedTickets = tickets.filter(
      (item) => item.id !== ticket.id
    );

    setTickets(updatedTickets);

    setShowDeletePopup(true);

    setTimeout(() => {
      setShowDeletePopup(false);
    }, 5000);
  };

  // UNDO

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

  // EDIT OPEN

  const handleEditOpen = (ticket) => {
    setSelectedTicket(ticket);

    setEditIssue(ticket.issue);

    setEditCustomer(ticket.customer);

    setShowEditModal(true);
  };

  // SAVE EDIT

  const handleSaveEdit = () => {
    const updatedTickets = tickets.map((item) =>
      item.id === selectedTicket.id
        ? {
            ...item,
            issue: editIssue,
            customer: editCustomer,
          }
        : item
    );

    setTickets(updatedTickets);

    setShowEditModal(false);

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // CHAT SEND

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        sender: "customer",
        text: newMessage,
      },
    ]);

    setNewMessage("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "support",
          text: "Our support team will get back shortly.",
        },
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slant-50 p-5 overflow-hidden">
      {/* BACKGROUND */}

      <div className="fixed top-0 left-0 w-[420px] h-[420px] bg-cyan-300/20 blur-[130px] rounded-full"></div>

      <div className="fixed bottom-0 right-0 w-[420px] h-[420px] bg-pink-300/20 blur-[130px] rounded-full"></div>

      <div className="max-w-[1500px] mx-auto relative z-10">
        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-7 bg-white border border-gray-300 rounded-[32px] p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-3xl shadow-xl">
              <Ticket
                className="text-white"
                size={22}
              />
            </div>

            <div>
              <h1 className="text-4xl font-black text-gray-900">
                Ticketing System
              </h1>

              <p className="text-gray-600 text-sm mt-1">
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

        <div className="bg-white border border-gray-300 rounded-[32px] p-5 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-cyan-100 p-3 rounded-2xl">
              <Filter
                className="text-cyan-600"
                size={16}
              />
            </div>

            <h2 className="text-2xl font-black text-gray-900">
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
                    : "bg-[#F3F4F6] text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* SLIDER */}

        <div className="relative">
          {/* LEFT */}

          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0
                  ? filteredTickets.length - 1
                  : prev - 1
              )
            }
            className="absolute left-[-8px] top-[45%] z-20 bg-white border border-gray-300 w-11 h-11 rounded-full flex items-center justify-center shadow-sm"
          >
            <ChevronLeft
              size={16}
              className="text-gray-900"
            />
          </button>

          {/* RIGHT */}

          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === filteredTickets.length - 1
                  ? 0
                  : prev + 1
              )
            }
            className="absolute right-[-8px] top-[45%] z-20 bg-white border border-gray-300 w-11 h-11 rounded-full flex items-center justify-center shadow-sm"
          >
            <ChevronRight
              size={16}
              className="text-gray-900"
            />
          </button>

          {/* CARD */}

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
                  className={`bg-gradient-to-br ${ticket.gradient} rounded-[34px] overflow-hidden shadow-xl relative max-w-[1200px] mx-auto border border-white/50`}
                >
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">
                    {/* IMAGE */}

                    <div className="relative h-full">
                      <img
                        src={ticket.image}
                        alt={ticket.issue}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>

                      {/* TOP */}

                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <div className="bg-white/80 p-3 rounded-2xl border border-white/50">
                          <Ticket
                            size={16}
                            className="text-gray-900"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          {/* EDIT */}

                          <button
                            onClick={() =>
                              handleEditOpen(ticket)
                            }
                            className="w-11 h-11 rounded-2xl bg-white/80 border border-white/50 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all"
                          >
                            <Pencil size={14} />
                          </button>

                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleDelete(ticket)
                            }
                            className="w-11 h-11 rounded-2xl bg-red-500 flex items-center justify-center hover:bg-red-600 transition-all"
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
                          className={`${ticket.badge} px-3 py-1.5 rounded-full text-[11px] font-bold text-white`}
                        >
                          {ticket.status}
                        </span>

                        <span
                          className={`${ticket.priorityBg} px-3 py-1.5 rounded-full text-[11px] font-bold text-gray-900`}
                        >
                          {ticket.priority}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}

                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h2 className="text-[2.2rem] leading-tight font-black mb-2 text-gray-900">
                          {ticket.id}
                        </h2>

                        <h3 className="text-[1.7rem] leading-tight font-black mb-4 text-gray-900">
                          {ticket.issue}
                        </h3>

                        <p className="text-gray-700 text-sm mb-6">
                          Customer : {ticket.customer}
                        </p>

                        {/* INFO */}

                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-white/70 rounded-[24px] p-4 border border-white/40 h-[115px] flex flex-col justify-between">
                            <Calendar
                              size={14}
                              className="text-gray-900"
                            />

                            <div>
                              <p className="text-[11px] text-gray-600 mb-1">
                                Date
                              </p>

                              <h4 className="text-base font-black text-gray-900">
                                {ticket.date}
                              </h4>
                            </div>
                          </div>

                          <div className="bg-white/70 rounded-[24px] p-4 border border-white/40 h-[115px] flex flex-col justify-between">
                            <User
                              size={14}
                              className="text-gray-900"
                            />

                            <div>
                              <p className="text-[11px] text-gray-600 mb-1">
                                Team
                              </p>

                              <h4 className="text-base font-black text-gray-900">
                                {ticket.assigned
                                  .split(" ")[0]}
                              </h4>
                            </div>
                          </div>

                          <div className="bg-white/70 rounded-[24px] p-4 border border-white/40 h-[115px] flex flex-col justify-between">
                            <Clock3
                              size={14}
                              className="text-gray-900"
                            />

                            <div>
                              <p className="text-[11px] text-gray-600 mb-1">
                                Response
                              </p>

                              <h4 className="text-base font-black text-gray-900">
                                2 hrs
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CHAT */}

                      <button
                        onClick={() =>
                          setShowChatModal(true)
                        }
                        className="mt-6 bg-white/70 border border-white/50 hover:bg-white rounded-[24px] py-4 flex items-center justify-center gap-3 text-sm font-bold text-gray-900 transition-all"
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

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-300 w-full max-w-xl rounded-[36px] p-8 shadow-2xl relative">
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
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-3xl">
                <BadgePlus
                  size={18}
                  className="text-white"
                />
              </div>

              <div>
                <h2 className="text-3xl font-black text-gray-900">
                  Create Ticket
                </h2>

                <p className="text-gray-600 text-sm mt-1">
                  Create new support ticket
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Customer Name"
                className="w-full bg-[#F3F4F6] border border-gray-300 rounded-3xl px-5 py-4 text-sm text-gray-900 outline-none"
              />

              <input
                type="text"
                placeholder="Issue Title"
                className="w-full bg-[#F3F4F6] border border-gray-300 rounded-3xl px-5 py-4 text-sm text-gray-900 outline-none"
              />

              <textarea
                rows="4"
                placeholder="Describe the issue..."
                className="w-full bg-[#F3F4F6] border border-gray-300 rounded-3xl px-5 py-4 text-sm text-gray-900 outline-none resize-none"
              ></textarea>

              <button
                onClick={handleCreateTicket}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-3xl text-sm font-bold flex items-center justify-center gap-3 text-white"
              >
                <Headphones size={16} />
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-300 w-full max-w-xl rounded-[36px] p-8 shadow-2xl relative">
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

            <h2 className="text-3xl font-black text-gray-900 mb-6">
              Edit Ticket
            </h2>

            <div className="space-y-5">
              <input
                type="text"
                value={editIssue}
                onChange={(e) =>
                  setEditIssue(e.target.value)
                }
                className="w-full bg-[#F3F4F6] border border-gray-300 rounded-3xl px-5 py-4 text-sm text-gray-900 outline-none"
              />

              <input
                type="text"
                value={editCustomer}
                onChange={(e) =>
                  setEditCustomer(e.target.value)
                }
                className="w-full bg-[#F3F4F6] border border-gray-300 rounded-3xl px-5 py-4 text-sm text-gray-900 outline-none"
              />

              <button
                onClick={handleSaveEdit}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-3xl text-sm font-bold text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHAT MODAL */}

      {showChatModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-300 w-full max-w-2xl rounded-[36px] p-7 shadow-2xl relative">
            <button
              onClick={() =>
                setShowChatModal(false)
              }
              className="absolute top-5 right-5 bg-gray-100 p-3 rounded-2xl"
            >
              <X
                size={16}
                className="text-gray-900"
              />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-3xl">
                <MessageSquare
                  size={18}
                  className="text-white"
                />
              </div>

              <div>
                <h2 className="text-3xl font-black text-gray-900">
                  Ticket Chat
                </h2>

                <p className="text-gray-600 text-sm mt-1">
                  Support communication panel
                </p>
              </div>
            </div>

            {/* MESSAGES */}

            <div className="bg-[#F3F4F6] rounded-[30px] p-5 h-[350px] overflow-y-auto space-y-4">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[75%] px-5 py-4 rounded-[24px] text-sm font-medium ${
                    msg.sender === "support"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                      : "bg-white border border-gray-300 text-gray-900 ml-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* INPUT */}

            <div className="flex gap-3 mt-5">
              <input
                type="text"
                value={newMessage}
                onChange={(e) =>
                  setNewMessage(e.target.value)
                }
                placeholder="Type your message..."
                className="flex-1 bg-[#F3F4F6] border border-gray-300 rounded-[24px] px-5 py-4 text-sm text-gray-900 outline-none"
              />

              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 w-[60px] rounded-[24px] flex items-center justify-center shadow-lg"
              >
                <Send
                  size={18}
                  className="text-white"
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS */}

      {showSuccess && (
        <div className="fixed top-4 right-4 z-[100]">
          <div className="bg-white border border-green-300 shadow-xl rounded-3xl px-5 py-4 flex items-center gap-4 min-w-[320px]">
            <CheckCircle2
              className="text-green-500"
              size={22}
            />

            <div>
              <h3 className="text-base font-bold text-gray-900">
                Changes Saved Successfully
              </h3>

              <p className="text-gray-600 text-xs mt-1">
                Ticket information updated.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DELETE */}

      {showDeletePopup && (
        <div className="fixed top-4 right-4 z-[100]">
          <div className="bg-white border border-red-300 shadow-xl rounded-3xl px-5 py-4 flex items-center gap-4 min-w-[340px]">
            <Trash2
              className="text-red-500"
              size={22}
            />

            <div className="flex-1">
              <h3 className="text-base font-bold text-gray-900">
                Ticket Deleted
              </h3>

              <p className="text-gray-600 text-xs mt-1">
                The ticket has been removed.
              </p>
            </div>

            <button
              onClick={handleUndoDelete}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-semibold text-gray-900"
            >
              <Undo2 size={14} />
              Undo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ticketing;