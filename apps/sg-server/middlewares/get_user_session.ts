import { 
  User 
} from '../models'

import Logger from '../models/logger'

export default async (req, res, next) => {

  try {
    
    if(!req.user) {
      Logger.warn('No user session found in request')

      res.status(401).json({
        message: 'No user session found in request'
      })

      return;
    }

    const {
      user_id
    } = req.user

    const user = await User.query()
      .where((builder) => {
        builder.where('user_id', user_id)
      })
      

    if(!user.length) {
      Logger.warn('No user found in request')

      res.status(401).json({
        message: 'No user found in request'
      })

      return;
    }

    req.user = user[0]
    next()

  } catch(e) {
    next(e)
  }
}