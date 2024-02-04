import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  account
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

const bodySchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required()
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

    const userValidation = userSchema.validate(req.user)

    if(userValidation.error) {
      return res.status(400).json({
        success: false,
        message: userValidation.error.details[0].message
      })
    }

    const bodyValidation = bodySchema.validate(req.body)

    if(bodyValidation.error) {
      return res.status(400).json({
        success: false,
        message: bodyValidation.error.details[0].message
      })
    }
    
    const {
      first_name, 
      last_name
    } = req.body

    const {
      success,
      message
    } = await account.updateAccount({
      user_id: req.user.user_id,
      first_name,
      last_name
    })

    if(!success) {
      res.status(400).json({ message })
      return;
    }

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}
