// libs/kakaoWork/index.js
const Config = require('config');
const axios = require('axios');

exports.kakaoInstance = axios.create({
  baseURL: 'https://api.kakaowork.com',
  headers: {
    Authorization: `Bearer ${Config.keys.kakaoWork.bot}`,
  },
});
