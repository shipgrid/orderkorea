import {
  Logger,
  Vehicle
} from '../../models'

import {
  IServiceResponse
} from '../../types'

import {
  create_checkout_session
} from '../vendors/stripe'

import User from '../../models/user'

declare global {
  namespace Express {
    interface Request {
      user?: User;
      params: {
        vehicle_id?: number;
        order_id?: number
      }
    }
  }
}

interface ILineItem {
  amount: number; 
  name: string;
  description: string | null;
}
 
export default async ({
  vehicle_id,
  user_id
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
          amount: vehicle.fees.deposit_fee,
          name: 'Vehicle Deposit',
          description: null
        }
      ];

      const {
        success,
        message,
        data
      } = await create_checkout_session({
        line_items: line_items,
        user_id,
        vehicle_id
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
      Logger.error('Error:', e);
      reject(e);
    }
  });
}
