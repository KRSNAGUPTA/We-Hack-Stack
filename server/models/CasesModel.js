import mongoose from "mongoose";
const caseSchema = new mongoose.Schema({
  _id:String,
  CaseId: {
    type: String,
    required: true,
    unique: true,
  },
  CaseTitle: {
    type: String,
    required: true,
  },
  CaseSummary: {
    type: String,
    required: true,
  },
});


const Cases = mongoose.model("Cases", caseSchema);
export default Cases;