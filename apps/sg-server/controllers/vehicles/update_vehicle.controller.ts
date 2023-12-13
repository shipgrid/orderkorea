
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
      vehicle_id,
    } = req.params
    
    const {
      make,
      model,
      year,
      exterior_color,
      transmission_type,
      mileage,
      description
    } = req.body

    await vehicles.update({
      vehicle_id,
      make,
      model,
      year,
      exterior_color,
      transmission_type,
      mileage,
      description
    })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}
