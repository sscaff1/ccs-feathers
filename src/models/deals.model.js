// deals-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const deals = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    photo: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  return mongooseClient.model('deals', deals);
};
