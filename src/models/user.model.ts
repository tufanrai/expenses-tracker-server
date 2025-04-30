import {Schema,model} from 'mongoose'
import { Role } from '../types/enum.types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema({
    full_name:{
        type:String,
        required:[true,'Name is required']
    },
    user_name:{
        type:String,
        required:[true,'User name is required']
    },
    email:{
        type:String,
        required:[true,'Name is required'],
        unique:[true,'Email address is already used'],
        // match:[emailRegex,'Email is not valid'],
        validate: {
            validator: function(v:string) {
              return emailRegex.test(v);
            },
            message: '{VALUE} is not a valid email address!'
          },
    },
    role:{
        type:String,
        enum:Object.values(Role),
        default:Role.USER
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    phone:{
        type:String,
        match: [/^(98|97)\d{8}$/, 'Please enter a valid Nepali phone number']
    }
},{timestamps:true})



const User = model('user', userSchema)

export default User