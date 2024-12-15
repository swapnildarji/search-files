const { Client } = require('@opensearch-project/opensearch');
const config = require('../../config.js');


const client = new Client({
  node: config.openSearchEndpoint,
  auth: {
    username: config.openSearchUsername,
    password: config.openSearchPassword
  }
});

module.exports = client;
