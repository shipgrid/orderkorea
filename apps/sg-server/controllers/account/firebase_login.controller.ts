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
      token
    } = await account.firebaseLogin({
      firebase_token
    })

    res.status(200).json({ data: token });
  } catch (e) {
    next(e)
  }
}