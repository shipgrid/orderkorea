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
  
        const thirdParty = await ThirdParty.query(trx).insert({
          address_id: address.address_id,
          type,
          order_id,
        });
        
        resolve({
          success: true, 
          data: thirdParty
        })
      });
        
    } catch(e) {
      Logger.error('Error creating order:', e);
      reject(e)
    }
  })  
}
