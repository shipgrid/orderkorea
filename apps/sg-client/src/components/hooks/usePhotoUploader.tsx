import axios from 'axios';
import agent from '../../api/agent';

interface PhotoUploader {
  uploadDocument: (options: { name: string; file: string; type: string }) => Promise<string>;
  uploadPhoto: (options: { name: string; file: string; type: string }) => Promise<string>;
}

const usePhotoUploader = (): PhotoUploader => {
  const uploadDocument = async ({ name, file, type }: { name: string; file: string; type: string }): Promise<string> => {
    const photo_url = await uploadPhoto({ name, file, type });
    console.log('photo url', photo_url);
    return photo_url;
  };

  const uploadPhoto = async ({ name, file, type }: { name: string; file: string; type: string }): Promise<string> => {
    const s3StaticBucketUrl = import.meta.env.VITE_S3_STATIC_BUCKET_URL;
  
    if (!s3StaticBucketUrl) {
      throw new Error('S3_STATIC_BUCKET_URL is not defined');
    }
  
    const presignedUrlResp = await _getPreSignedUrl({ name, type });
  
    let instance = axios.create();
    delete instance.defaults.headers['Authorization'];
  
    const blob = _base64ToBlob(file, type);
    
    const presignedUrl = presignedUrlResp.data.url
    const response = await instance.put(presignedUrl, blob, {
      headers: {
        'Content-Type': type,
      },
    });

    console.log('response', response)
  
    let url = s3StaticBucketUrl + presignedUrlResp.data.key;
  
    return url;
  };
  
  const _base64ToBlob = (base64: any, type: any) => {
    const binaryString = window.atob(base64.split(',')[1]);
    const bytes = new Uint8Array(binaryString.length);
  
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    return new Blob([bytes], { type });
  };
  

  const _getPreSignedUrl = async ({ name, type }: { name: string; type: string }): Promise<any> => {
    const response = await agent.system.getPresignedUrls({
      file: {
        name: name,
        type: type,
      },
    });

    return response.data;
  };

  return {
    uploadDocument,
    uploadPhoto,
  };
};

export default usePhotoUploader;
