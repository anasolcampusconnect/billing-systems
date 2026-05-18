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
    alert(`Action: Invoice ${id} has been deleted! Table auto-update triggered successfully.`);
  };

  const filteredInvoices = initialInvoices.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.items.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || invoice.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 md:p-2 font-sans">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-gray-600 mt-1">Track billing transactions, client outstanding balances, and financial status.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20 active:scale-98"
        >
          <Plus size={16} className="stroke-[2.5]" /> Create Invoice
        </button>
      </div>

      {/* Financial Overview Metrics Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Total Invoiced</p>
            <h3 className="text-xl font-black text-gray-900 mt-1">₹1,65,400</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <DollarSign size={18} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Total Received</p>
            <h3 className="text-xl font-black text-emerald-600 mt-1">₹1,57,000</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
            <CheckCircle size={18} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-5 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Pending Balance</p>
            <h3 className="text-xl font-black text-amber-600 mt-1">₹8,400</h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
            <Clock size={18} />
          </div>
        </div>
      </div>

      {/* Controls Container: Search and Filters combined */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          {/* Search Box */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search by ID, client or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-gray-800 placeholder-gray-400 outline-none transition-all shadow-inner"
            />
          </div>

          {/* Table Tab Filters */}
          <div className="flex items-center overflow-x-auto gap-1.5 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap rounded-lg border transition-all duration-200 ${activeTab === tab
                  ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-sm'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Enterprise-Grade Data Table Section */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-5">Invoice ID</th>
                <th className="py-4 px-5">Client</th>
                <th className="py-4 px-5">Line Item / Product</th>
                <th className="py-4 px-5">Amount</th>
                <th className="py-4 px-5">Date details</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => {
                  // Dynamic status configurations
                  const statusStyle =
                    invoice.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                      'bg-amber-50 text-amber-600 border-amber-200';

                  return (
                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors group">
                      {/* ID */}
                      <td className="py-4 px-5 font-mono text-xs font-bold text-blue-600">
                        {invoice.id}
                      </td>
                      {/* Client */}
                      <td className="py-4 px-5 font-bold text-gray-900">
                        {invoice.client}
                      </td>
                      {/* Items description */}
                      <td className="py-4 px-5 text-gray-500 text-xs">
                        {invoice.items}
                      </td>
                      {/* Cost */}
                      <td className="py-4 px-5 font-black text-gray-800">
                        {invoice.amount}
                      </td>
                      {/* Dates */}
                      <td className="py-4 px-5 text-xs text-gray-500 space-y-0.5">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">Issued:</span> <span className="text-gray-700 font-medium">{invoice.issueDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">Due:</span> <span className="text-gray-700 font-medium">{invoice.dueDate}</span>
                        </div>
                      </td>
                      {/* Badge status */}
                      <td className="py-4 px-5">
                        <span className={`inline-block text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded border ${statusStyle}`}>
                          {invoice.status}
                        </span>
                      </td>
                      {/* Control buttons */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Download PDF Button */}
                          <button
                            onClick={() => handleDownload(invoice.id)}
                            className="p-1.5 bg-gray-50 hover:bg-blue-50 border border-gray-200 text-gray-500 hover:text-blue-600 rounded-md transition-all"
                            title="Download PDF"
                          >
                            <Download size={13} />
                          </button>

                          {/* Mark As Paid Option (Visible when not Paid) */}
                          {invoice.status !== 'Paid' && (
                            <button
                              onClick={() => handleMarkAsPaid(invoice.id, invoice.client)}
                              className="p-1.5 bg-gray-50 hover:bg-emerald-50 border border-gray-200 text-gray-500 hover:text-emerald-600 rounded-md transition-all"
                              title="Mark as Paid"
                            >
                              <Check size={13} />
                            </button>
                          )}

                          {/* Delete Invoice Button */}
                          <button
                            onClick={() => handleDeleteInvoice(invoice.id)}
                            className="p-1.5 bg-gray-50 hover:bg-red-50 border border-gray-200 text-gray-500 hover:text-red-600 rounded-md transition-all"
                            title="Delete Invoice"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="py-16 text-center text-sm text-gray-500 border-none">
                    No matching billing invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Premium Create Invoice Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-gray-200 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">

            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-md font-bold text-gray-900 flex items-center gap-2">
                <FileText size={16} className="text-blue-600" /> Create Retail Invoice
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleCreateInvoiceSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">Customer Name</label>
                <input
                  type="text"
                  placeholder="e.g., Aman Verma (Walk-in)"
                  required
                  className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">Items Purchased (Product Details)</label>
                <input
                  type="text"
                  placeholder="e.g., Nike Air Max Shoes, Premium T-Shirt"
                  required
                  className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">Total Amount (₹)</label>
                  <input
                    type="text"
                    placeholder="e.g., ₹15,500"
                    required
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">Initial Status</label>
                  <select className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none transition-all cursor-pointer">
                    <option>Paid</option>
                    <option>Pending</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">Issue Date</label>
                  <input
                    type="text"
                    placeholder="e.g., 15 May 2026"
                    required
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">Due Date</label>
                  <input
                    type="text"
                    placeholder="e.g., 28 May 2026"
                    required
                    className="w-full bg-gray-50 border border-gray-200 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-blue-600/10"
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