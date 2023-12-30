import { 
  Router 
} from 'express'

import {
  login,
  register,
  firebaseLogin  
} from '../controllers/account'

const routes = Router()

routes.post('/register', register)
routes.post('/login', login)
routes.post('/firebase-login', firebaseLogin)

export default routes
