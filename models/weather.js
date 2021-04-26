const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  time: { type: String, unique: true },
  city: { type: String },
  temp: { type: Number },
  temp_min: { type: Number },
  temp_max: { type: Number },
  feels_like: { type: Number },
  today_feels_like: { type: Number },
  pm10_status: { type: String },
  pm2_5_status: { type: String },
});

module.exports = mongoose.model('Weather', weatherSchema);
