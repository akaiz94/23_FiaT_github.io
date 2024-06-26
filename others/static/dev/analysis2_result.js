var ReservedCustom_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/progress_flg/';
var DirectCustom_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/direct/progress_flg/';
var Main_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/merged/list'; //방문회차 카운트
var hair_result_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairResult/';
var hair_image_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairImage/';
var hairSurvey_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/svy/hair/';

const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
const surveyDate = moment().format('YYYY/MM/DD');


let hair_result_opinionsImage = '';
let hair_result_backgroundImage = '';


$(document).ready(function () {
    window.scrollTo(0, 470);
    console.log('analysis2_result page start -> ')
    console.log ("hair_result_backgroundImage 길이 : ", hair_result_backgroundImage.length);
    
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
    

    //상담 완료가 아닐경우 (상담완료는 진행률 이미 100%)
    if (localStorage.getItem('progress_flg') !== '10') {
        //직접 방문 고객의 상담 진행률
        if (localStorage.getItem('visitkey') === '0' && localStorage.getItem('custom_sculpResult') !== 'ok') {
            console.log("직방 고객 상담 진행률 체크")
            $.ajax({
                url: DirectCustom_API_URL + localStorage.getItem('skey'),
                type: 'PATCH',
                data: JSON.stringify({ "progress_flg": "109" }), //두피상담 진행중
                contentType: 'application/json',

                success: function (response) {
                    console.log('=====================');
                    console.log('두피상담 인입 성공 : ', response);
                },

                error: function (xhr, status, error) {
                    console.error('두피상담 인입 에러 : ', error);
                }
            })
        }
        //예약 방문 고객의 상담 진행률
        else if (localStorage.getItem('visitkey') !== '0' && localStorage.getItem('custom_sculpResult') !== 'ok') {
            console.log("예약 고객 상담 진행률 체크")
            $.ajax({
                url: ReservedCustom_API_URL + localStorage.getItem('visitkey') + '/' + localStorage.getItem('skey'),
                type: 'PATCH',
                data: JSON.stringify({ "progress_flg": "109" }), //두피상담 진행중
                contentType: 'application/json',

                success: function (response) {
                    console.log('=====================');
                    console.log('두피상담 인입 성공 : ', response);
                },

                error: function (xhr, status, error) {
                    console.error('두피상담 인입 에러 : ', error);
                }
            })
        }
    }



    $('#visitDate').text(localStorage.getItem('visit_rsvn_date'));


    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));
    console.log("custom_sex : ", localStorage.getItem('custom_sex'));
    // var surveyNo = localStorage.getItem('custom_surveyNo');

    fnGetVisitCount();//방문회차 카운트 함수

    surveyNo = localStorage.getItem('custom_surveyNo');
    userkey = localStorage.getItem('custom_userkey');

    console.log('surveyNo : ', surveyNo);
    console.log('userkey : ', userkey);


    $('#manager_name').text(localStorage.getItem('manager_name'));
    $('#custom_name').text(localStorage.getItem('custom_name'));

    if (localStorage.getItem('manager_name').length === 2) {
        // $("#title_date").css("margin-right","90px");   
        document.getElementById("title_date").style.marginRight = "90px";
        document.getElementById("title_count").style.marginRight = "145px";
    }


    //페이지 내 opinion
    $('#comment01_main').val(localStorage.getItem('analysis2_result-comment01'));
    $('#comment02_main').val(localStorage.getItem('analysis2_result-comment02'));
    $('#comment03_main').val(localStorage.getItem('analysis2_result-comment03'));

    //모달창 내 opinion
    $('#comment01').val(localStorage.getItem('analysis2_result-comment01'));
    $('#comment02').val(localStorage.getItem('analysis2_result-comment02'));
    $('#comment03').val(localStorage.getItem('analysis2_result-comment03'));



    // 두피데이터 있는지 확인 함수 호출
    getAllDataCheck(surveyNo,userkey);






    /*
    *
    *24. 05. 25 opinion 클릭 이벤트
    */
    var opinionsImage = $("#opinionsImage");
    opinionsImage.hover(
        function () {
            $(this).css("cursor", "pointer");
        },
        function () {
            $(this).css("cursor", "auto");
        },
    )


    opinionsImage.click(function () {
        console.log('이미지 클릭)');

        $('.user-modify-layer').addClass('open');
    })




    //24. 05. 26 opinion 이미지 그리기   
    var opinionCanvas = document.getElementById('opinionCanvas');
    var opinion_ctx = opinionCanvas.getContext('2d');
    var backgroundCanvas = document.getElementById('backgroundCanvas');
    var background_ctx = backgroundCanvas.getContext('2d');


    var opinionImage = new Image();
    var backgroundImage = new Image();


    
    console.log ("hair_result_backgroundImage 길이22 : ", hair_result_backgroundImage.length);
    opinionImage.onload = function () {
        // 배경 이미지를 캔버스에 그립니다
        opinion_ctx.drawImage(opinionImage, 0, 0, opinionCanvas.width, opinionCanvas.height);
    };


    backgroundImage.onload = function () {
        // 배경 이미지를 캔버스에 그립니다
        background_ctx.drawImage(backgroundImage, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
    };


    // 선그리기 시작
    var isDrawing = false;
    var isErasing = false;
    var lastX = 0;
    var lastY = 0;
    var selectedColor = '#000000';

    $("#drawBtn").click(function (event) {
        event.preventDefault(); //모달창 자동 종료 방지
        isDrawing = true;
        isErasing = false;
        opinion_ctx.lineWidth = 3; // 선 굵기 설정       
        // ctx.globalCompositeOperation = 'source-over'; //기본 그리기 모드
    });

    $("#eraseBtn").click(function (event) {
        event.preventDefault(); //모달창 자동 종료 방지
        isErasing = true;
        isDrawing = false;
        opinion_ctx.lineWidth = 30; // 선 굵기 설정
        // ctx.globalCompositeOperation = 'destination-out'; //그러진선 지우기
    });

    $('#colorPicker').change(function () {
        selectedColor = $(this).val();
    });




    opinionCanvas.addEventListener('mousedown', function (e) {
        if (isDrawing || isErasing) {
            isDrawing ? opinion_ctx.strokeStyle = selectedColor : opinion_ctx.strokeStyle = 'white';
            isDrawing ? opinion_ctx.globalCompositeOperation = 'source-over' : opinion_ctx.globalCompositeOperation = 'destination-out'; //1.기본 그리기   2. 그려진 선 지우기
            isDrawing = true;
            isErasing = false;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }
    });

    opinionCanvas.addEventListener('mousemove', function (e) {
        if (isDrawing || isErasing) {
            if (e.buttons === 1) {
                opinion_ctx.beginPath();
                opinion_ctx.moveTo(lastX, lastY);
                opinion_ctx.lineTo(e.offsetX, e.offsetY);
                opinion_ctx.stroke();
                [lastX, lastY] = [e.offsetX, e.offsetY];
            }
        }
    });

    opinionCanvas.addEventListener('mouseup', function () {
        // isDrawing = false;
    });

    opinionCanvas.addEventListener('mouseout', function () {
        isDrawing = false;
    });




    //opinion 이미지 그리기 시작!!
    $('#custom_info_saveButton').on('click', function (event) {

        console.log("opinions값 저장 버튼 클릭");

        localStorage.setItem('analysis2_result-opinionCanvas', opinionCanvas.toDataURL());
        localStorage.setItem('analysis2_result-backgroundCanvas', backgroundCanvas.toDataURL());

        $('#opinionsImage').attr('src', localStorage.getItem('analysis2_result-opinionCanvas')); //(페이지) 이미지
        $('#backgroundImage').attr('src', localStorage.getItem('analysis2_result-backgroundCanvas'));//(페이지) 백그라운드 이미지

        localStorage.setItem('analysis2_result-comment01', $('#comment01').val());
        localStorage.setItem('analysis2_result-comment02', $('#comment02').val());
        localStorage.setItem('analysis2_result-comment03', $('#comment03').val());
        console.log('localStorage.getItem : ', localStorage.getItem('analysis2_result-comment01'));

        $('#comment01_main').val(localStorage.getItem('analysis2_result-comment01'));
        $('#comment02_main').val(localStorage.getItem('analysis2_result-comment02'));
        $('#comment03_main').val(localStorage.getItem('analysis2_result-comment03'));

        $('.user-modify-layer').removeClass('open');




        console.log("==============================");
        console.log("analysis2_result_save 저장 버튼 클릭 효과!!22");

        console.log("opinionsImageSrc:", localStorage.getItem('analysis2_result-opinionCanvas'));
        console.log("backgroundImageSrc:", localStorage.getItem('analysis2_result-backgroundCanvas'));


        console.log("custom_userkey", localStorage.getItem('custom_userkey'));
        console.log("custom_surveyNo", localStorage.getItem('custom_surveyNo'));

        console.log("analysis2_result-comment01", localStorage.getItem('analysis2_result-comment01'));
        console.log("analysis2_result-comment02", localStorage.getItem('analysis2_result-comment02'));
        console.log("analysis2_result-comment03", localStorage.getItem('analysis2_result-comment03'));


        var requestData = {
            "surveyNo": localStorage.getItem('custom_surveyNo'),
            "userKey": localStorage.getItem('custom_userkey'),
            "surveyDate": surveyDate,
            "name": localStorage.getItem('custom_name'),
            "skin_score": 0,
            "skin_gomin": "",
            "IsComplexity": "N",
            "t_zone_result": "",
            "t_zone_position_num": 0,
            "u_zone_result": "",
            "u_zone_position_num": 0,
            "fizpatrick_color_point": 0,
            "solution_type_number": "",
            "sensitive_type_number": "",
            "specialtip_img": localStorage.getItem('analysis2_result-backgroundCanvas'),
            "specialtip_stoke_img": localStorage.getItem('analysis2_result-opinionCanvas'),
            "specialtip_memo": localStorage.getItem('analysis2_result-comment01'),
            "specialtip_memo2": localStorage.getItem('analysis2_result-comment02'),
            "specialtip_memo3": localStorage.getItem('analysis2_result-comment03'),
            "manager_value": localStorage.getItem('manager_name'),
            "create_dt": currentTime,
            "update_dt": currentTime,
            "idx": null,
            "total_count": 1
        }

        console.log("analysis2_result requestData : ", requestData);


        $.ajax({
            // url: SkinSurvey_API_URL + surveyNo,
            url: hair_result_URL,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),

            success: function (response) {
                console.log("hair_result_URL 응답값 : ", response);
                $("#custom_detail_main").html("Opinions & 두피 결과 저장 완료");
                showErrorModal();


                //상담 완료가 아닐경우 (상담완료는 진행률 이미 100%)
                if (localStorage.getItem('progress_flg') !== '10') {
                    //직접 방문 고객의 상담 진행률
                    if (localStorage.getItem('visitkey') === '0') {
                        $.ajax({
                            url: DirectCustom_API_URL + localStorage.getItem('skey'),
                            type: 'PATCH',
                            data: JSON.stringify({ "progress_flg": "110" }), //두피상담 완료 
                            contentType: 'application/json',

                            success: function (response) {
                                console.log('=====================');
                                console.log('두피상담 완료 인입 성공 : ', response);
                                localStorage.setItem('custom_sculpResult', 'ok');
                            },

                            error: function (xhr, status, error) {
                                console.error('두피상담 완료 인입 에러 : ', error);
                            }
                        })
                    }
                    //예약 방문 고객의 상담 진행률
                    else if (localStorage.getItem('visitkey') !== '0') {
                        console.log("예약 고객 상담 진행률 체크")
                        $.ajax({
                            url: ReservedCustom_API_URL + localStorage.getItem('visitkey') + '/' + localStorage.getItem('skey'),
                            type: 'PATCH',
                            data: JSON.stringify({ "progress_flg": "110" }), //두피상담 완료
                            contentType: 'application/json',

                            success: function (response) {
                                console.log('=====================');
                                console.log('두피상담 완료 인입 성공 : ', response);
                            },

                            error: function (xhr, status, error) {
                                console.error('두피상담 완료 인입 에러 : ', error);
                            }
                        })
                    }
                }



            }, error: function (xhr, status, error) {
                console.error('hair_result_URL 오류 : ', error);
                $("#custom_detail_main").html("두피 결과 저장 실패");
                showErrorModal();
            }
        })





    })
    //opinion 이미지 그리기 끝



    /*
    *
    * analysis2_result 데이터 값 저장
    * *
    * */
    $('#analysis2_result_save').on('click', function (event) {

        console.log("==============================");
        console.log("analysis2_result_save 저장 버튼 클릭!!");

        console.log("opinionsImageSrc:", localStorage.getItem('analysis2_result-opinionCanvas'));
        console.log("backgroundImageSrc:", localStorage.getItem('analysis2_result-backgroundCanvas'));


        console.log("custom_userkey", localStorage.getItem('custom_userkey'));
        console.log("custom_surveyNo", localStorage.getItem('custom_surveyNo'));

        console.log("analysis2_result-comment01", localStorage.getItem('analysis2_result-comment01'));
        console.log("analysis2_result-comment02", localStorage.getItem('analysis2_result-comment02'));
        console.log("analysis2_result-comment03", localStorage.getItem('analysis2_result-comment03'));


        var requestData = {
            "surveyNo": localStorage.getItem('custom_surveyNo'),
            "userKey": localStorage.getItem('custom_userkey'),
            "surveyDate": surveyDate,
            "name": localStorage.getItem('custom_name'),
            "skin_score": 0,
            "skin_gomin": "",
            "IsComplexity": "N",
            "t_zone_result": "",
            "t_zone_position_num": 0,
            "u_zone_result": "",
            "u_zone_position_num": 0,
            "fizpatrick_color_point": 0,
            "solution_type_number": "",
            "sensitive_type_number": "",
            "specialtip_img": localStorage.getItem('analysis2_result-backgroundCanvas'),
            "specialtip_stoke_img": localStorage.getItem('analysis2_result-opinionCanvas'),
            "specialtip_memo": localStorage.getItem('analysis2_result-comment01'),
            "specialtip_memo2": localStorage.getItem('analysis2_result-comment02'),
            "specialtip_memo3": localStorage.getItem('analysis2_result-comment03'),
            "manager_value": localStorage.getItem('manager_name'),
            "create_dt": currentTime,
            "update_dt": currentTime,
            "idx": null,
            "total_count": 1
        }

        console.log("analysis2_result requestData : ", requestData);


        $.ajax({
            // url: SkinSurvey_API_URL + surveyNo,
            url: hair_result_URL,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),

            success: function (response) {
                console.log("hair_result_URL 응답값 : ", response);
                $("#custom_detail_main").html("두피 결과 저장 완료");
                showErrorModal();


            }, error: function (xhr, status, error) {
                console.error('hair_result_URL 오류 : ', error);
                $("#custom_detail_main").html("두피 결과 저장 실패");
                showErrorModal();
            }
        })
    })
    //opinion 이미지 그리기 끝






    // #1 Scalp Type, Hair Conditions, hair Density Type 부분 API 값요청
    var hairMain_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairMain/' + '?surveyNo=' + surveyNo + '&userkey=' + userkey;
    $.ajax({
        url: hairMain_URL,
        type: 'GET',
        success: function (response) {
            console.log('hairMain 응답 : ', response);

            // console.log("********hairMain 기준 측정일****** > ", response[0].create_dt);
            // const dateObject = response[0].create_dt.substring(0,10).replace('-','. ').replace('-','. ');

            // console.log("********hairMain 기준 생성일 변환****** > ", dateObject);      
            // $('#visitDate').text(dateObject);


            // 1st. Scalp Type 값
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

            var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
            $('.type-item').removeClass('active');
            $(`.type-item:contains(${scalpType})`).addClass('active');


            // 2nd. Hair Conditions 값
            var Haircondition_Tips = response[0].Haircondition_Tips;
            var Haircondition_Mid = response[0].Haircondition_Mid;
            var Haircondition_Root = response[0].Haircondition_Root;

            //console.log("Haircondition_Tips : ", Haircondition_Tips);
            //console.log(typeof(Haircondition_Tips));

            var Haircondition_Tips_Result = getHaiconditionResult(parseInt(Haircondition_Tips));
            var Haircondition_Mid_Result = getHaiconditionResult(parseInt(Haircondition_Mid));
            var Haircondition_Root_Result = getHaiconditionResult(parseInt(Haircondition_Root));

            //console.log("Haircondition_Tips_Result : ", Haircondition_Tips_Result);

            $('#haircondition_tips').text(Haircondition_Tips_Result);
            $('#haircondition_mid').text(Haircondition_Mid_Result);
            $('#haircondition_root').text(Haircondition_Root_Result);


            // 3rd. hair Density Type 값
            var HairlossType_Basic = response[0].HairlossType_Basic; //기본
            var HairlossType_Center = response[0].HairlossType_Center; //정수리
            var HairlossType_FrontCenter = response[0].HairlossType_FrontCenter; //앞중앙       

            $('#HairlossType_Basic').text(HairlossType_Basic);




            if (HairlossType_Basic !== null) {
                $('#HairlossType_Basic').text(HairlossType_Basic);
                console.log('*****************HairlossType_Basic 값 > ', HairlossType_Basic);

                if (localStorage.getItem('custom_sex') === "F") {
                    $('#HairlossType_Basic_1-img').attr('src', "./resource/images/scalp/LossTypes/W/" + HairlossType_Basic + '_f.PNG');
                    $('#HairlossType_Basic_2-img').attr('src', "./resource/images/scalp/LossTypes/W/" + HairlossType_Basic + '_s.PNG');
                } else {
                    $('#HairlossType_Basic_1-img').attr('src', "./resource/images/scalp/LossTypes/M/" + HairlossType_Basic + '_f.PNG');
                    $('#HairlossType_Basic_2-img').attr('src', "./resource/images/scalp/LossTypes/M/" + HairlossType_Basic + '_s.PNG');
                }

                if (HairlossType_Basic === 'M0') {
                    $('#density_type-M1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('M0');
                }
                if (HairlossType_Basic === 'M1') {
                    $('#density_type-M1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('M1');
                }
                if (HairlossType_Basic === 'M2') {
                    $('#density_type-M2').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('M2');
                }
                if (HairlossType_Basic === 'M3') {
                    $('#density_type-M3').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('M3');
                }
                if (HairlossType_Basic === 'C0') {
                    $('#density_type-C0').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('C0');
                }
                if (HairlossType_Basic === 'C1') {
                    $('#density_type-C1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('C1');
                }
                if (HairlossType_Basic === 'C2') {
                    $('#density_type-C2').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('C2');
                }
                if (HairlossType_Basic === 'C3') {
                    $('#density_type-C3').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('C3');
                }
                if (HairlossType_Basic === 'U1') {
                    $('#density_type-U1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('U1');
                }
                if (HairlossType_Basic === 'U2') {
                    $('#density_type-U2').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('U2');
                }
                if (HairlossType_Basic === 'U3') {
                    $('#density_type-U3').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('U3');
                }

                if (HairlossType_Basic === 'V1') {
                    $('#density_type-V1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('V1');
                }
                if (HairlossType_Basic === 'V2') {
                    $('#density_type-V2').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('V2');
                }
                if (HairlossType_Basic === 'V3') {
                    $('#density_type-V3').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('V3');
                }


                if (HairlossType_Basic === 'F1') {
                    $('#density_type-F1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('F1');
                }
                if (HairlossType_Basic === 'F2') {
                    $('#density_type-F2').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('F2');
                }
                if (HairlossType_Basic === 'F3') {
                    $('#density_type-F3').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Basic').text('F3');
                }


            } else {
                $('#HairlossType_Basic').parent().remove();

                $('#HairlossType_Basic_1-img').hide();
                $('#HairlossType_Basic_2-img').hide();
            }

            if (HairlossType_Center !== null) {
                $('#HairlossType_Center').text(HairlossType_Center);
                console.log('*****************HairlossType_Center 값 > ', HairlossType_Center);

                if (localStorage.getItem('custom_sex') === "F") {
                    $('#HairlossType_Center_1-img').attr('src', "./resource/images/scalp/LossTypes/W/" + HairlossType_Center + '_f.PNG');
                    $('#HairlossType_Center_2-img').attr('src', "./resource/images/scalp/LossTypes/W/" + HairlossType_Center + '_s.PNG');
                } else {
                    $('#HairlossType_Center_1-img').attr('src', "./resource/images/scalp/LossTypes/M/" + HairlossType_Center + '_f.PNG');
                    $('#HairlossType_Center_2-img').attr('src', "./resource/images/scalp/LossTypes/M/" + HairlossType_Center + '_s.PNG');
                }

                if (HairlossType_Center === 'M0') {
                    $('#density_type-M1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('M0');
                }
                if (HairlossType_Center === 'M1') {
                    $('#density_type-M1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('M1');
                }
                if (HairlossType_Center === 'M2') {
                    $('#density_type-M2').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('M2');
                }
                if (HairlossType_Center === 'M3') {
                    $('#density_type-M3').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('M3');
                }
                if (HairlossType_Center === 'C0') {
                    $('#density_type-C0').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('C0');
                }
                if (HairlossType_Center === 'C1') {
                    $('#density_type-C1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('C1');
                }
                if (HairlossType_Center === 'C2') {
                    $('#density_type-C2').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('C2');
                }
                if (HairlossType_Center === 'C3') {
                    $('#density_type-C3').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('C3');
                }
                if (HairlossType_Center === 'U1') {
                    $('#density_type-U1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('U1');
                }
                if (HairlossType_Center === 'U2') {
                    $('#density_type-U2').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('U2');
                }
                if (HairlossType_Center === 'U3') {
                    $('#density_type-U3').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('U3');
                }

                if (HairlossType_Center === 'V1') {
                    $('#density_type-V1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('V1');
                }
                if (HairlossType_Center === 'V2') {
                    $('#density_type-V2').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('V2');
                }
                if (HairlossType_Center === 'V3') {
                    $('#density_type-V3').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('V3');
                }


                if (HairlossType_Center === 'F1') {
                    $('#density_type-F1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('F1');
                }
                if (HairlossType_Center === 'F2') {
                    $('#density_type-F2').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('21');
                }
                if (HairlossType_Center === 'F3') {
                    $('#density_type-F3').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_Center').text('F3');
                }

            } else {
                //$('#HairlossType_Center').hide();
                $('#HairlossType_Center').parent().remove();
                $('#HairlossType_Center_1-img').hide();
                $('#HairlossType_Center_2-img').hide();
            }

            if (HairlossType_FrontCenter !== null) {
                $('#HairlossType_FrontCenter').text(HairlossType_FrontCenter);
                console.log('*****************HairlossType_FrontCenter 값 > ', HairlossType_FrontCenter);

                if (localStorage.getItem('custom_sex') === "F") {
                    $('#HairlossType_FrontCenter_1-img').attr('src', "./resource/images/scalp/LossTypes/W/" + HairlossType_FrontCenter + '_f.PNG');
                    $('#HairlossType_FrontCenter_2-img').attr('src', "./resource/images/scalp/LossTypes/W/" + HairlossType_FrontCenter + '_s.PNG');
                } else {
                    $('#HairlossType_FrontCenter_1-img').attr('src', "./resource/images/scalp/LossTypes/M/" + HairlossType_FrontCenter + '_f.PNG');
                    $('#HairlossType_FrontCenter_2-img').attr('src', "./resource/images/scalp/LossTypes/M/" + HairlossType_FrontCenter + '_s.PNG');
                }


                if (HairlossType_FrontCenter === 'M0') {
                    $('#density_type-M1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('M0');
                }
                if (HairlossType_FrontCenter === 'M1') {
                    $('#density_type-M1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('M1');
                }
                if (HairlossType_FrontCenter === 'M2') {
                    $('#density_type-M2').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('M2');
                }
                if (HairlossType_FrontCenter === 'M3') {
                    $('#density_type-M3').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('M3');
                }
                if (HairlossType_FrontCenter === 'C0') {
                    $('#density_type-C0').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('C0');
                }
                if (HairlossType_FrontCenter === 'C1') {
                    $('#density_type-C1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('C1');
                }
                if (HairlossType_FrontCenter === 'C2') {
                    $('#density_type-C2').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('C2');
                }
                if (HairlossType_FrontCenter === 'C3') {
                    $('#density_type-C3').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('C3');
                }
                if (HairlossType_FrontCenter === 'U1') {
                    $('#density_type-U1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('U1');
                }
                if (HairlossType_FrontCenter === 'U2') {
                    $('#density_type-U2').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('U2');
                }
                if (HairlossType_FrontCenter === 'U3') {
                    $('#density_type-U3').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('U3');
                }

                if (HairlossType_FrontCenter === 'V1') {
                    $('#density_type-V1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('V1');
                }
                if (HairlossType_FrontCenter === 'V2') {
                    console.log("v2v2v2v2")
                    $('#density_type-V2').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('V2');
                }
                if (HairlossType_FrontCenter === 'V3') {
                    $('#density_type-V3').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('V3');
                }

                if (HairlossType_FrontCenter === 'F1') {
                    $('#density_type-F1').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('F1');
                }
                if (HairlossType_FrontCenter === 'F2') {
                    $('#density_type-F2').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('F2');
                }
                if (HairlossType_FrontCenter === 'F3') {
                    $('#density_type-F3').css('background-color', '#e7c1da').css('font-weight', 'bold');
                    $('#Final-HairlossType_FrontCenter').text('F3');
                }

            } else {
                //$('#HairlossType_FrontCenter').hide();
                $('#HairlossType_FrontCenter').parent().remove();

                $('#HairlossType_FrontCenter_1-img').hide();
                $('#HairlossType_FrontCenter_2-img').hide();
            }




        },
        error: function (xhr, status, error) {

            console.error('에러 : ', error);
        }
    })



    // #2 Detailed Information On hair Thickness & Density 부분 API 값요청
    var hairLeftHairLine_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairLeftHairLine/' + '?surveyNo=' + surveyNo + '&userkey=' + userkey;
    var hairFrontCenter_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairFrontCenter/' + '?surveyNo=' + surveyNo + '&userkey=' + userkey;
    var hairFrontHairLine_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairFrontHairLine/' + '?surveyNo=' + surveyNo + '&userkey=' + userkey;
    var hairCenter_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairCenter/' + '?surveyNo=' + surveyNo + '&userkey=' + userkey;
    var hairRightHairLine_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairRightHairLine/' + '?surveyNo=' + surveyNo + '&userkey=' + userkey;
    var hairBack_URL = 'https://amore-citylab.amorepacific.com:8000/v1/hairBack/' + '?surveyNo=' + surveyNo + '&userkey=' + userkey;


    // 1.왼쪽 헤어라인
    $.ajax({
        url: hairLeftHairLine_URL,
        type: 'GET',
        success: function (response) {
            //console.log('hairLeftHairLine 응답 : ', response);

            var density = response[0].Density;
            var thickness = response[0].Thickness;
            updateDensityData(0, density);
            updateThicknessData(0, thickness);
            updateScatterData(0, thickness, density);



            $('#hairLeftHairLine .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
            $('#hairLeftHairLine .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

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

            var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
            $('#hairLeftHairLine .hair-skin-info dd:eq(2)').text(scalpType);


        },
        error: function (xhr, status, error) {

            console.error('에러 : ', error);
        }
    })

    // 2.앞 헤어라인
    $.ajax({
        url: hairFrontHairLine_URL,
        type: 'GET',
        success: function (response) {
            console.log('hairFrontHairLine 응답 : ', response);

            var density = response[0].Density;
            var thickness = response[0].Thickness;
            updateDensityData(1, density);
            updateThicknessData(1, thickness);
            updateScatterData(1, thickness, density);

            $('#hairFrontHairLine .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
            $('#hairFrontHairLine .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

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

            var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
            $('#hairFrontHairLine .hair-skin-info dd:eq(2)').text(scalpType);

        },
        error: function (xhr, status, error) {

            console.error('에러 : ', error);
        }
    })

    // 3. 오른쪽 헤어라인
    $.ajax({
        url: hairRightHairLine_URL,
        type: 'GET',
        success: function (response) {
            //console.log('hairRightHairLine 응답 : ', response);

            var density = response[0].Density;
            var thickness = response[0].Thickness;
            updateDensityData(2, density);
            updateThicknessData(2, thickness);
            updateScatterData(2, thickness, density);

            $('#hairRightHairLine .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
            $('#hairRightHairLine .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

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

            var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
            $('#hairRightHairLine .hair-skin-info dd:eq(2)').text(scalpType);

        },
        error: function (xhr, status, error) {

            console.error('에러 : ', error);
        }
    })



    // 4.앞 중앙
    $.ajax({
        url: hairFrontCenter_URL,
        type: 'GET',
        success: function (response) {
            //console.log('hairFrontCenter 응답 : ', response);

            var density = response[0].Density;
            var thickness = response[0].Thickness;
            updateDensityData(3, density);
            updateThicknessData(3, thickness);
            updateScatterData(3, thickness, density);

            $('#hairFrontCenter .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
            $('#hairFrontCenter .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

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

            var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
            $('#hairFrontCenter .hair-skin-info dd:eq(2)').text(scalpType);

        },
        error: function (xhr, status, error) {

            console.error('에러 : ', error);
        }
    })


    // 5.정수리
    $.ajax({
        url: hairCenter_URL,
        type: 'GET',
        success: function (response) {
            //console.log('hairCenter 응답 : ', response);

            var density = response[0].Density;
            var thickness = response[0].Thickness;
            updateDensityData(4, density);
            updateThicknessData(4, thickness);
            updateScatterData(4, thickness, density);

            $('#hairCenter .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
            $('#hairCenter .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

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

            var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
            $('#hairCenter .hair-skin-info dd:eq(2)').text(scalpType);



        },
        error: function (xhr, status, error) {

            console.error('에러 : ', error);
        }
    })


    // 6. 후두부
    $.ajax({
        url: hairBack_URL,
        type: 'GET',
        success: function (response) {
            //console.log('hairBack 응답 : ', response);

            var density = response[0].Density;
            var thickness = response[0].Thickness;
            updateDensityData(5, density);
            updateThicknessData(5, thickness);
            updateScatterData(5, thickness, density);

            $('#hairBack .hair-skin-info dd:eq(0)').text(density + '/120 hair/㎠');
            $('#hairBack .hair-skin-info dd:eq(1)').text(thickness + '/0.075 ㎟');

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

            var scalpType = getScalpType(ScalpType_Nor, ScalpType_Oily, ScalpType_Ato, ScalpType_Trb, ScalpType_Dry, ScalpType_Sen, ScalpType_Seb, ScalpType_Ddan, ScalpType_Odan, ScalpType_Unknown);
            $('#hairBack .hair-skin-info dd:eq(2)').text(scalpType);

        },
        error: function (xhr, status, error) {

            console.error('에러 : ', error);
        }
    })




    // 7. 모발 이미지 넣기
    $.ajax({
        url: hair_image_URL + '?surveyNo=' + surveyNo,
        type: 'GET',
        success: function (response) {
            console.log('hair_image_URL 응답 : ', response);

            hairLeftHairLine_image = response[0].Scalp_LeftHairLine;
            hairFrontCenter_image = response[0].Scalp_FrontCenter;
            hairFrontHairLine_image = response[0].Scalp_FrontHairLine;
            hairCenter_image = response[0].Scalp_Center;
            hairRightHairLine_image = response[0].Scalp_RightHairLine;
            hairBack_image = response[0].Scalp_Back;


            $("#hairLeftHairLine-img").attr("src", "data:image/jpeg;base64," + response[0].Scalp_LeftHairLine);
            $("#hairFrontCenter-img").attr("src", "data:image/jpeg;base64," + response[0].Scalp_FrontCenter);
            $("#hairFrontHairLine-img").attr("src", "data:image/jpeg;base64," + response[0].Scalp_FrontHairLine);
            $("#hairCenter-img").attr("src", "data:image/jpeg;base64," + response[0].Scalp_Center);
            $("#hairRightHairLine-img").attr("src", "data:image/jpeg;base64," + response[0].Scalp_RightHairLine);
            $("#hairBack-img").attr("src", "data:image/jpeg;base64," + response[0].Scalp_Back);

        },
        error: function (xhr, status, error) {

            console.error('에러 : ', error);
        }
    })
});



//surveyNo함수를 직접 사용하진않음,,
async function getAllDataCheck(surveyNo,userkey) {
    try {
        const [get_hairSurvey, get_hairResult] = await Promise.all([
            fnGetHairSurvey(surveyNo,userkey),
            fnGetHairResult(surveyNo,userkey),
           
        ]);

        if (!get_hairSurvey) {
            console.log("두피(문진) 결과값 확인 불가.");
            $("#noData_text").html('문진(두피)를 먼저 작성해야합니다.');
            $("#noData_text2").html('잠시후 문진(두피) 페이지로 이동합니다.');
            $('.msg-layer-noData').addClass('open');

            setTimeout(function () {
                $('.layer-wrap-noData').removeClass('open');
                window.location.href = './solution_questionnaire2.html';;   // 문진(두피) 페이지로 이동
            }, 2000); // 2초 

            return;
        }
        
        if (!get_hairResult) {
            console.log("두피측정 결과값 확인 불가.");
            $("#noData_text").html('두피/모발 측정이 완료되지 않았습니다.');
            $("#noData_text2").html('잠시후 두피/모발 측정 페이지로 이동합니다.');
            $('.msg-layer-noData').addClass('open');

            setTimeout(function () {
                $('.layer-wrap-noData').removeClass('open');
                window.location.href = './analysis2.html';;   // 두피측정 페이지로 이동
            }, 2000); // 2초 

            return;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}



//#0-2 두피 결과
function fnGetHairResult(surveyNo,userKey) {
    return new Promise((resolve, reject) => {

        $.ajax({
            url: hair_result_URL + '?surveyNo=' + surveyNo + '&userkey=' + userKey,
            type: 'GET',
            success: function (response) {
                const hairResult = response[0];
                console.log('### hair_result_URL 응답 : ', hairResult);
                console.log(('### hair_result_URL 길이 : ', Object.keys(hairResult).length))


                if (hairResult === undefined) {
                    console.log("DB내, 두피결과 데이터가 존재하지않음")
                    //DB내, 데이터가 존재하지않음

                    if(localStorage.getItem('ProgramCode') === 'PC001013'){
                        $('#backgroundImage').attr('src',"./resource/images/img-report002.png"); //(두피) 이미지
                        $('#backgroundCanvas').attr('src',"./resource/images/img-report002.png"); //(두피) 이미지 (팝업창)

                        resolve(true);
                    } else if(localStorage.getItem('ProgramCode') === 'PC001010'){
                        $('#backgroundImage').attr('src',"./resource/images/img-report002.png"); //(두피) 이미지
                        $('#backgroundCanvas').attr('src',"./resource/images/img-report002.png"); //(두피) 이미지 (팝업창)

                        resolve(true);
                    } else{


                        resolve(false);
                    }
              

                } else {
                    console.log("DB내, 두피결과 데이터가  존재함")
                    $('#comment01_main').text(hairResult.specialtip_memo);
                    $('#comment02_main').text(hairResult.specialtip_memo2);

                    //DB내, 데이터가 존재                    
                    $('#opinionsImage').attr('src',"data:image/jpeg;base64," + hairResult.specialtip_stoke_img); //(페이지) 이미지
                    $('#backgroundImage').attr('src',"data:image/jpeg;base64," +  hairResult.specialtip_img);//(페이지) 백그라운드 이미지

                    hair_result_opinionsImage = hairResult.specialtip_stoke_img;
                    hair_result_backgroundImage = hairResult.specialtip_img;

                    console.log ("hair_result_backgroundImage 길이 33: ", hair_result_backgroundImage.length);


                    localStorage.setItem('analysis2_result-opinionCanvas', hairResult.specialtip_stoke_img)//(페이지) 이미지
                    localStorage.setItem('analysis2_result-backgroundCanvas', hairResult.specialtip_img)//(페이지) 백그라운드이미지

                    localStorage.setItem('analysis2_result-comment01', hairResult.specialtip_memo);
                    localStorage.setItem('analysis2_result-comment02', hairResult.specialtip_memo2);
                    localStorage.setItem('analysis2_result-comment03', hairResult.specialtip_memo3);

                    $('#comment01_main').val(localStorage.getItem('analysis2_result-comment01'));
                    $('#comment02_main').val(localStorage.getItem('analysis2_result-comment02'));
                    $('#comment03_main').val(localStorage.getItem('analysis2_result-comment03'));

                    resolve(hairResult);
                }

            },
            error: function (xhr, status, error) {

                console.error('### hair_result_URL 에러 : ', error);
                reject(error);
            }
        })
    });
}


//#4th. 문진(두피) 요청
function fnGetHairSurvey(surveyNo,userKey) {
    return new Promise((resolve, reject) => {
        $.ajax({
            // url: SkinSurvey_API_URL + surveyNo,
            url: hairSurvey_API_URL + '?surveyNo=' + surveyNo,
            type: 'GET',
            success: function (data) {
                const scalpSurvey = data[0];
                console.log("hairSurvey_API_URL 응답값 : ", scalpSurvey);

                if (scalpSurvey === undefined) {
                    console.log('문진(두피) 데이터가 없습니다.');
                    resolve(false);
                  } else {
                    resolve(scalpSurvey);
                  }
        
        
            }, error: function (xhr, status, error) {        
                console.error('hairSurvey_API_URL 오류 : ', error);
                reject(error);
            }
        })        


    });
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


            //프로그램별 방문회차 카운트 입력2 (같은날짜, 시간대 고려)
            var select_visit1_1 = 0 //다른날짜 - 마이스킨솔루션
            var select_visit1_2 = 0 //다른날짜 - 두피측정프로그램

            select_visit1_1 = response.filter(item => item.ProgramCode === "PC001013"
                && item.cancelYN !== "3"
                && localStorage.getItem('raw_rsvn_date') > item.rsvn_date).length;

            select_visit1_2 = response.filter(item => item.ProgramCode === "PC001010"
                && item.cancelYN !== "3"
                && localStorage.getItem('raw_rsvn_date') > item.rsvn_date).length;


            console.log("select_visit1_1 : ", select_visit1_1);
            console.log("select_visit1_2 : ", select_visit1_2);

            var select_visit2_1 = 0 //같은날짜 - 마이스킨솔루션
            var select_visit2_2 = 0 //같은날짜 - 두피측정프로그램

            select_visit2_1 = response.filter(item => item.ProgramCode === "PC001013"
                && item.cancelYN !== "3"
                && localStorage.getItem('raw_rsvn_date') === item.rsvn_date
                && localStorage.getItem('raw_rsvn_time') >= item.rsvn_time).length;

            select_visit2_2 = response.filter(item => item.ProgramCode === "PC001010"
                && item.cancelYN !== "3"
                && localStorage.getItem('raw_rsvn_date') === item.rsvn_date
                && localStorage.getItem('raw_rsvn_time') >= item.rsvn_time).length;

            console.log("select_visit2_1 : ", select_visit2_1);
            console.log("select_visit2_2 : ", select_visit2_2);

            visitCount = select_visit1_1 + select_visit1_2 + select_visit2_1 + select_visit2_2;
            console.log("방문 회차 : visitCount > ", visitCount);

            $('#visitCount').text(visitCount);

        },

        error: function (xhr, status, error) {
            console.error('리스트 별 고객검색 결과  에러 : ', error);
        }
    })


}






























let hairLeftHairLine_image;
let hairFrontCenter_image;
let hairFrontHairLine_image;
let hairCenter_image;
let hairRightHairLine_image;
let hairBack_image;




/** 
 * 24.06. 04 
 * @description 이미지 클릭시, 확대 팝업
 **/

$('#hairLeftHairLine-img').on('click', function () {
    console.log("좌측 헤어라인 이미지 클릭")
    $('#popup_title').text('좌측 헤어라인');
    $("#popup_image").attr("src", "data:image/jpeg;base64," + hairLeftHairLine_image);
    $('.scalp-image-layer').addClass('open');

});


$('#hairFrontCenter-img').on('click', function () {
    console.log("앞 중앙 이미지 클릭")
    $('#popup_title').text('앞 중앙');
    $("#popup_image").attr("src", "data:image/jpeg;base64," + hairFrontCenter_image);
    $('.scalp-image-layer').addClass('open');
});


$('#hairFrontHairLine-img').on('click', function () {
    console.log("앞 헤어라인 이미지 클릭")
    $('#popup_title').text('앞 헤어라인');
    $("#popup_image").attr("src", "data:image/jpeg;base64," + hairFrontHairLine_image);
    $('.scalp-image-layer').addClass('open');
});


$('#hairCenter-img').on('click', function () {
    console.log("정수리 이미지 클릭")
    $('#popup_title').text('정수리');
    $("#popup_image").attr("src", "data:image/jpeg;base64," + hairCenter_image);
    $('.scalp-image-layer').addClass('open');
});

$('#hairRightHairLine-img').on('click', function () {
    console.log("우측 헤어라인 이미지 클릭")
    $('#popup_title').text('우측 헤어라인');
    $("#popup_image").attr("src", "data:image/jpeg;base64," + hairRightHairLine_image);
    $('.scalp-image-layer').addClass('open');
});


$('#hairBack-img').on('click', function () {
    console.log("후두부 이미지 클릭")
    $('#popup_title').text('후두부');
    $("#popup_image").attr("src", "data:image/jpeg;base64," + hairBack_image);
    $('.scalp-image-layer').addClass('open');
});
















/** 
 * 24.05. 08 
 * @description 
 **/
$(document).ready(function () {



    /*
    ******************* hair Density Type 팝업창 **********************
    */


    $('#HairlossType_Basic').on('click', function () {
        $('.search-result-layer').addClass('open');
    });

    $('#HairlossType_Center').on('click', function () {
        $('.search-result-layer').addClass('open');
    });

    $('#HairlossType_FrontCenter').on('click', function () {
        $('.search-result-layer').addClass('open');
    });

    if (localStorage.getItem('custom_sex') === "F") {
        $('#Image1').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic01.png');
        $('#Image2').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic02.png');
        $('#Image3').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic03.png');
        $('#Image4').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic04.png');
        $('#Image5').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic05.png');
        $('#Image6').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic06.png');
        $('#Image7').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic07.png');

        $('#Image8').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic08.png');
        $('#Image9').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic09.png');
        $('#Image10').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic10.png');
        $('#Image11').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic11.png');

        $('#Image1-special').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-spe1-01.png');
        $('#Image2-special').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-spe1-02.png');
        $('#Image3-special').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-spe1-03.png');
        $('#Image4-special').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-spe2-01.png');
        $('#Image5-special').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-spe2-02.png');
        $('#Image6-special').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-spe2-03.png');


    } else if (localStorage.getItem('custom_sex') === "M") {
        $('#Image1').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic01-m.png');
        $('#Image2').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic02-m.png');
        $('#Image3').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic03-m.png');
        $('#Image4').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic04-m.png');
        $('#Image5').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic05-m.png');
        $('#Image6').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic06-m.png');
        $('#Image7').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic07-m.png');

        $('#Image8').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic08-m.png');
        $('#Image9').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic09-m.png');
        $('#Image10').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic10-m.png');
        $('#Image11').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-basic11-m.png');

        $('#Image1-special').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-spe1-01-m.png');
        $('#Image2-special').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-spe1-02-m.png');
        $('#Image3-special').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-spe1-03-m.png');
        $('#Image4-special').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-spe2-01-m.png');
        $('#Image5-special').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-spe2-02-m.png');
        $('#Image6-special').attr('src', './resource/images/scalp/LossTypesPopup/loss-popup-spe2-03-m.png');


    }


});








































/*
******************* 이후 차트 생성 **********************
*/





/** 
 * 24.05. 11
 * @description 모발 굵기 차트(생성 후, 더미데이터 값)
 **/
var thicknessData = {
    labels: ['좌 ①', '앞 ②', '우 ③', '앞중앙 ④', '정수리 ⑤', '후두부 ⑥'],
    datasets: [{
        label: '굵기(mm)',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(200, 200, 200, 0.8)',
        borderColor: 'rgba(200, 200, 200, 1)',
        borderWidth: 1
    }]
}

var ctx = document.getElementById('thicknessChart').getContext('2d');
var thicknessChart = new Chart(ctx, {
    type: 'bar',
    data: thicknessData,
    plugins: [ChartDataLabels],
    options: {
        responsive: false,
        indexAxis: 'y',
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 0.15,
                ticks: {
                    stepSize: 0.075
                },
                grid: {
                    borderDash: [5, 5],
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        // onRender: function(chart){
        //     var ctx = chart.ctx;
        //     chart.data.datasets.array.forEach(function(dataset, datasetIndex) {
        //         var meta = chart.getDatasetMeta (datasetIndex);
        //         meta.data.forEach(function(bar,index){
        //             var data = dataset.data[index];
        //             ctx.fillStyle = '#000';
        //             ctx.font = '12px Arial';
        //             ctx.textAlign = 'center';
        //             ctx.textBaseline = 'bottom';
        //             ctx.fillText(data, bar.x, bar.y -5);
        //         });                    
        //     });
        // }
    }
});

/** 
 * 24.05. 11
 * @description API통신을 통한 실제 고객 모발굵기 업데이트
 **/
function updateThicknessData(index, thicknessValue) {
    thicknessData.datasets[0].data[index] = thicknessValue;
    thicknessChart.update();
}




/** 
 * 24.05. 11
 * @description 모발 밀도 차트(생성 후, 더미데이터 값)
 **/
var densityData = {
    labels: ['좌 ①', '앞 ②', '우 ③', '앞중앙 ④', '정수리 ⑤', '후두부 ⑥'],
    datasets: [{
        label: '밀도(hairs/㎠)',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(200, 200, 200, 0.8)',
        borderColor: 'rgba(200, 200, 200, 1)',
        borderWidth: 1
    }]
}

var ctx2 = document.getElementById('densityChart').getContext('2d');
var densityChart = new Chart(ctx2, {
    type: 'bar',
    data: densityData,
    plugins: [ChartDataLabels],
    options: {
        responsive: false,
        indexAxis: 'y',
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 240,
                ticks: {
                    stepSize: 120
                },
                grid: {
                    borderDash: [5, 5],
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                // afterBulidTicks: function(scale, ticks){
                //     var newTicks = ticks.slice();
                //     newTicks.push(100);
                //     return newTicks;
                // }
            },
            y: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
        },
    }
});

/** 
 * 24.05. 11
 * @description API통신을 통한 실제 고객 모발밀도 업데이트
 **/
function updateDensityData(index, densityValue) {
    densityData.datasets[0].data[index] = densityValue;
    densityChart.update();
}





/** 
 * 24.05. 14
 * @description 모발 밀도&굵기 scatter 차트(생성 후, 더미데이터 값)
 **/
var scatterData = {
    datasets: [{
        label: '',
        data: [
            { x: 0.08, y: 120, label: '① 좌' },
            { x: 0.08, y: 120, label: '② 앞' },
            { x: 0.08, y: 120, label: '③ 우' },
            { x: 0.08, y: 120, label: '④ 앞중앙' },
            { x: 0.08, y: 120, label: '⑤ 정수리' },
            { x: 0.08, y: 120, label: '⑥ 후두부' }
        ],
        backgroundColor: [
            '#e5b9d5',
            '#f17229',
            '#fbca36',
            '#6abe9f',
            '#a9e5fb',
            '#8749a0'
        ], // 데이터 포인트 색상
        pointRadius: 8,
        pointHoverRadius: 10
    }]
}

var ctx_scatterChart = document.getElementById('scatterChart').getContext('2d');
var scatterChart = new Chart(ctx_scatterChart, {
    type: 'scatter',
    data: scatterData,
    options: {
        responsive: false, //그래프 사이즈 자동 변경 안되도록 수정
        plugins: {
            annotation: {
                annotations: {
                    circle: {
                        type: 'ellipse',
                        xMin: 0.045,
                        xMax: 0.085,
                        yMin: 40,
                        yMax: 100,
                        backgroundColor: 'rgba(255, 192, 203, 0.3)', // 원형 영역 색상
                        borderColor: 'transparent',
                        borderWidth: 0
                    }
                }
            },
            legend: {
                display: false // 범례 숨기기
            },
            tooltip: {

                callbacks: {
                    label: function (context) {
                        return context.dataset.data[context.dataIndex].label;
                    },
                },
                enabled: true
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '굵기',
                    font: {
                        size: 14
                    }
                },
                min: 0,
                max: 0.15,
                ticks: {
                    stepSize: 0.075
                },
                grid: {
                    color: '#ddd',
                    borderDash: [5, 5]
                }
            },
            y: {
                title: {
                    display: true,
                    text: '밀도',
                    font: {
                        size: 14
                    }
                },
                min: 0,
                max: 240,
                ticks: {
                    stepSize: 120
                },
                grid: {
                    color: '#ddd',
                    borderDash: [5, 5]
                }
            }
        },

        elements: {
            point: {
                borderWidth: 0, // 데이터 포인트 테두리 제거
            }
        },
        layout: {
            padding: {
                right: 30 // 오른쪽 여백 조정
            }
        },
    },
    // plugins: [ChartDataLabels]
});

/** 
 * 24.05. 14
 * @description API통신을 통한 실제 모발 밀도&굵기 scatter업데이트
 **/
function updateScatterData(index, thicknessValue, densityValue) {
    scatterData.datasets[0].data[index].x = thicknessValue;
    scatterData.datasets[0].data[index].y = densityValue;
    scatterChart.update();
}




//스카터 차트 대가리 붙이기.

// var scatterData = {
//     datasets: [{
//         label: '',
//         data: [
//             { x: 0.077, y: 50, label: '① 좌' },
//             { x: 0.065, y: 90, label: '② 앞' },
//             { x: 0.06, y: 70, label: '③ 우' },
//             { x: 0.065, y: 40, label: '④ 앞중앙' },
//             { x: 0.07, y: 75, label: '⑤ 정수리' },
//             { x: 0.07, y: 75, label: '⑥ 후두부' }
//         ],
//         backgroundColor: [
//             '#e5b9d5',
//             '#f17229',
//             '#fbca36',
//             '#6abe9f',
//             '#a9e5fb',
//             '#8749a0'
//         ], // 데이터 포인트 색상
//         pointRadius: 8,
//         pointHoverRadius: 10
//     }]
// };

// var ctx_scatterChart = document.getElementById('scatterChart').getContext('2d');
// var scatterChart = new Chart(ctx_scatterChart, {
//     type: 'scatter',
//     data: scatterData,
//     options: {
//         responsive: false, //그래프 사이즈 자동 변경 안되도록 수정
//         plugins: {
//             annotation: {
//                 annotations: {
//                     circle: {
//                         type: 'ellipse',
//                         xMin: 0.045,
//                         xMax: 0.085,
//                         yMin: 40,
//                         yMax: 100,
//                         backgroundColor: 'rgba(255, 192, 203, 0.3)', // 원형 영역 색상
//                         borderColor: 'transparent',
//                         borderWidth: 0
//                     }
//                 }
//             },
//             legend: {
//                 display: false // 범례 숨기기
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function (context) {
//                         return context.dataset.data[context.dataIndex].label;
//                     },
//                 },
//                 enabled: true
//             },
//         },
//         scales: {
//             x: {
//                 title: {
//                     display: true,
//                     text: '굵기',
//                     font: {
//                         size: 14
//                     }
//                 },
//                 min: 0,
//                 max: 0.15,
//                 ticks: {
//                     stepSize: 0.075
//                 },
//                 grid: {
//                     color: '#ddd',
//                     borderDash: [5, 5]
//                 }
//             },
//             y: {
//                 title: {
//                     display: true,
//                     text: '밀도',
//                     font: {
//                         size: 14
//                     }
//                 },
//                 min: 0,
//                 max: 240,
//                 ticks: {
//                     stepSize: 120
//                 },
//                 grid: {
//                     color: '#ddd',
//                     borderDash: [5, 5]
//                 }
//             }
//         },
//         elements: {
//             point: {
//                 borderWidth: 0, // 데이터 포인트 테두리 제거
//             }
//         },
//         layout: {
//             padding: {
//                 right: 30 // 오른쪽 여백 조정
//             }
//         },
//     },
//     plugins: [{
//         id: 'pointLabels',
//         afterDatasetsDraw: function(chart) {
//             const ctx = chart.ctx;
//             chart.data.datasets.forEach(function(dataset) {
//                 dataset.data.forEach(function(point, index) {
//                     const x = chart.scales.x.getPixelForValue(point.x);
//                     const y = chart.scales.y.getPixelForValue(point.y);
//                     const labelX = x + 10;
//                     const labelY = y - 10;

//                     // Draw line from point to label
//                     ctx.beginPath();
//                     ctx.moveTo(x, y);
//                     ctx.lineTo(labelX, labelY);
//                     ctx.strokeStyle = 'rgba(0,0,0,0.5)';
//                     ctx.stroke();

//                     // Draw label
//                     ctx.fillStyle = 'black';
//                     ctx.font = '12px Arial';
//                     ctx.fillText(point.label, labelX, labelY);
//                 });
//             });
//         }
//     }]
// });

// /** 
//  * 24.05. 14
//  * @description API통신을 통한 실제 모발 밀도&굵기 scatter업데이트
//  **/
// function updateScatterData(index, thicknessValue, densityValue) {
//     scatterData.datasets[0].data[index].x = thicknessValue;
//     scatterData.datasets[0].data[index].y = densityValue;
//     scatterChart.update();
// }















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



function showErrorModal() {
    $('.search-result-layer-error').addClass('open');
    // console.log("안내 모달창");
}

