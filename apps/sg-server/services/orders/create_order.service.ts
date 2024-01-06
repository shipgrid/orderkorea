import {
  Logger,
  User,
  Order,
  Address,
  ThirdPartyAddress,
  KnexClient
} from '../../models'

export default async ({
  email,
  shipment_type,
  port_of_loading,
  container_number,
  port_of_arrival,
  loaded_on,
  thirdParties,
  documents,
  vehicles
}) => {
  try {

    let createdOrder;

    await KnexClient.transaction(async (trx) => {

      const user:any = await User
        .query(trx)
        .withGraphFetched('customer')
        .where('username', email).first();

      if(!user) {
        throw new Error('User not found');
      }

      const newOrder = {
        customer_id: user.customer?.customer_id,
        shipment_type,
        port_of_loading,
        container_number,
        port_of_arrival,
        loaded_on,
        thirdParties,
        documents,
        vehicles,
        orderEvents: [
          {
            name: 'ORDER_CREATED',
          }
        ]
      };

      const order = await Order.query(trx).upsertGraph(newOrder, { relate: true });
      createdOrder = order;
    });

    return createdOrder;
  } catch(e) {
    Logger.error('Error creating order:', e);
    throw e
  }
}
