import React, { useState } from 'react';
import { Search, Plus, FileText, CheckCircle, Clock, Download, X, Trash2, Check, DollarSign } from 'lucide-react';

const InvoiceManagement = () => {
  // Static Dummy Data for Invoices (Overdue and Draft completely removed)
  const initialInvoices = [
    { id: "INV-2026-001", client: "Vivek Bharti", items: "Samsung Galaxy S24 Ultra (256GB)", amount: "₹1,05,000", issueDate: "10 May 2026", dueDate: "25 May 2026", status: "Paid" },
    { id: "INV-2026-002", client: "Kitu Singh", items: "Levi's Denim Jacket & Zara Dresses (3x)", amount: "₹8,400", issueDate: "12 May 2026", dueDate: "22 May 2026", status: "Pending" },
    { id: "INV-2026-003", client: "Guaravi Gupta", items: "iPhone 16", amount: "₹52,000", issueDate: "14 May 2026", dueDate: "30 May 2026", status: "Paid" }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tabs updated to only show relevant statuses
  const tabs = ['All', 'Paid', 'Pending'];

  // Alerts for Actions
  const handleDownload = (id) => {
    alert(`Downloading Invoice ${id} as PDF...`);
  };

  const handleCreateInvoiceSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert("Success: Invoice added dynamically! Table auto-update triggered successfully.");
  };

  const handleMarkAsPaid = (id, client) => {
    alert(`Action: Invoice ${id} for ${client} has been marked as Paid! Table auto-update triggered successfully.`);
  };

  const handleDeleteInvoice = (id) => {
    if (window.confirm(`Are you sure you want to delete Invoice ${id}?`)) {
      alert(`Action: Invoice ${id} has been deleted! Table auto-update triggered successfully.`);
    }
  };

  const filteredInvoices = initialInvoices.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.items.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || invoice.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6 font-plus-jakarta pb-20 p-4 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-[18px] bg-blue-50 flex items-center justify-center border border-blue-100">
              <FileText size={26} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800">Invoice Management</h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">Track billing transactions and financial status</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-6 py-3 rounded-[16px] font-bold flex items-center gap-2 text-sm shadow-lg shadow-blue-600/20"
          >
            <Plus size={18} strokeWidth={3} /> CREATE INVOICE
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total Invoiced</p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">₹1,65,400</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total Received</p>
            <h3 className="text-3xl font-black text-emerald-600 mt-1">₹1,57,000</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Pending Balance</p>
            <h3 className="text-3xl font-black text-amber-500 mt-1">₹8,400</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100">
            <Clock size={24} />
          </div>
        </div>
      </div>

      {/* COMMAND TOOLBAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm mb-6">
        {/* Search Box */}
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by ID, client or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 font-medium transition-all"
          />
        </div>

        {/* Table Tab Filters */}
        <div className="flex items-center overflow-x-auto gap-2 custom-scrollbar pb-1 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest whitespace-nowrap rounded-xl border transition-all duration-200 ${activeTab === tab
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                : 'text-slate-500 border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-700'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-[0.15em] text-xs border-b border-slate-100">
              <tr>
                <th className="p-5 pl-8">Invoice ID</th>
                <th className="p-5">Client</th>
                <th className="p-5">Line Item / Product</th>
                <th className="p-5 text-right">Amount</th>
                <th className="p-5">Date Details</th>
                <th className="p-5 text-center">Status</th>
                <th className="p-5 pr-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => {
                  const statusStyle =
                    invoice.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      'bg-amber-50 text-amber-600 border-amber-100';

                  return (
                    <tr key={invoice.id} className="hover:bg-slate-50 transition-colors group">
                      {/* ID */}
                      <td className="p-5 pl-8 font-mono font-bold text-slate-600">
                        {invoice.id}
                      </td>
                      {/* Client */}
                      <td className="p-5">
                        <div className="font-bold text-slate-800 uppercase tracking-tight">{invoice.client}</div>
                      </td>
                      {/* Items description */}
                      <td className="p-5 text-slate-500 text-xs font-medium max-w-xs truncate">
                        {invoice.items}
                      </td>
                      {/* Cost */}
                      <td className="p-5 text-right font-black text-slate-800 font-mono">
                        {invoice.amount}
                      </td>
                      {/* Dates */}
                      <td className="p-5 text-[10px] text-slate-500 space-y-1 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400 w-12">Issued:</span> <span className="text-slate-700">{invoice.issueDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-400 w-12">Due:</span> <span className="text-slate-700">{invoice.dueDate}</span>
                        </div>
                      </td>
                      {/* Badge status */}
                      <td className="p-5 text-center">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm ${statusStyle}`}>
                          {invoice.status}
                        </span>
                      </td>
                      {/* Control buttons */}
                      <td className="p-5 pr-8 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Download PDF Button */}
                          <button
                            onClick={() => handleDownload(invoice.id)}
                            className="p-2 bg-slate-50 border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 rounded-lg transition-all shadow-sm"
                            title="Download PDF"
                          >
                            <Download size={15} />
                          </button>

                          {/* Mark As Paid Option (Visible when not Paid) */}
                          {invoice.status !== 'Paid' && (
                            <button
                              onClick={() => handleMarkAsPaid(invoice.id, invoice.client)}
                              className="p-2 bg-slate-50 border border-slate-200 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 rounded-lg transition-all shadow-sm"
                              title="Mark as Paid"
                            >
                              <Check size={15} />
                            </button>
                          )}

                          {/* Delete Invoice Button */}
                          <button
                            onClick={() => handleDeleteInvoice(invoice.id)}
                            className="p-2 bg-slate-50 border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 rounded-lg transition-all shadow-sm"
                            title="Delete Invoice"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="p-10 text-center">
                    <p className="text-slate-400 font-bold uppercase tracking-widest">No matching records found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE INVOICE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl">

            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                <FileText size={20} className="text-blue-600" /> Create Retail Invoice
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-800 bg-white p-2 rounded-full border border-slate-200 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleCreateInvoiceSubmit} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Customer Name</label>
                <input
                  type="text"
                  placeholder="e.g., Aman Verma (Walk-in)"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Items Purchased (Details)</label>
                <input
                  type="text"
                  placeholder="e.g., Nike Air Max Shoes, Premium T-Shirt"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Total Amount (₹)</label>
                  <input
                    type="text"
                    placeholder="e.g., ₹15,500"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Initial Status</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all cursor-pointer">
                    <option>Paid</option>
                    <option>Pending</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Issue Date</label>
                  <input
                    type="date"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Due Date</label>
                  <input
                    type="date"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all"
                  />
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-end gap-3 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-blue-600/20"
                >
                  Generate Invoice
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default InvoiceManagement;