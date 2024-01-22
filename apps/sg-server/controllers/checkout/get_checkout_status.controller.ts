import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import Joi from 'joi'

import Logger from '../../models/logger'

import {
  checkout
} from '../../services'

const paramsSchema = Joi.object({
  session_id: Joi.string().required()
})

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { 
      error 
    } = paramsSchema.validate(req.params)
   
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      })
    }

    const {
      session_id
    } = req.params

    const {
      success,
      message,
      data
    } = await checkout.get({
      session_id: session_id
    });

    if(!success) {
      return res.status(400).json({ success, message })
    }

    res.status(200).json({ success: true, data });
  } catch (e) {
    next(e)
  }
}
