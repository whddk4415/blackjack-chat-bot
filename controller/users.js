const UserModel = require('../models/user');

// 전체 유저 데이터 조회
const list = async (search = null) => {
  try {
    const allUser = await UserModel.find(search ? search : {});
    return allUser;
  } catch (e) {
    console.error(e);
  }
};

// 상세 조회(하나만)
const detail = async (search) => {
  try {
    const user = await UserModel.findOne(search);
    return user;
  } catch (e) {
    console.error(e);
  }
};

// 등록
const create = async (data) => {
  try {
    const {
      user_id,
      conversation_id,
      city,
      daily_alarm,
      rain_alarm,
      dust_alarm,
    } = data;
    const userData = new UserModel({
      user_id,
      conversation_id,
      city,
      daily_alarm,
      rain_alarm,
      dust_alarm,
    });
    const output = await userData.save();
    return output;
  } catch (e) {
    console.error(e);
  }
};

// 수정
const update = async (user_id, userData) => {
  try {
    const updateUser = await UserModel.findOneAndUpdate({ user_id }, userData);
    return updateUser;
  } catch (e) {
    console.error(e);
  }
};

// 삭제
const remove = async (user_id) => {
  try {
    return (output = await UserModel.findOneAndRemove({ user_id }));
    return output;
  } catch (e) {
    console.error(e);
  }
};

module.exports.list = list;
module.exports.detail = detail;
module.exports.create = create;
module.exports.update = update;
module.exports.remove = remove;
