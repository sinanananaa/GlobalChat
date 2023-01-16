import ChatMessage from "../models/ChatMessage";

export const getAllChatMessages = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  //const endIndex = page * limit;
  console.log("getChatMessages",page, limit);

  const data = await ChatMessage.find().sort('-createdAt').skip(startIndex).limit(limit);
  res.send(data.reverse());
};

export const createChatMessage = async (message) => {
  console.log("Creating message");
  const data = await ChatMessage.create(message);
  return data;
};