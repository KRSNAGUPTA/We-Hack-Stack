import Router from "express";
const router = Router();
import { addQuiz, bulkAddQuiz, getQuiz, getRandomQuiz } from "../controllers/DailyQuizController.js";
router.get("/", (req, res) => {
  res.send("Quiz API is working");
});
router.get("/all", getQuiz);
router.get("/random", getRandomQuiz);
router.post("/add", addQuiz);
router.post("/add-bulk", bulkAddQuiz);

export default router;
