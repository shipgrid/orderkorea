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
    } = req.params

    const { 
      token
    } = await account.refreshToken({
      firebase_token
    })

    res.status(200).json({ 
      data: {
        token,
      },
    });

  } catch (e) {
    next(e)
  }
}