import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  firebase
} from '../../services'

const bodySchema = Joi.object({
  name: Joi.string().required(),
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
    
    const bodyValidation = bodySchema.validate(req.body)
    if (bodyValidation.error) {

      return res.status(400).json({
        success: false,
        message: bodyValidation.error.details[0].message
      })
    }

    const fileValidation = fileSchema.validate(req.file)
    if (fileValidation.error) {
      return res.status(400).json({ 
        success: false,
        message: fileValidation.error.details[0].message
      })
    }

    const {
      name
    } = req.body

    const { 
      file
    } = req

    const {
      success,
      data
    } = await firebase.upload_files({
      file,
      destination: 'test',
      filename: name,
    })

    res.status(200).json({ success, data });
  } catch (e) {
    next(e)
  }
}
