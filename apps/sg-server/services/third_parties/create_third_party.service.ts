import {
  Logger,
  ThirdParty,
  KnexClient
} from '../../models'

import {
  Address
} from '../../models'

export default async ({
  order_id,
  type,
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

    let createdThirdParty;
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
      };

      const address = await Address.query(trx).insert(newAddress);
      createdAddress = address;

      const thirdParty = await ThirdParty.query(trx).insert({
        address_id: createdAddress.address_id,
        type,
        order_id,
      });
      
      createdThirdParty = thirdParty;
    });

    return createdThirdParty;
    
  } catch(e) {
    Logger.error('Error creating order:', e);
    throw e
  }
}
