// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function(options = {}) {
  return function(hook) {
    if (hook.params.provider) {
      // coming from the client
      if (hook.data.photo.startsWith('data:image/jpeg;base64')) {
        return hook.app
          .service('uploads')
          .create({ uri: hook.data.photo })
          .then(result => {
            hook.data = Object.assign({}, hook.data, {
              photo: `${hook.app.get('aws').imagePath}${result.id}`,
              signedDate: new Date(),
              signedWaiver: true,
            });
            return hook;
          });
      }
      hook.data = Object.assign({}, hook.data, {
        signedDate: new Date(),
      });
    }
    return Promise.resolve(hook);
  };
};
