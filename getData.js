var fs = require("fs");
// 파일 읽기
var city_data = fs.readFileSync("kor_city.txt","utf8");
// 엔터 삭제
city_data = city_data.split("\n");
for (var i in city_data) {
	// 이스케이프 문자 삭제
	city_data[i] = city_data[i].replace("\r","");
	// 공백으로 나눔
	city_data[i] = city_data[i].split(" ");
	// 각 요소별 object를 만듬
	city_data[i] = {
		"kor" : city_data[i][0],
		"eng" : city_data[i][1],
		"lat" : city_data[i][2],
		"lon" : city_data[i][3]
	};
}

exports.getWeather = async (local)=>{
	var lat=0, lon=0;
	for (var city of city_data){
		if (city["kor"] == local){
			lat = city["lat"];
			lon = city["lon"];
		}
	}
	if (lat == 0 && lon== 0 ){
		console.log("유효하지 않은 지명입니다.");
		return false;
	}
	const Config = require('config');
	const key = `${Config.keys.weather.key}`;
	// 날씨 api
	var temp_url = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=metric&exclude=minutely&appid="+key;
	// 미세먼지 api
	var pol_url = "http://api.openweathermap.org/data/2.5/air_pollution?lat="+lat+"&lon="+lon+"&appid="+key;
	
	const axios = require("axios");

	async function getData(url){
	    const response = await axios.get(url);
		return response.data;
	}

	var data = await getData(temp_url);
	var pol_data = await getData(pol_url);
	var temp_data = data["current"];	// 현재 날씨
	pol_data = pol_data["list"][0]["components"];	// 오늘의 오염 정보
	
	var rain = 0;
	
	// 비가 안올경우 접근에러를 내기 때문에 예외처리
	try {
		rain = data.daily[0]["rain"];
	}catch{
		rain = 0;
	}
		
	var obj = {
		"temp" : Math.round((temp_data["temp"])*10)/10,		// 현재온도(C)
		"feels_like" : Math.round(temp_data["feels_like"]*10)/10,	// 체감온도(C)
		"pressure" : temp_data["pressure"],			// 기압(hPa)
		"humidity" : temp_data["humidity"],			// 습도(%)
		"visibility" : temp_data["visibility"],		// 가시거리(m)
		"wind_speed" : temp_data["wind_speed"],		// 풍속(m/s)
		"wind_degree" : temp_data["wind_deg"],		// 풍향(degree)
		"pm2_5" : pol_data["pm2_5"],					// 초미세먼지(μg/m3)
		"pm10" : pol_data["pm10"],		// 미세먼지(μg/m3)
		"co" : pol_data["co"],			// 일산화탄소(μg/m3)
		"no" : pol_data["no"],			// 일산화질소(μg/m3)
		"no2" : pol_data["no2"],		// 아산화질소(μg/m3)
		"o3" : pol_data["o3"],			// 오존(μg/m3)
		"so2":pol_data["so2"],			// 이산화 황(μg/m3)
		"isRain":rain > 0,				// 오늘 비가 오는지 여부
		"img":"http://openweathermap.org/img/w/"+temp_data["weather"][0].icon+".png"		// 날씨 아이콘
	};
	return obj;
}

exports.getClothes = function (temp) {
	
	if (isNaN(temp)){
		console.error('체감온도의 타입이 적절치 않습니다');
		return false;
	}
	temp = parseFloat(temp);
	
	var clothes = [];
	if (temp >= 28){
		clothes = ["민소매", "반팔", "반바지", "원피스"];
	}
	else if (temp >= 23){
		clothes = ["반팔", "얇은 셔츠", "반바지", "면바지"];
	}
	else if (temp >= 20){
		clothes = ["얇은 가디건", "긴팔", "면바지", "청바지"];
	}
	else if (temp >= 17){
		clothes = ["얇은 니트", "맨투맨", "가디건", "청바지"];
	}
	else if (temp >= 12){
		clothes = ["자켓", "가디건", "야상", "스타킹", "청바지", "면바지"];
	}
	else if (temp >=9){
		clothes = ["자켓", "트랜치코트", "야상", "니트", "청바지", "스타킹"];
	}
	else if (temp >= 5){
		clothes = ["코트", "가죽자켓", "히트텍", "니트", "레깅스"];
	}
	else {
		clothes = ["패딩", "두꺼운코트", "목도리", "기모제품"];
	}
	
	return clothes;
}