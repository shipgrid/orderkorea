import { 
  Router 
} from 'express'

import {
  create,
} from '../controllers/checkout'

const routes = Router()

routes.get('/:vehicle_id', create)

export default routes
