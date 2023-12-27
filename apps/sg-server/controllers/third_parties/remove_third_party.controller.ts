import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  thirdParties
} from '../../services'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      third_party_id,
    } = req.params
    
    const data = await thirdParties.remove({
      third_party_id
    })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}
