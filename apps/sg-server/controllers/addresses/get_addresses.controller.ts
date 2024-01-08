import Joi from 'joi'

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
      success,
      message,
      data
    } = await addresses.list({})

    if(!success) {
      res.status(400).json({ message })
      return;
    }

    if(!data) {
      res.status(404).json({ message: 'addresses not found' })
      return;
    }

    res.status(200).json({ ...data, success });
  } catch (e) {
    next(e)
  }
}
