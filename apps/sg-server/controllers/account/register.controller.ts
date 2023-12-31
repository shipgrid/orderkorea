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
  firebase_token: Joi.string().required() 
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

    await account.register({
      first_name,
      last_name,
      username,
      password,
      uid
    })

    res.status(200).json({ message: 'User added successfully'});
  } catch (e) {
    next(e)
  }
}