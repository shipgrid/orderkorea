import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  thirdParties
} from '../../services'

const paramsSchema = Joi.object({
  third_party_id: Joi.number().required()
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
      third_party_id,
    } = req.params
    
    const data = await thirdParties.remove({
      third_party_id
    })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}
