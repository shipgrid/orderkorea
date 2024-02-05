import { 
  Router 
} from 'express'

import account from './account'
import addresses from './addresses'
import orders from './orders'
import vehicles from './vehicles'
import thirdParties from './third_parties'
import storage from './storage'
import filters from './filters'
import checkout from './checkout'
import webhook from './webhook'

import authValidation from '../middlewares/auth_validation'

const routes = Router()

routes.get('/test', (_, res) => res.status(200).send('OK'))
routes.use('/account', account);
routes.use('/vehicles', vehicles);
routes.use('/filters', filters)
routes.use('/orders', authValidation, orders);
routes.use('/addresses', authValidation, addresses);
routes.use('/third-parties', authValidation, thirdParties)
routes.use('/storage', authValidation, storage)
routes.use('/checkout', authValidation, checkout)
routes.use('/webhook', webhook)

export default routes
