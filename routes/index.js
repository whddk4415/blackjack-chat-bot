const express = require('express');
const router = express.Router();

const users = require('../libs/kakaoWork/users');
const conversations = require('../libs/kakaoWork/conversations');

const { sendIntroMessage } = require('../libs/actions/message');
const { detail, create } = require('../controller/users');

router.get('/', async (req, res, next) => {
  // 유저 목록 검색 (1)
  let cursor = null;
  while (true) {
    const data = await users.getUserList({ cursor });
    const { users: userList } = data;
    cursor = data.cursor;
    const conversationList = await Promise.all(
      userList.map(async (user) => {
        const conversation = await conversations.openConversation({
          userId: user.id,
        });
        const { id: conversation_id } = conversation;
        const { id: user_id } = user;
        if (!(await detail({ user_id }))) {
          create({
            user_id,
            rain_alarm: false,
            dust_alarm: false,
            daily_alarm: false,
            city: null,
            conversation_id,
          });
          return conversation;
        }
      }),
    );
    if (!cursor) {
      break;
    }
  }
  res.json();
});

router.post('/chatbot', async (req, res, next) => {
  // 유저 목록 검색 (1)
  let cursor = null;
  while (true) {
    const data = await conversations.getConversationList({ cursor });
    const { conversations: conversationList } = data;

    cursor = data.cursor;
    // 생성된 채팅방에 메세지 전송 (3)
    for (const conversation of conversationList) {
      sendIntroMessage(conversation.id);
    }
    if (!cursor) {
      break;
    }
  }

  // 검색된 모든 유저에게 각각 채팅방 생성 (2)

  res.json();
});

module.exports = router;
