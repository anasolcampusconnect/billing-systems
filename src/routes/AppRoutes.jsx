import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import StaffDashboard from '../pages/Staff/StaffDashboard';
import AdminLayout from '../layouts/AdminLayout';
import DashboardHome from '../pages/Admin/DashboardHome';
import Inventory from '../pages/Admin/Inventory';
import StaffTargets from '../pages/Admin/StaffTargets';

import Notifications from '../pages/Admin/Notifications';
import Hospitality from '../pages/Admin/Hospitality';
import Ticketing from '../pages/Admin/Ticketing';
import Assortments from '../pages/Admin/Assortments';
import BalanceStatements from '../pages/Admin/BalanceStatements';
import CommodityGroups from '../pages/Admin/CommodityGroups';
import Customers from '../pages/Admin/Customers';
import EndOfDay from '../pages/Admin/EndOfDay';
import PointsOfSale from '../pages/Admin/PointsOfSale';
import Products from '../pages/Admin/Products';
import Receipts from '../pages/Admin/Receipts';
import Promotions from '../pages/Admin/Promotions';
import Invoicing from '../pages/Admin/Invoicing';
import Evaluations from '../pages/Admin/Evaluations';
import SettingsPage from '../pages/Admin/SettingsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/staff" element={<StaffDashboard />} />
      
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="hospitality" element={<Hospitality />} />
        <Route path="ticketing" element={<Ticketing />} />
        <Route path="staff" element={<StaffTargets />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="invoicing" element={<Invoicing />} />
        <Route path="evaluations" element={<Evaluations />} />
        <Route path="settings" element={<SettingsPage />} />
        
        {/* Sales Sub-routes */}
        <Route path="sales/assortments" element={<Assortments />} />
        <Route path="sales/balance" element={<BalanceStatements />} />
        <Route path="sales/commodity" element={<CommodityGroups />} />
        <Route path="sales/customers" element={<Customers />} />
        <Route path="sales/eod" element={<EndOfDay />} />
        <Route path="sales/pos" element={<PointsOfSale />} />
        <Route path="sales/products" element={<Products />} />
        <Route path="sales/receipts" element={<Receipts />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;