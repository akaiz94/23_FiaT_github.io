var ResultSkinConcenr_API_URL = 'http://127.0.0.1:8000/v1/skin/concern/';



$(document).ready(function () {
    console.log('analysis_result page start -> ')
    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));

    var surveyNo = localStorage.getItem('custom_surveyNo');
    console.log('surveyNo : ', surveyNo);


    $.ajax({
        url: ResultSkinConcenr_API_URL + surveyNo,
        type: 'GET',
        contentType: 'application/json',

        success: function (response) {
            console.log("ResultSkinConcenr_API_URL 응답값 : ", response);

            // 피부점수값 추출
            // const valuesToSort = [
            //     response.pore,
            //     response.wrinkle,
            //     response.futurewrinkles,
            //     response.pigmentation,
            //     response.melanin,               
            //     response.transdermal,
            //     response.redness,
            //     response.porphyrin,
            //     response.elasticity
            // ];

            // // 값들을 오름차순으로 정렬
            // const sortedValues = valuesToSort.sort((a, b) => a - b);


            // 피부점수값 추출
            const valuesToSort = [
                { name: "모공", value: response.pore },
                { name: "주름", value: response.wrinkle },
                { name: "미래주름", value: response.futurewrinkles },
                { name: "색소침착", value: response.pigmentation },
                { name: "멜라닌", value: response.melanin },
                { name: "경피수분손실도", value: response.transdermal },
                { name: "붉은기", value: response.redness },
                { name: "포피린", value: response.porphyrin },
                { name: "탄력", value: response.elasticity }
            ];

            // 값들을 점수 순으로 정렬
            const sortedValues = valuesToSort.sort((a, b) => a.value - b.value);

            // 가장 작은 두 값을 변수에 저장
            const smallestValue1 = sortedValues[0];
            const smallestValue2 = sortedValues[1];
            document.getElementById('selected_subdata').textContent = smallestValue1.name;
            document.getElementById('selected_subdata2').textContent = smallestValue2.name;

            //피부 점수 값 매핑
            const averageValue = parseInt(calculateAverage(valuesToSort));
            console.log(`주어진 값들의 평균: ${averageValue}`);

            document.getElementById('get_skin_score').textContent = averageValue;


            console.log("start: ");
            var items = document.querySelectorAll('#skinScoreList .item-box');
            console.log("items: ", items);

            items.forEach(function (item) {
                var range = item.getAttribute('data-range').split('-');
                var min = parseInt(range[0], 10); //10진수 정수로 변환
                var max = parseInt(range[1], 10);
                console.log("min : ", min);
                console.log("max : ", max);

                if (averageValue >= min && averageValue < max) {
                    item.classList.add('active');
                    console.log("11 ");
                } else {
                    item.classList.remove('active');
                    console.log("22 ");
                }
            });

            console.log("items2 : ", items);


            updateAgingData(response.elasticity, response.wrinkle, response.futurewrinkles);
            updatePigmentationData(response.pigmentation, response.melanin);
            updateSensitivityData(response.transdermal, response.redness);
            updateSebumData(response.pore, response.porphyrin);


















            var tzone_subun_value = response.tZone_Moisture;
            var tzone_ubun_value = response.tZone_Oilskin;
            var uzone_subun_value = response.uZone_Moisture;
            var uzone_ubun_value = response.uZone_Oilskin;

            // console.log("tzone_subun_value : ", tzone_subun_value);
            // console.log("tzone_ubun_value : ", tzone_ubun_value);
            // console.log("uzone_subun_value : ", uzone_subun_value);
            // console.log("uzone_ubun_value : ", uzone_ubun_value);



            /********************** */
            var tzone_subun_result = null;
            var tzone_ubun_result = null;

            //T존 수분위치
            if (tzone_subun_value < 20) {
                tzone_subun_result = "수분부족";
            }
            else if (20 <= tzone_subun_value && tzone_subun_value < 40) {
                tzone_subun_result = "수분적당";
            }
            else if (40 <= tzone_subun_value) {
                tzone_subun_result = "수분충분";
            }

            console.log("tzone_subun_result : ", tzone_subun_result);

            //T존 유분위치        

            if (tzone_ubun_value < 9) {
                tzone_ubun_result = "유분부족";
            }
            else if (9 <= tzone_ubun_value && tzone_ubun_value < 19) {
                tzone_ubun_result = "유분적당";
            }
            else if (19 <= tzone_ubun_value) {
                tzone_ubun_result = "유분과다";
            }

            if (tzone_subun_result == "수분부족" && tzone_ubun_result == "유분과다") { t_zone_position_num = 1; t_zone_result = "수분부족 유분과다 지성"; }
            if (tzone_subun_result == "수분부족" && tzone_ubun_result == "유분적당") { t_zone_position_num = 2; t_zone_result = "수분 부족 건성"; }
            if (tzone_subun_result == "수분부족" && tzone_ubun_result == "유분부족") { t_zone_position_num = 3; t_zone_result = "유수분 부족 건성"; }
            if (tzone_subun_result == "수분적당" && tzone_ubun_result == "유분과다") { t_zone_position_num = 4; t_zone_result = "유분 과다 지성"; }
            if (tzone_subun_result == "수분적당" && tzone_ubun_result == "유분적당") { t_zone_position_num = 5; t_zone_result = "유수분 균형 중성"; }
            if (tzone_subun_result == "수분적당" && tzone_ubun_result == "유분부족") { t_zone_position_num = 6; t_zone_result = "유분 부족 건성"; }
            if (tzone_subun_result == "수분충분" && tzone_ubun_result == "유분과다") { t_zone_position_num = 7; t_zone_result = "유분 과다 지성"; }
            if (tzone_subun_result == "수분충분" && tzone_ubun_result == "유분적당") { t_zone_position_num = 8; t_zone_result = "유수분 균형 중성"; }
            if (tzone_subun_result == "수분충분" && tzone_ubun_result == "유분부족") { t_zone_position_num = 9; t_zone_result = "유분 부족 건성"; }

            /********************** */

            var uzone_subun_result = null;
            var uzone_ubun_result = null;

            //U존 수분위치
            if (uzone_subun_value < 20) {
                uzone_subun_result = "수분부족";
            }
            else if (20 <= uzone_subun_value && uzone_subun_value < 40) {
                uzone_subun_result = "수분적당";
            }
            else if (40 <= uzone_subun_value) {
                uzone_subun_result = "수분충분";
            }
            //U존 유분위치
            if (uzone_ubun_value <= 5.5) {
                uzone_ubun_result = "유분부족";
            }
            else if (5.5 < uzone_ubun_value && uzone_ubun_value < 12) {
                uzone_ubun_result = "유분적당";
            }
            else if (12 <= uzone_ubun_value) {
                uzone_ubun_result = "유분과다";
            }

            if (uzone_subun_result == "수분부족" && uzone_ubun_result == "유분과다") { u_zone_position_num = 1; u_zone_result = "수분부족 유분과다 지성"; }
            if (uzone_subun_result == "수분부족" && uzone_ubun_result == "유분적당") { u_zone_position_num = 2; u_zone_result = "수분 부족 건성"; }
            if (uzone_subun_result == "수분부족" && uzone_ubun_result == "유분부족") { u_zone_position_num = 3; u_zone_result = "유수분 부족 건성"; }
            if (uzone_subun_result == "수분적당" && uzone_ubun_result == "유분과다") { u_zone_position_num = 4; u_zone_result = "유분 과다 지성"; }
            if (uzone_subun_result == "수분적당" && uzone_ubun_result == "유분적당") { u_zone_position_num = 5; u_zone_result = "유수분 균형 중성"; }
            if (uzone_subun_result == "수분적당" && uzone_ubun_result == "유분부족") { u_zone_position_num = 6; u_zone_result = "유분 부족 건성"; }
            if (uzone_subun_result == "수분충분" && uzone_ubun_result == "유분과다") { u_zone_position_num = 7; u_zone_result = "유분 과다 지성"; }
            if (uzone_subun_result == "수분충분" && uzone_ubun_result == "유분적당") { u_zone_position_num = 8; u_zone_result = "유수분 균형 중성"; }
            if (uzone_subun_result == "수분충분" && uzone_ubun_result == "유분부족") { u_zone_position_num = 9; u_zone_result = "유분 부족 건성"; }





            console.log("t_zone_result : ", t_zone_result);
            console.log("u_zone_result : ", u_zone_result);

            $('#t_zone_result').text(t_zone_result);
            $('#u_zone_result').text(u_zone_result);













        }, error: function (xhr, status, error) {
            console.error('ResultSkinConcenr_API_URL 오류 : ', error);
        }
    })


});



