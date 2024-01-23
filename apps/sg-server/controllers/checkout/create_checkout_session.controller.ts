import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import Joi from 'joi'

import {
  checkout
} from '../../services'

import User from '../../models/user'

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

const paramSchema = Joi.object({
  vehicle_id: Joi.number().required()
})

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { 
      error 
    } = paramSchema.validate(req.params)
   
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      })
    }

    const {
      vehicle_id
    } = req.params

    const { 
      customer 
    }:any = req.user

    const {
      success,
      message,
      data
    } = await checkout.create({
      vehicle_id: vehicle_id,
      customer_id: customer.customer_id
    });

    if(!success) {
      return res.status(400).json({ success, message })
    }

    res.status(200).json({ success: true, data });
  } catch (e) {
    next(e)
  }
}
