import { 
  User 
} from '../models'

import Logger from '../models/logger'

export default async (req, res, next) => {

  try {
    
    const {
      uid
    } = req


    const SHOULD_EVALUATE_UID = !(req.get('x-bypass-auth') && req.get('x-bypass-auth') === process.env.BYPASS_AUTH_KEY)

    if(SHOULD_EVALUATE_UID) {
      if(!uid) {
        Logger.warn('No uid found in request')

        res.status(401).json({
          message: 'No uid found in request'
        })

        return;
      }
    }
    
    if(!req.user) {
      Logger.warn('No user session found in request')

      res.status(401).json({
        message: 'No user session found in request'
      })

      return;
    }

    const user = await User.query()
      .where((builder) => {
        if(uid) {
          builder.where('uid', uid)
        } else {
          builder.where('user_id', req.user.user_id)
        }
      })
      .withGraphFetched('customer')
      .withGraphFetched('staff')
      

    if(!user.length) {
      Logger.warn('No user found with uid', uid)

      res.status(401).json({
        message: 'No uid found in request'
      })

      return;
    }

    req.user = user[0]
    next()

  } catch(e) {
    next(e)
  }
}