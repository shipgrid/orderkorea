import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  orders
} from '../../services'

import {
  IUser 
} from '../../models/user'

const userSchema = Joi.object({
  user_id: Joi.number().required(),
  uid: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
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
  staff: Joi.string().allow('', null)
}) 

const paramsSchema = Joi.object({
  order_id: Joi.number().required()
})

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      params: {
        order_id: number
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

    if (userValidation.error) {
      throw new Error(userValidation.error.details[0].message) 
    }

    const paramsValidation = paramsSchema.validate(req.params)
    
    if (paramsValidation.error) {
      throw new Error(paramsValidation.error.details[0].message) 
    }

    const { 
      customer 
    }:any = req.user
    
    const {
      order_id
    } = req.params
    
    if(!customer) {
      throw new Error('No customer found for user')
    }

    const data = await orders.getByOrderId({
      order_id,
      customer_id: customer.customer_id
    })

    res.status(200).json({ data, success: true });
  } catch (e) {
    next(e)
  }
}
