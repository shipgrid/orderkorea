import {
  Order, 
  OrderSku, 
  Sku, 
  KnexClient, 
  Logger
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
