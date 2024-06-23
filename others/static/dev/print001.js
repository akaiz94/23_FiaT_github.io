var Main_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/merged/list'; //방문회차 카운트

var ResultSkinConcern_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/skin/concern/';
var skin_result_URL = 'https://amore-citylab.amorepacific.com:8000/v1/skin/result/';
var ResultMarkvu_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/skin/markvu/result/';


$(document).ready(function () {
    console.log('analysis_result page start -> ')
    $('#visitDate').text(localStorage.getItem('visit_rsvn_date'));

    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));


    $('#manager_name').text(localStorage.getItem('manager_name'));
    $('#custom_name').text(localStorage.getItem('custom_name'));

    fnGetVisitCount();//방문회차 카운트 함수


    // $('#comment01_main').text(localStorage.getItem('analysis_result-comment01'));
    // $('#comment02_main').text(localStorage.getItem('analysis_result-comment02'));

    // $('#opinionsImage').attr('src', localStorage.getItem('analysis_result-opinionCanvas')); //(페이지) 이미지
    // $('#backgroundImage').attr('src', localStorage.getItem('analysis_result-backgroundCanvas'));//(페이지) 백그라운드 이미지

    $.ajax({
        // url: ResultMarkvu_API_URL + '?surveyNo=' + surveyNo,
        url: ResultMarkvu_API_URL + '?surveyNo=' + localStorage.getItem('custom_surveyNo'),
        type: 'GET',
        success: function (data) {
            //console.log('ResultMarkvu_API_URL 응답 : ', data); 
            markvu = data[0];
            console.log("ResultMarkvu_API_URL 응답값 : ", markvu);


            //T존
            tzone_subun_value = markvu.FSubun_A;
            tzone_ubun_value = (markvu.FSebum_A + markvu.FSebum_B) / 2;
            t_zone_subun = tzone_subun_value;
            t_zone_ubun = tzone_ubun_value;

            $('#t_zone_subun-val').text(t_zone_subun)
            $('#t_zone_ubun-val').text(t_zone_ubun)

            //U존
            uzone_subun_value = (markvu.FSubun_G + markvu.FSubun_H) / 2;
            uzone_ubun_value = (markvu.FSebum_G + markvu.FSebum_H) / 2;
            u_zone_subun = uzone_subun_value;
            u_zone_ubun = uzone_ubun_value;
            $('#u_zone_subun-val').text(u_zone_subun)
            $('#u_zone_ubun-val').text(u_zone_ubun)


        },
        error: function (xhr, status, error) {

            console.error('ResultMarkvu_API_URL 응답 오류: ', error);
        }
    })


    $.ajax({
        url: skin_result_URL + '?surveyNo=' + localStorage.getItem('custom_surveyNo'),
        type: 'GET',
        contentType: 'application/json',

        success: function (response) {
            console.log("skin_result_URL 응답값 : ", response);
            console.log("skin_result_URL  길이 : ", response.length);


            let t_zone_position_num = response[0].t_zone_position_num;

            //T존 9분위 적용
            if (t_zone_position_num === 1) {
                $('#T_zone-image').attr('src', "./resource/images/skin/UT_001.png");
            } if (t_zone_position_num === 2) {
                $('#T_zone-image').attr('src', "./resource/images/skin/UT_002.png");
            } if (t_zone_position_num === 3) {
                $('#T_zone-image').attr('src', "./resource/images/skin/UT_003.png");
            } if (t_zone_position_num === 4) {
                $('#T_zone-image').attr('src', "./resource/images/skin/UT_004.png");
            } if (t_zone_position_num === 5) {
                $('#T_zone-image').attr('src', "./resource/images/skin/UT_005.png");
            } if (t_zone_position_num === 6) {
                $('#T_zone-image').attr('src', "./resource/images/skin/UT_006.png");
            } if (t_zone_position_num === 7) {
                $('#T_zone-image').attr('src', "./resource/images/skin/UT_007.png");
            } if (t_zone_position_num === 8) {
                $('#T_zone-image').attr('src', "./resource/images/skin/UT_008.png");
            } if (t_zone_position_num === 9) {
                $('#T_zone-image').attr('src', "./resource/images/skin/UT_009.png");
            }


            let u_zone_position_num = response[0].u_zone_position_num;
            //T존 9분위 적용
            if (u_zone_position_num === 1) {
                $('#U_zone-image').attr('src', "./resource/images/skin/UT_001.png");
            } if (u_zone_position_num === 2) {
                $('#U_zone-image').attr('src', "./resource/images/skin/UT_002.png");
            } if (u_zone_position_num === 3) {
                $('#U_zone-image').attr('src', "./resource/images/skin/UT_003.png");
            } if (u_zone_position_num === 4) {
                $('#U_zone-image').attr('src', "./resource/images/skin/UT_004.png");
            } if (u_zone_position_num === 5) {
                $('#U_zone-image').attr('src', "./resource/images/skin/UT_005.png");
            } if (u_zone_position_num === 6) {
                $('#U_zone-image').attr('src', "./resource/images/skin/UT_006.png");
            } if (u_zone_position_num === 7) {
                $('#U_zone-image').attr('src', "./resource/images/skin/UT_007.png");
            } if (u_zone_position_num === 8) {
                $('#U_zone-image').attr('src', "./resource/images/skin/UT_008.png");
            } if (u_zone_position_num === 9) {
                $('#U_zone-image').attr('src', "./resource/images/skin/UT_009.png");
            }

            if (response.length === 0) {
                console.log("1111111")
                //DB내, 데이터가 존재하지않음
                $('#comment01_main').text(response[0].specialtip_memo);
                $('#comment02_main').text(response[0].specialtip_memo2);
                //임시
                $('#comment02_main').text(localStorage.getItem('analysis_result-comment02'));



            } else {
                console.log("222")
                //DB내, 데이터가 존재
                $('#comment01_main').text(response[0].specialtip_memo);
                $('#comment02_main').text(response[0].specialtip_memo2);

                $('#opinionsImage').attr('src', response[0].specialtip_stoke_img); //(페이지) 이미지
                $('#backgroundImage').attr('src', response[0].specialtip_img);//(페이지) 백그라운드 이미지


                // $('#comment02_main').text(response[0].specialtip_memo2);

            }

        }, error: function (xhr, status, error) {
            console.error('skin_result_URL 오류 : ', error);
        }
    })






    $.ajax({
        url: ResultSkinConcern_API_URL + '?surveyNo=' + localStorage.getItem('custom_surveyNo'),
        type: 'GET',
        contentType: 'application/json',

        success: function (response) {
            console.log("ResultSkinConcern_API_URL 응답값 : ", response);

            // console.log("********스킨결과 기준 생성일****** > ", response[0].create_dt);
            // const dateObject = response[0].create_dt.substring(0, 10).replace('-', '. ').replace('-', '. ');

            // console.log("********스킨결과 기준 생성일 변환****** > ", dateObject);
            // $('#visitDate').text(dateObject);

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


            updateAgingData(response[0].elasticity, response[0].wrinkle, response[0].futurewrinkles);
            updatePigmentationData(response[0].pigmentation, response[0].melanin);
            updateSensitivityData(response[0].transdermal, response[0].redness);
            updateSebumData(response[0].pore, response[0].porphyrin);





            var tzone_subun_value = response[0].tZone_Moisture;
            var tzone_ubun_value = response[0].tZone_Oilskin;
            var uzone_subun_value = response[0].uZone_Moisture;
            var uzone_ubun_value = response[0].uZone_Oilskin;

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
            console.error('ResultSkinConcern_API_URL 오류 : ', error);
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
        data: [0, 0, 0],
        backgroundColor: function (context) {
            return context.raw < 60 ? '#e7c1da' : '#d98cbf';
        },
    },
        // {
        //     label: '', // 범례 레이블 없음
        //     data: [40, 2, 80],
        //     backgroundColor: ['#e7c1da', '#e7c1da', '#e7c1da'],
        //     borderColor: ['#e7c1da', '#e7c1da', '#e7c1da'],
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
                // min: min_aging_data - 10,
                min: 0,
                ticks: {
                    stepSize: 20,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    },
                    font: {
                        size: 9 // 폰트 크기 조절
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
                    weight: 'medium'
                },
                formatter: function (value, context) {
                    return value;
                }
            }
        },
        barThickness: 20

    }
});


