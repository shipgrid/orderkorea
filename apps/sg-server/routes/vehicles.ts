import { 
  Router 
} from 'express'

import {
  get,
  update,
  remove,
  create,
  list
} from '../controllers/vehicles'

import validateToken from '../middlewares/validate_token'

const routes = Router()

routes.get('/', list)
routes.get('/:vehicle_id', validateToken, get)
routes.post('/', validateToken, create)
routes.delete('/:vehicle_id', validateToken, remove)
routes.put('/:vehicle_id', validateToken, update)

export default routes
