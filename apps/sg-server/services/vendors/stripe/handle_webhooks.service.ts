import { IServiceResponse } from '../../../types';
import {
  Reservation,
  KnexClient,
  Logger,
  Vehicle
} from '../../../models'

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

        if(!metadata.customer_id) {
          return resolve({
            success: false,
            message: 'Customer id not found'
          });
        }

        try {
          await KnexClient.transaction(async (trx) => {

            const {
              vehicle_id,
              customer_id
            } = metadata

            const foundVehicle:any = await Vehicle
              .query(trx)
              .withGraphFetched('reservation')
              .findById(parseInt(vehicle_id)); 
            
            if (!foundVehicle) {
              return resolve({
                success: false,
                message: 'Vehicle does not exist'
              });    
            }

            if(foundVehicle.reservation) {
              return resolve({
                success: false,
                message: 'Vehicle is already part of a reservation'
              });
            }
    
            const reservation:any = await Reservation.query(trx).insert({
              vehicle_id: parseInt(vehicle_id),
              customer_id: parseInt(customer_id),
            });
              
            await trx.commit();
    
            Logger.info('Reservation created:', reservation);
    
            resolve({
              success: true,
            });
          });
          
        } catch (e) {
          Logger.error('Error vehicle reservation:', e);
          reject(e);
        }
      }
  
    } catch(e) {
      reject(e)
    }
  })
}


