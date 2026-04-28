import express from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

//create (for Admin only)
router.post("/", authenticate, authorize("admin"), createBook);

//read
router.get("/", authenticate, getAllBooks);
router.get("/:id", authenticate, getBookById);

//update (for Admin only)
router.put("/:id", authenticate, authorize("admin"), updateBook);

//delete (for Admin only)
router.delete("/:id", authenticate, authorize("admin"), deleteBook);

export default router;