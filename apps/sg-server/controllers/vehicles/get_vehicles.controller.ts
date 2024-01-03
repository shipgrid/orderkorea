
import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  vehicles
} from '../../services'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const data = await vehicles.list({})
    
    res.status(200).json({ data: data, success: true });
  } catch (e) {
    next(e)
  }
}
