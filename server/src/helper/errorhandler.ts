import { NextFunction, Request, Response } from "express";
    

class errorHelper extends Error{
    status: 'success' | 'error' | 'fail'
    statusCode:number
    success: boolean

    constructor(message:string, statusCode:number){
        super(message)
        this.statusCode = statusCode ?? 500;
        this.status = statusCode >= 400 && statusCode < 500? 'fail' : 'error'
        this.success = false
        Error.captureStackTrace(this, errorHelper)
    }
}


export const errorHandler = (err: any, req:Request, res:Response, next:NextFunction) => {
    const message = err.message || 'Server site error'
    const statusCode = err.statusCode || 500
    const status = err.status || 'error'
    const success = err.success || false

    res.status(statusCode).json({
        statusCode,
        message,
        status,
        success
    })
}

export default errorHelper