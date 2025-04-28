import express from 'express'
import { user, userId} from '../controller/user.controller'
import { register, log_in } from '../controller/auth.controller'
import { create, getAll, getById, remove, update } from '../controller/category.controller'
import { authinticate } from '../helper/auth.middleware'
import { Role } from '../types/enum.types'
const router = express.Router()

//req res handling
router.post('/', authinticate([Role.USER]), create)
router.put('/:id', authinticate([Role.USER]), update)
router.get('/:id', authinticate([Role.USER]), getById)
router.get('/user', authinticate([Role.USER]), getAll)
router.delete('/:id', authinticate([Role.USER]), remove)
//exporting router
export default router