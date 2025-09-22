import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/user.slice";

const User = ({ userDetails }) => {

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.socket);
  
  const isUserOnline = onlineUsers?.includes(userDetails?._id);


  const handleClick = () => {
    dispatch(setSelectedUser(userDetails))
  }
  return (
    // user card
    <div onClick={handleClick} className={`flex items-center rounded-lg cursor-pointer hover:bg-gray-700/10   py-1 px-2 ${userDetails?._id === selectedUser?._id && 'bg-gray-700/20'}`}>

      <div className={`avatar ${isUserOnline && 'online'}`}>
        <div className="w-12 rounded-full">
          <img src={userDetails?.avatar} />
        </div>
      </div>
      {/* user info */}
      <div className="ml-3">
        <h2 className="line-clamp-1">{userDetails?.fullName}</h2>
        <p className="text-sm">{userDetails?.username}</p>
      </div>
    </div>
  );
};

export default User;
