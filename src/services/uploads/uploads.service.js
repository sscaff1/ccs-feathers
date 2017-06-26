// Initializes the `uploads` service on path `/uploads`
const AWS = require('aws-sdk');
const S3BlobStore = require('s3-blob-store');
const BlobService = require('feathers-blob');
const hooks = require('./uploads.hooks');
const filters = require('./uploads.filters');

module.exports = function() {
  const app = this;

  const s3 = new AWS.S3({
    accessKeyId: app.get('aws').accessKeyId,
    secretAccessKey: app.get('aws').secretAccessKey,
  });

  // setup blob storage
  const blobStore = S3BlobStore({
    client: s3,
    bucket: app.get('aws').bucket,
  });

  const blobService = BlobService({
    Model: blobStore,
  });

  // Initialize our service with any options it requires
  app.use('/uploads', blobService);

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('uploads');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
