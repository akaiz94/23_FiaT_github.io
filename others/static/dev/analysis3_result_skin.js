
$(document).ready(function () {
    window.scrollTo(0, 470);
    console.log('analysis3_result_skin page start -> ')

    $('#manager_name').text(localStorage.getItem('manager_name'));
    $('#custom_name').text(localStorage.getItem('custom_name'));

    // repush
    
    // if (localStorage.getItem('manager_name').length === 2) {
    //     // $("#title_date").css("margin-right","90px");   
    //     document.getElementById("title_date").style.marginRight = "90px";
    //     document.getElementById("title_count").style.marginRight = "145px";
    // }


    $('#visitDate').text(localStorage.getItem('visitDate'));


});








$('#diagnosisButton').click(function () {

    // const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');


    // const currentTime = new Date();        

    console.log("진단하기 버튼 클릭 : ");


    $.ajax({
        // url: SkinSurvey_API_URL + surveyNo,
        // url: ResultMarkvu_API_URL +  '?surveyNo=' +surveyNo, //실제 데이터 인입

        //url: 'https://citylab.amorepacific.com/gpiopeApi/test',
        url: 'https://citylab.amorepacific.com/gpiopeApi/genoResult?btCustIdNo=100084743&btCustIdNoClassifiCode=01',

        type: 'GET',
        success: function (response) {
            console.log("diagnosisButton 응답값 : ", response);

        }, error: function (xhr, status, error) {
            console.error('diagnosisButton 오류 : ', error);
            $("#custom_detail").html("통신 오류. 다시한번 시도해주세요.");

            showErrorModal();

        }
    })
})









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
        maintainAspectRatio: false, //차트 고정
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
        maintainAspectRatio: false, //차트 고정
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



