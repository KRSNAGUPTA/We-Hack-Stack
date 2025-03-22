import { Router } from "express";
import { getCases,getCasesById } from "../controllers/caseController.js";
const router = Router();

router.get("/", (req, res) => {
  res.send("Working!");
});
router.get("/case", getCases);
router.get("/:id", getCasesById);

export default router;