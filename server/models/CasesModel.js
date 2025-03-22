//schema which has id , casetitle and casesummery
import mongoose from "mongoose";
const caseSchema = new mongoose.Schema({
  caseTitle: {
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