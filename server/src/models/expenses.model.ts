import mongoose, { Schema } from "mongoose";

const expensesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "epense title is required"],
        trim: true // removes the extra white spaces and places actual values only
    },
    date: {
        type: Date,
        default: () => Date.now()  // save the date when the expenses was created
    },
    amount: {
        type: Number,
        required: [true, "expense amount is required"]
    },
    discription: {
        type: String, 
        trim: true,
        min: 10,
        max: 500
    },
    receipts: [{
        path: {
            type: String
        },
        public_id: {
            type: String
        }
    }],
    category: {
        type: Schema.Types.ObjectId,
        required: [true, "expense category is required"],
        ref: 'category' // inter links the two different collections
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, "user is requires"],
        ref: 'user'
    }
},{timestamps: true})

const Expenses = mongoose.model('expense', expensesSchema)
export default Expenses