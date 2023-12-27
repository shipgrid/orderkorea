import { STAFF_NAME, STAFF_POSITION } from '../../data/constants';
import dispatch_sendgrid_template_email from '../vendors/sendgrid/dispatch_sendgrid_template_email'

const FROM_EMAIL = process.env.FROM_EMAIL;
const TEMPLATE_ID = process.env.SENDGRID_STAFF_NEW_ORDER_TEMPLATE_ID;

export default async ({
  customer,
  order,
  sku
}) => {    
  try {
    const { customer_id, email } = customer.user;
    const { order_id } = order;
    const { product_url, description } = sku;
  
    const sendgrid_template_email = {
      from: { email: FROM_EMAIL },
      personalizations: [
        {
          to: [{ email: FROM_EMAIL }],
          dynamic_template_data: {
            subject: `New Order (#${order_id})`,
            order_id,
            customer_id,
            customer_email: email,
            product_url,
            description,
            staff_name: STAFF_NAME,
            staff_position: STAFF_POSITION
          }
        }
      ],
      template_id: TEMPLATE_ID, 
    };
  
    const dispatch_response = await dispatch_sendgrid_template_email({ sendgrid_template_email });
  
    return dispatch_response;
  } catch (e) {
    console.log('err123!!', e)
    throw e
  }
}

