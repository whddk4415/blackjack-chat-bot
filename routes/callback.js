const express = require('express');
const router = express.Router();

const { detail, update } = require('../controller/users');
const messages = require('../libs/kakaoWork/messages');

router.post('/', async (req, res, next) => {
  const { message, actions, react_user_id, action_time, value } = req.body; // 설문조사 결과 확인 (2)
  const { conversation_id: conversationId } = message;
  const user = await detail(react_user_id);

  switch (value) {
    case 'callWhatIsTheWeatherIntroMessage':
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
              '날씨 어때? 날씨 어때? 날씨 어때? 날씨 어때? 날씨 어때? 날씨 어때?',
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
        ],
      });
      break;
    case 'callWhatIsTheWeatherNowMessage':
      messages.sendMessage({
        conversationId,
        text: '지금 어때?',
        blocks: [
          {
            type: 'header',
            text: '지금 어때',
            style: 'blue',
          },
          {
            type: 'description',
            term: '온도',
            content: {
              type: 'text',
              text: `${'17도'}`,
              markdown: false,
            },
            accent: true,
          },
          {
            type: 'description',
            term: '체감온도',
            content: {
              type: 'text',
              text: `${'15도'}`,
              markdown: false,
            },
            accent: true,
          },
          {
            type: 'description',
            term: '미세먼지',
            content: {
              type: 'text',
              text: `${'나쁨'}`,
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
            url: `${'https://t1.kakaocdn.net/kakaowork/resources/block-kit/imagelink/image7@3x.jpg'}`,
          },
          {
            type: 'text',
            text: `${'자켓, 가디건, 야상, 스타킹, 청바지, 면바지'}`,
            markdown: false,
          },
        ],
      });
      break;
    default:
  }
  res.json({ result: true });
});

module.exports = router;
