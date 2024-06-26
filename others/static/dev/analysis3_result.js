var ReservedCustom_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/progress_flg/';
var DirectCustom_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/direct/progress_flg/';

var Main_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/merged/list'; //방문회차 카운트


var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 1000,
    startIndex: 0,
}

$(document).ready(function () {
    window.scrollTo(0, 470);
    console.log('analysis3_result page start -> ')

    if(localStorage.getItem('custom_surveyNo') === null){
        console.log("고객 정보 확인불가.");
            $("#noData_text").html('고객이 선택되지 않았습니다.');
            $("#noData_text2").html('잠시후 예약확인 페이지로 이동합니다.');
            $('.msg-layer-noData').addClass('open');
    
            setTimeout(function () {
              $('.layer-wrap-noData').removeClass('open');
              window.location.href = './solution_reservation.html';;   // 문진(피부) 측정 페이지로 이동
            }, 2000); // 2초 
    
            return;
      }

      if (localStorage.getItem('ProgramCode') === 'PC001014') {
        console.log("피부프로그램");
        $("#noData_text").html('피부 프로그램에서 이용할 수 없는 페이지입니다.');
        $("#noData_text2").html('잠시후 예약확인 페이지로 이동합니다.');
        $('.msg-layer-noData').addClass('open');

        setTimeout(function () {
            $('.layer-wrap-noData').removeClass('open');
            window.location.href = './solution_reservation.html';;   // 문진(피부) 측정 페이지로 이동
        }, 2000); // 2초 

        return;
    }

    if (localStorage.getItem('ProgramCode') === 'PC001010') {
        console.log("두피프로그램");
        $("#noData_text").html('두피 프로그램에서 이용할 수 없는 페이지입니다.');
        $("#noData_text2").html('잠시후 예약확인 페이지로 이동합니다.');
        $('.msg-layer-noData').addClass('open');

        setTimeout(function () {
            $('.layer-wrap-noData').removeClass('open');
            window.location.href = './solution_reservation.html';;   // 문진(피부) 측정 페이지로 이동
        }, 2000); // 2초 

        return;
    }
    

    //상담 완료가 아닐경우 (상담완료는 진행률 이미 100%)
    if (localStorage.getItem('progress_flg') !== '10') {
        //직접 방문 고객의 상담 진행률
        if (localStorage.getItem('visitkey') === '0') {
            console.log("직방 고객 상담 진행률 체크")
            $.ajax({
                url: DirectCustom_API_URL + localStorage.getItem('skey'),
                type: 'PATCH',
                data: JSON.stringify({ "progress_flg": "111" }), //마이스킨솔루션 진행중
                contentType: 'application/json',

                success: function (response) {
                    console.log('=====================');
                    console.log('마이스킨솔루션 인입 성공 : ', response);
                },

                error: function (xhr, status, error) {
                    console.error('마이스킨솔루션 인입 에러 : ', error);
                }
            })
        }
        //예약 방문 고객의 상담 진행률
        else if (localStorage.getItem('visitkey') !== '0') {
            console.log("예약 고객 상담 진행률 체크")
            $.ajax({
                url: ReservedCustom_API_URL + localStorage.getItem('visitkey') + '/' + localStorage.getItem('skey'),
                type: 'PATCH',
                data: JSON.stringify({ "progress_flg": "111" }), //마이스킨솔루션 진행중
                contentType: 'application/json',

                success: function (response) {
                    console.log('=====================');
                    console.log('마이스킨솔루션 인입 성공 : ', response);
                },

                error: function (xhr, status, error) {
                    console.error('마이스킨솔루션 인입 에러 : ', error);
                }
            })
        }
    }







    $('#manager_name').text(localStorage.getItem('manager_name'));
    $('#custom_name').text(localStorage.getItem('custom_name'));

    if (localStorage.getItem('manager_name').length === 2) {
        // $("#title_date").css("margin-right","90px");   
        document.getElementById("title_date").style.marginRight = "90px";
        document.getElementById("title_count").style.marginRight = "145px";
    }

    fnGetVisitCount();//방문회차 카운트 함수
    $('#visitDate').text(localStorage.getItem('visit_rsvn_date'));
    // var ucstmid = "204677883";
    let ucstmid = localStorage.getItem('custom_ucstmid'); //운영
    console.log("ucstmid : ", ucstmid);


    if(ucstmid.length === 0){        
        console.log("유전자검사 결과값 확인 불가.");
        $("#noData_text").html('유전자검사를 하지 않았습니다.');
        $("#noData_text2").html('잠시후 피부 측정 페이지로 이동합니다.');
        $('.msg-layer-noData').addClass('open');
        setTimeout(function () {
            $('.layer-wrap-noData').removeClass('open');
            window.location.href = './analysis.html';;   // 피부측정 페이지로 이동
        }, 2000); // 2초 

    } else {
        fnGetDNA(ucstmid);
        console.log('fnGetDNA 함수 실행');
    }

});


