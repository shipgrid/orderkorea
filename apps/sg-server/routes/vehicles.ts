import { 
  Router 
} from 'express'

import {
  get,
  update,
  remove,
  create,
  list,
  get_by_user_id
} from '../controllers/vehicles'

const routes = Router()

routes.get('/', list)
routes.get('/inventory', get_by_user_id)
routes.get('/:vehicle_id', get)
routes.post('/', create)
routes.delete('/:vehicle_id', remove)
routes.put('/:vehicle_id', update)

export default routes
