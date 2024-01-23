import { 
  Router 
} from 'express'

import {
  get
} from '../controllers/filters/index'

const routes = Router()

routes.get('/', get)

export default routes
