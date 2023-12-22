import {
  Order, 
  OrderSku, 
  Sku, 
  KnexClient, 
  Logger,
  HttpError
} from '../../models'

interface ICreatePurchaseOrder {
  sku_id: string;  
  name: string;
  description: string;
  unit_price: number;
  product_url: string;
  quantity: number;
  type: string;
  customer_id: number;
}

export default async ({
  sku_id, 
  name,
  description,
  unit_price,
  product_url,
  quantity,
  type,
  customer_id
}: ICreatePurchaseOrder) => {

  if (!sku_id) {
    throw new HttpError(400, 'Sku id is required')
  }

  if (!name) {
    throw new HttpError(400, 'Name is required')
  }

  if (!description) {
    throw new HttpError(400, 'Description is required')
  }

  if (!unit_price) {
    throw new HttpError(400, 'Unit price is required')
  }

  if (!product_url) {
    throw new HttpError(400, 'Product url is required')
  }

  if (!quantity) {
    throw new HttpError(400, 'Quantity is required')
  }

  if (!type) {
    throw new HttpError(400, 'Type is required')
  }

  if (!customer_id) {
    throw new HttpError(400, 'Customer id is required')
  }

  let order; 

  try {
    await KnexClient.transaction(async (trx) => {

      const newOrder = {
        type: type,
        customer_id: customer_id,
      };

      order = await Order.query(trx).insert(newOrder);
      
      if(!order) {
        throw new Error('Error creating order');
      }

      const newSku = {
        sku_id: sku_id, 
        name: name,
        description: description,
        unit_price: unit_price,
        product_url: product_url,
      }

      const sku = await Sku.query(trx).insert(newSku)

      if(!sku) {
        throw new Error('Error creating sku');
      }

      const newOrderSku = {
        sku_id: sku.sku_id,
        order_id: order.order_id,
        quantity: quantity,
      };

      const orderSku = await OrderSku.query(trx).insert(newOrderSku);

      await trx.commit();

      Logger.info('Order and OrderSku created:', order, orderSku);
    })
    
    return order
  } catch(e) {
    Logger.error('Error creating Order and OrderSku:', e);
    throw e
  }
}

