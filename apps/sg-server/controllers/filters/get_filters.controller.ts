import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  filters
} from '../../services'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const {
    makes='',
    models='',
    price='',
    mileage='',
    years=''
  } = req.query as {
    makes: string,
    models: string,
    price: string,
    mileage: string,
    years: string
  }

  try {
    const {
      success,
      data,
      message
    } = await filters.getFilters({
      makesFilter: makes.length ? makes.split(',') : [],
      modelFilter: models.length ? models.split(',') : [],
      price: price.length ? price.split(',') : [],
      mileage: mileage.length ? mileage.split(',') : [],
      years: years.length ? years.split(',') : []
    })  

    if(!success) {
      return res.status(400).json({ 
        message: 'no filters found', 
        success
      })
    }

    res.status(200).json({ success: true, data });
  } catch (e) {
    next(e)
  }
}
