const { kakaoInstance } = require('../index');
const { errorCodeEnum: errorCode } = require('../../../common/errors');

exports.getDepartmentList = async ({ limit = null, cursor = null } = {}) => {
  const res = await kakaoInstance.get(
    '/v1/departments.list?' +
      (limit ? `limit=${limit}&` : '') +
      (cursor ? `cursor=${cursor}` : ''),
  );

  if (!res.success) {
    throw new errorCode[res.error.code](res.error.message);
  }

  return res.data;
};
