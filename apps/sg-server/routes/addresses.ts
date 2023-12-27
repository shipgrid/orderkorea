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

routes.get('/', list)
routes.get('/:address_id', get)
routes.put('/:address_id', update)
routes.post('/', create)
routes.delete('/:address_id', remove)

export default routes
