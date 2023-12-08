
import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  getVehicles
} from '../services/vehicles.service'

const getAllVehicles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const vehicles = await getVehicles({
    })
    console.log(vehicles)
    res.status(200).json({ data: vehicles, message: 'User added successfully'});
  } catch (e) {
    next(e)
  }
}

export {
  getAllVehicles
}