require('dotenv').config()

let config = {

  port: parseInt(process.env.PORT, 10),

  awsRegion: process.env.AWS_REGION,

  awsS3KeyId: process.env.AWS_S3_ACCESS_KEY,
  awsS3AccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,

  openSearchUsername : process.env.OPENSEARCH_USERNAME,
  openSearchPassword : process.env.OPENSEARCH_PASSWORD,
  openSearchEndpoint : process.env.OPENSEARCH_ENDPOINT,

};

module.exports = config;
