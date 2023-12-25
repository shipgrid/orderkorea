import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  thirdParties
} from '../../services'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      name,
      type,
      line1,
      line2,
      city,
      state_code,
      country_code,
      postal_code,
      email, 
      phone, 
      order_id
    } = req.body
    
    const data = await thirdParties.create({
      name,
      type,
      line1,
      line2,
      city,
      state_code,
      country_code,
      postal_code,
      email, 
      phone, 
      order_id
    })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}
