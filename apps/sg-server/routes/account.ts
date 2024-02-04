import { 
  Router 
} from 'express'

import {
  login,
  register,
  refreshToken,
  getAccount,
  updateAccount,
  updatePassword
} from '../controllers/account'

import authValidation from '../middlewares/auth_validation'

const routes = Router()

routes.get('/', authValidation, getAccount)
routes.put('/', authValidation, updateAccount)
routes.post('/update-password', authValidation, updatePassword)
routes.post('/register', register)
routes.post('/login', login)
routes.get('/refresh-token/:firebase_token', refreshToken)

export default routes
