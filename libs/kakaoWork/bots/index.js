const { kakaoInstance } = require('../index');
const { errorCodeEnum: errorCode } = require('../../../common/errors');

exports.getBotInfo = async () => {
  const res = await kakaoInstance.get('/v1/bots.info');

  if (!res.data.success) {
    throw new Error(res.data.error.message);
  }

  return res.data.info;
};
