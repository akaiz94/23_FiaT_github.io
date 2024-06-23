var Main_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/merged/list'; //방문회차 카운트

var ResultSkinConcenr_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/skin/concern/';
var SkinResult_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/skin/result/';


$(document).ready(function () {
    window.scrollTo(0, 470);
    console.log('analysis_result page start -> ')
    $('#visitDate').text(localStorage.getItem('visit_rsvn_date'));

    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));

    var surveyNo = localStorage.getItem('custom_surveyNo');
    console.log('surveyNo : ', surveyNo);

    fnGetVisitCount(); //방문회차 카운트 함수, 히스토리 데이터 매핑

    $('#manager_name').text(localStorage.getItem('manager_name'));
    $('#custom_name').text(localStorage.getItem('custom_name'));

    if (localStorage.getItem('manager_name').length === 2) {
        document.getElementById("title_date").style.marginRight = "90px";
        document.getElementById("title_count").style.marginRight = "145px";
    }

    if (localStorage.getItem('custom_sex') === 'M') {
        $('#T_U_img').attr('src', "./resource/images/print/img-face-M.png");
    } else {
        $('#T_U_img').attr('src', "./resource/images/print/img-face-F.png");
    }
});

let resultArray = []; //스킨 concern 결과값
let resultArray2 = []; //T존, U존결과값

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

            SkinConcernResults(extractedValues);
            SkinConcernResults2(extractedValues);


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

