import {
  Logger,
  Order,
} from '../../models'

export default async ({}) => {
  try {
    const orders = await Order.query();
    return orders;
  } catch(e) {
    Logger.error('Error getting orders:', e);
    throw e
  }
}