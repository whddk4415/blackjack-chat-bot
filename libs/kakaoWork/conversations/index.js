const { kakaoInstance } = require('../index');
const { errorCodeEnum: errorCode } = require('../../../common/errors');

exports.openConversation = async ({ userId }) => {
  const data = {
    user_id: userId,
  };
  const res = await kakaoInstance.post('/v1/conversations.open', data);

  if (!res.data.success) {
    throw new Error(res.data.error.message);
  }

  return res.data.conversation;
};

exports.openConversations = async ({ userId }) => {
  const data = {
    user_id: userId,
  };
  const res = await kakaoInstance.post('/v1/conversations.open', data);
  if (!res.data.success) {
    throw new Error(res.data.error.message);
  }
  return res.data.conversation;
};

exports.getConversationList = async ({ limit = null, cursor = null } = {}) => {
  const res = await kakaoInstance.get(
    '/v1/conversations.list?' +
      (limit ? `limit=${limit}&` : '') +
      (cursor ? `cursor=${cursor}` : ''),
  );
  if (!res.data.success) {
    throw new Error(res.data.error.message);
  }
  return res.data;
};

exports.getConversationUsers = async (conversation_id) => {
  const res = await kakaoInstance.get(
    `/v1/conversations/${conversation_id}/users`,
  );
  if (!res.data.success) {
    throw new Error(res.data.error.message);
  }
  return res.data.users;
};

exports.invite = async (userIds) => {
  const data = {
    user_ids: userIds,
  };
  const res = await kakaoInstance.post(
    `/v1/conversations/${conversation_id}/invite`,
    data,
  );
  if (!res.data.success) {
    throw new Error(res.data.error.message);
  }
};

exports.kick = async (userIds) => {
  const data = {
    user_ids: userIds,
  };
  const res = await kakaoInstance.post(
    `/v1/conversations/${conversation_id}/kick`,
    data,
  );
  if (!res.data.success) {
    throw new Error(res.data.error.message);
  }
};
