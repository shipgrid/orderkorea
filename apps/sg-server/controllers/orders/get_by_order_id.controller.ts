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

    const {
      order_id
    } = req.params
    
    const data = await orders.getByOrderId({
      order_id
    })

    res.status(200).json({ data: data, success: true });
  } catch (e) {
    next(e)
  }
}
