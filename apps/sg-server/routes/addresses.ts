import { 
  Router 
} from 'express'

import {
  create,
  get,
  list,
  update,
  remove
} from '../controllers/addresses'

import validateToken from '../middlewares/validate_token'

const routes = Router()

routes.get('/', validateToken, create)
routes.get('/:address_id', validateToken, get)
routes.put('/', validateToken, list)
routes.post('/', validateToken, update)
routes.delete('/:address_id', validateToken, remove)

export default routes
