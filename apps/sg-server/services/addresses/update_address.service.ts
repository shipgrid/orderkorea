import {
  Address,
  Logger,
  KnexClient
} from '../../models'

import {
  IServiceResponse
} from '../../types'

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
}): Promise<IServiceResponse<{}>> => {

  return new Promise(async (resolve, reject) => {
    try {

  
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

        resolve({
          success: true, 
          data: address
        })
      });
  
    } catch(e) {
      Logger.error('Error updating address:', e);
      reject(e)
    }
  })
}