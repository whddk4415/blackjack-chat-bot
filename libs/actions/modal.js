const fs = require('fs');
// 파일 읽기
const city_data = fs
  .readFileSync('kor_city.txt', 'utf8')
  .split('\n')
  .map((v) => {
    const [kor, eng, lat, lon] = v.replace('\r', '').split(' ');
    // 각 요소별 object를 만듦
    return {
      kor,
      eng,
      lat,
      lon,
    };
  });

exports.sendCitySettingModal = (res) => {
  return res.json({
    view: {
      title: '도시 설정',
      accept: '설정',
      decline: '취소',
      value: 'callCitySetResultMessage',
      blocks: [
        {
          type: 'label',
          text: '도시 설정',
          markdown: true,
        },
        {
          type: 'select',
          name: 'selectedCity',
          required: true,
          options: city_data.map(({ kor }) => ({
            text: kor,
            value: kor,
          })),
          placeholder: '도시를 선택해 주세요.',
        },
      ],
    },
  });
};
