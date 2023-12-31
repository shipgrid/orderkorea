import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  thirdParties
} from '../../services'

const bodySchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required().valid('shipper', 'consignee', 'delivery_destination', 'notify_party'),
  line1: Joi.string().required(),
  line2: Joi.string().allow('', null),
  city: Joi.string().required(),
  state_code: Joi.string().required(),
  country_code: Joi.string().required(),
  postal_code: Joi.string().required(),
  email: Joi.string().allow('', null),
  phone: Joi.string().allow('', null),
  order_id: Joi.number().required()
})

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      name,
      type,
      line1,
      line2,
      city,
      state_code,
      country_code,
      postal_code,
      email, 
      phone, 
      order_id
    } = req.body
    
    const data = await thirdParties.create({
      name,
      type,
      line1,
      line2,
      city,
      state_code,
      country_code,
      postal_code,
      email, 
      phone, 
      order_id
    })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}
