import Joi from 'joi'

import {
  HttpError
} from '../../models'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import { 
  orders 
} from '../../services'


const getOrdersByCustomerIdSchema = Joi.object({
  customer_id: Joi.string().required()
})

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { error } = getOrdersByCustomerIdSchema.validate(req.params)

    const { customer_id } = req.params

    if (error) {
      throw new HttpError(400, error.details[0].message)
    }

    const data = await orders.getByCustomerId({ customer_id })
    
    res.status(200).json({ message: 'customer orders fetched successfully', data });
  } catch (e) {
    next(e)
  }
}