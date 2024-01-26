import { IServiceResponse } from '../../../types';

const stripe = require('stripe')('sk_test_51NsSbzEVtcyiI2IC1PxYgzn9klz9ZwH50xEhHAD28lmjM5GtJt5xIVzNHuqZ14KoXZY6rkG5z3yNKrL1AfkewR7z00vpSSQzLB', {
  apiVersion: '2023-10-16',
});

export default async ({
  payload
}: any): Promise<IServiceResponse<{
}>> => {
  return new Promise(async (resolve, reject) => {
    try {

      if(payload.type === 'checkout.session.completed') {
        const event = payload.data.object;

        const {
          metadata
        } = event

        if(!metadata.vehicle_id) {
          return resolve({
            success: false,
            message: 'Vehicle id not found'
          });
        }

        if(!metadata.user_id) {
          return resolve({
            success: false,
            message: 'User not found'
          });
        }

        resolve({
          success: true,
        });
      }
  
    } catch(e) {
      reject(e)
    }
  })
}


