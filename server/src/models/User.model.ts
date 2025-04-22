import {model, Schema} from 'mongoose'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;

const UserSchema = new Schema({
    full_name: {
        type: String,
        require: [true, 'full name required']
    },
    user_name: {
        type: String,
        require: true,
    },
    Contact: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: [true, 'user already exist with this email'],
        match: [emailRegex, 'please check the email format']
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 15
    }
},{timestamps:true})

const Client = model('User', UserSchema)
export default Client
