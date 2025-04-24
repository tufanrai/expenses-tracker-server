import express from 'express'
import { user, userId} from '../controller/user.controller'
import { register, log_in } from '../controller/auth.controller'
import { create, getById, update } from '../controller/category.controller'
const router = express.Router()

//req res handling
router.post('/', create)
router.put('/:id', update)
router.get('/:id', getById)

//exporting router
export default router