function fnGetDNA(ucstmid){

    $.ajax({
        // url: 'https://citylab.amorepacific.com/gpiopeApi/genoResult2?btCustIdNo=100084743&btCustIdNoClassifiCode=01',
        url: `https://citylab.amorepacific.com/gpiopeApi/genoResult2?btCustIdNo=${ucstmid}&btCustIdNoClassifiCode=01`,

        type: 'GET',
        success: function (response) {
            console.log('유전자결과 응답 : ', response.result);

            var transformedResults = [];

            //응답 데이터 순회
            response.result.forEach(function (item) {
                var transformedItem = {};

                //이름 변환
                transformedItem.name = transformName(item.name);
                //등수
                transformedItem.rank = 100 - item.percentage_in_south_korea + '등';
                //그래프 게이지
                transformedItem.gauge = item.percentage_in_south_korea;
                //등급 변환
                transformedItem.level = transformLevel(item.grade);

                transformedResults.push(transformedItem);
            });

            console.log("변환된 결과 : ", transformedResults);

            transformedResults.forEach(item => {
                if (skinList.includes(item.name)) {
                    DNA_data[0].push(item);
                } else if (hairList.includes(item.name)) {
                    DNA_data[1].push(item);
                } else if (nutritionList.includes(item.name)) {
                    DNA_data[2].push(item);
                } else if (exerciseList.includes(item.name)) {
                    DNA_data[3].push(item);
                } else if (healthList.includes(item.name)) {
                    DNA_data[4].push(item);
                } else if (personalList.includes(item.name)) {
                    DNA_data[5].push(item);
                } else if (eatingList.includes(item.name)) {
                    DNA_data[6].push(item);
                }
            });

            console.log("항목 구분 후, DNA_data : ", DNA_data);
            console.log("jsonData : ", jsonData);

             // 피부 버튼 클릭 (초기 렌더링 설정)
            $("#skin_click").click();

        },

        error: function (xhr, status, error) {
            console.error('유전자결과 에러 : ', error);

        }
    })

}









const DNA_data = [[], [], [], [], [], [], []];
const jsonData = DNA_data;

const skinList = ['색소침착', '피부노화', '기미/주근깨', '여드름 발생', '튼살/각질', '피부염증', '태닝반응'];
const hairList = ['남성형 탈모', '모발굵기', '원형 탈모', '새치']
const nutritionList = ['베타인', '글루타치온', '마그네슘', '셀레늄', '칼슘', '타이로신', '아르기닌', '루테인&지아잔틴', '철', '아연', '지방산', '칼륨', '코엔자임Q10', '비타민 A', '비타민 B6', '비타민 B12', '비타민 C', '비타민 D', '비타민 E', '비타민 K',];
const exerciseList = ['근력운동적합성', '유산소운동적합성', '지구력운동적합성', '근육발달능력', '단거리 질주 능력', '발목부상 위험도', '악력', '운동 후 회복능력'];
const healthList = ['중성지방농도', '체질량지수', 'LDL 콜레스테롤', '혈당', '혈압', '비만', '멀미', '퇴행성 관절염증', '요산치', '체지방률', '복부비만', '체중감량효과', '요요가능성', '수축기 혈압']
const personalList = ['와인선호도', '카페인 대사', '알코올 대사', '알코올 의존성', '알코올 홍조', '니코틴 대사', '니코틴 의존성', '카페인 의존성', '불면증', '아침형저녁형인간', '수면습관', '통증 민감성', '코골이'];
const eatingList = ['식욕', '포만감', '단맛 민감도', '쓴맛 민감도', '짠맛 민감도'];

