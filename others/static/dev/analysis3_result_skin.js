var ReservedCustom_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/progress_flg/';
var DirectCustom_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/direct/progress_flg/';
var Main_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/merged/list'; //방문회차 카운트
var SkinSurvey_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/svy/skin/';
var ResultSkinConcern_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/skin/concern/';
var MySKin_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/skin/myskin/';


const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
const surveyDate = moment().format('YYYY/MM/DD');

var first_s3_0 = 0; // 0.나이
var first_s3_1 = 0; // 1.자외선
var first_s3_2 = 0; // 2. 담배
var first_s3_3 = 0; // 3.스트레스
var first_s3_4 = 0; // 4 잠


var s3_0 = 0; // 0.나이
var s3_1 = 0; // 1.자외선
var s3_2 = 0; // 2. 담배
var s3_3 = 0; // 3.스트레스
var s3_4 = 0; // 4 잠

var dryness_score = -1; // 수분
var oiliness_score = -1; // 유분
var sensitivity_score = -1; //민감 (redness값)
var pigment_score = -1; // 색소침착
var elasticity_score = -1; //주름(탄력값)


$(document).ready(function () {
    window.scrollTo(0, 470);
    console.log('analysis3_result_skin page start -> ')

    //상담 완료가 아닐경우 (상담완료는 진행률 이미 100%)
    if (localStorage.getItem('progress_flg') !== '10') {
        //직접 방문 고객의 상담 진행률
        if (localStorage.getItem('visitkey') === '0') {
            console.log("직방 고객 상담 진행률 체크")
            $.ajax({
                url: DirectCustom_API_URL + localStorage.getItem('skey'),
                type: 'PATCH',
                data: JSON.stringify({ "progress_flg": "111" }), //마이스킨솔루션 진행중
                contentType: 'application/json',

                success: function (response) {
                    console.log('=====================');
                    console.log('마이스킨솔루션 인입 성공 : ', response);
                },

                error: function (xhr, status, error) {
                    console.error('마이스킨솔루션 인입 에러 : ', error);
                }
            })
        }
        //예약 방문 고객의 상담 진행률
        else if (localStorage.getItem('visitkey') !== '0') {
            console.log("예약 고객 상담 진행률 체크")
            $.ajax({
                url: ReservedCustom_API_URL + localStorage.getItem('visitkey') + '/' + localStorage.getItem('skey'),
                type: 'PATCH',
                data: JSON.stringify({ "progress_flg": "111" }), //마이스킨솔루션 진행중
                contentType: 'application/json',

                success: function (response) {
                    console.log('=====================');
                    console.log('마이스킨솔루션 인입 성공 : ', response);
                },

                error: function (xhr, status, error) {
                    console.error('마이스킨솔루션 인입 에러 : ', error);
                }
            })
        }
    }




    $('#visitDate').text(localStorage.getItem('visit_rsvn_date'));
    fnGetVisitCount();//방문회차 카운트 함수

    $('#manager_name').text(localStorage.getItem('manager_name'));
    $('#custom_name').text(localStorage.getItem('custom_name'));

    fnGetSkinSurvey(); //스킨 문진 
    fnGetResultSkinConcern(); // 현재점수  및 미래점수(초기)

    var real_age = localStorage.getItem('AgeReal');
    console.log('real_age : ', real_age);

    first_s3_0 = GetAgeArea(real_age);
    s3_0 = GetAgeArea(real_age);
    $('#lifestyle_age').text(s3_0);

});


/*
*
*24. 06. 14 방문회차 카운트 함수
*
*/

