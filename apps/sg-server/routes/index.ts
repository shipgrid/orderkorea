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

import validateToken from '../middlewares/validate_token'

const routes = Router()

routes.get('/test', (req, res) => res.status(200).send('OK'))
routes.post('/register', registerCustomer)
routes.post('/login', loginCustomer)

routes.get('/vehicles', validateToken, getVehiclesController)
routes.get('/vehicles/:vehicle_id', validateToken, getVehicleByIdController)
routes.post('/vehicles', validateToken, createVehicleController)
routes.delete('/vehicles/:vehicle_id', validateToken, deleteVehicleController)
routes.put('/vehicles/:vehicle_id', validateToken, updateVehicleController)

routes.get('/orders', validateToken, getOrdersController)
routes.get('/orders/:order_id', validateToken, getOrderByIdController)
routes.post('/orders', validateToken, createOrderController)
routes.delete('/orders/:order_id', validateToken, deleteOrderController)

routes.get('/addresses', validateToken, getAddressesController)
routes.get('/addresses/:address_id', validateToken, getAddressByIdController)
routes.put('/addresses', validateToken, updateAddressController)
routes.post('/addresses', validateToken, createAddressController)
routes.delete('/addresses/:address_id', validateToken, deleteAddressController)


export default routes
