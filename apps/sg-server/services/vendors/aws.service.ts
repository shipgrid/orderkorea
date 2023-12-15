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
    const fileKey = file.originalname;
    s3.getSignedUrl('putObject', {
      Bucket: process.env.S3_STATIC_BUCKET,
      ContentType: file.mimetype, 
      Key: fileKey
    }, (err, url) => {
      if (err) {
        reject(err)
      } else {
        // Construct the URL to access the file
        const accessUrl = `https://${process.env.S3_STATIC_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
        resolve({ url, key: fileKey, accessUrl })
      }
    });
  });
};

const uploadFileToS3 = async ({ file }) => {
  const presignedUrls: any = await getPresignedUrls({ file });
  const uploadUrl = presignedUrls.url;
  const fileUrl = presignedUrls.accessUrl; 
  await axios.put(uploadUrl, file.buffer, { 
    headers: {
      'Content-Type': file.mimetype 
    }
  });

  return fileUrl 
};


export { 
  getPresignedUrls, 
  uploadFileToS3 
};
