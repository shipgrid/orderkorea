import OrderEvent from '../../models/order_event';
import KnexClient from '../../models/knex_client';
import logger from '../../models/logger'

export default async ({
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
