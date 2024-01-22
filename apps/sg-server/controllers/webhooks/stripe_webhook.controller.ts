
import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  stripe
} from '../../services'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const payload = req.body

    const response = await stripe.handle_webhooks({
      payload: payload
    })

    if(!response.success) {
      return res.status(400).json({
        success: false,
        message: response.message
      })
    }

    res.status(200).json({ 
      success: true 
    });
    
  } catch (e) {
    next(e)
  }
}

