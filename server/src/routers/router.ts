import express from 'express'
import { user, userId} from '../controller/user.controller'
import { register } from '../controller/auth.controller'
const router = express.Router()

router.get('/', user)
router.get('/user/:id', userId)
router.post('/register', register)

export default router