function transformName(name) {
    // 1.피부
    if (name === 'skin_pigmentation') {
        return '색소침착';
    } else if (name === 'skin_aging') {
        return '피부노화';
    } else if (name === 'freckles') {
        return '기미/주근깨';
    } else if (name === 'acne') {
        return '여드름 발생';
    } else if (name === 'dead_skin_cells') {
        return '튼살/각질';
    } else if (name === 'skin_inflammation') {
        return '피부염증'; // #1 2024년도 이전 (구)
    } else if (name === "tanning") {
        return '태닝반응'; // #2 2024년도 이전 (구)
    }

    // 2.두피
    else if (name === 'androgenetic_alopecia') {
        return '남성형 탈모';
    } else if (name === 'hair_thickness') {
        return '모발굵기';
    } else if (name === 'aplopecia_areata') {
        return '원형 탈모';
    } else if (name === 'hair_greying') {
        return '새치';
    }

    // 3.영양과 대사
    else if (name === 'betaine') {
        return '베타인';
    } else if (name === 'glutathione') {
        return '글루타치온';  // #1 2024년도 이후(신) 
    } else if (name === 'magnesium') {
        return '마그네슘';
    } else if (name === 'selenium') {
        return '셀레늄';
    } else if (name === 'vitamin_e') {
        return '비타민 E';
    } else if (name === 'calcium') {
        return '칼슘';
    } else if (name === 'tyrosine') {
        return '타이로신';
    } else if (name === 'vitamin_d') {
        return '비타민 D';
    } else if (name === 'arginine') {
        return '아르기닌';
    } else if (name === 'lutein') {
        return '루테인&지아잔틴';
    } else if (name === 'iron') {
        return '철';
    } else if (name === 'vitamin_a') {
        return '비타민 A';
    } else if (name === 'vitamin_b12') {
        return '비타민 B12';
    } else if (name === 'vitamin_k') {
        return '비타민 K';
    } else if (name === 'zinc') {
        return '아연';
    } else if (name === 'fatty_acid') {
        return '지방산';  // #3 2024년도 이전(구) 
    } else if (name === 'vitamin_c') {
        return '비타민 C';
    } else if (name === 'potassium') {
        return '칼륨';
    } else if (name === 'coenzyme_q10') {
        return '코엔자임Q10';
    } else if (name === 'vitamin_b6') {
        return '비타민 B6';
    }

    // 4.운동
    else if (name === 'power_exercise') {
        return '근력운동적합성';
    } else if (name === 'aerobic_exercise') {
        return '유산소운동적합성';
    } else if (name === 'endurance_exercise') {
        return '지구력운동적합성';
    } else if (name === 'muscle_develop') {
        return '근육발달능력';
    } else if (name === 'sprint') {
        return '단거리 질주 능력';
    } else if (name === 'ankle_injury') {
        return '발목부상 위험도';
    } else if (name === 'grip_strength') {
        return '악력';
    } else if (name === 'recovery') {
        return '운동 후 회복능력';
    }

    // 5.건강관리
    else if (name === 'triglycerides') {
        return '중성지방농도';
    } else if (name === 'bmi') {
        return '체질량지수';
    } else if (name === 'cholesterol') {
        return '콜레스테롤';
    } else if (name === 'blood_sugar') {
        return '혈당';
    } else if (name === 'blood_pressure') {
        return '혈압';
    } else if (name === 'obesity') {
        return '비만';
    } else if (name === 'motion_sickness') {
        return '멀미';
    } else if (name === 'bone_density') {
        return '골질량';
    } else if (name === 'osteoarthritis') {
        return '퇴행성 관절염증';
    } else if (name === 'uric_acid') {
        return '요산치';
    } else if (name === 'body_fat_percentage') {
        return '체지방률';
    } else if (name === 'abdominal_obesity') {
        return '복부비만';
    } else if (name === 'weight_loss') {
        return '체중감량효과';
    } else if (name === 'yoyo_effect') {
        return '요요가능성';
    } else if (name === 'ldl_cholesterol') {
        return 'LDL 콜레스테롤';  //(구)콜레스테롤 -> (현)LDL 콜레스테롤 
    } else if (name === 'systolic_blood_pressure') {
        return '수축기 혈압'; //(구)혈압 -> (현)수축기 혈압
    }

    // 6.개인특성
    else if (name === 'wine_preference') {
        return '와인선호도';
    } else if (name === 'caffein_matebolism') {
        return '카페인 대사';
    } else if (name === 'alcohol_metabolism') {
        return '알코올 대사';
    } else if (name === 'alcohol_dependency') {
        return '알코올 의존성';
    } else if (name === 'alcohol_flushing') {
        return '알코올 홍조';
    } else if (name === 'nicotine_metabolism') {
        return '니코틴 대사';
    } else if (name === 'nicotine_dependency') {
        return '니코틴 의존성';
    } else if (name === 'caffein_dependency') {
        return '카페인 의존성';
    } else if (name === 'insomnia') {
        return '불면증';
    } else if (name === 'morning_person') {
        return '아침형,저녁형인간';
    } else if (name === 'sleep_duration') {
        return '수면습관';
    } else if (name === 'pain_sensitivity') {
        return '통증 민감성';
    } else if (name === 'snoring') {
        return '코골이'; // #2 2024년도 이후(신) 
    }

    // 7. 식습관
    else if (name === 'appetite') {
        return '식욕';
    } else if (name === 'satiety') {
        return '포만감';
    } else if (name === 'sweetness_sensitivity') {
        return '단맛 민감도';
    } else if (name === 'bitterness_sensitivity') {
        return '쓴맛 민감도';
    } else if (name === 'salt_taste_sensitivity') {
        return '짠맛 민감도';
    }

    else {
        return name;
    }
}




