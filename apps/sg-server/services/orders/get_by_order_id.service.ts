import {
  Logger,
  Order,
} from '../../models'

export default async ({
  order_id,
  customer_id
}) => {

  try {
    const order = await Order
      .query()
      .withGraphFetched('orderEvents')
      .withGraphFetched('thirdParties.[address]')
      .withGraphFetched('documents')
      .withGraphFetched('vehicles.[images]')
      .modifyGraph('vehicles.[images]', builder => {
        builder.select('image_url');
      })
      .where('order_id', order_id)
      .where('customer_id', customer_id)

      if(!order.length) {
        throw new Error('Order not found')
      }

    return order[0];

  } catch(e) {
    Logger.error('Error getting order by order_id', e);
    throw e
  }
}
