import {model, Schema} from 'mongoose'
import { Role } from '../types/enum.types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;

const UserSchema = new Schema({
    full_name: {
        type: String,
        required: [true, 'full name required']
    },
    user_name: {
        type: String,
        required: true,
        unique: [true, 'user with same username exists']
    },
    contact: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'user already exist with this email'],
        match: [emailRegex, 'please check the email format']
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 15
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER
    }
},{timestamps:true})

const Client = model('User', UserSchema)
export default Client
