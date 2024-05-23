var ResultSkinConcenr_API_URL = 'http://127.0.0.1:8000/v1/skin/concern/';
var SkinResult_API_URL = 'http://127.0.0.1:8000/v1/skin/result/';



$(document).ready(function () {
    console.log('print002 page start -> ')
    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));

    var surveyNo = localStorage.getItem('custom_surveyNo');
    console.log('surveyNo : ', surveyNo);


    // 1. 그래프 히스토리 결과 조회
    $.ajax({
        url: ResultSkinConcenr_API_URL + '?surveyNo=' + surveyNo,
        type: 'GET',
        contentType: 'application/json',

        success: function (response) {
            console.log("ResultSkinConcenr_API_URL 응답값 : ", response);


            // 피부점수값 추출
            const valuesToSort = [
                { name: "모공", value: response[0].pore },
                { name: "주름", value: response[0].wrinkle },
                { name: "미래주름", value: response[0].futurewrinkles },
                { name: "색소침착", value: response[0].pigmentation },
                { name: "멜라닌", value: response[0].melanin },
                { name: "경피수분손실도", value: response[0].transdermal },
                { name: "붉은기", value: response[0].redness },
                { name: "포피린", value: response[0].porphyrin },
                { name: "탄력", value: response[0].elasticity }
            ];

            // 값들을 점수 순으로 정렬
            const sortedValues = valuesToSort.sort((a, b) => a.value - b.value);

            // 가장 작은 두 값을 변수에 저장
            const smallestValue1 = sortedValues[0];
            const smallestValue2 = sortedValues[1];
            // document.getElementById('selected_subdata').textContent = smallestValue1.name;
            // document.getElementById('selected_subdata2').textContent = smallestValue2.name;

            //피부 점수 값 매핑
            const averageValue = parseInt(calculateAverage(valuesToSort));
            console.log(`주어진 값들의 평균: ${averageValue}`);

            console.log('response[0].elasticity 의 타입 : ', typeof (response[0].elasticity))
            console.log('response[0].transdermal : ', response[0].transdermal);

            updateskinScoreData(response[0].elasticity, response[0].wrinkle, response[0].futurewrinkles); //skinScore 데이터 넣기 (현재는 임시값)
            updatePoreData(response[0].pore, response[0].pore);
            updateElasticityData(response[0].elasticity, response[0].elasticity);
            updateWrinkleData(response[0].wrinkle, response[0].wrinkle, response[0].wrinkle);
            updateFutureWrinklesData(response[0].futurewrinkles, response[0].futurewrinkles, response[0].futurewrinkles, response[0].futurewrinkles);
            updateMelaninData(response[0].melanin);
            updatePigmentationData(response[0].pigmentation, response[0].pigmentation, response[0].pigmentation);
            updateTransdermalData(response[0].transdermal, response[0].transdermal);
            updatePorphyrinData(response[0].porphyrin, response[0].porphyrin);
            updateRednessData(response[0].redness, response[0].redness);

        }, error: function (xhr, status, error) {
            console.error('ResultSkinConcenr_API_URL 오류 : ', error);
        }
    }),



    // 2. Type History의 T존, U존 값
    $.ajax({
        url: SkinResult_API_URL + '?surveyNo=' + surveyNo,
        type: 'GET',
        contentType: 'application/json',

        success: function (response) {
            console.log("SkinResult_API_URL 응답값 : ", response);       
            
            var create_dt = response[0].create_dt;
            var skinDate = create_dt.substring(0, 4) + '. ' + create_dt.substring(5, 7) + '. ' + create_dt.substring(8, 10);

            console.log ("skinDate : ", skinDate);
            $('#t_zone_result-1 .date').text(skinDate);    
            $('#t_zone_result-2 .date').text(skinDate);    



            $('#t_zone_result-1').append(response[0].t_zone_result);     
            $('#t_zone_result-2').append(response[0].t_zone_result);    
          

            $('#u_zone_result-1').append(response[0].u_zone_result);
            $('#u_zone_result-2').append(response[0].u_zone_result);

           


           


        }, error: function (xhr, status, error) {
            console.error('SkinResult_API_URL 오류 : ', error);
        }
    })

});




// 주어진 값들의 평균을 구하는 함수
function calculateAverage(values) {
    const sum = values.reduce((acc, curr) => acc + curr.value, 0);
    const average = sum / values.length;
    return average;
}


var first_day = '2024-12-11';


/*
**************************************************************************
24. 05. 21 #1 Skin Score History차트 생성 및 업데이트
*/

