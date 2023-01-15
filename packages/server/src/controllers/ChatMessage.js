import ChatMessage from "../models/ChatMessage";

export const getAllChatMessages = async () => {
  const data = await ChatMessage.find();
  return data;
};

export const createChatMessage = async (message) => {
  console.log("Creating message");
  const data = await ChatMessage.create(message);
  return data;
};