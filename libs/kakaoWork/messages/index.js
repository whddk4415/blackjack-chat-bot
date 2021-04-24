const { kakaoInstance } = require('../index');
const { errorCodeEnum: errorCode } = require('../../../common/errors');

exports.sendMessage = async ({ conversationId, text, blocks }) => {
  const data = {
    conversation_id: conversationId,
    text,
    ...(blocks && { blocks }),
  };
  const res = await kakaoInstance.post('/v1/messages.send', data);
  if (!res.data.success) {
    throw new Error(res.data.error.message);
  }
  return res.data.message;
};
