
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
    const {
      make,
      model,
      year,
      exterior_color,
      transmission_type,
      mileage,
      description
    } = req.body

    const data = await vehicles.create({
      make,
      model,
      year,
      exterior_color,
      transmission_type,
      mileage,
      description
    })

    res.status(200).json({ data, success: true });
  } catch (e) {
    next(e)
  }
}

