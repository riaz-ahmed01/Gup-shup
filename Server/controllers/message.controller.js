import { asyncHandler } from "../utils/asyncHandler.js";
import { errorHandler } from "../utils/errorHandler.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import {io} from "../socket/socket.js";
import { getSocketId } from "../socket/socket.js";

// @desc    Send a new message

export const sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user._id;
  const receiverId = req.params.receiverId;
  const message = req.body.message;

  //  Validate input fields

  if (!senderId || !receiverId || !message) {
    return next(new errorHandler("All fields are required", 400));
  }

  // Check if conversation exists between sender and receiver

  let conversation = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  });

  // If conversation doesn't exist, create a new one
  if (!conversation) {
    conversation = await Conversation.create({
      members: [senderId, receiverId],
    });
  }
  // Create new message
  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
  });

  // Add message to conversation

  if (newMessage) {
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }
  
  
  // socket.io integration can be done here
  const SocketId = getSocketId(receiverId);
  io.to(SocketId).emit("message", newMessage);

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: newMessage,
  });
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const myId = req.user._id;
  const otherParticipantId = req.params.otherParticipantId;
  

  if (!myId || !otherParticipantId) {
    return next(new errorHandler("All fields are required", 400));
  }

  const conversation = await Conversation.findOne({
    members: { $all: [myId, otherParticipantId] },
  }).populate("messages");

  if (!conversation) {
    return next(new errorHandler("Conversation not found", 404));
  }
  res.status(200).json({
    success: true,
    data: conversation,
    message: "Messages fetched successfully",
  })
});
