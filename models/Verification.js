const { model, Schema } = require('mongoose');

const verificationSchema = new Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
  _userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = model('Verification', verificationSchema);
