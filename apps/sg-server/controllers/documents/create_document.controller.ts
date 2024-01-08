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
  order_id: Joi.number().required()
})

const bodySchema = Joi.object({
  name: Joi.string().required()
})

const fileSchema = Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string().required(),
  mimetype: Joi.string().required(),
  buffer: Joi.binary().required(),
  size: Joi.number().required()
})

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const paramsValidation = paramsSchema.validate(req.params)
    if (paramsValidation.error) {
      return {
        success: false,
        message: paramsValidation.error.details[0].message
      }
    }

    const bodyValidation = bodySchema.validate(req.body)
    if (bodyValidation.error) {
      return {
        success: false,
        message: bodyValidation.error.details[0].message
      }
    }

    const fileValidation = fileSchema.validate(req.file)
    if (fileValidation.error) {
      return {
        success: false,
        message: fileValidation.error.details[0].message
      }
    }

    const {
      order_id, 
    } = req.params
    
    const {
      name
    } = req.body

    const {
      file
    } = req 

    const {
      success,
      data,
      message
    } = await documents.create({
      name: name,
      file: file,
      order_id
    })

    if(!success) {

      res.status(400).json({
        message: message
      })

      return;
    }

    if(!data) {
        
      res.status(400).json({
        message: 'Error creating document'
      })

      return;
    }

    res.status(200).json({ data: data.document_id, success: true });
  } catch (e) {
    next(e)
  }
}
