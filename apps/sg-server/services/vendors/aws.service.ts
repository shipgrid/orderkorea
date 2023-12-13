import AWS from 'aws-sdk';
import axios from 'axios';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS, 
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const getPresignedUrls = async ({ file }) => {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', {
      Bucket: process.env.S3_STATIC_BUCKET,
      ContentType: file.mimetype, 
      Key: file.originalname
    }, (err, url) => {
      if (err) {
        reject(err)
      } else {
        resolve({ url, key: file.originalname })
      }
    });
  });
};

const uploadFileToS3 = async ({ file }) => {
  const presignedUrls: any = await getPresignedUrls({ file });
  const url = presignedUrls.url;

  const response = await axios.put(url, file.buffer, { 
    headers: {
      'Content-Type': file.mimetype 
    }
  });

  return response;
};

export { 
  getPresignedUrls, 
  uploadFileToS3 
};
