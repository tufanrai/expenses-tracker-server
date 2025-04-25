import jwt, { JwtPayload } from 'jsonwebtoken'
import mongoose from 'mongoose'
import { IPayload } from '../types/global.types'

const JWT_SECRET = process.env.JWT_SECRET?? 'shhhh'
const JWT_EXPIRE_DATE = process.env.JWT_EXPIRE 

// generates a json web token for auto login
export const generateJwtToken = async (payload: IPayload) => {
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRE_DATE as any})
    return token
}

// verifies the entered toke with the existing db token
export const verifyJWT = (token: string):JwtPayload => {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
}