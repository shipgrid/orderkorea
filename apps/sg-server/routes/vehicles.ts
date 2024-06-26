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

import authValidation from '../middlewares/auth_validation'

const routes = Router()

routes.get('/', list)
routes.post('/', authValidation, create)
routes.get('/inventory', authValidation, get_by_user_id)
routes.get('/:vehicle_id', get)
routes.delete('/:vehicle_id', authValidation, remove)
routes.put('/:vehicle_id', authValidation, update)

export default routes
