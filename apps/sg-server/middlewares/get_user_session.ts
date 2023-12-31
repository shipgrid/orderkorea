import Logger from '../models/logger'
import { User } from '../models'

export default async (req, res, next) => {

  try {

    const {
      uid
    } = req

    if(!uid) {
      Logger.warn('No uid found in request')
      throw new Error('No uid found in request')
    }
  
    const user = await User
      .query()
      .findOne({ uid })
      .withGraphFetched('customer')
      .withGraphFetched('staff')

    if(!user) {
      Logger.warn('No user found with uid', uid)
      throw new Error('No user found with uid')
    }

    req.user = user
    next()

  } catch(e) {
    next(e)
  }
}