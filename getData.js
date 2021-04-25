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

exports.get = async (local)=>{
	var lat, lon;
	// local이 
	for (var city of city_data){
		if (city["kor"] == local){
			lat = city["lat"];
			lon = city["lon"];
		}
	}
	const key = "dfc11afdacf7e5d8019f61313ae5a2ff";
	// 날씨 api
	var temp_url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+key;
	// 미세먼지 api
	var pol_url = "http://api.openweathermap.org/data/2.5/air_pollution?lat="+lat+"&lon="+lon+"&appid="+key;
	
	const axios = require("axios");

	async function getData(url){
	    const response = await axios.get(url);
		return response.data;
	}

	var temp_data = await getData(temp_url);
	var pol_data = await getData(pol_url);
	pol_data = pol_data["list"][0]["components"];
	
	var rain = 0;
	
	// 최근 1시간 강우량을 mm단위로 나타냄
	// 비가 안올경우 접근에러를 내기 때문에 예외처리
	try {
		rain = temp_data["rain"]["1h"];
	}catch{
		rain = 0;
	}
		
	var K2C = 273.15;
	var v = temp_data["wind"]["speed"];
	var t = temp_data["main"]["temp"]-K2C;
	
	// 체감온도 구하는식
	var temp_per = 33 - 0.045*(10.45 + 10 * v**0.5-v)*(33-t);
	var obj = {
		"temp" : Math.round((temp_data["main"]["temp"] - K2C)*10)/10,		// 현재온도(C)
		"temp_min" : Math.round((temp_data["main"]["temp_min"] - K2C)*10)/10,	// 해당 도시에서 최저온도(C)
		"temp_max" : Math.round((temp_data["main"]["temp_max"] - K2C)*10)/10,	// 해당 도시에서 최고온도(C)
		"temp_per" : Math.round(temp_per*10)/10,							// 체감온도(C)
		"pressure" : temp_data["main"]["pressure"],		// 기압(hPa)
		"humidity" : temp_data["main"]["humidity"],		// 습도(%)
		"visibility" : temp_data["visibility"],			// 가시거리(m)
		"wind_speed" : temp_data["wind"]["speed"],		// 풍속(m/s)
		"wind_degree" : temp_data["wind"]["deg"],		// 풍향(degree)
		"pm2_5" : pol_data["pm2_5"],					// 초미세먼지(μg/m3)
		"pm10" : pol_data["pm10"],		// 미세먼지(μg/m3)
		"co" : pol_data["co"],			// 일산화탄소(μg/m3)
		"no" : pol_data["no"],			// 일산화질소(μg/m3)
		"no2" : pol_data["no2"],		// 아산화질소(μg/m3)
		"o3" : pol_data["o3"],			// 오존(μg/m3)
		"so2":pol_data["so2"],			// 이산화 황(μg/m3)
		"rain":rain,			// 최근 1시간 강수량(mm)
		"img":"http://openweathermap.org/img/w/"+temp_data["weather"][0].icon+".png"
	};
	console.log(obj);
	return obj;
}