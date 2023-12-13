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
    const data = await orders.list({})

    res.status(200).json({ data: data, success: true });
  } catch (e) {
    next(e)
  }
}
