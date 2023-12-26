import { 
  Router 
} from 'express'

import {
  getByCustomerId,
  createPurchaseOrder
} from '../controllers/order'

const routes = Router()

routes.get('/:customer_id', getByCustomerId)
routes.post('/purchase', createPurchaseOrder)
// routes.post('/inform')

export default routes
