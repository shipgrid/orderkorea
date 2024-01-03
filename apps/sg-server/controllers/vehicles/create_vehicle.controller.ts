
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
  vin_number: Joi.string().required(),
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

    const { error } = bodySchema.validate(req.body)

    if (error) {
      throw new Error(error.details[0].message) 
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

    const data = await vehicles.create({
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

    res.status(200).json({ data, success: true });
  } catch (e) {
    next(e)
  }
}

