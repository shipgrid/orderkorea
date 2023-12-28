import admin from 'firebase-admin'
import { getDownloadURL } from 'firebase-admin/storage'

export default async ({
  file,
  destination,
  filename,
}) => {
  try {
    const bucket = admin.storage().bucket();
    const fileRef = bucket.file(`${destination}/${filename}`);
    
    await fileRef.save(file.buffer);

    const downloadURL = await getDownloadURL(fileRef);

    return {
      success: true, 
      data: downloadURL,
    };

  } catch(e) {
    throw e;
  }
}