const WeatherModel = require('../models/weather');

// 상세 조회(하나만)
const detail = async (time, city) => {
  try {
    return await WeatherModel.findOne({ time, city });
  } catch (e) {
    console.error(e);
  }
};

// 등록
const create = async (data) => {
  try {
    const {
      time,
      city,
      temp,
      temp_min,
      temp_max,
      feels_like,
      today_feels_like,
      pm10_status,
      pm2_5_status,
      is_rainy,
    } = data;
    const weather = new WeatherModel({
      time,
      city,
      temp,
      temp_min,
      temp_max,
      feels_like,
      today_feels_like,
      pm10_status,
      pm2_5_status,
      is_rainy,
    });
    const output = await weather.save();
    return output;
  } catch (e) {
    console.error(e);
  }
};

module.exports.detail = detail;
module.exports.create = create;
