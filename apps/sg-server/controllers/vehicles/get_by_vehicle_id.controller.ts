
import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  vehicles
} from '../../services'

const paramsSchema = Joi.object({
  vehicle_id: Joi.number().required()
})

export default async (  
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { 
      error 
    } = paramsSchema.validate(req.params)

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      })
    }

    const {
      vehicle_id,
    } = req.params
  
    const {
      success,
      message,
      data
    } = await vehicles.getByVehicleId({
      vehicle_id,
    })

    if(!success) {
      return res.status(400).json({ 
        success, 
        message
      })
    }

    if(!data) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vehicle not found' 
      })
    }

    res.status(200).json({ 
      data, 
      success 
    });
    
  } catch (e) {
    next(e)
  }
}