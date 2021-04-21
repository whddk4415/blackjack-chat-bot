const { kakaoInstance } = require('../index');
const { errorCodeEnum: errorCode } = require('../../../common/errors');

exports.getUserList = async ({ limit = null, cursor = null } = {}) => {
  const res = await kakaoInstance.get(
    '/v1/users.list?' +
      (limit ? `limit=${limit}&` : '') +
      (cursor ? `cursor=${cursor}` : ''),
  );
  return res.data;
};

exports.getUserById = async ({ userId }) => {
  const res = await kakaoInstance.get(`/v1/users.info?userId=${userId}`);
  if (!res.success) {
    throw new errorCode[res.error.code](res.error.message);
  }
  return res.data.user;
};

exports.getUserByEmail = async ({ email }) => {
  const res = await kakaoInstance.get(`/v1/users.find_by_email?email=${email}`);
  if (!res.success) {
    throw new errorCode[res.error.code](res.error.message);
  }
  return res.data.user;
};

exports.getUserByPhoneNumber = async ({ phone_number }) => {
  const res = await kakaoInstance.get(
    `/v1/users.find_by_phone_number?phone_number=${phone_number}`,
  );
  if (!res.success) {
    throw new errorCode[res.error.code](res.error.message);
  }
  return res.data.user;
};

exports.setWorkTime = async ({ userId, workStartTime, workEndTime }) => {
  const data = {
    user_id: userId,
    work_start_time: workStartTime,
    work_end_time: workEndTime,
  };
  const res = await kakaoInstance.post('/v1/user.set_work_time ', data);
  if (!res.success) {
    throw new errorCode[res.error.code](res.error.message);
  }
};

exports.setVacationTime = async ({
  userId,
  vacationStartTime,
  vacationEndTime,
}) => {
  const data = {
    user_id: userId,
    vacation_start_time: vacationStartTime,
    vacation_end_time: vacationEndTime,
  };
  const res = await kakaoInstance.post('/v1/users.set_vacation_time', data);
  if (!res.success) {
    throw new errorCode[res.error.code](res.error.message);
  }
};
