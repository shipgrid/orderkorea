import { 
  Router 
} from 'express'

import {
  list
} from '../controllers/reservations'

const routes = Router()

routes.get('/', list)

export default routes
