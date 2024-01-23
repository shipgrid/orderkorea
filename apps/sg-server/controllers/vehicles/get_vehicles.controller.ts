
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
  } = req.query

  try {
    const {
      success,
      data
    } = await vehicles.list({
      searchFilter: search.length ? search.split(',') : [],
      conditionsFilter: conditions.length ? conditions.split(',') : [],
      makesFilter: makes.length ? makes.split(',') : [],
      modelFilter: models.length ? models.split(',') : [],
      trimFilter: trims.length ? trims.split(',') : [],
      priceFilter: price.length ? price.split(',') : [],
      mileageFilter: mileage.length ? mileage.split(',') : [],
      yearsFilter: years.length ? years.split(',') : [],
      sortFilter: sort.length ? sort.split(',') : []
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
    next(e)
  }
}
