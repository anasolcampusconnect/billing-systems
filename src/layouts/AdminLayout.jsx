import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/Sidebar/AdminSidebar';
import AdminHeader from '../components/Navbars/AdminHeader';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-200 font-sans overflow-hidden">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden bg-[#0d0d0d]">
        <AdminHeader />
        
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;