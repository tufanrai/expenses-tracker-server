import jwt from 'jsonwebtoken'

interface IPayload {
    _id:mongoose.type._id,
    full_name:string,
    email:string,
    user_name:string
}

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRE_DATE = process.env.JWT_EXPIRE ?? 'shhhh'

export const generateJwtToken = async (payload: IPayload) => {
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRE_DATE})
    return token
}