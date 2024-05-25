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





