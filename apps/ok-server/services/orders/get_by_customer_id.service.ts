import {
  Logger, 
  Order,
  HttpError
} from '../../models'

export default async ({
  customer_id
}) => {

  try {

    if (!customer_id) {
      throw new HttpError(400, 'Customer id is required')
    }

    const ordersWithSKUs = await Order.query()
    .where('customer_id', customer_id)
    .withGraphFetched('[skus, order_sku]');
    
    return ordersWithSKUs
  } catch(e) {
    Logger.error('Error getting order:', e);
    throw e;
  }
}