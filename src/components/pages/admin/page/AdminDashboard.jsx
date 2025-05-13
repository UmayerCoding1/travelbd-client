import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Toggle Button */}
      <button
        onClick={toggleDrawer}
        className="p-2 bg-blue-500 text-white fixed top-4 left-4 z-50 rounded-lg "
      >
        {isDrawerOpen ? 'Close' : 'Menu'}
      </button>

      {/* Sidebar */}
      <Sidebar isDrawerOpen={isDrawerOpen} />

      {/* Main Content */}
      <div className={`flex-1 p-4 ${isDrawerOpen ? 'ml-64' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