{
    "id": "100084743",
    "code": "success",
    "result": {
        "code": "0000",
        "message": "success",
        "data": [
            {
                "index": 1,
                "name": "skin_pigmentation",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 75,
                "category": "skin_hair",
                "genes": [
                    {
                        "name": "MC1R",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "OCA2",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": "CC",
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 2,
                "name": "skin_aging",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 57,
                "category": "skin_hair",
                "genes": [
                    {
                        "name": "AGER",
                        "genotype": {
                            "first_snp": "AT",
                            "second_snp": "CC",
                            "third_snp": null
                        }
                    },
                    {
                        "name": "DEF8",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "HDAC4",
                        "genotype": {
                            "first_snp": "CT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "SLC36A3-SLC36A2",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "WDR1-ZNF518B",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 3,
                "name": "androgenetic_alopecia",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 90,
                "category": "skin_hair",
                "genes": [
                    {
                        "name": "chr20p11",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": "CT",
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 4,
                "name": "hair_thickness",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 90,
                "category": "skin_hair",
                "genes": [
                    {
                        "name": "EDAR",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 5,
                "name": "freckles",
                "grade_name": "주의",
                "grade": "TRAIT_GRADE_BAD",
                "percentage_in_south_korea": 5,
                "category": "skin_hair",
                "genes": [
                    {
                        "name": "AKAP1-MSI2",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "BNC2",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "EMX2OS-RAB11FIP2",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "PPARGC1B",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 6,
                "name": "acne",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 63,
                "category": "skin_hair",
                "genes": [
                    {
                        "name": "LYPLAL1-SLC30A10",
                        "genotype": {
                            "first_snp": "CT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "PCNX3",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "SEMA4B",
                        "genotype": {
                            "first_snp": "AG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "TGFB2-LYPLAL1",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 7,
                "name": "skin_inflammation",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 64,
                "category": "skin_hair",
                "genes": [
                    {
                        "name": "FAM72C",
                        "genotype": {
                            "first_snp": "GT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "RNF145-UBLCP1",
                        "genotype": {
                            "first_snp": "CT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 8,
                "name": "tanning",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 53,
                "category": "skin_hair",
                "genes": [
                    {
                        "name": "GRM5",
                        "genotype": {
                            "first_snp": "AG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "PPARGC1B",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "PRDM15",
                        "genotype": {
                            "first_snp": "AG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "SLC45A2",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 9,
                "name": "dead_skin_cells",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 57,
                "category": "skin_hair",
                "genes": [
                    {
                        "name": "HMCN1",
                        "genotype": {
                            "first_snp": "CG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "TMEM270-ELN",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 10,
                "name": "aplopecia_areata",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 78,
                "category": "skin_hair",
                "genes": [
                    {
                        "name": "ACOXL",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "IL13",
                        "genotype": {
                            "first_snp": "AC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "IL2-IL21",
                        "genotype": {
                            "first_snp": "GC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "IL2RA",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 11,
                "name": "hair_greying",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 99,
                "category": "skin_hair",
                "genes": [
                    {
                        "name": "IRF4",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 12,
                "name": "vitamin_c",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 94,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "SLC23A1",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": "GG",
                            "third_snp": "CC"
                        }
                    },
                    {
                        "name": "SLC23A2",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 13,
                "name": "vitamin_d",
                "grade_name": "주의",
                "grade": "TRAIT_GRADE_BAD",
                "percentage_in_south_korea": 20,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "GC",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 14,
                "name": "coenzyme_q10",
                "grade_name": "주의",
                "grade": "TRAIT_GRADE_BAD",
                "percentage_in_south_korea": 20,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "SWI5",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 15,
                "name": "magnesium",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 99,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "MUC1",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 16,
                "name": "zinc",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 50,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "SLC30A3",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 17,
                "name": "iron",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 99,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "KCTD17-TMPRSS6",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "TMPRSS6",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": "CC",
                            "third_snp": "AA"
                        }
                    }
                ]
            },
            {
                "index": 18,
                "name": "potassium",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 43,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "CLASP1",
                        "genotype": {
                            "first_snp": "CT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "HOTTIP",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "PRDM8-FGF5",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "TBX2",
                        "genotype": {
                            "first_snp": "AG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 19,
                "name": "calcium",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 50,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "BCAS1-CYP24A1",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "BCAS3",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 20,
                "name": "arginine",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 80,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "AGXT2",
                        "genotype": {
                            "first_snp": "CT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "DDAH1",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "NRX1-ASB3",
                        "genotype": {
                            "first_snp": "GT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "PTPRE-MGMT",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 21,
                "name": "fatty_acid",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 99,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "ADIPOR2",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "FABP2",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "FFAR1",
                        "genotype": {
                            "first_snp": "GA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 22,
                "name": "vitamin_a",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 99,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "PKD1L2",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "PKD1L2-BCO1",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": "GG",
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 23,
                "name": "vitamin_b6",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 55,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "NBPF3-ALPL",
                        "genotype": {
                            "first_snp": "CT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 24,
                "name": "vitamin_e",
                "grade_name": "주의",
                "grade": "TRAIT_GRADE_BAD",
                "percentage_in_south_korea": 22,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "CYP4F2",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "SCARB1",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "ZPR1",
                        "genotype": {
                            "first_snp": "GC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 25,
                "name": "vitamin_k",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 99,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "TMED7-CDO1",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 26,
                "name": "vitamin_b12",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 99,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "CUBN",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "MUT",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 27,
                "name": "tyrosine",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 56,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "REV3L",
                        "genotype": {
                            "first_snp": "TG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "TAT-MARVELD3",
                        "genotype": {
                            "first_snp": "AT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "TM6SF2",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 28,
                "name": "betaine",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 85,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "BHMT2",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "BHMT-JMY",
                        "genotype": {
                            "first_snp": "AC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "CPS1",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 29,
                "name": "selenium",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 83,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "BHMT",
                        "genotype": {
                            "first_snp": "CT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "NEIL3-AGA",
                        "genotype": {
                            "first_snp": "CA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "SLC39A11",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 30,
                "name": "lutein",
                "grade_name": "주의",
                "grade": "TRAIT_GRADE_BAD",
                "percentage_in_south_korea": 8,
                "category": "nutrition_and_metabolism",
                "genes": [
                    {
                        "name": "BCO1",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "PKD1L2-BCO1",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": "GG",
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 31,
                "name": "triglycerides",
                "grade_name": "주의",
                "grade": "TRAIT_GRADE_BAD",
                "percentage_in_south_korea": 18,
                "category": "healthcare",
                "genes": [
                    {
                        "name": "ANGPTL3",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "AQP9-LIPC",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": "CC",
                            "third_snp": null
                        }
                    },
                    {
                        "name": "GCKR",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "MLXIPL",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "TBL2",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "TRIB1",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "TRIB1-FAM84B",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 32,
                "name": "bmi",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 97,
                "category": "healthcare",
                "genes": [
                    {
                        "name": "BDNF",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "FTO",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": "TT",
                            "third_snp": null
                        }
                    },
                    {
                        "name": "MC4R",
                        "genotype": {
                            "first_snp": "GA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 33,
                "name": "cholesterol",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 83,
                "category": "healthcare",
                "genes": [
                    {
                        "name": "APOA5-APOA4",
                        "genotype": {
                            "first_snp": "GA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "CETP",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "CMIP",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "HMGCR",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": "CC",
                            "third_snp": null
                        }
                    },
                    {
                        "name": "HPR",
                        "genotype": {
                            "first_snp": "GA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "MYRF",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "POLK",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "SNX13",
                        "genotype": {
                            "first_snp": "GT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 34,
                "name": "blood_sugar",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 65,
                "category": "healthcare",
                "genes": [
                    {
                        "name": "CDKAL1",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "CDKN2A/B",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "DGKB-TMEM195",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "GCK",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "KCNQ1",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "MTNR1B",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "SIX3-SIX2",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "SLC30A8",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": "CC",
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 35,
                "name": "blood_pressure",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 92,
                "category": "healthcare",
                "genes": [
                    {
                        "name": "ATP2B1",
                        "genotype": {
                            "first_snp": "GA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "CYP17A1",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "FGF5",
                        "genotype": {
                            "first_snp": "CT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "NPR3",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 36,
                "name": "obesity",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 85,
                "category": "healthcare",
                "genes": [
                    {
                        "name": "CLOCK",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "FTO",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 37,
                "name": "motion_sickness",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 52,
                "category": "healthcare",
                "genes": [
                    {
                        "name": "HMX3-GPR26",
                        "genotype": {
                            "first_snp": "CA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 38,
                "name": "bone_density",
                "grade_name": "주의",
                "grade": "TRAIT_GRADE_BAD",
                "percentage_in_south_korea": 25,
                "category": "healthcare",
                "genes": [
                    {
                        "name": "COLEC10",
                        "genotype": {
                            "first_snp": "TA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "MEPE-SPP1",
                        "genotype": {
                            "first_snp": "TG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "WNT4-ZBTB40",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "ZNF621-CTNNB1",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 39,
                "name": "osteoarthritis",
                "grade_name": "주의",
                "grade": "TRAIT_GRADE_BAD",
                "percentage_in_south_korea": 27,
                "category": "healthcare",
                "genes": [
                    {
                        "name": "CRADD",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "GLIS3",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "LTBP1",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "MIR572-RAB28",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "TGFA",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 40,
                "name": "uric_acid",
                "grade_name": "주의",
                "grade": "TRAIT_GRADE_BAD",
                "percentage_in_south_korea": 21,
                "category": "healthcare",
                "genes": [
                    {
                        "name": "BCAS3",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "MPPED2-DCDC1",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 41,
                "name": "body_fat_percentage",
                "grade_name": "주의",
                "grade": "TRAIT_GRADE_BAD",
                "percentage_in_south_korea": 36,
                "category": "healthcare",
                "genes": [
                    {
                        "name": "IQCH",
                        "genotype": {
                            "first_snp": "GA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "PEPD",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "PLCE1",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "WSCD2",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 42,
                "name": "abdominal_obesity",
                "grade_name": "주의",
                "grade": "TRAIT_GRADE_BAD",
                "percentage_in_south_korea": 19,
                "category": "healthcare",
                "genes": [
                    {
                        "name": "KCNJ2-CASC17",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "SSPN-ITPR2",
                        "genotype": {
                            "first_snp": "CT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "VEGFA-MRPL14",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 43,
                "name": "weight_loss",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 56,
                "category": "healthcare",
                "genes": [
                    {
                        "name": "CRTC3",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "CYYR1",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "DCC-MBD2",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "PRRX2",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 44,
                "name": "yoyo_effect",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 99,
                "category": "healthcare",
                "genes": [
                    {
                        "name": "FBLN5",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "LAMB1",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 45,
                "name": "caffein_matebolism",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 99,
                "category": "personal_characteristics",
                "genes": [
                    {
                        "name": "AGR3-AHR",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "CYP1A2",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 46,
                "name": "alcohol_metabolism",
                "grade_name": "안심",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 87,
                "category": "personal_characteristics",
                "genes": [
                    {
                        "name": "ADH1B",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "ALDH2",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": "TC",
                            "third_snp": null
                        }
                    },
                    {
                        "name": "HECTD4",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 47,
                "name": "alcohol_dependency",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 62,
                "category": "personal_characteristics",
                "genes": [
                    {
                        "name": "ESR1",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "PKNOX2",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "SERINC2",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 48,
                "name": "alcohol_flushing",
                "grade_name": "주의",
                "grade": "TRAIT_GRADE_BAD",
                "percentage_in_south_korea": 39,
                "category": "personal_characteristics",
                "genes": [
                    {
                        "name": "IDO1-ZMAT4",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "MOB2-DUSP8",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": "AA",
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 49,
                "name": "wine_preference",
                "grade_name": "화이트 와인",
                "grade": "",
                "percentage_in_south_korea": 20,
                "category": "personal_characteristics",
                "genes": [
                    {
                        "name": "ARL15",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "MROH5-TSNARE1",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 50,
                "name": "nicotine_metabolism",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 66,
                "category": "personal_characteristics",
                "genes": [
                    {
                        "name": "CYP2A6",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": "TC",
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 51,
                "name": "nicotine_dependency",
                "grade_name": "낮음",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 83,
                "category": "personal_characteristics",
                "genes": [
                    {
                        "name": "FERD3L-TWISTNB",
                        "genotype": {
                            "first_snp": "CA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "GNAL",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "ICE1-UBE2QL1",
                        "genotype": {
                            "first_snp": "GA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "QSOX2-GPSM1",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 52,
                "name": "caffein_dependency",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 51,
                "category": "personal_characteristics",
                "genes": [
                    {
                        "name": "CAB39L",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "CPLX3-ULK3",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 53,
                "name": "insomnia",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 51,
                "category": "personal_characteristics",
                "genes": [
                    {
                        "name": "SMAD5",
                        "genotype": {
                            "first_snp": "GT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 54,
                "name": "sleep_duration",
                "grade_name": "긴 수면",
                "grade": "",
                "percentage_in_south_korea": 56,
                "category": "personal_characteristics",
                "genes": [
                    {
                        "name": "CA10-KIF2B",
                        "genotype": {
                            "first_snp": "CT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "RBFOX1",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 55,
                "name": "morning_person",
                "grade_name": "아침형 인간",
                "grade": "",
                "percentage_in_south_korea": 81,
                "category": "personal_characteristics",
                "genes": [
                    {
                        "name": "FAM185A",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "VAMP3",
                        "genotype": {
                            "first_snp": "AC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 56,
                "name": "pain_sensitivity",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 62,
                "category": "personal_characteristics",
                "genes": [
                    {
                        "name": "COMT",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "OPRM1",
                        "genotype": {
                            "first_snp": "AG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 57,
                "name": "power_exercise",
                "grade_name": "높음",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 72,
                "category": "workout",
                "genes": [
                    {
                        "name": "ACTN3",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "AGT",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 58,
                "name": "aerobic_exercise",
                "grade_name": "낮음",
                "grade": "TRAIT_GRADE_BAD",
                "percentage_in_south_korea": 17,
                "category": "workout",
                "genes": [
                    {
                        "name": "KDR",
                        "genotype": {
                            "first_snp": "TA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "NOS3",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "PPARGC1A",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "VEGFA",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 59,
                "name": "endurance_exercise",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 61,
                "category": "workout",
                "genes": [
                    {
                        "name": "PPARD",
                        "genotype": {
                            "first_snp": "CT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "VEGFA",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 60,
                "name": "muscle_develop",
                "grade_name": "높음",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 96,
                "category": "workout",
                "genes": [
                    {
                        "name": "AGT",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "AGTR2",
                        "genotype": {
                            "first_snp": "AC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "TRHR",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 61,
                "name": "sprint",
                "grade_name": "높음",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 99,
                "category": "workout",
                "genes": [
                    {
                        "name": "AGTR2",
                        "genotype": {
                            "first_snp": "AC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "SLC16A1",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 62,
                "name": "ankle_injury",
                "grade_name": "보통",
                "grade": "TRAIT_GRADE_NORMAL",
                "percentage_in_south_korea": 50,
                "category": "workout",
                "genes": [
                    {
                        "name": "ACTN3",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 63,
                "name": "grip_strength",
                "grade_name": "높음",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 71,
                "category": "workout",
                "genes": [
                    {
                        "name": "ATXN2L",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "TGFA",
                        "genotype": {
                            "first_snp": "GG",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 64,
                "name": "recovery",
                "grade_name": "낮음",
                "grade": "TRAIT_GRADE_BAD",
                "percentage_in_south_korea": 20,
                "category": "workout",
                "genes": [
                    {
                        "name": "GDF5",
                        "genotype": {
                            "first_snp": "AA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "IL6R",
                        "genotype": {
                            "first_snp": "AC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 65,
                "name": "appetite",
                "grade_name": "낮음",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 85,
                "category": "eating_habits",
                "genes": [
                    {
                        "name": "ANKK1",
                        "genotype": {
                            "first_snp": "GA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 66,
                "name": "satiety",
                "grade_name": "높음",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 99,
                "category": "eating_habits",
                "genes": [
                    {
                        "name": "FTO",
                        "genotype": {
                            "first_snp": "TT",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 67,
                "name": "sweetness_sensitivity",
                "grade_name": "높음",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 99,
                "category": "eating_habits",
                "genes": [
                    {
                        "name": "TAS1R3",
                        "genotype": {
                            "first_snp": "CC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 68,
                "name": "bitterness_sensitivity",
                "grade_name": "높음",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 99,
                "category": "eating_habits",
                "genes": [
                    {
                        "name": "TAS2R38",
                        "genotype": {
                            "first_snp": "GA",
                            "second_snp": "CG",
                            "third_snp": null
                        }
                    }
                ]
            },
            {
                "index": 69,
                "name": "salt_taste_sensitivity",
                "grade_name": "높음",
                "grade": "TRAIT_GRADE_GOOD",
                "percentage_in_south_korea": 99,
                "category": "eating_habits",
                "genes": [
                    {
                        "name": "SCNN1B",
                        "genotype": {
                            "first_snp": "TA",
                            "second_snp": null,
                            "third_snp": null
                        }
                    },
                    {
                        "name": "TRPV1",
                        "genotype": {
                            "first_snp": "TC",
                            "second_snp": null,
                            "third_snp": null
                        }
                    }
                ]
            }
        ],
        "level": "info",
        "timestamp": "2024-06-11 15:48:36",
        "label": "Iope"
    }
}