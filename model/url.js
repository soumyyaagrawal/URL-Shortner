const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  RedirectUrl: {
    type: String,
    required: true,
    unique: true,
  },
  log: [{
    timestamp:{type: Number}
  }],
}, { timestamps: true });

const url = mongoose.model('url', urlSchema);
module.exports = url;