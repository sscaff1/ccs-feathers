const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const createUser = require('../../hooks/create-user');
const updateUser = require('../../hooks/update-user');

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id',
  }),
];

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [...restrict],
    create: [createUser()],
    update: [...restrict],
    patch: [...restrict, updateUser()],
    remove: [...restrict],
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      ),
    ],
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
