import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState = {
  socket: null,
  onlineUsers: null,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    // initialize socket
    initializeSocket: (state, action) => {
      const socket = io(import.meta.env.VITE_SOCKET_URL, {
        query: {
          userId: action.payload,
        },
      });
      // log the socket object to verify connection
      state.socket = socket;
    },
    // update online users
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { initializeSocket, setOnlineUsers } = socketSlice.actions;

export default socketSlice.reducer;
