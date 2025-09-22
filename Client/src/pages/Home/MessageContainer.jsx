import React, { useEffect } from "react";
import User from "./User";
import Message from "./Message";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import SendMessage from "./SendMessage";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);

  

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser?._id }));
    }
  }, [selectedUser]);

  return (
    <>
      {!selectedUser ? (
        <div className=" w-full h-screen flex items-center justify-center flex-col">
          <h2>Welcome to Gup Shup </h2>
          <p>Please Select a Person to Chat </p>
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col ">
          {/* user profile */}
          <div className="p-4 border-b border-b-white/10 ">
            <User userDetails={selectedUser} />
          </div>
          {/* messages */}
          <div className="h-full overflow-y-auto px-4 space-y-4">
            {messages?.map((message) => {
              return <Message key={message._id} message={message} />;
            })}
          </div>

          {/* message input box */}

          <SendMessage />
        </div>
      )}
    </>
  );
};

export default MessageContainer;
