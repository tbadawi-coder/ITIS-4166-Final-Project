import express from "express";
import {
  createLoan,
  getAllLoans,
  getLoanById,
  returnLoan,
  deleteLoan,
} from "../controllers/loanController.js";

import {authenticate,authorize} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",authenticate,createLoan);

router.get("/", authenticate,authorize("admin"), getAllLoans);

router.get("/:id",authenticate,getLoanById);

router.put("/:id", authenticate,authorize("admin"), returnLoan);

router.delete("/:id", authenticate,authorize("admin"), deleteLoan);

export default router;