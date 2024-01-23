import { IServiceResponse } from '../../../types';

const stripe = require('stripe')('sk_test_51NsSbzEVtcyiI2IC1PxYgzn9klz9ZwH50xEhHAD28lmjM5GtJt5xIVzNHuqZ14KoXZY6rkG5z3yNKrL1AfkewR7z00vpSSQzLB', {
  apiVersion: '2023-10-16',
});

export default async ({
  session_id
}: { 
  session_id: string; 
}): Promise<IServiceResponse<{
  status: string
  customer_email: string
}>> => {
  return new Promise(async (resolve, reject) => {
    try {

      const session = await stripe.checkout.sessions.retrieve(session_id);
      
      resolve({
        success: true, 
        data: {
          status: session.status,
          customer_email: session.customer_details.email
        },
      });
  
    } catch(e) {
      console.log('tag', e)
      reject(e)
    }
  })
}


