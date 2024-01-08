import {
  Address,
  Logger
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({

}): Promise<IServiceResponse<Address[]>> => {

  return new Promise(async (resolve, reject) => {

    try {

      const addresses = await Address.query();

      resolve({
        success: true,
        data: addresses
      })

    } catch(e) {
      Logger.error('Error getting user by username:', e);
      reject(e)
    }
  })
}