function updateAgingData(elasticity, wrinkle, futurewrinkles) {
    aging_data.datasets[0].data[0] = elasticity; // 탄력
    aging_data.datasets[0].data[1] = wrinkle; // 주름
    aging_data.datasets[0].data[2] = futurewrinkles; // 미래주름

    // var min_aging_data = Math.min(...aging_data.datasets[0].data);  // step2 : Y축 최소값 업데이트
    // aging_chart.options.scales.y.min = parseInt(min_aging_data - 10);

    aging_chart.update();
}



/*
24. 05. 14 #2 Pigmentation 차트 생성 및 업데이트
*/
var pigmentation_data = {
    labels: ['색소침착', '멜라닌'],
    datasets: [{
        label: '', // 범례 레이블 없음
        data: [0, 0],
        backgroundColor: function (context) {
            return context.raw < 60 ? '#e7c1da' : '#d98cbf';
        },
        // borderColor: ['#e7c1da', '#e7c1da'],
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
                // min: min_pigmentation_data - 10,
                min: 0,
                ticks: {
                    stepSize: 20,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    },
                    font: {
                        size: 9 // 폰트 크기 조절
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
                    weight: 'light'
                },
                formatter: function (value, context) {
                    return value;
                }
            }
        },
        barThickness: 20

    }
});


