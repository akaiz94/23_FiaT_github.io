
var hairMain_URL = 'http://localhost:8000/v1/hairMain/';

var hairLeftHairLine_URL = 'http://localhost:8000/v1/hairLeftHairLine/';
var hairFrontCenter_URL = 'http://localhost:8000/v1/hairFrontCenter/';
var hairFrontHairLine_URL = 'http://localhost:8000/v1/hairFrontHairLine/';
var hairCenter_URL = 'http://localhost:8000/v1/hairCenter/';
var hairRightHairLine_URL = 'http://localhost:8000/v1/hairRightHairLine/';
var hairBack_URL = 'http://localhost:8000/v1/hairBack/';

$(document).ready(function () {
    window.scrollTo(0, 470);
    console.log('analysis2_result_history page start -> ')
    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));

    
    // var surveyNo = localStorage.getItem('custom_surveyNo');
    var surveyNo = 1111;
    console.log('surveyNo : ', surveyNo);
    
    $('#manager_name').text(localStorage.getItem('manager_name'));
    $('#custom_name').text(localStorage.getItem('custom_name'));

    if (localStorage.getItem('manager_name').length === 2) {
        // $("#title_date").css("margin-right","90px");   
        document.getElementById("title_date").style.marginRight = "90px";
        document.getElementById("title_count").style.marginRight = "145px";
    }


    $('#visitDate').text(localStorage.getItem('visitDate'));


    $.ajax({
        url: hairMain_URL + '?surveyNo=' + surveyNo,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            console.log('hairMain_URL 응답값 : ', response);


            // 1st. Scalp Type History값
            var ScalpType_Nor = response[0].ScalpType_Nor;
            var ScalpType_Oily = response[0].ScalpType_Oily;
            var ScalpType_Ato = response[0].ScalpType_Ato;
            var ScalpType_Trb = response[0].ScalpType_Trb;
            var ScalpType_Dry = response[0].ScalpType_Dry;
            var ScalpType_Sen = response[0].ScalpType_Sen;
            var ScalpType_Seb = response[0].ScalpType_Seb;
            var ScalpType_Ddan = response[0].ScalpType_Ddan;
            var ScalpType_Odan = response[0].ScalpType_Odan;
            var ScalpType_Unknown = response[0].ScalpType_Unknown;
            var create_dt = response[0].create_dt;

            // 1-1. 두피 타입 입력
            var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
            $('#scalp-type-1').append(scalpType);
            $('#scalp-type-2').append(scalpType);


            //1-2. 측정 일자 입력
            var scalpDate = create_dt.substring(0, 4) + '. ' + create_dt.substring(5, 7) + '. ' + create_dt.substring(8, 10);
            $('#scalp-type-1 .date').text(scalpDate);
            $('#scalp-type-2 .date').text(scalpDate);


            /********************** */

            // 2nd. Hair Conditions History값
            var Haircondition_Tips = response[0].Haircondition_Tips;
            var Haircondition_Mid = response[0].Haircondition_Mid;
            var Haircondition_Root = response[0].Haircondition_Root;


            var Haircondition_Tips_Result = getHaiconditionResult(parseInt(Haircondition_Tips));
            var Haircondition_Mid_Result = getHaiconditionResult(parseInt(Haircondition_Mid));
            var Haircondition_Root_Result = getHaiconditionResult(parseInt(Haircondition_Root));

            console.log('Haircondition_Root_Result : ', Haircondition_Root_Result);
            $('#haircondition-tips-1').append(Haircondition_Tips_Result);
            $('#haircondition-mid-1').append(Haircondition_Mid_Result);
            $('#haircondition-root-1').append(Haircondition_Root_Result);

            $('#haircondition-tips-2').append(Haircondition_Tips_Result);
            $('#haircondition-mid-2').append(Haircondition_Mid_Result);
            $('#haircondition-root-2').append(Haircondition_Root_Result);


            /********************** */

            // 3rd. Hair Density  History값
            var HairlossType_Basic = response[0].HairlossType_Basic; //기본
            var HairlossType_Center = response[0].HairlossType_Center; //정수리
            var HairlossType_FrontCenter = response[0].HairlossType_FrontCenter; //앞중앙

            console.log("response[0].HairlossType_FrontCenter : ", HairlossType_FrontCenter);
            $('#HairlossType-Basic-1').append(HairlossType_Basic);
            $('#HairlossType-Center-1').append(HairlossType_Center);
            $('#HairlossType-FrontCenter-1').append(HairlossType_FrontCenter);

            $('#HairlossType-Basic-2').append(HairlossType_Basic);
            $('#HairlossType-Center-2').append(HairlossType_Center);
            $('#HairlossType-FrontCenter-2').append(HairlossType_FrontCenter);






        }, error: function (xhr, status, error) {
            console.error('hairMain_URL 오류 : ', error);
        }

    });




    // 1.왼쪽 헤어라인
    $.ajax({
        url: hairLeftHairLine_URL + '?surveyNo=' + surveyNo,
        type: 'GET',
        success: function (response) {
            console.log('hairLeftHairLine 응답 : ', response);

            var density_1 = response[0].Density;
            var thickness_1 = response[0].Thickness;

            console.log("density_1 : ", density_1);
            console.log("thickness_1 : ", thickness_1);

            update_hairLeftHairLine_density_Data(density_1, density_1);
            update_hairLeftHairLine_thickness_Data(thickness_1, thickness_1);


        },
        error: function (xhr, status, error) {

            console.error('hairLeftHairLine 에러 : ', error);
        }
    })


    // 2.앞 헤어라인
    $.ajax({
        url: hairFrontHairLine_URL + '?surveyNo=' + surveyNo,
        type: 'GET',
        success: function (response) {
            console.log('hairFrontHairLine_URL 응답 : ', response);

            var density_1 = response[0].Density;
            var thickness_1 = response[0].Thickness;

            console.log("density_1 : ", density_1);
            console.log("thickness_1 : ", thickness_1);

            update_hairFrontHairLine_density_Data(density_1, density_1);
            update_hairFrontHairLine_thickness_Data(thickness_1, thickness_1);


        },
        error: function (xhr, status, error) {

            console.error('hairFrontHairLine_URL 에러 : ', error);
        }
    })


    // 3.오른쪽 헤어라인
    $.ajax({
        url: hairRightHairLine_URL + '?surveyNo=' + surveyNo,
        type: 'GET',
        success: function (response) {
            console.log('hairRightHairLine_URL 응답 : ', response);

            var density_1 = response[0].Density;
            var thickness_1 = response[0].Thickness;

            console.log("density_1 : ", density_1);
            console.log("thickness_1 : ", thickness_1);

            update_hairRightHairLine_density_Data(density_1, density_1);
            update_hairRightHairLine_thickness_Data(thickness_1, thickness_1);


        },
        error: function (xhr, status, error) {

            console.error('hairRightHairLine_URL 에러 : ', error);
        }
    })

    // 4.앞 중앙
    $.ajax({
        url: hairFrontCenter_URL + '?surveyNo=' + surveyNo,
        type: 'GET',
        success: function (response) {
            console.log('hairFrontCenter_URL 응답 : ', response);

            var density_1 = response[0].Density;
            var thickness_1 = response[0].Thickness;

            console.log("density_1 : ", density_1);
            console.log("thickness_1 : ", thickness_1);

            update_hairFrontCenter_density_Data(density_1, density_1);
            update_hairFrontCenter_thickness_Data(thickness_1, thickness_1);


        },
        error: function (xhr, status, error) {

            console.error('hairFrontCenter_URL 에러 : ', error);
        }
    })




    // 5. 정수리
    $.ajax({
        url: hairCenter_URL + '?surveyNo=' + surveyNo,
        type: 'GET',
        success: function (response) {
            console.log('hairCenter_URL 응답 : ', response);

            var density_1 = response[0].Density;
            var thickness_1 = response[0].Thickness;

            console.log("density_1 : ", density_1);
            console.log("thickness_1 : ", thickness_1);

            update_hairCenter_density_Data(density_1, density_1);
            update_hairCenter_thickness_Data(thickness_1, thickness_1);


        },
        error: function (xhr, status, error) {

            console.error('hairCenter_URL 에러 : ', error);
        }
    })



    // 6. 후두부
    $.ajax({
        url: hairBack_URL + '?surveyNo=' + surveyNo,
        type: 'GET',
        success: function (response) {
            console.log('hairBack_URL 응답 : ', response);

            var density_1 = response[0].Density;
            var thickness_1 = response[0].Thickness;

            console.log("density_1 : ", density_1);
            console.log("thickness_1 : ", thickness_1);

            update_hairBack_density_Data(density_1, density_1);
            update_hairBack_thickness_Data(thickness_1, thickness_1);


        },
        error: function (xhr, status, error) {

            console.error('hairBack_URL 에러 : ', error);
        }
    })







});






