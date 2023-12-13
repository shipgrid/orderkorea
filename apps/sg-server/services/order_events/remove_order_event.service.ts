import {
  Logger,
  OrderEvent
} from '../../models'

export default async ({
  order_event_id
}) => {

  try {
    const deletedOrderEvent = await OrderEvent
      .query()
      .deleteById(order_event_id);
    return deletedOrderEvent;

  } catch(e) {
    Logger.error('Error deleting orderEvent by order_event_id', e);
    throw e
  }
}