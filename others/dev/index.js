var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 5,
    startIndex: 0,
}
$(document).ready(function () {
    console.log('index page start -> ')
});








$(document).ready(function () {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var isDrawing = false;
    var lastX = 0;
    var lastY = 0;

    canvas.addEventListener('mousedown', function (e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', function (e) {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mouseup', function () {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', function () {
        isDrawing = false;
    });
});







$(document).ready(function () {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var isDrawing = false;
    var isErasing = false;
    var lastX = 0;
    var lastY = 0;
    var selectedColor = '#000000'; // 기본색은 검은색으로 설정

    $('#drawBtn').click(function () {
        isDrawing = true;
        isErasing = false;
    });

    $('#eraseBtn').click(function () {
        isErasing = true;
        isDrawing = false;
    });

    $('#colorPicker').change(function () {
        selectedColor = $(this).val();
    });

    canvas.addEventListener('mousedown', function (e) {
        if (isDrawing || isErasing) {
            isDrawing ? ctx.strokeStyle = selectedColor : ctx.strokeStyle = 'white';
            isDrawing ? ctx.globalCompositeOperation = 'source-over' : ctx.globalCompositeOperation = 'destination-out';
            isDrawing = true;
            isErasing = false;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }
    });

    canvas.addEventListener('mousemove', function (e) {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mouseup', function () {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', function () {
        isDrawing = false;
    });
});






        $(document).ready(function() {
            var backgroundCanvas = document.getElementById('backgroundCanvas');
            var backgroundCtx = backgroundCanvas.getContext('2d');
            var overlayCanvas = document.getElementById('overlayCanvas');
            var overlayCtx = overlayCanvas.getContext('2d');
            var isDrawing = false;
            var isErasing = false;
            var lastX = 0;
            var lastY = 0;
            var selectedColor = '#000000'; // 기본색은 검은색으로 설정

            var backgroundImage = new Image();
            backgroundImage.src = './resource/images/img-report001-M.png';

            backgroundImage.onload = function() {
                backgroundCtx.drawImage(backgroundImage, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
            };

            $('#drawBtn').click(function() {
                isDrawing = true;
                isErasing = false;
            });

            $('#eraseBtn').click(function() {
                isErasing = true;
                isDrawing = false;
            });

            $('#colorPicker').change(function() {
                selectedColor = $(this).val();
            });

            overlayCanvas.addEventListener('mousedown', function(e) {
                if (!isDrawing && !isErasing) return;
                if (e.button === 0 && isDrawing) {
                    isDrawing = true;
                    isErasing = false;
                } else if (e.button === 2 && isErasing) {
                    isErasing = true;
                    isDrawing = false;
                }
                [lastX, lastY] = [e.offsetX, e.offsetY];
            });

            overlayCanvas.addEventListener('mousemove', function(e) {
                if (!(isDrawing || isErasing)) return;
                if (e.buttons !== 1 && e.buttons !== 2) return; // 마우스 왼쪽 또는 오른쪽 버튼이 눌려있지 않으면 그리기 또는 지우개 중지
                if (isDrawing) {
                    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
                    overlayCtx.strokeStyle = selectedColor;
                    overlayCtx.beginPath();
                    overlayCtx.moveTo(lastX, lastY);
                    overlayCtx.lineTo(e.offsetX, e.offsetY);
                    overlayCtx.stroke();
                } else if (isErasing) {
                    overlayCtx.clearRect(e.offsetX - 5, e.offsetY - 5, 10, 10);
                }
                [lastX, lastY] = [e.offsetX, e.offsetY];
            });

            overlayCanvas.addEventListener('mouseup', function() {
                isDrawing = false;
                isErasing = false;
            });

            overlayCanvas.addEventListener('mouseout', function() {
                isDrawing = false;
                isErasing = false;
            });
        });
