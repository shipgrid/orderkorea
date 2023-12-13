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

routes.get('/orders', validateToken, list)
routes.get('/orders/:order_id', validateToken, get)
routes.post('/orders', validateToken, create)
routes.delete('/orders/:order_id', validateToken, remove)

export default routes
