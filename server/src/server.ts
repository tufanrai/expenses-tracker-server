import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import { dbconnection } from './config/dbConnect'
import router from './routers/router'
import errorHelper, { errorHandler } from './helper/errorhandler'

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL ?? ""

const app = express()

//Database Connection
dbconnection(DB_URL)

//inbuilt middleware
app.use(express.urlencoded())
app.use(express.json())

//routing
app.use('/api/auth', router)
app.all('/*s', (req:Request,res:Response,next:NextFunction)=>{
    const message = `Cannot ${req.method} on ${req.url}`
    const error = new errorHelper(message, 404)
    next(error)
})

//error handling 
app.use(errorHandler)

app.listen(PORT, ()=> console.log(`server started at http://localhost:${PORT}`))