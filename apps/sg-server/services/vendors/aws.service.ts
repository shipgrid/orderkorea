import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS, 
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION
})

const s3 = new AWS.S3()

const getPresignedUrls = async ({
  file
}) => {
  return new Promise((resolve, reject) => {
    try {

      const key = file.name

      s3.getSignedUrl('putObject', {
        Bucket: process.env.S3_STATIC_BUCKET,
        ContentType: 'jpeg',
        Key: key
      }, (err, url) => {
        if(err) {
          throw new Error('Get signed url error')
        }
        resolve({ url, key  })
      })
   
    } catch(e) {
      console.log('err:', e)
      reject(e)
    }
  }) 
}

export {
  getPresignedUrls
}