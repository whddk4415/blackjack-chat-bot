const { detail } = require('../../controller/users');
const messages = require('../kakaoWork/messages');
const { detail: getWeather } = require('../../controller/weathers');
const { getClothes } = require('../weather');
const dateFormat = require('dateformat');

exports.sendIntroMessage = async (conversationId) => {
  const { city } = await detail({ conversation_id: conversationId });

  return messages.sendMessage({
    conversationId,
    text: 'Blackjackνπ λ μ¨ μ±λ΄ π¨',
    blocks: [
      {
        type: 'header',
        text: 'π SWM λ μ¨ μ±λ΄ π¨',
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
          'SWM λ μ¨ μ±λ΄μ μ€μ  μ¬λ¬λΆ νμν©λλ€. λ€μ κΈ°λ₯μ μ΄μ©νκΈ° μ , λμλ₯Ό λ¨Όμ  μ€μ ν΄μ£ΌμΈμ.',
        markdown: true,
      },
      {
        type: 'text',
        text: '*1. λ μ¨ μ΄λ?* : λ μ¨μ λν΄ μμλ³΄μΈμ.',
        markdown: true,
      },
      {
        type: 'text',
        text: '*2. μλ μ€μ * : λ μ¨ μλ¦Όμ λ°μλ³΄μΈμ.',
        markdown: true,
      },
      {
        type: 'action',
        elements: [
          {
            type: 'button',
            text: 'λ μ¨ μ΄λ?',
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
            text: 'μλ μ€μ ',
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
        text: `λμ ${city ? 'μ¬' : ''}μ€μ `,
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
    text: 'Blackjackνπ λ μ¨ μ±λ΄ π¨',
    blocks: [
      {
        type: 'header',
        text: 'λ μ¨ μ΄λ?',
        style: 'blue',
      },
      {
        type: 'text',
        text:
          '*κΈ°μ¨, μ²΄κ°μ¨λ, λ―ΈμΈλ¨Όμ§ μνμ λ μ¨μ λ°λ₯Έ μΆμ² μ·μ°¨λ¦Ό*μ λν΄ μμλ³΄μΈμ.',
        markdown: true,
      },
      {
        type: 'text',
        text: '*1. μ§κΈ μ΄λ?* : νμ¬ λ μ¨ μνλ₯Ό μλ €λλ¦½λλ€.',
        markdown: true,
      },
      {
        type: 'text',
        text: '*2. μ€λ μ΄λ?* : μ€λμ μ λ°μ μΈ λ μ¨ μνλ₯Ό μλ €λλ¦½λλ€.',
        markdown: true,
      },
      {
        type: 'action',
        elements: [
          {
            type: 'button',
            text: 'μ§κΈ μ΄λ?',
            style: 'primary',
            action_type: 'submit_action',
            action_name: 'callWhatIsTheWeatherNowMessage',
            value: 'callWhatIsTheWeatherNowMessage',
          },
          {
            type: 'button',
            text: 'μ€λ μ΄λ?',
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
        text: 'π ',
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
    text: 'Blackjackνπ λ μ¨ μ±λ΄ π¨',
    blocks: [
      {
        type: 'header',
        text: 'λμ μ€μ ',
        style: 'blue',
      },
      {
        type: 'text',
        text: `λμκ° *${city}*λ‘ μ€μ λμμ΅λλ€.`,
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
    text: 'Blackjackνπ λ μ¨ μ±λ΄ π¨',
    blocks: [
      {
        type: 'header',
        text: 'μ§κΈ λ μ¨ μ΄λ?',
        style: 'blue',
      },
      {
        type: 'description',
        term: 'κΈ°μ¨',
        content: {
          type: 'text',
          text: `${temp}Β°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: 'μ²΄κ°μ¨λ',
        content: {
          type: 'text',
          text: `${feels_like}Β°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: 'λ―ΈμΈλ¨Όμ§',
        content: {
          type: 'text',
          text: pm10_status,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: 'μ΄λ―ΈμΈλ¨Όμ§',
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
        text: '*μΆμ² μ·μ°¨λ¦Ό*',
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
    text: 'Blackjackνπ λ μ¨ μ±λ΄ π¨',
    blocks: [
      {
        type: 'header',
        text: 'μ€λ μ΄λ',
        style: 'blue',
      },
      {
        type: 'description',
        term: 'μ΅μ κΈ°μ¨',
        content: {
          type: 'text',
          text: `${temp_min}Β°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: 'μ΅κ³ κΈ°μ¨',
        content: {
          type: 'text',
          text: `${temp_max}Β°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: 'μ²΄κ°μ¨λ', // μ΅μ  + μ΅κ³  μ νκ·  μ¨λ μ²΄κ°μ¨λλ‘ λ³ν
        content: {
          type: 'text',
          text: `${today_feels_like}Β°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: 'λ―ΈμΈλ¨Όμ§',
        content: {
          type: 'text',
          text: pm10_status,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: 'μ΄λ―ΈμΈλ¨Όμ§',
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
        text: '*μΆμ² μ·μ°¨λ¦Ό*',
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
    text: 'Blackjackνπ λ μ¨ μ±λ΄ π¨',
    blocks: [
      {
        type: 'header',
        text: 'λ μ¨ μλ μ€μ ',
        style: 'blue',
      },
      {
        type: 'button',
        text: `Daily μλ ${daily_alarm ? 'OFF' : 'ON'}`,
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
            text: `λΉμ€λ λ  ${rain_alarm ? 'OFF' : 'ON'}`,
            style: 'primary',
            action_type: 'submit_action',
            action_name: 'callRainAlarmSetResultMessage',
            value: 'callRainAlarmSetResultMessage',
          },
          {
            type: 'button',
            text: `λ―ΈμΈλ¨Όμ§ ${dust_alarm ? 'OFF' : 'ON'}`,
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
        text: 'π ',
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
    text: 'Blackjackνπ λ μ¨ μ±λ΄ π¨',
    blocks: [
      {
        type: 'header',
        text: 'λ μ¨ μλ μ€μ ',
        style: 'blue',
      },
      {
        type: 'text',
        text: `λ μ¨ μλμ΄ *${daily_alarm ? 'μ€μ ' : 'ν΄μ '}*λμμ΅λλ€.${
          daily_alarm ? '\n*07:00*μ λ μ¨ μλ¦Όμ λ³΄λ΄λλ¦½λλ€.' : ''
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
    text: 'Blackjackνπ λ μ¨ μ±λ΄ π¨',
    blocks: [
      {
        type: 'header',
        text: 'λΉ μλ μ€μ ',
        style: 'blue',
      },
      {
        type: 'text',
        text: `λΉ μλμ΄ ${rain_alarm ? 'μ€μ ' : 'ν΄μ '}λμμ΅λλ€.${
          rain_alarm ? '\n*07:00*μ λΉ μλ¦Όμ λ³΄λ΄λλ¦½λλ€.' : ''
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
    text: 'Blackjackνπ λ μ¨ μ±λ΄ π¨',
    blocks: [
      {
        type: 'header',
        text: 'λ―ΈμΈλ¨Όμ§ μλ μ€μ ',
        style: 'blue',
      },
      {
        type: 'text',
        text: `λ―ΈμΈλ¨Όμ§ μλμ΄ *${dust_alarm ? 'μ€μ ' : 'ν΄μ '}*λμμ΅λλ€.${
          dust_alarm ? '\n*07:00*μ λ―ΈμΈλ¨Όμ§ μλ¦Όμ λ³΄λ΄λλ¦½λλ€.' : ''
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
  //@TODO: λ μ¨ μ λ³΄ λ°μ΄ν° λ°μμ€κΈ°
  await messages.sendMessage({
    conversationId,
    text: 'Blackjackνπ λ μ¨ μ±λ΄ π¨',
    blocks: [
      {
        type: 'header',
        text: 'μ€λ μ΄λ',
        style: 'blue',
      },
      {
        type: 'description',
        term: 'μ΅μ κΈ°μ¨',
        content: {
          type: 'text',
          text: `${temp_min}Β°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: 'μ΅κ³ κΈ°μ¨',
        content: {
          type: 'text',
          text: `${temp_max}Β°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'description',
        term: 'μ²΄κ°μ¨λ',
        content: {
          type: 'text',
          text: `${today_feels_like}Β°C`,
          markdown: false,
        },
        accent: true,
      },
      {
        type: 'divider',
      },
      {
        type: 'text',
        text: '*μΆμ² μ·μ°¨λ¦Ό*',
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
  //@TODO: λΉ μ λ³΄ λ°μ΄ν° λ°μμ€κΈ°
  //μμ λ³μ
  await messages.sendMessage({
    conversationId,
    text: 'Blackjackνπ λ μ¨ μ±λ΄ π¨',
    blocks: [
      {
        type: 'header',
        text: 'μ€λμ λΉ μμ',
        style: 'blue',
      },
      {
        type: 'text',
        text: 'π£ μ€λμ λΉ μμμλλ€.',
        markdown: true,
      },
      {
        type: 'text',
        text: is_rainy
          ? 'μ€λμ *λΉκ° μ€κ² μ΅λλ€.*\nμ°μ°μ μ±κ²¨μ μΈμΆνμΈμ!'
          : 'μ€λμ *λΉκ° μ€μ§ μκ² μ΅λλ€.*',
        markdown: true,
      },
    ],
  });
};

exports.sendDustAlarmMessage = async (
  conversationId,
  { pm10_status, pm2_5_status },
) => {
  //@TODO: λ―ΈμΈλ¨Όμ§ μ λ³΄ λ°μ΄ν° λ°μμ€κΈ°
  //μμ λ³μ
  await messages.sendMessage({
    conversationId,
    text: 'Blackjackνπ λ μ¨ μ±λ΄ π¨',
    blocks: [
      {
        type: 'header',
        text: 'μ€λμ λ―ΈμΈλ¨Όμ§ μμ',
        style: 'blue',
      },
      {
        type: 'text',
        text: 'π£ μ€λμ λ―ΈμΈλ¨Όμ§ μμμλλ€.',
        markdown: true,
      },
      {
        type: 'text',
        text: `- *λ―ΈμΈλ¨Όμ§ μν: ${pm10_status}*`,
        markdown: true,
      },
      {
        type: 'text',
        text: `- *μ΄λ―ΈμΈλ¨Όμ§ μν: ${pm2_5_status}*`,
        markdown: true,
      },
    ],
  });
};