/*
*
*24. 06. 14 방문회차 카운트 함수
*
*/

var fnGetVisitCount = function () {
    var visitCount = 0; //프로그램별 방문회차 카운트
    $.ajax({
        url: Main_API_URL + '?name=' + localStorage.getItem('custom_name') + '&phone=' + localStorage.getItem('custom_phone'),

        type: 'GET',
        success: function (response) {
            console.log('=====================');
            console.log('리스트 별 고객검색 결과 성공 : ', response);


            //프로그램별 방문회차 카운트 입력2 (같은날짜, 시간대 고려)
            var select_visit1_1 = 0 //다른날짜 - 마이스킨솔루션
       

            select_visit1_1 = response.filter(item => item.ProgramCode === "PC001013"
                && item.cancelYN !== "3"
                && localStorage.getItem('raw_rsvn_date') > item.rsvn_date).length;


            console.log("select_visit1_1 : ", select_visit1_1);
        

            var select_visit2_1 = 0 //같은날짜 - 마이스킨솔루션
        

            select_visit2_1 = response.filter(item => item.ProgramCode === "PC001013"
                && item.cancelYN !== "3"
                && localStorage.getItem('raw_rsvn_date') === item.rsvn_date
                && localStorage.getItem('raw_rsvn_time') >= item.rsvn_time).length;

            console.log("select_visit2_1 : ", select_visit2_1);       

            visitCount = select_visit1_1 + select_visit2_1;
            console.log("방문 회차 : visitCount > ", visitCount);

            $('#visitCount').text(visitCount);

        },

        error: function (xhr, status, error) {
            console.error('리스트 별 고객검색 결과  에러 : ', error);
        }
    })


}





function transformLevel(grade) {
    if (grade === "TRAIT_GRADE_GOOD") {
        return 1;
    } else if (grade === "TRAIT_GRADE_NORMAL") {
        return 2;
    } else if (grade === "TRAIT_GRADE_BAD") {
        return 3;
    } else {
        return 1;
    }
}




/*임시 데이터 */
// const jsonData =
//     [
//         [
//             { name: '색소침착', rank: '25등', gauge: 75, level: 1 }, // skin_pigmentation
//             { name: '피부노화', rank: '43등', gauge: 57, level: 2 }, // skin_aging
//             { name: '기미/주근깨', rank: '70등', gauge: 30, level: 3 }, // freckles
//             { name: '여드름 발생', rank: '60등', gauge: 40, level: 2 }, // acne
//             { name: '튼살/각질', rank: '52등', gauge: 48, level: 2 }, // dead_skin_cells
//         ],
//         [
//             { name: '남성형 탈모', rank: '44등', gauge: 56, level: 2 }, // androgenetic_alopecia
//             { name: '모발굵기', rank: '38등', gauge: 62, level: 2 }, // hair_thickness
//             { name: '원형 탈모', rank: '36등', gauge: 64, level: 2 }, // aplopecia_areata
//             { name: '새치', rank: '34등', gauge: 66, level: 2 }, // hair_greying
//         ],
//         [
//             { name: '베타인', rank: '20등', gauge: 80, level: 1 }, // betaine
//             { name: '글루타치온', rank: '76등', gauge: 24, level: 3 }, // glutathione
//             { name: '마그네슘', rank: '70등', gauge: 30, level: 2 }, // magnesium
//             { name: '셀레늄', rank: '60등', gauge: 40, level: 2 }, // selenium
//             { name: '칼슘', rank: '48등', gauge: 52, level: 2 }, // calcium
//             { name: '타이로신', rank: '44등', gauge: 56, level: 2 }, // tyrosine
//             { name: '아르기닌', rank: '36등', gauge: 64, level: 2 }, // arginine
//             { name: '루테인&지아잔틴', rank: '34등', gauge: 66, level: 2 }, // lutein
//             { name: '철', rank: '33등', gauge: 67, level: 2 }, // iron
//             { name: '아연', rank: '12등', gauge: 88, level: 1 }, // zinc
//             { name: '지방산', rank: '12등', gauge: 88, level: 1 }, // fatty_acid
//             { name: '칼륨', rank: '1등', gauge: 100, level: 1 }, // potassium
//             { name: '코엔자임Q10', rank: '1등', gauge: 100, level: 1 }, // coenzyme_q10

