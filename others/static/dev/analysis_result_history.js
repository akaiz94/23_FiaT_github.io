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

    fnGetVisitCount();//방문회차 카운트 함수, 히스토리 데이터 매핑


    $('#manager_name').text(localStorage.getItem('manager_name'));
    $('#custom_name').text(localStorage.getItem('custom_name'));

    if (localStorage.getItem('manager_name').length === 2) {
        // $("#title_date").css("margin-right","90px");   
        document.getElementById("title_date").style.marginRight = "90px";
        document.getElementById("title_count").style.marginRight = "145px";
    }
    // // 1. 그래프 히스토리 결과 조회
    // $.ajax({
    //     url: ResultSkinConcenr_API_URL + '?surveyNo=' + surveyNo,
    //     type: 'GET',
    //     contentType: 'application/json',

    //     success: function (response) {
    //         console.log("ResultSkinConcenr_API_URL 응답값 : ", response);


    //         // 피부점수값 추출
    //         const valuesToSort = [
    //             { name: "모공", value: response[0].pore },
    //             { name: "주름", value: response[0].wrinkle },
    //             { name: "미래주름", value: response[0].futurewrinkles },
    //             { name: "색소침착", value: response[0].pigmentation },
    //             { name: "멜라닌", value: response[0].melanin },
    //             { name: "경피수분손실도", value: response[0].transdermal },
    //             { name: "붉은기", value: response[0].redness },
    //             { name: "포피린", value: response[0].porphyrin },
    //             { name: "탄력", value: response[0].elasticity }
    //         ];


    //         //피부 점수 값 매핑
    //         const averageValue = parseInt(calculateAverage(valuesToSort));
    //         console.log(`주어진 값들의 평균: ${averageValue}`);

    //         updateskinScoreData(averageValue); //skinScore 데이터 넣기 (현재는 임시값)
    //         updatePoreData(response[0].pore);
    //         updateElasticityData(response[0].elasticity);
    //         updateWrinkleData(response[0].wrinkle);
    //         updateFutureWrinklesData(response[0].futurewrinkles);
    //         updateMelaninData(response[0].melanin);
    //         updatePigmentationData(response[0].pigmentation);
    //         updateTransdermalData(response[0].transdermal);
    //         updatePorphyrinData(response[0].porphyrin);
    //         updateRednessData(response[0].redness);

    //         updateTZoneData(response[0].tZone_Moisture, response[0].tZone_Oilskin)
    //         updateUZoneData(response[0].uZone_Moisture, response[0].uZone_Oilskin)

    //     }, error: function (xhr, status, error) {
    //         console.error('ResultSkinConcenr_API_URL 오류 : ', error);
    //     }
    // }),



    //     // 2. Type History의 T존, U존 값
    //     $.ajax({
    //         url: SkinResult_API_URL + '?surveyNo=' + surveyNo,
    //         type: 'GET',
    //         contentType: 'application/json',

    //         success: function (response) {
    //             console.log("SkinResult_API_URL 응답값 : ", response);

    //             var create_dt = response[0].create_dt;
    //             var skinDate = create_dt.substring(0, 4) + '. ' + create_dt.substring(5, 7) + '. ' + create_dt.substring(8, 10);

    //             console.log("skinDate : ", skinDate);
    //             //피부타입 변화 날짜
    //             $('#t_zone_result-1 .date').text(skinDate);
    //             // $('#t_zone_result-2 .date').text(skinDate);    

    //             //T존 타입 변화
    //             $('#t_zone_result-1').append(response[0].t_zone_result);
    //             // $('#t_zone_result-2').append(response[0].t_zone_result);              

    //             //U존 타입 변화
    //             $('#u_zone_result-1').append(response[0].u_zone_result);
    //             // $('#u_zone_result-2').append(response[0].u_zone_result);



    //         }, error: function (xhr, status, error) {
    //             console.error('SkinResult_API_URL 오류 : ', error);
    //         }
    //     })


});



