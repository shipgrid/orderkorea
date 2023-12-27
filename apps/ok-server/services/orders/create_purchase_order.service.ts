import Joi from 'joi'

import {
  Order, 
  OrderSku, 
  Sku, 
  KnexClient, 
  Logger,
  HttpError,
  Customer
} from '../../models'

import {
  customers,
  skus
} from '../../services'
import { dispatchOrderReceivedEmail, dispatchStaffNewOrderEmail } from '../emails';

interface ICreatePurchaseOrder {
  name: string;
  description: string;
  product_url: string;
  quantity: number;
  customer_id: number;
}

const createPurchaseOrder = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  product_url: Joi.string().required(),
  quantity: Joi.number().required(),
  customer_id: Joi.number().required(),
})

export default async ({
  name,
  description,
  product_url,
  quantity,
  customer_id
}: ICreatePurchaseOrder) => {

  const { error } = createPurchaseOrder.validate({
    name,
    description,
    product_url,
    quantity,
    customer_id
  })

  if (error) {
    throw new HttpError(400, error.details[0].message)
  }

  try {
    
    let order; 
  
    await KnexClient.transaction(async (trx) => {

      const customer = await customers.getByCustomerId({ customer_id });

      console.log('customer', customer)
      
      if (!customer) {
        throw new HttpError(400, 'Customer does not exist');
      }

      const newOrder = {
        type: 'purchase',
        customer_id: customer_id
      };

      order = await Order.query(trx).insert(newOrder);
      
      if(!order) {
        throw new HttpError(500, 'Error creating order');
      }

      const newSku = {
        sku_id: name,
        name,
        description,
        product_url
      }

      let sku = await skus.getSkuById({ sku_id: name })

      if (!sku) { 
        sku = await Sku.query(trx).insert(newSku) as Sku
      }

      if(!sku) {
        throw new HttpError(500, 'Error creating sku');
      }

      const newOrderSku = {
        sku_id: sku.sku_id,
        order_id: order.order_id,
        quantity: quantity,
      };

      const orderSku = await OrderSku.query(trx).insert(newOrderSku);

      if(!orderSku) {
        throw new HttpError(500, 'Error creating order sku');
      }

      await dispatchStaffNewOrderEmail({
        customer, 
        order, 
        sku
      })

      await dispatchOrderReceivedEmail({
        customer, 
        order, 
        sku
      })

      await trx.commit();

      Logger.info('Purchase Order Created', order, orderSku, sku);
    })
    
    return order
  } catch(e) {
    // Logger.error('Error creating Order and OrderSku:', e);
    throw e
  }
}

