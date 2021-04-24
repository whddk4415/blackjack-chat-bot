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
    default:
  }
  res.json({ result: true });
});

module.exports = router;
