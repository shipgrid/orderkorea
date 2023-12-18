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

routes.get('/', list)
routes.get('/:order_id', get)
routes.post('/', create)
routes.delete('/:order_id', remove)

export default routes
