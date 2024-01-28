
import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  vehicles
} from '../../services'

import User from '../../models/user'

declare global {
  namespace Express {
    interface Request {
      user?: User;
      params: {
        vehicle_id?: number;
        order_id?: number
      }
    }
  }
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const {
    search='',
    conditions='',
    makes='',
    models='',
    price='',
    mileage='',
    years='',
    trims='',
    sort=''
  } = req.query as {
    search: string,
    conditions: string,
    makes: string,
    models: string,
    price: string,
    mileage: string,
    years: string,
    trims: string,
    sort: string
  }

  try {

    if(!req.user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      })
    }

    const {
      success,
      data
    } = await vehicles.getByUserId({
      searchFilter: search.length ? search.split(',') : [],
      conditionsFilter: conditions.length ? conditions.split(',') : [],
      makesFilter: makes.length ? makes.split(',') : [],
      modelFilter: models.length ? models.split(',') : [],
      trimFilter: trims.length ? trims.split(',') : [],
      priceFilter: price.length ? price.split(',') : [],
      mileageFilter: mileage.length ? mileage.split(',') : [],
      yearsFilter: years.length ? years.split(',') : [],
      sortFilter: sort.length ? sort.split(',') : [],
      user_id: req.user.user_id
    });

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
    console.log(e)
    next(e)
  }
}
