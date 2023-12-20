import { 
  Router 
} from 'express'

import {
  login,
  register
} from '../controllers/account'

const routes = Router()

routes.post('/register', register)
routes.post('/login', login)

export default routes
