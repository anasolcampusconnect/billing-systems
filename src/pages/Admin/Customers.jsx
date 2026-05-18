import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Wallet,
  Receipt,
  Search,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Store,
  User,
  Clock3,
  BadgeIndianRupee,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const EndOfDay = () => {
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);

  const [statements] = useState([
    {
      id: "EOD-1001",
      store: "Hyderabad Central",
      cashier: "Ramesh",
      totalSales: 128450,
      totalBills: 324,
      cashCollected: 68400,
      onlineCollected: 60050,
      refunds: 2500,
      openingBalance: 10000,
      closingBalance: 78400,
      expectedCash: 78400,
      actualCash: 78000,
      difference: -400,
      shift: "Morning",
      status: "Closed",
      date: "15 May 2026",
    },
    {
      id: "EOD-1002",
      store: "Bangalore Mall",
      cashier: "Priya",
      totalSales: 98400,
      totalBills: 248,
      cashCollected: 42200,
      onlineCollected: 56200,
      refunds: 1200,
      openingBalance: 8000,
      closingBalance: 50200,
      expectedCash: 50200,
      actualCash: 50200,
      difference: 0,
      shift: "Evening",
      status: "Closed",
      date: "15 May 2026",
    },
    {
      id: "EOD-1003",
      store: "Chennai Store",
      cashier: "Anil",
      totalSales: 75600,
      totalBills: 182,
      cashCollected: 35100,
      onlineCollected: 40500,
      refunds: 800,
      openingBalance: 7000,
      closingBalance: 42100,
      expectedCash: 42100,
      actualCash: 41700,
      difference: -400,
      shift: "Night",
      status: "Mismatch",
      date: "15 May 2026",
    },
  ]);

  const filteredStatements = useMemo(() => {
    const q = search.toLowerCase();

    return statements.filter(
      (item) =>
        item.store.toLowerCase().includes(q) ||
        item.cashier.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
    );
  }, [search, statements]);

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-6 space-y-6">
      {/* HEADER */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
        <div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            End Of Day Statements
          </h1>

          <p className="text-slate-500 font-semibold mt-2">
            Monitor cashier closures, settlements, cash mismatches & daily sales
          </p>
        </div>

        <button className="h-14 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all">
          <Download size={18} />
          EXPORT REPORTS
        </button>
      </div>

      {/* ANALYTICS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase text-[11px] tracking-widest text-slate-400 font-black">
                Today Sales
              </p>

              <h2 className="text-4xl font-black text-slate-800 mt-3">
                ₹12.8L
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp size={28} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase text-[11px] tracking-widest text-slate-400 font-black">
                Total Bills
              </p>

              <h2 className="text-4xl font-black text-emerald-600 mt-3">
                2,482
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Receipt size={28} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase text-[11px] tracking-widest text-slate-400 font-black">
                Cash Mismatch
              </p>

              <h2 className="text-4xl font-black text-rose-600 mt-3">
                ₹800
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle size={28} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="uppercase text-[11px] tracking-widest text-slate-400 font-black">
                Active Stores
              </p>

              <h2 className="text-4xl font-black text-blue-600 mt-3">
                18
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Store size={28} />
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
              placeholder="Search EOD statements..."
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
            <CalendarDays size={16} />
            Today
          </button>
        </div>
      </div>

      {/* TABLE */}

      <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left uppercase text-[11px] tracking-widest text-slate-400">
              <th className="p-5">Store & Cashier</th>
              <th className="p-5">Sales</th>
              <th className="p-5">Collections</th>
              <th className="p-5">Cash Balance</th>
              <th className="p-5">Difference</th>
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
                      {item.store}
                    </h3>

                    <div className="flex items-center gap-2 mt-2 text-slate-500 text-xs font-semibold">
                      <User size={13} />
                      {item.cashier}

                      <span className="mx-2">•</span>

                      <Clock3 size={13} />
                      {item.shift}
                    </div>

                    <p className="text-xs text-slate-400 font-semibold mt-2">
                      {item.id}
                    </p>
                  </div>
                </td>

                <td className="p-5">
                  <div className="space-y-2">
                    <div className="font-black text-slate-800 text-lg">
                      ₹{item.totalSales.toLocaleString()}
                    </div>

                    <div className="text-xs text-slate-500 font-semibold">
                      {item.totalBills} Bills
                    </div>
                  </div>
                </td>

                <td className="p-5">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-10">
                      <span className="text-slate-500 font-semibold">
                        Cash
                      </span>

                      <span className="font-black text-emerald-600">
                        ₹{item.cashCollected.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between gap-10">
                      <span className="text-slate-500 font-semibold">
                        Online
                      </span>

                      <span className="font-black text-indigo-600">
                        ₹{item.onlineCollected.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between gap-10">
                      <span className="text-slate-500 font-semibold">
                        Refunds
                      </span>

                      <span className="font-black text-rose-600">
                        ₹{item.refunds.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="p-5">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-10">
                      <span className="text-slate-500 font-semibold">
                        Expected
                      </span>

                      <span className="font-black text-slate-800">
                        ₹{item.expectedCash.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between gap-10">
                      <span className="text-slate-500 font-semibold">
                        Actual
                      </span>

                      <span className="font-black text-indigo-600">
                        ₹{item.actualCash.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="p-5">
                  <div
                    className={`font-black text-lg ${
                      item.difference === 0
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    ₹{item.difference}
                  </div>
                </td>

                <td className="p-5">
                  {item.status === "Closed" ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-600 text-xs font-bold">
                      <CheckCircle2 size={14} />
                      Closed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold">
                      <AlertTriangle size={14} />
                      Mismatch
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
                    <div className="absolute right-5 top-14 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
                      <button className="w-full px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-sm font-semibold text-slate-700">
                        <Eye size={16} />
                        View Report
                      </button>

                      <button className="w-full px-4 py-3 hover:bg-slate-50 flex items-center gap-3 text-sm font-semibold text-slate-700">
                        <Printer size={16} />
                        Print Statement
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
            No Statements Found
          </div>
        )}
      </div>
    </div>
  );
};

export default EndOfDay;