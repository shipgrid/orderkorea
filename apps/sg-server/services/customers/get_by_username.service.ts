import {
  User,
  Customer,
} from '../../models'

interface UserWithUserCustomer extends User {
  userCustomer: Customer
}

export default async ({
  username,
}):Promise<UserWithUserCustomer> => {
  try {
    const user = await User.query()
      .withGraphFetched('userCustomer')
      .where('username', username).first();

    return user as UserWithUserCustomer;
  } catch (error) {
    throw error;
  }
}
