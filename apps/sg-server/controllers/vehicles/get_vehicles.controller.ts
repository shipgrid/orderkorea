
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
      success,
      data
    } = await vehicles.list({});

    if(!success) {
      return res.status(400).json({ 
        success, 
        message: 'Error getting vehicles'
      })
    };

    if(!data) {

      res.status(404).json({ 
        success: false, 
        message: 'Vehicles not found' 
      })
    };
    
    res.status(200).json({ 
      data: data,
      success 
    });

  } catch (e) {
    next(e)
  }
}