function updatePigmentationData(data1, data2, data3) {
    pigmentation_data.datasets[0].data[0] = data1; // 멜라닌
    pigmentation_data.datasets[0].data[1] = data2; // 색소침착

    // var min_pigmentation_data = Math.min(...pigmentation_data.datasets[0].data);  // step2 : Y축 최소값 업데이트
    // pigmentation_chart.options.scales.y.min = parseInt(min_pigmentation_data - 10);

    pigmentation_chart.update();
}




/*
24. 05. 14 #3 Sensitivity 차트 생성 및 업데이트
*/
var sensitivity_data = {
    labels: ['경피수분손실도', '붉은기'],
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
                // min: min_sensitivity_data - 10,
                min: 0,
                ticks: {
                    stepSize: 20,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    },
                    font: {
                        size: 9 // 폰트 크기 조절
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
                        size: 7 // 폰트 크기 조절
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
                    weight: 'lighy'
                },
                formatter: function (value, context) {
                    return value;
                }
            }
        },
        barThickness: 20
    }
});


function updateSensitivityData(data1, data2) {
    sensitivity_data.datasets[0].data[0] = data1; // 경피수분손실도
    sensitivity_data.datasets[0].data[1] = data2; // 붉은기  
    // var min_sensitivity_data = Math.min(...sensitivity_data.datasets[0].data);  // step2 : Y축 최소값 업데이트
    // sensitivity_chart.options.scales.y.min = parseInt(min_sensitivity_data - 10);

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
                // min: min_sebum_data - 10,
                ticks: {
                    stepSize: 20,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 110 ? '' : value;
                    },
                    font: {
                        size: 9 // 폰트 크기 조절
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
                    weight: 'lighy'
                },
                formatter: function (value, context) {
                    return value;
                }
            }
        },
        barThickness: 20
    }
});


function updateSebumData(data1, data2) {
    sebum_data.datasets[0].data[0] = data1; // 모공
    sebum_data.datasets[0].data[1] = data2; // 포피린
    // var min_sebum_data = Math.min(...sebum_data.datasets[0].data);  // step2 : Y축 최소값 업데이트
    // sebum_chart.options.scales.y.min = parseInt(min_sebum_data - 10);

    sebum_chart.update();
}






/*
*
*24. 06. 14 방문회차 카운트 함수
*
*/
var fnGetVisitCount = function () {
    var visit_count = 0; //프로그램별 방문회차 카운트
    $.ajax({
        url: Main_API_URL + '?name=' + localStorage.getItem('custom_name') + '&phone=' + localStorage.getItem('custom_phone'),
        type: 'GET',
        success: function (response) {
            console.log('=====================');
            console.log('리스트 별 고객검색 결과 성공 : ', response);

            var select_visit1_1_data = response.filter(item => item.ProgramCode === "PC001013"
                && item.cancelYN !== "3"
                && localStorage.getItem('raw_rsvn_date') > item.rsvn_date);
            var select_visit1_2_data = response.filter(item => item.ProgramCode === "PC001014"
                && item.cancelYN !== "3"
                && localStorage.getItem('raw_rsvn_date') > item.rsvn_date);
            var select_visit2_1_data = response.filter(item => item.ProgramCode === "PC001013"
                && item.cancelYN !== "3"
                && localStorage.getItem('raw_rsvn_date') === item.rsvn_date
                && localStorage.getItem('raw_rsvn_time') >= item.rsvn_time);
            var select_visit2_2_data = response.filter(item => item.ProgramCode === "PC001014"
                && item.cancelYN !== "3"
                && localStorage.getItem('raw_rsvn_date') === item.rsvn_date
                && localStorage.getItem('raw_rsvn_time') >= item.rsvn_time);
                
            const finalCombinedData = [...select_visit1_1_data, ...select_visit1_2_data, ...select_visit2_1_data, ...select_visit2_2_data]
                .filter(item => item.m_surveyNo !== null)
                .sort((a, b) => {
                    const dateComparison = new Date(b.rsvn_date).getTime() - new Date(a.rsvn_date).getTime();
                    if (dateComparison !== 0) return dateComparison;
                    return b.rsvn_time.localeCompare(a.rsvn_time);
                });

            console.log("정렬된 데이터: ", finalCombinedData);

            const extractedValues = finalCombinedData.map(item => ({surveyNo: item.m_surveyNo, userkey: item.m_userkey}));
            const selectedValues = extractedValues.slice(0, 4);

            console.log("추출 값 (userkey, surveyNo) : ", extractedValues);
            console.log("첫 번째부터 네 번째까지 값: ", selectedValues);

       

            //프로그램별 히스토리 조회 - 2.각각의 조회된 배열 합치기 / m_surveyNo값 null 제외   
            const combinedData1 = [...select_visit1_1_data, ...select_visit1_2_data];
            const combinedData2 = [...select_visit2_1_data, ...select_visit2_2_data];
            const finalCombinedData_merge = [...combinedData1, ...combinedData2];
            $('#visitCount').text(finalCombinedData_merge.length);


        },
        error: function (xhr, status, error) {
            console.error('리스트 별 고객검색 결과 에러 : ', error);
        }
    });
}