/****************** Hair Thickness & Density History ***************************/

/*
*************************************************************
*24. 05. 21 #1-1 좌 '굵기'변화  차트생성 및 업데이트
*/

var hairLeftHairLine_density_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [0.073, 0.077], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 2, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        // lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}

var hairLeftHairLine_density_ctx = document.getElementById('hairLeftHairLine_density_Chart').getContext('2d');
var hairLeftHairLine_density_Chart = new Chart(hairLeftHairLine_density_ctx, {
    type: 'line',
    data: hairLeftHairLine_density_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 180, // y축 최대값
                min: 0,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 120,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 240 ? '' : value;
                    }
                },
                grid: {
                    display: true // 
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 14
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            },
            tooltip: {
                enabled: false // 툴팁 숨기기
            },
            datalabels: {
                display: true,
                anchor: 'end',
                align: 'top',
                color: '#666',
                font: {
                    weight: 'bold'
                },
                formatter: function (value) {
                    return value.toFixed(0); // 데이터 라벨 형식 지정
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});



function update_hairLeftHairLine_density_Data(data1, data2, data3, data4) {

    hairLeftHairLine_density_data.datasets[0].data[0] = data1;
    hairLeftHairLine_density_data.datasets[0].data[1] = data2;
    hairLeftHairLine_density_data.datasets[0].data[2] = data3;
    hairLeftHairLine_density_data.datasets[0].data[3] = data4;

    var before_hairLeftHairLine_density_data = [data1, data2, data3, data4];
    var after_hairLeftHairLine_density_data = []; //data값중 null을 제외한 후 저장



    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_hairLeftHairLine_density_data[i] !== undefined) {
            after_hairLeftHairLine_density_data.push(before_hairLeftHairLine_density_data[i]);
        }
    }
    // var min_hairLeftHairLine_density_data = Math.min(...after_hairLeftHairLine_density_data);
    // hairLeftHairLine_density_Chart.options.scales.y.min = parseInt(min_hairLeftHairLine_density_data - 10);



    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_hairLeftHairLine_density_data.length - 1;
    console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_hairLeftHairLine_density_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    hairLeftHairLine_density_data.datasets[0].borderColor = colors;
    hairLeftHairLine_density_data.datasets[0].pointBackgroundColor = colors;


    hairLeftHairLine_density_Chart.update();
}



