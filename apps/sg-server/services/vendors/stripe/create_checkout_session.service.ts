import { IServiceResponse } from '../../../types';

const stripe = require('stripe')('sk_test_Hrs6SAopgFPF0bZXSN3f6ELN', {
  apiVersion: '2023-10-16',
});

interface ILineItem {
  amount: number; 
  name: string;
  description: string | null;
}

export default async ({
  line_items
}: { 
  line_items: ILineItem[] 
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
        return_url: `https://shipgrid.io/return?session_id={CHECKOUT_SESSION_ID}`,
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


