// Initializes the `deals` service on path `/deals`
const createService = require('feathers-mongoose');
const createModel = require('../../models/deals.model');
const hooks = require('./deals.hooks');
const filters = require('./deals.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'deals',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/deals', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('deals');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
