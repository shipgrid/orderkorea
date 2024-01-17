import Joi from 'joi'

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

  console.log(req.query)

  const {
    makes='',
    models='',
    price='',
    mileage='',
    years=''
  } = req.query

  console.log(makes.split(','), makes.length)

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
