import { 
  Router 
} from 'express'

import {
  registerCustomer
} from '../controllers/registration.controller'

import {
  loginCustomer
} from '../controllers/login.controller'

import {
  getVehicleByIdController,
  getVehiclesController,
  createVehicleController,
  deleteVehicleController,
  updateVehicleController
} from '../controllers/vehicle.controller'

const routes = Router()

routes.get('/test', (req, res) => res.status(200).send('OK'))
routes.post('/register', registerCustomer)
routes.post('/login', loginCustomer)
routes.get('/vehicles', getVehiclesController)
routes.post('/vehicles', createVehicleController)
routes.delete('/vehicles', deleteVehicleController)
routes.put('/vehicles', updateVehicleController)
routes.get('/vehicles/:vehicle_id', getVehicleByIdController)



export default routes
