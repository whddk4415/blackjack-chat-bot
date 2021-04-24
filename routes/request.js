const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { value } = req.body;

  switch (value) {
    case 'callDailyAlarmSettingModal':
      return res.json({
        view: {
          title: 'Daily 알람 설정',
          accept: '설정',
          decline: '취소',
          value: 'callDailyAlarmSetResultMessage',
          blocks: [
            {
              type: 'label',
              text: '시간 설정',
              markdown: true,
            },
            {
              type: 'input',
              name: 'alarmTime',
              required: false,
              placeholder: 'HH:MM 형식으로 입력해주세요. ex) 22:01',
            },
          ],
        },
      });
    case '':
      break;
    default:
  }

  res.json({});
});

module.exports = router;
