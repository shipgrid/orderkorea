
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

  console.log('hit register', req.body)

  try {
    const {
      first_name,
      last_name,
      username,
      password,
    } = req.body

    await account.register({
      first_name,
      last_name,
      username,
      password,
    })

    res.status(200).json({ message: 'User added successfully'});
  } catch (e) {
    console.log('err:', e)
    next(e)
  }
}