import { ApiError } from "../utils/ApiError.js";
import Cases from "../models/CasesModel.js";
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
  console.log("req.params.id",req.params.id); 
  try {
    const data = await Cases.findById(req.params.id);
    if (!data) {
      throw new ApiError(404, "No cases found");
    }
    console.log("data",data);
    
    res.status(200).json(data);
  } catch (error) {
    throw new ApiError(500, "Error while getting dataset");
  }
};
export { getCases , getCasesById };
