import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";

const SendMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    dispatch(sendMessageThunk({ receiverId: selectedUser?._id, message }));

    if (!message) {
      return toast.error("Please enter a message");
    }

    setMessage("");
  };
  return (
    <div className="w-full p-3 flex gap-1 ">
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        type="text"
        placeholder="Type your message here..."
        className="input input-primary w-full"
      />

      <button
        onClick={handleSendMessage}
        className="btn btn-square btn-primary btn-outline"
      >
        <IoIosSend className="text-2xl" />
      </button>
    </div>
  );
};

export default SendMessage;
