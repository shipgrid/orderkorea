
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
  price: Joi.number(),
  mileage: Joi.number(),
  exterior_color: Joi.string(),
  interior_color: Joi.string(),
  transmission_type: Joi.string().valid('automatic', 'manual'),
  doors: Joi.number(),
  trim: Joi.string(),
  is_listed: Joi.boolean(),
  is_sold: Joi.boolean(),
  drivetrain: Joi.string().valid('FWD', 'AWD', 'RWD', '4WD'),
  is_new: Joi.boolean(),
  vin_number: Joi.string(),
  fuel_type: Joi.string().valid('gasoline', 'diesel'),
  description: Joi.string(),
})

export default async (  
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const paramsValidation = paramsSchema.validate(req.params)
    
    if (paramsValidation.error) {
      return res.status(400).json({
        success: false,
        message: paramsValidation.error.details[0].message
      })
    }

    const bodyValidation = bodySchema.validate(req.body);

    if (bodyValidation.error) {
      return res.status(400).json({
        success: false,
        message: bodyValidation.error.details[0].message
      })
    }
    
    const {
      vehicle_id
    } = req.params
    
    const {
      make,
      model,
      year,
      price, 
      is_new,
      is_listed,
      is_sold,
      mileage, 
      exterior_color,
      interior_color,
      transmission_type,
      doors, 
      trim, 
      drivetrain, 
      vin_number, 
      fuel_type, 
      description
    } = req.body

    const {
      success
    } = await vehicles.update({
      vehicle_id,
      make,
      model,
      year,
      is_new,
      is_listed,
      is_sold,
      price, 
      mileage, 
      exterior_color,
      interior_color,
      transmission_type,
      doors, 
      trim, 
      drivetrain, 
      vin_number, 
      fuel_type, 
      description
    })
  
    if(!success) {
      return res.status(400).json({ 
        success, 
        message: 'Error updating vehicle'
      })
    }

    res.status(200).json({ 
      success: true 
    });
    
  } catch (e) {
    next(e)
  }
}
