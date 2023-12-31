
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
    const data = await vehicles.list({})
    console.log('data:', data)
    
    res.status(200).json({ data: data, success: true });
  } catch (e) {
    next(e)
  }
}
