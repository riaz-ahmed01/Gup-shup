import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  logoutUserThunk,
} from "../../store/slice/user/user.thunk";

const UserSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);

  // console.log(searchValue);

  const dispatch = useDispatch();

  const { otherUsers, userProfile } = useSelector((state) => state.user);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
  };

  useEffect(() => {
    (async () => {
      dispatch(getOtherUsersThunk());
    })();
  }, []);

  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUsers);
    } else {
      setUsers(
        otherUsers.filter(
          (user) =>
            user.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.username.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchValue === "") {
      setUsers(otherUsers);
    } else {
      const filteredUsers = otherUsers.filter((user) =>
        user.fullName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  }, [searchValue, otherUsers]);
  return (
    <div className="max-w-[20rem] w-full h-screen flex flex-col gap-2">
      <h1 className="bg-black mt-3 rounded-lg mx-3 p-1 text-[#5754E8] text-xl font-semibold">
        GUP SHUP
      </h1>

      <div className="p-4">
        <label className="input">
          <IoSearch />

          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            type="search"
            className="grow"
            placeholder="Search"
          />
        </label>
      </div>
      {/* user list */}
      <div className="h-full overflow-y-auto flex-col gap-3">
        {users?.map((userDetails) => {
          return <User key={userDetails._id} userDetails={userDetails} />;
        })}
      </div>

      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-11 rounded-full ring-2 ring-offset-2">
              <img src={userProfile?.avatar} />
            </div>
          </div>
          <h2>{userProfile?.fullName}</h2>
        </div>

        <button onClick={handleLogout} className="btn btn-primary btn-sm px-4">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
