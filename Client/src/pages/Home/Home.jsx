import React from "react";
import UserSidebar from "./UserSidebar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeSocket,
  setOnlineUsers,
} from "../../store/slice/socket/socket.slice";
import { useEffect } from "react";
import { setNewMessage } from "../../store/slice/message/message.slice";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userProfile } = useSelector((state) => state.user);
  const { socket, onlineUsers } = useSelector((state) => state.socket);

  useEffect(() => {
    if (isAuthenticated && userProfile?._id) {
      dispatch(setOnlineUsers(userProfile?.onlineUsers || []));
      dispatch(initializeSocket(userProfile._id));
    }
  }, [isAuthenticated, userProfile]);

  useEffect(() => {
    if (!socket) return;
    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("message", (message) => {
      dispatch(setNewMessage(message));
    });
    return () => {
      socket.off("onlineUsers");
      socket.off("message");
    };
  }, [socket]);

  return (
    <div className="flex">
      <UserSidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
