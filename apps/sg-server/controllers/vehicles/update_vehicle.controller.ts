
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
  make: Joi.string(),
  model: Joi.string(),
  year: Joi.number(),
  exterior_color: Joi.string(),
  vin_number: Joi.string(),
  transmission_type: Joi.string().valid('automatic', 'manual'),
  mileage: Joi.number(),
  price: Joi.number(),
  description: Joi.string(),
  fuel_type: Joi.string().valid('gasoline', 'diesel'),
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
