import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  orders
} from '../../services'

const paramsSchema = Joi.object({
  order_id: Joi.number().required()
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
      order_id
    } = req.params
    
    const {
      success,
      message
    } = await orders.remove({
      order_id
    })

    if(!success) {
      res.status(400).json({ 
        message: message, 
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
