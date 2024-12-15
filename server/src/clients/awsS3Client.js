const config = require('../../config.js');

const { S3Client } = require("@aws-sdk/client-s3");

const client = new S3Client({
  region: config.awsRegion,
  credentials: {
    accessKeyId: config.awsS3KeyId,
    secretAccessKey: config.awsS3AccessKey
  }
});

module.exports = client;
