const assert = require('assert');
const app = require('../../src/app');

describe('\'deals\' service', () => {
  it('registered the service', () => {
    const service = app.service('deals');

    assert.ok(service, 'Registered the service');
  });
});
