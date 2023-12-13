import User from '../../models/user'
import logger from '../../models/logger'

export default async ({
  username,
}) => {

  try {
    const user = await User.query().where('username', username).first();

    if(!user) {
      throw new Error('User not found');
    }

    return user;
  } catch(e) {
    logger.error('Error getting user by username:', e);
    throw e
  }
}
