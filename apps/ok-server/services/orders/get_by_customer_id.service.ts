import {
  Logger, 
  Order 
} from '../../models'

export default async ({
  customer_id
}) => {

  try {

    const ordersWithSKUs = await Order.query().where('customer_id', customer_id).withGraphFetched('skus');
    console.log('orderswithSkus', ordersWithSKUs)
    
    return ordersWithSKUs
  } catch(e) {
    Logger.error('Error getting order:', e);
    throw e;
  }
}