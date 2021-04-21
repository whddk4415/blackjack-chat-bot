const { kakaoInstance } = require('../index');
const { errorCodeEnum: errorCode } = require('../../../common/errors');

exports.getSpaceInfo = async () => {
  const res = await kakaoInstance.get('/v1/spaces.info');
  if (!res.success) {
    throw new errorCode[res.error.code](res.error.message);
  }
  return res.data.space;
};
