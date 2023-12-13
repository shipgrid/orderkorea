import Address from '../../models/address';
import KnexClient from '../../models/knex_client';
import logger from '../../models/logger'

export default async ({
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

    let createdAddress;

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

      const address = await Address.query(trx).insert(newAddress);
      createdAddress = address;
    });

    return createdAddress;
  } catch(e) {
    logger.error('Error creating address:', e);
    throw e
  }
}