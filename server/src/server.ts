import 'dotenv/config'
import express from 'express'
import { dbconnection } from './config/dbConnect'

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL ?? ""

const app = express()

dbconnection(DB_URL)


app.listen(PORT, ()=> console.log(`server started at http://localhost:${PORT}`))