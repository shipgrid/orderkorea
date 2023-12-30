import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import { 
  account 
} from '../../services'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
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