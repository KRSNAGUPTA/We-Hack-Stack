import { ApiError } from "../utils/ApiError.js";
import Cases from "../models/CasesModel.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const getCases = async (req, res) => {
  try {
    const data = await Cases.find();
    if (!data) {
      throw new ApiError(404, "No cases found");
    }
    res.status(200).json(data);
  } catch (error) {
    throw new ApiError(500, "Error while getting dataset");
  }
};

const getCasesById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Cases.findOne({
      CaseId:id
    })
    console.log("data",data);

    res.status(200).json(data);
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export { getCases, getCasesById };
