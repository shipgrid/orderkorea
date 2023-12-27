import { 
  Router 
} from 'express'

import {
  get,
  remove,
  create,
  list,
  update
} from '../controllers/orders'

const routes = Router()

routes.get('/', list)
routes.get('/:order_id', get)
routes.post('/', create)
routes.delete('/:order_id', remove)
routes.put('/:order_id', update)

export default routes
