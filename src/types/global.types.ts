import mongoose from "mongoose";
import { Role } from "./enum.types";

export  interface IPayload {
    _id:mongoose.Types.ObjectId,
    full_name:string;
    email:string;
    user_name?:string;
    role:Role

}