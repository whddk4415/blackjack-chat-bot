const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, unique: true },
  conversation_id: { type: String },
  city: { type: String },
  daily_alarm: { type: Boolean },
  rain_alarm: { type: Boolean },
  dust_alarm: { type: Boolean },
});

module.exports = mongoose.model('User', userSchema);
