import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import { 
  account 
} from '../../services'

const bodySchema = Joi.object({
  first_name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  uid: Joi.string().required()
})

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { error } = bodySchema.validate(req.body)

  if (error) {
    throw new Error(error.details[0].message) 
  }

  try {
    const {
      first_name,
      last_name,
      username,
      password,
      uid
    } = req.body

    const response = await account.register({
      first_name,
      last_name,
      username,
      password,
      uid
    })

    if(!response.success) {

      res.status(400).json({
        success: false,
        message: 'Error registering user'
      })

      return
    }

    res.status(200).json({ success: true })
  } catch (e) {
    next(e)
  }
}