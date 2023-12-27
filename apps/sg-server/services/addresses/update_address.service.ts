import {
  Address,
  Logger,
  KnexClient
} from '../../models'

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
      };

      const address = await Address.query(trx).update(newAddress).where('address_id', address_id);
      updatedAddress = address;
    });

    return updatedAddress;
  } catch(e) {
    Logger.error('Error updating address:', e);
    throw e
  }
}