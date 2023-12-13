import OrderEvent from '../../models/order_event';
import logger from '../../models/logger'

export default async ({
  order_event_id
}) => {

  try {
    const deletedOrderEvent = await OrderEvent
      .query()
      .deleteById(order_event_id);
    return deletedOrderEvent;

  } catch(e) {
    logger.error('Error deleting orderEvent by order_event_id', e);
    throw e
  }
}