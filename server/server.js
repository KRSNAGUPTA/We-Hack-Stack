import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production" ? "*" : process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working!");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cases", caseRoutes );

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`\nServer running on port : ${PORT}`));
