var vapometer_API_URL = 'http://127.0.0.1:8000/v1/skin/vapometer/';
var ResultMarkvu_API_URL = 'http://127.0.0.1:8000/v1/skin/markvu/result/';




var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 5,
    startIndex: 0,
}
$(document).ready(function () {

    console.log('analysis page start -> ')
    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));
});




$(document).ready(function () {
    var surveyNo = localStorage.getItem('custom_surveyNo');
    $('#survey-value').on('input', function () {
        surveyNo = $(this).val();
        //console.log('입력된 Survey Value 값 : ',surveyNo);
    })

    $('#submit-button').click(function () {
        console.log("surveyNo : ", surveyNo);
        localStorage.setItem('custom_surveyNo', surveyNo);
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


    $('#markvu_saveButton').click(function () {
        console.log("surveyNo : ", surveyNo);
        console.log("wrinkleEye_Left : ", wrinkleEye_Left);
        console.log("wrinkleEye_Right : ", wrinkleEye_Right);
        console.log("melanin_Left : ", melanin_Left);
        console.log("melanin_Right : ", melanin_Right);
        console.log("dull_Left : ", dull_Left);
        console.log("dull_Right : ", dull_Right);
        console.log("hemoglobin_Left : ", hemoglobin_Left);
        console.log("hemoglobin_Right : ", hemoglobin_Right);

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

        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        // const currentTime = new Date();

        var requestData = {
            "surveyNo": parseInt(surveyNo),
            "userKey": parseInt(7777),
            "C_Left": cheek_Left,
            "C_Right": cheek_Right,
            "create_dt": currentTime
        }
        // console.log("surveyNo-Type : ", typeof (parseInt(surveyNo)));
        // console.log("userKey-Type : ", typeof (parseInt(7777)));
        // console.log("cheek_Left-Type : ", typeof (cheek_Left));
        // console.log("cheek_Right-Type : ", typeof (cheek_Right));
        // console.log("currentTime-Type : ", typeof (currentTime));

        console.log("requestData : ", requestData);

        $.ajax({
            // url: SkinSurvey_API_URL + surveyNo,
            url: vapometer_API_URL,
            type: 'POST',
            contentType: 'application/json',
            body: requestData,

            success: function (response) {
                console.log("vapometer_API_URL 응답값 : ", response);


            }, error: function (xhr, status, error) {
                console.error('vapometer_API_URL 오류 : ', error);
            }
        })
    })


    $('#markvu_searchButton').click(function () {

        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        // const currentTime = new Date();        

        console.log("마크뷰 조회버튼 클릭 : ");


        $.ajax({
            // url: SkinSurvey_API_URL + surveyNo,
            url: ResultMarkvu_API_URL + surveyNo,
            type: 'GET',
            success: function (response) {
                console.log("ResultMarkvu_API_URL 응답값 : ", response);
                alert("마크뷰 데이터 조회 완료")


            }, error: function (xhr, status, error) {
                console.error('ResultMarkvu_API_URL 오류 : ', error);
                alert("마크뷰 측정을 먼저 진행해주세요.")

            }
        })
    })

})
