import {
  Logger,
  User,
} from '../../models'

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
    Logger.error('Error getting user by username:', e);
    throw e
  }
}
