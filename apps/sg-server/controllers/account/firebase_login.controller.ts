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
      success,
      message,
      data
    } = await account.firebaseLogin({
      firebase_token
    })

    if(!success) {
      res.status(400).json({ message })
      return;
    }

    if(!data) {
      res.status(404).json({ message: 'login data not found' })
      return;
    }

    const { 
      token,
      username,
      is_staff,
      is_customer
    } = data

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