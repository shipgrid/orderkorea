import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  addresses
} from '../../services'


export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      address_id,
      name,
      line1,
      line2,
      city,
      state_code,
      country_code,
      postal_code,
      email,
      phone,
      customer_id,
    } = req.body

    const data = await addresses.update({
      address_id,
      name,
      line1,
      line2,
      city,
      state_code,
      country_code,
      postal_code,
      email,
      phone,
      customer_id,
    })

    res.status(200).json({ data: data, success: true });
  } catch (e) {
    next(e)
  }
}