/*
*
*24. 05. 21 #1-2 좌 '밀도'변화  차트생성 및 업데이트
*/

var hairLeftHairLine_thickness_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [0.073, 0.077], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 2, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        // lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}

var hairLeftHairLine_thickness_ctx = document.getElementById('hairLeftHairLine_thickness_Chart').getContext('2d');
var hairLeftHairLine_thickness_Chart = new Chart(hairLeftHairLine_thickness_ctx, {
    type: 'line',
    data: hairLeftHairLine_thickness_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 0.12, // y축 최대값
                min: 0,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 0.075,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 240 ? '' : value;
                    }
                },
                grid: {
                    display: true // 
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 14
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            },
            tooltip: {
                enabled: false // 툴팁 숨기기
            },
            datalabels: {
                display: true,
                anchor: 'end',
                align: 'top',
                color: '#666',
                font: {
                    weight: 'bold'
                },
                formatter: function (value) {
                    return value.toFixed(3); // 데이터 라벨 형식 지정
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});



function update_hairLeftHairLine_thickness_Data(data1, data2, data3, data4) {

    hairLeftHairLine_thickness_data.datasets[0].data[0] = data1;
    hairLeftHairLine_thickness_data.datasets[0].data[1] = data2;
    hairLeftHairLine_thickness_data.datasets[0].data[2] = data3;
    hairLeftHairLine_thickness_data.datasets[0].data[3] = data4;

    var before_hairLeftHairLine_thickness_data = [data1, data2, data3, data4];
    var after_hairLeftHairLine_thickness_data = []; //data값중 null을 제외한 후 저장



    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_hairLeftHairLine_thickness_data[i] !== undefined) {
            after_hairLeftHairLine_thickness_data.push(before_hairLeftHairLine_thickness_data[i]);
        }
    }
    // var min_hairLeftHairLine_density_data = Math.min(...after_hairLeftHairLine_density_data);
    // hairLeftHairLine_density_Chart.options.scales.y.min = parseInt(min_hairLeftHairLine_density_data - 10);



    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_hairLeftHairLine_thickness_data.length - 1;
    console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_hairLeftHairLine_thickness_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    hairLeftHairLine_thickness_data.datasets[0].borderColor = colors;
    hairLeftHairLine_thickness_data.datasets[0].pointBackgroundColor = colors;


    hairLeftHairLine_thickness_Chart.update();
}







/*
*************************************************************
*24. 05. 21 #2-1 앞 '굵기'변화  차트생성 및 업데이트
*/

var hairFrontHairLine_density_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [0.073, 0.077], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 2, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        // lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}

