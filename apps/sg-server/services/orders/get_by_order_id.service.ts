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
      .withGraphFetched('thirdParties.[address]')
      .withGraphFetched('documents')
      .withGraphFetched('vehicles.[images]')
      .modifyGraph('vehicles.[images]', builder => {
        builder.select('image_url');
      })
      .findById(order_id);
    return order;

  } catch(e) {
    Logger.error('Error getting order by order_id', e);
    throw e
  }
}
