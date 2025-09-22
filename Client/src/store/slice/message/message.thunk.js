import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../../components/utils/axiosInstance";

export const sendMessageThunk = createAsyncThunk(
  "message/send",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/message/send/${receiverId}`,{message},
         {
        message,
      });
      return response.data;
    } catch (error) {
      // console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      // toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getMessageThunk = createAsyncThunk(
  "message/get",
  async ({ receiverId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `message/get-message/${receiverId}`
      );
      return response.data;
    } catch (error) {
      // console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      return rejectWithValue(errorOutput);
    }
  }
);
