import React from "react";
import { userImg } from "../../../../provider/ImageProvider";
// import {userImg} from ''
const UserTable = ({ user,action }) => {


  return (
    <tr className="flex flex-col md:table-row border md:border-0 mb-4 md:mb-0 bg-white text-black rounded-lg md:rounded-none shadow md:shadow-none p-3 md:p-0">
    <td className="w-full md:w-48  flex items-center md:table-cell mb-2 md:mb-0">
      <span className="md:hidden font-semibold w-28">Avatar:</span>
      <div className="avatar">
        <div className="mask mask-squircle h-12 w-12">
          <img
            src={user?.avatar ? user?.avatar : userImg}
            alt="User Avatar"
          />
        </div>
      </div>
    </td>
  
    <td className=" md:table-cell items-center mb-2 md:mb-0">
      <span className="md:hidden font-semibold w-28">User Name:</span>
      {user?.userName}
    </td>
  
    <td className=" flex md:table-cell items-center  mb-2 md:mb-0">
      <span className="md:hidden font-semibold w-28">Email:</span>
      {user?.email}
    </td>
  
    <td className=" flex md:table-cell items-center mb-2 md:mb-0">
      <span className="md:hidden font-semibold w-28">Role:</span>
      {user?.roll}
    </td>
  
    <td className=" flex md:table-cell items-center mb-2 md:mb-0">
      <span className="md:hidden font-semibold w-28">Gender:</span>
      {user?.gender ? user?.gender : "NaN"}
    </td>
  
    <td className=" flex md:table-cell items-center">
       <button onClick={() => action(user?._id)} className="bg-red-500  text-white p-2 rounded-lg ">Delate</button>
    </td>
  </tr>
  
  );
};

export default UserTable;
