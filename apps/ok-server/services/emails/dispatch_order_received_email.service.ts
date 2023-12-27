import dispatch_sendgrid_template_email from '../vendors/sendgrid/dispatch_sendgrid_template_email'
import {
  STAFF_NAME,
  STAFF_POSITION
} from '../../data/constants'

const FROM_EMAIL = process.env.FROM_EMAIL;
const TEMPLATE_ID = process.env.SENDGRID_ORDER_RECEIVED_TEMPLATE_ID;

export default async ({
  customer,
  order,
  sku
}) => {    

  const { first_name, email } = customer.user;
  const { order_id } = order;
  const { product_url, name } = sku;
    
  const sendgrid_template_email = {
    from: { email: FROM_EMAIL, fromname: `${STAFF_NAME} from OrderKorea` },
    personalizations: [
      {
        to: [{ email }],
        dynamic_template_data: {
          subject: `We've Got Your Order! (${name})`,
          customer_name: first_name,
          order_id,
          product_url,
          product_name: name,
          staff_name: STAFF_NAME,
          staff_position: STAFF_POSITION
        }
      }
    ],
    template_id: TEMPLATE_ID
  };

  const dispatch_response = await dispatch_sendgrid_template_email({ sendgrid_template_email });

  return dispatch_response;
}

