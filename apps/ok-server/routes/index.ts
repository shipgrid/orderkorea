import { 
  Router 
} from 'express'

import account from './account'
import order from './order'

import validateToken from '../middlewares/validate_token'
import validateFirebaseToken from '../middlewares/validate_firebase_token'

const routes = Router()

routes.get('/test', (req, res) => res.status(200).send('OK'))
routes.use('/account', account);
routes.use('/orders', order);

//To Make 
// routes.use('/inventory', inventory);
// routes.use('/shipments', shipments);
// routes.use('/shipment-rates', shipmentRates);
export default routes
