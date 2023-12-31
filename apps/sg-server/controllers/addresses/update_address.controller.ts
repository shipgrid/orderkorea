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
  name: Joi.string(),
  line1: Joi.string(),
  line2: Joi.string(),
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
      throw new Error(paramsValidation.error.details[0].message)
    }
    
    const bodyValidation = bodySchema.validate(req.body)
    if (bodyValidation.error) {
      throw new Error(bodyValidation.error.details[0].message)
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


    const data = await addresses.update({
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

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}