var hairFrontHairLine_density_ctx = document.getElementById('hairFrontHairLine_density_Chart').getContext('2d');
var hairFrontHairLine_density_Chart = new Chart(hairFrontHairLine_density_ctx, {
    type: 'line',
    data: hairFrontHairLine_density_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 180, // y축 최대값
                min: 0,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 120,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 240 ? '' : value;
                    }
                },
                grid: {
                    display: true // 
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 14
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            },
            tooltip: {
                enabled: false // 툴팁 숨기기
            },
            datalabels: {
                display: true,
                anchor: 'end',
                align: 'top',
                color: '#666',
                font: {
                    weight: 'bold'
                },
                formatter: function (value) {
                    return value.toFixed(0); // 데이터 라벨 형식 지정
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});



function update_hairFrontHairLine_density_Data(data1, data2, data3, data4) {

    hairFrontHairLine_density_data.datasets[0].data[0] = data1;
    hairFrontHairLine_density_data.datasets[0].data[1] = data2;
    hairFrontHairLine_density_data.datasets[0].data[2] = data3;
    hairFrontHairLine_density_data.datasets[0].data[3] = data4;

    var before_hairFrontHairLine_density_data = [data1, data2, data3, data4];
    var after_hairFrontHairLine_density_data = []; //data값중 null을 제외한 후 저장



    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_hairFrontHairLine_density_data[i] !== undefined) {
            after_hairFrontHairLine_density_data.push(before_hairFrontHairLine_density_data[i]);
        }
    }
    // var min_hairFrontHairLine_density_data = Math.min(...after_hairFrontHairLine_density_data);
    // hairFrontHairLine_density_Chart.options.scales.y.min = parseInt(min_hairFrontHairLine_density_data - 10);



    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_hairFrontHairLine_density_data.length - 1;
    // console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_hairFrontHairLine_density_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    hairFrontHairLine_density_data.datasets[0].borderColor = colors;
    hairFrontHairLine_density_data.datasets[0].pointBackgroundColor = colors;


    hairFrontHairLine_density_Chart.update();
}



/*
*
*24. 05. 21 #2-2 앞 '밀도'변화  차트생성 및 업데이트
*/

var hairFrontHairLine_thickness_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [0.073, 0.077], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 2, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        // lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}

var hairFrontHairLine_thickness_ctx = document.getElementById('hairFrontHairLine_thickness_Chart').getContext('2d');
var hairFrontHairLine_thickness_Chart = new Chart(hairFrontHairLine_thickness_ctx, {
    type: 'line',
    data: hairFrontHairLine_thickness_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 0.12, // y축 최대값
                min: 0,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 0.075,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 240 ? '' : value;
                    }
                },
                grid: {
                    display: true // 
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 14
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            },
            tooltip: {
                enabled: false // 툴팁 숨기기
            },
            datalabels: {
                display: true,
                anchor: 'end',
                align: 'top',
                color: '#666',
                font: {
                    weight: 'bold'
                },
                formatter: function (value) {
                    return value.toFixed(3); // 데이터 라벨 형식 지정
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});



function update_hairFrontHairLine_thickness_Data(data1, data2, data3, data4) {

    hairFrontHairLine_thickness_data.datasets[0].data[0] = data1;
    hairFrontHairLine_thickness_data.datasets[0].data[1] = data2;
    hairFrontHairLine_thickness_data.datasets[0].data[2] = data3;
    hairFrontHairLine_thickness_data.datasets[0].data[3] = data4;

    var before_hairFrontHairLine_thickness_data = [data1, data2, data3, data4];
    var after_hairFrontHairLine_thickness_data = []; //data값중 null을 제외한 후 저장



    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_hairFrontHairLine_thickness_data[i] !== undefined) {
            after_hairFrontHairLine_thickness_data.push(before_hairFrontHairLine_thickness_data[i]);
        }
    }
    // var min_hairFrontHairLine_density_data = Math.min(...after_hairFrontHairLine_density_data);
    // hairFrontHairLine_density_Chart.options.scales.y.min = parseInt(min_hairFrontHairLine_density_data - 10);



    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_hairFrontHairLine_thickness_data.length - 1;
    // console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_hairFrontHairLine_thickness_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    hairFrontHairLine_thickness_data.datasets[0].borderColor = colors;
    hairFrontHairLine_thickness_data.datasets[0].pointBackgroundColor = colors;


    hairFrontHairLine_thickness_Chart.update();
}








/*
*************************************************************
*24. 05. 21 #3-1 오른쪽 '굵기'변화  차트생성 및 업데이트
*/

var hairRightHairLine_density_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [0.073, 0.077], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 2, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        // lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}

