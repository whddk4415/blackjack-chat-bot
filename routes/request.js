const express = require('express');
const router = express.Router();

const { sendCitySettingModal } = require('../libs/actions/modal');

router.post('/', async (req, res, next) => {
  const { value } = req.body;
  switch (value) {
    case 'callCitySettingModal':
      return sendCitySettingModal(res);
      break;
    case '':
      break;
    default:
  }

  res.json({});
});

module.exports = router;