async function SkinConcernResults(extractedValues) {
    async function fetchData(surveyNo) {
        try {
            if (resultArray.length >= 4) {
                return;
            }
            const response = await $.ajax({
                url: ResultSkinConcenr_API_URL + '?surveyNo=' + surveyNo,
                type: 'GET',
                contentType: 'application/json',
                success: function(response){
                    console.log('SkinConcernResults의 response 값 : ', response);

                }
            });

            if (response && response.length > 0) {
                const resultValue = response[0];
                resultArray.push(resultValue);

                console.log("SkinConcernResults의 resultValue 값 : ", resultValue);
                console.log("SkinConcernResults의 resultArray 값 : ", resultArray);
            }
        } catch (error) {
            console.error('SkinConcernResults 데이터 로드오류 : ', error);
        }
    }

    // 모든 데이터 로드가 끝날 때까지 기다립니다.
    await Promise.all(extractedValues.map(value => fetchData(value.surveyNo)));
    resultArray.sort((a, b) => b.surveyNo - a.surveyNo);

    try {
        if (!resultArray || resultArray.length === 0) {
            alert('피부 점수 데이터가 없습니다.');
            return;
        }
        if (resultArray.length === 1) {
            updatePoreData(resultArray[0].pore);
            updateElasticityData(resultArray[0].elasticity);
            updateWrinkleData(resultArray[0].wrinkle);
            updateFutureWrinklesData(resultArray[0].futurewrinkles);
            updateMelaninData(resultArray[0].melanin);
            updatePigmentationData(resultArray[0].pigmentation);
            updateTransdermalData(resultArray[0].transdermal);
            updatePorphyrinData(resultArray[0].porphyrin);
            updateRednessData(resultArray[0].redness);
            updateTZoneData(resultArray[0].tZone_Moisture, resultArray[0].tZone_Oilskin);
            updateUZoneData(resultArray[0].uZone_Moisture, resultArray[0].uZone_Oilskin);
        } else if (resultArray.length === 2) {
            updatePoreData(resultArray[1].pore, resultArray[0].pore);
            updateElasticityData(resultArray[1].elasticity, resultArray[0].elasticity);
            updateWrinkleData(resultArray[1].wrinkle, resultArray[0].wrinkle);
            updateFutureWrinklesData(resultArray[1].futurewrinkles, resultArray[0].futurewrinkles);
            updateMelaninData(resultArray[1].melanin, resultArray[0].melanin);
            updatePigmentationData(resultArray[1].pigmentation, resultArray[0].pigmentation);
            updateTransdermalData(resultArray[1].transdermal, resultArray[0].transdermal);
            updatePorphyrinData(resultArray[1].porphyrin, resultArray[0].porphyrin);
            updateRednessData(resultArray[1].redness, resultArray[0].redness);
            updateTZoneData(resultArray[1].tZone_Moisture, resultArray[1].tZone_Oilskin, resultArray[0].tZone_Moisture, resultArray[0].tZone_Oilskin);
            updateUZoneData(resultArray[1].uZone_Moisture, resultArray[1].uZone_Oilskin, resultArray[0].uZone_Moisture, resultArray[0].uZone_Oilskin);
        } else if (resultArray.length === 3) {
            updatePoreData(resultArray[2].pore, resultArray[1].pore, resultArray[0].pore);
            updateElasticityData(resultArray[2].elasticity, resultArray[1].elasticity, resultArray[0].elasticity);
            updateWrinkleData(resultArray[2].wrinkle, resultArray[1].wrinkle, resultArray[0].wrinkle);
            updateFutureWrinklesData(resultArray[2].futurewrinkles, resultArray[1].futurewrinkles, resultArray[0].futurewrinkles);
            updateMelaninData(resultArray[2].melanin, resultArray[1].melanin, resultArray[0].melanin);
            updatePigmentationData(resultArray[2].pigmentation, resultArray[1].pigmentation, resultArray[0].pigmentation);
            updateTransdermalData(resultArray[2].transdermal, resultArray[1].transdermal, resultArray[0].transdermal);
            updatePorphyrinData(resultArray[2].porphyrin, resultArray[1].porphyrin, resultArray[0].porphyrin);
            updateRednessData(resultArray[2].redness, resultArray[1].redness, resultArray[0].redness);
            updateTZoneData(resultArray[2].tZone_Moisture, resultArray[2].tZone_Oilskin, resultArray[1].tZone_Moisture, resultArray[1].tZone_Oilskin, resultArray[0].tZone_Moisture, resultArray[0].tZone_Oilskin);
            updateUZoneData(resultArray[2].uZone_Moisture, resultArray[2].uZone_Oilskin, resultArray[1].uZone_Moisture, resultArray[1].uZone_Oilskin, resultArray[0].uZone_Moisture, resultArray[0].uZone_Oilskin);
        } else if (resultArray.length === 4) {
            updatePoreData(resultArray[3].pore, resultArray[2].pore, resultArray[1].pore, resultArray[0].pore);
            updateElasticityData(resultArray[3].elasticity, resultArray[2].elasticity, resultArray[1].elasticity, resultArray[0].elasticity);
            updateWrinkleData(resultArray[3].wrinkle, resultArray[2].wrinkle, resultArray[1].wrinkle, resultArray[0].wrinkle);
            updateFutureWrinklesData(resultArray[3].futurewrinkles, resultArray[2].futurewrinkles, resultArray[1].futurewrinkles, resultArray[0].futurewrinkles);
            updateMelaninData(resultArray[3].melanin, resultArray[2].melanin, resultArray[1].melanin, resultArray[0].melanin);
            updatePigmentationData(resultArray[3].pigmentation, resultArray[2].pigmentation, resultArray[1].pigmentation, resultArray[0].pigmentation);
            updateTransdermalData(resultArray[3].transdermal, resultArray[2].transdermal, resultArray[1].transdermal, resultArray[0].transdermal);
            updatePorphyrinData(resultArray[3].porphyrin, resultArray[2].porphyrin, resultArray[1].porphyrin, resultArray[0].porphyrin);
            updateRednessData(resultArray[3].redness, resultArray[2].redness, resultArray[1].redness, resultArray[0].redness);
            updateTZoneData(resultArray[3].tZone_Moisture, resultArray[3].tZone_Oilskin, resultArray[2].tZone_Moisture, resultArray[2].tZone_Oilskin, resultArray[1].tZone_Moisture, resultArray[1].tZone_Oilskin, resultArray[0].tZone_Moisture, resultArray[0].tZone_Oilskin);
            updateUZoneData(resultArray[3].uZone_Moisture, resultArray[3].uZone_Oilskin, resultArray[2].uZone_Moisture, resultArray[2].uZone_Oilskin, resultArray[1].uZone_Moisture, resultArray[1].uZone_Oilskin, resultArray[0].uZone_Moisture, resultArray[0].uZone_Oilskin);
        }
    } catch (error) {
        console.error('SkinConcernResults 차트 반영 오류 : ', error);
    }

    console.log("concern 저장된 결과(resultArray): ", resultArray);
}


