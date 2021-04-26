const { getUserList } = require('../../libs/kakaoWork/users');
const { list, detail, create, update } = require('../../controller/users');
const {
  detail: weatherDetail,
  create: weatherCreate,
} = require('../../controller/weathers');
const dateFormat = require('dateformat');
const { getWeather, getCityData, getClothes } = require('../../libs/weather');
const schedule = require('node-schedule');
const {
  sendDailyAlarmMessage,
  sendRainAlarmMessage,
  sendDustAlarmMessage,
} = require('../../libs/actions/message');

const initWeather = async () => {
  const currentTime = dateFormat(new Date(), 'yyyy-mm-dd HH');
  const cityData = getCityData();
  for (const { kor: city } of cityData) {
    if (!(await weatherDetail(currentTime, city))) {
      const weather = await getWeather(city);
      weather.time = currentTime;
      weather.city = city;
      weatherCreate(weather);
    }
  }
};

exports.initWeather = initWeather;

exports.getWeatherPerHour = async () => {
  const job = schedule.scheduleJob({ minute: 0 }, async () => {
    initWeather();
  });
};

exports.sendDailyAlarmMessageEveryDay = async () => {
  const job = schedule.scheduleJob(
    { hour: 22, minute: 0, second: 15 },
    async () => {
      const users = await list({ daily_alarm: true });
      const currentTime = dateFormat(new Date(), 'yyyy-mm-dd HH');
      for (const { city, conversation_id } of users) {
        sendDailyAlarmMessage(
          conversation_id,
          await weatherDetail(currentTime, city),
        );
      }
    },
  );
};

exports.sendRainAlarmMessageEveryDay = async () => {
  const job = schedule.scheduleJob(
    { hour: 22, minute: 0, second: 15 },
    async () => {
      const users = await list({ rain_alarm: true });
      const currentTime = dateFormat(new Date(), 'yyyy-mm-dd HH');
      for (const { city, conversation_id } of users) {
        sendRainAlarmMessage(
          conversation_id,
          await weatherDetail(currentTime, city),
        );
      }
    },
  );
};

exports.sendDustAlarmMessageEveryDay = async () => {
  const job = schedule.scheduleJob(
    { hour: 22, minute: 0, second: 15 },
    async () => {
      const users = await list({ dust_alarm: true });
      const currentTime = dateFormat(new Date(), 'yyyy-mm-dd HH');
      for (const { city, conversation_id } of users) {
        sendDustAlarmMessage(
          conversation_id,
          await weatherDetail(currentTime, city),
        );
      }
    },
  );
};
