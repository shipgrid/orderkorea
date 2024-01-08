import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  addresses
} from '../../services'

const paramsSchema = Joi.object({
  address_id: Joi.number().required()
})

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { error } = paramsSchema.validate(req.params)

  if (error) {
    throw new Error(error.details[0].message) 
  }

  try {
    const {
      address_id
    } = req.params

    const {
      success,
      message,
      data
    } = await addresses.getByAddressId({
      address_id
    })

    if(!success) {
      res.status(400).json({ message })
      return;
    }

    if(!data) {
      res.status(404).json({ message: 'address not found' })
      return;
    }

    res.status(200).json({ data, success: true });
  } catch (e) {
    next(e)
  }
}