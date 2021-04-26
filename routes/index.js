const express = require('express');
const router = express.Router();

const users = require('../libs/kakaoWork/users');
const conversations = require('../libs/kakaoWork/conversations');

const { initUsers } = require('../common/utils');
const { sendIntroMessage } = require('../libs/actions/message');

router.get('/', async (req, res, next) => {
  // 유저 목록 검색 (1)
  const { users: userList } = await users.getUserList();

  // 검색된 모든 유저에게 각각 채팅방 생성 (2)
  const conversationList = await Promise.all(
    userList.map(async (user) => {
      const conversation = await conversations.openConversation({
        userId: user.id,
      });
      const { id: conversationId } = conversation;
      const { id: userId } = user;

      initUsers(userId, conversationId);
      return conversation;
    }),
  );
  // 생성된 채팅방에 메세지 전송 (3)
  for (const conversation of conversationList) {
    sendIntroMessage(conversation.id);
  }
  res.json();
});

module.exports = router;
