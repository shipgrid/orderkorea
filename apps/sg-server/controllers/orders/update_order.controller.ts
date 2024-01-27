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
  User
} from '../../models'

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

const userSchema = Joi.object({
  user_id: Joi.number().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().allow('', null),
  username: Joi.string().required(),
  password_hash: Joi.string().required(),
  is_broker: Joi.number().required(),
  is_staff: Joi.number().required(),
  last_login: Joi.string().allow('', null),
  created_on: Joi.string().allow('', null),
  updated_on: Joi.string().allow('', null),
  deleted_on: Joi.string().allow('', null)
}) 

const paramsSchema = Joi.object({
  order_id: Joi.string().required()
})

const bodySchema = Joi.object({
  order_id: Joi.number().required(),
  shipment_type: Joi.string().required().valid('ocean', 'air'),
  container_number: Joi.string().required(),
  port_of_loading: Joi.string().required(),
  port_of_arrival: Joi.string().required(),
  loaded_on: Joi.string().required()
})

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const userValidation = userSchema.validate(req.user)

    if (userValidation.error) {
      return res.status(400).json({
        success: false,
        message: userValidation.error.details[0].message
      })
    }

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
      order_id
    } = req.params

    const {
      shipment_type,
      container_number,
      port_of_loading,
      port_of_arrival, 
      loaded_on
    } = req.body

    if(!req.user) {
      return res.status(400).json({
        success: false,
        message: 'No user found'
      })
    }

    const {
      success,
      message
    } = await orders.update({
      order_id: parseInt(order_id),
      user_id: req.user.user_id,
      shipment_type,
      container_number,
      port_of_loading,
      port_of_arrival, 
      loaded_on
    })

    if(!success) {
      res.status(400).json({ 
        message, 
        success 
      })
      return;
    }

    res.status(200).json({ 
      success 
    });
    
  } catch (e) {
    next(e)
  }
}
