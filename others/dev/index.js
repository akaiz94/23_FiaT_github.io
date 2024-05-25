var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 5,
    startIndex: 0,
}
$(document).ready(function () {
    console.log('index page start -> ')
});








<script>
$(document).ready(function() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var backgroundImage = new Image();

    // 이미지 로드 완료 시 호출되는 함수
    backgroundImage.onload = function() {
        // 배경 이미지를 캔버스에 그립니다
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // 첫 번째 선: 기본 스타일
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(200, 200);
        ctx.stroke();

        // 두 번째 선: 빨간색, 두께 5px
        ctx.beginPath();
        ctx.moveTo(200, 50);
        ctx.lineTo(50, 200);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.stroke();

        // 세 번째 선: 파란색, 두께 2px, 점선
        ctx.beginPath();
        ctx.moveTo(50, 250);
        ctx.lineTo(200, 400);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 15]);
        ctx.stroke();

        // 점선 설정 해제
        ctx.setLineDash([]);
    };

    // 배경 이미지 경로 설정
    backgroundImage.src = './resource/images/img-report001-M.png';
});
</script>