var fnGetVisitCount = function () {
    var visitCount = 0; //프로그램별 방문회차 카운트
    $.ajax({
        url: Main_API_URL + '?name=' + localStorage.getItem('custom_name') + '&phone=' + localStorage.getItem('custom_phone'),

        type: 'GET',
        success: function (response) {
            console.log('=====================');
            console.log('리스트 별 고객검색 결과 성공 : ', response);


            //프로그램별 방문회차 카운트 입력2 (같은날짜, 시간대 고려)
            var select_visit1_1 = 0 //다른날짜 - 마이스킨솔루션


            select_visit1_1 = response.filter(item => item.ProgramCode === "PC001013"
                && item.cancelYN !== "3"
                && localStorage.getItem('raw_rsvn_date') > item.rsvn_date).length;


            console.log("select_visit1_1 : ", select_visit1_1);


            var select_visit2_1 = 0 //같은날짜 - 마이스킨솔루션


            select_visit2_1 = response.filter(item => item.ProgramCode === "PC001013"
                && item.cancelYN !== "3"
                && localStorage.getItem('raw_rsvn_date') === item.rsvn_date
                && localStorage.getItem('raw_rsvn_time') >= item.rsvn_time).length;

            console.log("select_visit2_1 : ", select_visit2_1);

            visitCount = select_visit1_1 + select_visit2_1;
            console.log("방문 회차 : visitCount > ", visitCount);

            $('#visitCount').text(visitCount);

        },

        error: function (xhr, status, error) {
            console.error('리스트 별 고객검색 결과  에러 : ', error);
        }
    })


}





$('#diagnosisButton').click(function () {

    console.log("진단하기 버튼 클릭 : ");
    console.log('=====================');
    console.log('first_ 0. 나이 대 : ', first_s3_0);
    console.log('first_ 1.자외선 차단 s3_1 : ', first_s3_1);
    console.log('first_ 2.담배 s3_2 : ', first_s3_2);
    console.log('first_ 3.스트레스 s3_3 : ', first_s3_3);
    console.log('first_ 4.잠 s3_4 : ', first_s3_4);


    console.log('=====================');
    console.log('0. 나이 대 : ', s3_0);
    console.log('1.자외선 차단 s3_1 : ', s3_1);
    console.log('2.담배 s3_2 : ', s3_2);
    console.log('3.스트레스 s3_3 : ', s3_3);
    console.log('4.잠 s3_4 : ', s3_4);

    console.log('=====================');
    console.log('수분 dryness_score : ', dryness_score); // 수분
    console.log('유분 oiliness_score : ', oiliness_score); // 유분
    console.log('민감 sensitivity_score : ', sensitivity_score); //민감
    console.log('색소침착 pigment_score : ', pigment_score); // 색소침착
    console.log('탄력 elasticity_score : ', elasticity_score); // 탄력


    fnGetFutureScore(); //미래점수 가져오기 함수

})







// #1 라디오 버튼 클릭시, 데이터 값 저장

$('input[type="radio"]').on('change', function () {

    console.log('=====================');

    if ($('#age01').prop('checked')) {
        s3_0 = 20;
    } else if ($('#age02').prop('checked')) {
        s3_0 = 30;
    } else if ($('#age03').prop('checked')) {
        s3_0 = 40;
    } else if ($('#age04').prop('checked')) {
        s3_0 = 50;
    } else if ($('#age05').prop('checked')) {
        s3_0 = 60;
    } else if ($('#age06').prop('checked')) {
        s3_0 = 70;
    } else if ($('#age07').prop('checked')) {
        s3_0 = 80;
    } else if ($('#age08').prop('checked')) {
        s3_0 = 90;
    } else if ($('#age09').prop('checked')) {
        s3_0 = 100;
    }
    $('#lifestyle_age').text(s3_0);

    console.log('0. 나이 대 : ', s3_0);

    if ($('#uv01').prop('checked')) {
        s3_1 = 0;
    } else if ($('#uv02').prop('checked')) {
        s3_1 = 1;
    } else if ($('#uv03').prop('checked')) {
        s3_1 = 2;
    } else if ($('#uv04').prop('checked')) {
        s3_1 = 3;
    }
    console.log('1.자외선 차단 s3_1 : ', s3_1);


    if ($('#smoking01').prop('checked')) {
        s3_2 = 0;
    } else if ($('#smoking02').prop('checked')) {
        s3_2 = 1;
    } else if ($('#smoking03').prop('checked')) {
        s3_2 = 2;
    } else if ($('#smoking04').prop('checked')) {
        s3_2 = 3;
    }
    console.log('2.담배 s3_2 : ', s3_2);

    if ($('#stress01').prop('checked')) {
        s3_3 = 0;
    } else if ($('#stress02').prop('checked')) {
        s3_3 = 1;
    } else if ($('#stress03').prop('checked')) {
        s3_3 = 2;
    } else if ($('#stress04').prop('checked')) {
        s3_3 = 3;
    }
    console.log('3.스트레스 s3_3 : ', s3_3);

    if ($('#sleep01').prop('checked')) {
        s3_4 = 0;
    } else if ($('#sleep02').prop('checked')) {
        s3_4 = 1;
    } else if ($('#sleep03').prop('checked')) {
        s3_4 = 2;
    } else if ($('#sleep04').prop('checked')) {
        s3_4 = 3;
    }
    console.log('4.잠 s3_4 : ', s3_4);
});







