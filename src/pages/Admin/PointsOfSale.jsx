import React, { useMemo, useState } from "react";
import {
  MonitorSmartphone,
  Search,
  Filter,
  Download,
  Plus,
  Wifi,
  WifiOff,
  Printer,
  Receipt,
  User,
  Store,
  Wallet,
  Clock3,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Power,
  BadgeIndianRupee,
  Cpu,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const PointsOfSale = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const [formData, setFormData] = useState({
    counterName: "",
    store: "",
    cashier: "",
    printer: "",
    status: "Online",
  });

  const [counters, setCounters] = useState([
    {
      id: "POS-1001",
      counterName: "Counter 01",
      store: "Hyderabad Central",
      cashier: "Ramesh",
      printer: "EPSON TM-T82",
      todaySales: 128450,
      bills: 324,
      openingTime: "08:00 AM",
      status: "Online",
      deviceHealth: "Healthy",
    },
    {
      id: "POS-1002",
      counterName: "Counter 02",
      store: "Bangalore Mall",
      cashier: "Priya",
      printer: "TVS RP-3200",
      todaySales: 98400,
      bills: 248,
      openingTime: "09:00 AM",
      status: "Offline",
      deviceHealth: "Warning",
    },
    {
      id: "POS-1003",
      counterName: "Counter 03",
      store: "Chennai Store",
      cashier: "Anil",
      printer: "EPSON TM-U220",
      todaySales: 75600,
      bills: 182,
      openingTime: "10:00 AM",
      status: "Online",
      deviceHealth: "Healthy",
    },
  ]);

  const filteredCounters = useMemo(() => {
    const q = search.toLowerCase();

    return counters.filter(
      (item) =>
        item.counterName.toLowerCase().includes(q) ||
        item.store.toLowerCase().includes(q) ||
        item.cashier.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
    );
  }, [search, counters]);

  const handleSave = (e) => {
    e.preventDefault();

    const newCounter = {
      id: `POS-${1000 + counters.length + 1}`,
      counterName: formData.counterName,
      store: formData.store,
      cashier: formData.cashier,
      printer: formData.printer,
      todaySales: 0,
      bills: 0,
      openingTime: "08:00 AM",
      status: formData.status,
      deviceHealth: "Healthy",
    };

    setCounters([newCounter, ...counters]);

    setFormData({
      counterName: "",
      store: "",
      cashier: "",
      printer: "",
      status: "Online",
    });

    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-6 space-y-6">
      {/* HEADER */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            Points Of Sale
          </h1>

          <p className="text-slate-500 font-semibold mt-2">
            Manage billing counters, cashier systems & POS operations
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="h-14 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all"
        >
          <Plus size={18} />
          ADD COUNTER
        </button>
      </div>

      {/* ANALYTICS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase text-[11px] tracking-widest text-slate-400 font-black">
                Active Counters
              </p>

              <h2 className="text-4xl font-black text-slate-800 mt-3">
                42
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <MonitorSmartphone size={28} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase text-[11px] tracking-widest text-slate-400 font-black">
                Online Devices
              </p>

              <h2 className="text-4xl font-black text-emerald-600 mt-3">
                38
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Wifi size={28} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase text-[11px] tracking-widest text-slate-400 font-black">
                Offline Devices
              </p>

              <h2 className="text-4xl font-black text-rose-600 mt-3">
                4
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <WifiOff size={28} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase text-[11px] tracking-widest text-slate-400 font-black">
                Daily Revenue
              </p>

              <h2 className="text-4xl font-black text-blue-600 mt-3">
                ₹18.4L
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BadgeIndianRupee size={28} />
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
              placeholder="Search counters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[320px] h-12 rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <button className="h-12 px-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center gap-2 font-semibold text-slate-600">
            <Filter size={16} />
            Filters
          </button>

          <button className="h-12 px-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center gap-2 font-semibold text-slate-600">
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
              <th className="p-5">Counter</th>
              <th className="p-5">Cashier</th>
              <th className="p-5">Printer</th>
              <th className="p-5">Sales</th>
              <th className="p-5">Status</th>
              <th className="p-5">Device Health</th>
              <th className="p-5"></th>
            </tr>
          </thead>

          <tbody>
            {filteredCounters.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-100 hover:bg-slate-50 transition-all"
              >
                <td className="p-5">
                  <div>
                    <h3 className="font-black text-slate-800 text-sm">
                      {item.counterName}
                    </h3>

                    <div className="flex items-center gap-2 mt-2 text-slate-500 text-xs font-semibold">
                      <Store size={13} />
                      {item.store}
                    </div>

                    <p className="text-xs text-slate-400 font-semibold mt-2">
                      {item.id}
                    </p>
                  </div>
                </td>

                <td className="p-5">
                  <div className="flex items-center gap-2 text-slate-600 font-semibold">
                    <User size={16} />
                    {item.cashier}
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-xs mt-2">
                    <Clock3 size={13} />
                    Opened {item.openingTime}
                  </div>
                </td>

                <td className="p-5">
                  <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <Printer size={16} />
                    {item.printer}
                  </div>
                </td>

                <td className="p-5">
                  <div className="space-y-2">
                    <div className="font-black text-emerald-600 text-lg">
                      ₹{item.todaySales.toLocaleString()}
                    </div>

                    <div className="text-xs text-slate-500 font-semibold">
                      {item.bills} Bills
                    </div>
                  </div>
                </td>

                <td className="p-5">
                  {item.status === "Online" ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold">
                      <Wifi size={14} />
                      Online
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold">
                      <WifiOff size={14} />
                      Offline
                    </span>
                  )}
                </td>

                <td className="p-5">
                  {item.deviceHealth === "Healthy" ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold">
                      <CheckCircle2 size={14} />
                      Healthy
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-orange-50 text-orange-500 text-xs font-bold">
                      <AlertTriangle size={14} />
                      Warning
                    </span>
                  )}
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
                    <div className="absolute right-5 top-14 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
                      <button className="w-full px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-sm font-semibold text-slate-700">
                        <Eye size={16} />
                        View Counter
                      </button>

                      <button className="w-full px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-sm font-semibold text-slate-700">
                        <Edit size={16} />
                        Edit Counter
                      </button>

                      <button className="w-full px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-sm font-semibold text-orange-600">
                        <Power size={16} />
                        Restart Device
                      </button>

                      <button className="w-full px-4 py-3 hover:bg-rose-50 flex items-center gap-3 text-sm font-semibold text-rose-600">
                        <Trash2 size={16} />
                        Remove Counter
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredCounters.length === 0 && (
          <div className="p-20 text-center text-slate-400 uppercase tracking-widest font-bold">
            No POS Counters Found
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
                  Add POS Counter
                </h2>

                <p className="text-slate-500 font-medium mt-2">
                  Configure billing counter & cashier system
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
                  Counter Name
                </label>

                <input
                  required
                  type="text"
                  value={formData.counterName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      counterName: e.target.value,
                    })
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">
                  Store
                </label>

                <input
                  required
                  type="text"
                  value={formData.store}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      store: e.target.value,
                    })
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">
                  Cashier Name
                </label>

                <input
                  required
                  type="text"
                  value={formData.cashier}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cashier: e.target.value,
                    })
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600">
                  Printer Model
                </label>

                <input
                  required
                  type="text"
                  value={formData.printer}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      printer: e.target.value,
                    })
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-600">
                  Status
                </label>

                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  className="w-full h-12 rounded-2xl border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <option>Online</option>
                  <option>Offline</option>
                </select>
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black tracking-wide"
                >
                  SAVE COUNTER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsOfSale;