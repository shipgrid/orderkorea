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
      username,
      password,
    } = req.body

    const { 
      token
    } = await account.login({
      username,
      password,
    })

    res.status(200).json({ token });
  } catch (e) {
    next(e)
  }
}