import {
  Logger,
  Order,
} from '../../models'

export default async ({
  customer_id
}) => {
  try {
    const orders = await Order
      .query()
      .withGraphFetched('orderEvents')
      .withGraphFetched('thirdParties.[address]')
      .withGraphFetched('documents')
      .withGraphFetched('vehicles.[images]')
      .where('customer_id', customer_id)
      
    return orders;
  } catch(e) {
    Logger.error('Error getting orders:', e);
    throw e
  }
}