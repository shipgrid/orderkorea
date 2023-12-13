import Order from '../../models/order';
import logger from '../../models/logger'

export default async ({
  order_id
}) => {

  try {
    const order = await Order
      .query()
      .withGraphFetched('orderEvents')
      .findById(order_id);
    return order;

  } catch(e) {
    logger.error('Error getting order by order_id', e);
    throw e
  }
}
