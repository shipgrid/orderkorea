import { 
  Router 
} from 'express'

import {
  get,
  remove,
  create,
  list
} from '../controllers/orders'

import validateToken from '../middlewares/validate_token'

const routes = Router()

routes.get('/', validateToken, list)
routes.get('/:order_id', validateToken, get)
routes.post('/', validateToken, create)
routes.delete('/:order_id', validateToken, remove)

export default routes
