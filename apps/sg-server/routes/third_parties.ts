import { 
  Router 
} from 'express'

import {
  create,
} from '../controllers/third_parties'

const routes = Router()

routes.post('/', create)

export default routes
