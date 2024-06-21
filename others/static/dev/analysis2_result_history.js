var Main_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/merged/list'; //방문회차 카운트

var hairMain_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairMain/';

var hairLeftHairLine_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairLeftHairLine/';
var hairFrontCenter_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairFrontCenter/';
var hairFrontHairLine_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairFrontHairLine/';
var hairCenter_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairCenter/';
var hairRightHairLine_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairRightHairLine/';
var hairBack_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairBack/';

$(document).ready(function () {
    window.scrollTo(0, 470);
    console.log('analysis2_result_history page start -> ')
    $('#visitDate').text(localStorage.getItem('visit_rsvn_date'));


    fnGetVisitCount();//방문회차 카운트 함수 + 피부 점수값들 매핑

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




    // $.ajax({
    //     url: hairMain_URL + '?surveyNo=' + surveyNo,
    //     type: 'GET',
    //     contentType: 'application/json',
    //     success: function (response) {
    //         console.log('hairMain_URL 응답값 : ', response);


    //         // 1st. Scalp Type History값
    //         var ScalpType_Nor = response[0].ScalpType_Nor;
    //         var ScalpType_Oily = response[0].ScalpType_Oily;
    //         var ScalpType_Ato = response[0].ScalpType_Ato;
    //         var ScalpType_Trb = response[0].ScalpType_Trb;
    //         var ScalpType_Dry = response[0].ScalpType_Dry;
    //         var ScalpType_Sen = response[0].ScalpType_Sen;
    //         var ScalpType_Seb = response[0].ScalpType_Seb;
    //         var ScalpType_Ddan = response[0].ScalpType_Ddan;
    //         var ScalpType_Odan = response[0].ScalpType_Odan;
    //         var ScalpType_Unknown = response[0].ScalpType_Unknown;
    //         var create_dt = response[0].create_dt;

    //         // 1-1. 두피 타입 입력
    //         var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
    //         $('#scalp-type-1').append(scalpType);
    //         $('#scalp-type-2').append(scalpType);


    //         //1-2. 측정 일자 입력
    //         var scalpDate = create_dt.substring(0, 4) + '. ' + create_dt.substring(5, 7) + '. ' + create_dt.substring(8, 10);
    //         $('#scalp-type-1 .date').text(scalpDate);
    //         $('#scalp-type-2 .date').text(scalpDate);


    //         /********************** */

    //         // 2nd. Hair Conditions History값
    //         var Haircondition_Tips = response[0].Haircondition_Tips;
    //         var Haircondition_Mid = response[0].Haircondition_Mid;
    //         var Haircondition_Root = response[0].Haircondition_Root;


    //         var Haircondition_Tips_Result = getHaiconditionResult(parseInt(Haircondition_Tips));
    //         var Haircondition_Mid_Result = getHaiconditionResult(parseInt(Haircondition_Mid));
    //         var Haircondition_Root_Result = getHaiconditionResult(parseInt(Haircondition_Root));

    //         console.log('Haircondition_Root_Result : ', Haircondition_Root_Result);
    //         $('#haircondition-tips-1').append(Haircondition_Tips_Result);
    //         $('#haircondition-mid-1').append(Haircondition_Mid_Result);
    //         $('#haircondition-root-1').append(Haircondition_Root_Result);

    //         $('#haircondition-tips-2').append(Haircondition_Tips_Result);
    //         $('#haircondition-mid-2').append(Haircondition_Mid_Result);
    //         $('#haircondition-root-2').append(Haircondition_Root_Result);


    //         /********************** */

    //         // 3rd. Hair Density  History값
    //         var HairlossType_Basic = response[0].HairlossType_Basic; //기본
    //         var HairlossType_Center = response[0].HairlossType_Center; //정수리
    //         var HairlossType_FrontCenter = response[0].HairlossType_FrontCenter; //앞중앙

    //         console.log("response[0].HairlossType_FrontCenter : ", HairlossType_FrontCenter);
    //         $('#HairlossType-Basic-1').append(HairlossType_Basic);
    //         $('#HairlossType-Center-1').append(HairlossType_Center);
    //         $('#HairlossType-FrontCenter-1').append(HairlossType_FrontCenter);

    //         $('#HairlossType-Basic-2').append(HairlossType_Basic);
    //         $('#HairlossType-Center-2').append(HairlossType_Center);
    //         $('#HairlossType-FrontCenter-2').append(HairlossType_FrontCenter);






    //     }, error: function (xhr, status, error) {
    //         console.error('hairMain_URL 오류 : ', error);
    //     }

    // });




    // // 1.왼쪽 헤어라인
    // $.ajax({
    //     url: hairLeftHairLine_URL + '?surveyNo=' + surveyNo,
    //     type: 'GET',
    //     success: function (response) {
    //         console.log('hairLeftHairLine 응답 : ', response);

    //         var density_1 = response[0].Density;
    //         var thickness_1 = response[0].Thickness;

    //         console.log("density_1 : ", density_1);
    //         console.log("thickness_1 : ", thickness_1);

    //         update_hairLeftHairLine_density_Data(density_1, density_1);
    //         update_hairLeftHairLine_thickness_Data(thickness_1, thickness_1);


    //     },
    //     error: function (xhr, status, error) {

    //         console.error('hairLeftHairLine 에러 : ', error);
    //     }
    // })


    // // 2.앞 헤어라인
    // $.ajax({
    //     url: hairFrontHairLine_URL + '?surveyNo=' + surveyNo,
    //     type: 'GET',
    //     success: function (response) {
    //         console.log('hairFrontHairLine_URL 응답 : ', response);

    //         var density_1 = response[0].Density;
    //         var thickness_1 = response[0].Thickness;

    //         console.log("density_1 : ", density_1);
    //         console.log("thickness_1 : ", thickness_1);

    //         update_hairFrontHairLine_density_Data(density_1, density_1);
    //         update_hairFrontHairLine_thickness_Data(thickness_1, thickness_1);


    //     },
    //     error: function (xhr, status, error) {

    //         console.error('hairFrontHairLine_URL 에러 : ', error);
    //     }
    // })


    // // 3.오른쪽 헤어라인
    // $.ajax({
    //     url: hairRightHairLine_URL + '?surveyNo=' + surveyNo,
    //     type: 'GET',
    //     success: function (response) {
    //         console.log('hairRightHairLine_URL 응답 : ', response);

    //         var density_1 = response[0].Density;
    //         var thickness_1 = response[0].Thickness;

    //         console.log("density_1 : ", density_1);
    //         console.log("thickness_1 : ", thickness_1);

    //         update_hairRightHairLine_density_Data(density_1, density_1);
    //         update_hairRightHairLine_thickness_Data(thickness_1, thickness_1);


    //     },
    //     error: function (xhr, status, error) {

    //         console.error('hairRightHairLine_URL 에러 : ', error);
    //     }
    // })

    // // 4.앞 중앙
    // $.ajax({
    //     url: hairFrontCenter_URL + '?surveyNo=' + surveyNo,
    //     type: 'GET',
    //     success: function (response) {
    //         console.log('hairFrontCenter_URL 응답 : ', response);

    //         var density_1 = response[0].Density;
    //         var thickness_1 = response[0].Thickness;

    //         console.log("density_1 : ", density_1);
    //         console.log("thickness_1 : ", thickness_1);

    //         update_hairFrontCenter_density_Data(density_1, density_1);
    //         update_hairFrontCenter_thickness_Data(thickness_1, thickness_1);


    //     },
    //     error: function (xhr, status, error) {

    //         console.error('hairFrontCenter_URL 에러 : ', error);
    //     }
    // })




    // // 5. 정수리
    // $.ajax({
    //     url: hairCenter_URL + '?surveyNo=' + surveyNo,
    //     type: 'GET',
    //     success: function (response) {
    //         console.log('hairCenter_URL 응답 : ', response);

    //         var density_1 = response[0].Density;
    //         var thickness_1 = response[0].Thickness;

    //         console.log("density_1 : ", density_1);
    //         console.log("thickness_1 : ", thickness_1);

    //         update_hairCenter_density_Data(density_1, density_1);
    //         update_hairCenter_thickness_Data(thickness_1, thickness_1);


    //     },
    //     error: function (xhr, status, error) {

    //         console.error('hairCenter_URL 에러 : ', error);
    //     }
    // })



    // // 6. 후두부
    // $.ajax({
    //     url: hairBack_URL + '?surveyNo=' + surveyNo,
    //     type: 'GET',
    //     success: function (response) {
    //         console.log('hairBack_URL 응답 : ', response);

    //         var density_1 = response[0].Density;
    //         var thickness_1 = response[0].Thickness;

    //         console.log("density_1 : ", density_1);
    //         console.log("thickness_1 : ", thickness_1);

    //         update_hairBack_density_Data(density_1, density_1);
    //         update_hairBack_thickness_Data(thickness_1, thickness_1);


    //     },
    //     error: function (xhr, status, error) {

    //         console.error('hairBack_URL 에러 : ', error);
    //     }
    // })







});





