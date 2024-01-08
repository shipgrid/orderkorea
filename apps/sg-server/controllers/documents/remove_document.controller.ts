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
      document_id
    } = req.params

    const {
      success,
      data,
      message
    } = await documents.remove({
      document_id
    })

    if(!success) {
      res.status(400).json({
        message: message
      })

      return;
    }

    res.status(200).json({ success })
  } catch (e) {
    next(e)
  }
}