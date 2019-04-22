// 스크롤 감지 플러그인
/* 
 * scroll event는 한번만 호출
 * callback parameter - scrollDir: scroll direction, v.rate: scroll rate
 * 호출 형태
    scroll event는 한번만 호출
   parameter: [{
     ele: selector,
     type: "sticky" / "common",  sticky는 position:sticky 일 때 스크롤 감지, common은 일반 스크롤 감지
     duration: 숫자 / "winH*0.5/다른 숫자",           "winH" 들어오면 windowHeight 기준으로 계산 
     callback:function(){
        콜백함수
     }
   }]
*/

var scrollDetect = (function() {
    var arr = [],
        secInfo = [], // 영역별 offset.top, height 정보 저장 배열 
        type = "", // scroll type. sticky는 ele offset.top에 도달하면 모션 실행, common 은 ele offset.top에서 dur 빼서 도달 전에 모션 실행하도록
        winH = $(window).height();

    var init = function(array) {
        var sTop = 0,
            prevStop = 0;
        arr = array;
        _setting();

        $(window).on({
            "resize": function() {
                winH = $(window).height();
                _setting();
            },
            "scroll": function() {
                sTop = $(window).scrollTop();
                scrollDir = sTop >= prevStop ? "down" : "up";

                secInfo.forEach(function(v, i) {
                    if (v.sStart <= sTop && sTop <= v.sEnd) {
                        if (v.type === "sticky") { // sticky 이면서 duration있을 때 - 영역도달 전부터 모션 시작하고 싶을 때
                            if (v.duration > 0) {
                                v.rate = Math.abs(sTop - (v.offTop - v.duration)) / (v.h + v.duration) / v.maxRate;
                                v.rate = v.rate > 0.98 ? 1 : v.rate;
                            } else {
                                v.rate = (sTop - v.offTop) / v.h / v.maxRate;
                                v.rate = v.rate > 0.98 ? 1 : v.rate;
                            }
                        } else {
                            v.rate = (sTop - v.offTop) / v.h / v.maxRate;
                            v.rate = v.rate > 0.98 ? 1 : v.rate;
                        }
                        //console.log(v.rate)

                        if (v.callback != undefined) {
                            v.callback(scrollDir, v.rate);
                        }
                    }
                });

                prevStop = sTop;
            }
        });
    };

    var _setting = function() {
        arr.forEach(function(v, i) {
            secInfo[i] = {
                ele: v.ele,
                offTop: v.ele.offset().top,
                h: v.ele.height(),
                type: v.type,
                callback: v.callback
            };

            if (typeof(v.duration) != "number") {
                var cal = Number(v.duration.split("*")[1]);
                dur = winH * cal;
            } else {
                dur = v.duration;
            }

            var offTop = secInfo[i].offTop,
                h = secInfo[i].h,
                sStart = offTop - dur,
                sEnd = (secInfo[i].type === "sticky") ? offTop + h - winH : offTop + h - dur,
                maxRate = (secInfo[i].type === "sticky" && dur != 0) ? (sEnd - sStart) / (h + dur) : (sEnd - sStart) / h;

            secInfo[i].sStart = sStart;
            secInfo[i].sEnd = sEnd;
            secInfo[i].maxRate = maxRate;
            secInfo[i].duration = dur;
        });
    };

    return {
        init: init
    }
})();