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

routes.get('/addresses', validateToken, create)
routes.get('/addresses/:address_id', validateToken, get)
routes.put('/addresses', validateToken, list)
routes.post('/addresses', validateToken, update)
routes.delete('/addresses/:address_id', validateToken, remove)

export default routes
