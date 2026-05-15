import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Boxes,
  ShoppingCart,
  AlertTriangle,
  IndianRupee,
  X,
  CheckCircle2,
  Layers3,
  Star,
  Package2,
} from "lucide-react";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const inventoryData = [
    {
      id: "SKU-001",
      name: "Wireless Headphones",
      category: "Electronics",
      price: "₹ 2,500",
      qty: 15,
      supplier: "Sony Pvt Ltd",
      status: "In Stock",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      color:
        "from-[#DCEBFF] to-[#BFD7FF] border-blue-200",
    },

    {
      id: "SKU-002",
      name: "Coffee Maker",
      category: "Appliances",
      price: "₹ 5,200",
      qty: 3,
      supplier: "Kitchen Pro",
      status: "Low Stock",
      rating: "4.5",
      image:
        "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6",
      color:
        "from-[#FFE7CC] to-[#FFD6A5] border-orange-200",
    },

    {
      id: "SKU-003",
      name: "Smart Watch",
      category: "Electronics",
      price: "₹ 3,999",
      qty: 25,
      supplier: "Apple Store",
      status: "In Stock",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      color:
        "from-[#D7FFF7] to-[#B6F5EA] border-teal-200",
    },

    {
      id: "SKU-004",
      name: "Designer Shirt",
      category: "Fashion",
      price: "₹ 1,200",
      qty: 45,
      supplier: "Fashion Hub",
      status: "In Stock",
      rating: "4.7",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      color:
        "from-[#F0D9FF] to-[#E4C7FF] border-purple-200",
    },

    {
      id: "SKU-005",
      name: "Gaming Keyboard",
      category: "Accessories",
      price: "₹ 2,999",
      qty: 8,
      supplier: "Hyper Tech",
      status: "In Stock",
      rating: "4.6",
      image:
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
      color:
        "from-[#DFFFE9] to-[#C4F7D4] border-green-200",
    },

    {
      id: "SKU-006",
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: "₹ 1,899",
      qty: 5,
      supplier: "JBL India",
      status: "Low Stock",
      rating: "4.4",
      image:
        "https://images.unsplash.com/photo-1545454675-3531b543be5d",
      color:
        "from-[#FFDCE8] to-[#FFC6D8] border-pink-200",
    },
  ];

  const filteredProducts = inventoryData.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    setShowAddModal(false);

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] p-4">
      {/* HEADER */}

      <div className="bg-white border border-gray-300 rounded-[24px] p-4 mb-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Boxes size={26} className="text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-black text-gray-900">
                Inventory Nexus
              </h1>

              <p className="text-gray-600 text-sm mt-1">
                Smart stock & warehouse management
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all text-white px-5 py-2.5 rounded-[16px] font-bold flex items-center gap-2 text-sm"
          >
            <Plus size={17} />
            Add Inventory
          </button>
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        <div className="bg-white border border-blue-200 rounded-[20px] p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-500 text-xs">
                Total Products
              </p>

              <h2 className="text-3xl font-black text-gray-900 mt-1">
                124
              </h2>
            </div>

            <div className="bg-blue-100 p-3 rounded-xl">
              <Package2
                size={18}
                className="text-blue-500"
              />
            </div>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-blue-500 h-2 w-[75%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-white border border-green-200 rounded-[20px] p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-500 text-xs">
                Total Sales
              </p>

              <h2 className="text-3xl font-black text-gray-900 mt-1">
                89
              </h2>
            </div>

            <div className="bg-green-100 p-3 rounded-xl">
              <ShoppingCart
                size={18}
                className="text-green-500"
              />
            </div>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-green-500 h-2 w-[60%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-white border border-orange-200 rounded-[20px] p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-500 text-xs">
                Revenue
              </p>

              <h2 className="text-3xl font-black text-gray-900 mt-1">
                ₹45K
              </h2>
            </div>

            <div className="bg-orange-100 p-3 rounded-xl">
              <IndianRupee
                size={18}
                className="text-orange-500"
              />
            </div>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-orange-500 h-2 w-[85%] rounded-full"></div>
          </div>
        </div>

        <div className="bg-white border border-red-200 rounded-[20px] p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-500 text-xs">
                Low Stock
              </p>

              <h2 className="text-3xl font-black text-gray-900 mt-1">
                08
              </h2>
            </div>

            <div className="bg-red-100 p-3 rounded-xl">
              <AlertTriangle
                size={18}
                className="text-red-500"
              />
            </div>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="bg-red-500 h-2 w-[35%] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="bg-white border border-gray-300 rounded-[20px] p-4 mb-5 shadow-sm">
        <div className="relative">
          <Search
            className="absolute left-4 top-3 text-gray-500"
            size={17}
          />

          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full bg-[#F3F4F6] border border-gray-300 rounded-[14px] pl-11 pr-4 py-2.5 outline-none focus:border-cyan-500 text-gray-900 text-sm"
          />
        </div>
      </div>

      {/* PRODUCTS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProducts.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -5 }}
            className={`bg-gradient-to-br ${item.color} border rounded-[24px] p-4 shadow-sm overflow-hidden`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white/70 px-3 py-1 rounded-full">
                <p className="text-gray-900 text-[9px] font-bold uppercase">
                  {item.category}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-xl bg-white/70 hover:bg-cyan-500 transition-all flex items-center justify-center text-gray-900 hover:text-white">
                  <Pencil size={15} />
                </button>

                <button className="w-10 h-10 rounded-xl bg-red-500 hover:bg-red-600 transition-all flex items-center justify-center text-white">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            <div className="w-full h-36 rounded-2xl overflow-hidden mb-4 border border-white/40">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
              />
            </div>

            <div className="flex justify-end mb-4">
              <div
                className={`px-3 py-1 rounded-full text-[9px] font-bold ${
                  item.qty < 5
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {item.status}
              </div>
            </div>

            <h2 className="text-2xl font-black text-gray-900 mb-2">
              {item.name}
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <p className="text-gray-600 text-xs">
                Product ID : {item.id}
              </p>

              <div className="flex items-center gap-1 bg-white/70 px-2 py-1 rounded-full">
                <Star
                  size={10}
                  className="text-yellow-500 fill-yellow-500"
                />

                <span className="text-gray-900 text-[9px] font-semibold">
                  {item.rating}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/70 rounded-2xl p-3 border border-white/40">
                <p className="text-gray-500 text-[9px] uppercase">
                  Price
                </p>

                <h3 className="text-xl font-black text-gray-900 mt-1">
                  {item.price}
                </h3>
              </div>

              <div className="bg-white/70 rounded-2xl p-3 border border-white/40">
                <p className="text-gray-500 text-[9px] uppercase">
                  Stock
                </p>

                <h3 className="text-xl font-black text-gray-900 mt-1">
                  {item.qty}
                </h3>
              </div>
            </div>

            <div className="bg-white/70 rounded-2xl p-3 border border-white/40">
              <p className="text-gray-500 text-[9px] uppercase">
                Supplier
              </p>

              <h3 className="text-base font-bold text-gray-900 mt-1">
                {item.supplier}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ADD MODAL */}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-300 w-full max-w-lg rounded-[28px] p-5 relative shadow-xl">
            <button
              onClick={() =>
                setShowAddModal(false)
              }
              className="absolute top-5 right-5 bg-gray-100 p-2 rounded-xl"
            >
              <X
                size={16}
                className="text-gray-900"
              />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-2xl">
                <Layers3
                  size={18}
                  className="text-white"
                />
              </div>

              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  Add Product
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Enter inventory details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                className="bg-[#F3F4F6] border border-gray-300 rounded-xl px-4 py-3 outline-none text-gray-900 text-sm"
              />

              <input
                type="text"
                placeholder="Product ID"
                className="bg-[#F3F4F6] border border-gray-300 rounded-xl px-4 py-3 outline-none text-gray-900 text-sm"
              />

              <select className="bg-[#F3F4F6] border border-gray-300 rounded-xl px-4 py-3 outline-none text-gray-900 text-sm">
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Appliances</option>
              </select>

              <input
                type="text"
                placeholder="Supplier Name"
                className="bg-[#F3F4F6] border border-gray-300 rounded-xl px-4 py-3 outline-none text-gray-900 text-sm"
              />

              <input
                type="text"
                placeholder="Price"
                className="bg-[#F3F4F6] border border-gray-300 rounded-xl px-4 py-3 outline-none text-gray-900 text-sm"
              />

              <input
                type="number"
                placeholder="Stock Quantity"
                className="bg-[#F3F4F6] border border-gray-300 rounded-xl px-4 py-3 outline-none text-gray-900 text-sm"
              />
            </div>

            <button
              onClick={handleAddProduct}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-bold text-sm mt-6"
            >
              Add Product
            </button>
          </div>
        </div>
      )}

      {/* POPUP */}

      {showPopup && (
        <div className="fixed top-5 right-5 bg-white border border-green-300 px-5 py-3 rounded-2xl flex items-center gap-3 z-50 shadow-lg">
          <CheckCircle2
            size={18}
            className="text-green-500"
          />

          <div>
            <h3 className="font-black text-gray-900 text-sm">
              Product Added
            </h3>

            <p className="text-gray-500 text-xs">
              Inventory updated successfully
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;