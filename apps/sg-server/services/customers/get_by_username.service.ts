import {
  User,
  Customer,
} from '../../models'

interface UserWithUserCustomer extends User {
  customer: Customer
}

export default async ({
  username,
}):Promise<UserWithUserCustomer> => {
  try {
    const user = await User.query()
      .withGraphFetched('customer')
      .where('username', username).first();

    return user as UserWithUserCustomer;
  } catch (error) {
    throw error;
  }
}