var skinScore_data = {
    labels: [first_day, 2, 3, 4],
    datasets: [{
        label: '',
        data: [73, 77], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 5, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}


var skinScore_ctx = document.getElementById('skinScore_Chart').getContext('2d');
var skinScore_Chart = new Chart(skinScore_ctx, {
    type: 'line',
    data: skinScore_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 110, // y축 최대값
                grid: {
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 40,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    },
                    font: {
                        size: 9,
                    }
                },
                grid: {
                    display: true // x축 그리드 숨기기
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 9,
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



function updateskinScoreData(data1, data2, data3, data4) {

    skinScore_data.datasets[0].data[0] = data1;
    skinScore_data.datasets[0].data[1] = data2;
    skinScore_data.datasets[0].data[2] = data3;
    skinScore_data.datasets[0].data[3] = data4;

    var before_skinScore_data = [data1, data2, data3, data4];
    var after_skinScore_data = []; //data값중 null을 제외한 후 저장

    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_skinScore_data[i] !== undefined) {
            after_skinScore_data.push(before_skinScore_data[i]);
        }
    }
    var min_skinScore_data = Math.min(...after_skinScore_data);
    skinScore_Chart.options.scales.y.min = parseInt(min_skinScore_data - 10);

    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_skinScore_data.length - 1;
    console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_skinScore_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    skinScore_data.datasets[0].borderColor = colors;
    skinScore_data.datasets[0].pointBackgroundColor = colors;

    skinScore_Chart.update();
}






/*
*************************************************************************
24.05.21 T존 차트 생성 및 업데이트
*/

var t_zone_data = {
    datasets: [{
        label: '수분,유분',
        data: [{ x: 10, y: 20 }],
        backgroundColor: 'rgba(200, 200, 200, 0.8)',
    }]
}

var ctx = document.getElementById('t_zone_chart').getContext('2d');
var t_zone_chart = new Chart(ctx, {
    type: 'scatter',
    data: t_zone_data,
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 0,
                max: 60,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)', // grid 색상
                    borderDash: [5, 5],
                    display: true,

                },
                scaleLabel: {
                    display: true,
                    labelString: '수분'
                },
                ticks: {
                    stepSize: 20,
                    font:{
                        size: 9,
                    }
                },
                title: {
                    display: true,
                    text: '수분',
                    font: {
                        size: 10
                    }
                }
            },

            y: {
                type: 'linear',
                position: 'left',
                min: 0,
                max: 60,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)', // grid 색상
                    display: true,
                    borderDash: [5, 5]
                },
                ticks: {
                    stepSize: 20,
                    font:{
                        size: 9,
                    }
                },
                title: {
                    display: true,
                    text: '유분',
                    font: {
                        size: 10
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            }
        },
        pointRadius: 6,
        pointBackgroundColor: '#e7c1da'
    }
});

function updateTZoneData(tzone_subun_result, tzone_ubun_result) {
    t_zone_data.datasets[0].data[0] = { x: tzone_subun_result, y: tzone_ubun_result };
    // console.log("updateTZoneData IN tzone_subun_result : ",tzone_subun_result)
    t_zone_chart.update();
}



/*
24. 05. 20 U존 차트 생성 및 업데이트
*/

var u_zone_data = {
    datasets: [{
        label: '수분,유분',
        data: [{ x: 30, y: 35 }],
        backgroundColor: 'rgba(200, 200, 200, 0.8)',
    }]
}

var ctx2 = document.getElementById('u_zone_chart').getContext('2d');
var u_zone_chart = new Chart(ctx2, {
    type: 'scatter',
    data: u_zone_data,
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 0,
                max: 60,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)', // grid 색상
                    display: true
                },
                ticks: {
                    stepSize: 20,
                    font: {
                        size: 10
                    }
                },
                title: {
                    display: true,
                    text: '수분',
                    font: {
                        size: 10
                    }
                }
            },
            y: {
                type: 'linear',
                position: 'left',
                min: 0,
                max: 60,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)', // grid 색상
                    display: true
                },
                ticks: {
                    stepSize: 20,
                    font: {
                        size: 10
                    }
                },
                title: {
                    display: true,
                    text: '유분',
                    font: {
                        size: 10
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            }
        },
        pointRadius: 6,
        pointBackgroundColor: '#e7c1da'
    }
});

function updateUZoneData(uzone_subun_result, uzone_ubun_result) {
    u_zone_data.datasets[0].data[0] = { x: uzone_subun_result, y: uzone_ubun_result };
    // console.log("updateTZoneData IN tzone_subun_result : ",uzone_subun_result)
    u_zone_chart.update();
}















