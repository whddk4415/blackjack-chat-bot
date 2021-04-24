const express = require('express');
const router = express.Router();

const users = require('../libs/kakaoWork/users');
const conversations = require('../libs/kakaoWork/conversations');
const messages = require('../libs/kakaoWork/messages');

router.get('/', async (req, res, next) => {
  // 유저 목록 검색 (1)
  const { users: userList } = await users.getUserList();

  // 검색된 모든 유저에게 각각 채팅방 생성 (2)
  const conversationList = await Promise.all(
    userList.map((user) => conversations.openConversation({ userId: user.id })),
  );

  // 생성된 채팅방에 메세지 전송 (3)
  const messageList = await Promise.all([
    conversationList.map((conversation) =>
      messages.sendMessage({
        conversationId: conversation.id,
        text: '설문조사 이벤트',
        blocks: [
          {
            type: 'header',
            text: 'SWM 블랙잭 날씨 챗봇',
            style: 'blue',
          },
          {
            type: 'image_link',
            url:
              'https://t1.kakaocdn.net/kakaowork/resources/block-kit/imagelink/image7@3x.jpg',
          },
          {
            type: 'text',
            text:
              '이것은 날씨 챗봇 설명입니다. 이것은 날씨 챗봇 설명입니다. 이것은 날씨 챗봇 설명입니다. 이것은 날씨 챗봇 설명입니다. 이것은 날씨 챗봇 설명입니다.',
            markdown: true,
          },
          {
            type: 'action',
            elements: [
              {
                type: 'button',
                text: '날씨 어때?',
                style: 'primary',
                action_type: 'submit_action',
                action_name: 'callWhatIsTheWeatherIntroMessage',
                value: 'callWhatIsTheWeatherIntroMessage',
              },
              {
                type: 'button',
                text: '알람 설정',
                style: 'danger',
                action_type: 'submit_action',
                action_name: 'callSetAlarmIntroMessage',
                value: 'callSetAlarmIntroMessage',
              },
            ],
          },
        ],
      }),
    ),
  ]);

  // 응답값은 자유롭게 작성하셔도 됩니다.
  res.json({
    userList,
    conversationList,
    messageList,
  });
});

module.exports = router;
