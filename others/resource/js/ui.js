import {setUi} from "./lib.js";
import {gauge} from "/resource/js/gauge.js";
/*임시 데이터 테스트 후 삭제 해주세요 */
const jsonData =
    [
        [
            {name:'색소침착',rank:'81등',gauge:19,level:3},
            {name:'피부노화',rank:'76등',gauge:24,level:3},
            {name:'기미/주근깨',rank:'70등',gauge:30,level:2},
            {name:'여드름 발생',rank:'60등',gauge:40,level:2},
            {name:'튼살/각질',rank:'52등',gauge:48,level:2},
            {name:'칼슘',rank:'48등',gauge:52,level:2},

            {name:'남성형 탈모',rank:'44등',gauge:56,level:2},
            {name:'모발굵기',rank:'38등',gauge:62,level:2},
            {name:'원형 탈모',rank:'36등',gauge:64,level:2},
            {name:'새치',rank:'34등',gauge:66,level:2},           
        ],
        [
            {name:'베타민',rank:'20등',gauge:80,level:1},
            {name:'글루타치온',rank:'76등',gauge:24,level:3},
            {name:'마그네슘',rank:'70등',gauge:30,level:2},
            {name:'셀레늄',rank:'60등',gauge:40,level:2},
            {name:'비타민 E',rank:'42등',gauge:58,level:2},
            {name:'칼슘',rank:'48등',gauge:52,level:2},
            {name:'타이로신',rank:'44등',gauge:56,level:2},
            {name:'비타민 D',rank:'38등',gauge:62,level:2},
            {name:'아르기닌',rank:'36등',gauge:64,level:2},
            {name:'루테인&지아잔틴',rank:'34등',gauge:66,level:2},
            {name:'철',rank:'33등',gauge:67,level:2},
            {name:'비타민 A',rank:'32등',gauge:68,level:2},
            {name:'비타민 B12',rank:'27등',gauge:73,level:1},
            {name:'비타민 K',rank:'18등',gauge:82,level:1},
            {name:'아연',rank:'12등',gauge:88,level:1},
            {name:'지방산',rank:'12등',gauge:88,level:1},
            {name:'비타민 C',rank:'7등',gauge:93,level:1},
            {name:'칼륨',rank:'1등',gauge:100,level:1},
            {name:'코엔자임Q10',rank:'1등',gauge:100,level:1},
            {name:'비타민 B6',rank:'1등',gauge:100,level:1}
        ],
        [
            {name:'근력운동적합성',rank:'20등',gauge:80,level:1},
            {name:'유산소운동적합성',rank:'66등',gauge:34,level:3},
            {name:'지구력운동적합성',rank:'70등',gauge:30,level:2},
            {name:'근육발달능력',rank:'70등',gauge:30,level:2},
            {name:'단거지 질주 능력',rank:'42등',gauge:58,level:2},
            {name:'발목부상 위험도',rank:'48등',gauge:52,level:2},
            {name:'악력',rank:'44등',gauge:56,level:2},
            {name:'운동 후 회복능력',rank:'38등',gauge:62,level:2},           
        ],
        [
            {name:'중성지방농도',rank:'20등',gauge:80,level:1},
            {name:'체질량지수',rank:'76등',gauge:24,level:3},
            {name:'LDL 콜레스테롤',rank:'50등',gauge:50,level:2},
            {name:'혈당',rank:'60등',gauge:40,level:2},
            {name:'수축기 혈압',rank:'42등',gauge:58,level:2},
            {name:'비만',rank:'48등',gauge:52,level:2},
            {name:'멀미',rank:'44등',gauge:56,level:2},
            {name:'골질량',rank:'38등',gauge:62,level:2},
            {name:'퇴행성 관절염증',rank:'36등',gauge:64,level:2},
            {name:'요산치',rank:'34등',gauge:66,level:2},
            {name:'체지방률',rank:'33등',gauge:67,level:2},
            {name:'복부비만',rank:'32등',gauge:68,level:2},
            {name:'체중감략효과',rank:'27등',gauge:73,level:1},
            {name:'요요가능성',rank:'18등',gauge:82,level:1},           
        ],
        [
            {name:'와인선도로',rank:'20등',gauge:80,level:1},
            {name:'카페인 대사',rank:'76등',gauge:24,level:3},
            {name:'알코올 대사',rank:'1등',gauge:99,level:1},
            {name:'알코올 의존성',rank:'60등',gauge:40,level:2},
            {name:'알코올 홍조',rank:'42등',gauge:58,level:2},
            {name:'니코틴 대사',rank:'48등',gauge:52,level:2},
            {name:'니코틴 의존성',rank:'54등',gauge:46,level:2},
            {name:'카페인 의존성',rank:'38등',gauge:62,level:2},
            {name:'불면증',rank:'36등',gauge:64,level:2},
            {name:'아침형저녁형인간',rank:'34등',gauge:66,level:2},
            {name:'수면습관',rank:'33등',gauge:67,level:2},
            {name:'통증 민감성',rank:'32등',gauge:68,level:2},
            {name:'코골이',rank:'27등',gauge:73,level:1},               
        ],
        [
            {name:'식용',rank:'20등',gauge:80,level:1},
            {name:'포만감',rank:'76등',gauge:24,level:3},
            {name:'단맛 민감도',rank:'1등',gauge:99,level:1},
            {name:'쓴맛 민감도',rank:'60등',gauge:40,level:2},
            {name:'짠맛 민감도',rank:'42등',gauge:58,level:2},              
        ],
       
    ];

