const { getCityData } = require('../../getData');

exports.sendCitySettingModal = (res) => {
  const cityData = getCityData();

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
          options: cityData.map(({ kor }) => ({
            text: kor,
            value: kor,
          })),
          placeholder: '도시를 선택해 주세요.',
        },
      ],
    },
  });
};
