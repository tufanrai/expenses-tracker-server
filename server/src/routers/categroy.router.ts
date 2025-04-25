import express from 'express'
import { user, userId} from '../controller/user.controller'
import { register, log_in } from '../controller/auth.controller'
import { create, deleteCategory, getById, update } from '../controller/category.controller'
import { authinticate } from '../helper/auth.middleware'
import { Role } from '../types/enum.types'
const router = express.Router()

//req res handling
router.post('/', authinticate([Role.USER]), create)
router.put('/:id', update)
router.get('/:id', getById)
router.delete('/:id', deleteCategory)
//exporting router
export default router