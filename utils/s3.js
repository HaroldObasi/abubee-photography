const S3 = require('aws-sdk/clients/s3')
require('dotenv').config()

const bucketName = process.env.AWS_BUCKETNAME
const bucketRegion = process.env.AWS_REGION
const bucketAccesssKey = process.env.AWS_BUCKET_ACCESSKEY
const bucketSecretKey = process.env.AWS_BUCKET_SECRETKEY

const s3 = new S3({
    bucketRegion, 
    bucketAccesssKey, 
    bucketSecretKey
})