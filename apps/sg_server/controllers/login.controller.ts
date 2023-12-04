
import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  login
} from '../services/authentication.service'

const loginCustomer = async (
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
    } = await login({
      username,
      password,
    })

    res.status(200).json({ token });
  } catch (e) {
    next(e)
  }
}

export {
  loginCustomer
}