//             { name: '비타민 A', rank: '32등', gauge: 68, level: 2 }, // vitamin_a
//             { name: '비타민 B6', rank: '1등', gauge: 100, level: 1 }, // vitamin_b6
//             { name: '비타민 B12', rank: '27등', gauge: 73, level: 1 }, // vitamin_b12
//             { name: '비타민 C', rank: '7등', gauge: 93, level: 1 }, // vitamin_c
//             { name: '비타민 D', rank: '38등', gauge: 62, level: 2 }, // vitamin_d
//             { name: '비타민 E', rank: '42등', gauge: 58, level: 2 }, // vitamin_e
//             { name: '비타민 K', rank: '18등', gauge: 82, level: 1 }, // vitamin_k
//         ],
//         [
//             { name: '근력운동적합성', rank: '20등', gauge: 80, level: 1 }, // power_exercise
//             { name: '유산소운동적합성', rank: '66등', gauge: 34, level: 3 }, // aerobic_exercise
//             { name: '지구력운동적합성', rank: '70등', gauge: 30, level: 2 }, // endurance_exercise
//             { name: '근육발달능력', rank: '70등', gauge: 30, level: 2 }, // muscle_develop
//             { name: '단거리 질주 능력', rank: '42등', gauge: 58, level: 2 }, // sprint
//             { name: '발목부상 위험도', rank: '48등', gauge: 52, level: 2 }, // ankle_injury
//             { name: '악력', rank: '44등', gauge: 56, level: 2 }, // grip_strength
//             { name: '운동 후 회복능력', rank: '38등', gauge: 62, level: 2 }, // recovery
//         ],
//         [
//             { name: '중성지방농도', rank: '20등', gauge: 80, level: 1 }, //triglycerides
//             { name: '체질량지수', rank: '76등', gauge: 24, level: 3 }, //bmi
//             { name: 'LDL 콜레스테롤', rank: '50등', gauge: 50, level: 2 }, //cholesterol
//             { name: '혈당', rank: '60등', gauge: 40, level: 2 }, //blood_sugar
//             { name: '수축기 혈압', rank: '42등', gauge: 58, level: 2 }, // blood_pressure
//             { name: '비만', rank: '48등', gauge: 52, level: 2 }, //obesity
//             { name: '멀미', rank: '44등', gauge: 56, level: 2 }, //motion_sickness
//             { name: '골질량', rank: '38등', gauge: 62, level: 2 }, //bone_density
//             { name: '퇴행성 관절염증', rank: '36등', gauge: 64, level: 2 }, //osteoarthritis
//             { name: '요산치', rank: '34등', gauge: 66, level: 2 }, //uric_acid
//             { name: '체지방률', rank: '33등', gauge: 67, level: 2 }, //body_fat_percentage
//             { name: '복부비만', rank: '32등', gauge: 68, level: 2 }, //abdominal_obesity
//             { name: '체중감량효과', rank: '27등', gauge: 73, level: 1 }, //weight_loss
//             { name: '요요가능성', rank: '18등', gauge: 82, level: 1 }, //yoyo_effect
//         ],
//         [
//             { name: '와인선호도', rank: '20등', gauge: 80, level: 1 }, //wine_preference
//             { name: '카페인 대사', rank: '76등', gauge: 24, level: 3 }, //caffein_matebolism
//             { name: '알코올 대사', rank: '1등', gauge: 99, level: 1 }, //alcohol_metabolism
//             { name: '알코올 의존성', rank: '60등', gauge: 40, level: 2 }, //alcohol_dependency
//             { name: '알코올 홍조', rank: '42등', gauge: 58, level: 2 }, //alcohol_flushing
//             { name: '니코틴 대사', rank: '48등', gauge: 52, level: 2 }, //nicotine_metabolism
//             { name: '니코틴 의존성', rank: '54등', gauge: 46, level: 2 }, //nicotine_dependency
//             { name: '카페인 의존성', rank: '38등', gauge: 62, level: 2 }, //caffein_dependency
//             { name: '불면증', rank: '36등', gauge: 64, level: 2 }, //insomnia
//             { name: '아침형저녁형인간', rank: '34등', gauge: 66, level: 2 }, //morning_person
//             { name: '수면습관', rank: '33등', gauge: 67, level: 2 }, //sleep_duration
//             { name: '통증 민감성', rank: '32등', gauge: 68, level: 2 }, //pain_sensitivity
//             { name: '코골이', rank: '27등', gauge: 73, level: 1 }, //power_exercise
//         ],
//         [
//             { name: '식욕', rank: '20등', gauge: 80, level: 1 }, // appetite
//             { name: '포만감', rank: '76등', gauge: 24, level: 3 }, //satiety
//             { name: '단맛 민감도', rank: '1등', gauge: 99, level: 1 }, //sweetness_sensitivity
//             { name: '쓴맛 민감도', rank: '60등', gauge: 40, level: 2 }, //bitterness_sensitivity
//             { name: '짠맛 민감도', rank: '42등', gauge: 58, level: 2 }, //salt_taste_sensitivity
//         ],

