import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  reservations
} from '../../services'

import User from '../../models/user'

const userSchema = Joi.object({
  user_id: Joi.number().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().allow('', null),
  username: Joi.string().required(),
  password_hash: Joi.string().required(),
  last_login: Joi.string().allow('', null),
  created_on: Joi.string().allow('', null),
  updated_on: Joi.string().allow('', null),
  deleted_on: Joi.string().allow('', null),
  customer: Joi.object({
    customer_id: Joi.number().required(),
    user_id: Joi.number().required(),
    created_on: Joi.string().allow('', null),
    updated_on: Joi.string().allow('', null),
    deleted_on: Joi.string().allow('', null)
  }),
  staff: Joi.object({
    staff_id: Joi.number().required(),
    user_id: Joi.number().required(),
    created_on: Joi.string().allow('', null),
    updated_on: Joi.string().allow('', null),
    deleted_on: Joi.string().allow('', null)
  }).allow({}, null)
})

declare global {
  namespace Express {
    interface Request {
      user?: User;
      params: {
        vehicle_id?: number;
        order_id?: number
      }
    }
  }
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { 
      error 
    } = userSchema.validate(req.user)

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      })
    }
    
    const {
      success,
      data
    } = await reservations.list({})

    if(!success) {
      return res.status(400).json({
        message: 'Error getting orders',
      })
    }

    if(!data) {
      return res.status(400).json({
        message: 'Error getting orders',
      })
    }

    res.status(200).json({ data, success });
  } catch (e) {
    next(e)
  }
}
