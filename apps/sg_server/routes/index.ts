import { 
  Router 
} from 'express'

import {
  addUser
} from '../controllers/user.controller'

const routes = Router()

routes.get('/test', (req, res) => res.status(200).send('OK'))
routes.get('/user', addUser)


export default routes
