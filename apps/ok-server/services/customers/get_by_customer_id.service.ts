import {
  User,
  Customer,
  HttpError
} from '../../models'

interface UserCustomerWithUser extends Customer {
  users: User
}

export default async ({
  customer_id,
}):Promise<UserCustomerWithUser> => {

  console.log('custp,er id', customer_id)

  if (!customer_id) {
    throw new HttpError(400, 'Customer ID is required')
  }
  
  console.log('before'  )
  const user = await Customer.query()
    .withGraphFetched('user')
    .where('customer_id', customer_id).first();

  return user as UserCustomerWithUser;
}
