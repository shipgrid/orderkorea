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

    const {
      address_id
    } = req.params

    const data = await addresses.remove({
      address_id
    })

    res.status(200).json({ data: data, success: true });
  } catch (e) {
    next(e)
  }
}