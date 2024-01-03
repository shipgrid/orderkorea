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
      price, 
      is_new,
      mileage, 
      exterior_color,
      interior_color,
      transmission_type,
      doors, 
      trim, 
      drivetrain, 
      vin_number, 
      fuel_type, 
      description
    } = req.body

    const data = await vehicles.update({
      vehicle_id,
      make,
      model,
      year,
      is_new,
      price, 
      mileage, 
      exterior_color,
      interior_color,
      transmission_type,
      doors, 
      trim, 
      drivetrain, 
      vin_number, 
      fuel_type, 
      description
    })
  

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}
