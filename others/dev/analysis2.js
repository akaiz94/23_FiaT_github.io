
var hairMain_URL = 'http://127.0.0.1:8000/v1/hairMain/'




$(document).ready(function () {
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
            url: hairMain_URL + surveyNo,
            type: 'GET',
            success: function (response) {
                console.log("hairMain_URL 응답값 : ", response);
                alert("두피,모발 데이터 조회 완료");
            }, error: function (xhr, status, error) {
                console.error('hairMain_URL 오류 : ', error);
                alert("ASM기기측정을 먼저 진행해주세요.");
            }
        });
    });
});