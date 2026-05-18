import React, { useState } from 'react';
import {
  Search, Filter, Users, UserCheck, UserX, Edit2, Trash2, Plus, X, DollarSign, Target, Award, Laptop, Shirt, Footprints, User
} from 'lucide-react';

const StaffManagement = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  const [staffList, setStaffList] = useState([
    {
      id: 'EMP-001',
      name: 'Mariya Sultan',
      role: 'Store Manager',
      status: 'Active',
      email: 'mariya@retailmaster.com',
      target: '₹50,000',
      salesData: { achieved: '₹42,500', percentage: 85, breakdown: { electronics: '₹22,000', apparel: '₹12,500', footwear: '₹8,000' } }
    },
    {
      id: 'EMP-002',
      name: 'Priya Patel',
      role: 'Sales Manager',
      status: 'Active',
      email: 'priya@retailmaster.com',
      target: '₹35,000',
      salesData: { achieved: '₹38,500', percentage: 110, breakdown: { electronics: '₹15,000', apparel: '₹16,000', footwear: '₹7,500' } }
    },
    {
      id: 'EMP-003',
      name: 'Bitu Singh',
      role: 'Supervisor',
      status: 'Inactive',
      email: 'bitu@retailmaster.com',
      target: '₹30,000',
      salesData: { achieved: '₹12,000', percentage: 40, breakdown: { electronics: '₹5,000', apparel: '₹4,500', footwear: '₹2,500' } }
    },
    {
      id: 'EMP-004',
      name: 'Sanjit Kumar',
      role: 'Cashier',
      status: 'Active',
      email: 'sanjit@retailmaster.com',
      target: '₹15,000',
      salesData: { achieved: '₹14,250', percentage: 95, breakdown: { electronics: '₹3,000', apparel: '₹8,250', footwear: '₹3,000' } }
    },
    {
      id: 'EMP-005',
      name: 'Aman Bharti',
      role: 'Billing Staff',
      status: 'Active',
      email: 'aman@retailmaster.com',
      target: '₹50,000',
      salesData: { achieved: '₹49,000', percentage: 98, breakdown: { electronics: '₹25,000', apparel: '₹15,000', footwear: '₹9,000' } }
    }
  ]);

  const filteredStaff = staffList.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || employee.role === selectedRole;
    return matchesSearch && matchesRole;
  });

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
    if (window.confirm(`Are you sure you want to remove ${name} (${id})?`)) {
      setStaffList(staffList.filter(e => e.id !== id));
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6 font-plus-jakarta pb-20 p-4 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-[18px] bg-blue-50 flex items-center justify-center border border-blue-100">
              <Users size={26} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800">Staff Targets</h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">Manage team performance & goals</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-6 py-3 rounded-[16px] font-bold flex items-center gap-2 text-sm shadow-lg shadow-blue-600/20"
          >
            <Plus size={18} strokeWidth={3} /> ADD STAFF
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total Staff</p>
            <h3 className="text-3xl font-black text-slate-800 mt-1">{totalCount}</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100"><Users size={24} /></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Active Staff</p>
            <h3 className="text-3xl font-black text-emerald-600 mt-1">{activeCount}</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100"><UserCheck size={24} /></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Inactive Staff</p>
            <h3 className="text-3xl font-black text-rose-600 mt-1">{inactiveCount}</h3>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100"><UserX size={24} /></div>
        </div>
      </div>

      {/* COMMAND TOOLBAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm mb-6">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, ID or email..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 font-medium transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full md:w-64">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20 font-medium appearance-none cursor-pointer"
          >
            <option value="All">All Roles</option>
            <option value="Store Manager">Store Manager</option>
            <option value="Sales Manager">Sales Manager</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Cashier">Cashier</option>
            <option value="Billing Staff">Billing Staff</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-[0.15em] text-xs border-b border-slate-100">
              <tr>
                <th className="p-5 pl-8">Employee ID</th>
                <th className="p-5">Name & Email</th>
                <th className="p-5">Role</th>
                <th className="p-5 text-center">Status</th>
                <th className="p-5 pr-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStaff.length > 0 ? (
                filteredStaff.map((employee) => (
                  <tr key={employee.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-5 pl-8 font-mono font-bold text-slate-600">{employee.id}</td>
                    <td className="p-5">
                      <div className="font-bold text-slate-800 uppercase tracking-tight">{employee.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{employee.email}</div>
                    </td>
                    <td className="p-5">
                      <span className="px-3 py-1 rounded-lg text-[10px] font-bold text-slate-600 uppercase border border-slate-200 bg-white shadow-sm">{employee.role}</span>
                    </td>
                    <td className="p-5 text-center">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm ${employee.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="p-5 pr-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openSalesModal(employee)}
                          className="px-3 py-1.5 text-[10px] uppercase font-black bg-blue-50 border border-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg transition-all shadow-sm"
                        >
                          Sales
                        </button>
                        <button
                          onClick={() => openEditModal(employee)}
                          className="p-2 bg-slate-50 border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200 rounded-lg transition-all shadow-sm"
                          title="Edit Info"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(employee.id, employee.name)}
                          className="p-2 bg-slate-50 border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 rounded-lg transition-all shadow-sm"
                          title="Remove Member"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center">
                    <p className="text-slate-400 font-bold uppercase tracking-widest">No matching records found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SALES MODAL */}
      {isSalesModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">Sales Metrics</h3>
              <button onClick={() => setIsSalesModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-800 bg-white rounded-full border border-slate-200 shadow-sm transition-all">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold font-mono">
                  {selectedEmployee.id.split('-')[1]}
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">{selectedEmployee.name}</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">{selectedEmployee.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Target</p>
                  <h5 className="text-sm font-black text-slate-700 mt-1">{selectedEmployee.target}</h5>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Achieved</p>
                  <h5 className="text-sm font-black text-emerald-600 mt-1">{selectedEmployee.salesData.achieved}</h5>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Perf %</p>
                  <h5 className="text-sm font-black text-blue-600 mt-1">{selectedEmployee.salesData.percentage}%</h5>
                </div>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-500 uppercase tracking-widest text-[10px]">Milestone</span>
                  <span className="text-blue-600">{selectedEmployee.salesData.percentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${selectedEmployee.salesData.percentage >= 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min(selectedEmployee.salesData.percentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category Breakdown</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-600 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Laptop size={14} className="text-blue-500" /> Electronics</span>
                    <span className="font-black text-slate-800 text-sm">{selectedEmployee.salesData.breakdown.electronics}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-600 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Shirt size={14} className="text-pink-500" /> Apparel</span>
                    <span className="font-black text-slate-800 text-sm">{selectedEmployee.salesData.breakdown.apparel}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-600 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Footprints size={14} className="text-amber-500" /> Footwear</span>
                    <span className="font-black text-slate-800 text-sm">{selectedEmployee.salesData.breakdown.footwear}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD STAFF MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2"><User size={20} className="text-blue-500" /> Add Team Member</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-800 bg-white p-2 rounded-full border border-slate-200 transition-colors"><X size={16} /></button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
                <input type="text" placeholder="e.g., Mohit Rao" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
                <input type="email" placeholder="mohit@retail.com" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Assigned Role</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all">
                  <option>Store Manager</option>
                  <option>Sales Manager</option>
                  <option>Supervisor</option>
                  <option>Cashier</option>
                  <option>Billing Staff</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-black px-4 py-4 rounded-2xl hover:bg-blue-700 mt-2 uppercase tracking-widest text-xs shadow-lg shadow-blue-600/20 transition-all">Save Member</button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT STAFF MODAL */}
      {isEditModalOpen && editingStaff && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center gap-2"><Edit2 size={20} className="text-blue-500" /> Modify Staff</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-800 bg-white p-2 rounded-full border border-slate-200 transition-colors"><X size={16} /></button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Name</label>
                <input type="text" defaultValue={editingStaff.name} required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Role Profile</label>
                <select defaultValue={editingStaff.role} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all">
                  <option>Store Manager</option>
                  <option>Sales Manager</option>
                  <option>Supervisor</option>
                  <option>Cashier</option>
                  <option>Billing Staff</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Duty Status</label>
                <select defaultValue={editingStaff.status} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-bold transition-all">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-black px-4 py-4 rounded-2xl hover:bg-blue-700 mt-2 uppercase tracking-widest text-xs shadow-lg shadow-blue-600/20 transition-all">Update Member</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;