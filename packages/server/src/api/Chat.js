import express from 'express';
import * as ChatMessageController from '../controllers/ChatMessage';
const router = express.Router();

router.get('/', ChatMessageController.getAllChatMessages);


export default router;