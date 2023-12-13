import { 
  Router 
} from 'express'

import {
  get,
  remove,
  create,
  list,
  uploadDocument
} from '../controllers/orders'

import validateToken from '../middlewares/validate_token'
import parseFileMiddleware from '../middlewares/parse_file'

const routes = Router()

routes.get('/', validateToken, list)
routes.get('/:order_id', validateToken, get)

routes.post('/', validateToken, create)
routes.post('/document', validateToken, parseFileMiddleware, uploadDocument)

routes.delete('/:order_id', validateToken, remove)

export default routes