// 주어진 값들의 평균을 구하는 함수
function calculateAverage(values) {
    const sum = values.reduce((acc, curr) => acc + curr.value, 0);
    const average = sum / values.length;
    return average;
}





/*
24. 05. 14 #1 Aging차트 생성 및 업데이트
*/
var aging_data = {
    labels: ['탄력', '주름', '미래주름'],
    datasets: [{
        label: '', // 범례 레이블 없음
        data: [24, 50, 100],
        backgroundColor: function (context) {
            return context.raw < 60 ? '#e7c1da' : '#d98cbf';
        },
    },
        // {
        //     label: '', // 범례 레이블 없음
        //     data: [40, 2, 80],
        //     backgroundColor: ['#e67e98', '#e67e98', '#e67e98'],
        //     borderColor: ['#e67e98', '#e67e98', '#e67e98'],
        //     borderWidth: 1
        // }
    ]
}
var min_aging_data = 10; // step1 : Y축 최소값 초기화

var ctx3 = document.getElementById('aging_chart').getContext('2d');
var aging_chart = new Chart(ctx3, {
    type: 'bar',
    data: aging_data,
    plugins: [ChartDataLabels],
    options: {
        responsive: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 110,
                min: min_aging_data - 10,
                ticks: {
                    stepSize: 20,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    },
                    font: {
                        size: 10 // 폰트 크기 조절
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
                ticks: {
                    font: {
                        size: 9 // 폰트 크기 조절
                    }
                },
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
        barThickness: 25

    }
});


function updateAgingData(elasticity, wrinkle, futurewrinkles) {
    aging_data.datasets[0].data[0] = elasticity; // 탄력
    aging_data.datasets[0].data[1] = wrinkle; // 주름
    aging_data.datasets[0].data[2] = futurewrinkles; // 미래주름

    var min_aging_data = Math.min(...aging_data.datasets[0].data);  // step2 : Y축 최소값 업데이트
    aging_chart.options.scales.y.min = parseInt(min_aging_data - 10);

    aging_chart.update();
}



/*
24. 05. 14 #2 Pigmentation 차트 생성 및 업데이트
*/
var pigmentation_data = {
    labels: ['색소침착', '멜라닌'],
    datasets: [{
        label: '', // 범례 레이블 없음
        data: [24, 50],
        backgroundColor: function (context) {
            return context.raw < 60 ? '#e7c1da' : '#d98cbf';
        },
        // borderColor: ['#e67e98', '#e67e98'],
        // borderWidth: 2
    }]
}
var min_pigmentation_data = 10; // step1 : Y축 최소값 초기화

var ctx4 = document.getElementById('pigmentation_chart').getContext('2d');
var pigmentation_chart = new Chart(ctx4, {
    type: 'bar',
    data: pigmentation_data,
    plugins: [ChartDataLabels],
    options: {
        responsive: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 110,
                min: min_pigmentation_data - 10,
                ticks: {
                    stepSize: 20,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    },
                    font: {
                        size: 10 // 폰트 크기 조절
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
                ticks: {
                    font: {
                        size: 9 // 폰트 크기 조절
                    }
                },
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
        barThickness: 30

    }
});


function updatePigmentationData(data1, data2, data3) {
    pigmentation_data.datasets[0].data[0] = data1; // 멜라닌
    pigmentation_data.datasets[0].data[1] = data2; // 색소침착

    var min_pigmentation_data = Math.min(...pigmentation_data.datasets[0].data);  // step2 : Y축 최소값 업데이트
    pigmentation_chart.options.scales.y.min = parseInt(min_pigmentation_data - 10);

    pigmentation_chart.update();
}




/*
24. 05. 14 #3 Sensitivity 차트 생성 및 업데이트
*/
var sensitivity_data = {
    labels: ['수분손실도', '붉은기'],
    datasets: [{
        label: '', // 범례 레이블 없음
        data: [24, 50],
        backgroundColor: function (context) {
            return context.raw < 60 ? '#e7c1da' : '#d98cbf';
        },
    }]
}
var min_sensitivity_data = 10; // step1 : Y축 최소값 초기화


var ctx_sensitivity = document.getElementById('sensitivity_chart').getContext('2d');
var sensitivity_chart = new Chart(ctx_sensitivity, {
    type: 'bar',
    data: sensitivity_data,
    plugins: [ChartDataLabels],
    options: {
        responsive: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 110,
                min: min_sensitivity_data - 10,
                ticks: {
                    stepSize: 20,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    },
                    font: {
                        size: 10 // 폰트 크기 조절
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
                ticks: {
                    font: {
                        size: 9 // 폰트 크기 조절
                    }
                },
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
        barThickness: 30
    }
});


function updateSensitivityData(data1, data2) {
    sensitivity_data.datasets[0].data[0] = data1; // 경피수분손실도
    sensitivity_data.datasets[0].data[1] = data2; // 붉은기  
    var min_sensitivity_data = Math.min(...sensitivity_data.datasets[0].data);  // step2 : Y축 최소값 업데이트
    sensitivity_chart.options.scales.y.min = parseInt(min_sensitivity_data - 10);

    sensitivity_chart.update();
}




/*
24. 05. 14 #4 Sebum 차트 생성 및 업데이트
*/
var sebum_data = {
    labels: ['모공', '포피린'],
    datasets: [{
        label: '', // 범례 레이블 없음
        data: [66, 77],
        backgroundColor: function (context) {
            return context.raw < 60 ? '#e7c1da' : '#d98cbf';
        },
    }]
}
var min_sebum_data = 10; // step1 : Y축 최소값 초기화

var ctx_sebum = document.getElementById('sebum_chart').getContext('2d');
var sebum_chart = new Chart(ctx_sebum, {
    type: 'bar',
    data: sebum_data,
    plugins: [ChartDataLabels],
    options: {
        responsive: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 110,
                min: min_sebum_data - 10,
                ticks: {
                    stepSize: 20,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    },
                    font: {
                        size: 10 // 폰트 크기 조절
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
                ticks: {
                    font: {
                        size: 9 // 폰트 크기 조절
                    }
                },
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
        barThickness: 30
    }
});


function updateSebumData(data1, data2) {
    sebum_data.datasets[0].data[0] = data1; // 모공
    sebum_data.datasets[0].data[1] = data2; // 포피린
    var min_sebum_data = Math.min(...sebum_data.datasets[0].data);  // step2 : Y축 최소값 업데이트
    sebum_chart.options.scales.y.min = parseInt(min_sebum_data - 10);

    sebum_chart.update();
}



