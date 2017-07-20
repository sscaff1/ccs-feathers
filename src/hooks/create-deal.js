// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const jimp = require('jimp');

const getBase64 = photo =>
  new Promise(resolve => {
    photo.getBase64(jimp.MIME_JPEG, (err, uri) => resolve(uri));
  });

module.exports = function(options = {}) {
  // eslint-disable-line no-unused-vars
  return function(hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.data.photo) {
      return jimp
        .read(hook.data.photo)
        .then(photo => {
          photo.resize(600, jimp.AUTO).quality(80);
          return getBase64(photo).then(uri =>
            hook.app.service('uploads').create({ uri })
          );
        })
        .then(result => {
          hook.data = Object.assign({}, hook.data, {
            photo: `${hook.app.get('aws').imagePath}${result.id}`,
          });
          return hook;
        });
    }
    return Promise.resolve(hook);
  };
};