/*
*************************************************************************
*24. 05. 21 #3-1 모공(Pore)차트 생성 및 업데이트
*/

var pore_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [73, 77], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        // lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}


var pore_ctx = document.getElementById('pore_Chart').getContext('2d');
var pore_Chart = new Chart(pore_ctx, {
    type: 'line',
    data: pore_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 110, // y축 최대값
                min: 0,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 20,
                    font: {
                        size: 10
                    },
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 10
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


function updatePoreData(data1, data2, data3, data4) {

    pore_data.datasets[0].data[0] = data1;
    pore_data.datasets[0].data[1] = data2;
    pore_data.datasets[0].data[2] = data3;
    pore_data.datasets[0].data[3] = data4;

    var before_pore_data = [data1, data2, data3, data4];
    var after_pore_data = []; //data값중 null을 제외한 후 저장

    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_pore_data[i] !== undefined) {
            after_pore_data.push(before_pore_data[i]);
        }
    }
    var min_pore_data = Math.min(...after_pore_data);
    pore_Chart.options.scales.y.min = parseInt(min_pore_data - 10);

    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_pore_data.length - 1;
    console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_pore_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    pore_data.datasets[0].borderColor = colors;
    pore_data.datasets[0].pointBackgroundColor = colors;


    pore_Chart.update();
}





/*
24. 05. 21 #3-2 탄력(elasticity)차트 생성 및 업데이트
*/

var elasticity_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [73, 77], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}


var elasticity_ctx = document.getElementById('elasticity_Chart').getContext('2d');
var elasticity_Chart = new Chart(elasticity_ctx, {
    type: 'line',
    data: elasticity_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 110, // y축 최대값
                min: 10,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 20,
                    font: {
                        size: 10
                    },
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 10
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


function updateElasticityData(data1, data2, data3, data4) {

    elasticity_data.datasets[0].data[0] = data1;
    elasticity_data.datasets[0].data[1] = data2;
    elasticity_data.datasets[0].data[2] = data3;
    elasticity_data.datasets[0].data[3] = data4;

    var before_elasticity_data = [data1, data2, data3, data4];
    var after_elasticity_data = []; //data값중 null을 제외한 후 저장

    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_elasticity_data[i] !== undefined) {
            after_elasticity_data.push(before_elasticity_data[i]);
        }
    }
    var min_elasticity_data = Math.min(...after_elasticity_data);
    elasticity_Chart.options.scales.y.min = parseInt(min_elasticity_data - 10);

    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_elasticity_data.length - 1;
    console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_elasticity_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    elasticity_data.datasets[0].borderColor = colors;
    elasticity_data.datasets[0].pointBackgroundColor = colors;

    elasticity_Chart.update();
}




/*
24. 05. 21 #3-3 주름(wrinkle)차트 생성 및 업데이트
*/


var wrinkle_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [73, 77], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}


var wrinkle_ctx = document.getElementById('wrinkle_Chart').getContext('2d');
var wrinkle_Chart = new Chart(wrinkle_ctx, {
    type: 'line',
    data: wrinkle_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 110, // y축 최대값
                min: 10,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 20,
                    font: {
                        size: 10
                    },
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 10
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


function updateWrinkleData(data1, data2, data3, data4) {

    wrinkle_data.datasets[0].data[0] = data1;
    wrinkle_data.datasets[0].data[1] = data2;
    wrinkle_data.datasets[0].data[2] = data3;
    wrinkle_data.datasets[0].data[3] = data4;

    var before_wrinkle_data = [data1, data2, data3, data4];
    var after_wrinkle_data = []; //data값중 null을 제외한 후 저장

    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_wrinkle_data[i] !== undefined) {
            after_wrinkle_data.push(before_wrinkle_data[i]);
        }
    }
    var min_wrinkle_data = Math.min(...after_wrinkle_data);
    wrinkle_Chart.options.scales.y.min = parseInt(min_wrinkle_data - 10);

    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_wrinkle_data.length - 1;
    console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_wrinkle_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    wrinkle_data.datasets[0].borderColor = colors;
    wrinkle_data.datasets[0].pointBackgroundColor = colors;


    wrinkle_Chart.update();
}




/*
24. 05. 21 #3-4 미래주름(futurewrinkles)차트 생성 및 업데이트
*/


var futurewrinkles_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [73, 77], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}


