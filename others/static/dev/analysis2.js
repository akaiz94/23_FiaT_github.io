var ReservedCustom_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/progress_flg/';
var DirectCustom_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/direct/progress_flg/';

var hairMain_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairMain/'


$(document).ready(function () {
    window.scrollTo(0, 200);
    console.log('analysis page start -> ');

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

    if (localStorage.getItem('ProgramCode') === 'PC001014') {
        console.log("피부프로그램");
        $("#noData_text").html('피부 프로그램에서 이용할 수 없는 페이지입니다.');
        $("#noData_text2").html('잠시후 예약확인 페이지로 이동합니다.');
        $('.msg-layer-noData').addClass('open');

        setTimeout(function () {
            $('.layer-wrap-noData').removeClass('open');
            window.location.href = './solution_reservation.html';;   // 문진(피부) 측정 페이지로 이동
        }, 2000); // 2초 

        return;
    }

    

    //상담 완료가 아닐경우 (상담완료는 진행률 이미 100%)
    if (localStorage.getItem('progress_flg') !== '10') {
        //직접 방문 고객의 상담 진행률
        if (localStorage.getItem('visitkey') === '0' && localStorage.getItem('custom_sculpResult') !== 'ok') {
            console.log("직방 고객 상담 진행률 체크")
            $.ajax({
                url: DirectCustom_API_URL + localStorage.getItem('skey'),
                type: 'PATCH',
                data: JSON.stringify({ "progress_flg": "104" }), //두피측정 진행중
                contentType: 'application/json',

                success: function (response) {
                    console.log('=====================');
                    console.log('두피 측정 인입 성공 : ', response);
                },

                error: function (xhr, status, error) {
                    console.error('두피 측정 인입 에러 : ', error);
                }
            })
        }
        //예약 방문 고객의 상담 진행률
        else if (localStorage.getItem('visitkey') !== '0' && localStorage.getItem('custom_sculpResult') !== 'ok') {
            console.log("예약 고객 상담 진행률 체크")
            $.ajax({
                url: ReservedCustom_API_URL + localStorage.getItem('visitkey') + '/' + localStorage.getItem('skey'),
                type: 'PATCH',
                data: JSON.stringify({ "progress_flg": "104" }), //피부문진 진행중
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



    // asm_searchButton 버튼 요소를 가져옵니다.
    const asmButton = document.getElementById('asm_searchButton');

    // 클릭 이벤트 핸들러를 추가합니다.
    asmButton.addEventListener('click', function () {
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        // const currentTime = new Date();        

        console.log("두피,모발 조회버튼 클릭 : ");
        var surveyNo = localStorage.getItem('custom_surveyNo');

        $.ajax({
            // url: SkinSurvey_API_URL + surveyNo,
            url: hairMain_URL + '?surveyNo=' + surveyNo,
            type: 'GET',
            success: function (response) {
                console.log("hairMain_URL 응답값 : ", response);
                $("#custom_detail").html("두피,모발 데이터 조회 완료");

                localStorage.setItem('custom_asm', true);
                showErrorModal();
            }, error: function (xhr, status, error) {
                console.error('hairMain_URL 오류 : ', error);
                $("#custom_detail").html("두피측정을 먼저 진행해주세요.");
                showErrorModal();
            }
        });
    });
});







function showErrorModal() {
    $('.search-result-layer-error').addClass('open');
    // console.log("안내 모달창");
}

