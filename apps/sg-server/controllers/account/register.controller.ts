
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