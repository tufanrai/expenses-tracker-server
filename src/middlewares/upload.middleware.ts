import multer from 'multer'
import {cloudinary} from '../config/cloudinary.config'
import {CloudinaryStorage} from 'multer-storage-cloudinary'

export const uploader = (folder:string) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => { 
      return {
      folder:`expense-tracker/${folder}`,
      allowed_formats:['png','jpeg','jpg','pdf','webp'],
    }},
  });

return multer({storage:storage})
}