import User from '../../models/user'
import UserCustomer from '../../models/user_customer'

interface UserWithUserCustomer extends User {
  userCustomer: UserCustomer; 
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
