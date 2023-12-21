import { 
  Router 
} from 'express'

import {
  getByCustomerId
} from '../controllers/order'

const routes = Router()

routes.get('/:customer_id', getByCustomerId)

export default routes
