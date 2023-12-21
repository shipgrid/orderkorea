
import {
  HttpError
} from '../../models'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import { 
  orders 
} from '../../services'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { customer_id } = req.params 
    console.log('ran!!', customer_id)

    if (!customer_id) {
      throw new HttpError(400, 'Customer id is required')
    }

    const data = await orders.getByCustomerId({ customer_id })

    console.log('data:', data)
    
    res.status(200).json({ message: 'customer orders fetched successfully', data });
  } catch (e) {
    next(e)
  }
}