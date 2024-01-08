
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
      throw new Error(error.details[0].message) 
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
      res.status(400).json({ 
        success, 
        message
      })

      return;
    }

    if(!data) {
      res.status(404).json({ 
        success: false, 
        message: 'Vehicle not found' 
      })

      return;
    }

    res.status(200).json({ 
      data, 
      success 
    });
    
  } catch (e) {
    next(e)
  }
}