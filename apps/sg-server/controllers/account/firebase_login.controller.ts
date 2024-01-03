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

  try {
    const { error } = bodySchema.validate(req.body)

    if (error) {
      throw new Error(error.details[0].message) 
    }

    const {
      firebase_token
    } = req.body

    const { 
      token,
      username,
      is_staff,
      is_customer
    } = await account.firebaseLogin({
      firebase_token
    })

    res.status(200).json({ 
      data: {
        token,
        username,
        is_staff,
        is_customer
      },
    });

  } catch (e) {
    next(e)
  }
}