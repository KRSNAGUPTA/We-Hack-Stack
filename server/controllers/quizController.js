import QuizModel from "../models/QuizModel.js";

export const getQuiz = async (req, res) => {
  try {
    const quiz = await QuizModel.find();
    return res.status(200).json({ quiz });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getRandomQuiz = async (req, res) => {
  try {
    const { category = [], size = 10 } = req.query;
    const quiz = await QuizModel.find();
    const len = quiz.length;
    let i = 0;
    let randomQuiz = [];
    while (i < size && i < len) {
      const randomIndex = Math.floor(Math.random() * len);
      const randomQuizItem = quiz[randomIndex];
      if (
        (category.length === 0 || category.includes(randomQuizItem.category)) &&
        !randomQuiz.some(
          (item) => item._id.toString() === randomQuizItem._id.toString()
        )
      ) {
        randomQuiz.push(randomQuizItem);
        i++;
      }
    }
    return res.status(200).json({ randomQuiz });
  } catch (error) {
    console.error("Error fetching random quiz:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addQuiz = async (req, res) => {
  try {
    const {
      category,
      legalReference,
      quizQuestion,
      quizAnswers,
      explanation,
      difficulty,
    } = req.body;
    if (
      category &&
      ![
        "Traffic Laws",
        "Civil Laws",
        "Criminal Laws",
        "Fines",
        "General Rules",
      ].includes(category)
    ) {
      return res.status(400).json({ message: "Invalid category" });
    }
    if (quizAnswers && quizAnswers.length < 2) {
      return res
        .status(400)
        .json({ message: "At least two answers are required." });
    }
    if (difficulty && !["Easy", "Medium", "Hard"].includes(difficulty)) {
      return res.status(400).json({ message: "Invalid difficulty level" });
    }
    if (!explanation) {
      return res.status(400).json({ message: "Explanation is required" });
    }
    if (!quizQuestion) {
      return res.status(400).json({ message: "Quiz question is required" });
    }
    const quiz = await QuizModel.create({
      category,
      legalReference,
      quizQuestion,
      quizAnswers,
      explanation,
      difficulty,
    });
    return res.status(200).json({ message: "Quiz added successfully", quiz });
  } catch (error) {
    console.error("Error adding quiz:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const bulkAddQuiz = async (req, res) => {
  try {
    const quizzes = req.body;

    if (!Array.isArray(quizzes) || quizzes.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide an array of quizzes." });
    }

    const validCategories = [
      "Traffic Laws",
      "Civil Laws",
      "Criminal Laws",
      "Fines",
      "General Rules",
    ];
    const validDifficulties = ["Easy", "Medium", "Hard"];

    for (let i = 0; i < quizzes.length; i++) {
      const quiz = quizzes[i];
      const {
        category,
        legalReference,
        quizQuestion,
        quizAnswers,
        explanation,
        difficulty,
      } = quiz;

      if (category && !validCategories.includes(category)) {
        return res
          .status(400)
          .json({ message: `Invalid category at index ${i}` });
      }
      if (quizAnswers && quizAnswers.length < 2) {
        return res
          .status(400)
          .json({ message: `At least two answers are required at index ${i}` });
      }
      if (difficulty && !validDifficulties.includes(difficulty)) {
        return res
          .status(400)
          .json({ message: `Invalid difficulty level at index ${i}` });
      }
      if (!explanation) {
        return res
          .status(400)
          .json({ message: `Explanation is required at index ${i}` });
      }
      if (!quizQuestion) {
        return res
          .status(400)
          .json({ message: `Quiz question is required at index ${i}` });
      }
    }

    const result = await QuizModel.insertMany(quizzes);
    return res
      .status(201)
      .json({ message: "Quizzes added successfully", result });
  } catch (error) {
    console.error("Error adding quizzes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