// #2 피부 설문 값 가져오기
var fnGetSkinSurvey = function () {

    $.ajax({
        url: SkinSurvey_API_URL + '?surveyNo=' + localStorage.getItem('custom_surveyNo'),
        type: 'GET',

        success: function (response) {
            console.log("SkinSurvey_API_URL 응답값 : ", response);
            first_s3_1 = parseInt(response[0].s3_1);
            first_s3_2 = parseInt(response[0].s3_2);
            first_s3_3 = parseInt(response[0].s3_3);
            first_s3_4 = parseInt(response[0].s3_4);



            s3_1 = parseInt(response[0].s3_1);
            s3_2 = parseInt(response[0].s3_2);
            s3_3 = parseInt(response[0].s3_3);
            s3_4 = parseInt(response[0].s3_4);

            console.log('진짜 나이 : ', localStorage.getItem('AgeReal'));
            console.log('s3_1 : ', s3_1);
            console.log('s3_2 : ', s3_2);
            console.log('s3_3 : ', s3_3);
            console.log('s3_4 : ', s3_4);

            console.log('response.length : ', response.length);

            // .자외선 차단제
            if (s3_1 === 0) {
                $('#uv01').prop('checked', true);
            } else if (s3_1 === 1) {
                $('#uv02').prop('checked', true);
            } else if (s3_1 === 2) {
                $('#uv03').prop('checked', true);
            } else if (s3_1 === 3) {
                $('#uv04').prop('checked', true);
            }

            // 2.담배, 간접흡연
            if (s3_2 === 0) {
                $('#smoking01').prop('checked', true);
            } else if (s3_2 === 1) {
                $('#smoking02').prop('checked', true);
            } else if (s3_2 === 2) {
                $('#smoking03').prop('checked', true);
            } else if (s3_2 === 3) {
                $('#smoking04').prop('checked', true);
            }

            // 3.스트레스
            if (s3_3 === 0) {
                $('#stress01').prop('checked', true);
            } else if (s3_3 === 1) {
                $('#stress02').prop('checked', true);
            } else if (s3_3 === 2) {
                $('#stress03').prop('checked', true);
            } else if (s3_3 === 3) {
                $('#stress04').prop('checked', true);
            }

            // 4.잠
            if (s3_4 === 0) {
                $('#sleep01').prop('checked', true);
            } else if (s3_4 === 1) {
                $('#sleep02').prop('checked', true);
            } else if (s3_4 === 2) {
                $('#sleep03').prop('checked', true);
            } else if (s3_4 === 3) {
                $('#sleep04').prop('checked', true);
            }

        }, error: function (xhr, status, error) {
            console.error('SkinSurvey_API_URL 오류 : ', error);


        }
    })

}