var hairRightHairLine_density_ctx = document.getElementById('hairRightHairLine_density_Chart').getContext('2d');
var hairRightHairLine_density_Chart = new Chart(hairRightHairLine_density_ctx, {
    type: 'line',
    data: hairRightHairLine_density_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 180, // y축 최대값
                min: 0,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 120,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 240 ? '' : value;
                    }
                },
                grid: {
                    display: true // 
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 14
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            },
            tooltip: {
                enabled: false // 툴팁 숨기기
            },
            datalabels: {
                display: true,
                anchor: 'end',
                align: 'top',
                color: '#666',
                font: {
                    weight: 'bold'
                },
                formatter: function (value) {
                    return value.toFixed(0); // 데이터 라벨 형식 지정
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});



function update_hairRightHairLine_density_Data(data1, data2, data3, data4) {

    hairRightHairLine_density_data.datasets[0].data[0] = data1;
    hairRightHairLine_density_data.datasets[0].data[1] = data2;
    hairRightHairLine_density_data.datasets[0].data[2] = data3;
    hairRightHairLine_density_data.datasets[0].data[3] = data4;

    var before_hairRightHairLine_density_data = [data1, data2, data3, data4];
    var after_hairRightHairLine_density_data = []; //data값중 null을 제외한 후 저장



    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_hairRightHairLine_density_data[i] !== undefined) {
            after_hairRightHairLine_density_data.push(before_hairRightHairLine_density_data[i]);
        }
    }
    // var min_hairRightHairLine_density_data = Math.min(...after_hairRightHairLine_density_data);
    // hairRightHairLine_density_Chart.options.scales.y.min = parseInt(min_hairRightHairLine_density_data - 10);



    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_hairRightHairLine_density_data.length - 1;
    // console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_hairRightHairLine_density_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    hairRightHairLine_density_data.datasets[0].borderColor = colors;
    hairRightHairLine_density_data.datasets[0].pointBackgroundColor = colors;


    hairRightHairLine_density_Chart.update();
}



/*
*
*24. 05. 21 #3-2 오른쪽 '밀도'변화  차트생성 및 업데이트
*/

var hairRightHairLine_thickness_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [0.073, 0.077], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 2, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        // lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}

var hairRightHairLine_thickness_ctx = document.getElementById('hairRightHairLine_thickness_Chart').getContext('2d');
var hairRightHairLine_thickness_Chart = new Chart(hairRightHairLine_thickness_ctx, {
    type: 'line',
    data: hairRightHairLine_thickness_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 0.12, // y축 최대값
                min: 0,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 0.075,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 240 ? '' : value;
                    }
                },
                grid: {
                    display: true // 
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 14
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            },
            tooltip: {
                enabled: false // 툴팁 숨기기
            },
            datalabels: {
                display: true,
                anchor: 'end',
                align: 'top',
                color: '#666',
                font: {
                    weight: 'bold'
                },
                formatter: function (value) {
                    return value.toFixed(3); // 데이터 라벨 형식 지정
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});



function update_hairRightHairLine_thickness_Data(data1, data2, data3, data4) {

    hairRightHairLine_thickness_data.datasets[0].data[0] = data1;
    hairRightHairLine_thickness_data.datasets[0].data[1] = data2;
    hairRightHairLine_thickness_data.datasets[0].data[2] = data3;
    hairRightHairLine_thickness_data.datasets[0].data[3] = data4;

    var before_hairRightHairLine_thickness_data = [data1, data2, data3, data4];
    var after_hairRightHairLine_thickness_data = []; //data값중 null을 제외한 후 저장



    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_hairRightHairLine_thickness_data[i] !== undefined) {
            after_hairRightHairLine_thickness_data.push(before_hairRightHairLine_thickness_data[i]);
        }
    }
    // var min_hairRightHairLine_density_data = Math.min(...after_hairRightHairLine_density_data);
    // hairRightHairLine_density_Chart.options.scales.y.min = parseInt(min_hairRightHairLine_density_data - 10);



    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_hairRightHairLine_thickness_data.length - 1;
    // console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_hairRightHairLine_thickness_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    hairRightHairLine_thickness_data.datasets[0].borderColor = colors;
    hairRightHairLine_thickness_data.datasets[0].pointBackgroundColor = colors;


    hairRightHairLine_thickness_Chart.update();
}






/*
*************************************************************
*24. 05. 22 #4-1 앞 중앙 '굵기'변화  차트생성 및 업데이트
*/

var hairFrontCenter_density_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [0.073, 0.077], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 2, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        // lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}

