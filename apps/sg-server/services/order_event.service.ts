import OrderEvent from '../models/order_event';
import KnexClient from '../models/knex_client';
import logger from '../models/logger'

const getOrderEventByOrderId = async ({}) => {

  try {
    const orderEvents = await OrderEvent.query();
    return orderEvents;
  } catch(e) {
    logger.error('Error getting user by username:', e);
    throw e
  }
}

const createOrderEvent = async ({
  order_id,
  name,
}) => {
  try {

    let createdOrderEvent;

    await KnexClient.transaction(async (trx) => {

      const newOrderEvent = {
        order_id,
        name,
      };

      const orderEvent = await OrderEvent.query(trx).insert(newOrderEvent);
      createdOrderEvent = orderEvent;
    });

    return createdOrderEvent;
  } catch(e) {
    logger.error('Error creating orderEvent:', e);
    throw e
  }
}

const deleteOrderEvent = async ({
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

export {
  getOrderEventByOrderId,
  createOrderEvent,
  deleteOrderEvent
}