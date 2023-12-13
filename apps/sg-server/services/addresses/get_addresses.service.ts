import {
  Address,
  Logger
} from '../../models'

export default async ({}) => {

  try {
    const addresses = await Address.query();
    return addresses;
  } catch(e) {
    Logger.error('Error getting user by username:', e);
    throw e
  }
}