import Order from '../models/order';
import KnexClient from '../models/knex_client';
import logger from '../models/logger'

const getOrders = async ({}) => {
  try {
    const orders = await Order.query();
    return orders;
  } catch(e) {
    logger.error('Error getting orders:', e);
    throw e
  }
}

const getOrderById = async ({
  order_id
}) => {

  try {
    const order = await Order.query().findById(order_id);
    return order;

  } catch(e) {
    logger.error('Error getting order by order_id', e);
    throw e
  }
}

const createOrder = async ({
  vehicle_id,
  customer_id,
}) => {
  try {

    let createdOrder;

    await KnexClient.transaction(async (trx) => {

      const newOrder = {
        vehicle_id,
        customer_id,
      };

      const order = await Order.query(trx).insert(newOrder);
      createdOrder = order;
    });

    return createdOrder;
  } catch(e) {
    logger.error('Error creating order:', e);
    throw e
  }
}

const deleteOrder = async ({  
  order_id
}) => {
  try {

    await KnexClient.transaction(async (trx) => {

      const order = await Order.query(trx).deleteById(order_id);
    });

    return;
  } catch(e) {
    logger.error('Error deleting order:', e);
    throw e
  }
}

export {
  getOrders,
  createOrder,
  deleteOrder,
  getOrderById
}