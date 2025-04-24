import mongoose, { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    name: {
        type: String,
        requier: [true, 'name is required']
    },
    user: {
        type: mongoose.Types.ObjectId,
        require: [true, 'user id required'],
        ref: 'User'
    }
}, {timestamps: true})

const Category = model('category', categorySchema)
export default Category