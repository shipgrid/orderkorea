import { 
  Router 
} from 'express'

import account from './account'
import addresses from './addresses'
import orders from './orders'
import vehicles from './vehicles'

import validateToken from '../middlewares/validate_token'

const routes = Router()

routes.get('/test', (req, res) => res.status(200).send('OK'))
routes.use('/account', account);
routes.use('/vehicles', validateToken, vehicles);
routes.use('/orders', validateToken, orders);
routes.use('/addresses', validateToken, addresses);

export default routes
