import express from "express";
import { createExpesnse, getAllByUser, updateExpenses } from "../controller/expenses.controller";
import { remove } from "../controller/category.controller";
import multer from 'multer';
import { authinticate } from "../helper/auth.middleware";
import { Role } from "../types/enum.types";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
  })
const upload = multer({storage})
const router = express()

router.post('/expenses', authinticate([Role.USER]), upload.array('receipts',3), createExpesnse)
router.put('/expenses', updateExpenses)
router.get('/expenses', getAllByUser)

export default router