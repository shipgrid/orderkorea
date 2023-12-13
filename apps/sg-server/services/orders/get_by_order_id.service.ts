import {
  Logger,
  Order,
} from '../../models'

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
    Logger.error('Error getting order by order_id', e);
    throw e
  }
}
