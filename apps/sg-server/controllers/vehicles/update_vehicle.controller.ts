
import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  vehicles
} from '../../services'

const paramsSchema = Joi.object({
  vehicle_id: Joi.number().required()
})

const bodySchema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().required(),
  exterior_color: Joi.string().required(),
  vin_number: Joi.string().required(),
  transmission_type: Joi.string().valid('automatic', 'manual').required(),
  mileage: Joi.number().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  fuel_type: Joi.string().valid('gasoline', 'diesel').required(),
})

export default async (  
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const paramsValidation = paramsSchema.validate(req.params)
    if (paramsValidation.error) {
      throw new Error(paramsValidation.error.details[0].message) 
    }

    const bodyValidation = bodySchema.validate(req.body)
    if (bodyValidation.error) {
      throw new Error(bodyValidation.error.details[0].message) 
    }
    
    const {
      vehicle_id
    } = req.params
    
    const {
      make,
      model,
      year,
      exterior_color,
      vin_number,
      transmission_type,
      mileage,
      price, 
      description,
      fuel_type,
    } = req.body

    await vehicles.update({
      vehicle_id,
      make,
      model,
      year,
      exterior_color,
      vin_number,
      transmission_type,
      mileage,
      price,
      description,
      fuel_type
    })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}
