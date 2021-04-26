const Config = require('config');
const axios = require('axios');

const getCityData = () => {
  const fs = require('fs');
  // 파일 읽기
  const cityData = fs
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

  return cityData;
};

exports.getCityData = getCityData;

exports.getWeather = async (local) => {
  const cityData = getCityData();
  const { lat, lon } = cityData.find((city) => city.kor == local);

  if (lat == 0 && lon == 0) {
    console.log('유효하지 않은 지명입니다.');
    return false;
  }

  const { key } = Config.keys.weather;

  // 날씨 api
  const temp_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${key}`;
  // 미세먼지 api
  const pol_url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`;

  const { current, daily } = (await axios.get(temp_url)).data;
  const { components: pol_data } = (await axios.get(pol_url)).data.list[0];
  const today = daily[0];

  //현재
  const { temp, feels_like } = current;
  //오늘
  const { min: temp_min, max: temp_max } = today.temp;
  const { day, night, eve, morn } = today.feels_like;
  const rain = today.rain || 0;

  const today_feels_like = parseFloat(
    ((day + night + eve + morn) / 4).toFixed(2),
  );
  const { pm2_5, pm10 } = pol_data;

  let pm10_status = '좋음';
  let pm2_5_status = '좋음';

  if (30 < pm10 && pm10 <= 80) {
    pm10_status = '보통';
  } else if (80 < pm10 && pm10 <= 150) {
    pm10_status = '나쁨';
  } else if (150 < pm10) {
    pm10_status = '매우나쁨';
  }

  if (15 < pm2_5 && pm2_5 <= 50) {
    pm2_5_status = '보통';
  } else if (50 < pm2_5 && pm2_5 <= 100) {
    pm2_5_status = '나쁨';
  } else if (100 < pm2_5) {
    pm2_5_status = '매우나쁨';
  }

  return {
    temp, // 현재온도(C)
    temp_min, // 해당 도시에서 최저온도(C)
    temp_max, // 해당 도시에서 최고온도(C)
    today_feels_like,
    feels_like, // 체감온도(C)
    pm2_5_status, // 초미세먼지(μg/m3)
    pm10_status, // 미세먼지(μg/m3)
    is_rainy: rain > 0, // 오늘 비가 오는지 여부
    img: 'http://openweathermap.org/img/w/' + current.weather[0].icon + '.png', // 날씨 아이콘
  };
};

exports.getClothes = function (temp) {
  if (isNaN(temp)) {
    console.error('체감온도의 타입이 적절치 않습니다');
    return false;
  }
  temp = parseFloat(temp);

  const clothes = {
    text: [],
    img: '',
  };
  if (temp >= 28) {
    clothes.text = ['민소매', '반팔', '반바지', '원피스'];
    clothes.img =
      'https://user-images.githubusercontent.com/47051596/116029537-87e16b80-a694-11eb-9cb9-60c7e5b31e51.JPG';
  } else if (temp >= 23) {
    clothes.text = ['반팔', '얇은 셔츠', '반바지', '면바지'];
    clothes.img =
      'https://user-images.githubusercontent.com/47051596/116029544-89ab2f00-a694-11eb-95ce-c0ed9c68f9af.JPG';
  } else if (temp >= 20) {
    clothes.text = ['얇은 가디건', '긴팔', '면바지', '청바지'];
    clothes.img =
      'https://user-images.githubusercontent.com/47051596/116029546-89ab2f00-a694-11eb-9b68-15d44065655d.JPG';
  } else if (temp >= 17) {
    clothes.text = ['얇은 니트', '맨투맨', '가디건', '청바지'];
    clothes.img =
      'https://user-images.githubusercontent.com/47051596/116029547-8a43c580-a694-11eb-9d4b-077c42dc53e6.JPG';
  } else if (temp >= 12) {
    clothes.text = ['자켓', '가디건', '야상', '스타킹', '청바지', '면바지'];
    clothes.img =
      'https://user-images.githubusercontent.com/47051596/116029549-8adc5c00-a694-11eb-877e-fe087e5a7cdb.JPG';
  } else if (temp >= 9) {
    clothes.text = ['자켓', '트랜치코트', '야상', '니트', '청바지', '스타킹'];
    clothes.img =
      'https://user-images.githubusercontent.com/47051596/116029550-8b74f280-a694-11eb-8b72-be94f43a7c3f.JPG';
  } else if (temp >= 5) {
    clothes.text = ['코트', '가죽자켓', '히트텍', '니트', '레깅스'];
    clothes.img =
      'https://user-images.githubusercontent.com/47051596/116029552-8c0d8900-a694-11eb-9c13-b59356e3d6bc.JPG';
  } else {
    clothes.text = ['패딩', '두꺼운코트', '목도리', '기모제품'];
    clothes.img =
      'https://user-images.githubusercontent.com/47051596/116029553-8c0d8900-a694-11eb-9c10-93c2e45095fe.JPG';
  }

  return clothes;
};
