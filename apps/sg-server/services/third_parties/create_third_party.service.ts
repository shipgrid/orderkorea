import {
  Logger,
  ThirdParty,
  KnexClient
} from '../../models'

import {
  Address
} from '../../models'

import {
  IServiceResponse
} from '../../types'

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
}): Promise<IServiceResponse<ThirdParty>> => {

  return new Promise(async (resolve, reject) => {
    try {
  
      await KnexClient.transaction(async (trx) => {
  
        const thirdParty = await ThirdParty.query(trx).insert({
          type,
          order_id,
        });

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
          third_party_id: thirdParty.third_party_id
        };
  
        await Address.query(trx).insert(newAddress);

        resolve({
          success: true, 
          data: thirdParty
        })
      });
        
    } catch(e) {
      Logger.error('Error:', e);
      reject(e)
    }
  })  
}
