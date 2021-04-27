const { detail } = require('../../controller/users');
const messages = require('../kakaoWork/messages');
const { detail: getWeather } = require('../../controller/weathers');
const { getClothes } = require('../weather');
const dateFormat = require('dateformat');

exports.sendIntroMessage = async (conversationId) => {
  const { city } = await detail({ conversation_id: conversationId });

  return messages.sendMessage({
    conversationId,
    text: '🌞 SWM 날씨 챗봇 🌨',
    blocks: [
      {
        type: 'header',
        text: '🌞 SWM 날씨 챗봇 🌨',
        style: 'blue',
      },
      {
        type: 'image_link',
        url:
          'https://user-images.githubusercontent.com/47051596/116247611-fcf09600-a7a5-11eb-9dec-6a52fe7d4430.jpg',
      },
      {
        type: 'text',
        text:
          'SWM 날씨 챗봇에 오신 여러분 환영합니다. 다음 기능을 이용하기 전, 도시를 먼저 설정해주세요.',
        markdown: true,
      },
      {
        type: 'text',
        text: '*1. 날씨 어때?* : 날씨에 대해 알아보세요.',
        markdown: true,
      },
      {
        type: 'text',
        text: '*2. 알람 설정* : 날씨 알림을 받아보세요.',
        markdown: true,
      },
      {
        type: 'action',
        elements: [
          {
            type: 'button',
            text: '날씨 어때?',
            style: 'primary',
            action_type: city ? 'submit_action' : 'call_modal',
            action_name: city
              ? 'callWhatIsTheWeatherIntroMessage'
              : 'callCitySettingModal',
            value: city
              ? 'callWhatIsTheWeatherIntroMessage'
              : 'callCitySettingModal',
          },
          {
            type: 'button',
            text: '알람 설정',
            style: 'danger',
            action_type: city ? 'submit_action' : 'call_modal',
            action_name: city
              ? 'callSetAlarmIntroMessage'
              : 'callCitySettingModal',
            value: city ? 'callSetAlarmIntroMessage' : 'callCitySettingModal',
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        type: 'button',
        text: `도시 ${city ? '재' : ''}설정`,
        style: 'default',
        action_type: 'call_modal',
        action_name: 'callCitySettingModal',
        value: 'callCitySettingModal',
      },
    ],
  });
};

exports.sendWhatIsTheWeatherIntroMessage = (conversationId) => {
  messages.sendMessage({
    conversationId,
    text: '날씨 어때?',
    blocks: [
      {
        type: 'header',
        text: '날씨 어때?',
        style: 'blue',
      },
      {
        type: 'text',
        text:
          '*기온, 체감온도, 미세먼지 상태와 날씨에 따른 추천 옷차림*에 대해 알아보세요.',
        markdown: true,
      },
      {
        type: 'text',
        text: '*1. 지금 어떄?* : 현재 날씨 상태를 알려드립니다.',
        markdown: true,
      },
      {
        type: 'text',
        text: '*2. 오늘 어떄?* : 오늘의 전반적인 날씨 상태를 알려드립니다.',
        markdown: true,
      },
      {
        type: 'action',
        elements: [
          {
            type: 'button',
            text: '지금 어때?',
            style: 'primary',
            action_type: 'submit_action',
            action_name: 'callWhatIsTheWeatherNowMessage',
            value: 'callWhatIsTheWeatherNowMessage',
          },
          {
            type: 'button',
            text: '오늘 어때?',
            style: 'danger',
            action_type: 'submit_action',
            action_name: 'callWhatIsTheWeatherTodayMessage',
            value: 'callWhatIsTheWeatherTodayMessage',
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        type: 'button',
        text: '🏠',
        style: 'default',
        action_type: 'submit_action',
        action_name: 'callIntroMessage',
        value: 'callIntroMessage',
      },
    ],
  });
};

exports.sendCitySetResultMessage = async (conversationId, city) => {
  messages.sendMessage({
    conversationId,
    text: '도시 설정',
    blocks: [
      {
        type: 'header',
        text: '도시 설정',
        style: 'blue',
      },
      {
        type: 'text',
        text: `도시가 *${city}*로 설정되었습니다.`,
        markdown: true,
      },
    ],
  });
};

exports.sendWhatIsTheWeatherNowMessage = async (conversationId, city) => {
  const { temp, feels_like, pm10_status, pm2_5_status } = await getWeather(
    dateFormat(new Date(), 'yyyy-mm-dd HH'),
    city,
  );

  const { text, img } = getClothes(feels_like);
  await messages.sendMessage({
    conversationId,
    text: '지금 날씨 어때?',
    blocks: [
      {
        type: 'header',
        text: '지금 날씨 어때?',
        style: 'blue',
      },
      {
        type: 'description',
        term: '기온',
        content: {
          type: 'text',
          text: `${temp}°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: '체감온도',
        content: {
          type: 'text',
          text: `${feels_like}°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: '미세먼지',
        content: {
          type: 'text',
          text: pm10_status,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: '초미세먼지',
        content: {
          type: 'text',
          text: pm2_5_status,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'divider',
      },
      {
        type: 'text',
        text: '*추천 옷차림*',
        markdown: true,
      },
      {
        type: 'image_link',
        url: img,
      },
      {
        type: 'text',
        text: text.join(' '),
        markdown: false,
      },
    ],
  });
};

exports.sendWhatIsTheWeatherTodayMessage = async (conversationId, city) => {
  const {
    temp_min,
    temp_max,
    today_feels_like,
    pm10_status,
    pm2_5_status,
  } = await getWeather(dateFormat(new Date(), 'yyyy-mm-dd HH'), city);
  const { text, img } = getClothes(today_feels_like);

  await messages.sendMessage({
    conversationId,
    text: '오늘 어때?',
    blocks: [
      {
        type: 'header',
        text: '오늘 어때',
        style: 'blue',
      },
      {
        type: 'description',
        term: '최저기온',
        content: {
          type: 'text',
          text: `${temp_min}°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: '최고기온',
        content: {
          type: 'text',
          text: `${temp_max}°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: '체감온도', // 최저 + 최고 의 평균 온도 체감온도로 변환
        content: {
          type: 'text',
          text: `${today_feels_like}°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: '미세먼지',
        content: {
          type: 'text',
          text: pm10_status,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: '초미세먼지',
        content: {
          type: 'text',
          text: pm2_5_status,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'divider',
      },
      {
        type: 'text',
        text: '*추천 옷차림*',
        markdown: true,
      },
      {
        type: 'image_link',
        url: img,
      },
      {
        type: 'text',
        text: text.join(' '),
        markdown: false,
      },
    ],
  });
};

exports.sendSetAlarmIntroMessage = (
  conversationId,
  { daily_alarm, rain_alarm, dust_alarm },
) => {
  messages.sendMessage({
    conversationId,
    text: '날씨 알람 설정',
    blocks: [
      {
        type: 'header',
        text: '날씨 알람 설정',
        style: 'blue',
      },
      {
        type: 'button',
        text: `Daily 알람 ${daily_alarm ? 'OFF' : 'ON'}`,
        style: 'default',
        action_type: 'submit_action',
        action_name: 'callDailyAlarmSetResultMessage',
        value: 'callDailyAlarmSetResultMessage',
      },
      {
        type: 'action',
        elements: [
          {
            type: 'button',
            text: `비오는 날 ${rain_alarm ? 'OFF' : 'ON'}`,
            style: 'primary',
            action_type: 'submit_action',
            action_name: 'callRainAlarmSetResultMessage',
            value: 'callRainAlarmSetResultMessage',
          },
          {
            type: 'button',
            text: `미세먼지 ${dust_alarm ? 'OFF' : 'ON'}`,
            style: 'danger',
            action_type: 'submit_action',
            action_name: 'callDustAlarmSetResultMessage',
            value: 'callDustAlarmSetResultMessage',
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        type: 'button',
        text: '🏠',
        style: 'default',
        action_type: 'submit_action',
        action_name: 'callIntroMessage',
        value: 'callIntroMessage',
      },
    ],
  });
};

exports.sendDailyAlarmSetResultMessage = async (
  conversationId,
  { daily_alarm },
) => {
  await messages.sendMessage({
    conversationId,
    text: '날씨 알람 설정',
    blocks: [
      {
        type: 'header',
        text: '날씨 알람 설정',
        style: 'blue',
      },
      {
        type: 'text',
        text: `날씨 알람이 *${daily_alarm ? '설정' : '해제'}*되었습니다.${
          daily_alarm ? '\n*07:00*에 날씨 알림을 보내드립니다.' : ''
        }`,
        markdown: true,
      },
    ],
  });
};

exports.sendRainAlarmSetResultMessage = async (
  conversationId,
  { rain_alarm },
) => {
  await messages.sendMessage({
    conversationId,
    text: '비 알람 설정',
    blocks: [
      {
        type: 'header',
        text: '비 알람 설정',
        style: 'blue',
      },
      {
        type: 'text',
        text: `비 알람이 ${rain_alarm ? '설정' : '해제'}되었습니다.${
          rain_alarm ? '\n*07:00*에 비 알림을 보내드립니다.' : ''
        }`,
        markdown: true,
      },
    ],
  });
};

exports.sendDustAlarmSetResultMessage = async (
  conversationId,
  { dust_alarm },
) => {
  await messages.sendMessage({
    conversationId,
    text: '미세먼지 알람 설정',
    blocks: [
      {
        type: 'header',
        text: '미세먼지 알람 설정',
        style: 'blue',
      },
      {
        type: 'text',
        text: `미세먼지 알람이 *${dust_alarm ? '설정' : '해제'}*되었습니다.${
          dust_alarm ? '\n*07:00*에 미세먼지 알림을 보내드립니다.' : ''
        }`,
        markdown: true,
      },
    ],
  });
};

exports.sendDailyAlarmMessage = async (
  conversationId,
  { temp_max, temp_min, today_feels_like },
) => {
  const { img, text } = getClothes(today_feels_like);
  //@TODO: 날씨 정보 데이터 받아오기
  await messages.sendMessage({
    conversationId,
    text: '오늘 어때?',
    blocks: [
      {
        type: 'header',
        text: '오늘 어때',
        style: 'blue',
      },
      {
        type: 'description',
        term: '최저기온',
        content: {
          type: 'text',
          text: `${temp_min}°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: '최고기온',
        content: {
          type: 'text',
          text: `${temp_max}°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: '체감온도',
        content: {
          type: 'text',
          text: `${today_feels_like}°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'divider',
      },
      {
        type: 'text',
        text: '*추천 옷차림*',
        markdown: true,
      },
      {
        type: 'image_link',
        url: img,
      },
      {
        type: 'text',
        text: text.join(' '),
        markdown: false,
      },
    ],
  });
};

exports.sendRainAlarmMessage = async (conversationId, { is_rainy }) => {
  //@TODO: 비 정보 데이터 받아오기
  //임시 변수
  await messages.sendMessage({
    conversationId,
    text: '오늘의 비 소식',
    blocks: [
      {
        type: 'header',
        text: '오늘의 비 소식',
        style: 'blue',
      },
      {
        type: 'text',
        text: '🗣 오늘의 비 소식입니다.',
        markdown: true,
      },
      {
        type: 'text',
        text: is_rainy
          ? '오늘은 *비가 오겠습니다.*\n우산을 챙겨서 외출하세요!'
          : '오늘은 *비가 오지 않겠습니다.*',
        markdown: true,
      },
    ],
  });
};

exports.sendDustAlarmMessage = async (
  conversationId,
  { pm10_status, pm2_5_status },
) => {
  //@TODO: 미세먼지 정보 데이터 받아오기
  //임시 변수
  await messages.sendMessage({
    conversationId,
    text: '오늘의 미세먼지 소식',
    blocks: [
      {
        type: 'header',
        text: '오늘의 미세먼지 소식',
        style: 'blue',
      },
      {
        type: 'text',
        text: '🗣 오늘의 미세먼지 소식입니다.',
        markdown: true,
      },
      {
        type: 'text',
        text: `- *미세먼지 상태: ${pm10_status}*`,
        markdown: true,
      },
      {
        type: 'text',
        text: `- *초미세먼지 상태: ${pm2_5_status}*`,
        markdown: true,
      },
    ],
  });
};