var hairFrontCenter_density_ctx = document.getElementById('hairFrontCenter_density_Chart').getContext('2d');
var hairFrontCenter_density_Chart = new Chart(hairFrontCenter_density_ctx, {
    type: 'line',
    data: hairFrontCenter_density_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 180, // y축 최대값
                min: 0,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 120,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 240 ? '' : value;
                    }
                },
                grid: {
                    display: true // 
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 14
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            },
            tooltip: {
                enabled: false // 툴팁 숨기기
            },
            datalabels: {
                display: true,
                anchor: 'end',
                align: 'top',
                color: '#666',
                font: {
                    weight: 'bold'
                },
                formatter: function (value) {
                    return value.toFixed(0); // 데이터 라벨 형식 지정
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});



function update_hairFrontCenter_density_Data(data1, data2, data3, data4) {

    hairFrontCenter_density_data.datasets[0].data[0] = data1;
    hairFrontCenter_density_data.datasets[0].data[1] = data2;
    hairFrontCenter_density_data.datasets[0].data[2] = data3;
    hairFrontCenter_density_data.datasets[0].data[3] = data4;

    var before_hairFrontCenter_density_data = [data1, data2, data3, data4];
    var after_hairFrontCenter_density_data = []; //data값중 null을 제외한 후 저장



    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_hairFrontCenter_density_data[i] !== undefined) {
            after_hairFrontCenter_density_data.push(before_hairFrontCenter_density_data[i]);
        }
    }
    // var min_hairFrontCenter_density_data = Math.min(...after_hairFrontCenter_density_data);
    // hairFrontCenter_density_Chart.options.scales.y.min = parseInt(min_hairFrontCenter_density_data - 10);



    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_hairFrontCenter_density_data.length - 1;
    // console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_hairFrontCenter_density_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    hairFrontCenter_density_data.datasets[0].borderColor = colors;
    hairFrontCenter_density_data.datasets[0].pointBackgroundColor = colors;


    hairFrontCenter_density_Chart.update();
}



/*
*
*24. 05. 22 #4-2 앞 중앙 '밀도'변화  차트생성 및 업데이트
*/

var hairFrontCenter_thickness_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [0.073, 0.077], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 2, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        // lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}

var hairFrontCenter_thickness_ctx = document.getElementById('hairFrontCenter_thickness_Chart').getContext('2d');
var hairFrontCenter_thickness_Chart = new Chart(hairFrontCenter_thickness_ctx, {
    type: 'line',
    data: hairFrontCenter_thickness_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 0.12, // y축 최대값
                min: 0,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 0.075,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 240 ? '' : value;
                    }
                },
                grid: {
                    display: true // 
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 14
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            },
            tooltip: {
                enabled: false // 툴팁 숨기기
            },
            datalabels: {
                display: true,
                anchor: 'end',
                align: 'top',
                color: '#666',
                font: {
                    weight: 'bold'
                },
                formatter: function (value) {
                    return value.toFixed(3); // 데이터 라벨 형식 지정
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});



function update_hairFrontCenter_thickness_Data(data1, data2, data3, data4) {

    hairFrontCenter_thickness_data.datasets[0].data[0] = data1;
    hairFrontCenter_thickness_data.datasets[0].data[1] = data2;
    hairFrontCenter_thickness_data.datasets[0].data[2] = data3;
    hairFrontCenter_thickness_data.datasets[0].data[3] = data4;

    var before_hairFrontCenter_thickness_data = [data1, data2, data3, data4];
    var after_hairFrontCenter_thickness_data = []; //data값중 null을 제외한 후 저장



    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_hairFrontCenter_thickness_data[i] !== undefined) {
            after_hairFrontCenter_thickness_data.push(before_hairFrontCenter_thickness_data[i]);
        }
    }
    // var min_hairFrontCenter_density_data = Math.min(...after_hairFrontCenter_density_data);
    // hairFrontCenter_density_Chart.options.scales.y.min = parseInt(min_hairFrontCenter_density_data - 10);



    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_hairFrontCenter_thickness_data.length - 1;
    // console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_hairFrontCenter_thickness_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    hairFrontCenter_thickness_data.datasets[0].borderColor = colors;
    hairFrontCenter_thickness_data.datasets[0].pointBackgroundColor = colors;


    hairFrontCenter_thickness_Chart.update();
}






/*
*************************************************************
*24. 05. 22 #5-1 정수리 '굵기'변화  차트생성 및 업데이트
*/

var hairCenter_density_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [0.073, 0.077], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 2, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        // lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}

var hairCenter_density_ctx = document.getElementById('hairCenter_density_Chart').getContext('2d');
var hairCenter_density_Chart = new Chart(hairCenter_density_ctx, {
    type: 'line',
    data: hairCenter_density_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 180, // y축 최대값
                min: 0,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 120,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 240 ? '' : value;
                    }
                },
                grid: {
                    display: true // 
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 14
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            },
            tooltip: {
                enabled: false // 툴팁 숨기기
            },
            datalabels: {
                display: true,
                anchor: 'end',
                align: 'top',
                color: '#666',
                font: {
                    weight: 'bold'
                },
                formatter: function (value) {
                    return value.toFixed(0); // 데이터 라벨 형식 지정
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});



