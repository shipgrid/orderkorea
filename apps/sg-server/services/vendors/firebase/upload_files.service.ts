import { 
  getDownloadURL 
} from 'firebase-admin/storage'

import admin from 'firebase-admin'

import {
  IServiceResponse
} from '../../../types'

export default async ({
  file,
  destination,
  filename,
}): Promise<IServiceResponse<{ file_url: string }>> => {

  return new Promise(async (resolve, reject) => {
    try {
      const bucket = admin.storage().bucket();
      const fileRef = bucket.file(`${destination}/${filename}`);
      
      await fileRef.save(file.buffer);
  
      const downloadUrl = await getDownloadURL(fileRef);
  
      resolve({
        success: true, 
        data: {
          file_url: downloadUrl,
        },
      });
  
    } catch(e) {
      reject(e)
    }
  })
}