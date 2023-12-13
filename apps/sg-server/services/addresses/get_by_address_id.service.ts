import {
  Address,
  Logger
} from '../../models'

export default async ({
  address_id
}) => {
  try {
    const address = await Address.query().findById(address_id);
    return address;
  } catch(e) {
    Logger.error('Error getting address by address_id', e);
    throw e
  }
}