async function SkinConcernResults2(extractedValues) {
    async function fetchData(surveyNo) {
        try {
            if (resultArray2.length >= 4) {
                return;
            }
            const response = await $.ajax({
                url: SkinResult_API_URL + '?surveyNo=' + surveyNo,
                type: 'GET',
                contentType: 'application/json'
            });

            if (response && response.length > 0) {
                const resultValue2 = response[0];
                resultArray2.push(resultValue2);
            }
        } catch (error) {
            console.error('SkinConcernResults2 데이터 로드 오류 : ', error);
        }
    }

    // 모든 데이터 로드가 끝날 때까지 기다립니다.
    await Promise.all(extractedValues.map(value => fetchData(value.surveyNo)));
    resultArray2.sort((a, b) => b.surveyNo - a.surveyNo);

    try {
        if (!resultArray2 || resultArray2.length === 0) {
            alert('T존/U존 데이터가 없습니다.');
            return;
        }
        if (resultArray2.length === 1) {
            updateskinScoreData(resultArray2[0]);
            $('#t_zone_result-1 .date').text(resultArray2[0].create_dt.slice(0, 10));

            $('#t_zone_result-1').append(resultArray2[0].t_zone_result).addClass('active');
            $('#u_zone_result-1').append(resultArray2[0].u_zone_result).addClass('active');

        } else if (resultArray2.length === 2) {
            updateskinScoreData(resultArray2[1], resultArray2[0]);
            $('#t_zone_result-1 .date').text(resultArray2[1].create_dt.slice(0, 10));
            $('#t_zone_result-2 .date').text(resultArray2[0].create_dt.slice(0, 10));


            $('#t_zone_result-1').append(resultArray2[1].t_zone_result);
            $('#t_zone_result-2').append(resultArray2[0].t_zone_result).addClass('active');
            $('#u_zone_result-1').append(resultArray2[1].u_zone_result);
            $('#u_zone_result-2').append(resultArray2[0].u_zone_result).addClass('active');
            
        } else if (resultArray2.length === 3) {
            updateskinScoreData(resultArray2[2], resultArray2[1], resultArray2[0]);
            $('#t_zone_result-1 .date').text(resultArray2[2].create_dt.slice(0, 10));
            $('#t_zone_result-2 .date').text(resultArray2[1].create_dt.slice(0, 10));
            $('#t_zone_result-3 .date').text(resultArray2[0].create_dt.slice(0, 10));

        

            $('#t_zone_result-1').append(resultArray2[2].t_zone_result);
            $('#t_zone_result-2').append(resultArray2[1].t_zone_result);
            $('#t_zone_result-3').append(resultArray2[0].t_zone_result).addClass('active');
            $('#u_zone_result-1').append(resultArray2[2].u_zone_result);
            $('#u_zone_result-2').append(resultArray2[1].u_zone_result);
            $('#u_zone_result-3').append(resultArray2[0].u_zone_result).addClass('active');
        } else if (resultArray2.length === 4) {
            updateskinScoreData(resultArray2[3], resultArray2[2], resultArray2[1], resultArray2[0]);
            $('#t_zone_result-1 .date').text(resultArray2[3].create_dt.slice(0, 10));
            $('#t_zone_result-2 .date').text(resultArray2[2].create_dt.slice(0, 10));
            $('#t_zone_result-3 .date').text(resultArray2[1].create_dt.slice(0, 10));
            $('#t_zone_result-4 .date').text(resultArray2[0].create_dt.slice(0, 10));


            $('#t_zone_result-1').append(resultArray2[3].t_zone_result);
            $('#t_zone_result-2').append(resultArray2[2].t_zone_result);
            $('#t_zone_result-3').append(resultArray2[1].t_zone_result);
            $('#t_zone_result-4').append(resultArray2[0].t_zone_result).addClass('active');
            $('#u_zone_result-1').append(resultArray2[3].u_zone_result);
            $('#u_zone_result-2').append(resultArray2[2].u_zone_result);
            $('#u_zone_result-3').append(resultArray2[1].u_zone_result);
            $('#u_zone_result-4').append(resultArray2[0].u_zone_result).addClass('active');
        }
    } catch (error) {
        console.error('SkinConcernResults2 차트 반영 오류 : ', error);
    }

    console.log("U존, T존저장된 결과(resultArray2): ", resultArray2);
}









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
    labels: [],
    datasets: [{
        label: '',
        data: [],
        fill: false,
        borderColor: ['#cccccc', '#e7c1da'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 5, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e7c1da'], // 점 색상            
        pointHoverRadius: 8,
        lineTension: 0.2, // 라인 부드러움 조절
        spanGaps: true // 빈 데이터 포인트 연결
    }]
};


