import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  addresses
} from '../../services'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const data = await addresses.list({})

    res.status(200).json({ ...data, success: true });
  } catch (e) {
    next(e)
  }
}
