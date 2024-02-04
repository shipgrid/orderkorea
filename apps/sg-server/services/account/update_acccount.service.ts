import {
  Logger,
  User
} from '../../models'

import {
  IServiceResponse
} from '../../types'

interface IUpdateUser {
  user_id: string;
  first_name: string;
  last_name: string;
}

export default async ({
  user_id,
  first_name,
  last_name,
}: IUpdateUser): Promise<IServiceResponse<{}>> => {
  
  return new Promise(async (resolve, reject) => {
    try {

      const affectedRows = await User.query().patch({
        first_name,
        last_name
      }).where('user_id', user_id)

      if(affectedRows <= 0) {
        return resolve({
          success: false,
          message: 'Failed to update account'
        })
      }
     
      return resolve({
        success: true
      })
  
    } catch(e) {
      Logger.error('Error:', e);
      throw e
    }
  })
}
