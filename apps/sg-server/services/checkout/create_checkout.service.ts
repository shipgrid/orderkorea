import {
  User,
  Customer,
  KnexClient,
  Logger,
  Vehicle
} from '../../models'

import {
  IServiceResponse
} from '../../types'

import {
  create_checkout_session
} from '../vendors/stripe'

interface ILineItem {
  amount: number; 
  name: string;
  description: string | null;
}
 
export default async ({
  vehicle_id,
}): Promise<IServiceResponse<{
  client_secret: string
}>> => {
  
  return new Promise(async (resolve, reject) => {
    try {
      
      const vehicle:any = await Vehicle
        .query()
        .withGraphFetched('fees')
        .findById(vehicle_id);

      if(!vehicle) {
        return resolve({
          success: false, 
          message: 'Vehicle not found'
        });
      }

      if(vehicle.order_id) {
        return resolve({
          success: false, 
          message: 'Vehicle already purchased'
        });
      }

      const line_items: ILineItem[] = [
        {
          amount: vehicle.fees.service_fee,
          name: 'Service Fee',
          description: null
        },
        {
          amount: (vehicle.fees.vehicle_price * vehicle.fees.deposit_percentage*1),
          name: 'Vehicle Deposit',
          description: `Deposit is ${vehicle.fees.deposit_percentage*100}% of vehicle price and is fully refundable (terms & restrictions applies).`
        }
      ];

      const {
        success,
        message,
        data
      } = await create_checkout_session({
        line_items: line_items
      });

      if(!data) {
        return resolve({
          success: false, 
          message: 'Error creating checkout session'
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
          client_secret: data.client_secret
        }
      });
      
    } catch (e) {
      Logger.error('Error creating User and UserCustomer:', e);
      reject(e);
    }
  });
}
