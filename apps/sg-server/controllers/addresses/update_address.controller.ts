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
      name,
      line1,
      line2,
      city,
      state_code,
      country_code,
      postal_code,
      email,
      phone,
    } = req.body

    const {
      address_id
    } = req.params

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
    })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}
