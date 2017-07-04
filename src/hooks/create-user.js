// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) {
  // eslint-disable-line no-unused-vars
  return function (hook) {
    const { facebook, facebookId } = hook.data;
    return this.find({ query: { facebookId } }).then(user => {
      if (user.data.length < 1) {
        const { profile } = facebook;
        const { name, gender, emails } = profile;
        const email = emails && emails.length && emails[0].value || undefined;
        hook.data = Object.assign(
          {},
          {
            firstName: name && name.givenName || undefined,
            lastName: name && name.familyName || undefined,
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
