import { 
  Router 
} from 'express'

import account from './account'
import addresses from './addresses'
import orders from './orders'
import vehicles from './vehicles'
import system from './system'

import validateToken from '../middlewares/validate_token'

const routes = Router()

routes.get('/test', (req, res) => res.status(200).send('OK'))
routes.use('/account', account);
routes.use('/vehicles', vehicles);
routes.use('/orders', orders);
routes.use('/addresses', addresses);
routes.use('/system', system);

export default routes
