<h1 align=center>
  <img src="https://github.com/whddk4415/blackjack-chat-bot/blob/main/arts/blackjack-logo.jpg"><br/><br/>
  <a>SWM 날씨 챗봇 🌨</a>
</h1>
<p align=center>
  <img src="https://img.shields.io/badge/github-GIVEME--STAR-yellow"><br/><br/>
</p>

<p align=center>
  SW Maestro 12 mini project Team Blackjack🃏<br/><br/>
  사용자가 자신이 살고 있는 도시를 선택하면 현재 날씨, 오늘 날씨 정보를 알려주고, 이에 따른 그 날의 옷차림을 추천해줍니다. 또한, 사용자의 설정에 따라 오늘 날씨, 비 오는지 여부, 미세먼지 정보를 매일 아침 7시마다 메시지로 알려줍니다.<br/><br/>
</p>

## Features

<img src="https://github.com/whddk4415/blackjack-chat-bot/blob/main/arts/features-1-intro.gif" align="right" width="30%">
<br/><br/><br/><br/><br/><br/>
<h3>1. Intro</h3>
<ul>
  <li>도시 설정을 우선적으로 해야합니다. (초기에 도시 설정이 되어있지 않을 때는 어떤 버튼을 눌러도 도시 설정 modal이 뜨게 설정했습니다.)</li>
  <li>도시 설정이 완료되었을 경우 날씨 어때, 알람 설정, 도시 재설정 기능을 사용 가능합니다.</li>
  <li>도시는 최대 30개 정도 modal select list에 들어가므로 광역시+제주시 중에서만 선택할 수 있습니다.</li>
</ul>
<br/><br/><br/><br/><br/><br/><br/><br/>

<img src="https://github.com/whddk4415/blackjack-chat-bot/blob/main/arts/features-2-weather.gif" align="right" width="30%">
<br/><br/><br/><br/><br/>
<h3>2. 날씨 어때</h3>
<ul>
  <li>현재 날씨와 오늘 날씨를 선택할 수 있습니다.</li>
  <li>현재 날씨는 현재 온도와 체감 온도, 미세먼지, 초미세먼지가 나오고 체감온도에 따른 옷차림이 나옵니다.</li>
  <li>오늘 날씨는 오늘 최고, 최저 온도, 체감온도, 미세먼지, 초미세먼지, 체감온도에 따른 옷차림이 나옵니다.</li>
  <li>홈 버튼을 눌러 intro 메세지를 다시 띄울 수 있습니다.</li>
</ul>
<br/><br/><br/><br/><br/><br/><br/><br/>

<img src="https://github.com/whddk4415/blackjack-chat-bot/blob/main/arts/features-3-alarm.gif" align="right" width="30%">
<br/><br/><br/><br/><br/>
<h3>3. 알람 설정</h3>
<ul>
  <li>매일 아침 7시마다 오늘 날씨, 비 오는지 여부, 미세먼지 알람 메세지를 받을지 말지 ON/OFF로 설정할 수 있습니다.</li>
  <li>메시지에 OFF로 나와있을 때 버튼을 클릭할 경우 알람이 해제되고, ON이 나와있을 때 버튼을 클릭한 경우 알람이 설정됩니다.</li>
  <li>마찬가지로 홈 버튼을 누르면 intro 메시지를 다시 띄울 수 있습니다.</li>
</ul>
<br/><br/><br/><br/><br/><br/><br/><br/><br/>

<table style="table-layout: fixed; overflow-wrap: break-word;">
    <tr>
      <h3 align=left>3-1. 알람 메시지 예시들</h3><br/>
    </tr>
    <tr>
      <td rowspan="2" style="vertical-align: middle;"><img width="400" src="https://github.com/whddk4415/blackjack-chat-bot/blob/main/arts/features-3-1.png" style="max-width: 100%;" /></td>
      <td rowspan="1" style="vertical-align: middle;"><img width="400" src="https://github.com/whddk4415/blackjack-chat-bot/blob/main/arts/features-3-2-1.png" style="max-width: 100%;" /></td>
      <td rowspan="2" style="vertical-align: middle;"><img width="400" src="https://github.com/whddk4415/blackjack-chat-bot/blob/main/arts/features-3-3.png" style="max-width: 100%;" /></td>
    </tr>
    <tr>
      <td rowspan="1" style="vertical-align: middle;"><img width="400" src="https://github.com/whddk4415/blackjack-chat-bot/blob/main/arts/features-3-2-2.png" style="max-width: 100%;" /></td>
    </tr>
</table>

<br/><br/>

## Development Environment
- Node.js @14.16.1
- Express @4.15.5
- MongoDB @4.0.24
- goormIDE (Ubuntu 18.04 LTS)

<br/>

## APIs
- Current & Forecast weather data collection - One Call API (API doc: https://openweathermap.org/api/one-call-api)
- Other weather API’s collection - Air Pollution API (API doc: https://openweathermap.org/api/air-pollution)

<br/>

## Contributors & Roles
**이종아(팀장)** (GitHub: https://github.com/whddk4415)<br/>
**강하림** (GitHub: https://github.com/harimkang)<br/>
**김기완** (Github: https://github.com/kiwan97)<br/>
**김명기** (Github: https://github.com/riroan)<br/>
**박상욱** (Github: https://github.com/whoisStarBox)<br/>
**박효진** (Github: https://github.com/gywlsp)<br/>

<br/>

☀️ **날씨 정보 파트 - 김명기, 강하림**
* 기온, 미세먼지 농도 받아오는 api 선정
* 기온 체감온도로 변환

💾 **DB 파트 - 박상욱, 김기완**
* 모델 설계
* CRUD

💻 **백엔드 파트 - 이종아, 박효진**

<br/>

## License
This project is licensed under the terms of the MIT license.
