import { 
  Router 
} from 'express'

import account from './account'

import validateToken from '../middlewares/validate_token'
import validateFirebaseToken from '../middlewares/validate_firebase_token'

const routes = Router()

routes.get('/test', (req, res) => res.status(200).send('OK'))
routes.use('/account', account);

export default routes
