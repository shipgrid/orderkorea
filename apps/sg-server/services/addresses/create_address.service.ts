import {
  Address
} from '../../models'

import {
  IServiceResponse
} from '../../types'

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
}): Promise<IServiceResponse<Address>> => {

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

        trx.commit();

        resolve({
          success: true,
          data: address
        })
      });

    } catch(e) {
      logger.error('Error creating address:', e);
      reject(e)
    }
  })
}