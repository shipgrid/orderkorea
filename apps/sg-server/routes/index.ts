import { 
  Router 
} from 'express'

import {
  registerCustomer
} from '../controllers/registration.controller'

import {
  loginCustomer
} from '../controllers/login.controller'

const routes = Router()

routes.get('/test', (req, res) => res.status(200).send('OK'))
routes.post('/register', registerCustomer)
routes.post('/login', loginCustomer)



export default routes
