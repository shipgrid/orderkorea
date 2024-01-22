import {
  Logger,
} from '../../models'

import {
  IServiceResponse
} from '../../types'

import {
  retrieve_checkout_session
} from '../vendors/stripe'

export default async ({
  session_id,
}): Promise<IServiceResponse<{
  status: string;
  customer_email: string;
}>> => {
  
  return new Promise(async (resolve, reject) => {
    try {
  
      const {
        success,
        message,
        data
      } = await retrieve_checkout_session({
        session_id: session_id
      });

      if(!data) {
        return resolve({
          success: false, 
          message: 'Error getting checkout session'
        });
      }

      if(!success) {
        return resolve({
          success: false, 
          message: message
        });
      }

      resolve({
        success: true, 
        data: {
          status: data.status,
          customer_email: data.customer_email
        }
      });
      
    } catch (e) {
      Logger.error('Error:', e);
      reject(e);
    }
  });
}
