import mongoose from "mongoose";

const { Schema } = mongoose;

const quizAnswerSchema = new Schema(
  {
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const quizSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["Traffic Laws", "Civil Laws", "Criminal Laws", "Fines", "General Rules"],
      default: "General Rules",
    },
    legalReference: {
      type: String,
      trim: true,
      required: false, 
    },
    quizQuestion: {
      type: String,
      required: true,
      trim: true,
    },
    quizAnswers: {
      type: [quizAnswerSchema],
      validate: [(val) => val.length >= 2, "At least two answers are required."],
    },
    explanation: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
  },
  { timestamps: true }
);

const QuizModel = mongoose.model("Quiz", quizSchema);
export default QuizModel;
