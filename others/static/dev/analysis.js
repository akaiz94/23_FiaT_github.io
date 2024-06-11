var ResultMarkvu_API_URL = 'http://localhost:8000/v1/skin/markvu/result/';

var cutometer_API_URL = 'http://localhost:8000/v1/skin/cutometer/';
var vapometer_API_URL = 'http://localhost:8000/v1/skin/vapometer/';
var antera_API_URL = 'http://localhost:8000/v1/skin/antera/';


const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
const surveyDate = moment().format('YYYY/MM/DD');


var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 5,
    startIndex: 0,
}

$(document).ready(function () {
    
    window.scrollTo(0, 200);
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');

    console.log('analysis page start -> ')
    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));
    console.log("custom_sex : ", localStorage.getItem('custom_sex'));
    console.log("custom_name : ", localStorage.getItem('custom_name'));
    console.log("visitDate : ", localStorage.getItem('visitDate'));



    $('#manager_name').text(localStorage.getItem('manager_name'));
    $('[id="custom_name"]').text(localStorage.getItem('custom_name'));

    var surveyNo = localStorage.getItem('custom_surveyNo');

    /***
    *   #1 마크뷰 측정조회
    *  
    ***/
    $('#markvu_searchButton').click(function () {

        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        // const currentTime = new Date();        

        console.log("마크뷰 조회버튼 클릭 : ");


        $.ajax({
            // url: SkinSurvey_API_URL + surveyNo,
            // url: ResultMarkvu_API_URL +  '?surveyNo=' +surveyNo, //실제 데이터 인입
            url: ResultMarkvu_API_URL + '?surveyNo=' + 2277,

            type: 'GET',
            success: function (response) {
                console.log("ResultMarkvu_API_URL 응답값 : ", response);

                if (response.length === 0) {
                    $("#custom_detail").html("마크뷰 측정을 먼저 진행해주세요.");
                    showErrorModal();
                } else if (response.length > 0) {
                    $("#custom_detail").html("마크뷰 데이터 조회 완료");
                    showErrorModal();

                    $('.analysis-layer').removeClass('open');
                    
                }

            }, error: function (xhr, status, error) {
                console.error('ResultMarkvu_API_URL 오류 : ', error);
                $("#custom_detail").html("통신 오류. 다시한번 시도해주세요.");
                showErrorModal();

            }
        })
    })


    /***
    *   #2 안테라 기기측정
    *  
    ***/
    var wrinkleEye_Left; // 눈가주름
    var wrinkleEye_Right;
    var melanin_Left; // 멜라닌
    var melanin_Right;
    var dull_Left; // 칙칙함
    var dull_Right;
    var hemoglobin_Left; // 헤모글로빈
    var hemoglobin_Right;



    $('#wrinkleEye_Left').on('input', function () {
        wrinkleEye_Left = $(this).val();
    });
    $('#wrinkleEye_Right').on('input', function () {
        wrinkleEye_Right = $(this).val();
    });
    $('#melanin_Left').on('input', function () {
        melanin_Left = $(this).val();
    });
    $('#melanin_Right').on('input', function () {
        melanin_Right = $(this).val();
    });
    $('#dull_Left').on('input', function () {
        dull_Left = $(this).val();
    });
    $('#dull_Right').on('input', function () {
        dull_Right = $(this).val();
    });
    $('#hemoglobin_Left').on('input', function () {
        hemoglobin_Left = $(this).val();
    });
    $('#hemoglobin_Right').on('input', function () {
        hemoglobin_Right = $(this).val();
    });


    $('#antera_saveButton').click(function () {
        console.log("surveyNo : ", surveyNo);

        var requestData = {
            "surveyNo": localStorage.getItem('custom_surveyNo'),
            "userKey": localStorage.getItem('custom_userkey'),
            "J_normal": String(wrinkleEye_Left),
            "J_laugh": String(wrinkleEye_Right),
            "M_left": String(melanin_Left),
            "M_right": String(melanin_Right),
            "H_left": String(hemoglobin_Left),
            "H_right": String(hemoglobin_Right),
            "C_left": String(dull_Left),
            "C_right": String(dull_Right),
            "create_dt": currentTime
        }
   
        console.log("antera requestData : ", requestData);

        if (Object.values(requestData).some(value => value === "undefined" || value === "")) {
            $("#custom_detail").html("측정값이 모두 입력되었는지 확인해주세요.");
            showErrorModal();

        } else {
            $.ajax({
                // url: SkinSurvey_API_URL + surveyNo,
                url: antera_API_URL,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(requestData),
    
                success: function (response) {
                    console.log("antera_API_URL 응답값 : ", response);
                    $("#custom_detail").html("안테라 측정값 저장 완료");
                    showErrorModal();       

                    $('.analysis-layer').removeClass('open');         
    
                }, error: function (xhr, status, error) {
                    console.error('antera_API_URL 오류 : ', error);
                    $("#custom_detail").html("안테라 측정값 저장 실패");
                    showErrorModal();
                }
            })
        }




    })


    /***
    *   #3 큐토미터 기기측정
    *  
    ***/

    var eye_area; // 눈가 주변
    var cheek; // 볼

    $('#eye_area').on('input', function () {
        eye_area = $(this).val();
    });
    $('#cheek').on('input', function () {
        cheek = $(this).val();
    });


    $('#cutometer_saveButton').click(function () {
        console.log("surveyNo : ", surveyNo);
        console.log("eye_area : ", eye_area);
        console.log("cheek : ", cheek);

        var requestData = {
            "surveyNo": localStorage.getItem('custom_surveyNo'),
            "userKey": localStorage.getItem('custom_userkey'),
            "eye_area": String(eye_area),
            "cheek": String(cheek),
            "create_dt": currentTime
        }

        console.log("cutometer requestData : ", requestData);

        if (Object.values(requestData).some(value => value === "undefined" || value === "")) {
            $("#custom_detail").html("측정값이 모두 입력되었는지 확인해주세요.");
            showErrorModal();

        } else {
            $.ajax({
                // url: SkinSurvey_API_URL + surveyNo,
                url: cutometer_API_URL,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(requestData),
    
                success: function (response) {
                    console.log("cutometer_API_URL 응답값 : ", response);
                    $("#custom_detail").html("큐토미터 측정값 저장 완료");
                    showErrorModal();

                    $('.analysis-layer').removeClass('open');
    
    
                }, error: function (xhr, status, error) {
                    console.error('cutometer_API_URL 오류 : ', error);
                    $("#custom_detail").html("큐토미터 측정값 저장 실패");
                    showErrorModal();
                }
            })
        }
        
    })


    /***
    *   #4 바포미터 기기측정
    *  
    ***/

    var cheek_Left; // 왼쪽 볼
    var cheek_Right; // 오른쪽 볼

    $('#cheek_Left').on('input', function () {
        cheek_Left = $(this).val();
    });
    $('#cheek_Right').on('input', function () {
        cheek_Right = $(this).val();
    });


    $('#vapometer_saveButton').click(function () {      
        var requestData = {
            "surveyNo": localStorage.getItem('custom_surveyNo'),
            "userKey": localStorage.getItem('custom_userkey'),
            "C_Left": String(cheek_Left),
            "C_Right": String(cheek_Right),
            "create_dt": currentTime
        }
        // console.log("surveyNo-Type : ", typeof (parseInt(surveyNo)));
        // console.log("userKey-Type : ", typeof (parseInt(7777)));
        // console.log("cheek_Left-Type : ", typeof (cheek_Left));
        // console.log("cheek_Right-Type : ", typeof (cheek_Right));
        // console.log("currentTime-Type : ", typeof (currentTime));

        console.log("vapometer requestData : ", requestData);


        if (Object.values(requestData).some(value => value === "undefined" || value === "")) {
            $("#custom_detail").html("측정값이 모두 입력되었는지 확인해주세요.");
            showErrorModal();

        } else {
            $.ajax({
                // url: SkinSurvey_API_URL + surveyNo,
                url: vapometer_API_URL,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(requestData),
    
                success: function (response) {
                    console.log("vapometer_API_URL 응답값 : ", response);
                    $("#custom_detail").html("바포미터 측정값 저장 완료");
                    showErrorModal();

                    $('.analysis-layer').removeClass('open');
                        
                }, error: function (xhr, status, error) {
                    console.error('vapometer_API_URL 오류 : ', error);
                    $("#custom_detail").html("바포미터 측정값 저장 실패");
                    showErrorModal();
                }
            })
        }
        



        // $.ajax({
        //     // url: SkinSurvey_API_URL + surveyNo,
        //     url: vapometer_API_URL,
        //     type: 'POST',
        //     accept: 'application/json',
        //     contentType: 'application/json',
        //     body: requestData,

        //     success: function (response) {
        //         console.log("vapometer_API_URL 응답값 : ", response);


        //     }, error: function (xhr, status, error) {
        //         console.error('vapometer_API_URL 오류 : ', error);
        //     }
        // })
    })



})




function showErrorModal() {
    $('.search-result-layer-error').addClass('open');
    // console.log("안내 모달창");
}