function update_hairCenter_density_Data(data1, data2, data3, data4) {

    hairCenter_density_data.datasets[0].data[0] = data1;
    hairCenter_density_data.datasets[0].data[1] = data2;
    hairCenter_density_data.datasets[0].data[2] = data3;
    hairCenter_density_data.datasets[0].data[3] = data4;

    var before_hairCenter_density_data = [data1, data2, data3, data4];
    var after_hairCenter_density_data = []; //data값중 null을 제외한 후 저장



    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_hairCenter_density_data[i] !== undefined) {
            after_hairCenter_density_data.push(before_hairCenter_density_data[i]);
        }
    }
    // var min_hairCenter_density_data = Math.min(...after_hairCenter_density_data);
    // hairCenter_density_Chart.options.scales.y.min = parseInt(min_hairCenter_density_data - 10);



    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_hairCenter_density_data.length - 1;
    // console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_hairCenter_density_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    hairCenter_density_data.datasets[0].borderColor = colors;
    hairCenter_density_data.datasets[0].pointBackgroundColor = colors;


    hairCenter_density_Chart.update();
}



/*
*
*24. 05. 22 #5-2 정수리 '밀도'변화  차트생성 및 업데이트
*/

var hairCenter_thickness_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [0.073, 0.077], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 2, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        // lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}

var hairCenter_thickness_ctx = document.getElementById('hairCenter_thickness_Chart').getContext('2d');
var hairCenter_thickness_Chart = new Chart(hairCenter_thickness_ctx, {
    type: 'line',
    data: hairCenter_thickness_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 0.12, // y축 최대값
                min: 0,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 0.075,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 240 ? '' : value;
                    }
                },
                grid: {
                    display: true // 
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 14
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            },
            tooltip: {
                enabled: false // 툴팁 숨기기
            },
            datalabels: {
                display: true,
                anchor: 'end',
                align: 'top',
                color: '#666',
                font: {
                    weight: 'bold'
                },
                formatter: function (value) {
                    return value.toFixed(3); // 데이터 라벨 형식 지정
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});



function update_hairCenter_thickness_Data(data1, data2, data3, data4) {

    hairCenter_thickness_data.datasets[0].data[0] = data1;
    hairCenter_thickness_data.datasets[0].data[1] = data2;
    hairCenter_thickness_data.datasets[0].data[2] = data3;
    hairCenter_thickness_data.datasets[0].data[3] = data4;

    var before_hairCenter_thickness_data = [data1, data2, data3, data4];
    var after_hairCenter_thickness_data = []; //data값중 null을 제외한 후 저장



    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_hairCenter_thickness_data[i] !== undefined) {
            after_hairCenter_thickness_data.push(before_hairCenter_thickness_data[i]);
        }
    }
    // var min_hairCenter_density_data = Math.min(...after_hairCenter_density_data);
    // hairCenter_density_Chart.options.scales.y.min = parseInt(min_hairCenter_density_data - 10);



    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_hairCenter_thickness_data.length - 1;
    // console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_hairCenter_thickness_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    hairCenter_thickness_data.datasets[0].borderColor = colors;
    hairCenter_thickness_data.datasets[0].pointBackgroundColor = colors;


    hairCenter_thickness_Chart.update();
}










/*
*************************************************************
*24. 05. 22 #6-1 후두부 '굵기'변화  차트생성 및 업데이트
*/

var hairBack_density_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [0.073, 0.077], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 2, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        // lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}

var hairBack_density_ctx = document.getElementById('hairBack_density_Chart').getContext('2d');
var hairBack_density_Chart = new Chart(hairBack_density_ctx, {
    type: 'line',
    data: hairBack_density_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 180, // y축 최대값
                min: 0,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 120,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 240 ? '' : value;
                    }
                },
                grid: {
                    display: true // 
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 14
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            },
            tooltip: {
                enabled: false // 툴팁 숨기기
            },
            datalabels: {
                display: true,
                anchor: 'end',
                align: 'top',
                color: '#666',
                font: {
                    weight: 'bold'
                },
                formatter: function (value) {
                    return value.toFixed(0); // 데이터 라벨 형식 지정
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});



