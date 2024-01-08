import {
  Address,
  Logger
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  address_id
}): Promise<IServiceResponse<Address>> => {

  return new Promise(async (resolve, reject) => {
    try {

      const address = await Address.query().findById(address_id);

      resolve({
        success: true,
        data: address
      })

    } catch(e) {
      Logger.error('Error getting address by address_id:', e);
      reject(e)
    }
  })
}
