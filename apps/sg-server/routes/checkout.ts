import { 
  Router 
} from 'express'

import {
  create,
  get
} from '../controllers/checkout'

const routes = Router()

routes.get('/:vehicle_id', create)
routes.get('/status/:session_id', get)

export default routes
