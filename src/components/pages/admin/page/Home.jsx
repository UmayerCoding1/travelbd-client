import React, { useEffect, useState } from 'react';
import LineChart from '../../../charts/LineChart';


const AdminHome = () => {
  const [stats, setStats] = useState({ destinations: 0, users: 0, bookings: 0 });
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [destinationsRes, usersRes, bookingsRes, bookingsChartRes] = await Promise.all([
          fetch('/api/admin/total-destinations'),
          fetch('/api/admin/total-users'),
          fetch('/api/admin/total-bookings'),
          fetch('/api/admin/bookings-chart'), // API for chart data
        ]);

        const destinations = await destinationsRes.json();
        const users = await usersRes.json();
        const bookings = await bookingsRes.json();
        const bookingsChart = await bookingsChartRes.json();

        setStats({
          destinations: destinations.total || 0,
          users: users.total || 0,
          bookings: bookings.total || 0,
        });

        setChartData(bookingsChart.data || []);
        setChartLabels(bookingsChart.labels || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="text-black bg-gray-100 min-h-screen overflow-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold">Total Destinations</h2>
              <p className="text-3xl font-bold text-blue-500">{stats.destinations}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold">Total Users</h2>
              <p className="text-3xl font-bold text-green-500">{stats.users}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold">Total Bookings</h2>
              <p className="text-3xl font-bold text-red-500">{stats.bookings}</p>
            </div>
          </div>

          {/* Line Chart Section */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Bookings Overview</h2>
            <LineChart data={chartData} labels={chartLabels} />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHome;