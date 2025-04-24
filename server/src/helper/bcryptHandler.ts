import bcrypt from 'bcryptjs'

// converts the user entered password into a hash format 
export const hash = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}