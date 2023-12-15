import { 
  Router 
} from 'express'

import {
  uploadDocument
} from '../controllers/documents'

import validateToken from '../middlewares/validate_token'
import parseFileMiddleware from '../middlewares/parse_file'

const routes = Router()

routes.post('/', validateToken, parseFileMiddleware, uploadDocument)

export default routes
