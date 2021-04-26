const { getUserList } = require('../../libs/kakaoWork/users');
const { detail, create } = require('../../controller/users');
const {
  detail: weatherDetail,
  create: weatherCreate,
} = require('../../controller/weathers');
const dateFormat = require('dateformat');
const { getWeather, getCityData } = require('../../libs/weather');

exports.initUsers = async (userId, conversationId) => {
  if (!(await detail({ user_id: userId }))) {
    create({
      user_id: userId,
      rain_alarm: false,
      dust_alarm: false,
      daily_alarm: false,
      city: null, 
      conversation_id: conversationId,
    });
  }
};

const initWeather = async () => {
  const currentTime = dateFormat(new Date(), 'yyyy-mm-dd HH');
  const cityData = getCityData();
  for (const { kor: city } of cityData) {
    if (!(await weatherDetail(currentTime, city))) {
      const weather = await getWeather(city);
      console.log(city, weather);
      weather.time = currentTime;
      weather.city = city;
      weatherCreate(weather);
    }
  }
};

exports.initWeather = initWeather;
