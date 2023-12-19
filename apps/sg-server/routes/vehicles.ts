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

const routes = Router()

routes.get('/', list)
routes.get('/:vehicle_id', get)
routes.post('/', create)
routes.delete('/:vehicle_id', remove)
routes.put('/:vehicle_id', update)

export default routes
