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

    const user = req.user
    
    const {
      customer
    } = user 

    const {
      order_id
    } = req.params
    
    const data = await orders.getByOrderId({
      order_id,
      customer_id: customer.customer_id
    })

    res.status(200).json({ data, success: true });
  } catch (e) {
    next(e)
  }
}
