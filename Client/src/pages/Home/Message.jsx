import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const messageRef = useRef(null);
  const { userProfile, selectedUser } = useSelector((state) => state.user);

  


  useEffect(() => {
    if (messageRef.current) {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>  
      <div
        ref={messageRef}
       className={`chat  ${userProfile?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={userProfile?._id === message?.senderId ? userProfile?.avatar : selectedUser?.avatar}
            />
          </div>
        </div>
        {/* message */}
        <div className="chat-header">
          <time className="text-xs opacity-50">{message?.createdAt?new Date(message?.createdAt).toLocaleTimeString() : ""
            }</time>
        </div>
        <div className="chat-bubble">{message?.message}</div>
      </div>
    </>
  );
};

export default Message;
