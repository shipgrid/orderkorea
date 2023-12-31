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
  username: Joi.string().required(),
  password: Joi.string().required()
})

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { error } = bodySchema.validate(req.body)
    
    if (error) {
      throw new Error(error.details[0].message)
    }

    const {
      username,
      password
    } = req.body

    const { 
      token
    } = await account.login({
      username,
      password
    })

    res.status(200).json({ token })
  } catch (e) {
    next(e)
  }
}