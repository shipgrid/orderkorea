import { 
  Router 
} from 'express'

import {
  login,
  register,
  refreshToken
} from '../controllers/account'

const routes = Router()

routes.post('/register', register)
routes.post('/login', login)
routes.get('/refresh-token/:firebase_token', refreshToken)

export default routes
