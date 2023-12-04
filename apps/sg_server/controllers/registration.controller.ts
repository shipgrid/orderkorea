
import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  register
} from '../services/registration.service'

const registerCustomer = async (
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
    } = req.body

    await register({
      first_name,
      last_name,
      username,
      password,
    })

    res.status(200).json({ message: 'User added successfully'});
  } catch (e) {
    next(e)
  }
}

export {
  registerCustomer
}