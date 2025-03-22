import { Router } from "express";
import generateQuiz  from '../controllers/quizController.js';

const router = Router();

router.post('/quiz', generateQuiz );

export default router;
