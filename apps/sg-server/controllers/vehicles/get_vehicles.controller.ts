
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
      res.status(400).json({ 
        success, 
        message: 'Error getting vehicles'
      })

      return;
    };

    if(!data) {

      res.status(404).json({ 
        success: false, 
        message: 'Vehicles not found' 
      })

      return;
    };
    
    res.status(200).json({ 
      data: data,
      success 
    });

  } catch (e) {
    next(e)
  }
}
