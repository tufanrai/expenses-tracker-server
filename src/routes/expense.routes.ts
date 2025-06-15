import express from "express";
import {
  create,
  update,
  getAllByUser,
  getAllUserExpByCategory,
  remove,
} from "../controllers/expense.controller";
import { Authenticate } from "../middlewares/authentication.middleware";
import { Role } from "../types/enum.types";
import { uploader } from "../middlewares/upload.middleware";
import { getById } from "../controllers/category.controller";

const upload = uploader("receipts");
const router = express.Router();

router.post(
  "/",
  Authenticate([Role.USER]),
  upload.array("receipts", 3),
  create
);
router.put(
  "/:id",
  Authenticate([Role.USER]),
  upload.array("receipts", 3),
  update
);
router.get("/", Authenticate([Role.USER]), getAllByUser);
router.get("/:id", Authenticate([Role.USER]), getById);
router.get("/category/:categoryId", getAllUserExpByCategory);
router.delete("/:id", Authenticate([Role.USER]), remove);

export default router;
