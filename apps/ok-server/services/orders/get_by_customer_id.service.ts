import Joi from 'joi'

import {
  Logger, 
  Order,
  HttpError
} from '../../models'

const getOrdersByCustomerIdSchema = Joi.object({
  customer_id: Joi.string().required()
})


export default async ({
  customer_id
}) => {

  try {

    const { error } = getOrdersByCustomerIdSchema.validate({ customer_id });
    
    if (error) {
      throw new HttpError(400, error.details[0].message);
    }

    const ordersWithSKUs = await Order.query()
    .where('customer_id', customer_id)
    .withGraphFetched('[skus, order_sku]');
    
    return ordersWithSKUs
  } catch(e) {
    Logger.error('Error getting order:', e);
    throw e;
  }
}