import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  orders
} from '../../services'

import User from '../../models/user'

const userSchema = Joi.object({
  user_id: Joi.number().required(),
  is_broker: Joi.number().required(),
  is_staff: Joi.number().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().allow('', null),
  username: Joi.string().required(),
  password_hash: Joi.string().required(),
  last_login: Joi.string().allow('', null),
  created_on: Joi.string().allow('', null),
  updated_on: Joi.string().allow('', null),
  deleted_on: Joi.string().allow('', null),
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

    if(!req.user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }
    
    const {
      success,
      data
    } = await orders.list({
      user_id: req.user.user_id
    })

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