// #3 현재점수 값 가져오기
var fnGetResultSkinConcern = function () {

    $.ajax({
        url: ResultSkinConcern_API_URL + '?surveyNo=' + localStorage.getItem('custom_surveyNo'),
        type: 'GET',

        success: function (response) {
            console.log("ResultSkinConcern_API_URL 응답값 : ", response);

            sensitivity_score = parseInt(response[0].redness); // 민감 (붉은기)
            pigment_score = parseInt(response[0].pigmentation); // 색소침착
            wrinkle_score = parseInt(response[0].wrinkle); // 주름
            elasticity_score = parseInt(response[0].elasticity); //탄력

            oiliness_score = parseInt(response[0].uZone_Oilskin); // 유분
            dryness_score = parseInt(response[0].uZone_Moisture); //수분


            // 값들을 배열로 만듦
            const values = [
                { name: '민감', score: sensitivity_score },
                { name: '색소침착', score: pigment_score },
                { name: '주름', score: wrinkle_score },
                { name: '유분', score: (oiliness_score * 100 / 40) },
                { name: '수분', score: (dryness_score * 100 / 60) }
            ];

            // 값을 점수(score) 기준으로 오름차순으로 정렬
            values.sort((a, b) => a.score - b.score);

            // 가장 낮은 값과 두 번째로 낮은 값을 가져옴
            const lowestValue = values[0].name;
            const secondLowestValue = values[1].name;

            // 해당 값을 <span> 요소의 텍스트로 넣어줌
            $('#Low_First').text(lowestValue);
            $('#Low_second').text(secondLowestValue);

            //방사형(레이더)차트 업데이트 (현재점수)
            updateRadarData(0, [(dryness_score * 100 / 60).toFixed(0), (oiliness_score * 100 / 40).toFixed(0), sensitivity_score, pigment_score, wrinkle_score]); //현재 피부 데이터 
            //막대(my)차트 업데이트 (현재점수)
            updateBarData(0, [(dryness_score * 100 / 60).toFixed(0), (oiliness_score * 100 / 40).toFixed(0), sensitivity_score, pigment_score, wrinkle_score]); //현재 피부 데이터 



            fnGetFutureScore_first(); // 미래점수(초기)



        }, error: function (xhr, status, error) {
            console.error('ResultSkinConcern_API_URL 오류 : ', error);


        }
    })


}


