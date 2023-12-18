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

const routes = Router()

routes.get('/', create)
routes.get('/:address_id', get)
routes.put('/', list)
routes.post('/', update)
routes.delete('/:address_id', remove)

export default routes
