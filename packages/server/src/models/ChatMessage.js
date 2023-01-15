import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ChatMessageSchema = new Schema(
  {
    to: String,
    from: String,
    message: String,
  },
  { timestamps: true }
);

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

export default ChatMessage;
