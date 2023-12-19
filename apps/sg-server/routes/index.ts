import { 
  Router 
} from 'express'

import account from './account'
import addresses from './addresses'
import orders from './orders'
import vehicles from './vehicles'

import validateToken from '../middlewares/validate_token'
import validateFirebaseToken from '../middlewares/validate_firebase_token'

const routes = Router()

routes.get('/test', (req, res) => res.status(200).send('OK'))
routes.use('/account', account);
routes.use('/vehicles', vehicles);
routes.use('/orders', orders);
routes.use('/addresses', addresses);

export default routes
