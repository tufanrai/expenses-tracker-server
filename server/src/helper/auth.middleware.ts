import { NextFunction, Request, Response } from "express";
import { Role } from "../types/enum.types";
import errorHelper from "./errorhandler";
import { verifyJWT } from "./jwt.helper";
import Client from "../models/User.model";
import { user } from '../controller/user.controller';

export const authinticate = (roles?: Role[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            const auth_header = req.headers['authorization']
            if(!auth_header) {
                throw new errorHelper('access denied',401)
            }
            if(auth_header.split('').length !== 2 && !auth_header.startsWith('BEARER')) {
                throw new errorHelper('unauthorized, access denied', 401)
            }
            const token = auth_header.split('')[1]
    
            const decode = verifyJWT(token)
    
            if(decode.exp && decode.exp * 1000 < Date.now()) {
                throw new errorHelper('token expired', 401)
            }
    
            const user = await Client.findById(decode._id)
            
            if(!user) {
                throw new errorHelper('access denied',401)
            }
    
            if(roles && !roles.includes(user.role)) {
                throw new errorHelper('forbidden, access denied', 403)
            }

            req.user = {
                _id: decode._id,
                email: decode.email,
                user_name: decode.user_name,
                full_name: decode.full_name,
                role: decode.role
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}