import mongoose from "mongoose"

export const dbconnection = (url: string) => {
     mongoose.connect(url)
     .then(() => console.log('connected successfuly'))
     .catch((err) => console.log(err))
}