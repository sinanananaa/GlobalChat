import ChatMessage from "../models/ChatMessage";

export const getAllChatMessages = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const startIndex = (page - 1) * limit;
  const data = await ChatMessage.find().sort('-createdAt').skip(startIndex).limit(limit);
  res.send(data.reverse());
};