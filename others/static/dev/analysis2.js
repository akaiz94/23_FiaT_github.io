
var hairMain_URL = 'http://localhost:8000/v1/hairMain/'




$(document).ready(function () {
    window.scrollTo(0, 200);
    console.log('analysis page start -> ');

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
            url: hairMain_URL +  '?surveyNo=' + surveyNo,
            type: 'GET',
            success: function (response) {
                console.log("hairMain_URL 응답값 : ", response);             
                $("#custom_detail").html("두피,모발 데이터 조회 완료");
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

