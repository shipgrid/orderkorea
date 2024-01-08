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
      success,
      message, 
      data
    } = await account.refreshToken({
      firebase_token
    })
    
    if(!success) {
      return res.status(400).json({ message })
    }

    if(!data) {
      return res.status(404).json({ message: 'token not found' })
    }

    res.status(200).json({ 
      success,
      data
    });

  } catch (e) {
    next(e)
  }
}