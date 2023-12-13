import {
  Logger,
  Order,
  KnexClient
} from '../../models'

export default async ({  
  order_id
}) => {
  try {

    await KnexClient.transaction(async (trx) => {
      const order = await Order.query(trx).deleteById(order_id);
    });

    return;
  } catch(e) {
    Logger.error('Error deleting order:', e);
    throw e
  }
}