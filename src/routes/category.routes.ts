import express from 'express'
import { create, getById, update,getAll, getAllUserCategory, remove } from '../controllers/category.controller'
import { Authenticate } from '../middlewares/authentication.middleware'
import { Role } from '../types/enum.types'

const router = express.Router()

router.post('/',Authenticate([Role.USER]),create)
router.put('/:id',Authenticate([Role.USER]),update)
router.get('/user',Authenticate([Role.USER]),getAllUserCategory)
router.get('/:id',Authenticate([Role.USER,Role.ADMIN]),getById)
router.get('/',Authenticate([Role.ADMIN]),getAll)

router.delete('/:id',Authenticate([Role.USER]),remove)




export default router