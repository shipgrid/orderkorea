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

routes.get('/vehicles', validateToken, list)
routes.get('/vehicles/:vehicle_id', validateToken, get)
routes.post('/vehicles', validateToken, create)
routes.delete('/vehicles/:vehicle_id', validateToken, remove)
routes.put('/vehicles/:vehicle_id', validateToken, update)

export default routes
