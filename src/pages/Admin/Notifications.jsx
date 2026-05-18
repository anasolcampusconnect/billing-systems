import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  ShoppingBag,
  Truck,
  Tag,
  CheckCircle,
  Trash2,
} from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Order Confirmed",
      message: "Your order #ORD-1778845580642 has been confirmed.",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      type: "shipping",
      title: "Shipped Successfully",
      message: "Your package is on the way 🚚",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "offer",
      title: "Special Offer",
      message: "Use coupon WELCOME and save ₹100 today!",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "payment",
      title: "Payment Received",
      message: "Your prepaid payment was successful.",
      time: "Yesterday",
      read: true,
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type) => {
    switch (type) {
      case "order":
        return (
          <div className="p-3 bg-blue-100 rounded-xl">
            <ShoppingBag className="text-blue-600" size={22} />
          </div>
        );
      case "shipping":
        return (
          <div className="p-3 bg-green-100 rounded-xl">
            <Truck className="text-green-600" size={22} />
          </div>
        );
      case "offer":
        return (
          <div className="p-3 bg-yellow-100 rounded-xl">
            <Tag className="text-yellow-600" size={22} />
          </div>
        );
      case "payment":
        return (
          <div className="p-3 bg-purple-100 rounded-xl">
            <CheckCircle className="text-purple-600" size={22} />
          </div>
        );
      default:
        return (
          <div className="p-3 bg-gray-100 rounded-xl">
            <Bell className="text-gray-500" size={22} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#edf3fb] p-6">

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-xl">
            <Bell className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Notifications
            </h1>
            <p className="text-gray-500">
              Manage your billing alerts
            </p>
          </div>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-2 px-5 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition shadow-md"
          >
            <Trash2 size={18} />
            Clear All
          </button>
        )}
      </motion.div>

      {/* Empty state */}
      {notifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-[60vh]"
        >
          <Bell size={70} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">
            No Notifications
          </h2>
          <p className="text-gray-500 mt-2">
            You're all caught up 🎉
          </p>
        </motion.div>
      )}

      {/* Notifications */}
      <div className="space-y-4">
        {notifications.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            onClick={() => markAsRead(item.id)}
            className={`cursor-pointer rounded-2xl p-5 bg-white border transition-all hover:shadow-lg hover:-translate-y-1
              ${
                item.read
                  ? "border-gray-200"
                  : "border-blue-300 shadow-md"
              }`}
          >
            <div className="flex items-start gap-4">
              {getIcon(item.type)}

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {item.title}
                  </h3>

                  {!item.read && (
                    <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
                  )}
                </div>

                <p className="text-gray-600 mt-1">
                  {item.message}
                </p>

                <p className="text-sm text-gray-400 mt-2">
                  {item.time}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;