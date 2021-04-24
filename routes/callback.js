const express = require('express');
const router = express.Router();

const { detail, update } = require('../controller/users');
const messages = require('../libs/kakaoWork/messages');

router.post('/', async (req, res, next) => {
  const { message, actions, react_user_id, action_time, value } = req.body; // 설문조사 결과 확인 (2)
  const { conversation_id: conversationId } = message;
  const user = await detail(react_user_id);

  switch (value) {
    default:
  }
  res.json({ result: true });
});

module.exports = router;
