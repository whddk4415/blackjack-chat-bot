const { kakaoInstance } = require('../index');
const { errorCodeEnum: errorCode } = require('../../../common/errors');

exports.getSpaceInfo = async () => {
  const res = await kakaoInstance.get('/v1/spaces.info');
  if (!res.data.success) {
    throw new Error(res.data.error.message);
  }
  return res.data.space;
};
