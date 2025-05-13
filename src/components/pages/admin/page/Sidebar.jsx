import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Sidebar = ({ isDrawerOpen }) => {
  return (
    <div
      className={`w-64 bg-white shadow-md h-screen p-4 fixed top-0 left-0 z-40 transform transition-transform ${
        isDrawerOpen ? 'translate-x-0 ' : '-translate-x-full hidden'
      } md:translate-x-0`}
    >
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/admin/home"
          className={({ isActive }) =>
            `py-2 px-4 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/destinations"
          className={({ isActive }) =>
            `py-2 px-4 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
          }
        >
          Manage Destinations
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `py-2 px-4 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
          }
        >
          Manage Users
        </NavLink>
        <NavLink
          to="/admin/bookings"
          className={({ isActive }) =>
            `py-2 px-4 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'}`
          }
        >
          Manage Bookings
        </NavLink>
      </nav>
    </div>
  );
};



export default Sidebar;
