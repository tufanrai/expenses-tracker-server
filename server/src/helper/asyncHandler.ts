import { NextFunction, Request, RequestHandler, Response } from "express"
import { errorHandler } from './errorhandler';

type handler = (req:Request, res:Response, next:NextFunction) => Promise<any>

// Handles all the async programs
const asyncHandler = (fun:handler):RequestHandler =>{
    return (req:Request, res:Response, next:NextFunction) => {
        Promise.resolve(fun(req,res,next)).catch((err) => next(err))
    }
}

export default asyncHandler
