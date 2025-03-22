import { Router } from "express";
import chatResponse from '../controllers/chatbotController.js';

const router = Router();

router.post('/chat', chatResponse);

export default router;
