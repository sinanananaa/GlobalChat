import express from 'express';
import * as ChatController from '../controllers/Chat';
const router = express.Router();

router.get('/', ChatController.getAll);

export default router;