/*
*
*24. 06. 14 방문회차 카운트 함수
*
*/
//실제 히스토리 데이터 값 매핑
let resultArray = []; //스킨 concern 결과값
let resultArray2 = []; //T존, U존결과값

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
            var select_visit1_2 = 0 //다른날짜 - 피부측정프로그램

            select_visit1_1 = response.filter(item => item.ProgramCode === "PC001013"
                && localStorage.getItem('raw_rsvn_date') > item.rsvn_date).length;

            select_visit1_2 = response.filter(item => item.ProgramCode === "PC001014"
                && localStorage.getItem('raw_rsvn_date') > item.rsvn_date).length;


            // console.log("select_visit1_1 : ", select_visit1_1);
            // console.log("select_visit1_2 : ", select_visit1_2);

            var select_visit2_1 = 0 //같은날짜 - 마이스킨솔루션
            var select_visit2_2 = 0 //같은날짜 - 피부측정프로그램

            select_visit2_1 = response.filter(item => item.ProgramCode === "PC001013"
                && localStorage.getItem('raw_rsvn_date') === item.rsvn_date
                && localStorage.getItem('raw_rsvn_time') >= item.rsvn_time).length;

            select_visit2_2 = response.filter(item => item.ProgramCode === "PC001014"
                && localStorage.getItem('raw_rsvn_date') === item.rsvn_date
                && localStorage.getItem('raw_rsvn_time') >= item.rsvn_time).length;

            // console.log("select_visit2_1 : ", select_visit2_1);
            // console.log("select_visit2_2 : ", select_visit2_2);

            visitCount = select_visit1_1 + select_visit1_2 + select_visit2_1 + select_visit2_2;
            // console.log("방문 회차 : visitCount > ", visitCount);

            $('#visitCount').text(visitCount);



            //===========================





            //프로그램별 히스토리 조회 - 1.userkey, surveyNo 조회
            var select_visit1_1_data = 0 //다른날짜 - 마이스킨솔루션
            var select_visit1_2_data = 0 //다른날짜 - 피부측정프로그램

            select_visit1_1_data = response.filter(item => item.ProgramCode === "PC001013"
                && localStorage.getItem('raw_rsvn_date') > item.rsvn_date);

            select_visit1_2_data = response.filter(item => item.ProgramCode === "PC001014"
                && localStorage.getItem('raw_rsvn_date') > item.rsvn_date);


            console.log("select_visit1_1_data : ", select_visit1_1_data);
            console.log("select_visit1_2_data : ", select_visit1_2_data);

            var select_visit2_1_data = 0 //같은날짜 - 마이스킨솔루션
            var select_visit2_2_data = 0 //같은날짜 - 피부측정프로그램

            select_visit2_1_data = response.filter(item => item.ProgramCode === "PC001013"
                && localStorage.getItem('raw_rsvn_date') === item.rsvn_date
                && localStorage.getItem('raw_rsvn_time') >= item.rsvn_time);

            select_visit2_2_data = response.filter(item => item.ProgramCode === "PC001014"
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


            //===========================



            // for (let i = 0; i <= selectedValues.length - 1; i++) {
            //     console.log(`i의 값: ${i}`);

            //     // 1. 그래프 히스토리 결과 조회
            //     $.ajax({
            //         url: ResultSkinConcenr_API_URL + '?surveyNo=' + selectedValues[i].surveyNo,
            //         type: 'GET',
            //         contentType: 'application/json',

            //         success: function (response) {
            //             console.log("ResultSkinConcenr_API_URL 응답값 : ", response);

            //             // const resultValue = response[i]; // 각각추출하므로 i는 틀림.
            //             const resultValue = response[0];
            //             resultArray.push(resultValue);



            //             // 피부점수값 추출
            //             const valuesToSort = [
            //                 { name: "모공", value: response[0].pore },
            //                 { name: "주름", value: response[0].wrinkle },
            //                 { name: "미래주름", value: response[0].futurewrinkles },
            //                 { name: "색소침착", value: response[0].pigmentation },
            //                 { name: "멜라닌", value: response[0].melanin },
            //                 { name: "경피수분손실도", value: response[0].transdermal },
            //                 { name: "붉은기", value: response[0].redness },
            //                 { name: "포피린", value: response[0].porphyrin },
            //                 { name: "탄력", value: response[0].elasticity }
            //             ];

            //             //피부 점수 값 매핑
            //             const averageValue = parseInt(calculateAverage(valuesToSort));

            //             console.log(`주어진 값들의 평균: ${averageValue}`);
            //             averageValueArray.push(averageValue);



            //         }, error: function (xhr, status, error) {
            //             console.error('ResultSkinConcenr_API_URL 오류 : ', error);
            //         }
            //     }),




            //         // 2. Type History의 T존, U존 값
            //         $.ajax({
            //             url: SkinResult_API_URL + '?surveyNo=' + selectedValues[i].surveyNo,
            //             type: 'GET',
            //             contentType: 'application/json',

            //             success: function (response) {
            //                 console.log("SkinResult_API_URL 응답값 : ", response);

            //                 const resultValue2 = response[0];
            //                 resultArray2.push(resultValue2);


            //             }, error: function (xhr, status, error) {
            //                 console.error('SkinResult_API_URL 오류 : ', error);
            //             }
            //         })
            // }

            // // 저장된 결과 출력
            // console.log("conceern 저장된 결과(resultArray): ", resultArray);
            // console.log("U존, T존저장된 결과(resultArray2): ", resultArray2);
            // console.log("저장된 스킨 평균값(averageValueArray): ", averageValueArray);



            SkinConcernResults();


            async function SkinConcernResults() {
                for (let i = 0; i < selectedValues.length; i++) {
                    console.log(`i의 값: ${i}`);
                    try {
                        const response = await $.ajax({
                            url: ResultSkinConcenr_API_URL + '?surveyNo=' + selectedValues[i].surveyNo,
                            type: 'GET',
                            contentType: 'application/json'
                        });
                        const resultValue = response[0];

                        if (resultValue === undefined){
                            alert('피부 측정 결과가 없습니다.')
                            return false
                        }

                        resultArray.push(resultValue); // 결과 배열에 추가



                        //****가장 마지막에 동기요청이 끝나는 지점이므로, 데이터 매핑
                        if (selectedValues.length === 1) {
                            console.log('1개 히스토리[skinConcern]')
                           
                            updatePoreData(resultArray[0].pore);
                            updateElasticityData(resultArray[0].elasticity);
                            updateWrinkleData(resultArray[0].wrinkle);
                            updateFutureWrinklesData(resultArray[0].futurewrinkles);
                            updateMelaninData(resultArray[0].melanin);
                            updatePigmentationData(resultArray[0].pigmentation);
                            updateTransdermalData(resultArray[0].transdermal);
                            updatePorphyrinData(resultArray[0].porphyrin);
                            updateRednessData(resultArray[0].redness);

                            updateTZoneData(resultArray[0].tZone_Moisture, resultArray[0].tZone_Oilskin) //수분 - 유분
                            updateUZoneData(resultArray[0].uZone_Moisture, resultArray[0].uZone_Oilskin)
                        }
                        else if (selectedValues.length === 2) {
                            console.log('2개 히스토리[skinConcern]')
                          
                            updatePoreData(resultArray[1].pore, resultArray[0].pore);
                            updateElasticityData(resultArray[1].elasticity, resultArray[0].elasticity);
                            updateWrinkleData(resultArray[1].wrinkle, resultArray[0].wrinkle);
                            updateFutureWrinklesData(resultArray[1].futurewrinkles, resultArray[0].futurewrinkles);
                            updateMelaninData(resultArray[1].melanin, resultArray[0].melanin);
                            updatePigmentationData(resultArray[1].pigmentation, resultArray[0].pigmentation);
                            updateTransdermalData(resultArray[1].transdermal, resultArray[0].transdermal);
                            updatePorphyrinData(resultArray[1].porphyrin, resultArray[0].porphyrin);
                            updateRednessData(resultArray[1].redness, resultArray[0].redness);

                            updateTZoneData(resultArray[1].tZone_Moisture, resultArray[1].tZone_Oilskin, resultArray[0].tZone_Moisture, resultArray[0].tZone_Oilskin)
                            updateUZoneData(resultArray[1].uZone_Moisture, resultArray[1].uZone_Oilskin, resultArray[0].uZone_Moisture, resultArray[0].uZone_Oilskin)
                        }
                        else if (selectedValues.length === 3) {
                            console.log('3개 히스토리[skinConcern]')
                          
                            updatePoreData(resultArray[2].pore, resultArray[1].pore, resultArray[0].pore);
                            updateElasticityData(resultArray[2].elasticity, resultArray[1].elasticity, resultArray[0].elasticity);
                            updateWrinkleData(resultArray[2].wrinkle, resultArray[1].wrinkle, resultArray[0].wrinkle);
                            updateFutureWrinklesData(resultArray[2].futurewrinkles, resultArray[1].futurewrinkles, resultArray[0].futurewrinkles);
                            updateMelaninData(resultArray[2].melanin, resultArray[1].melanin, resultArray[0].melanin);
                            updatePigmentationData(resultArray[2].pigmentation, resultArray[1].pigmentation, resultArray[0].pigmentation);
                            updateTransdermalData(resultArray[2].transdermal, resultArray[1].transdermal, resultArray[0].transdermal);
                            updatePorphyrinData(resultArray[2].porphyrin, resultArray[1].porphyrin, resultArray[0].porphyrin);
                            updateRednessData(resultArray[2].redness, resultArray[1].redness, resultArray[0].redness);

                            updateTZoneData(resultArray[2].tZone_Moisture, resultArray[2].tZone_Oilskin, resultArray[1].tZone_Moisture, resultArray[1].tZone_Oilskin, resultArray[0].tZone_Moisture, resultArray[0].tZone_Oilskin)
                            updateUZoneData(resultArray[2].uZone_Moisture, resultArray[2].uZone_Oilskin, resultArray[1].uZone_Moisture, resultArray[1].uZone_Oilskin, resultArray[0].uZone_Moisture, resultArray[0].uZone_Oilskin)

                        }
                        else if (selectedValues.length === 4) {
                            console.log('4개 히스토리[skinConcern]')
                            
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
                        console.error('SkinConcernResults 오류 : ', error);
                    }
                }

                console.log("conceern 저장된 결과(resultArray): ", resultArray);
                
            
            SkinConcernResults2();

            }


            async function SkinConcernResults2() {
                for (let i = 0; i < selectedValues.length; i++) {
                    console.log(`i의 값: ${i}`);
                    try {
                        const response = await $.ajax({
                            url: SkinResult_API_URL + '?surveyNo=' + selectedValues[i].surveyNo,
                            type: 'GET',
                            contentType: 'application/json'
                        });
                        const resultValue2 = response[0];
                        resultArray2.push(resultValue2);// 결과 배열에 추가


                        //****가장 마지막에 동기요청이 끝나는 지점이므로, 데이터 매핑
                        if (selectedValues.length === 1) {
                            console.log('1개 히스토리[T존,U존,날짜]')      
                            updateskinScoreData(resultArray2[0].skin_score); //skinScore 데이터 넣기 (현재는 임시값)
                            //U,T존 날짜
                            $('#t_zone_result-1 .date').text(resultArray2[0].create_dt.slice(0, 10));

                            //T존 타입 변화
                            $('#t_zone_result-1').append(resultArray2[0].t_zone_result);
                            $('#t_zone_result-1').addClass('active');

                            //U존 타입 변화
                            $('#u_zone_result-1').append(resultArray2[0].u_zone_result);
                            $('#u_zone_result-1').addClass('active');
                        }
                        else if (selectedValues.length === 2) {
                            console.log('2개 히스토리[T존,U존,날짜]')
                            updateskinScoreData(resultArray2[1].skin_score, resultArray2[0].skin_score); //skinScore 데이터 넣기 (현재는 임시값)
                            //U,T존 날짜
                            $('#t_zone_result-1 .date').text(resultArray2[1].create_dt.slice(0, 10));
                            $('#t_zone_result-2 .date').text(resultArray2[0].create_dt.slice(0, 10));

                            //T존 타입 변화
                            $('#t_zone_result-1').append(resultArray2[1].t_zone_result);
                            $('#t_zone_result-2').append(resultArray2[0].t_zone_result);
                            $('#t_zone_result-2').addClass('active');

                            //U존 타입 변화
                            $('#u_zone_result-1').append(resultArray2[1].u_zone_result);
                            $('#u_zone_result-2').append(resultArray2[0].u_zone_result);
                            $('#u_zone_result-2').addClass('active');
                        }
                        else if (selectedValues.length === 3) {
                            console.log('3개 히스토리[T존,U존,날짜]')        
                            updateskinScoreData(resultArray2[2].skin_score, resultArray2[1].skin_score, resultArray2[0].skin_score);                  
                            //U,T존 날짜
                            $('#t_zone_result-1 .date').text(resultArray2[2].create_dt.slice(0, 10));
                            $('#t_zone_result-2 .date').text(resultArray2[1].create_dt.slice(0, 10));
                            $('#t_zone_result-3 .date').text(resultArray2[0].create_dt.slice(0, 10));

                            //T존 타입 변화
                            $('#t_zone_result-1').append(resultArray2[2].t_zone_result);
                            $('#t_zone_result-2').append(resultArray2[1].t_zone_result);
                            $('#t_zone_result-3').append(resultArray2[0].t_zone_result);
                            $('#t_zone_result-3').addClass('active');

                            //U존 타입 변화
                            $('#u_zone_result-1').append(resultArray2[2].u_zone_result);
                            $('#u_zone_result-2').append(resultArray2[1].u_zone_result);
                            $('#u_zone_result-3').append(resultArray2[0].u_zone_result);
                            $('#u_zone_result-3').addClass('active');
                        }
                        else if (selectedValues.length === 4) {
                            console.log('4개 히스토리[T존,U존,날짜]')   
                            updateskinScoreData(resultArray2[3].skin_score, resultArray2[2].skin_score, resultArray2[1].skin_score, resultArray2[0].skin_score);                          
                            //U,T존 날짜
                            $('#t_zone_result-1 .date').text(resultArray2[3].create_dt.slice(0, 10));
                            $('#t_zone_result-2 .date').text(resultArray2[2].create_dt.slice(0, 10));
                            $('#t_zone_result-3 .date').text(resultArray2[1].create_dt.slice(0, 10));
                            $('#t_zone_result-4 .date').text(resultArray2[0].create_dt.slice(0, 10));

                            //T존 타입 변화
                            $('#t_zone_result-1').append(resultArray2[3].t_zone_result);
                            $('#t_zone_result-2').append(resultArray2[2].t_zone_result);
                            $('#t_zone_result-3').append(resultArray2[1].t_zone_result);
                            $('#t_zone_result-4').append(resultArray2[0].t_zone_result);
                            $('#t_zone_result-4').addClass('active');

                            //U존 타입 변화
                            $('#u_zone_result-1').append(resultArray2[3].u_zone_result);
                            $('#u_zone_result-2').append(resultArray2[2].u_zone_result);
                            $('#u_zone_result-3').append(resultArray2[1].u_zone_result);
                            $('#u_zone_result-4').append(resultArray2[0].u_zone_result);
                            $('#u_zone_result-4').addClass('active');
                        }


                    } catch (error) {
                        console.error('SkinConcernResults2 오류 : ', error);
                    }
                }

                console.log("U존, T존저장된 결과(resultArray2): ", resultArray2);






            }



        },

        error: function (xhr, status, error) {
            console.error('리스트 별 고객검색 결과  에러 : ', error);
        }
    })


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
    labels: [first_day, 2, 3, 4],
    datasets: [{
        label: '',
        data: [73, 77], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

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
        maintainAspectRatio: false, //차트 고정
        scales: {
            y: {
                beginAtZero: true,
                max: 110, // y축 최대값
                grid: {
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
                    display: true // x축 그리드 숨기기
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
                    stepSize: 20
                },
                title: {
                    display: true,
                    text: '수분',
                    font: {
                        size: 20
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
                    stepSize: 20
                },
                title: {
                    display: true,
                    text: '유분',
                    font: {
                        size: 20
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

function updateTZoneData(ts1, tu1, ts2, tu2, ts3, tu3, ts4, tu4) {
    t_zone_data.datasets[0].data[0] = { x: ts1, y: tu1 };
    t_zone_data.datasets[0].data[1] = { x: ts2, y: tu2 };
    t_zone_data.datasets[0].data[2] = { x: ts3, y: tu3 };
    t_zone_data.datasets[0].data[2] = { x: ts4, y: tu4 };

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
                    stepSize: 20
                },
                title: {
                    display: true,
                    text: '수분',
                    font: {
                        size: 20
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
                    stepSize: 20
                },
                title: {
                    display: true,
                    text: '유분',
                    font: {
                        size: 20
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
        data: [73, 77], // 데이터 포인트 값
        fill: false,
        borderColor: ['#cccccc', '#e83f6f'], // 라인 색상
        borderWidth: 2,
        borderDash: [5, 5],

        pointRadius: 8, // 점 크기
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

        pointRadius: 8, // 점 크기
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

        pointRadius: 8, // 점 크기
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

        pointRadius: 8, // 점 크기
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

        pointRadius: 8, // 점 크기
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

        pointRadius: 8, // 점 크기
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

        pointRadius: 8, // 점 크기
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

        pointRadius: 8, // 점 크기
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

        pointRadius: 8, // 점 크기
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