window.onload = function(){


    setUi.init();
    setEvent.init();
    msg.init();


    if(document.querySelector('.gauge-box')) {
        gauge.init();/*초기화*/
        gauge.setData(jsonData[0]);/*데이터 데입*/
        gauge.render();/*랜더*/
    }

}
const setEvent = {
    init :function(){
        const event = document.querySelectorAll('[data-event]');
        event.forEach((item)=>{
            if(!item.dataset.event)return false;
            item.addEventListener('click',(e)=>{
                e.preventDefault();
                this['event_'+item.dataset.event](item.dataset);
            })
        })

        if(document.querySelector('.sort-button')){
            document.querySelectorAll("input[name=sort]").forEach((button)=>{
                button.addEventListener('click',(e)=>{
                    gauge.setSort(button.value)
                    gauge.render();/*랜더*/
                })
            })

        }

        if(document.querySelector('.ajax-tab')){
            document.querySelectorAll('.ajax-tab').forEach((tab)=>{
                tab.querySelectorAll(".tab-item").forEach((button)=>{
                    button.addEventListener('click',(e)=>{
                        tab.querySelectorAll(".tab-item").forEach((b)=>{
                            if(button===b) {
                                b.classList.add('active');
                                /*데이터 다시 랜더 입시 데이터로 처리 했습니다*/
                                gauge.setData(jsonData[b.dataset.db]);
                                gauge.render();
                            }else{
                                b.classList.remove('active');
                            }
                        })
                    })
                })
            })
        }


    },
    event_popup : function({target,action}){
        if(!setUi.popup[action])return false;
        setUi.popup[action](target);
    },
    event_survey : function({action}){
        /*문진 처리 하시면 될 것 같습니다*/

        const form = document.querySelector('.survey-form-box');
        switch (action){
            // case 'next':
            //     if(form.querySelectorAll('.question-box')[form.dataset.question-1].querySelectorAll('.input-box > input:checked').length > 0){
            //         /*다음 문항으로*/
            //         setUi.survey.next();
            //     }else{
            //         /*선택이 없으면 메시지창 호출 이 부분은 기획에 없으나 혹시 몰라서 넣었습니다 필요 없으시면 빼주세요 */
            //         msg.open({msg:'답변을 선택해주세요.'})
            //     }

            //     break;
            // case 'prev':
            //     setUi.survey.prev();
            //     break;
            case 'save':
                console.log('ui.js 내 저장로그');
                // setUi.survey.reset();/*입력 값 초기화*/
                break;
        }
    }
}

const msg ={
    init : function(){
        if(document.querySelector('.alert-layer')){
            this.layer = document.querySelector('.alert-layer');
        }
    },
    open:function({title,msg}){
        if(!msg || typeof msg !=="string")return false;
        if(title)this.layer.querySelector('.layer-title').innerHTML=title;
        if(msg)this.layer.querySelector('.layer-content').innerHTML=msg;
        setUi.popup.open(this.layer);
    }
}

/*
* 팝업 오픈 스크립트
* 열기 : setUi.popup.open(target String or Object,fn function);
* 닫기 : setUi.popup.close(target String or Object,fn function);
*
* 문진 문항 변경 스크립트
* 다음 :  setUi.survey.next(fn function);
* 이전 :  setUi.survey.prev(fn function);
* 초기화 :  setUi.survey.reset(fn function);
* *
* alert 커스텀
* 호출 :   msg.open({title: string msg: string 필수});
* */


/* *
* 출력물 스타일은 print.css로 처리 했습니다
* 출력 내용 확인 용으로 스크립트 추가 하였습니다.
* 데이터 처리 방식에 따라서 이 부분은 댜시 스크립트를 제작하셔야 할 것 같습니다.
* report_print
* 호출 :   report_print(파일명);
* report_print('print001');
* */

/*출력 함수*/

function report_print (page){
    const printWindow=window.open('/'+page+'.html','','width=820px,height=1100px');
    printWindow.print();
    printWindow.onafterprint = function () { //프린터 출력 후 이벤트
        printWindow.close();
    }
}

