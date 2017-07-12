// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    if (!hook.params.provider) {// || !hook.params.user.isAdmin) {
      return Promise.resolve(hook);
    }
    hook.params.paginate = false;
    return Promise.resolve(hook);
  };
};
