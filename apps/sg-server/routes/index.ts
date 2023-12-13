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

import {
  getOrdersController,
  getOrderByIdController,
  createOrderController,
  deleteOrderController
} from '../controllers/order.controller'

import {
  getAddressesController,
  getAddressByIdController,
  createAddressController,
  deleteAddressController,
  updateAddressController
} from '../controllers/address.controller'

import {
  getPresignedUrlsController
} from '../controllers/system.controller'

import validateToken from '../middlewares/validate_token'

const routes = Router()

routes.get('/test', (req, res) => res.status(200).send('OK'))
routes.post('/register', registerCustomer)
routes.post('/login', loginCustomer)

routes.get('/vehicles', validateToken, getVehiclesController)
routes.get('/vehicles/:vehicle_id', getVehicleByIdController)
routes.post('/vehicles', createVehicleController)
routes.delete('/vehicles', deleteVehicleController)
routes.put('/vehicles', updateVehicleController)

routes.get('/orders', getOrdersController)
routes.get('/orders/:order_id', getOrderByIdController)
routes.post('/orders', createOrderController)
routes.delete('/orders', deleteOrderController)

routes.get('/addresses', getAddressesController)
routes.get('/addresses/:address_id', getAddressByIdController)
routes.put('/addresses', updateAddressController)
routes.post('/addresses', createAddressController)
routes.delete('/addresses', deleteAddressController)

routes.post('/system/s3/presignUrl', getPresignedUrlsController)

export default routes
