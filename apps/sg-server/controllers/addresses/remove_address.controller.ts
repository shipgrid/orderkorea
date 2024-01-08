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
  address_id: Joi.string().required() 
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
      address_id
    } = req.params

    const {
      success,
      message,
      data
    } = await addresses.remove({
      address_id
    })

    if(!success) {
      res.status(400).json({ message })
      return;
    }

    res.status(200).json({ success });
  } catch (e) {
    next(e)
  }
}