// #4 미래점수 값 가져오기
var fnGetFutureScore = function () {
    var ucstmid = localStorage.getItem('custom_ucstmid'); //운영
    // var ucstmid = 204677883 // 테스트


    //설문값 0이 존재하면 안되므로, +1씩 더하여줌 (그렇지않다(1) ~ 매우그렇다(4))
    var after_first_s3_1 = first_s3_1 + 1
    var after_first_s3_2 = first_s3_2 + 1
    var after_first_s3_3 = first_s3_3 + 1
    var after_first_s3_4 = first_s3_4 + 1

    var after_s3_1 = s3_1 + 1
    var after_s3_2 = s3_2 + 1
    var after_s3_3 = s3_3 + 1
    var after_s3_4 = s3_4 + 1

    //점수 초기값이 0이면 안됨 (범위 1 ~ 100)
    if (elasticity_score === 0) {
        elasticity_score += 1;
    }

    if (sensitivity_score === 0) {
        sensitivity_score += 1;
    }

    if (pigment_score === 0) {
        pigment_score += 1;
    }

    if (oiliness_score === 0) {
        oiliness_score += 1;
    }

    if (dryness_score === 0) {
        dryness_score += 1;
    }


    if (elasticity_score > 0 && sensitivity_score > 0 && pigment_score > 0 && oiliness_score > 0 && dryness_score >0) {

        $.ajax({
            //운영
            // url: `https://citylab.amorepacific.com/gpiopeApi/genoFuture?btCustIdNo=${ucstmid}&btCustIdNoClassifiCode=01&elasticity_score=${elasticity_score}&sensitivity_score=${sensitivity_score}&pigment_score=${pigment_score}&oiliness_score=${oiliness_score}&dryness_score=${dryness_score}&age=${age}&sunscreen=${sunscreen}&smoke=${smoke}&stress=${stress}&sleep=${sleep}&modified_age=${modified_age}&modified_sunscreen=${modified_sunscreen}&modified_smoke=${modified_smoke}&modified_stress=${modified_stress}&modified_sleep=${modified_sleep}`,
            //테스트
            url: `https://citylab.amorepacific.com/gpiopeApi/genoFuture?btCustIdNo=${ucstmid}&btCustIdNoClassifiCode=01&elasticity_score=${elasticity_score}&sensitivity_score=${sensitivity_score}&pigment_score=${pigment_score}&oiliness_score=${oiliness_score}&dryness_score=${dryness_score}&age=${first_s3_0}&sunscreen=${after_first_s3_1}&smoke=${after_first_s3_2}&stress=${after_first_s3_3}&sleep=${after_first_s3_4}&modified_age=${s3_0}&modified_sunscreen=${after_s3_1}&modified_smoke=${after_s3_2}&modified_stress=${after_s3_3}&modified_sleep=${after_s3_4}`,

            type: 'GET',

            success: function (response) {
                console.log("fnGetFutureScore 응답값 : ", response);

                let pred_sensitivity_score = parseInt(response.result.pred_sensitivity_score); // 민감 (붉은기)
                let pred_pigment_score = parseInt(response.result.pred_pigment_score); // 색소침착
                let pred_elasticity_score = parseInt(response.result.pred_elasticity_score); // 탄력
                let pred_oiliness_score = parseInt(response.result.pred_oiliness_score); // 유분
                let pred_dryness_score = parseInt(response.result.pred_dryness_score); //수분


                //방사형(레이더)차트 업데이트
                updateRadarData(1, [(pred_dryness_score * 100 / 60).toFixed(0), (pred_oiliness_score * 100 / 40).toFixed(0), pred_sensitivity_score, pred_pigment_score, pred_elasticity_score]); //현재 피부 데이터 

                //막대(my)차트 업데이트
                updateBarData(1, [(pred_dryness_score * 100 / 60).toFixed(0), (pred_oiliness_score * 100 / 40).toFixed(0), pred_sensitivity_score, pred_pigment_score, pred_elasticity_score]); //현재 피부 데이터 



            }, error: function (xhr, status, error) {
                console.error('fnGetFutureScore 오류 : ', error);
            }
        })
    }
}



