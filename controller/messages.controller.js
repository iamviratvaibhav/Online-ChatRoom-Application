import Conversation from "../models/conversation.model.js"
import Messages from "../models/message.model.js";
import { getReceiverSocketId, io } from "../SocketIO/server.js";

const sendmessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; 

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    })
    if (!conversation) {
      console.log("Creating new conversation with participants:", [senderId, receiverId]);
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Messages({
      senderId,
      receiverId,
      message,

    })

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    return res.status(200).json(newMessage);


  } catch (error) {
    console.log("Error in sender message", error);
    res.status(500).json({ message: "Server Error" })

  }
}




const getmessage = async (req, res) => {

  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUser] }
    }).populate("messages");

    if (!conversation) {
      console.log()
      return res.status(201).json({ message: "No conversation found" });
    }
    if (senderId) {
      io.to(senderId).emit("newMessage", conversation);
    }
    const messages = conversation.messages;
    return res.status(200).json({ messages });
  }
  catch (error) {
    console.log("Error in getting message", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { sendmessage, getmessage };


