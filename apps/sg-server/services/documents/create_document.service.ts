import {
  Document,
  KnexClient,
  Logger
} from '../../models'

import {
  firebase
} from '../index'

export default async ({
  order_id, 
  name,
  file,
}) => {

  try {
    
    const {
      success,
      data
    } = await firebase.upload_files({
      file: file,
      destination: `orders/${order_id}`,
      filename: `${Date.now().toString()}_${name}`,
    })

    let document; 

    await KnexClient.transaction(async (trx) => {

      const newDocument = {
        order_id: parseInt(order_id), 
        name,
        file_url: data,
      };

      document = await Document.query(trx).insert(newDocument);
    });

    return document;
    
  } catch(e) {
    Logger.error('Error creating Document:', e);
    throw e
  }
}
