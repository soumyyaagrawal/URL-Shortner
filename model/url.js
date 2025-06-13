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
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    
  },



  log: [{
    timestamp:{type: Number}
  }],
}, { timestamps: true });

const url = mongoose.model('url', urlSchema);
module.exports = url;