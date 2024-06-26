var SkinSurvey_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/svy/skin/';

var ReservedCustom_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/progress_flg/';
var DirectCustom_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/direct/progress_flg/';

const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
const surveyDate = moment().format('YYYY/MM/DD');

let custom_sex;

$(document).ready(function () {

    console.log('solution_questionnaire page start -> ')

    
    if (localStorage.getItem('custom_surveyNo') === null) {
        console.log("고객 정보 확인불가.");
        $("#noData_text").html('고객이 선택되지 않았습니다.');
        $("#noData_text2").html('잠시후 예약확인 페이지로 이동합니다.');
        $('.msg-layer-noData').addClass('open');

        setTimeout(function () {
            $('.layer-wrap-noData').removeClass('open');
            window.location.href = './solution_reservation.html';;   // 문진(피부) 측정 페이지로 이동
        }, 2000); // 2초 

        return;
    }

    if (localStorage.getItem('ProgramCode') === 'PC001010') {
        console.log("두피프로그램");
        $("#noData_text").html('두피 프로그램에서 이용할 수 없는 페이지입니다.');
        $("#noData_text2").html('잠시후 예약확인 페이지로 이동합니다.');
        $('.msg-layer-noData').addClass('open');

        setTimeout(function () {
            $('.layer-wrap-noData').removeClass('open');
            window.location.href = './solution_reservation.html';;   // 문진(피부) 측정 페이지로 이동
        }, 2000); // 2초 

        return;
    }

    //#4th. 문진(피부) 요청
    $.ajax({
        // url: SkinSurvey_API_URL + surveyNo,
        url: SkinSurvey_API_URL + '?surveyNo=' + localStorage.getItem('custom_surveyNo'),
        type: 'GET',
        success: function (data) {
            skinsurvey = data[0];
            console.log("SkinSurvey_API_URL 응답값 : ", skinsurvey);
            console.log("SkinSurvey_API_URL 길이 : ", Object.keys(skinsurvey).length);

            if (Object.keys(skinsurvey).length > 0) {
                //1. 피부고민 Q1 피부 고민을 선택해 주세요.
                if (skinsurvey.s1_1 == "Y") {
                    $("#S1_1").prop("checked", true);
                }
                if (skinsurvey.s1_2 == "Y") {
                    $("#S1_2").prop("checked", true);
                }
                if (skinsurvey.s1_3 == "Y") {
                    $("#S1_3").prop("checked", true);
                }
                if (skinsurvey.s1_4 == "Y") {
                    $("#S1_4").prop("checked", true);
                }
                if (skinsurvey.s1_5 == "Y") {
                    $("#S1_5").prop("checked", true);
                }
                if (skinsurvey.s1_6 == "Y") {
                    $("#S1_6").prop("checked", true);
                }
                if (skinsurvey.s1_7 == "Y") {
                    $("#S1_7").prop("checked", true);
                }
                if (skinsurvey.s1_8 == "Y") {
                    $("#S1_8").prop("checked", true);
                }
                if (skinsurvey.s1_9 == "Y") {
                    $("#S1_9").prop("checked", true);
                }
                if (skinsurvey.s1_10 == "Y") {
                    $("#S1_10").prop("checked", true);
                }
                if (skinsurvey.s1_11 == "Y") {
                    $("#S1_11").prop("checked", true);
                }
                if (skinsurvey.s1_12 == "Y") {
                    $("#S1_12").prop("checked", true);
                }
                $("#S1_First").val(skinsurvey.s1_first);
                $("#S1_Second").val(skinsurvey.s1_second);


                checkRadioBasedOnValue(skinsurvey.s2_1, 'S2_1');
                checkRadioBasedOnValue(skinsurvey.s2_2, 'S2_2');
                checkRadioBasedOnValue(skinsurvey.s2_3, 'S2_3');
                checkRadioBasedOnValue(skinsurvey.s2_4, 'S2_4');

                checkRadioBasedOnValue(skinsurvey.s3_1, 'S3_1');
                checkRadioBasedOnValue(skinsurvey.s3_2, 'S3_2');
                checkRadioBasedOnValue(skinsurvey.s3_3, 'S3_3');
                checkRadioBasedOnValue(skinsurvey.s3_4, 'S3_4');
                checkRadioBasedOnValue(skinsurvey.s3_5, 'S3_5');
                checkRadioBasedOnValue(skinsurvey.s3_6, 'S3_6');

                checkRadioBasedOnValue(skinsurvey.s4_1, 'S4_1');
                checkRadioBasedOnValue(skinsurvey.s4_2, 'S4_2');
                checkRadioBasedOnValue(skinsurvey.s4_3, 'S4_3');
                checkRadioBasedOnValue(skinsurvey.s4_4, 'S4_4');
                checkRadioBasedOnValue(skinsurvey.s4_5, 'S4_5');
                checkRadioBasedOnValue(skinsurvey.s4_6, 'S4_6');
            }


        }, error: function (xhr, status, error) {

            console.error('SkinSurvey_API_URL 오류 : ', error);
        }
    })







    //상담 완료가 아닐경우 (상담완료는 진행률 이미 100%)
    if (localStorage.getItem('progress_flg') !== '10') {
        //직접 방문 고객의 상담 진행률
        if (localStorage.getItem('visitkey') === '0' && localStorage.getItem('custom_skinResult') !== 'ok') {
            console.log("직방 고객 상담 진행률 체크")
            $.ajax({
                url: DirectCustom_API_URL + localStorage.getItem('skey'),
                type: 'PATCH',
                data: JSON.stringify({ "progress_flg": "101" }), //피부문진 진행중
                contentType: 'application/json',

                success: function (response) {
                    console.log('=====================');
                    console.log('피부 문진 인입 성공 : ', response);
                },

                error: function (xhr, status, error) {
                    console.error('피부 문진 인입 에러 : ', error);
                }
            })
        }
        //예약 방문 고객의 상담 진행률
        else if (localStorage.getItem('visitkey') !== '0' && localStorage.getItem('custom_skinResult') !== 'ok') {
            console.log("예약 고객 상담 진행률 체크")
            $.ajax({
                url: ReservedCustom_API_URL + localStorage.getItem('visitkey') + '/' + localStorage.getItem('skey'),
                type: 'PATCH',
                data: JSON.stringify({ "progress_flg": "101" }), //피부문진 진행중
                contentType: 'application/json',

                success: function (response) {
                    console.log('=====================');
                    console.log('피부 문진 인입 성공 : ', response);
                },

                error: function (xhr, status, error) {
                    console.error('피부 문진 인입 에러 : ', error);
                }
            })
        }
    }



    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));
    console.log("custom_sex : ", localStorage.getItem('custom_sex'));
    console.log("custom_name : ", localStorage.getItem('custom_name'));
    console.log("visitDate : ", localStorage.getItem('visitDate'));

    custom_sex = localStorage.getItem('custom_sex');

    let S3_6_radio2 = document.getElementById('S3_6_002');
    if (custom_sex === 'M') {
        console.log("11111111111")
        S3_6_radio2.checked = true;
        S3_6 = 1;
    }


    $('#skinSurvey_saveButton').click(function () {
        console.log("스킨 저장버튼 클릭 : ");

        /*
        * #Q1-1 피부고민 저장
         */
        // HTML에서 체크박스 요소
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        // 체크 여부를 저장할 객체를 생성
        const Q1_1 = {};
        // 체크박스 요소들을 순회하며 클릭 여부를 확인하고 객체에 저장
        checkboxes.forEach((checkbox) => {
            const id = checkbox.id;
            const isChecked = checkbox.checked;
            // Q1_1[id] = isChecked;
            Q1_1[id] = isChecked ? 'Y' : 'N';
        });
        console.log("Q1_1 : ", Q1_1);



        /*
        * #Q1-1 피부고민 1순위 저장
         */

        const S1_First_Input = document.getElementById('S1_First');
        const S1_Second_Input = document.getElementById('S1_Second');

        let S1_First = '';
        let S1_Second = '';

        if (S1_First_Input) {
            S1_First = S1_First_Input.value;
        }
        if (S1_Second_Input) {
            S1_Second = S1_Second_Input.value;
        }
        console.log('S1_First :', S1_First);
        console.log('S1_Second :', S1_Second);


        /*
        * #2-1 세안 후 아무것도 안바르면 피부가 당겨요.
         */
        const S2_1_radio1 = document.getElementById('S2_1_001');
        const S2_1_radio2 = document.getElementById('S2_1_002');
        const S2_1_radio3 = document.getElementById('S2_1_003');
        const S2_1_radio4 = document.getElementById('S2_1_004');

        // 변수 S2_1을 선언하고 초기값을 설정합니다.
        let S2_1 = null;

        // 라디오 버튼의 클릭 여부를 확인하고 변수에 값을 할당합니다.
        if (S2_1_radio1.checked) {
            S2_1 = 0;
        } else if (S2_1_radio2.checked) {
            S2_1 = 1;
        } else if (S2_1_radio3.checked) {
            S2_1 = 2;
        } else if (S2_1_radio4.checked) {
            S2_1 = 3;
        }
        console.log('S2_1 :', S2_1);

        /*
        * #2-2 보습제를 발라도 3~4시간이 지나면 피부가 건조해요.
         */
        const S2_2_radio1 = document.getElementById('S2_2_001');
        const S2_2_radio2 = document.getElementById('S2_2_002');
        const S2_2_radio3 = document.getElementById('S2_2_003');
        const S2_2_radio4 = document.getElementById('S2_2_004');

        let S2_2 = null;

        if (S2_2_radio1.checked) {
            S2_2 = 0;
        } else if (S2_2_radio2.checked) {
            S2_2 = 1;
        } else if (S2_2_radio3.checked) {
            S2_2 = 2;
        } else if (S2_2_radio4.checked) {
            S2_2 = 3;
        }
        console.log('S2_2 :', S2_2);


        /*
        * #2-3 피부가 번들거리는 편인가요?
         */
        const S2_3_radio1 = document.getElementById('S2_3_001');
        const S2_3_radio2 = document.getElementById('S2_3_002');
        const S2_3_radio3 = document.getElementById('S2_3_003');
        const S2_3_radio4 = document.getElementById('S2_3_004');

        let S2_3 = null;

        if (S2_3_radio1.checked) {
            S2_3 = 0;
        } else if (S2_3_radio2.checked) {
            S2_3 = 1;
        } else if (S2_3_radio3.checked) {
            S2_3 = 2;
        } else if (S2_3_radio4.checked) {
            S2_3 = 3;
        }
        console.log('S2_3 :', S2_3);

        /*
        * #2-4 자신의 얼굴 모공에 대해 어떻게 생각하나요?
         */
        const S2_4_radio1 = document.getElementById('S2_4_001');
        const S2_4_radio2 = document.getElementById('S2_4_002');
        const S2_4_radio3 = document.getElementById('S2_4_003');
        const S2_4_radio4 = document.getElementById('S2_4_004');

        let S2_4 = null;

        if (S2_4_radio1.checked) {
            S2_4 = 0;
        } else if (S2_4_radio2.checked) {
            S2_4 = 1;
        } else if (S2_4_radio3.checked) {
            S2_4 = 2;
        } else if (S2_4_radio4.checked) {
            S2_4 = 3;
        }
        console.log('S2_4 :', S2_4);

        /*
        * #3-1 자외선 차단제를 사용해요.
         */
        const S3_1_radio1 = document.getElementById('S3_1_001');
        const S3_1_radio2 = document.getElementById('S3_1_002');
        const S3_1_radio3 = document.getElementById('S3_1_003');
        const S3_1_radio4 = document.getElementById('S3_1_004');

        let S3_1 = null;

        if (S3_1_radio1.checked) {
            S3_1 = 0;
        } else if (S3_1_radio2.checked) {
            S3_1 = 1;
        } else if (S3_1_radio3.checked) {
            S3_1 = 2;
        } else if (S3_1_radio4.checked) {
            S3_1 = 3;
        }
        console.log('S3_1 :', S3_1);

        /*
       * #3-2 담배를 피우거나 간접흡연에 노출되어 있어요.
        */
        const S3_2_radio1 = document.getElementById('S3_2_001');
        const S3_2_radio2 = document.getElementById('S3_2_002');
        const S3_2_radio3 = document.getElementById('S3_2_003');
        const S3_2_radio4 = document.getElementById('S3_2_004');

        let S3_2 = null;

        if (S3_2_radio1.checked) {
            S3_2 = 0;
        } else if (S3_2_radio2.checked) {
            S3_2 = 1;
        } else if (S3_2_radio3.checked) {
            S3_2 = 2;
        } else if (S3_2_radio4.checked) {
            S3_2 = 3;
        }
        console.log('S3_2 :', S3_2);

        /*
      * #3-3 스트레스를 많이 받는 편이에요.
       */
        const S3_3_radio1 = document.getElementById('S3_3_001');
        const S3_3_radio2 = document.getElementById('S3_3_002');
        const S3_3_radio3 = document.getElementById('S3_3_003');
        const S3_3_radio4 = document.getElementById('S3_3_004');

        let S3_3 = null;

        if (S3_3_radio1.checked) {
            S3_3 = 0;
        } else if (S3_3_radio2.checked) {
            S3_3 = 1;
        } else if (S3_3_radio3.checked) {
            S3_3 = 2;
        } else if (S3_3_radio4.checked) {
            S3_3 = 3;
        }
        console.log('S3_3 :', S3_3);

        /*
        * #3-4 충분히 잠을 자요.
        */
        const S3_4_radio1 = document.getElementById('S3_4_001');
        const S3_4_radio2 = document.getElementById('S3_4_002');
        const S3_4_radio3 = document.getElementById('S3_4_003');
        const S3_4_radio4 = document.getElementById('S3_4_004');

        let S3_4 = null;

        if (S3_4_radio1.checked) {
            S3_4 = 0;
        } else if (S3_4_radio2.checked) {
            S3_4 = 1;
        } else if (S3_4_radio3.checked) {
            S3_4 = 2;
        } else if (S3_4_radio4.checked) {
            S3_4 = 3;
        }
        console.log('S3_4 :', S3_4);

        /*
        * #3-5 피부과 시술을 자주 받는 편이에요.
        */
        const S3_5_radio1 = document.getElementById('S3_5_001');
        const S3_5_radio2 = document.getElementById('S3_5_002');
        const S3_5_radio3 = document.getElementById('S3_5_003');
        const S3_5_radio4 = document.getElementById('S3_5_004');
        const S3_5_radio5 = document.getElementById('S3_5_005');

        let S3_5 = null;

        if (S3_5_radio1.checked) {
            S3_5 = 0;
        } else if (S3_5_radio2.checked) {
            S3_5 = 1;
        } else if (S3_5_radio3.checked) {
            S3_5 = 2;
        } else if (S3_5_radio4.checked) {
            S3_5 = 3;
        } else if (S3_5_radio5.checked) {
            S3_5 = 4;
        }
        console.log('S3_5 :', S3_5);


        /*
        * #3-6 임신과 출산 경험이 있어요.
        */
        const S3_6_radio1 = document.getElementById('S3_6_001');
        const S3_6_radio2 = document.getElementById('S3_6_002');


        let S3_6 = null;

        if (S3_6_radio1.checked) {
            S3_6 = 0;
        } else if (S3_6_radio2.checked) {
            S3_6 = 1;
        }
        console.log('S3_6 :', S3_6);


        /*
        * #4-1 생리, 스트레스 등에 의해 피부가 예민하게 반응해요.
        */
        const S4_1_radio1 = document.getElementById('S4_1_001');
        const S4_1_radio2 = document.getElementById('S4_1_002');
        const S4_1_radio3 = document.getElementById('S4_1_003');
        const S4_1_radio4 = document.getElementById('S4_1_004');

        let S4_1 = null;

        if (S4_1_radio1.checked) {
            S4_1 = 0;
        } else if (S4_1_radio2.checked) {
            S4_1 = 1;
        } else if (S4_1_radio3.checked) {
            S4_1 = 2;
        } else if (S4_1_radio4.checked) {
            S4_1 = 3;
        }
        console.log('S4_1 :', S4_1);


        /*
        * #4-2 건조, 계절 변화, 미세먼지 등 환경요인에 의해 피부가 예민하게 반응해요.
        */
        const S4_2_radio1 = document.getElementById('S4_2_001');
        const S4_2_radio2 = document.getElementById('S4_2_002');
        const S4_2_radio3 = document.getElementById('S4_2_003');
        const S4_2_radio4 = document.getElementById('S4_2_004');

        let S4_2 = null;

        if (S4_2_radio1.checked) {
            S4_2 = 0;
        } else if (S4_2_radio2.checked) {
            S4_2 = 1;
        } else if (S4_2_radio3.checked) {
            S4_2 = 2;
        } else if (S4_2_radio4.checked) {
            S4_2 = 3;
        }
        console.log('S4_2 :', S4_2);


        /*
        * #4-3 화장품을 바꾸면 피부가 예민하게 반응하는 편인가요?
        */
        const S4_3_radio1 = document.getElementById('S4_3_001');
        const S4_3_radio2 = document.getElementById('S4_3_002');
        const S4_3_radio3 = document.getElementById('S4_3_003');
        const S4_3_radio4 = document.getElementById('S4_3_004');

        let S4_3 = null;

        if (S4_3_radio1.checked) {
            S4_3 = 0;
        } else if (S4_3_radio2.checked) {
            S4_3 = 1;
        } else if (S4_3_radio3.checked) {
            S4_3 = 2;
        } else if (S4_3_radio4.checked) {
            S4_3 = 3;
        }
        console.log('S4_3 :', S4_3);


        /*
        * #4-4 얼굴에 뾰루지가 생기는 정도는 어떤가요?
        */
        const S4_4_radio1 = document.getElementById('S4_4_001');
        const S4_4_radio2 = document.getElementById('S4_4_002');
        const S4_4_radio3 = document.getElementById('S4_4_003');
        const S4_4_radio4 = document.getElementById('S4_4_004');

        let S4_4 = null;

        if (S4_4_radio1.checked) {
            S4_4 = 0;
        } else if (S4_4_radio2.checked) {
            S4_4 = 1;
        } else if (S4_4_radio3.checked) {
            S4_4 = 2;
        } else if (S4_4_radio4.checked) {
            S4_4 = 3;
        }
        console.log('S4_4 :', S4_4);

        /*
        * #4-5 얼굴에 붉은기가 있는 편인가요?
        */
        const S4_5_radio1 = document.getElementById('S4_5_001');
        const S4_5_radio2 = document.getElementById('S4_5_002');
        const S4_5_radio3 = document.getElementById('S4_5_003');
        const S4_5_radio4 = document.getElementById('S4_5_004');

        let S4_5 = null;

        if (S4_5_radio1.checked) {
            S4_5 = 0;
        } else if (S4_5_radio2.checked) {
            S4_5 = 1;
        } else if (S4_5_radio3.checked) {
            S4_5 = 2;
        } else if (S4_5_radio4.checked) {
            S4_5 = 3;
        }
        console.log('S4_5 :', S4_5);

        /*
        * #4-6 햇빛에 의한 열감을 경험한 적이 있나요?
        */
        const S4_6_radio1 = document.getElementById('S4_6_001');
        const S4_6_radio2 = document.getElementById('S4_6_002');
        const S4_6_radio3 = document.getElementById('S4_6_003');
        const S4_6_radio4 = document.getElementById('S4_6_004');

        let S4_6 = null;

        if (S4_6_radio1.checked) {
            S4_6 = 0;
        } else if (S4_6_radio2.checked) {
            S4_6 = 1;
        } else if (S4_6_radio3.checked) {
            S4_6 = 2;
        } else if (S4_6_radio4.checked) {
            S4_6 = 3;
        }
        console.log('S4_6 :', S4_6);



        if (Object.values(Q1_1).every(value => value === "N")) {
            $("#custom_detail").html("피부고민 - Q1 ");
            showErrorModal();
        } else if (S1_First === "") {
            $("#custom_detail_main").html("피부고민 1순위를 입력해주세요.");
            showErrorModal();
        } else if (S1_Second === "") {
            $("#custom_detail_main").html("피부고민 2순위를 입력해주세요.");
            showErrorModal();
        } else if (S2_1 === null) {
            $("#custom_detail").html("피부타입 - Q1 ");
            showErrorModal();
        } else if (S2_2 === null) {
            $("#custom_detail").html("피부타입 - Q2 ");
            showErrorModal();
        } else if (S2_3 === null) {
            $("#custom_detail").html("피부타입 - Q3 ");
            showErrorModal();
        } else if (S2_4 === null) {
            $("#custom_detail").html("피부타입 - Q4 ");
            showErrorModal();
        } else if (S3_1 === null) {
            $("#custom_detail").html("생활습관 - Q1 ");
            showErrorModal();
        } else if (S3_2 === null) {
            $("#custom_detail").html("생활습관 - Q2 ");
            showErrorModal();
        } else if (S3_3 === null) {
            $("#custom_detail").html("생활습관 - Q3 ");
            showErrorModal();
        } else if (S3_4 === null) {
            $("#custom_detail").html("생활습관 - Q4 ");
            showErrorModal();
        } else if (S3_5 === null) {
            $("#custom_detail").html("생활습관 - Q5 ");
            showErrorModal();
        } else if (S3_6 === null) {
            $("#custom_detail").html("생활습관 - Q6 ");
            showErrorModal();
        } else if (S4_1 === null) {
            $("#custom_detail").html("민감도 - Q1 ");
            showErrorModal();
        } else if (S4_2 === null) {
            $("#custom_detail").html("민감도 - Q2 ");
            showErrorModal();
        } else if (S4_3 === null) {
            $("#custom_detail").html("민감도 - Q3 ");
            showErrorModal();
        } else if (S4_4 === null) {
            $("#custom_detail").html("민감도 - Q4 ");
            showErrorModal();
        } else if (S4_5 === null) {
            $("#custom_detail").html("민감도 - Q5 ");
            showErrorModal();
        } else if (S4_6 === null) {
            $("#custom_detail").html("민감도 - Q6 ");
            showErrorModal();
        } else {

            var requestData = {
                "surveyNo": parseInt(localStorage.getItem('custom_surveyNo')),
                "userkey": parseInt(localStorage.getItem('custom_userkey')),
                "surveyDate": String(surveyDate),
                "qyn": String("Y"),
                "s1_1": String(Q1_1.S1_1),
                "s1_2": String(Q1_1.S1_2),
                "s1_3": String(Q1_1.S1_3),
                "s1_4": String(Q1_1.S1_4),
                "s1_5": String(Q1_1.S1_5),
                "s1_6": String(Q1_1.S1_6),
                "s1_7": String(Q1_1.S1_7),
                "s1_8": String(Q1_1.S1_8),
                "s1_9": String(Q1_1.S1_9),
                "s1_10": String(Q1_1.S1_10),
                "s1_11": String(Q1_1.S1_11),
                "s1_12": String(Q1_1.S1_12),
                "s1_first": String(S1_First),
                "s1_second": String(S1_Second),

                "s2_1": String(S2_1),
                "s2_2": String(S2_2),
                "s2_3": String(S2_3),
                "s2_4": String(S2_4),

                "s3_1": String(S3_1),
                "s3_2": String(S3_2),
                "s3_3": String(S3_3),
                "s3_4": String(S3_4),
                "s3_5": String(S3_5),
                "s3_6": String(S3_6),
                "s3_7": String(""),
                "s3_8": String(""),
                "s3_9": String(""),
                "s3_10": String(""),
                "s3_11": String(""),
                "s3_12": String(""),

                "s4_1": String(S4_1),
                "s4_2": String(S4_2),
                "s4_3": String(S4_3),
                "s4_4": String(S4_4),
                "s4_5": String(S4_5),
                "s4_6": String(S4_6),
                "m_markvu_yn": String(""),
                "m_antera_yn": String(""),
                "m_cnk_01_yn": String(""),

                "create_dt": currentTime,
                "update_dt": currentTime,
            }

            console.log("requestData : ", requestData);

            $.ajax({
                url: SkinSurvey_API_URL,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(requestData),

                success: function (response) {
                    console.log("SkinSurvey_API_URL 응답값 : ", response);
                    $("#custom_detail_main").html("문진(피부) 저장이 완료되었습니다.");
                    showErrorModal();

                    localStorage.setItem('solution_questionnaire_state', true);

                    setTimeout(function () {
                        window.location.href = './analysis.html';
                    }, 2000); // 2초 딜레이

                }, error: function (xhr, status, error) {
                    console.error('SkinSurvey_API_URL 오류 : ', error);
                    $("#custom_detail_main").html("문진(피부) 저장에 실패하였습니다.");
                    showErrorModal();

                    // setTimeout(function () {
                    //     window.location.href = './solution_questionnaire2.html';
                    // }, 2000); // 2초
                }
            })
        }
        // window.location.href = './solution_questionnaire2.html';
    })


});


function showErrorModal() {
    $('.search-result-layer-error').addClass('open');
    // console.log("안내 모달창");
}



function checkRadioBasedOnValue(s2Value, radioIdPrefix) {
    console.log('s2Value 값 : ', s2Value);
    console.log('radioIdPrefix 값 : ', radioIdPrefix);
    const radio1 = $(`#${radioIdPrefix}_001`);
    const radio2 = $(`#${radioIdPrefix}_002`);
    const radio3 = $(`#${radioIdPrefix}_003`);
    const radio4 = $(`#${radioIdPrefix}_004`);

    switch (s2Value) {
        case '0':
            radio1.prop('checked', true);
            break;
        case '1':
            radio2.prop('checked', true);
            break;
        case '2':
            radio3.prop('checked', true);
            break;
        case '3':
            radio4.prop('checked', true);
            break;
        default:
            // Handle other cases if needed
            break;
    }
}

