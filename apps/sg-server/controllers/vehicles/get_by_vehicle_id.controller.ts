
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

    const { error } = paramsSchema.validate(req.params)

    if (error) {
      throw new Error(error.details[0].message) 
    }

    const {
      vehicle_id,
    } = req.params
  
    const data = await vehicles.getByVehicleId({
      vehicle_id,
    })
  
    res.status(200).json({ data, success: true });
  } catch (e) {
    next(e)
  }
}