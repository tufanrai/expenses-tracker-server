import mongoose from "mongoose"

// Congigs the database connection with the server
export const dbconnection = (url: string) => {
     mongoose.connect(url)
     .then(() => console.log('connected successfuly'))
     .catch((err) => console.log(err))
}