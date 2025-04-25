import bcrypt from 'bcryptjs'

// converts the user entered password into a hash format 
export const hash = async (password: string) => { // accepts a password
    const salt = await bcrypt.genSalt(10) // initializing the length of the hash
    return await bcrypt.hash(password, salt) // hashing the password sent up to 10bits
}