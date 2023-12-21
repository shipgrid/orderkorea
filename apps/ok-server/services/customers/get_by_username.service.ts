import {
  User,
  Customer,
  HttpError
} from '../../models'

interface UserWithUserCustomer extends User {
  userCustomer: Customer
}

export default async ({
  username,
}):Promise<UserWithUserCustomer> => {

  if (!username) {
    throw new HttpError(400, 'Username is required')
  }
  
  try {
    const user = await User.query()
      .withGraphFetched('userCustomer')
      .where('username', username).first();

    return user as UserWithUserCustomer;
  } catch (error) {
    throw error;
  }
}
