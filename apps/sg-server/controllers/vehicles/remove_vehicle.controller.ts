
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
      vehicle_id
    } = req.params

    await vehicles.remove({
      vehicle_id
    })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}
