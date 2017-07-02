// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function(options = {}) {
  // eslint-disable-line no-unused-vars
  return function(hook) {
    const { facebook, facebookId } = hook.data;
    return this.find({ facebookId }).then(user => {
      if (user.data.length < 1) {
        const { profile } = facebook;
        const { name, gender } = profile;
        const email = profile.emails[0].value;
        hook.data = Object.assign(
          {},
          {
            firstName: name.givenName,
            lastName: name.familyName,
            facebookId,
            email,
            gender,
          }
        );
      }
      return hook;
    });
  };
};