var skinScore_ctx = document.getElementById('skinScore_Chart').getContext('2d');
var skinScore_Chart = new Chart(skinScore_ctx, {
    type: 'line',
    data: skinScore_data,
    options: {
        scales: {
            maintainAspectRatio: false,
            y: {
                beginAtZero: true,
                max: 120, // y축 최대값
                grid: {
                    color: '#cccccc', // 그리드 색상
                    borderDash: [5, 5] // 그리드 점선 스타일
                },
                ticks: {
                    stepSize: 20,
                    //최댓값을 안보이도록 해주는 call back 함수
                    callback: function (value, index, values) {
                        return value === 120 ? '' : value;
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
                    weight: 'bold',
                    size: 10
                },
                formatter: function (value) {
                    return value.toFixed(0); // 데이터 라벨 형식 지정
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});



function updateskinScoreData(...skin_scores) {

    // Update the data points
    skinScore_data.datasets[0].data = skin_scores.map(score => score.skin_score);

    // Update the labels with dates
    skinScore_data.labels = skin_scores.map(score => score.create_dt.slice(0, 10));


    var before_skinScore_data = skin_scores.map(score => score.skin_score);
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
        data: [], // 초기 데이터는 빈 배열
        backgroundColor: function(context) {
            return context.dataIndex === 0 ? '#e7c1da' : '#cccccc';
        }
    }]
};

var ctx = document.getElementById('t_zone_chart').getContext('2d');
var t_zone_chart = new Chart(ctx, {
    type: 'scatter',
    data: t_zone_data,
    options: {
        maintainAspectRatio: false,
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
                    font: {
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
                    font: {
                        size: 9,
                    }
                },
                title: {
                    display: true,
                    text: '유분',
                    font: {
                        size: 10
                    }
                },
                tooltip: {
                    enabled: false,
                }
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            }
        },
        pointRadius: 6,
        pointBackgroundColor: function(context) {
            return context.dataIndex === 0 ? '#e7c1da' : '#cccccc';
        }
    }
});

function updateTZoneData(ts1, tu1, ts2, tu2, ts3, tu3, ts4, tu4) {
    t_zone_data.datasets[0].data[0] = { x: ts1, y: tu1 };
    t_zone_data.datasets[0].data[1] = { x: ts2, y: tu2 };
    t_zone_data.datasets[0].data[2] = { x: ts3, y: tu3 };
    t_zone_data.datasets[0].data[3] = { x: ts4, y: tu4 };

    t_zone_chart.update();
}



/*
24. 05. 20 U존 차트 생성 및 업데이트
*/

var u_zone_data = {
    datasets: [{
        data: [], // 초기 데이터는 빈 배열
        backgroundColor: function(context) {
            return context.dataIndex === 0 ? '#e7c1da' : '#cccccc';
        }
    }]
};

var ctx2 = document.getElementById('u_zone_chart').getContext('2d');
var u_zone_chart = new Chart(ctx2, {
    type: 'scatter',
    data: u_zone_data,
    options: {
        maintainAspectRatio: false,
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
                },
            }
        },
        plugins: {
            legend: {
                display: false // 범례 숨기기
            }
        },
        pointRadius: 6,
        pointBackgroundColor: function(context) {
            return context.dataIndex === 0 ? '#e7c1da' : '#cccccc';
        }
    }
});

function updateUZoneData(us1, uu1, us2, uu2, us3, uu3, us4, uu4) {
    u_zone_data.datasets[0].data[0] = { x: us1, y: uu1 };
    u_zone_data.datasets[0].data[1] = { x: us2, y: uu2 };
    u_zone_data.datasets[0].data[2] = { x: us3, y: uu3 };
    u_zone_data.datasets[0].data[3] = { x: us4, y: uu4 };

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
        data: [0, ], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e7c1da'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e7c1da'], // 점 색상            
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
                    stepSize: 10,
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
                    weight: 'bold',
                    size: 10
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
        data: [0, ], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e7c1da'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e7c1da'], // 점 색상            
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
                    stepSize: 10,
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
                    weight: 'bold',
                    size: 10
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
        data: [0, ], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e7c1da'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e7c1da'], // 점 색상            
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
                    stepSize: 10,
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
                    weight: 'bold',
                    size: 10
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
        data: [0, ], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e7c1da'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e7c1da'], // 점 색상            
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
                    stepSize: 10,
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
                    weight: 'bold',
                    size: 10
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
        data: [0, ], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e7c1da'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e7c1da'], // 점 색상            
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
                    stepSize: 10,
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
                    weight: 'bold',
                    size: 10
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
        data: [0, ], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e7c1da'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e7c1da'], // 점 색상            
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
                    stepSize: 10,
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
                    weight: 'bold',
                    size: 10
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
        data: [0, ], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e7c1da'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e7c1da'], // 점 색상            
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
                    stepSize: 10,
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
                    weight: 'bold',
                    size: 10
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
        data: [0, ], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e7c1da'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e7c1da'], // 점 색상            
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
                    stepSize: 10,
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
                    weight: 'bold',
                    size: 10
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
        data: [0, ], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e7c1da'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 3, // 점 크기
        pointBackgroundColor: ['#cccccc', '#e7c1da'], // 점 색상            
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
                    stepSize: 10,
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
                    weight: 'bold',
                    size: 10
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



