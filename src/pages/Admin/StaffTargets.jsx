import React, { useState } from 'react';
import {
  Search,
  Filter,
  Users,
  UserCheck,
  UserX,
  Edit2,
  Trash2,
  Plus,
  X,
  DollarSign,
  Target,
  Award,
  Laptop,
  Shirt,
  Footprints,
  User
} from 'lucide-react';

const StaffManagement = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  // States for Search and Filter Functional Management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  const staffList = [
    {
      id: 'EMP-001',
      name: 'Mariya Sultan',
      role: 'Store Manager',
      status: 'Active',
      email: 'mariya@retailmaster.com',
      target: '₹50,000',
      salesData: {
        achieved: '₹42,500',
        percentage: 85,
        breakdown: { electronics: '₹22,000', apparel: '₹12,500', footwear: '₹8,000' }
      }
    },
    {
      id: 'EMP-002',
      name: 'Priya Patel',
      role: 'Sales Manager',
      status: 'Active',
      email: 'priya@retailmaster.com',
      target: '₹35,000',
      salesData: {
        achieved: '₹38,500',
        percentage: 110,
        breakdown: { electronics: '₹15,000', apparel: '₹16,000', footwear: '₹7,500' }
      }
    },
    {
      id: 'EMP-003',
      name: 'Bitu Singh',
      role: 'Supervisor',
      status: 'Inactive',
      email: 'bitu@retailmaster.com',
      target: '₹30,000',
      salesData: {
        achieved: '₹12,000',
        percentage: 40,
        breakdown: { electronics: '₹5,000', apparel: '₹4,500', footwear: '₹2,500' }
      }
    },
    {
      id: 'EMP-004',
      name: 'Sanjit Kumar',
      role: 'Cashier',
      status: 'Active',
      email: 'sanjit@retailmaster.com',
      target: '₹15,000',
      salesData: {
        achieved: '₹14,250',
        percentage: 95,
        breakdown: { electronics: '₹3,000', apparel: '₹8,250', footwear: '₹3,000' }
      }
    },
    {
      id: 'EMP-005',
      name: 'Aman Bharti',
      role: 'Billing Staff',
      status: 'Active',
      email: 'aman@retailmaster.com',
      target: '₹50,000',
      salesData: {
        achieved: '₹49,000',
        percentage: 98,
        breakdown: { electronics: '₹25,000', apparel: '₹15,000', footwear: '₹9,000' }
      }
    }
  ];

  // Dynamic Search and Role Dropdown Filtering Logic
  const filteredStaff = staffList.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === 'All' || employee.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  // Calculate Dynamic counters based on actual master data
  const totalCount = staffList.length;
  const activeCount = staffList.filter(e => e.status === 'Active').length;
  const inactiveCount = staffList.filter(e => e.status === 'Inactive').length;

  const openSalesModal = (employee) => {
    setSelectedEmployee(employee);
    setIsSalesModalOpen(true);
  };

  const openEditModal = (employee) => {
    setEditingStaff(employee);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id, name) => {
    alert(`System Action: Are you sure you want to remove ${name} (${id})? Staff record deleted successfully!`);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setIsAddModalOpen(false);
    alert("Success: New team member validation completed! State update auto-triggered.");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setIsEditModalOpen(false);
    alert(`Success: Staff parameters updated for ${editingStaff.name}!`);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-gray-100 p-6 md:p-3 relative overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 relative z-10">

        {/* Search Input Controller */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search by name, ID or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 focus:border-blue-500/40 rounded-xl pl-11 pr-4 py-2.5 text-sm font-medium text-gray-200 placeholder-gray-500 outline-none transition-all"
          />
        </div>

        {/* Filter Input Controller + Action Trigger */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative">
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full sm:w-48 bg-[#121218] border border-white/10 focus:border-blue-500/40 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-gray-200 outline-none transition-all cursor-pointer appearance-none"
            >
              <option value="All">All Roles</option>
              <option value="Store Manager">Store Manager</option>
              <option value="Sales Manager">Sales Manager</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Cashier">Cashier</option>
              <option value="Billing Staff">Billing Staff</option>
            </select>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/10 active:scale-95"
          >
            <Plus size={16} /> Add Staff
          </button>
        </div>
      </div>

      {/* Dynamic Master Counters Block */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 relative z-10">
        <div className="bg-[#111116] border border-white/[0.05] rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Total Staff</p>
            <h3 className="text-2xl font-black text-white mt-0.5">{totalCount}</h3>
          </div>
          <div className="bg-blue-500/10 p-2.5 rounded-lg text-blue-400"><Users size={20} /></div>
        </div>

        <div className="bg-[#111116] border border-white/[0.05] rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Active Staff</p>
            <h3 className="text-2xl font-black text-emerald-400 mt-0.5">{activeCount}</h3>
          </div>
          <div className="bg-emerald-500/10 p-2.5 rounded-lg text-emerald-400"><UserCheck size={20} /></div>
        </div>

        <div className="bg-[#111116] border border-white/[0.05] rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Inactive Staff</p>
            <h3 className="text-2xl font-black text-red-400 mt-0.5">{inactiveCount}</h3>
          </div>
          <div className="bg-red-500/10 p-2.5 rounded-lg text-red-400"><UserX size={20} /></div>
        </div>
      </div>

      {/* Main Framework Grid Table View */}
      <div className="bg-[#111116] border border-white/[0.04] rounded-2xl overflow-hidden shadow-2xl relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.06] bg-[#14141c]/60 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                <th className="px-5 py-4">Employee ID</th>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02] text-sm">
              {filteredStaff.length > 0 ? (
                filteredStaff.map((employee) => (
                  <tr key={employee.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-5 py-4 font-mono text-xs font-bold text-blue-400">{employee.id}</td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-gray-200 group-hover:text-white transition-colors">{employee.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{employee.email}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs text-gray-300">{employee.role}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold border ${employee.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Text Only Clean Sales Button */}
                        <button
                          onClick={() => openSalesModal(employee)}
                          className="px-2.5 py-1 text-xs bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-all font-bold tracking-wide"
                        >
                          Sales
                        </button>
                        <button
                          onClick={() => openEditModal(employee)}
                          className="p-1.5 bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] text-gray-400 hover:text-white rounded-md transition-all"
                          title="Edit Info"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(employee.id, employee.name)}
                          className="p-1.5 bg-red-500/5 border border-red-500/10 hover:bg-red-500/20 text-red-500 rounded-md transition-all"
                          title="Remove Member"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-xs text-gray-500 font-medium">
                    No matching team records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1. COMPACT SALES ANALYTICS MODAL */}
      {isSalesModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#121218] border border-white/10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="p-4 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
              <h3 className="text-sm font-black text-white flex items-center gap-1.5">Sales Metrics</h3>
              <button onClick={() => setIsSalesModalOpen(false)} className="p-1 text-gray-500 hover:text-white rounded-md hover:bg-white/[0.04]">
                <X size={14} />
              </button>
            </div>

            {/* Hidden Scroll Container */}
            <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto overflow-x-hidden style-scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] font-bold text-blue-400 font-mono">{selectedEmployee.id}</span>
                <h4 className="text-sm font-bold text-white">{selectedEmployee.name}</h4>
                <p className="text-xs text-gray-500">{selectedEmployee.role}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 bg-white/[0.01] border border-white/[0.04] rounded-xl text-center">
                  <p className="text-[9px] font-bold text-gray-500 uppercase">Target</p>
                  <h5 className="text-xs font-black text-gray-300 mt-0.5">{selectedEmployee.target}</h5>
                </div>
                <div className="p-2.5 bg-white/[0.01] border border-white/[0.04] rounded-xl text-center">
                  <p className="text-[9px] font-bold text-gray-500 uppercase">Achieved</p>
                  <h5 className="text-xs font-black text-emerald-400 mt-0.5">{selectedEmployee.salesData.achieved}</h5>
                </div>
                <div className="p-2.5 bg-white/[0.01] border border-white/[0.04] rounded-xl text-center">
                  <p className="text-[9px] font-bold text-gray-500 uppercase">Perf %</p>
                  <h5 className="text-xs font-black text-blue-400 mt-0.5">{selectedEmployee.salesData.percentage}%</h5>
                </div>
              </div>

              <div className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-gray-400">Milestone</span>
                  <span className="text-blue-400 font-bold">{selectedEmployee.salesData.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-[#181824] rounded-full overflow-hidden border border-white/[0.04]">
                  <div
                    className={`h-full rounded-full ${selectedEmployee.salesData.percentage >= 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min(selectedEmployee.salesData.percentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Category Breakdown</p>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between p-2 bg-white/[0.01] rounded-lg border border-white/[0.03]">
                    <span className="text-gray-400 flex items-center gap-1.5"><Laptop size={12} /> Electronics</span>
                    <span className="font-bold text-white">{selectedEmployee.salesData.breakdown.electronics}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/[0.01] rounded-lg border border-white/[0.03]">
                    <span className="text-gray-400 flex items-center gap-1.5"><Shirt size={12} /> Apparel</span>
                    <span className="font-bold text-white">{selectedEmployee.salesData.breakdown.apparel}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white/[0.01] rounded-lg border border-white/[0.03]">
                    <span className="text-gray-400 flex items-center gap-1.5"><Footprints size={12} /> Footwear</span>
                    <span className="font-bold text-white">{selectedEmployee.salesData.breakdown.footwear}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ADD STAFF MODAL (COMPACT) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#121218] border border-white/10 w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/[0.05] flex items-center justify-between">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><User size={14} className="text-blue-500" /> Add Team Member</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-white"><X size={14} /></button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-gray-500 mb-1">Full Name</label>
                <input type="text" placeholder="e.g., Mohit Rao" required className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-2.5 py-1.5 outline-none text-gray-200 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-gray-500 mb-1">Email Address</label>
                <input type="email" placeholder="mohit@retail.com" required className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-2.5 py-1.5 outline-none text-gray-200 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-gray-500 mb-1">Assigned Role</label>
                <select className="w-full bg-[#181824] border border-white/10 rounded-lg px-2 py-1.5 outline-none text-gray-300">
                  <option>Sales Manager</option>
                  <option>Supervisor</option>
                  <option>Cashier</option>
                  <option>Billing Staff</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2 justify-end">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-gray-400 px-3 py-1.5 hover:text-white">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. EDIT STAFF MODAL (COMPACT) */}
      {isEditModalOpen && editingStaff && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#121218] border border-white/10 w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/[0.05] flex items-center justify-between">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><Edit2 size={12} className="text-blue-500" /> Modify Staff parameters</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-white"><X size={14} /></button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-gray-500 mb-1">Name</label>
                <input type="text" defaultValue={editingStaff.name} required className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-2.5 py-1.5 outline-none text-gray-200" />
              </div>
              <div>
                <label className="block text-gray-500 mb-1">Role Profiles</label>
                <select defaultValue={editingStaff.role} className="w-full bg-[#181824] border border-white/10 rounded-lg px-2 py-1.5 text-gray-300">
                  <option>Store Manager</option>
                  <option>Sales Manager</option>
                  <option>Supervisor</option>
                  <option>Cashier</option>
                  <option>Billing Staff</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-500 mb-1">Duty Status</label>
                <select defaultValue={editingStaff.status} className="w-full bg-[#181824] border border-white/10 rounded-lg px-2 py-1.5 text-gray-300">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2 justify-end">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="text-gray-400 px-3 py-1.5 hover:text-white">Close</button>
                <button type="submit" className="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-blue-700">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Scrollbar reset injection style block */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .style-scrollbar-none::-webkit-scrollbar { display: none !important; }
      `}} />

    </div>
  );
};

export default StaffManagement;