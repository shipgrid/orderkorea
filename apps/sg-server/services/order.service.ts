import AWS from 'aws-sdk'
import axios from 'axios'
import Order from '../models/order';
import Document from '../models/document';
import KnexClient from '../models/knex_client';
import logger from '../models/logger'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS, 
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION
})

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

const uploadDocument = async ({  
  order_id, 
  image_url,
  name 
}) => {
  try {

    if (!order_id) {
      throw new Error('No order id provided')
    }

    if (!image_url) {
      throw new Error('No image url provided')
    }

    if (!name) {
      throw new Error('No name provided')
    }

    const _upload_image_url_to_s3 = async ({ image_url, name }) => {  
      const _fetch_image = async ({ image_url }) => {
        const response = await axios({
          method: 'GET',
          url: image_url,
          responseType: 'arraybuffer'
        })
        return Buffer.from(response.data, 'binary')
      }
      
      const _upload_to_s3 = async ({ params }) => {
        const result = await s3.upload(params).promise()
        return result.Location
      }

      const s3_bucket = process.env.S3_DOCUMENT_STATIC_BUCKET
    
      if (!s3_bucket) {
        throw new Error('S3 bucket env variable missing.')
      }

      const image_buffer = await _fetch_image({ image_url })
    
      const s3_params = {
        Bucket: s3_bucket,
        Key: name, 
        Body: image_buffer,
        ContentType: 'image/png'
      }
      const s3_location = await _upload_to_s3({ params: s3_params })
    
      return s3_location
    }
    
    const s3 = new AWS.S3()

    const s3_url = await _upload_image_url_to_s3({ image_url, name })

    console.log('s3_url', s3_url)

    const newDocument = {
      order_id,
      document_url: s3_url
    }

    console.log('new document:', newDocument)
    let createdDocument; 

    await KnexClient.transaction(async (trx) => {

      const document = await Document.query(trx).insert(newDocument)

      createdDocument = document;
    });

    return createdDocument; 
  } catch(e) {
    logger.error('Error creating document:', e);
    throw e
  }
}

export {
  getOrders,
  createOrder,
  deleteOrder,
  getOrderById,
  uploadDocument
}