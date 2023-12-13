import {
  Logger,
  KnexClient,
  OrderEvent
} from '../../models'

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
    Logger.error('Error creating orderEvent:', e);
    throw e
  }
}
