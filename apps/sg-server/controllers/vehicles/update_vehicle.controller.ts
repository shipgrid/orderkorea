
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
  price: Joi.number().required(),
  mileage: Joi.number().required(),
  exterior_color: Joi.string().required(),
  interior_color: Joi.string().required(),
  transmission_type: Joi.string().valid('automatic', 'manual').required(),
  doors: Joi.number().required(),
  trim: Joi.string().required(),
  drivetrain: Joi.string().valid('FWD', 'AWD', 'RWD', '4WD').required(),
  is_new: Joi.boolean().required(),
  vin_number: Joi.string().required(),
  fuel_type: Joi.string().valid('gasoline', 'diesel').required(),
  description: Joi.string().required(),
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
      price, 
      is_new,
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
      res.status(400).json({ 
        success, 
        message: 'Error updating vehicle'
      })

      return;
    }

    res.status(200).json({ 
      success: true 
    });
    
  } catch (e) {
    next(e)
  }
}
