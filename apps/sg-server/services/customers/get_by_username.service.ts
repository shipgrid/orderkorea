import {
  User,
} from '../../models'

import {
  IServiceResponse,
} from '../../types'

export default async ({
  username,
}):Promise<IServiceResponse<User>> => {

  return new Promise(async (resolve, reject) => {

    try {

      const user = await User.query()
        .withGraphFetched('customer')
        .where('username', username).first();


      if(!user) {
        resolve({
          success: false,
          message: 'User not found'
        })
      }

      resolve({
        success: true,
        data: user
      })
  
    } catch (error) {
      throw error;
    }

  })
}
