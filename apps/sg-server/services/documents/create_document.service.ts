import {
  Document,
  KnexClient,
  Logger
} from '../../models'

import {
  firebase
} from '../index'

import {
  IServiceResponse
} from '../../types'

export default async ({
  order_id, 
  name,
  file,
}): Promise<IServiceResponse<Document>> => {

  return new Promise(async (resolve, reject) => {
    try {
    
      const {
        success,
        data
      } = await firebase.upload_files({
        file: file,
        destination: `orders/${order_id}`,
        filename: `${Date.now().toString()}_${name}`,
      })

      if (!success) {
        resolve({
          success: false,
          message: 'Error uploading file'
        })

        return;
      }
      
      if(!data) {

        resolve({
          success: false,
          message: 'Error uploading file'
        })

        return;
      }

      await KnexClient.transaction(async (trx) => {
  
        const newDocument = {
          order_id: parseInt(order_id), 
          name,
          file_url: data.downloadUrl,
        };
  
        const document = await Document.query(trx).insert(newDocument);

        resolve({
          success: true,
          data: document
        })
      });
        
    } catch(e) {
      Logger.error('Error creating Document:', e);
      reject(e)
    }
  })
}
