// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    facebookId: { type: String },
    photo: { type: String },
    gender: { type: String, enum: ['male', 'female'] },
    phone: { type: String },
    dob: { type: Date },
    teams: [String],
    signedDate: { type: Date },
    isAdmin: { type: Boolean, default: false },
    signedWaiver: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  return mongooseClient.model('users', users);
};