/*
*
*24. 06. 17 방문회차 카운트 함수
*
*/


let scalpType_resultArray = []; //두피 타입
let scalpDate_resultArray = []; // 측정일자

let hairMain_resultArray = []; // 모끝, 모중앙, 모근

let hairLeftHairLine_resultArray = []; // 부위별 밀도, 굵기
let hairFrontCenter_resultArray = [];
let hairFrontHairLine_resultArray = [];
let hairCenter_resultArray = [];
let hairRightHairLine_resultArray = [];
let hairBack_resultArray = [];


var fnGetVisitCount = function () {
    var visit_count = 0; //프로그램별 방문회차 카운트
    $.ajax({
        url: Main_API_URL + '?name=' + localStorage.getItem('custom_name') + '&phone=' + localStorage.getItem('custom_phone') + '&pageSize=30',

        type: 'GET',
        success: function (response) {
            console.log('=====================');
            console.log('리스트 별 고객검색 결과 성공 : ', response);


            //프로그램별 방문회차 카운트 입력2 (같은날짜, 시간대 고려)
            var select_visit1_1 = 0 //다른날짜 - 마이스킨솔루션
            var select_visit1_2 = 0 //다른날짜 - 두피측정프로그램

            select_visit1_1 = response.filter(item => item.ProgramCode === "PC001013"
                && localStorage.getItem('raw_rsvn_date') > item.rsvn_date).length;

            select_visit1_2 = response.filter(item => item.ProgramCode === "PC001010"
                && localStorage.getItem('raw_rsvn_date') > item.rsvn_date).length;


            // console.log("select_visit1_1 : ", select_visit1_1);
            // console.log("select_visit1_2 : ", select_visit1_2);

            var select_visit2_1 = 0 //같은날짜 - 마이스킨솔루션
            var select_visit2_2 = 0 //같은날짜 - 두피측정프로그램

            select_visit2_1 = response.filter(item => item.ProgramCode === "PC001013"
                && localStorage.getItem('raw_rsvn_date') === item.rsvn_date
                && localStorage.getItem('raw_rsvn_time') >= item.rsvn_time).length;

            select_visit2_2 = response.filter(item => item.ProgramCode === "PC001010"
                && localStorage.getItem('raw_rsvn_date') === item.rsvn_date
                && localStorage.getItem('raw_rsvn_time') >= item.rsvn_time).length;

            // console.log("select_visit2_1 : ", select_visit2_1);
            // console.log("select_visit2_2 : ", select_visit2_2);

            visitCount = select_visit1_1 + select_visit1_2 + select_visit2_1 + select_visit2_2;
            console.log("방문 회차 : visitCount > ", visitCount);

            $('#visitCount').text(visitCount);



            //===========================

            //프로그램별 방문회차 카운트 입력2 (같은날짜, 시간대 고려)
            var select_visit1_1_data = 0 //다른날짜 - 마이스킨솔루션
            var select_visit1_2_data = 0 //다른날짜 - 두피측정프로그램

            select_visit1_1_data = response.filter(item => item.ProgramCode === "PC001013"
                && localStorage.getItem('raw_rsvn_date') > item.rsvn_date);

            select_visit1_2_data = response.filter(item => item.ProgramCode === "PC001010"
                && localStorage.getItem('raw_rsvn_date') > item.rsvn_date);


            console.log("select_visit1_1_data : ", select_visit1_1_data);
            console.log("select_visit1_2_data : ", select_visit1_2_data);

            var select_visit2_1_data = 0 //같은날짜 - 마이스킨솔루션
            var select_visit2_2_data = 0 //같은날짜 - 두피측정프로그램

            select_visit2_1_data = response.filter(item => item.ProgramCode === "PC001013"
                && localStorage.getItem('raw_rsvn_date') === item.rsvn_date
                && localStorage.getItem('raw_rsvn_time') >= item.rsvn_time);

            select_visit2_2_data = response.filter(item => item.ProgramCode === "PC001010"
                && localStorage.getItem('raw_rsvn_date') === item.rsvn_date
                && localStorage.getItem('raw_rsvn_time') >= item.rsvn_time);

            console.log("select_visit2_1_data : ", select_visit2_1_data);
            console.log("select_visit2_2_data : ", select_visit2_2_data);



            //프로그램별 히스토리 조회 - 2.각각의 조회된 배열 합치기     
            const combinedData1 = [...select_visit1_1_data, ...select_visit1_2_data];
            const combinedData2 = [...select_visit2_1_data, ...select_visit2_2_data];
            const finalCombinedData_merge = [...combinedData1, ...combinedData2];
            console.log("최종 합쳐진 데이터: ", finalCombinedData_merge);
            
        
            let finalCombinedData = finalCombinedData_merge.filter(item => item.m_surveyNo !== null );
            console.log("최종 합쳐진 데이터(null 제외): ", finalCombinedData);



            //프로그램별 히스토리 조회 - 3.rsvn_date 값을 기준으로 정렬 (내림차순 정렬 - 최신 날짜순) 
            finalCombinedData.sort((a, b) => new Date(b.rsvn_date).getTime() - new Date(a.rsvn_date).getTime());
            // rsvn_date 값이 같은 경우 rsvn_time으로 한 번 더 정렬 (내림차순 정렬 - 최신 시간순) 
            finalCombinedData.sort((a, b) => {
                if (a.rsvn_date === b.rsvn_date) {
                    return b.rsvn_time.localeCompare(a.rsvn_time);
                }
                return 0;
            });
            // 정렬된 데이터 출력
            console.log("정렬된 데이터: ", finalCombinedData);


            // 프로그램별 히스토리 조회 - 4. userkey와 surveyNo 값을 추출하여 새로운 배열로 저장
            const extractedValues = finalCombinedData.map(item => {
                return {
                    userkey: item.m_userkey,
                    surveyNo: item.m_surveyNo
                };
            });
            // 추출된 값 출력
            console.log("추출 값 (userkey, surveyNo) : ", extractedValues);

            // 첫 번째부터 네 번째까지 값을 추출하여 새로운 배열로 저장
            const selectedValues = extractedValues.slice(0, 4);

            // 추출된 값 출력
            console.log("첫 번째부터 네 번째까지 값: ", selectedValues);

            console.log('selectedValues 의 길이 : ', selectedValues.length);
            console.log("1111: ", selectedValues[0].surveyNo);






            // // 1.왼쪽 헤어라인
            // $.ajax({
            //     url: hairLeftHairLine_URL + '?surveyNo=' + surveyNo,
            //     type: 'GET',
            //     success: function (response) {
            //         console.log('hairLeftHairLine 응답 : ', response);

            //         var density_1 = response[0].Density;
            //         var thickness_1 = response[0].Thickness;

            //         console.log("density_1 : ", density_1);
            //         console.log("thickness_1 : ", thickness_1);

            //         update_hairLeftHairLine_density_Data(density_1, density_1);
            //         update_hairLeftHairLine_thickness_Data(thickness_1, thickness_1);


            //     },
            //     error: function (xhr, status, error) {

            //         console.error('hairLeftHairLine 에러 : ', error);
            //     }
            // })


            hairMain_Results(); 

           




            async function hairMain_Results() {
                for (let i = 0; i < selectedValues.length; i++) {
                    try {
                        const response = await $.ajax({
                            url: hairMain_URL + '?surveyNo=' + selectedValues[i].surveyNo,
                            type: 'GET',
                            contentType: 'application/json'
                        });
                        const resultValue = response[0];

                        if (resultValue === undefined){
                            alert('두피 측정 결과가 없습니다.')
                            return false
                        }


                        hairMain_resultArray.push(resultValue)                        
                        // console.log('헤어 메인 response값 ', resultValue);

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
                        scalpType_resultArray.push(scalpType)


                        //1-2. 측정 일자 입력
                        var scalpDate = create_dt.substring(0, 4) + '. ' + create_dt.substring(5, 7) + '. ' + create_dt.substring(8, 10);
                        scalpDate_resultArray.push(scalpDate)



                        if (selectedValues.length === 1) {
                            console.log('1개 히스토리[메인]')
        
                              
                            $('#scalp-type-1').append(scalpType_resultArray[0]);
                            $('#scalp-type-1').addClass('active');
        
                            $('#scalp-type-1 .date').text(scalpDate_resultArray[0]);
        
        
        
                            // 2nd. Hair Conditions History값         
                            var Haircondition_Tips_0 = getHaiconditionResult(parseInt(hairMain_resultArray[0].Haircondition_Tips));
                            var Haircondition_Mid_0 = getHaiconditionResult(parseInt(hairMain_resultArray[0].Haircondition_Mid));
                            var Haircondition_Root_0 = getHaiconditionResult(parseInt(hairMain_resultArray[0].Haircondition_Root));
        
        
                            $('#haircondition-tips-1').append(Haircondition_Tips_0);
                            $('#haircondition-mid-1').append(Haircondition_Mid_0);
                            $('#haircondition-root-1').append(Haircondition_Root_0);
        
                            $('#haircondition-tips-1').addClass('active');
                            $('#haircondition-mid-1').addClass('active');
                            $('#haircondition-root-1').addClass('active');
        
                            /********************** */
        
                            // 3rd. Hair Density  History값    
                            $('#HairlossType-Basic-1').append(hairMain_resultArray[0].HairlossType_Basic);
                            $('#HairlossType-Center-1').append(hairMain_resultArray[0].HairlossType_Center);
                            $('#HairlossType-FrontCenter-1').append(hairMain_resultArray[0].HairlossType_FrontCenter);
        
                            $('#HairlossType-Basic-1').addClass('active');
                            $('#HairlossType-Center-1').addClass('active');
                            $('#HairlossType-FrontCenter-1').addClass('active');
                        }
                        else if (selectedValues.length === 2) {
                            console.log('2개 히스토리[메인]')
                     
        
                            $('#scalp-type-1').append(scalpType_resultArray[1]);
                            $('#scalp-type-2').append(scalpType_resultArray[0]);
                            $('#scalp-type-2').addClass('active');
        
                            $('#scalp-type-1 .date').text(scalpDate_resultArray[1]);
                            $('#scalp-type-2 .date').text(scalpDate_resultArray[0]);
        
        
        
                            // 2nd. Hair Conditions History값
                            var Haircondition_Tips_1 = getHaiconditionResult(parseInt(hairMain_resultArray[1].Haircondition_Tips));
                            var Haircondition_Mid_1 = getHaiconditionResult(parseInt(hairMain_resultArray[1].Haircondition_Mid));
                            var Haircondition_Root_1 = getHaiconditionResult(parseInt(hairMain_resultArray[1].Haircondition_Root));
        
                            var Haircondition_Tips_0 = getHaiconditionResult(parseInt(hairMain_resultArray[0].Haircondition_Tips));
                            var Haircondition_Mid_0 = getHaiconditionResult(parseInt(hairMain_resultArray[0].Haircondition_Mid));
                            var Haircondition_Root_0 = getHaiconditionResult(parseInt(hairMain_resultArray[0].Haircondition_Root));
        
        
                            $('#haircondition-tips-1').append(Haircondition_Tips_1);
                            $('#haircondition-mid-1').append(Haircondition_Mid_1);
                            $('#haircondition-root-1').append(Haircondition_Root_1);
        
                            $('#haircondition-tips-2').append(Haircondition_Tips_0);
                            $('#haircondition-mid-2').append(Haircondition_Mid_0);
                            $('#haircondition-root-2').append(Haircondition_Root_0);
        
                            $('#haircondition-tips-2').addClass('active');
                            $('#haircondition-mid-2').addClass('active');
                            $('#haircondition-root-2').addClass('active');
        
                            /********************** */
        
                            // 3rd. Hair Density  History값     
                            $('#HairlossType-Basic-1').append(hairMain_resultArray[1].HairlossType_Basic);
                            $('#HairlossType-Center-1').append(hairMain_resultArray[1].HairlossType_Center);
                            $('#HairlossType-FrontCenter-1').append(hairMain_resultArray[1].HairlossType_FrontCenter);
        
                            $('#HairlossType-Basic-2').append(hairMain_resultArray[0].HairlossType_Basic);
                            $('#HairlossType-Center-2').append(hairMain_resultArray[0].HairlossType_Center);
                            $('#HairlossType-FrontCenter-2').append(hairMain_resultArray[0].HairlossType_FrontCenter);
        
                            $('#HairlossType-Basic-2').addClass('active');
                            $('#HairlossType-Center-2').addClass('active');
                            $('#HairlossType-FrontCenter-2').addClass('active');
        
        
        
                        }
                        else if (selectedValues.length === 3) {
                            console.log('3개 히스토리[메인]')                                  
                            $('#scalp-type-1').append(scalpType_resultArray[2]);
                            $('#scalp-type-2').append(scalpType_resultArray[1]);
                            $('#scalp-type-3').append(scalpType_resultArray[0]);
                            $('#scalp-type-3').addClass('active');
        
                            $('#scalp-type-1 .date').text(scalpDate_resultArray[2]);
                            $('#scalp-type-2 .date').text(scalpDate_resultArray[1]);
                            $('#scalp-type-3 .date').text(scalpDate_resultArray[0]);
        
        
        
                            // 2nd. Hair Conditions History값
                            var Haircondition_Tips_2 = getHaiconditionResult(parseInt(hairMain_resultArray[2].Haircondition_Tips));
                            var Haircondition_Mid_2 = getHaiconditionResult(parseInt(hairMain_resultArray[2].Haircondition_Mid));
                            var Haircondition_Root_2 = getHaiconditionResult(parseInt(hairMain_resultArray[2].Haircondition_Root));
        
                            var Haircondition_Tips_1 = getHaiconditionResult(parseInt(hairMain_resultArray[1].Haircondition_Tips));
                            var Haircondition_Mid_1 = getHaiconditionResult(parseInt(hairMain_resultArray[1].Haircondition_Mid));
                            var Haircondition_Root_1 = getHaiconditionResult(parseInt(hairMain_resultArray[1].Haircondition_Root));
        
                            var Haircondition_Tips_0 = getHaiconditionResult(parseInt(hairMain_resultArray[0].Haircondition_Tips));
                            var Haircondition_Mid_0 = getHaiconditionResult(parseInt(hairMain_resultArray[0].Haircondition_Mid));
                            var Haircondition_Root_0 = getHaiconditionResult(parseInt(hairMain_resultArray[0].Haircondition_Root));
        
        
                            $('#haircondition-tips-1').append(Haircondition_Tips_2);
                            $('#haircondition-mid-1').append(Haircondition_Mid_2);
                            $('#haircondition-root-1').append(Haircondition_Root_2);
        
                            $('#haircondition-tips-2').append(Haircondition_Tips_1);
                            $('#haircondition-mid-2').append(Haircondition_Mid_1);
                            $('#haircondition-root-2').append(Haircondition_Root_1);
        
                            $('#haircondition-tips-3').append(Haircondition_Tips_0);
                            $('#haircondition-mid-3').append(Haircondition_Mid_0);
                            $('#haircondition-root-3').append(Haircondition_Root_0);
        
                            $('#haircondition-tips-3').addClass('active');
                            $('#haircondition-mid-3').addClass('active');
                            $('#haircondition-root-3').addClass('active');
        
                            /********************** */
        
                            // 3rd. Hair Density  History값     
                            $('#HairlossType-Basic-1').append(hairMain_resultArray[2].HairlossType_Basic);
                            $('#HairlossType-Center-1').append(hairMain_resultArray[2].HairlossType_Center);
                            $('#HairlossType-FrontCenter-1').append(hairMain_resultArray[2].HairlossType_FrontCenter);
        
                            $('#HairlossType-Basic-2').append(hairMain_resultArray[1].HairlossType_Basic);
                            $('#HairlossType-Center-2').append(hairMain_resultArray[1].HairlossType_Center);
                            $('#HairlossType-FrontCenter-2').append(hairMain_resultArray[1].HairlossType_FrontCenter);
        
                            $('#HairlossType-Basic-3').append(hairMain_resultArray[0].HairlossType_Basic);
                            $('#HairlossType-Center-3').append(hairMain_resultArray[0].HairlossType_Center);
                            $('#HairlossType-FrontCenter-3').append(hairMain_resultArray[0].HairlossType_FrontCenter);
        
                            $('#HairlossType-Basic-3').addClass('active');
                            $('#HairlossType-Center-3').addClass('active');
                            $('#HairlossType-FrontCenter-3').addClass('active');
        
        
        
                        }
        
                        else if (selectedValues.length === 4) {
                            console.log('4개 히스토리[메인]')                          
                            $('#scalp-type-1').append(scalpType_resultArray[3]);
                            $('#scalp-type-2').append(scalpType_resultArray[2]);
                            $('#scalp-type-3').append(scalpType_resultArray[1]);
                            $('#scalp-type-4').append(scalpType_resultArray[0]);
                            $('#scalp-type-4').addClass('active');
        
                            $('#scalp-type-1 .date').text(scalpDate_resultArray[3]);
                            $('#scalp-type-2 .date').text(scalpDate_resultArray[2]);
                            $('#scalp-type-3 .date').text(scalpDate_resultArray[1]);
                            $('#scalp-type-4 .date').text(scalpDate_resultArray[0]);
        
        
        
                            // 2nd. Hair Conditions History값
                            var Haircondition_Tips_3 = getHaiconditionResult(parseInt(hairMain_resultArray[3].Haircondition_Tips));
                            var Haircondition_Mid_3 = getHaiconditionResult(parseInt(hairMain_resultArray[3].Haircondition_Mid));
                            var Haircondition_Root_3 = getHaiconditionResult(parseInt(hairMain_resultArray[3].Haircondition_Root));
        
                            var Haircondition_Tips_2 = getHaiconditionResult(parseInt(hairMain_resultArray[2].Haircondition_Tips));
                            var Haircondition_Mid_2 = getHaiconditionResult(parseInt(hairMain_resultArray[2].Haircondition_Mid));
                            var Haircondition_Root_2 = getHaiconditionResult(parseInt(hairMain_resultArray[2].Haircondition_Root));
        
                            var Haircondition_Tips_1 = getHaiconditionResult(parseInt(hairMain_resultArray[1].Haircondition_Tips));
                            var Haircondition_Mid_1 = getHaiconditionResult(parseInt(hairMain_resultArray[1].Haircondition_Mid));
                            var Haircondition_Root_1 = getHaiconditionResult(parseInt(hairMain_resultArray[1].Haircondition_Root));
        
                            var Haircondition_Tips_0 = getHaiconditionResult(parseInt(hairMain_resultArray[0].Haircondition_Tips));
                            var Haircondition_Mid_0 = getHaiconditionResult(parseInt(hairMain_resultArray[0].Haircondition_Mid));
                            var Haircondition_Root_0 = getHaiconditionResult(parseInt(hairMain_resultArray[0].Haircondition_Root));
        
                            $('#haircondition-tips-1').append(Haircondition_Tips_3);
                            $('#haircondition-mid-1').append(Haircondition_Mid_3);
                            $('#haircondition-root-1').append(Haircondition_Root_3);
        
                            $('#haircondition-tips-2').append(Haircondition_Tips_2);
                            $('#haircondition-mid-2').append(Haircondition_Mid_2);
                            $('#haircondition-root-2').append(Haircondition_Root_2);
        
                            $('#haircondition-tips-3').append(Haircondition_Tips_1);
                            $('#haircondition-mid-3').append(Haircondition_Mid_1);
                            $('#haircondition-root-3').append(Haircondition_Root_1);
        
                            $('#haircondition-tips-4').append(Haircondition_Tips_0);
                            $('#haircondition-mid-4').append(Haircondition_Mid_0);
                            $('#haircondition-root-4').append(Haircondition_Root_0);
        
                            $('#haircondition-tips-4').addClass('active');
                            $('#haircondition-mid-4').addClass('active');
                            $('#haircondition-root-4').addClass('active');
        
                            /********************** */
        
                            // 3rd. Hair Density  History값     
                            $('#HairlossType-Basic-1').append(hairMain_resultArray[3].HairlossType_Basic);
                            $('#HairlossType-Center-1').append(hairMain_resultArray[3].HairlossType_Center);
                            $('#HairlossType-FrontCenter-1').append(hairMain_resultArray[3].HairlossType_FrontCenter);
        
                            $('#HairlossType-Basic-2').append(hairMain_resultArray[2].HairlossType_Basic);
                            $('#HairlossType-Center-2').append(hairMain_resultArray[2].HairlossType_Center);
                            $('#HairlossType-FrontCenter-2').append(hairMain_resultArray[2].HairlossType_FrontCenter);
        
                            $('#HairlossType-Basic-3').append(hairMain_resultArray[1].HairlossType_Basic);
                            $('#HairlossType-Center-3').append(hairMain_resultArray[1].HairlossType_Center);
                            $('#HairlossType-FrontCenter-3').append(hairMain_resultArray[1].HairlossType_FrontCenter);
        
                            $('#HairlossType-Basic-4').append(hairMain_resultArray[0].HairlossType_Basic);
                            $('#HairlossType-Center-4').append(hairMain_resultArray[0].HairlossType_Center);
                            $('#HairlossType-FrontCenter-4').append(hairMain_resultArray[0].HairlossType_FrontCenter);
        
                            $('#HairlossType-Basic-4').addClass('active');
                            $('#HairlossType-Center-4').addClass('active');
                            $('#HairlossType-FrontCenter-4').addClass('active');
        
        
        
                        }


                    } catch (error) {
                        console.error('hairLeftHairLine_Results 오류 : ', error);
                    }
                }
                console.log("hairMain_resultArray 저장된 결과 : ", hairMain_resultArray);
                console.log("scalpType_resultArray 저장된 결과 : ", scalpType_resultArray);
                console.log("scalpDate_resultArray 저장된 결과 : ", scalpDate_resultArray);

                 
            hairLeftHairLine_Results();
            hairFrontCenter_Results();
            hairFrontHairLine_Results();
            hairCenter_Results();
            hairRightHairLine_Results();
            hairBack_Results();
                
            }




            async function hairLeftHairLine_Results() {
                for (let i = 0; i < selectedValues.length; i++) {
                    try {
                        const response = await $.ajax({
                            url: hairLeftHairLine_URL + '?surveyNo=' + selectedValues[i].surveyNo,
                            type: 'GET',
                            contentType: 'application/json'
                        });
                        const resultValue = response[0];
                        hairLeftHairLine_resultArray.push(resultValue); // 결과 배열에 추가

                        if (selectedValues.length === 1) {
                            console.log('1개 히스토리[hairLeft]')
        
                            update_hairLeftHairLine_density_Data(hairLeftHairLine_resultArray[0].Density);
                            update_hairLeftHairLine_thickness_Data(hairLeftHairLine_resultArray[0].Thickness);                               
                        }
                        else if (selectedValues.length === 2) {
                            console.log('2개 히스토리[hairLeft]')
                            update_hairLeftHairLine_density_Data(hairLeftHairLine_resultArray[1].Density, hairLeftHairLine_resultArray[0].Density);
                            update_hairLeftHairLine_thickness_Data(hairLeftHairLine_resultArray[1].Thickness, hairLeftHairLine_resultArray[0].Thickness);        
                        }
                        else if (selectedValues.length === 3) {
                            console.log('3개 히스토리[hairLeft]')
                            update_hairLeftHairLine_density_Data(hairLeftHairLine_resultArray[2].Density,hairLeftHairLine_resultArray[1].Density, hairLeftHairLine_resultArray[0].Density);
                            update_hairLeftHairLine_thickness_Data(hairLeftHairLine_resultArray[2].Thickness, hairLeftHairLine_resultArray[1].Thickness, hairLeftHairLine_resultArray[0].Thickness);
                        }
        
                        else if (selectedValues.length === 4) {
                            console.log('4개 히스토리[hairLeft]')
                            update_hairLeftHairLine_density_Data(hairLeftHairLine_resultArray[3].Density, hairLeftHairLine_resultArray[2].Density, hairLeftHairLine_resultArray[1].Density, hairLeftHairLine_resultArray[0].Density);
                            update_hairLeftHairLine_thickness_Data(hairLeftHairLine_resultArray[3].Thickness, hairLeftHairLine_resultArray[2].Thickness, hairLeftHairLine_resultArray[1].Thickness, hairLeftHairLine_resultArray[0].Thickness);
                        }

                    } catch (error) {
                        console.error('hairLeftHairLine_Results 오류 : ', error);
                    }
                }
                console.log("hairLeftHairLine_resultArray 저장된 결과 : ", hairLeftHairLine_resultArray);
            }


            async function hairFrontCenter_Results() {
                for (let i = 0; i < selectedValues.length; i++) {
                    try {
                        const response = await $.ajax({
                            url: hairFrontCenter_URL + '?surveyNo=' + selectedValues[i].surveyNo,
                            type: 'GET',
                            contentType: 'application/json'
                        });
                        const resultValue = response[0];
                        hairFrontCenter_resultArray.push(resultValue); // 결과 배열에 추가

                        if (selectedValues.length === 1) {
                            console.log('1개 히스토리[hairFrontCenter]')              
        
                            update_hairFrontCenter_density_Data(hairFrontCenter_resultArray[0].Density);
                            update_hairFrontCenter_thickness_Data(hairFrontCenter_resultArray[0].Thickness);
                        }
                        else if (selectedValues.length === 2) {
                            console.log('2개 히스토리[hairFrontCenter]')                
                            update_hairFrontCenter_density_Data(hairFrontCenter_resultArray[1].Density, hairFrontCenter_resultArray[0].Density);
                            update_hairFrontCenter_thickness_Data(hairFrontCenter_resultArray[1].Thickness, hairFrontCenter_resultArray[0].Thickness);
                        }
                        else if (selectedValues.length === 3) {
                            console.log('3개 히스토리[hairFrontCenter[')
                            update_hairFrontCenter_density_Data(hairFrontCenter_resultArray[2].Density,hairFrontCenter_resultArray[1].Density, hairFrontCenter_resultArray[0].Density);
                            update_hairFrontCenter_thickness_Data(hairFrontCenter_resultArray[2].Thickness, hairFrontCenter_resultArray[1].Thickness, hairFrontCenter_resultArray[0].Thickness);
        
                        }
        
                        else if (selectedValues.length === 4) {
                            console.log('4개 히스토리[hairFrontCenter]')                         
                            update_hairFrontCenter_density_Data(hairFrontCenter_resultArray[3].Density, hairFrontCenter_resultArray[2].Density, hairFrontCenter_resultArray[1].Density, hairFrontCenter_resultArray[0].Density);
                            update_hairFrontCenter_thickness_Data(hairFrontCenter_resultArray[3].Thickness, hairFrontCenter_resultArray[2].Thickness, hairFrontCenter_resultArray[1].Thickness, hairFrontCenter_resultArray[0].Thickness);
                                 
                        }

                    } catch (error) {
                        console.error('hairFrontCenter_Results 오류 : ', error);
                    }
                }
                console.log("hairFrontCenter_Results 저장된 결과 : ", hairFrontCenter_resultArray);
            }

            async function hairFrontHairLine_Results() {
                for (let i = 0; i < selectedValues.length; i++) {
                    try {
                        const response = await $.ajax({
                            url: hairFrontHairLine_URL + '?surveyNo=' + selectedValues[i].surveyNo,
                            type: 'GET',
                            contentType: 'application/json'
                        });
                        const resultValue = response[0];
                        hairFrontHairLine_resultArray.push(resultValue); // 결과 배열에 추가

                        if (selectedValues.length === 1) {
                            console.log('1개 히스토리[hairFrontHairLine]')       
        
                            update_hairFrontHairLine_density_Data(hairFrontHairLine_resultArray[0].Density);
                            update_hairFrontHairLine_thickness_Data(hairFrontHairLine_resultArray[0].Thickness);        
                        }
                        else if (selectedValues.length === 2) {
                            console.log('2개 히스토리[hairFrontHairLine]')                 
                            update_hairFrontHairLine_density_Data(hairFrontHairLine_resultArray[1].Density, hairFrontHairLine_resultArray[0].Density);
                            update_hairFrontHairLine_thickness_Data(hairFrontHairLine_resultArray[1].Thickness, hairFrontHairLine_resultArray[0].Thickness);
                
                        }
                        else if (selectedValues.length === 3) {
                            console.log('3개 히스토리[hairFrontHairLine]')                    
                            update_hairFrontHairLine_density_Data(hairFrontHairLine_resultArray[2].Density,hairFrontHairLine_resultArray[1].Density, hairFrontHairLine_resultArray[0].Density);
                            update_hairFrontHairLine_thickness_Data(hairFrontHairLine_resultArray[2].Thickness, hairFrontHairLine_resultArray[1].Thickness, hairFrontHairLine_resultArray[0].Thickness);
        
                        }
        
                        else if (selectedValues.length === 4 && hairBack_resultArray.length) {
                            console.log('4개 히스토리[hairFrontHairLine]')                         
                            update_hairFrontHairLine_density_Data(hairFrontHairLine_resultArray[3].Density, hairFrontHairLine_resultArray[2].Density, hairFrontHairLine_resultArray[1].Density, hairFrontHairLine_resultArray[0].Density);
                            update_hairFrontHairLine_thickness_Data(hairFrontHairLine_resultArray[3].Thickness, hairFrontHairLine_resultArray[2].Thickness, hairFrontHairLine_resultArray[1].Thickness, hairFrontHairLine_resultArray[0].Thickness);
     
                        }

                    } catch (error) {
                        console.error('hairFrontHairLiner_Results 오류 : ', error);
                    }
                }
                console.log("hairFrontHairLine_Results 저장된 결과 : ", hairFrontHairLine_resultArray);
            }

            async function hairCenter_Results() {
                for (let i = 0; i < selectedValues.length; i++) {
                    try {
                        const response = await $.ajax({
                            url: hairCenter_URL + '?surveyNo=' + selectedValues[i].surveyNo,
                            type: 'GET',
                            contentType: 'application/json'
                        });
                        const resultValue = response[0];
                        hairCenter_resultArray.push(resultValue); // 결과 배열에 추가

                        if (selectedValues.length === 1) {
                            console.log('1개 히스토리[hairCenter]')        
                            update_hairCenter_density_Data(hairCenter_resultArray[0].Density);
                            update_hairCenter_thickness_Data(hairCenter_resultArray[0].Thickness);        
                  
                        }
                        else if (selectedValues.length === 2 && hairBack_resultArray.length) {
                            console.log('2개 히스토리[hairCenter]')                   
                            update_hairCenter_density_Data(hairCenter_resultArray[1].Density, hairCenter_resultArray[0].Density);
                            update_hairCenter_thickness_Data(hairCenter_resultArray[1].Thickness, hairCenter_resultArray[0].Thickness);        
                        }
                        else if (selectedValues.length === 3 && hairBack_resultArray.length) {
                            console.log('3개 히스토리[hairCenter]')                     
                            update_hairCenter_density_Data(hairCenter_resultArray[2].Density, hairCenter_resultArray[1].Density, hairCenter_resultArray[0].Density);
                            update_hairCenter_thickness_Data(hairCenter_resultArray[2].Thickness, hairCenter_resultArray[1].Thickness, hairCenter_resultArray[0].Thickness);
        
                        }
        
                        else if (selectedValues.length === 4 && hairBack_resultArray.length) {
                            console.log('4개 히스토리[hairCenter]')                         
                            update_hairCenter_density_Data(hairCenter_resultArray[3].Density, hairCenter_resultArray[2].Density, hairCenter_resultArray[1].Density, hairCenter_resultArray[0].Density);
                            update_hairCenter_thickness_Data(hairCenter_resultArray[3].Thickness, hairCenter_resultArray[2].Thickness, hairCenter_resultArray[1].Thickness, hairCenter_resultArray[0].Thickness);
        
                        }

                    } catch (error) {
                        console.error('hairCenter_Results 오류 : ', error);
                    }
                }
                console.log("hairCenter_Results 저장된 결과 : ", hairCenter_resultArray);
            }

            async function hairRightHairLine_Results() {
                for (let i = 0; i < selectedValues.length; i++) {
                    try {
                        const response = await $.ajax({
                            url: hairRightHairLine_URL + '?surveyNo=' + selectedValues[i].surveyNo,
                            type: 'GET',
                            contentType: 'application/json'
                        });
                        const resultValue = response[0];
                        hairRightHairLine_resultArray.push(resultValue); // 결과 배열에 추가

                        if (selectedValues.length === 1) {
                            console.log('1개 히스토리[hairRightHairLine]')        
                            update_hairRightHairLine_density_Data(hairRightHairLine_resultArray[0].Density);
                            update_hairRightHairLine_thickness_Data(hairRightHairLine_resultArray[0].Thickness);        
        
                        }
                        else if (selectedValues.length === 2 && hairBack_resultArray.length) {
                            console.log('2개 히스토리[hairRightHairLine]')                        
                            update_hairRightHairLine_density_Data(hairRightHairLine_resultArray[1].Density, hairRightHairLine_resultArray[0].Density);
                            update_hairRightHairLine_thickness_Data(hairRightHairLine_resultArray[1].Thickness, hairRightHairLine_resultArray[0].Thickness);        
        
                        }
                        else if (selectedValues.length === 3 && hairBack_resultArray.length) {
                            console.log('3개 히스토리[hairRightHairLine]')                        
                            update_hairRightHairLine_density_Data(hairRightHairLine_resultArray[2].Density, hairRightHairLine_resultArray[1].Density, hairRightHairLine_resultArray[0].Density);
                            update_hairRightHairLine_thickness_Data(hairRightHairLine_resultArray[2].Thickness,hairRightHairLine_resultArray[1].Thickness, hairRightHairLine_resultArray[0].Thickness);
        
                        }
        
                        else if (selectedValues.length === 4 && hairBack_resultArray.length) {
                            console.log('4개 히스토리[hairRightHairLine]')                          
                            update_hairRightHairLine_density_Data(hairRightHairLine_resultArray[3].Density, hairRightHairLine_resultArray[2].Density, hairRightHairLine_resultArray[1].Density, hairRightHairLine_resultArray[0].Density);
                            update_hairRightHairLine_thickness_Data(hairRightHairLine_resultArray[3].Thickness, hairRightHairLine_resultArray[2].Thickness, hairRightHairLine_resultArray[1].Thickness, hairRightHairLine_resultArray[0].Thickness);
        
                        }

                    } catch (error) {
                        console.error('hairRightHairLine_Results 오류 : ', error);
                    }
                }
                console.log("hairRightHairLine_Results 저장된 결과 : ", hairRightHairLine_resultArray);
            }

            async function hairBack_Results() {
                for (let i = 0; i < selectedValues.length; i++) {
                    try {
                        const response = await $.ajax({
                            url: hairBack_URL + '?surveyNo=' + selectedValues[i].surveyNo,
                            type: 'GET',
                            contentType: 'application/json'
                        });
                        const resultValue = response[0];
                        hairBack_resultArray.push(resultValue); // 결과 배열에 추가


                        if (selectedValues.length === 1) {
                            console.log('1개 히스토리[hairBack]')
                            update_hairBack_density_Data(hairBack_resultArray[0].Density);
                            update_hairBack_thickness_Data(hairBack_resultArray[0].Thickness);
        
                        }
                        else if (selectedValues.length === 2 && hairBack_resultArray.length) {
                            console.log('2개 히스토리[hairBack]')
                            update_hairBack_density_Data(hairBack_resultArray[1].Density, hairBack_resultArray[0].Density);
                            update_hairBack_thickness_Data(hairBack_resultArray[1].Thickness, hairBack_resultArray[0].Thickness);
        
                        }
                        else if (selectedValues.length === 3 && hairBack_resultArray.length) {
                            console.log('3개 히스토리[hairBack]')
                            update_hairBack_density_Data(hairBack_resultArray[2].Density, hairBack_resultArray[1].Density, hairBack_resultArray[0].Density);
                            update_hairBack_thickness_Data(hairBack_resultArray[2].Thickness, hairBack_resultArray[1].Thickness, hairBack_resultArray[0].Thickness);        
        
                        }
        
                        else if (selectedValues.length === 4 && hairBack_resultArray.length) {
                            console.log('4개 히스토리[hairBack]')
                            update_hairBack_density_Data(hairBack_resultArray[3].Density, hairBack_resultArray[2].Density, hairBack_resultArray[1].Density, hairBack_resultArray[0].Density);
                            update_hairBack_thickness_Data(hairBack_resultArray[3].Thickness, hairBack_resultArray[2].Thickness, hairBack_resultArray[1].Thickness, hairBack_resultArray[0].Thickness);        
        
                        }

                    } catch (error) {
                        console.error('hairBack_Results 오류 : ', error);
                    }
                }
                console.log("hairBack_Results 저장된 결과 : ", hairBack_resultArray);           

            }

        },

        error: function (xhr, status, error) {
            console.error('리스트 별 고객검색 결과  에러 : ', error);
        }
    })


}





/****************** Hair Thickness & Density History ***************************/

/*
*************************************************************
*24. 05. 21 #1-1 좌 '굵기'변화  차트생성 및 업데이트
*/

var hairLeftHairLine_density_data = {
    labels: [1, 2, 3, 4],
    datasets: [{
        label: '',
        data: [0], // 데이터 포인트 값
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
        data: [0], // 데이터 포인트 값
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
        data: [0], // 데이터 포인트 값
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
        data: [0], // 데이터 포인트 값
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
        data: [0], // 데이터 포인트 값
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
        data: [0], // 데이터 포인트 값
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
        data: [0], // 데이터 포인트 값
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
        data: [0], // 데이터 포인트 값
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
        data: [0], // 데이터 포인트 값
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
        data: [0], // 데이터 포인트 값
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
        data: [0], // 데이터 포인트 값
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
        data: [0], // 데이터 포인트 값
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

