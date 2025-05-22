import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { connectDB } from "./config/database.config";
import CustomError, { errorHandler } from "./middlewares/error-handler.middleware";
import helmet from "helmet";
import cors from 'cors'

// importing routes
import authRoutes from './routes/auth.routes'
import categoryRoutes from './routes/category.routes'
import expenseRoutes from './routes/expense.routes'

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI ?? "";

const app = express();
// database connection
connectDB(DB_URI);

// using middlewares
app.use(helmet())
app.use(cors())
app.use(express.urlencoded())
app.use(express.json())

app.use('/api/uploads', express.static('uploads/'))

app.get('/',(req:Request,res:Response)=>{

	res.status(200).json({
		message:'Server is up & running'
	})
})


// using routes
app.use('/api/auth',authRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/expense',expenseRoutes)



app.all('/*spalt',(req:Request,res:Response,next:NextFunction)=>{
	const message = `Can not ${req.method} on ${req.url}`
	const error = new CustomError(message,404)
	next(error)
})



app.listen(PORT, () => {
	console.log(`server is running at ${PORT}`);
});



app.use(errorHandler)
