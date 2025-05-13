import React, { useEffect, useState } from "react";
import useSecureApiEndPoint from "../../../../hooks/useSecureApiEndPoint";
import UserTable from "../components/UserTable";
import toast, {Toaster} from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const secureApiEndPoint = useSecureApiEndPoint();
  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await secureApiEndPoint.get("/all-users"); // Replace with your API endpoint
        setUsers(response.data.allUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (userId) => {
    
    try {
      const response = await secureApiEndPoint.delete(`/delete-user/${userId}`);


      if (response.data.success) {
        setUsers(response.data.allUsers);
        toast.success(response.data.message, {duration:1000})
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
<div className="overflow-x-auto w-full mb-20">
  <table className="table w-full text-sm md:text-base">
    {/* head */}
    <thead className="bg-gray-200 text-black hidden md:table-header-group">
      <tr className="">
        <th className="whitespace-nowrap p-2">Avatar</th>
        <th className="whitespace-nowrap p-2">User name</th>
        <th className="whitespace-nowrap p-2">Email</th>
        <th className="whitespace-nowrap p-2">Role</th>
        <th className="whitespace-nowrap p-2">Gender</th>
        <th className="whitespace-nowrap p-2">Action</th>
      </tr>
    </thead>
    <tbody>
      {users?.map((user) => (
        <UserTable key={user._id} user={user} action={handleDelete}/>
      ))}
    </tbody>
  </table>

  <Toaster  containerStyle={false} position="top-r"/>
</div>

  );
};

export default Users;
