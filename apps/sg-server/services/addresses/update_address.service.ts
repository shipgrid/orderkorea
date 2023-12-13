import Address from '../../models/address';
import KnexClient from '../../models/knex_client';
import logger from '../../models/logger'

export default async ({
  address_id,
  name,
  line1,
  line2,
  city,
  state_code,
  country_code,
  postal_code,
  email,
  phone,
  customer_id,
}) => {
  try {

    let updatedAddress;

    await KnexClient.transaction(async (trx) => {

      const newAddress = {
        name,
        line1,
        line2,
        city,
        state_code,
        country_code,
        postal_code,
        email,
        phone,
        customer_id,
      };

      const address = await Address.query(trx).update(newAddress).where('address_id', address_id);
      updatedAddress = address;
    });

    return updatedAddress;
  } catch(e) {
    logger.error('Error updating address:', e);
    throw e
  }
}