var futurewrinkles_ctx = document.getElementById('futurewrinkles_Chart').getContext('2d');
var futurewrinkles_Chart = new Chart(futurewrinkles_ctx, {
    type: 'line',
    data: futurewrinkles_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 110, // y축 최대값
                min: 10,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 20,
                    font: {
                        size: 10
                    },
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 10
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


function updateFutureWrinklesData(data1, data2, data3, data4) {

    futurewrinkles_data.datasets[0].data[0] = data1;
    futurewrinkles_data.datasets[0].data[1] = data2;
    futurewrinkles_data.datasets[0].data[2] = data3;
    futurewrinkles_data.datasets[0].data[3] = data4;

    var before_futurewrinkles_data = [data1, data2, data3, data4];
    var after_futurewrinkles_data = []; //data값중 null을 제외한 후 저장

    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_futurewrinkles_data[i] !== undefined) {
            after_futurewrinkles_data.push(before_futurewrinkles_data[i]);
        }
    }
    var min_futurewrinkles_data = Math.min(...after_futurewrinkles_data);
    futurewrinkles_Chart.options.scales.y.min = parseInt(min_futurewrinkles_data - 10);

    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_futurewrinkles_data.length - 1;
    console.log("lastDataIndex : ", lastDataIndex);
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_futurewrinkles_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    futurewrinkles_data.datasets[0].borderColor = colors;
    futurewrinkles_data.datasets[0].pointBackgroundColor = colors;

    futurewrinkles_Chart.update();
}





/*
24. 05. 21 #3-5 멜라닌(melanin)차트 생성 및 업데이트
*/


var melanin_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [73, 77], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}


var melanin_ctx = document.getElementById('melanin_Chart').getContext('2d');
var melanin_Chart = new Chart(melanin_ctx, {
    type: 'line',
    data: melanin_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 110, // y축 최대값
                min: 10,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 20,
                    font: {
                        size: 10
                    },
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 10
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


function updateMelaninData(data1, data2, data3, data4) {

    melanin_data.datasets[0].data[0] = data1;
    melanin_data.datasets[0].data[1] = data2;
    melanin_data.datasets[0].data[2] = data3;
    melanin_data.datasets[0].data[3] = data4;

    var before_melanin_data = [data1, data2, data3, data4];
    var after_melanin_data = []; //data값중 null을 제외한 후 저장

    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_melanin_data[i] !== undefined) {
            after_melanin_data.push(before_melanin_data[i]);
        }
    }
    var min_melanin_data = Math.min(...after_melanin_data);
    melanin_Chart.options.scales.y.min = parseInt(min_melanin_data - 10);

    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_melanin_data.length - 1;
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_melanin_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    melanin_data.datasets[0].borderColor = colors;
    melanin_data.datasets[0].pointBackgroundColor = colors;

    melanin_Chart.update();
}




/*
24. 05. 21 #3-6 색소침착(pigmentation)차트 생성 및 업데이트
*/


var pigmentation_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [73, 77], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}


var pigmentation_ctx = document.getElementById('pigmentation_Chart').getContext('2d');
var pigmentation_Chart = new Chart(pigmentation_ctx, {
    type: 'line',
    data: pigmentation_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 110, // y축 최대값
                min: 10,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 20,
                    font: {
                        size: 10
                    },
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 10
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


function updatePigmentationData(data1, data2, data3, data4) {

    pigmentation_data.datasets[0].data[0] = data1;
    pigmentation_data.datasets[0].data[1] = data2;
    pigmentation_data.datasets[0].data[2] = data3;
    pigmentation_data.datasets[0].data[3] = data4;

    var before_pigmentation_data = [data1, data2, data3, data4];
    var after_pigmentation_data = []; //data값중 null을 제외한 후 저장

    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_pigmentation_data[i] !== undefined) {
            after_pigmentation_data.push(before_pigmentation_data[i]);
        }
    }
    var min_pigmentation_data = Math.min(...after_pigmentation_data);
    pigmentation_Chart.options.scales.y.min = parseInt(min_pigmentation_data - 10);

    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_pigmentation_data.length - 1;
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_pigmentation_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    pigmentation_data.datasets[0].borderColor = colors;
    pigmentation_data.datasets[0].pointBackgroundColor = colors;

    pigmentation_Chart.update();
}





/*
24. 05. 21 #3-7 경피수분손실도(transdermal)차트 생성 및 업데이트
*/
var transdermal_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [73, 77], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}


