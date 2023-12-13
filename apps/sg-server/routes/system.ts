import { 
  Router 
} from 'express'

import {
  uploadDocument
} from '../controllers/system'

import validateToken from '../middlewares/validate_token'
import parseFileMiddleware from '../middlewares/parse_file'

const routes = Router()

routes.post('/documents', validateToken, parseFileMiddleware, uploadDocument)

export default routes
