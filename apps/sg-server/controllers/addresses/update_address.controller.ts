import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction
} from 'express'

import {
  addresses
} from '../../services'

const paramsSchema = Joi.object({
  address_id: Joi.string().required() 
})

const bodySchema = Joi.object({
  address_id: Joi.number().required(),
  name: Joi.string(),
  line1: Joi.string(),
  line2: Joi.string().allow(null),
  city: Joi.string(),
  state_code: Joi.string(),
  country_code: Joi.string(),
  postal_code: Joi.string(),
  email: Joi.string(),
  phone: Joi.string()
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
    
    const bodyValidation = bodySchema.validate(req.body)
    if (bodyValidation.error) {
      return res.status(400).json({
        success: false,
        message: bodyValidation.error.details[0].message
      })
    }

    const {
      address_id
    } = req.params

    const {
      name,
      line1,
      line2,
      city,
      state_code,
      country_code,
      postal_code,
      email,
      phone,
    } = req.body


    const {
      success,
      message,
      data
    } = await addresses.update({
      address_id,
      name,
      line1,
      line2,
      city,
      state_code,
      country_code,
      postal_code,
      email,
      phone,
    })

    if(!success) {
      res.status(400).json({ message })
      return;
    }

    res.status(200).json({ success });
  } catch (e) {
    next(e)
  }
}
