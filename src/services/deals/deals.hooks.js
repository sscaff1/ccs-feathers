const { authenticate } = require('feathers-authentication').hooks;
const { iff, disallow } = require('feathers-hooks-common');

const isNotAdmin = () => hook => !hook.params.user.isAdmin;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [disallow()],
    create: [iff(isNotAdmin(), disallow())],
    update: [disallow()],
    patch: [disallow()],
    remove: [iff(isNotAdmin(), disallow())],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
