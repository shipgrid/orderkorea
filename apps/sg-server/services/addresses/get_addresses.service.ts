import Address from '../../models/address';
import logger from '../../models/logger'

export default async ({}) => {

  try {
    const addresses = await Address.query();
    return addresses;
  } catch(e) {
    logger.error('Error getting user by username:', e);
    throw e
  }
}