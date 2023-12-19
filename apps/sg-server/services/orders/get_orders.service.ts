import {
  Logger,
  Order,
} from '../../models'

export default async ({}) => {
  try {
    const orders = await Order
      .query()
      .withGraphFetched('orderEvents')
      .withGraphFetched('thirdParties.[address]')
      .withGraphFetched('documents')
      .withGraphFetched('vehicles.[images]')

    return orders;
  } catch(e) {
    Logger.error('Error getting orders:', e);
    throw e
  }
}