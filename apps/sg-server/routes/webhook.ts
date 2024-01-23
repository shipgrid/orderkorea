import { 
  Router 
} from 'express'

import {
  handle,
} from '../controllers/webhooks'

const routes = Router()

routes.post('/', handle)

export default routes
