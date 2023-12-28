import { 
  Router 
} from 'express'

import account from './account'
import addresses from './addresses'
import orders from './orders'
import vehicles from './vehicles'
import thirdParties from './third_parties'
import storage from './storage'

import validateFirebaseToken from '../middlewares/validate_firebase_token'
import getUserSession from '../middlewares/get_user_session'

const routes = Router()

routes.get('/test', (req, res) => res.status(200).send('OK'))
routes.use('/account', account);
routes.use('/vehicles', validateFirebaseToken, getUserSession, vehicles);
routes.use('/orders', orders);
routes.use('/addresses', validateFirebaseToken, getUserSession, addresses);
routes.use('/third-parties', validateFirebaseToken, getUserSession, thirdParties)
routes.use('/storage', storage)

export default routes
