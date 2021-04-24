const { getUserList } = require('../../libs/kakaoWork/users');
const { create } = require('../../controller/users');

exports.initUsers = async () => {
  const { users: chatUserList } = await getUserList();
  for (const user of chatUserList) {
    create({
      user_id: user.id,
      rain_alarm: false,
      dust_alarm: false,
      daily_alarm: true,
      time: '--:--',
      city: null,
      sex: null,
    });
  }
};
