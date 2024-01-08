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

    const { error } = paramsSchema.validate(req.params)

    if (error) {
      throw new Error(error.details[0].message) 
    }
    
    const {
      order_id
    } = req.params
    
    const {
      success,
    } = await orders.remove({
      order_id
    })

    if(!success) {
      res.status(400).json({ 
        message: 'Error removing order', 
        success 
      })

      return;
    }

    res.status(200).json({ success });
  } catch (e) {
    next(e)
  }
}
