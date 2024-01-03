import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction
} from 'express'

import {
  orders
} from '../../services'

const paramsSchema = Joi.object({
  order_id: Joi.number().required()
})

const bodySchema = Joi.object({
  shipment_type: Joi.string().required().valid('ocean', 'air'),
  container_number: Joi.string().required(),
  port_of_loading: Joi.string().required(),
  port_of_arrival: Joi.string().required(),
  loaded_on: Joi.string().required()
})

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const paramsValidation = paramsSchema.validate(req.params)
    if (paramsValidation.error) {
      throw new Error(paramsValidation.error.details[0].message) 
    }

    const bodyValidation = bodySchema.validate(req.body)
    if (bodyValidation.error) {
      throw new Error(bodyValidation.error.details[0].message) 
    }

    const { 
      order_id
    } = req.params

    const {
      shipment_type,
      container_number,
      port_of_loading,
      port_of_arrival, 
      loaded_on
    } = req.body

    const data = await orders.update({
      order_id,
      shipment_type,
      container_number,
      port_of_loading,
      port_of_arrival, 
      loaded_on
    })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}
