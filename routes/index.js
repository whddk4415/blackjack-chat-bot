const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  res.json({});
});

// routes/index.js
router.post('/request', async (req, res, next) => {
  const { value } = req.body;
  switch (value) {
    case 'value':
      break;
    default:
  }
  res.json({});
});

router.post('/callback', async (req, res, next) => {
  const { message, actions, action_time, value } = req.body; // 설문조사 결과 확인 (2)

  switch (value) {
    case 'value':
      break;
    default:
  }
  res.json({ result: true });
});
module.exports = router;