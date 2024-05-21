
$(document).ready(function () {
    console.log('analysis3_result_skin page start -> ')


});

/*
*
* 240519 #1 레이더 차트 시작
*
*/
const data = {
    labels: ['수분', '유분', '민감', '색소', '주름'],
    datasets: [{
        label: '현재 피부',
        data: [40, 20, 100, 80, 70],
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: 'rgba(0, 0, 0, 0.7)',
        borderWidth: 1,
    }, {
        label: '미래 피부',
        data: [30, 30, 80, 60, 40],
        backgroundColor: '#e7c1da',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
    }],
};

const config = {
    type: 'radar',
    data: data,

    options: {
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    stepSize: 20
                },
            },

        },
        elements: {
            // line: {
            //     tension: 0.4, // Adjust for curved lines (0 for straight lines)
            // },
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    fontSize: 30
                }
            },
        },
    },
};

const radarChart = new Chart(
    document.getElementById('radarChart'),
    config
);




/*
*
* 240519 #2 막대 차트
*
*/

var ctx = document.getElementById('skinResult_Chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['수분', '유분', '민감', '색소', '주름'],
        datasets: [{
            label: '', // 범례 레이블 없음
            data: [40, 20, 100, 80, 70],
            backgroundColor: ['#ddd', '#ddd', '#ddd', '#ddd', '#ddd'],
            borderColor: ['white', 'white', 'white', 'white', 'white'],
            borderWidth: 1
        },
        {
            label: '', // 범례 레이블 없음
            data: [30, 30, 80, 60, 40],
            backgroundColor: ['#e7c1da', '#e7c1da', '#e7c1da', '#e7c1da', '#e7c1da'],
            borderColor: ['white', 'white', 'white', 'white', 'white'],
            borderWidth: 1
        }]
    },
    plugins: [ChartDataLabels],
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 110,
                ticks: {
                    stepSize: 20,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    }
                },
                grid: {
                    drawBorder: false,
                    color: '#ddd',
                    lineWidth: 1,
                    display: false
                    
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                color: '#333',
                font: {
                    weight: 'bold'
                },
                formatter: function (value, context) {
                    return value;
                }
            }
        },
      
    }
});