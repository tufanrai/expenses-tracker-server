import express from 'express'
import {user, userId} from '../cotrollers/req_res_Controllers'
const router = express.Router()

router.get('/', user)

router.get('/user/:id', userId)

router.post