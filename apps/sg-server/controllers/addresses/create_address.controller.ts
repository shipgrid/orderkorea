import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  addresses
} from '../../services'

const bodySchema = Joi.object({
  name: Joi.string().required(),
  line1: Joi.string().required(),
  line2: Joi.string(),
  city: Joi.string().required(),
  state_code: Joi.string().required(),
  country_code: Joi.string().required(),
  postal_code: Joi.string().required(),
  email: Joi.string().allow('', null),
  phone: Joi.string().allow('', null)
})

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { error } = bodySchema.validate(req.body)

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      })
    }

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
    } = await addresses.create({
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

    if(!data) {
      res.status(404).json({ message: 'address not found' })
      return;
    }

    res.status(200).json({ ...data, success });
  } catch (e) {
    next(e)
  }
}
