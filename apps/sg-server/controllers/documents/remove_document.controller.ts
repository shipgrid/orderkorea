import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  documents
} from '../../services'

const paramsSchema = Joi.object({
  document_id: Joi.number().required()
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
      document_id
    } = req.params

    const data = await documents.remove({
      document_id
    })

    res.status(200).json({ success: true })
  } catch (e) {
    next(e)
  }
}