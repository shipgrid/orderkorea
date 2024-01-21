import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import Joi from 'joi'

import {
  checkout
} from '../../services'

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
      success,
      message,
      data
    } = await checkout.create({
      vehicle_id: vehicle_id
    });

    if(!success) {
      return res.status(400).json({ success, message })
    }

    res.status(200).json({ success: true, data });
  } catch (e) {
    next(e)
  }
}