// #5 미래점수 값 가져오기 (초기)
var fnGetFutureScore_first = function () {
    var ucstmid = localStorage.getItem('custom_ucstmid'); //운영
    // var ucstmid = 204677883 // 테스트


    console.log('first_s3_1 : ', first_s3_1);
    console.log('first_s3_2 : ', first_s3_2);
    console.log('first_s3_3 : ', first_s3_3);
    console.log('first_s3_4 : ', first_s3_4);
    //설문값 0이 존재하면 안되므로, +1씩 더하여줌 (그렇지않다(1) ~ 매우그렇다(4))
    var after_first_s3_1 = first_s3_1 + 1
    var after_first_s3_2 = first_s3_2 + 1
    var after_first_s3_3 = first_s3_3 + 1
    var after_first_s3_4 = first_s3_4 + 1

    // var after_s3_1 = s3_1 + 1
    // var after_s3_2 = s3_2 + 1
    // var after_s3_3 = s3_3 + 1
    // var after_s3_4 = s3_4 + 1

    //점수 초기값이 0이면 안됨 (범위 1 ~ 100)
    if (elasticity_score === 0) {
        elasticity_score += 1;
    }

    if (sensitivity_score === 0) {
        sensitivity_score += 1;
    }

    if (pigment_score === 0) {
        pigment_score += 1;
    }

    if (oiliness_score === 0) {
        oiliness_score += 1;
    }

    if (dryness_score === 0) {
        dryness_score += 1;
    }


    if (elasticity_score > 0 && sensitivity_score > 0 && pigment_score > 0 && oiliness_score > 0 && dryness_score >0) {
        $.ajax({
            //운영
            url: `https://citylab.amorepacific.com/gpiopeApi/genoFuture?btCustIdNo=${ucstmid}&btCustIdNoClassifiCode=01&elasticity_score=${elasticity_score}&sensitivity_score=${sensitivity_score}&pigment_score=${pigment_score}&oiliness_score=${oiliness_score}&dryness_score=${dryness_score}&age=${first_s3_0}&sunscreen=${after_first_s3_1}&smoke=${after_first_s3_2}&stress=${after_first_s3_3}&sleep=${after_first_s3_4}&modified_age=${s3_0}&modified_sunscreen=${after_first_s3_1}&modified_smoke=${after_first_s3_2}&modified_stress=${after_first_s3_3}&modified_sleep=${after_first_s3_4}`,
            //테스트
            // url: `https://citylab.amorepacific.com/gpiopeApi/genoFuture_test?btCustIdNo=${ucstmid}&btCustIdNoClassifiCode=01&elasticity_score=${elasticity_score}&sensitivity_score=${sensitivity_score}&pigment_score=${pigment_score}&oiliness_score=${oiliness_score}&dryness_score=${dryness_score}&age=${first_s3_0}&sunscreen=${after_first_s3_1}&smoke=${after_first_s3_2}&stress=${after_first_s3_3}&sleep=${after_first_s3_4}&modified_age=${s3_0}&modified_sunscreen=${after_first_s3_1}&modified_smoke=${after_first_s3_2}&modified_stress=${after_first_s3_3}&modified_sleep=${after_first_s3_4}`,


            type: 'GET',

            success: function (response) {
                console.log("fnGetFutureScore 응답값 : ", response);

                let pred_sensitivity_score = parseInt(response.result.pred_sensitivity_score); // 민감 (붉은기)
                let pred_pigment_score = parseInt(response.result.pred_pigment_score); // 색소침착
                let pred_elasticity_score = parseInt(response.result.pred_elasticity_score); // 탄력
                let pred_oiliness_score = parseInt(response.result.pred_oiliness_score); // 유분
                let pred_dryness_score = parseInt(response.result.pred_dryness_score); //수분


                //방사형(레이더)차트 업데이트
                updateRadarData(1, [(pred_dryness_score * 100 / 60).toFixed(0), (pred_oiliness_score * 100 / 40).toFixed(0), pred_sensitivity_score, pred_pigment_score, pred_elasticity_score]); //현재 피부 데이터 

                //막대(my)차트 업데이트
                updateBarData(1, [(pred_dryness_score * 100 / 60).toFixed(0), (pred_oiliness_score * 100 / 40).toFixed(0), pred_sensitivity_score, pred_pigment_score, pred_elasticity_score]); //현재 피부 데이터 



            }, error: function (xhr, status, error) {
                console.error('fnGetFutureScore 오류 : ', error);

                console.log('test_url : ', test_url);
            }
        })


    }

}






$('#custom_info_saveButton').on('click', function (event) {

    console.log("마이스킨솔루션 저장버튼 클릭");
    console.log("코멘트 1 값 : ", $('#comment01').val());

    var requestData = {        
        "userKey": parseInt(localStorage.getItem('custom_userkey')),
        "surveyNo": parseInt(localStorage.getItem('custom_surveyNo')),
        "surveyDate": surveyDate,
        "name": localStorage.getItem('custom_name'),     
        "specialtip_memo": $('#comment01').val(),
        "specialtip_memo2": '',
        "specialtip_memo3": '',
        "manager_value": localStorage.getItem('manager_name'),
        "createDt": currentTime,
        "updateDt": currentTime,  
    }

    console.log("MySKin_API_URL requestData : ", requestData);


    $.ajax({
        url: MySKin_API_URL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestData),

        success: function (response) {
            console.log("MySKin_API_URL 응답값 : ", response);
            $("#custom_detail_main").html("마이 스킨 솔루션 결과 저장완료");
            showErrorModal();


        }, error: function (xhr, status, error) {
            console.error('hair_result_URL 오류 : ', error);
            $("#custom_detail_main").html("마이 스킨 솔루션 결과  저장 실패");
            showErrorModal();
        }
    })


})







