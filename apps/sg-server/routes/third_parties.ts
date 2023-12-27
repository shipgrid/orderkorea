import { 
  Router 
} from 'express'

import {
  create,
  remove
} from '../controllers/third_parties'

const routes = Router()

routes.post('/', create)
routes.delete('/:third_party_id', remove)

export default routes
