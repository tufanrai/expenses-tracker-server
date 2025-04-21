import {Model, Schema, model} from 'mongoose'

const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    Contact: {
        type: Number,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        Min: 6
    }
})

const Client = new Model('User', UserSchema)
export default Client
