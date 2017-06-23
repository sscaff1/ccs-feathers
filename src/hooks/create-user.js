// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function(options = {}) {
  // eslint-disable-line no-unused-vars
  return function(hook) {
    const { facebook } = hook.data;
    const { facebookId } = facebook;
    const { profile } = facebook;
    const { displayName: name, gender } = profile;
    const email = profile.emails[0].value;
    hook.data = Object.assign(
      {},
      {
        name,
        facebookId,
        email,
        gender,
      }
    );
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
