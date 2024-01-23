import { IServiceResponse } from '../../../types';

const stripe = require('stripe')('sk_test_51NsSbzEVtcyiI2IC1PxYgzn9klz9ZwH50xEhHAD28lmjM5GtJt5xIVzNHuqZ14KoXZY6rkG5z3yNKrL1AfkewR7z00vpSSQzLB', {
  apiVersion: '2023-10-16',
});

interface ILineItem {
  amount: number; 
  name: string;
  description: string | null;
}

export default async ({
  line_items,
  customer_id,
  vehicle_id
}: { 
  line_items: ILineItem[];
  customer_id: string; 
  vehicle_id: string;
}): Promise<IServiceResponse<{
  client_secret: string
}>> => {
  return new Promise(async (resolve, reject) => {
    try {

      const products = await Promise.all(line_items.map(async (line_item) => {

        const product = {
          name: line_item.name,
        }

        if(line_item.description) {
          product['description'] = line_item.description
        }

        return {
          product: await stripe.products.create(product),
          amount: line_item.amount
        }
      }));

      const prices = await Promise.all(products.map(async (product) => {
        return await stripe.prices.create({
          unit_amount: Math.round(product.amount * 100 * 100) / 100,
          currency: 'USD',
          product: product.product.id,
        });
      }));

      const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: prices.map(item => ({
          price: item.id,
          quantity: 1,
        })),
        mode: 'payment',
        payment_intent_data:{
          capture_method: 'automatic',
          setup_future_usage: 'on_session',
        },
        return_url: `https://shipgrid.io/#/return?session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
          customer_id,
          vehicle_id
        }
      });

      resolve({
        success: true, 
        data: {
          client_secret: session.client_secret
        },
      });
  
    } catch(e) {
      reject(e)
    }
  })
}


