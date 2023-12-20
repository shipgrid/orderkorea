import {
  Logger,
  User,
  HttpError
} from '../../models'

export default async ({
  username,
}) => {

  try {
    if (!username) {
      throw new HttpError(400, 'Username is required')
    }

    const user = await User.query().where('username', username).first();

    if(!user) {
      throw new HttpError(404, 'User not found');
    }

    return user;
  } catch(e) {
    Logger.error('Error getting user by username:', e);
    throw e
  }
}
