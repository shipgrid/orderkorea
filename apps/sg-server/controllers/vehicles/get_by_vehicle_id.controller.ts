
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
  
    const data = await vehicles.getByVehicleId({
      vehicle_id,
    })
  
    res.status(200).json({ data, success: true });
  } catch (e) {
    next(e)
  }
}