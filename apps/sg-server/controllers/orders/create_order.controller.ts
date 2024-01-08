import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  orders
} from '../../services'

const _imageSchema = Joi.object({
  image_url: Joi.string().required()
})

const _addressSchema = Joi.object({
  name: Joi.string().required(),
  line1: Joi.string().required(),
  line2: Joi.string().allow('', null),
  city: Joi.string().required(),
  state_code: Joi.string().required(),
  country_code: Joi.string().required(),
  postal_code: Joi.string().required(),
  email: Joi.string().allow('', null),
  phone: Joi.string().allow('', null)
})

const _thirdPartySchema = Joi.object({
  address: _addressSchema,
  type: Joi.string().valid('consignee', 'shipper'),
})

const _documentSchema = Joi.object({
  name: Joi.string().required(),
  file_url: Joi.string().required()
})

const _vehicleSchema = Joi.object({
  vehicle_id: Joi.number().required(),
  order_id: Joi.number().required(),
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.string().required(),
  exterior_color: Joi.string().required(),
  vin_number: Joi.string().required(),
  transmission_type: Joi.string().valid('automatic', 'manual').required(),
  mileage: Joi.number().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  fuel_type: Joi.string().valid('gasoline', 'diesel').required(),
  images: Joi.array().items(_imageSchema),
  created_on: Joi.string().allow('', null),
  updated_on: Joi.string().allow('', null),
  deleted_on: Joi.string().allow('', null)
})

const bodySchema = Joi.object({
  email: Joi.string().required(),
  shipment_type: Joi.string().valid('ocean', 'air').required(),
  port_of_loading: Joi.string().allow('', null),
  container_number: Joi.string().allow('', null),
  port_of_arrival: Joi.string().allow('', null),
  loaded_on: Joi.string().allow('', null),
  thirdParties: Joi.array().items(_thirdPartySchema),
  documents: Joi.array().items(_documentSchema),
  vehicles: Joi.array().items(_vehicleSchema).min(1).required()
})

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { error } = bodySchema.validate(req.body)

  if (error) {
    throw new Error(error.details[0].message) 
  }

  try {
    const {
      email,
      shipment_type,
      port_of_loading,
      container_number,
      port_of_arrival,
      loaded_on,
      thirdParties,
      documents,
      vehicles
    } = req.body
    
    const {
      success,
      message,
      data
    } = await orders.create({
      email,
      shipment_type,
      port_of_loading,
      container_number,
      port_of_arrival,
      loaded_on,
      thirdParties,
      documents,
      vehicles
    })

    if(!success) {
      res.status(400).json({ message, success })
      return;
    }

    if(!data) {
      res.status(400).json({ message: 'Failed to create order' })
      return;
    }

    res.status(200).json({ data, success: true })
  } catch (e) {
    next(e)
  }
}
