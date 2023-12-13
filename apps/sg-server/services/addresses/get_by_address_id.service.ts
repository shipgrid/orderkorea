import Address from '../../models/address';
import logger from '../../models/logger'

export default async ({
  address_id
}) => {
  try {
    const address = await Address.query().findById(address_id);
    return address;
  } catch(e) {
    logger.error('Error getting address by address_id', e);
    throw e
  }
}
