import express from "express";
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController.js";

import {authenticate, authorize} from "../middleware/authMiddleware.js";

const router = express.Router();
//create (for Admin only)
router.post("/", authenticate, authorize("admin"), createAuthor);

//read
router.get("/", authenticate, getAllAuthors);
router.get("/:id", authenticate, getAuthorById);

//update (for Admin only)
router.put("/:id", authenticate,authorize("admin"), updateAuthor);

//delete (for Admin only)
router.delete("/:id", authenticate,authorize("admin"), deleteAuthor);

export default router;