/*
*
* 240519 #1 레이더 차트 시작
*
*/
const data = {
    labels: ['수분', '유분', '민감', '색소침착', '주름'],
    datasets: [{
        label: '현재 피부',
        data: [40, 20, 100, 80, 70],
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(0, 0, 0, 0.7)',
        borderWidth: 1,
    }, {
        label: '미래 피부',
        data: [30, 30, 80, 60, 40],
        backgroundColor: '#e7c1da',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
    }],
};

const config = {
    type: 'radar',
    data: data,

    options: {
        maintainAspectRatio: false, //차트 고정
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    stepSize: 20
                },
            },

        },
        elements: {
            // line: {
            //     tension: 0.4, // Adjust for curved lines (0 for straight lines)
            // },
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    fontSize: 30
                }
            },
        },
    },
};

const radarChart = new Chart(
    document.getElementById('radarChart'),
    config
);


/** 
 * 24.06. 12
 * @description 현재 피부, 미래 피부 값을 업데이트하고 radar차트를 다시 렌더링
 **/
function updateRadarData(datasetIndex, data) {
    radarChart.data.datasets[datasetIndex].data = data;
    radarChart.update();
}





/*
*
* 240519 #2 막대 차트
*
*/

var ctx = document.getElementById('skinResult_Chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['수분', '유분', '민감', '색소침착', '주름'],
        datasets: [{
            label: '', // 범례 레이블 없음
            data: [40, 20, 100, 80, 70],
            backgroundColor: ['#ddd', '#ddd', '#ddd', '#ddd', '#ddd'],
            borderColor: ['white', 'white', 'white', 'white', 'white'],
            borderWidth: 1
        },
        {
            label: '', // 범례 레이블 없음
            data: [30, 30, 80, 60, 40],
            backgroundColor: ['#e7c1da', '#e7c1da', '#e7c1da', '#e7c1da', '#e7c1da'],
            borderColor: ['white', 'white', 'white', 'white', 'white'],
            borderWidth: 1
        }]
    },
    plugins: [ChartDataLabels],
    options: {
        maintainAspectRatio: false, //차트 고정
        scales: {
            y: {
                beginAtZero: true,
                max: 110,
                ticks: {
                    stepSize: 20,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    }
                },
                grid: {
                    drawBorder: false,
                    color: '#ddd',
                    lineWidth: 1,
                    display: false

                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                color: '#333',
                font: {
                    weight: 'bold'
                },
                formatter: function (value, context) {
                    return value;
                }
            }
        },

    }
});



/** 
 * 24.06. 12
 * @description 현재 피부, 미래 피부 값을 업데이트하고 막대 차트를 다시 렌더링
 **/
function updateBarData(datasetIndex, data) {
    myChart.data.datasets[datasetIndex].data = data;
    myChart.update();
}





function GetAgeArea(_age) {
    if (_age <= 19) {
        return 19;
    } else if (_age >= 20 && _age <= 24) {
        return 20;
    } else if (_age >= 25 && _age <= 29) {
        return 20;
    } else if (_age >= 30 && _age <= 34) {
        return 30;
    } else if (_age >= 35 && _age <= 39) {
        return 30;
    } else if (_age >= 40 && _age <= 44) {
        return 40;
    } else if (_age >= 45 && _age <= 49) {
        return 40;
    } else if (_age >= 50 && _age <= 54) {
        return 50;
    } else if (_age >= 55 && _age <= 59) {
        return 50;
    } else if (_age >= 60 && _age <= 69) {
        return 60;
    } else {
        return 70;
    }
}





function showErrorModal() {
    $('.search-result-layer-error').addClass('open');
    // console.log("에러 모달창");
}
