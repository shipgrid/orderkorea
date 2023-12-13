import Order from '../../models/order';
import logger from '../../models/logger'

export default async ({}) => {
  try {
    const orders = await Order.query();
    return orders;
  } catch(e) {
    logger.error('Error getting orders:', e);
    throw e
  }
}