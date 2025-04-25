import express from 'express'
import { user, userId} from '../controller/user.controller'
import { register, log_in } from '../controller/auth.controller'
const router = express.Router()

//req res handling
router.get('/user/:id', userId)
router.post('/', register)
router.get('/log_in', log_in)

//exporting router
export default router