var transdermal_ctx = document.getElementById('transdermal_Chart').getContext('2d');
var transdermal_Chart = new Chart(transdermal_ctx, {
    type: 'line',
    data: transdermal_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 110, // y축 최대값
                min: 10,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 20,
                    font: {
                        size: 10
                    },
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 10
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


function updateTransdermalData(data1, data2, data3, data4) {

    transdermal_data.datasets[0].data[0] = data1;
    transdermal_data.datasets[0].data[1] = data2;
    transdermal_data.datasets[0].data[2] = data3;
    transdermal_data.datasets[0].data[3] = data4;

    var before_transdermal_data = [data1, data2, data3, data4];
    var after_transdermal_data = []; //data값중 null을 제외한 후 저장

    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_transdermal_data[i] !== undefined) {
            after_transdermal_data.push(before_transdermal_data[i]);
        }
    }
    var min_transdermal_data = Math.min(...after_transdermal_data);
    transdermal_Chart.options.scales.y.min = parseInt(min_transdermal_data - 10);

    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_transdermal_data.length - 1;
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_transdermal_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    transdermal_data.datasets[0].borderColor = colors;
    transdermal_data.datasets[0].pointBackgroundColor = colors;

    transdermal_Chart.update();
}



/*
24. 05. 21 #3-8 포피린(porphyrin)차트 생성 및 업데이트
*/
var porphyrin_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [73, 77], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}


var porphyrin_ctx = document.getElementById('porphyrin_Chart').getContext('2d');
var porphyrin_Chart = new Chart(porphyrin_ctx, {
    type: 'line',
    data: porphyrin_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 110, // y축 최대값
                min: 10,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 20,
                    font: {
                        size: 10
                    },
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 10
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


function updatePorphyrinData(data1, data2, data3, data4) {

    porphyrin_data.datasets[0].data[0] = data1;
    porphyrin_data.datasets[0].data[1] = data2;
    porphyrin_data.datasets[0].data[2] = data3;
    porphyrin_data.datasets[0].data[3] = data4;

    var before_porphyrin_data = [data1, data2, data3, data4];
    var after_porphyrin_data = []; //data값중 null을 제외한 후 저장

    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_porphyrin_data[i] !== undefined) {
            after_porphyrin_data.push(before_porphyrin_data[i]);
        }
    }
    var min_porphyrin_data = Math.min(...after_porphyrin_data);
    porphyrin_Chart.options.scales.y.min = parseInt(min_porphyrin_data - 10);

    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_porphyrin_data.length - 1;
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_porphyrin_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    porphyrin_data.datasets[0].borderColor = colors;
    porphyrin_data.datasets[0].pointBackgroundColor = colors;

    porphyrin_Chart.update();
}




/*
24. 05. 21 #3-8 붉은기(redness)차트 생성 및 업데이트
*/
var redness_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [73, 77], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상            
        pointHoverRadius: 8,
        lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
}


var redness_ctx = document.getElementById('redness_Chart').getContext('2d');
var redness_Chart = new Chart(redness_ctx, {
    type: 'line',
    data: redness_data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 110, // y축 최대값
                min: 10,
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 20,
                    font: {
                        size: 10
                    },
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    }
                },
                grid: {
                    display: false // x축 그리드 숨기기
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 10
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


function updateRednessData(data1, data2, data3, data4) {

    redness_data.datasets[0].data[0] = data1;
    redness_data.datasets[0].data[1] = data2;
    redness_data.datasets[0].data[2] = data3;
    redness_data.datasets[0].data[3] = data4;

    var before_redness_data = [data1, data2, data3, data4];
    var after_redness_data = []; //data값중 null을 제외한 후 저장

    //Y축의 최소값 설정
    for (var i = 0; i < 4; i++) {
        if (before_redness_data[i] !== undefined) {
            after_redness_data.push(before_redness_data[i]);
        }
    }
    var min_redness_data = Math.min(...after_redness_data);
    redness_Chart.options.scales.y.min = parseInt(min_redness_data - 10);

    //마지막 점과 선의 색상 설정
    var lastDataIndex = after_redness_data.length - 1;
    var colors = [];
    if (lastDataIndex === 0) {
        colors.push('#e7c1da');
    }
    if (lastDataIndex === 1) {
        colors.push('#cccccc');
        colors.push('#e7c1da');
    } else if (lastDataIndex > 1) {
        colors = Array(after_redness_data.length - 1).fill('#cccccc');
        colors.push('#e7c1da');
    }
    redness_data.datasets[0].borderColor = colors;
    redness_data.datasets[0].pointBackgroundColor = colors;

    redness_Chart.update();
}



