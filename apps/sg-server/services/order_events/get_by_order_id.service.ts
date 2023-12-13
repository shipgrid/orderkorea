import OrderEvent from '../../models/order_event';
import logger from '../../models/logger'

export default async ({}) => {

  try {
    const orderEvents = await OrderEvent.query();
    return orderEvents;
  } catch(e) {
    logger.error('Error getting user by username:', e);
    throw e
  }
}