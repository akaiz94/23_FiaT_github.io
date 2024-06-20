var hairSurvey_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/svy/hair/';

var ReservedCustom_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/progress_flg/';
var DirectCustom_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/direct/progress_flg/';

let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
let surveyDate = moment().format('YYYY/MM/DD');

$(document).ready(function () {

    console.log('solution_questionnaire2 page start -> ')




    //#4th. 문진(두피) 요청
    $.ajax({
        // url: SkinSurvey_API_URL + surveyNo,
        url: hairSurvey_API_URL + '?surveyNo=' + localStorage.getItem('custom_surveyNo'),
        type: 'GET',
        success: function (data) {
            scalpSurvey = data[0];
            console.log("hairSurvey_API_URL 응답값 : ", scalpSurvey);
            console.log("hairSurvey_API_URL 길이 : ", Object.keys(scalpSurvey).length);

            if (Object.keys(scalpSurvey).length > 0) {


                if (scalpSurvey.s1_1 == "Y") {
                    $("#S1_1").prop("checked", true);
                }
                if (scalpSurvey.s1_2 == "Y") {
                    $("#S1_2").prop("checked", true);
                }
                if (scalpSurvey.s1_3 == "Y") {
                    $("#S1_3").prop("checked", true);
                }
                if (scalpSurvey.s1_4 == "Y") {
                    $("#S1_4").prop("checked", true);
                }
                if (scalpSurvey.s1_5 == "Y") {
                    $("#S1_5").prop("checked", true);
                }
                if (scalpSurvey.s1_6 == "Y") {
                    $("#S1_6").prop("checked", true);
                }
                if (scalpSurvey.s1_7 == "Y") {
                    $("#S1_7").prop("checked", true);
                }
                $("#S1_First").val(scalpSurvey.s1_first);



                if (scalpSurvey.s2_1_1 == "Y") {
                    $("#S2_1_1").prop("checked", true);
                }
                if (scalpSurvey.s2_1_2 == "Y") {
                    $("#S2_1_2").prop("checked", true);
                }
                if (scalpSurvey.s2_1_3 == "Y") {
                    $("#S2_1_3").prop("checked", true);
                }

                checkRadioBasedOnValue(scalpSurvey.s2_2, 'S2_2');
                checkRadioBasedOnValue(scalpSurvey.s2_3, 'S2_3');
                checkRadioBasedOnValue(scalpSurvey.s2_4, 'S2_4');
                checkRadioBasedOnValue(scalpSurvey.s2_5, 'S2_5');
                checkRadioBasedOnValue(scalpSurvey.s2_6, 'S2_6');
                checkRadioBasedOnValue(scalpSurvey.s2_7, 'S2_7');
                checkRadioBasedOnValue(scalpSurvey.s2_8, 'S2_8');
                checkRadioBasedOnValue(scalpSurvey.s2_9, 'S2_9');
                checkRadioBasedOnValue(scalpSurvey.s2_10, 'S2_10');
                checkRadioBasedOnValue(scalpSurvey.s2_11, 'S2_11');



                if (scalpSurvey.s3_1_1 == "Y") {
                    $("#S3_1_1").prop("checked", true);
                }
                if (scalpSurvey.s3_1_2 == "Y") {
                    $("#S3_1_2").prop("checked", true);
                }
                if (scalpSurvey.s3_1_3 == "Y") {
                    $("#S3_1_3").prop("checked", true);
                }
                if (scalpSurvey.s3_1_4 == "Y") {
                    $("#S3_1_4").prop("checked", true);
                }
                if (scalpSurvey.s3_1_5 == "Y") {
                    $("#S3_1_5").prop("checked", true);
                }
                if (scalpSurvey.s3_1_6 == "Y") {
                    $("#S3_1_6").prop("checked", true);
                }
                if (scalpSurvey.s3_1_7 == "Y") {
                    $("#S3_1_7").prop("checked", true);
                }
                if (scalpSurvey.s3_1_8 == "Y") {
                    $("#S3_1_8").prop("checked", true);
                }
                $("#S3_1_First").val(scalpSurvey.s3_1_first);

                checkRadioBasedOnValue(scalpSurvey.s3_2, 'S3_2');

            }


        }, error: function (xhr, status, error) {

            console.error('SkinSurvey_API_URL 오류 : ', error);
        }
    })




    //상담 완료가 아닐경우 (상담완료는 진행률 이미 100%)
    if (localStorage.getItem('progress_flg') !== '10') {
        //직접 방문 고객의 상담 진행률
        if (localStorage.getItem('visitkey') === '0' && localStorage.getItem('custom_sculpResult') !== 'ok') {
            console.log("직방 고객 상담 진행률 체크")
            $.ajax({
                url: DirectCustom_API_URL + localStorage.getItem('skey'),
                type: 'PATCH',
                data: JSON.stringify({ "progress_flg": "102" }), //두피문진 진행중
                contentType: 'application/json',

                success: function (response) {
                    console.log('=====================');
                    console.log('두피 문진 인입 성공 : ', response);
                },

                error: function (xhr, status, error) {
                    console.error('두피 문진 인입 에러 : ', error);
                }
            })
        }
        //예약 방문 고객의 상담 진행률
        else if (localStorage.getItem('visitkey') !== '0' && localStorage.getItem('custom_sculpResult') !== 'ok') {
            console.log("예약 고객 상담 진행률 체크")
            $.ajax({
                url: ReservedCustom_API_URL + localStorage.getItem('visitkey') + '/' + localStorage.getItem('skey'),
                type: 'PATCH',
                data: JSON.stringify({ "progress_flg": "102" }), //피부문진 진행중
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




    $('#scalpSurvey_saveButton').click(function () {

        console.log("두피 저장버튼 클릭 : ");

        /*
       * #Q1-1 두피고민 저장
        */
        const checkboxes = document.querySelectorAll('input[name="q_start"]');
        const Q1_1 = {};

        checkboxes.forEach((checkbox) => {
            const id = checkbox.id;
            const isChecked = checkbox.checked;
            // Q1_1[id] = isChecked;
            Q1_1[id] = isChecked ? 'Y' : 'N';
        });
        console.log("Q1_1 : ", Q1_1);


        /*
        * #Q1-1. 두피고민 1순위저장
         */
        const S1_First_Input = document.getElementById('S1_First');
        let S1_First = '';

        if (S1_First_Input) {
            S1_First = S1_First_Input.value;
        }
        console.log('S1_First :', S1_First);

        /*
        * # 2-1 평소 샴푸를 언제 하나요?
        */
        const checkboxes2 = document.querySelectorAll('input[name="q1"]');
        const Q2_1 = {};

        checkboxes2.forEach((checkbox) => {
            const id = checkbox.id;
            const isChecked = checkbox.checked;
            // Q1_1[id] = isChecked;
            Q2_1[id] = isChecked ? 'Y' : 'N';
        });
        console.log("Q2_1 : ", Q2_1);



        /*
        * # 2-2 샴푸 사용 횟수는 어떻게 되나요?
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
       * #2-3 샴푸 후 두피를 충분히 건조시키나요?
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
       * #2-4 헤어 제품을 바꾸거나 시술 후 두피가 예민하게 반응하는 편인가요?
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
       * #2-5 헤어 제품을 바꾸거나 시술 후에 비듬이 생기는 편인가요?
        */
        const S2_5_radio1 = document.getElementById('S2_5_001');
        const S2_5_radio2 = document.getElementById('S2_5_002');
        const S2_5_radio3 = document.getElementById('S2_5_003');
        const S2_5_radio4 = document.getElementById('S2_5_004');

        let S2_5 = null;

        if (S2_5_radio1.checked) {
            S2_5 = 0;
        } else if (S2_5_radio2.checked) {
            S2_5 = 1;
        } else if (S2_5_radio3.checked) {
            S2_5 = 2;
        } else if (S2_5_radio4.checked) {
            S2_5 = 3;
        }
        console.log('S2_5 :', S2_5);

        /*
       * #2-6 민감성 두피라고 생각하나요?
        */
        const S2_6_radio1 = document.getElementById('S2_6_001');
        const S2_6_radio2 = document.getElementById('S2_6_002');
        const S2_6_radio3 = document.getElementById('S2_6_003');
        const S2_6_radio4 = document.getElementById('S2_6_004');

        let S2_6 = null;

        if (S2_6_radio1.checked) {
            S2_6 = 0;
        } else if (S2_6_radio2.checked) {
            S2_6 = 1;
        } else if (S2_6_radio3.checked) {
            S2_6 = 2;
        } else if (S2_6_radio4.checked) {
            S2_6 = 3;
        }
        console.log('S2_6 :', S2_6);

        /*
        * #2-7 평소 두피에 열감이 느껴지나요?
        */
        const S2_7_radio1 = document.getElementById('S2_7_001');
        const S2_7_radio2 = document.getElementById('S2_7_002');
        const S2_7_radio3 = document.getElementById('S2_7_003');
        const S2_7_radio4 = document.getElementById('S2_7_004');

        let S2_7 = null;

        if (S2_7_radio1.checked) {
            S2_7 = 0;
        } else if (S2_7_radio2.checked) {
            S2_7 = 1;
        } else if (S2_7_radio3.checked) {
            S2_7 = 2;
        } else if (S2_7_radio4.checked) {
            S2_7 = 3;
        }
        console.log('S2_7 :', S2_7);

        /*
        * #2-8 평소 두피가 울긋불긋 한 편인가요?
        */
        const S2_8_radio1 = document.getElementById('S2_8_001');
        const S2_8_radio2 = document.getElementById('S2_8_002');
        const S2_8_radio3 = document.getElementById('S2_8_003');
        const S2_8_radio4 = document.getElementById('S2_8_004');

        let S2_8 = null;

        if (S2_8_radio1.checked) {
            S2_8 = 0;
        } else if (S2_8_radio2.checked) {
            S2_8 = 1;
        } else if (S2_8_radio3.checked) {
            S2_8 = 2;
        } else if (S2_8_radio4.checked) {
            S2_8 = 3;
        }
        console.log('S2_8 :', S2_8);


        /*
        * #2-9 건조, 계절 변화, 미세먼지 등 환경요인에 의해 두피가 예민하게 반응하나요?
        */
        const S2_9_radio1 = document.getElementById('S2_9_001');
        const S2_9_radio2 = document.getElementById('S2_9_002');
        const S2_9_radio3 = document.getElementById('S2_9_003');
        const S2_9_radio4 = document.getElementById('S2_9_004');

        let S2_9 = null;

        if (S2_9_radio1.checked) {
            S2_9 = 0;
        } else if (S2_9_radio2.checked) {
            S2_9 = 1;
        } else if (S2_9_radio3.checked) {
            S2_9 = 2;
        } else if (S2_9_radio4.checked) {
            S2_9 = 3;
        }
        console.log('S2_9 :', S2_9);


        /*
        * #2-10 두피에 뾰루지가 생기는 정도는 어떤가요?
        */
        const S2_10_radio1 = document.getElementById('S2_10_001');
        const S2_10_radio2 = document.getElementById('S2_10_002');
        const S2_10_radio3 = document.getElementById('S2_10_003');
        const S2_10_radio4 = document.getElementById('S2_10_004');

        let S2_10 = null;

        if (S2_10_radio1.checked) {
            S2_10 = 0;
        } else if (S2_10_radio2.checked) {
            S2_10 = 1;
        } else if (S2_10_radio3.checked) {
            S2_10 = 2;
        } else if (S2_10_radio4.checked) {
            S2_10 = 3;
        }
        console.log('S2_10 :', S2_10);


        /*
        * #2-11 평소에 두피가 가려운 정도는 어떤가요?
        */
        const S2_11_radio1 = document.getElementById('S2_11_001');
        const S2_11_radio2 = document.getElementById('S2_11_002');
        const S2_11_radio3 = document.getElementById('S2_11_003');
        const S2_11_radio4 = document.getElementById('S2_11_004');
        const S2_11_radio5 = document.getElementById('S2_11_005');
        const S2_11_radio6 = document.getElementById('S2_11_006');

        let S2_11 = null;

        if (S2_11_radio1.checked) {
            S2_11 = 0;
        } else if (S2_11_radio2.checked) {
            S2_11 = 1;
        } else if (S2_11_radio3.checked) {
            S2_11 = 2;
        } else if (S2_11_radio4.checked) {
            S2_11 = 3;
        } else if (S2_11_radio5.checked) {
            S2_11 = 4;
        } else if (S2_11_radio6.checked) {
            S2_11 = 5
        }
        console.log('S2_11 :', S2_11);


        /*
        * #3-1 모발 고민을 선택해 주세요.
        */
        const checkboxes3 = document.querySelectorAll('input[name="q3_1"]');
        const Q3_1 = {};

        checkboxes3.forEach((checkbox) => {
            const id = checkbox.id;
            const isChecked = checkbox.checked;
            // Q1_1[id] = isChecked;
            Q3_1[id] = isChecked ? 'Y' : 'N';
        });
        console.log("Q3_1 : ", Q3_1);


        /*
        * #Q3-1. 모발고민 1순위저장
         */
        const S3_1_First_Input = document.getElementById('S3_1_First');
        let S3_1_First = '';

        if (S3_1_First_Input) {
            S3_1_First = S3_1_First_Input.value;
        }
        console.log('S3_1_First :', S3_1_First);



        /*
        * #3-2 귀하의 모발 타입은 다음 중 어디에 해당 하나요?        */

        const S3_2_radio1 = document.getElementById('S3_2_001');
        const S3_2_radio2 = document.getElementById('S3_2_002');
        const S3_2_radio3 = document.getElementById('S3_2_003');
        let S3_2 = null;

        if (S3_2_radio1.checked) {
            S3_2 = 0;
        } else if (S3_2_radio2.checked) {
            S3_2 = 1;
        } else if (S3_2_radio3.checked) {
            S3_2 = 2;
        }
        console.log('S3_2 :', S3_2);


        if (Object.values(Q1_1).every(value => value === "N")) {
            $("#custom_detail").html("두피고민 - Q1 ");
            showErrorModal();
        } else if (S1_First === "") {
            $("#custom_detail_main").html("두피고민 1순위를 입력해주세요.");
            showErrorModal();
        } else if (Object.values(Q2_1).every(value => value === "N")) {
            $("#custom_detail").html("두피타입 - Q1 ");
            showErrorModal();
        } else if (S2_2 === null) {
            $("#custom_detail").html("두피타입 - Q2 ");
            showErrorModal();
        } else if (S2_3 === null) {
            $("#custom_detail").html("두피타입 - Q3 ");
            showErrorModal();
        } else if (S2_4 === null) {
            $("#custom_detail").html("두피타입 - Q4 ");
            showErrorModal();
        } else if (S2_5 === null) {
            $("#custom_detail").html("두피타입 - Q5 ");
            showErrorModal();
        } else if (S2_6 === null) {
            $("#custom_detail").html("두피타입 - Q6 ");
            showErrorModal();
        } else if (S2_7 === null) {
            $("#custom_detail").html("두피타입 - Q7 ");
            showErrorModal();
        } else if (S2_8 === null) {
            $("#custom_detail").html("두피타입 - Q8 ");
            showErrorModal();
        } else if (S2_9 === null) {
            $("#custom_detail").html("두피타입 - Q9 ");
            showErrorModal();
        } else if (S2_10 === null) {
            $("#custom_detail").html("두피타입 - Q10 ");
            showErrorModal();
        } else if (S2_11 === null) {
            $("#custom_detail").html("두피타입 - Q11 ");
            showErrorModal();
        } else if (Object.values(Q3_1).every(value => value === "N")) {
            $("#custom_detail").html("모발 - Q1 ");
            showErrorModal();
        } else if (S3_1_First === "") {
            $("#custom_detail_main").html("모발고민 1순위를 입력해주세요.");
            showErrorModal();
        } else if (S3_2 === null) {
            $("#custom_detail").html("모발 - Q2 ");
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
                "s1_first": String(S1_First),
                "s2_1_1": String(Q2_1.S2_1_1),
                "s2_1_2": String(Q2_1.S2_1_2),
                "s2_1_3": String(Q2_1.S2_1_3),

                "s2_12_1": String(""),
                "s2_12_2": String(""),
                "s2_12_3": String(""),
                "s2_12_4": String(""),
                "s2_12_5": String(""),
                "s2_12_6": String(""),
                "s2_12_7": String(""),
                "s2_12_8": String(""),
                "s2_12_9": String(""),

                "s2_2": String(S2_2),
                "s2_3": String(S2_3),
                "s2_4": String(S2_4),
                "s2_5": String(S2_5),
                "s2_6": String(S2_6),
                "s2_7": String(S2_7),
                "s2_8": String(S2_8),
                "s2_9": String(S2_9),
                "s2_10": String(S2_10),
                "s2_11": String(S2_11),

                "s3_1_1": String(Q3_1.S3_1_1),
                "s3_1_2": String(Q3_1.S3_1_2),
                "s3_1_3": String(Q3_1.S3_1_3),
                "s3_1_4": String(Q3_1.S3_1_4),
                "s3_1_5": String(Q3_1.S3_1_5),
                "s3_1_6": String(Q3_1.S3_1_6),
                "s3_1_7": String(Q3_1.S3_1_7),
                "s3_1_8": String(Q3_1.S3_1_8),

                "s3_1_first": String(S3_1_First),
                "s3_2": String(S3_2),

                "m_markvu_yn": String(""),
                "m_antera_yn": String(""),
                "m_cnk_01_yn": String(""),
                "create_dt": currentTime,
            }

            console.log("requestData : ", requestData);

            $.ajax({
                url: hairSurvey_API_URL,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(requestData),

                success: function (response) {
                    console.log("hairSurvey_API_URL 응답값 : ", response);
                    $("#custom_detail_main").html("문진(두피) 저장이 완료되었습니다.");
                    showErrorModal();

                    localStorage.setItem('solution_questionnaire_state2', true);


                    setTimeout(function () {
                        window.location.href = './analysis2.html';
                    }, 2000); // 2초 딜레이

                }, error: function (xhr, status, error) {
                    console.error('hairSurvey_API_URL 오류 : ', error);
                    $("#custom_detail_main").html("문진(두피) 저장에 실패하였습니다.");
                    showErrorModal();

                    // setTimeout(function () {
                    //     window.location.href = './analysis.html';
                    // }, 2000); // 2초
                }
            })
        }



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
    const radio5 = $(`#${radioIdPrefix}_005`);
    const radio6 = $(`#${radioIdPrefix}_006`);

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
        case '4':
            radio5.prop('checked', true);
            break;
        case '5':
            radio6.prop('checked', true);
            break;
    
        default:
            // Handle other cases if needed
            break;
    }
}
