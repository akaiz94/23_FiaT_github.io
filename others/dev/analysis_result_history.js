

$(document).ready(function () {
    console.log('analysis_result page start -> ')
    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));



});





var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [1, 2, 3, 4],
        datasets: [{
            label: 'Ref.',
            data: [0.073, 0.077], // 데이터 포인트 값
            fill: false,
            borderColor: '#e83f6f', // 라인 색상
            borderWidth: 2,
            pointRadius: 6, // 점 크기
            pointBackgroundColor: ['#cccccc', '#e83f6f'], // 점 색상
            pointHoverRadius: 8,
            lineTension: 0.2, // 라인 부드러움 조절
            spanGaps: true // 빈 데이터 포인트 연결
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 0.1, // y축 최대값
                grid: {
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                }
            },
            x: {
                grid: {
                    display: false // x축 그리드 숨기기
                }
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            },
            tooltip: {
                enabled: true // 툴팁 숨기기
            },
            datalabels: {
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
    }
});




var skinScore_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [73, 77], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash:[ 5,5],
        
        pointRadius: 10, // 점 크기
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
                    drawBorder: false, // y축 테두리 숨기기
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 20,
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
                    font:{
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



function updateskinScoreData(data1, data2, data3, data4) {
    
    skinScore_data.datasets[0].data[0] = data1; 
    skinScore_data.datasets[0].data[1] = data2; 
    skinScore_data.datasets[0].data[2] = data3;
    skinScore_data.datasets[0].data[3] = data4;

    var before_skinScore_data = [data1, data2, data3, data4];
    var after_skinScore_data = []; //data값중 null을 제외한 후 저장

    //Y축의 최소값 설정
    for(var i = 0; i < 4; i++ ){
        if(before_skinScore_data[i] !== undefined){
            after_skinScore_data.push(before_skinScore_data[i]);
        }
    }
    var min_skinScore_data = Math.min(...after_skinScore_data);   
    skinScore_Chart.options.scales.y.min = parseInt(min_skinScore_data - 10);
  
    skinScore_Chart.update();
  }
  