//     ];

window.onload = function () {


    setUi.init();
    setEvent.init();
    msg.init();


    if (document.querySelector('.gauge-box')) {
        gauge.init();/*초기화*/
        gauge.setData(jsonData[0]);/*데이터 데입*/
        gauge.render();/*랜더*/
    }

}
const setEvent = {
    init: function () {
        const event = document.querySelectorAll('[data-event]');
        event.forEach((item) => {
            if (!item.dataset.event) return false;
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this['event_' + item.dataset.event](item.dataset);
            })
        })

        if (document.querySelector('.sort-button')) {
            document.querySelectorAll("input[name=sort]").forEach((button) => {
                button.addEventListener('click', (e) => {
                    gauge.setSort(button.value)
                    gauge.render();/*랜더*/
                })
            })

        }

        if (document.querySelector('.ajax-tab')) {
            document.querySelectorAll('.ajax-tab').forEach((tab) => {
                tab.querySelectorAll(".tab-item").forEach((button) => {
                    button.addEventListener('click', (e) => {
                        tab.querySelectorAll(".tab-item").forEach((b) => {
                            if (button === b) {
                                b.classList.add('active');
                                /*데이터 다시 랜더 입시 데이터로 처리 했습니다*/
                                gauge.setData(jsonData[b.dataset.db]);
                                gauge.render();
                            } else {
                                b.classList.remove('active');
                            }
                        })
                    })
                })
            })
        }
    }
}
















const gauge = {

    init: function () {
        this.jsonData = [];
        this.sort = 'desc';
        this.wrapper = document.querySelector('.gauge-box');
        this.wrapperList = this.wrapper.querySelector('.gauge-list');
        this.model = this.wrapperList.querySelector('.gauge-item').cloneNode(true);
        this.wrapperList.querySelector('.gauge-item').remove();
    },
    render: function () {

        if (!this.wrapper || !this.wrapperList) return false;
        this.wrapperList.innerHTML = '';
        this.dataSort(this.jsonData).forEach((item) => {
            this.setGauge(this.applyData(item), item.gauge);
        })
    }
    , setData: function (data) {
        this.jsonData = data;
    },
    setGauge: function (item, value) {
        setTimeout(() => {
            item.querySelector('.gauge-bar-value').style.width = value + '%';
        }, 100)
    },
    applyData: function (data) {
        if (!data) return false;
        const model = this.model.cloneNode(true);
        model.querySelector('.gauge-name').innerText = data.name;
        model.querySelector('.gauge-rank').innerText = data.rank;
        model.querySelector('.gauge-rank').classList.add(this.setLevel(data.level));
        return this.wrapperList.appendChild(model);
    },
    setLevel: function (level) {
        switch (level) {
            case 1:
                return 'rank1';
            case 2:
                return 'rank2';
            case 3:
                return 'rank3';
            default:
                return '';
        }
    },
    dataSort: function (jsonData) {
        const sort = this.sort;
        jsonData.sort(function compare(a, b) {
            return (sort === 'desc' ? a.gauge - b.gauge : b.gauge - a.gauge);
        });

        return jsonData;

    }
    ,
    setSort: function (sort) {
        this.sort = sort;
    }


}