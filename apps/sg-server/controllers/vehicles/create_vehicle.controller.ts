
import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  vehicles
} from '../../services'

const _imageSchema = Joi.object({
  image_url: Joi.string().required()
})

const bodySchema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().required(),
  exterior_color: Joi.string().required(),
  vin_number: Joi.string().allow(null),
  transmission_type: Joi.string().required(),
  mileage: Joi.number().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  fuel_type: Joi.string().required(),
  images: Joi.array().items(_imageSchema).min(1).required(),
})

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { 
      error 
    } = bodySchema.validate(req.body)
   
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      })
    }

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
      images
    } = req.body

    const {
      success,
    } = await vehicles.create({
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
      images
    })

    if(!success) {
      return res.status(400).json({ 
        success, 
        message: 'Error creating vehicle' 
      })
    }

    res.status(200).json({ 
      success: true 
    });
    
  } catch (e) {
    next(e)
  }
}