function update_hairBack_density_Data(data1, data2, data3, data4) {

    hairBack_density_data.datasets[0].data[0] = data1;
    hairBack_density_data.datasets[0].data[1] = data2;
    hairBack_density_data.datasets[0].data[2] = data3;
    hairBack_density_data.datasets[0].data[3] = data4;

    var before_hairBack_density_data = [data1, data2, data3, data4];
    var after_hairBack_density_data = []; //data값중 null을 제외한 후 저장



    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_hairBack_density_data[i] !== undefined) {
            after_hairBack_density_data.push(before_hairBack_density_data[i]);
        }
    }
    // var min_hairBack_density_data = Math.min(...after_hairBack_density_data);
    // hairBack_density_Chart.options.scales.y.min = parseInt(min_hairBack_density_data - 10);



    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_hairBack_density_data.length - 1;
    // console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_hairBack_density_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    hairBack_density_data.datasets[0].borderColor = colors;
    hairBack_density_data.datasets[0].pointBackgroundColor = colors;


    hairBack_density_Chart.update();
}



/*
*
*24. 05. 22 #6-2 후두부 '밀도'변화  차트생성 및 업데이트
*/

var hairBack_thickness_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [0.073, 0.077], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 2, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        // lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}

var hairBack_thickness_ctx = document.getElementById('hairBack_thickness_Chart').getContext('2d');
var hairBack_thickness_Chart = new Chart(hairBack_thickness_ctx, {
    type: 'line',
    data: hairBack_thickness_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 0.12, // y축 최대값
                min: 0,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 0.075,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 240 ? '' : value;
                    }
                },
                grid: {
                    display: true // 
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 14
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            },
            tooltip: {
                enabled: false // 툴팁 숨기기
            },
            datalabels: {
                display: true,
                anchor: 'end',
                align: 'top',
                color: '#666',
                font: {
                    weight: 'bold'
                },
                formatter: function (value) {
                    return value.toFixed(3); // 데이터 라벨 형식 지정
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});



function update_hairBack_thickness_Data(data1, data2, data3, data4) {

    hairBack_thickness_data.datasets[0].data[0] = data1;
    hairBack_thickness_data.datasets[0].data[1] = data2;
    hairBack_thickness_data.datasets[0].data[2] = data3;
    hairBack_thickness_data.datasets[0].data[3] = data4;

    var before_hairBack_thickness_data = [data1, data2, data3, data4];
    var after_hairBack_thickness_data = []; //data값중 null을 제외한 후 저장



    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_hairBack_thickness_data[i] !== undefined) {
            after_hairBack_thickness_data.push(before_hairBack_thickness_data[i]);
        }
    }
    // var min_hairBack_density_data = Math.min(...after_hairBack_density_data);
    // hairBack_density_Chart.options.scales.y.min = parseInt(min_hairBack_density_data - 10);



    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_hairBack_thickness_data.length - 1;
    // console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_hairBack_thickness_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    hairBack_thickness_data.datasets[0].borderColor = colors;
    hairBack_thickness_data.datasets[0].pointBackgroundColor = colors;


    hairBack_thickness_Chart.update();
}




























/******************두피 로직***** */


/** 
 * 24.05. 08 
 * @description 두피 타입별 결과 구분
 **/
function getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown) {
    var scalpType;

    //console.log("getScalpType ScalpType_Ato 출력값 ", ScalpType_Ato);

    if (ScalpType_Nor === 1) {
        scalpType = '양호';
    } else if (ScalpType_Oily === 1) {
        scalpType = '지성';
    } else if (ScalpType_Ato === 1) {
        scalpType = '아토피성';
    } else if (ScalpType_Trb === 1) {
        scalpType = '트러블성';
    } else if (ScalpType_Dry === 1) {
        scalpType = '건성';
    } else if (ScalpType_Sen === 1) {
        scalpType = '민감성';
    } else if (ScalpType_Seb === 1) {
        scalpType = '지루성';
    } else if (ScalpType_Ddan === 1) {
        scalpType = '건성비듬성';
    } else if (ScalpType_Odan === 1) {
        scalpType = '지성비듬성';
    } else if (ScalpType_Unknown === 1) {
        scalpType = '확인필요';
    } else {
        scalpType = '확인필요';
    }
    //console.log("getScalpType scalType 출력값 ", scalType);

    return scalpType;
}

/** 
 * 24.05. 010
 * @description Hair Condition 결과 
 **/
function getHaiconditionResult(score) {
    var haircondition;

    //console.log("score : ", score);
    if (score === 0) {
        haircondition = '건강모';
    } else if (score === 1) {
        haircondition = '약손상모';
    } else if (score === 2) {
        haircondition = '손상모';
    } else if (score === 3) {
        haircondition = '극손상모';
    } else if (score === 4) {
        haircondition = '열모/지모';
    } else {
        haircondition = '확인필요';
    }

    //console.log("haircondition : ",haircondition);
    return haircondition;
}

