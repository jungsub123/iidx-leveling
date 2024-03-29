# iidx-leveling
iidx 곡들의 난이도를 측정하는 코드

이 코드는 KONAMI e-AMUSEMENT PASS의 PASELI 서비스가 필요하며 과도한 홈페이지 트래픽 사용으로 인해 온라인 혹은 오프라인 상으로 제제가 발생할 수 있으며 거기에대한 책임은 지지 않습니다.

## 환경
이 코드는 mysql, json 뷰어, 웹브라우저(Google Chrome 권장)가 필요합니다.

## 과정
 1. iidx 플레이어의 플레이 기록을 [공식 홈페이지](https://p.eagate.573.jp/game/2dx/26/top/index.html) 를 통해 크롤링하여 얻어온다. (playdata/playdata.js 이용)
 
    1.1. 구글 크롬 주소창에
    javascript:(!function(){var  s=document.createElement("script");s.id="iidxme";s.type="text/javascript";s.src="http://localhost/test.js";document.head.appendChild(s);}());
  
 2. 플레이어들의 플레이 기록을 통하여 해당 유저의 실력을 측정합니다. 현재는 플레이어가 클리어한 곡들 중 가장 어려운 10곡을 선택하여 클리어 한 곡 난이도의 평균으로 플레이어 실력을 측정하였습니다. 처음 시작시 곡 난이도는 클리어 레이트를 기반으로 측정하였습니다. 측정된 값을 score 라고 부릅니다. (skill.js 이용)
 3. 곡의 난이도를 측정합니다. 방법은 해당 곡의 클리어자들의 score 평균으로 곡 난이도를 측정합니다. (songdiff.js 이용)
 4. 2~3의 내용을 반복하면 곡 난이도가 점점 수렴합니다.

 **2~3의 과정에서 값이 한쪽으로 치우치는 현상을 막기위해 correction.js 를 이용하여 값을 보정시켜줍니다.**

## 결과
![결과 서열표](/img/result.png)
