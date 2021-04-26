const express = require('express');
const router = express.Router();

const { detail, update } = require('../controller/users');
const {
  sendIntroMessage,
  sendWhatIsTheWeatherIntroMessage,
  sendCitySetResultMessage,
  sendWhatIsTheWeatherNowMessage,
  sendWhatIsTheWeatherTodayMessage,
  sendSetAlarmIntroMessage,
  sendDailyAlarmSetResultMessage,
  sendRainAlarmSetResultMessage,
  sendDustAlarmSetResultMessage,
} = require('../libs/actions/message');

router.post('/', async (req, res, next) => {
  const { message, actions, react_user_id, action_time, value } = req.body; // 설문조사 결과 확인 (2)
  const { conversation_id: conversationId } = message;

  switch (value) {
    case 'callIntroMessage':
      sendIntroMessage(conversationId);
      break;

    case 'callCitySetResultMessage':
      {
        const city = actions.selectedCity;
        await update(react_user_id, { city });
        await sendCitySetResultMessage(conversationId, city);
        sendIntroMessage(conversationId);
      }
      break;

    case 'callWhatIsTheWeatherIntroMessage':
      sendWhatIsTheWeatherIntroMessage(conversationId);
      break;

    case 'callWhatIsTheWeatherNowMessage':
      {
        const { city } = await detail({ user_id: react_user_id });
        await sendWhatIsTheWeatherNowMessage(conversationId, city);
        sendWhatIsTheWeatherIntroMessage(conversationId);
      }
      break;

    case 'callWhatIsTheWeatherTodayMessage':
      {
        const { city } = await detail({ user_id: react_user_id });
        await sendWhatIsTheWeatherTodayMessage(conversationId, city);
        sendWhatIsTheWeatherIntroMessage(conversationId);
      }
      break;

    case 'callSetAlarmIntroMessage':
      {
        sendSetAlarmIntroMessage(
          conversationId,
          await detail({
            user_id: react_user_id,
          }),
        );
      }
      break;

    case 'callDailyAlarmSetResultMessage':
      {
        const { daily_alarm: prevDailyAlarm } = await detail({
          user_id: react_user_id,
        });
        await update(react_user_id, { daily_alarm: !prevDailyAlarm });
        const updatedUser = await detail({
          user_id: react_user_id,
        });
        await sendDailyAlarmSetResultMessage(conversationId, updatedUser);
        sendSetAlarmIntroMessage(conversationId, updatedUser);
      }
      break;

    case 'callRainAlarmSetResultMessage':
      {
        const { rain_alarm: prevRainAlarm } = await detail({
          user_id: react_user_id,
        });
        await update(react_user_id, { rain_alarm: !prevRainAlarm });
        const updatedUser = await detail({
          user_id: react_user_id,
        });
        await sendRainAlarmSetResultMessage(conversationId, updatedUser);
        sendSetAlarmIntroMessage(conversationId, updatedUser);
      }
      break;

    case 'callDustAlarmSetResultMessage':
      {
        const { dust_alarm: prevDustAlarm } = await detail({
          user_id: react_user_id,
        });
        await update(react_user_id, { dust_alarm: !prevDustAlarm });
        const updatedUser = await detail({
          user_id: react_user_id,
        });
        await sendDustAlarmSetResultMessage(conversationId, updatedUser);
        sendSetAlarmIntroMessage(conversationId, updatedUser);
      }
      break;

    case 'callDailyAlarmMessage':
      sendDailyAlarmMessage(conversationId);
      break;

    case 'callRainAlarmMessage':
      sendRainAlarmMessage(conversationId);
      break;

    case 'callDustAlarmMessage':
      sendDustAlarmMessage(conversationId);
      break;
    default:
      break;
  }
  res.json({ result: true });
});

module.exports = router;
