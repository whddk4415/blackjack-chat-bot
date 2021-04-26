const { getUserList } = require('../../libs/kakaoWork/users');
const { detail, create } = require('../../controller/users');

exports.initUsers = async (userId, conversationId) => {
  if (!(await detail({ user_id: userId }))) {
    create({
      user_id: userId,
      rain_alarm: false,
      dust_alarm: false,
      daily_alarm: true,
      city: null,
      conversation_id: conversationId,
    });
  }
};
