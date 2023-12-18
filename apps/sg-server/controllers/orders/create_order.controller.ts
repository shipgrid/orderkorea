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
    const customer = req.customer

    const {
      vehicle_id, 
    } = req.body
    
    const data = await orders.create({
      vehicle_id,
      customer_id: customer.customer_id
    })

    res.status(200).json({ data, success: true });
  } catch (e) {
    next(e)
  }
}
