import { 
  Router 
} from 'express'

import {
  upload,
} from '../controllers/storage'

import multer from 'multer';

const storage = multer.memoryStorage(); 
const multerUpload = multer({ storage });

const routes = Router()

routes.post('/upload', multerUpload.single('file'), upload)

export default routes
