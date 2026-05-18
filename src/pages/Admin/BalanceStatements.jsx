import React, { useMemo, useState } from "react";
import {
  Wallet,
  Search,
  Filter,
  Download,
  ArrowDownCircle,
  ArrowUpCircle,
  Landmark,
  Receipt,
  CalendarDays,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  BadgeIndianRupee,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const BalanceStatements = () => {
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    reference: "",
    type: "Credit",
    amount: "",
    paymentMode: "",
    date: "",
    remarks: "",
  });

  const [statements, setStatements] = useState([
    {
      id: "BAL-1001",
      reference: "Cash Counter Deposit",
      type: "Credit",
      amount: 24500,
      paymentMode: "Cash",
      date: "15 May 2026",
      remarks: "Morning shift settlement",
      status: "Completed",
    },
    {
      id: "BAL-1002",
      reference: "Supplier Payment",
      type: "Debit",
      amount: 12800,
      paymentMode: "Bank Transfer",
      date: "15 May 2026",
      remarks: "Fresh vegetables stock",
      status: "Completed",
    },
    {
      id: "BAL-1003",
      reference: "UPI Collection",
      type: "Credit",
      amount: 8650,
      paymentMode: "UPI",
      date: "14 May 2026",
      remarks: "Evening sales",
      status: "Pending",
    },
  ]);

  const filteredStatements = useMemo(() => {
    const q = search.toLowerCase();

    return statements.filter(
      (item) =>
        item.reference.toLowerCase().includes(q) ||
        item.paymentMode.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
    );
  }, [search, statements]);

  const handleSave = (e) => {
    e.preventDefault();

    const newEntry = {
      id: `BAL-${1000 + statements.length + 1}`,
      reference: formData.reference,
      type: formData.type,
      amount: Number(formData.amount),
      paymentMode: formData.paymentMode,
      date: formData.date,
      remarks: formData.remarks,
      status: "Completed",
    };

    setStatements([newEntry, ...statements]);

    setFormData({
      reference: "",
      type: "Credit",
      amount: "",
      paymentMode: "",
      date: "",
      remarks: "",
    });

    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-6 space-y-6">
      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            Balance Statements
          </h1>

          <p className="text-slate-500 font-semibold mt-2">
            Monitor credits, debits, settlements & payment movements
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="h-14 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all"
        >
          <Plus size={18} />
          CREATE ENTRY
        </button>
      </div>

      {/* ANALYTICS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase text-[11px] tracking-widest text-slate-400 font-black">
                Current Balance
              </p>

              <h2 className="text-4xl font-black text-slate-800 mt-3">
                ₹4.8L
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Wallet size={28} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase text-[11px] tracking-widest text-slate-400 font-black">
                Total Credits
              </p>

              <h2 className="text-4xl font-black text-emerald-600 mt-3">
                ₹9.2L
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp size={28} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase text-[11px] tracking-widest text-slate-400 font-black">
                Total Debits
              </p>

              <h2 className="text-4xl font-black text-rose-600 mt-3">
                ₹4.4L
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <TrendingDown size={28} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase text-[11px] tracking-widest text-slate-400 font-black">
                Pending Settlements
              </p>

              <h2 className="text-4xl font-black text-orange-500 mt-3">
                18
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
              <Receipt size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* TOOLBAR */}

      <div className="bg-white border border-slate-200 rounded-3xl p-4 flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search balance entries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[320px] h-12 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <button className="h-12 px-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center gap-2 text-slate-600 font-semibold">
            <Filter size={16} />
            Filters
          </button>

          <button className="h-12 px-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center gap-2 text-slate-600 font-semibold">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left uppercase text-[11px] tracking-widest text-slate-400">
              <th className="p-5">Reference</th>
              <th className="p-5">Type</th>
              <th className="p-5">Payment Mode</th>
              <th className="p-5">Amount</th>
              <th className="p-5">Date</th>
              <th className="p-5">Status</th>
              <th className="p-5"></th>
            </tr>
          </thead>

          <tbody>
            {filteredStatements.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-100 hover:bg-slate-50 transition-all"
              >
                <td className="p-5">
                  <div>
                    <h3 className="font-black text-slate-800 text-sm">
                      {item.reference}
                    </h3>

                    <p className="text-xs text-slate-400 font-semibold mt-1">
                      {item.id}
                    </p>
                  </div>
                </td>

                <td className="p-5">
                  {item.type === "Credit" ? (
                    <span className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm">
                      <ArrowDownCircle size={16} />
                      Credit
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-rose-600 font-bold text-sm">
                      <ArrowUpCircle size={16} />
                      Debit
                    </span>
                  )}
                </td>

                <td className="p-5 font-semibold text-slate-600">
                  {item.paymentMode}
                </td>

                <td className="p-5">
                  <div
                    className={`font-black text-lg ${
                      item.type === "Credit"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    ₹{item.amount.toLocaleString()}
                  </div>
                </td>

                <td className="p-5">
                  <div className="flex items-center gap-2 text-slate-500 font-semibold">
                    <CalendarDays size={16} />
                    {item.date}
                  </div>
                </td>

                <td className="p-5">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-bold ${
                      item.status === "Completed"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-orange-50 text-orange-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-5 relative">
                  <button
                    onClick={() =>
                      setActiveMenu(
                        activeMenu === item.id ? null : item.id
                      )
                    }
                    className="p-2 hover:bg-slate-100 rounded-xl"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {activeMenu === item.id && (
                    <div className="absolute right-5 top-14 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
                      <button className="w-full px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-sm font-semibold text-slate-700">
                        <Eye size={16} />
                        View Details
                      </button>

                      <button className="w-full px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-sm font-semibold text-slate-700">
                        <Edit size={16} />
                        Edit Entry
                      </button>

                      <button className="w-full px-4 py-3 hover:bg-rose-50 flex items-center gap-3 text-sm font-semibold text-rose-600">
                        <Trash2 size={16} />
                        Delete Entry
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStatements.length === 0 && (
          <div className="p-20 text-center text-slate-400 uppercase tracking-widest font-bold">
            No Balance Statements Found
          </div>
        )}
      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-[32px] border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-slate-800">
                  Create Balance Entry
                </h2>

                <p className="text-slate-500 font-medium mt-2">
                  Add debit or credit transaction records
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSave}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">
                  Reference
                </label>

                <input
                  required
                  type="text"
                  value={formData.reference}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reference: e.target.value,
                    })
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">
                  Type
                </label>

                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value,
                    })
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <option>Credit</option>
                  <option>Debit</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">
                  Amount
                </label>

                <input
                  required
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amount: e.target.value,
                    })
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">
                  Payment Mode
                </label>

                <select
                  value={formData.paymentMode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentMode: e.target.value,
                    })
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="">Select</option>
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Card</option>
                  <option>Bank Transfer</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">
                  Date
                </label>

                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date: e.target.value,
                    })
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">
                  Remarks
                </label>

                <input
                  type="text"
                  value={formData.remarks}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      remarks: e.target.value,
                    })
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black tracking-wide"
                >
                  SAVE ENTRY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BalanceStatements;