# scroll_detect
해당 영역에 스크롤 도달 시 콜백 실행하는 스크롤 감지 코드 [2018]

일반적으로 section들에 scroll 도달 시 이벤트를 터트리는 기능들은 있었지만
position:sticky로 설정한 section들에도 정확한 scroll 감지를 위해 개발하였습니다.
position:sticky는 눈에 보이는 영역의 높이는 height:100vh/100%이지만 실제 영역의 높이는 100vh보다 큰 경우가 많기 때문에 
scroll 감지에 있어 어려운 부분들이 있어 일반적인 scroll 관련 플러그인을 사용하는 것에 불편함이 있어 직접 만들게 되었습니다.

## 사용법
scroll_detect.js 를 import 합니다.

## 호출 코드
```
scrollDetect.init([{
  ele: selector,
   type: "sticky" / "common",  sticky는 position:sticky 일 때 스크롤 감지, common은 일반 스크롤 감지
   duration: 숫자 / "winH*0.5/다른 숫자",           "winH" 들어오면 windowHeight 기준으로 계산 
   callback:function(){
      콜백함수
   }
}]
```   
- ele: jquery selector object 
- type
  - sticky: position:sticky를 사용한 영역일 때 설정 (눈에 보이는 영역의 높이와 실제 영역의 높이가 다른 경우)
  - common: 일반적인 영역 
- duration: scroll 오차 범위 
  - 숫자: 단위는 px
  - "winH": 윈도우 높이 값을 넣음.  ex) "winH*0.5", "winH/3" 의 형태도 가능
- callback: 스크롤 감지되었을 때 실행될 callback 
