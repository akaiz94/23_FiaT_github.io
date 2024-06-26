var ReservedCustom_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/progress_flg/';
var DirectCustom_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/direct/progress_flg/';

var Main_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/merged/list'; //방문회차 카운트

var ResultMarkvu_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/skin/markvu/result/';
var ResultVapometer_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/skin/vapometer/';
var ResultCutometer_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/skin/cutometer/';
var SkinSurvey_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/svy/skin/';  // 피부설문


var skin_result_URL = 'https://amore-citylab.amorepacific.com:8000/v1/skin/result/';
var ResultSkinConcern_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/skin/concern/';

var SkinMarkvuCapture_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/skin/markvu/capture/';

const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
const surveyDate = moment().format('YYYY/MM/DD');





//T존 값 전역 변수
var tzone_subun_value;
var tzone_ubun_value;
var t_zone_subun;
var t_zone_ubun;

//U존 값 전역 변수
var uzone_subun_value;
var uzone_ubun_value;
var u_zone_subun;
var u_zone_ubun;

var markvu;

var t_zone_position_num_input = 0; // T존 위치
var u_zone_position_num_input = 0; // U존 위치



$(document).ready(function () {
  window.scrollTo(0, 470);
  console.log('analysis_result page start -> ')

  if (localStorage.getItem('custom_surveyNo') === null) {
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
  // if (localStorage.getItem('progress_flg') !== '10') {
  //   //직접 방문 고객의 상담 진행률
  //   if (localStorage.getItem('visitkey') === '0' && localStorage.getItem('custom_skinResult') !== 'ok') {
  //     console.log("직방 고객 상담 진행률 체크")
  //     $.ajax({
  //       url: DirectCustom_API_URL + localStorage.getItem('skey'),
  //       type: 'PATCH',
  //       data: JSON.stringify({ "progress_flg": "107" }), //피부상담 진행중
  //       contentType: 'application/json',

  //       success: function (response) {
  //         console.log('=====================');
  //         console.log('피부상담 인입 성공 : ', response);
  //       },

  //       error: function (xhr, status, error) {
  //         console.error('피부상담 인입 에러 : ', error);
  //       }
  //     })
  //   }
  //   //예약 방문 고객의 상담 진행률
  //   else if (localStorage.getItem('visitkey') !== '0' && localStorage.getItem('custom_skinResult') !== 'ok') {
  //     console.log("예약 고객 상담 진행률 체크")
  //     $.ajax({
  //       url: ReservedCustom_API_URL + localStorage.getItem('visitkey') + '/' + localStorage.getItem('skey'),
  //       type: 'PATCH',
  //       data: JSON.stringify({ "progress_flg": "107" }), //피부문진 진행중
  //       contentType: 'application/json',

  //       success: function (response) {
  //         console.log('=====================');
  //         console.log('피부 문진 인입 성공 : ', response);
  //       },

  //       error: function (xhr, status, error) {
  //         console.error('피부 문진 인입 에러 : ', error);
  //       }
  //     })
  //   }
  // }



  $('#visitDate').text(localStorage.getItem('visit_rsvn_date'));



  fnGetVisitCount();//방문회차 카운트 함수
  fnGetMarkvuCapture(localStorage.getItem('custom_surveyNo')); //마크뷰 캡처 이미지 함수


  var surveyNo = localStorage.getItem('custom_surveyNo');
  var custom_sex = localStorage.getItem('custom_sex');

  $('#manager_name').text(localStorage.getItem('manager_name'));
  $('#custom_name').text(localStorage.getItem('custom_name'));

  if (localStorage.getItem('manager_name').length === 2) {
    // $("#title_date").css("margin-right","90px");   
    document.getElementById("title_date").style.marginRight = "90px";
    document.getElementById("title_count").style.marginRight = "145px";
  }


  //페이지 내 opinion
  $('#comment01_main').val(localStorage.getItem('analysis_result-comment01'));
  $('#comment02_main').val(localStorage.getItem('analysis_result-comment02'));
  $('#comment03_main').val(localStorage.getItem('analysis_result-comment03'));

  //모달창 내 opinion
  $('#comment01').val(localStorage.getItem('analysis_result-comment01'));
  $('#comment02').val(localStorage.getItem('analysis_result-comment02'));
  $('#comment03').val(localStorage.getItem('analysis_result-comment03'));


  async function getAllDataAndSetSkinScore(surveyNo) {
    try {
      const [get_makvu, get_vapometer, get_cutometer, get_skinsurvey] = await Promise.all([
        fnGetMarkvu(surveyNo),
        fnGetVapometer(surveyNo),
        fnGetCutometer(surveyNo),
        fnGetSkinSurvey(surveyNo)
      ]);
      localStorage.getItem('ProgramCode')

      if (!get_skinsurvey) {
        console.log("문진(피부) 데이터 확인불가.");
        $("#noData_text").html('문진(피부)를 먼저 작성해야합니다.');
        $("#noData_text2").html('잠시후 문진(피부) 페이지로 이동합니다.');
        $('.msg-layer-noData').addClass('open');

        setTimeout(function () {
          $('.layer-wrap-noData').removeClass('open');
          // window.location.href = './solution_questionnaire.html';;   // 문진(피부) 측정 페이지로 이동
        }, 2000); // 2초 

        return;
      }


      if (!get_makvu) {
        console.log("마크뷰 데이터 확인불가.");
        $("#noData_text").html('MARK-VU 측정이 완료되지 않았습니다.');
        $("#noData_text2").html('잠시후 피부 측정 페이지로 이동합니다.');
        $('.msg-layer-noData').addClass('open');

        setTimeout(function () {
          $('.layer-wrap-noData').removeClass('open');
          // window.location.href = './analysis.html';;   // 피부측정 페이지로 이동
        }, 2000); // 2초 

        return;
      }

      if (!get_vapometer) {
        console.log("바포미터 데이터 확인불가.");
        $("#noData_text").html('Vapometer 측정이 완료되지 않았습니다.');
        $("#noData_text2").html('잠시후 피부 측정 페이지로 이동합니다.');
        $('.msg-layer-noData').addClass('open');

        setTimeout(function () {
          $('.layer-wrap-noData').removeClass('open');
          // window.location.href = './analysis.html';;   // 피부측정 페이지로 이동
        }, 2000); // 2초 

        return;
      }

      if (!get_cutometer) {
        const programCode = localStorage.getItem('ProgramCode');
        if (programCode === "PC001013") {
          console.log("큐토미터 데이터 확인불가.");
          $("#noData_text").html('Cutometer 측정이 완료되지 않았습니다.');
          $("#noData_text2").html('잠시후 피부 측정 페이지로 이동합니다.');
          $('.msg-layer-noData').addClass('open');

          setTimeout(function () {
            $('.layer-wrap-noData').removeClass('open');
            // window.location.href = './analysis.html';;   // 피부측정 페이지로 이동
          }, 2000); // 2초 




          alert("큐토미터 측정이 완료되지 않았습니다.");
          // window.location.href = './analysis.html';  // 큐토미터 측정 페이지로 이동
          return;
        }
      }

      setSkinScore(get_makvu, get_vapometer, get_cutometer, get_skinsurvey, 'I');
    } catch (error) {
      console.error('Error:', error);
    }
  }
  // 함수 호출
  getAllDataAndSetSkinScore(surveyNo);

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

  // ###opinion 쪽 이미지 보여지는 코드!!!!
  if (typeof (localStorage.getItem('analysis_result-opinionCanvas')) === 'string') {
    console.log("stinrg이야")
    $('#opinionsImage').attr('src', localStorage.getItem('analysis_result-opinionCanvas')); //(페이지) 이미지
    $('#backgroundImage').attr('src', localStorage.getItem('analysis_result-backgroundCanvas'));//(페이지) 백그라운드 이미지

    opinionImage.src = localStorage.getItem('analysis_result-opinionCanvas'); //(모달창) 캔버스(이미지)
    backgroundImage.src = localStorage.getItem('analysis_result-backgroundCanvas'); //(모달창) 캔버스(이미지)
  } else {
    console.log("stinrg이 아니래")


    if (custom_sex === 'F') {
      $('#opinionsImage').attr('src', './resource/images/img-report001-F.png');
      $('#backgroundImage').attr('src', '');
      backgroundImage.src = './resource/images/img-report001-F.png';
    } else if (custom_sex === 'M') {
      $('#opinionsImage').attr('src', './resource/images/img-report001-M.png');
      $('#backgroundImage').attr('src', '');
      backgroundImage.src = './resource/images/img-report001-M.png';

    }
  }

  $.ajax({
    url: skin_result_URL + '?surveyNo=' + localStorage.getItem('custom_surveyNo'),
    type: 'GET',
    contentType: 'application/json',

    success: function (response) {
      console.log("skin_result_URL 응답값 : ", response);
      console.log("skin_result_URL  길이 : ", response.length);

      if (response.length === 0) {
        console.log("DB내, 이미지,코멘트 데이터가 존재하지않음")
        //DB내, 데이터가 존재하지않음      


      } else {
        console.log("DB내, 이미지,코멘트 데이터가 존재함")
        //DB내, 데이터가 존재

        console.log('response[0].specialtip_img : ', response[0].specialtip_img);

        $('#backgroundImage').attr('src',"data:image/jpeg;base64," +  response[0].specialtip_img);//(페이지) 백그라운드 이미지
        $('#opinionsImage').attr('src',"data:image/jpeg;base64," +  response[0].specialtip_stoke_img); //(페이지) 이미지
       

        localStorage.setItem('analysis_result-opinionCanvas', response[0].specialtip_stoke_img)//(페이지) 이미지
        localStorage.setItem('analysis_result-backgroundCanvas', response[0].specialtip_img)//(페이지) 백그라운드이미지

        localStorage.setItem('analysis_result-comment01', response[0].specialtip_memo);
        localStorage.setItem('analysis_result-comment02', response[0].specialtip_memo2);
        localStorage.setItem('analysis_result-comment03', response[0].specialtip_memo3);

        $('#comment01_main').val(localStorage.getItem('analysis_result-comment01'));
        $('#comment02_main').val(localStorage.getItem('analysis_result-comment02'));
        $('#comment03_main').val(localStorage.getItem('analysis_result-comment03'));




      }

    }, error: function (xhr, status, error) {
      console.error('skin_result_URL 오류 : ', error);
    }
  })





 
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




  //opinion 저장
  $('#custom_info_saveButton').on('click', function (event) {

    console.log("저장 버튼 클릭");

    localStorage.setItem('analysis_result-opinionCanvas', opinionCanvas.toDataURL());
    localStorage.setItem('analysis_result-backgroundCanvas', backgroundCanvas.toDataURL());

    $('#opinionsImage').attr('src', localStorage.getItem('analysis_result-opinionCanvas')); //(페이지) 이미지
    $('#backgroundImage').attr('src', localStorage.getItem('analysis_result-backgroundCanvas'));//(페이지) 백그라운드 이미지

    localStorage.setItem('analysis_result-comment01', $('#comment01').val());
    localStorage.setItem('analysis_result-comment02', $('#comment02').val());
    localStorage.setItem('analysis_result-comment03', $('#comment03').val());
    console.log('localStorage.getItem : ', localStorage.getItem('analysis_result-comment01'));

    $('#comment01_main').val(localStorage.getItem('analysis_result-comment01'));
    $('#comment02_main').val(localStorage.getItem('analysis_result-comment02'));
    $('#comment03_main').val(localStorage.getItem('analysis_result-comment03'));

    $('.user-modify-layer').removeClass('open');



    console.log("==============================");
    console.log("analysis2_result_save 저장 버튼 클릭 효과!!22");

    console.log("opinionsImageSrc:", localStorage.getItem('analysis_result-opinionCanvas'));
    console.log("backgroundImageSrc:", localStorage.getItem('analysis_result-backgroundCanvas'));


    console.log("custom_userkey", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo", localStorage.getItem('custom_surveyNo'));

    console.log("analysis_result-comment01", localStorage.getItem('analysis_result-comment01'));
    console.log("analysis_result-comment02", localStorage.getItem('analysis_result-comment02'));
    console.log("analysis_result-comment03", localStorage.getItem('analysis_result-comment03'));


    var requestData = {
      "surveyNo": localStorage.getItem('custom_surveyNo'),
      "userKey": localStorage.getItem('custom_userkey'),
      "surveyDate": surveyDate,
      "name": localStorage.getItem('custom_name'),

      "skin_score": skin_score,
      "skin_gomin": selected_subdata + selected_subdata2,
      "IsComplexity": null, //추후 체크필요
      "t_zone_result": t_zone_result,
      "t_zone_position_num": t_zone_position_num_input, //추후 체크필요
      "u_zone_result": u_zone_result,
      "u_zone_position_num": u_zone_position_num_input, //추후 체크필요


      "fizpatrick_color_point": 0,
      "solution_type_number": "",
      "sensitive_type_number": "",
      "specialtip_img": localStorage.getItem('analysis_result-backgroundCanvas'),
      "specialtip_stoke_img": localStorage.getItem('analysis_result-opinionCanvas'),
      "specialtip_memo": localStorage.getItem('analysis_result-comment01'),
      "specialtip_memo2": localStorage.getItem('analysis_result-comment02'),
      "specialtip_memo3": localStorage.getItem('analysis_result-comment03'),
      "manager_value": localStorage.getItem('manager_name'),
      "create_dt": currentTime,
      "update_dt": currentTime,
      "idx": null,
      "total_count": 1
    }


    var requestData2 = {
      "surveyNo": localStorage.getItem('custom_surveyNo'),
      "userKey": localStorage.getItem('custom_userkey'),
      "name": localStorage.getItem('custom_name'),

      "pore": rsr_list.pore,
      "wrinkle": rsr_list.wrinkle,
      "futurewrinkles": rsr_list.futurewrinkles,
      "pigmentation": rsr_list.pigmentation,
      "melanin": rsr_list.melanin,
      "darkcircles": rsr_list.darkcircles,
      "transdermal": rsr_list.transdermal,
      "redness": rsr_list.redness,
      "porphyrin": rsr_list.porphyrin,
      "elasticity": rsr_list.elasticity,

      "tZone_Moisture": t_zone_subun,
      "tZone_Oilskin": t_zone_ubun,
      "uZone_Moisture": u_zone_subun,
      "uZone_Oilskin": u_zone_ubun,

      "create_dt": currentTime,
      "update_dt": currentTime,
      "idx": null,
      "total_count": 1
    }





    console.log("analysis_result requestData : ", requestData);
    console.log("==================================");
    console.log("analysis_result requestData2 : ", requestData2);

    ResultSkinConcern_API_URL
    $.ajax({
      url: skin_result_URL,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestData),

      success: function (response) {
        console.log("skin_result_URL 응답값 : ", response);


        $.ajax({
          url: ResultSkinConcern_API_URL,
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(requestData2),

          success: function (response) {
            console.log("ResultSkinConcern_API_URL 응답값 : ", response);
            $("#custom_detail_main").html("Opinions & 피부 결과 저장 완료");
            showErrorModal();




            //상담 완료가 아닐경우 (상담완료는 진행률 이미 100%)
            if (localStorage.getItem('progress_flg') !== '10') {
              //직접 방문 고객의 상담 진행률
              if (localStorage.getItem('visitkey') === '0') {
                $.ajax({
                  url: DirectCustom_API_URL + localStorage.getItem('skey'),
                  type: 'PATCH',
                  data: JSON.stringify({ "progress_flg": "108" }), //피부상담 완료 
                  contentType: 'application/json',

                  success: function (response) {
                    console.log('=====================');
                    console.log('피부상담 완료 인입 성공 : ', response);
                    localStorage.setItem('custom_skinResult', 'ok');
                  },

                  error: function (xhr, status, error) {
                    console.error('피부상담 완료 인입 에러 : ', error);
                  }
                })
              }
              //예약 방문 고객의 상담 진행률
              else if (localStorage.getItem('visitkey') !== '0') {
                $.ajax({
                  url: ReservedCustom_API_URL + localStorage.getItem('visitkey') + '/' + localStorage.getItem('skey'),
                  type: 'PATCH',
                  data: JSON.stringify({ "progress_flg": "108" }), //피부문진 진행중
                  contentType: 'application/json',

                  success: function (response) {
                    console.log('=====================');
                    console.log('피부 문진 인입 성공 : ', response);
                  },

                  error: function (xhr, status, error) {
                    console.error('피부 문진 인입 에러 : ', error);
                  }
                })
              }
            }





          }, error: function (xhr, status, error) {
            console.error('ResultSkinConcern_API_URL 오류 : ', error);
            $("#custom_detail_main").html("skin_concern 저장 실패");
            showErrorModal();
          }
        })


      }, error: function (xhr, status, error) {
        console.error('skin_result_URL 오류 : ', error);
        $("#custom_detail_main").html("skin_result 저장 실패");
        showErrorModal();
      }
    })



  })


});




//#1st. 마크뷰 요청
function fnGetMarkvu(surveyNo) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: ResultMarkvu_API_URL + '?surveyNo=' + surveyNo, //실 운영
      // url: ResultMarkvu_API_URL + '?surveyNo=' + 2277, //마크뷰 테스트 데이터
      type: 'GET',
      success: function (data) {
        //console.log('ResultMarkvu_API_URL 응답 : ', data);
        markvu = data[0];
        console.log("ResultMarkvu_API_URL 응답값 : ", markvu);


        if (markvu === undefined) {
          console.log('마크뷰 데이터가 없습니다.');
          resolve(false);
        } else {
          // T존
          tzone_subun_value = markvu.FSubun_A;
          tzone_ubun_value = (markvu.FSebum_A + markvu.FSebum_B) / 2;
          t_zone_subun = tzone_subun_value;
          t_zone_ubun = tzone_ubun_value;

          $('#t_zone_subun-val').text(t_zone_subun);
          $('#t_zone_ubun-val').text(t_zone_ubun);

          // U존
          uzone_subun_value = (markvu.FSubun_G + markvu.FSubun_H) / 2;
          uzone_ubun_value = (markvu.FSebum_G + markvu.FSebum_H) / 2;
          u_zone_subun = uzone_subun_value;
          u_zone_ubun = uzone_ubun_value;
          $('#u_zone_subun-val').text(u_zone_subun);
          $('#u_zone_ubun-val').text(u_zone_ubun);

          // T존 수분/유분 결과 계산
          var tzone_subun_result = null;
          var tzone_ubun_result = null;
          var t_zone_position_num = null;

          if (tzone_subun_value < 20) {
            tzone_subun_result = "수분부족";
          } else if (20 <= tzone_subun_value && tzone_subun_value < 40) {
            tzone_subun_result = "수분적당";
          } else if (40 <= tzone_subun_value) {
            tzone_subun_result = "수분충분";
          }

          if (tzone_ubun_value < 9) {
            tzone_ubun_result = "유분부족";
          } else if (9 <= tzone_ubun_value && tzone_ubun_value < 19) {
            tzone_ubun_result = "유분적당";
          } else if (19 <= tzone_ubun_value) {
            tzone_ubun_result = "유분과다";
          }

          if (tzone_subun_result == "수분부족" && tzone_ubun_result == "유분과다") {
            t_zone_position_num = 1;
            t_zone_result = "수분부족 유분과다 지성";
          }
          if (tzone_subun_result == "수분부족" && tzone_ubun_result == "유분적당") {
            t_zone_position_num = 2;
            t_zone_result = "수분 부족 건성";
          }
          if (tzone_subun_result == "수분부족" && tzone_ubun_result == "유분부족") {
            t_zone_position_num = 3;
            t_zone_result = "유수분 부족 건성";
          }
          if (tzone_subun_result == "수분적당" && tzone_ubun_result == "유분과다") {
            t_zone_position_num = 4;
            t_zone_result = "유분 과다 지성";
          }
          if (tzone_subun_result == "수분적당" && tzone_ubun_result == "유분적당") {
            t_zone_position_num = 5;
            t_zone_result = "유수분 균형 중성";
          }
          if (tzone_subun_result == "수분적당" && tzone_ubun_result == "유분부족") {
            t_zone_position_num = 6;
            t_zone_result = "유분 부족 건성";
          }
          if (tzone_subun_result == "수분충분" && tzone_ubun_result == "유분과다") {
            t_zone_position_num = 7;
            t_zone_result = "유분 과다 지성";
          }
          if (tzone_subun_result == "수분충분" && tzone_ubun_result == "유분적당") {
            t_zone_position_num = 8;
            t_zone_result = "유수분 균형 중성";
          }
          if (tzone_subun_result == "수분충분" && tzone_ubun_result == "유분부족") {
            t_zone_position_num = 9;
            t_zone_result = "유분 부족 건성";
          }

          console.log('********* t_zone_position_num  > ', t_zone_position_num);
          t_zone_position_num_input = t_zone_position_num;

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

          var uzone_subun_result = null;
          var uzone_ubun_result = null;
          var u_zone_position_num = null;

          if (uzone_subun_value < 20) {
            uzone_subun_result = "수분부족";
          } else if (20 <= uzone_subun_value && uzone_subun_value < 40) {
            uzone_subun_result = "수분적당";
          } else if (40 <= uzone_subun_value) {
            uzone_subun_result = "수분충분";
          }

          if (uzone_ubun_value <= 5.5) {
            uzone_ubun_result = "유분부족";
          } else if (5.5 < uzone_ubun_value && uzone_ubun_value < 12) {
            uzone_ubun_result = "유분적당";
          } else if (12 <= uzone_ubun_value) {
            uzone_ubun_result = "유분과다";
          }

          if (uzone_subun_result == "수분부족" && uzone_ubun_result == "유분과다") {
            u_zone_position_num = 1;
            u_zone_result = "수분부족 유분과다 지성";
          }
          if (uzone_subun_result == "수분부족" && uzone_ubun_result == "유분적당") {
            u_zone_position_num = 2;
            u_zone_result = "수분 부족 건성";
          }
          if (uzone_subun_result == "수분부족" && uzone_ubun_result == "유분부족") {
            u_zone_position_num = 3;
            u_zone_result = "유수분 부족 건성";
          }
          if (uzone_subun_result == "수분적당" && uzone_ubun_result == "유분과다") {
            u_zone_position_num = 4;
            u_zone_result = "유분 과다 지성";
          }
          if (uzone_subun_result == "수분적당" && uzone_ubun_result == "유분적당") {
            u_zone_position_num = 5;
            u_zone_result = "유수분 균형 중성";
          }
          if (uzone_subun_result == "수분적당" && uzone_ubun_result == "유분부족") {
            u_zone_position_num = 6;
            u_zone_result = "유분 부족 건성";
          }
          if (uzone_subun_result == "수분충분" && uzone_ubun_result == "유분과다") {
            u_zone_position_num = 7;
            u_zone_result = "유분 과다 지성";
          }
          if (uzone_subun_result == "수분충분" && uzone_ubun_result == "유분적당") {
            u_zone_position_num = 8;
            u_zone_result = "유수분 균형 중성";
          }
          if (uzone_subun_result == "수분충분" && uzone_ubun_result == "유분부족") {
            u_zone_position_num = 9;
            u_zone_result = "유분 부족 건성";
          }

          console.log('********* u_zone_position_num  > ', u_zone_position_num);
          t_zone_position_num_input = u_zone_position_num;

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

          $('#t_zone_result').text(t_zone_result);
          $('#u_zone_result').text(u_zone_result);

          updateTZoneData(t_zone_subun, t_zone_ubun);
          updateUZoneData(u_zone_subun, u_zone_ubun);

          resolve(markvu);
        }
      },
      error: function (xhr, status, error) {
        console.error('ResultMarkvu_API_URL 응답 오류: ', error);
        reject(error);
      }
    });
  });
}



let get_markvu_capture = [];

//마크뷰 이미지 가져오기
function fnGetMarkvuCapture(surveyNo) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: SkinMarkvuCapture_API_URL + '?surveyNo=' + surveyNo + '&pageSize=1000',
      type: 'GET',
      contentType: 'application/json',

      success: function (response) {
        console.log("SkinMarkvuCapture_API_URL 응답값 : ", response);
        console.log("SkinMarkvuCapture_API_URL  길이 : ", response.length);


        get_markvu_capture = response;
        console.log('get_markvu_capture : ', get_markvu_capture);


      }, error: function (xhr, status, error) {
        console.error('SkinMarkvuCapture_API_URL 오류 : ', error);
      }
    });
  })
}




//#2nd. 바포미터 요청(경피수분손실도 값)
function fnGetVapometer(surveyNo) {
  return new Promise((resolve, reject) => {
    $.ajax({
      // url: ResultVapometer_API_URL + surveyNo,
      url: ResultVapometer_API_URL + '?surveyNo=' + surveyNo,
      type: 'GET',
      success: function (data) {
        const vapometer = data[0];
        console.log("ResultVapometer_API_URL 응답값 : ", vapometer);

        if (vapometer === undefined) {
          console.log('바포미터 데이터가 없습니다.');
          resolve(false);
        } else {
          resolve(vapometer);
        }
      },
      error: function (xhr, status, error) {
        console.error('ResultVapometer_API_URL 오류 : ', error);
        reject(error);
      }
    });
  });
}




//#3rd. 큐토미터 요청(탄력 값)       

function fnGetCutometer(surveyNo) {
  return new Promise((resolve, reject) => {
    $.ajax({
      // url: ResultVapometer_API_URL + surveyNo,
      url: ResultCutometer_API_URL + '?surveyNo=' + surveyNo,
      type: 'GET',
      success: function (data) {
        const cutometer = data[0];
        console.log("ResultCutometer_API_URL 응답값 : ", cutometer);

        if (cutometer === undefined) {
          console.log('큐토미터 데이터가 없습니다.');
          resolve(false);
        } else {
          resolve(cutometer);
        }
      },
      error: function (xhr, status, error) {
        console.error('ResultCutometer_API_URL 오류 : ', error);
        reject(error);
      }
    });
  });
}


//#4th. 문진(피부) 요청
function fnGetSkinSurvey(surveyNo) {
  return new Promise((resolve, reject) => {
    $.ajax({
      // url: SkinSurvey_API_URL + surveyNo,
      url: SkinSurvey_API_URL + '?surveyNo=' + surveyNo,
      type: 'GET',
      success: function (data) {
        const skinsurvey = data[0];
        console.log("SkinSurvey_API_URL 응답값 : ", skinsurvey);

        // ###모든 데이터값 매핑 함수!

        if (skinsurvey === undefined) {
          console.log('피부 문진 데이터가 없습니다.');
          resolve(false);
        } else {
          resolve(skinsurvey);
        }
      },
      error: function (xhr, status, error) {
        console.error('SkinSurvey_API_URL 오류 : ', error);
        reject(error);
      }
    });
  });
}





/*
*
* analysis_result 데이터 값 저장
* *
* */
$('#analysis_result_save').on('click', function (event) {

  console.log("==============================");
  console.log("analysis2_result_save 저장 버튼 클릭!!");

  console.log("opinionsImageSrc:", localStorage.getItem('analysis_result-opinionCanvas'));
  console.log("backgroundImageSrc:", localStorage.getItem('analysis_result-backgroundCanvas'));


  console.log("custom_userkey", localStorage.getItem('custom_userkey'));
  console.log("custom_surveyNo", localStorage.getItem('custom_surveyNo'));

  console.log("analysis_result-comment01", localStorage.getItem('analysis_result-comment01'));
  console.log("analysis_result-comment02", localStorage.getItem('analysis_result-comment02'));
  console.log("analysis_result-comment03", localStorage.getItem('analysis_result-comment03'));


  var requestData = {
    "surveyNo": localStorage.getItem('custom_surveyNo'),
    "userKey": localStorage.getItem('custom_userkey'),
    "surveyDate": surveyDate,
    "name": localStorage.getItem('custom_name'),

    "skin_score": skin_score,
    "skin_gomin": selected_subdata + selected_subdata2,
    "IsComplexity": null, //추후 체크필요
    "t_zone_result": t_zone_result,
    "t_zone_position_num": null, //추후 체크필요
    "u_zone_result": u_zone_result,
    "u_zone_position_num": null, //추후 체크필요


    "fizpatrick_color_point": 0,
    "solution_type_number": "",
    "sensitive_type_number": "",
    "specialtip_img": localStorage.getItem('analysis_result-backgroundCanvas'),
    "specialtip_stoke_img": localStorage.getItem('analysis_result-opinionCanvas'),
    "specialtip_memo": localStorage.getItem('analysis_result-comment01'),
    "specialtip_memo2": localStorage.getItem('analysis_result-comment02'),
    "specialtip_memo3": localStorage.getItem('analysis_result-comment03'),
    "manager_value": localStorage.getItem('manager_name'),
    "create_dt": currentTime,
    "update_dt": currentTime,
    "idx": null,
    "total_count": 1
  }


  var requestData2 = {
    "surveyNo": localStorage.getItem('custom_surveyNo'),
    "userKey": localStorage.getItem('custom_userkey'),
    "name": localStorage.getItem('custom_name'),

    "pore": rsr_list.pore,
    "wrinkle": rsr_list.wrinkle,
    "futurewrinkles": rsr_list.futurewrinkles,
    "pigmentation": rsr_list.pigmentation,
    "melanin": rsr_list.melanin,
    "darkcircles": rsr_list.darkcircles,
    "transdermal": rsr_list.transdermal,
    "redness": rsr_list.redness,
    "porphyrin": rsr_list.porphyrin,
    "elasticity": rsr_list.elasticity,

    "tZone_Moisture": t_zone_subun,
    "tZone_Oilskin": t_zone_ubun,
    "uZone_Moisture": u_zone_subun,
    "uZone_Oilskin": u_zone_ubun,

    "create_dt": currentTime,
    "update_dt": currentTime,
    "idx": null,
    "total_count": 1
  }





  console.log("analysis_result requestData : ", requestData);
  console.log("==================================");
  console.log("analysis_result requestData2 : ", requestData2);

  ResultSkinConcern_API_URL
  $.ajax({
    url: skin_result_URL,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(requestData),

    success: function (response) {
      console.log("skin_result_URL 응답값 : ", response);


      $.ajax({
        url: ResultSkinConcern_API_URL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestData2),

        success: function (response) {
          console.log("ResultSkinConcern_API_URL 응답값 : ", response);
          $("#custom_detail_main").html("피부 결과 저장 완료");
          showErrorModal();


        }, error: function (xhr, status, error) {
          console.error('ResultSkinConcern_API_URL 오류 : ', error);
          $("#custom_detail_main").html("skin_concern 저장 실패");
          showErrorModal();
        }
      })


    }, error: function (xhr, status, error) {
      console.error('skin_result_URL 오류 : ', error);
      $("#custom_detail_main").html("skin_result 저장 실패");
      showErrorModal();
    }
  })

})



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

      const extractedValues = finalCombinedData.map(item => ({ surveyNo: item.m_surveyNo, userkey: item.m_userkey }));
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





/*
*
* Results내 마크뷰 이미지 팝업
*
*/



// 1.주름
$('#results_score-wrinkle').click(function () {
  $('#markvu_gubun').text('주름');
  const labels = ['A', 'C', 'D', 'E', 'F', 'Avg'];
  FWrinkle_Avg = (markvu.FWrinkle_A + markvu.FWrinkle_C + markvu.FWrinkle_D + markvu.FWrinkle_E + markvu.FWrinkle_F) / 5;
  console.log('주름 버튼 클릭! FWrinkle_Avg : ', FWrinkle_Avg);
  console.log('주름 버튼 클릭! AgeReal : ', AgeReal);

  AgeReal = GetAgeArea(AgeReal);
  console.log('주름 버튼 클릭! GetAgeArea이후 AgeReal : ', AgeReal);

  const filtering = list_rce.filter(item => item.gender === localStorage.getItem('custom_sex') && item.age === AgeReal && item.gubun === '주름');
  console.log("filtering : ", filtering);

  $('.markvu-popup-layer').addClass('open');
  updateAgingData2(labels, [markvu.FWrinkle_A.toFixed(0), markvu.FWrinkle_C.toFixed(0), markvu.FWrinkle_D.toFixed(0), markvu.FWrinkle_E.toFixed(0), markvu.FWrinkle_F.toFixed(0), FWrinkle_Avg.toFixed(0)], [filtering[0].A.toFixed(0), filtering[0].C.toFixed(0), filtering[0].D.toFixed(0), filtering[0].E.toFixed(0), filtering[0].F.toFixed(0), filtering[0].AVG.toFixed(0)]);

  console.log('get_markvu_capture  주름 : ', get_markvu_capture );
  filter_image = get_markvu_capture.filter(item => item.Side==='F' && item.LED === 'NL');
  $("#markvu_img").attr("src", "data:image/jpeg;base64," + filter_image[0].ImageData);

});



// 2.미래 주름
$('#results_score-futurewrinkles').click(function () {
  $('#markvu_gubun').text('미래 주름');
  const labels = ['A', 'E', 'F', 'G', 'H', 'Avg'];
  FFuturewrinkles_Avg = (markvu.FFutureWrinkle_A + markvu.FFutureWrinkle_E + markvu.FFutureWrinkle_F + markvu.FFutureWrinkle_G + markvu.FFutureWrinkle_H) / 5;
  console.log('미래 주름 버튼 클릭! FFuturewrinkles_Avg : ', FFuturewrinkles_Avg);

  AgeReal = GetAgeArea(AgeReal);

  const filtering = list_rce.filter(item => item.gender === localStorage.getItem('custom_sex') && item.age === AgeReal && item.gubun === '미래주름');
  console.log("filtering : ", filtering);
  $('.markvu-popup-layer').addClass('open');

  updateAgingData2(labels, [markvu.FFutureWrinkle_A.toFixed(0), markvu.FFutureWrinkle_E.toFixed(0), markvu.FFutureWrinkle_F.toFixed(0), markvu.FFutureWrinkle_G.toFixed(0), markvu.FFutureWrinkle_H.toFixed(0), FFuturewrinkles_Avg.toFixed(0)], [filtering[0].A.toFixed(0), filtering[0].E.toFixed(0), filtering[0].F.toFixed(0), filtering[0].G.toFixed(0), filtering[0].H.toFixed(0), filtering[0].AVG.toFixed(0)]);

  console.log('get_markvu_capture  미래주름 : ', get_markvu_capture );
  filter_image = get_markvu_capture.filter(item => item.Side==='F' && item.LED === 'SL');
  $("#markvu_img").attr("src", "data:image/jpeg;base64," + filter_image[0].ImageData);

  
});


// 3.색소침착
$('#results_score-pigmentation').click(function () {
  $('#markvu_gubun').text('색소 침착');
  const labels = ['A', 'B', 'E', 'F', 'G', 'H', 'Avg'];
  FPigmentation_Avg = (markvu.FPigmentation_A + markvu.FPigmentation_B + markvu.FPigmentation_E + markvu.FPigmentation_F + markvu.FPigmentation_G + markvu.FPigmentation_H) / 6;
  console.log('색소 침착 버튼 클릭! FPigmentation_Avg : ', FPigmentation_Avg);

  AgeReal = GetAgeArea(AgeReal);

  const filtering = list_rce.filter(item => item.gender === localStorage.getItem('custom_sex') && item.age === AgeReal && item.gubun === '색소침착');
  console.log("filtering : ", filtering);
  $('.markvu-popup-layer').addClass('open');

  updateAgingData2(labels, [markvu.FPigmentation_A.toFixed(0), markvu.FPigmentation_B.toFixed(0), markvu.FPigmentation_E.toFixed(0), markvu.FPigmentation_F.toFixed(0), markvu.FPigmentation_G.toFixed(0), markvu.FPigmentation_H.toFixed(0), FPigmentation_Avg.toFixed(0)], [filtering[0].A.toFixed(0), filtering[0].B.toFixed(0), filtering[0].E.toFixed(0), filtering[0].F.toFixed(0), filtering[0].G.toFixed(0), filtering[0].H.toFixed(0), filtering[0].AVG.toFixed(0)]);

  
  console.log('get_markvu_capture  색소침착 : ', get_markvu_capture );
  filter_image = get_markvu_capture.filter(item => item.Side==='F' && item.LED === 'PL');
  $("#markvu_img").attr("src", "data:image/jpeg;base64," + filter_image[0].ImageData);

});




// 4.멜라닌
$('#results_score-melanin').click(function () {
  $('#markvu_gubun').text('멜라닌');
  const labels = ['A', 'B', 'E', 'F', 'G', 'H', 'Avg'];
  FMelanin_Avg = (markvu.FMelanin_A + markvu.FMelanin_B + markvu.FMelanin_E + markvu.FMelanin_F + markvu.FMelanin_G + markvu.FMelanin_H) / 6;
  console.log('멜라닌 버튼 클릭! FMelanin_Avg : ', FMelanin_Avg);

  AgeReal = GetAgeArea(AgeReal);

  const filtering = list_rce.filter(item => item.gender === localStorage.getItem('custom_sex') && item.age === AgeReal && item.gubun === '멜라닌');
  console.log("filtering : ", filtering);
  $('.markvu-popup-layer').addClass('open');

  updateAgingData2(labels, [markvu.FMelanin_A.toFixed(0), markvu.FMelanin_B.toFixed(0), markvu.FMelanin_E.toFixed(0), markvu.FMelanin_F.toFixed(0), markvu.FMelanin_G.toFixed(0), markvu.FMelanin_H.toFixed(0), FMelanin_Avg.toFixed(0)], [filtering[0].A.toFixed(0), filtering[0].B.toFixed(0), filtering[0].E.toFixed(0), filtering[0].F.toFixed(0), filtering[0].G.toFixed(0), filtering[0].H.toFixed(0), filtering[0].AVG.toFixed(0)]);

  console.log('get_markvu_capture  멜라닌 : ', get_markvu_capture );
  filter_image = get_markvu_capture.filter(item => item.Side==='F' && item.LED === 'UV');
  $("#markvu_img").attr("src", "data:image/jpeg;base64," + filter_image[0].ImageData);


});



// 5.붉은기
$('#results_score-redness').click(function () {
  $('#markvu_gubun').text('붉은기');
  const labels = ['A', 'B', 'E', 'F', 'G', 'H', 'Avg'];
  Redness_Avg = (markvu.FRedness_A + markvu.FRedness_B + markvu.FRedness_E + markvu.FRedness_F + markvu.FRedness_G + markvu.FRedness_H) / 6;
  console.log('붉은기 버튼 클릭! Redness_Avg : ', Redness_Avg);

  AgeReal = GetAgeArea(AgeReal);

  const filtering = list_rce.filter(item => item.gender === localStorage.getItem('custom_sex') && item.age === AgeReal && item.gubun === '붉은기');
  console.log("filtering : ", filtering);
  $('.markvu-popup-layer').addClass('open');

  updateAgingData2(labels, [markvu.FRedness_A.toFixed(0), markvu.FRedness_B.toFixed(0), markvu.FRedness_E.toFixed(0), markvu.FRedness_F.toFixed(0), markvu.FRedness_G.toFixed(0), markvu.FRedness_H.toFixed(0), Redness_Avg.toFixed(0)], [filtering[0].A.toFixed(0), filtering[0].B.toFixed(0), filtering[0].E.toFixed(0), filtering[0].F.toFixed(0), filtering[0].G.toFixed(0), filtering[0].H.toFixed(0), filtering[0].AVG.toFixed(0)]);


  
  console.log('get_markvu_capture  붉은기 : ', get_markvu_capture );
  filter_image = get_markvu_capture.filter(item => item.Side==='F' && item.LED === 'PL');
  $("#markvu_img").attr("src", "data:image/jpeg;base64," + filter_image[0].ImageData);


});




// 6.모공
$('#results_score-pore').click(function () {
  $('#markvu_gubun').text('모공');
  const labels = ['A', 'B', 'G', 'H', 'Avg'];
  FPore_Avg = (markvu.FPore_A + markvu.FPore_B + markvu.FPore_G + markvu.FPore_H) / 4;
  console.log('모공 버튼 클릭! FPore_Avg : ', FPore_Avg);

  AgeReal = GetAgeArea(AgeReal);

  const filtering = list_rce.filter(item => item.gender === localStorage.getItem('custom_sex') && item.age === AgeReal && item.gubun === '모공');
  console.log("filtering : ", filtering);
  $('.markvu-popup-layer').addClass('open');

  updateAgingData2(labels, [markvu.FPore_A.toFixed(0), markvu.FPore_B.toFixed(0), markvu.FPore_G.toFixed(0), markvu.FPore_H.toFixed(0), FPore_Avg.toFixed(0)], [filtering[0].A.toFixed(0), filtering[0].B.toFixed(0), filtering[0].G.toFixed(0), filtering[0].H.toFixed(0), filtering[0].AVG.toFixed(0)]);

  console.log('get_markvu_capture  모공 : ', get_markvu_capture );
  filter_image = get_markvu_capture.filter(item => item.Side==='F' && item.LED === 'NL');
  $("#markvu_img").attr("src", "data:image/jpeg;base64," + filter_image[0].ImageData);

});




// 7.포피린
$('#results_score-porphyrin').click(function () {
  $('#markvu_gubun').text('포피린');
  const labels = ['A', 'B', 'G', 'H', 'Avg'];
  FPorphyrin_Avg = (markvu.FPorphyrin_A + markvu.FPorphyrin_B + markvu.FPorphyrin_G + markvu.FPorphyrin_H) / 4;
  console.log('포피린 버튼 클릭! FPorphyrin_Avg : ', FPorphyrin_Avg);

  AgeReal = GetAgeArea(AgeReal);

  const filtering = list_rce.filter(item => item.gender === localStorage.getItem('custom_sex') && item.age === AgeReal && item.gubun === '포피린');
  console.log("filtering : ", filtering);
  $('.markvu-popup-layer').addClass('open');

  updateAgingData2(labels, [markvu.FPorphyrin_A.toFixed(0), markvu.FPorphyrin_B.toFixed(0), markvu.FPorphyrin_G.toFixed(0), markvu.FPorphyrin_H.toFixed(0), FPorphyrin_Avg.toFixed(0)], [filtering[0].A.toFixed(0), filtering[0].B.toFixed(0), filtering[0].G.toFixed(0), filtering[0].H.toFixed(0), filtering[0].AVG.toFixed(0)]);

  console.log('get_markvu_capture  포피린 : ', get_markvu_capture );
  filter_image = get_markvu_capture.filter(item => item.Side==='F' && item.LED === 'UV');
  $("#markvu_img").attr("src", "data:image/jpeg;base64," + filter_image[0].ImageData);


});







$('#markvu-popup-close').click(function () {
  console.log('마크뷰 팝업 닫기 클릭');

  $('.markvu-popup-layer').removeClass('open');
});










/*
******************* 이후 차트생성 및 로직 **********************
*/






/*
24. 05. 13 T존 차트 생성 및 업데이트
*/

var t_zone_data = {
  datasets: [{
    label: '수분,유분',
    data: [{ x: 0, y: 0 }],
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
          display: false
        },
        scaleLabel: {
          display: true,
          labelString: '수분'
        }
      },

      y: {
        type: 'linear',
        position: 'left',
        min: 0,
        max: 40,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // grid 색상
          display: false
        },
        ticks: {
          stepSize: 10
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

function updateTZoneData(tzone_subun_result, tzone_ubun_result) {
  t_zone_data.datasets[0].data[0] = { x: tzone_subun_result, y: tzone_ubun_result };
  // console.log("updateTZoneData IN tzone_subun_result : ",tzone_subun_result)
  t_zone_chart.update();
}




/*
24. 05. 13 U존 차트 생성 및 업데이트
*/

var u_zone_data = {
  datasets: [{
    label: '수분,유분',
    data: [{ x: 0, y: 0 }],
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
          display: false
        }
      },
      y: {
        type: 'linear',
        position: 'left',
        min: 0,
        max: 40,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // grid 색상
          display: false
        },
        ticks: {
          stepSize: 10
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

function updateUZoneData(uzone_subun_result, uzone_ubun_result) {
  u_zone_data.datasets[0].data[0] = { x: uzone_subun_result, y: uzone_ubun_result };
  // console.log("updateTZoneData IN tzone_subun_result : ",uzone_subun_result)
  u_zone_chart.update();
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
    barThickness: 25

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
    barThickness: 30

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
    data: [0, 0],
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
        },
        ticks: {
          padding: 10,
          font: {
            size: 10
          }
        },
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
    data: [0, 0],
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
        min: 0,
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
    barThickness: 30
  }
});


function updateSebumData(data1, data2) {
  sebum_data.datasets[0].data[0] = data1; // 모공
  sebum_data.datasets[0].data[1] = data2; // 포피린
  // var min_sebum_data = Math.min(...sebum_data.datasets[0].data);  // step2 : Y축 최소값 업데이트
  // sebum_chart.options.scales.y.min = parseInt(min_sebum_data - 10);

  sebum_chart.update();
}








var aging_data2 = {
  labels: [], // 초기화 시 빈 배열로 설정
  datasets: [{
    label: '', // 범례 레이블 없음
    data: [],
    backgroundColor: function (context) {
      return context.dataIndex === context.chart.data.labels.length - 1 ? '#d98cbf' : '#e7c1da';
    },
  },
  {
    label: '', // 범례 레이블 없음
    data: [],
    backgroundColor: function (context) {
      return context.dataIndex === context.chart.data.labels.length - 1 ? '#c1c1c1' : '#d2d2d2';
    }
  }]
};

var min_aging_data2 = 10; // step1 : Y축 최소값 초기화

var ctx_makvu = document.getElementById('aging_chart2').getContext('2d');
var aging_chart2 = new Chart(ctx_makvu, {
  type: 'bar',
  data: aging_data2,
  plugins: [ChartDataLabels],
  options: {
    responsive: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 110,
        min: 0,
        ticks: {
          stepSize: 20,
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
    barThickness: 25
  }
});


function updateAgingData2(labels, data1, data2) {
  aging_data2.labels = labels;
  aging_data2.datasets[0].data = data1;
  aging_data2.datasets[1].data = data2;

  aging_chart2.update();
}













/*
*
*스킨 점수 결과 로직
*
*/
//피부 결과 항목들
const str_list = ["모공", "주름", "미래주름", "색소침착", "멜라닌", "붉은기", "포피린", "경피수분손실도", "탄력"];

//민감도 타입
const sensitive_type = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4 };


/** 
 * 24.05. 13
 * @description 피부 항목별 점수 계산 로직 (마크뷰 값 기준)
 **/
function GetGubunByAverage(markvu, vapometer_C_Left, vapometer_C_Right, cutometer_cheek, gubun) {
  let result = 0;
  console.log("GetGubunByAverage 내, vapometer_C_Left : ", vapometer_C_Left);
  console.log("GetGubunByAverage 내, cutometer_cheek : ", cutometer_cheek);

  switch (gubun) {
    case "모공":
      result = (markvu.FPore_A + markvu.FPore_B + markvu.FPore_G + markvu.FPore_H) / 4;
      break;
    case "주름":
      result = (markvu.FWrinkle_A + markvu.FWrinkle_C + markvu.FWrinkle_D + markvu.FWrinkle_E + markvu.FWrinkle_F) / 5;
      break;
    case "미래주름":
      result = (markvu.FFutureWrinkle_A + markvu.FFutureWrinkle_E + markvu.FFutureWrinkle_F + markvu.FFutureWrinkle_G + markvu.FFutureWrinkle_H) / 5;
      break;
    case "색소침착":
      result = (markvu.FPigmentation_A + markvu.FPigmentation_B + markvu.FPigmentation_E + markvu.FPigmentation_F + markvu.FPigmentation_G + markvu.FPigmentation_H) / 6;
      break;
    case "멜라닌":
      if (markvu.Sex === "M")
        result = (markvu.FMelanin_A + markvu.FMelanin_B + markvu.FMelanin_E + markvu.FMelanin_F + markvu.FMelanin_G + markvu.FMelanin_H) / 6;
      else
        result = (markvu.FMelanin_A + markvu.FMelanin_G + markvu.FMelanin_H) / 3;
      break;
    case "붉은기":
      result = (markvu.FRedness_A + markvu.FRedness_B + markvu.FRedness_E + markvu.FRedness_F + markvu.FRedness_G + markvu.FRedness_H) / 6;
      break;
    case "포피린":
      result = (markvu.FPorphyrin_A + markvu.FPorphyrin_B + markvu.FPorphyrin_G + markvu.FPorphyrin_H) / 4;
      break;

    //바포미터
    case "경피수분손실도":
      if (vapometer_C_Left !== null) {
        result = (parseFloat(vapometer_C_Left) + parseFloat(vapometer_C_Right)) / 2;
        console.log("vapometer_result : ", result);
      }
      else {
        result = -1;
        console.log("vapometer_result2 : ", result);
      }
      break;

    //큐토미터
    case "탄력":
      if (cutometer_cheek !== null) {
        result = cutometer_cheek;
        console.log("cutometer_result : ", result);
      }
      else {
        //측정을 안했을경우 보통 표기
        result = -1;
        console.log("cutometer_result2 : ", result);
      }
      //탄력값
      break;
  }

  return result;

}

/** 
 * 24.05. 13
 * @description 실제 나이 계산 함수
 **/
function calculateAge(birthdate) {
  if (birthdate) {
    let now = new Date();
    let iNow = parseInt(now.toISOString().slice(0, 10).replace(/-/g, ''));
    let iBirthDay = parseInt(birthdate);
    let sAge = (iNow - iBirthDay).toString();
    if (sAge.length > 4)
      return parseInt(sAge.substring(0, sAge.length - 4));
    else
      return 0;
  } else {
    return 0;
  }
}


let skin_score = 0; // 현재 점수 전역 변수

let selected_subdata;
let selected_subdata2;
let AgeReal

let rsr_list = {}; //스킨 고민 (skinconcern) 전역변수

function setSkinScore(markvu, vapometer, cutometer, skinsurvey, course_flg) {
  let score = 0;
  let list_avr_score_data = {};
  AgeReal = calculateAge(markvu.BirthDay);
  let sex = markvu.Sex;
  let vapometer_C_Left = vapometer.C_Left;


  let vapometer_C_Right = vapometer.C_Right;
  let cutometer_cheek = cutometer.cheek;

  console.log("setSkinScore 내, markvu : ", markvu);
  console.log("setSkinScore 내, course_flg : ", course_flg);
  console.log("setSkinScore 내, AgeReal : ", AgeReal);
  console.log("setSkinScore 내, sex : ", markvu.Sex);

  console.log("setSkinScore 내, vapometer_C_Left : ", vapometer_C_Left);
  console.log("setSkinScore 내, vapometer_C_Right : ", vapometer_C_Right);
  console.log("setSkinScore 내, cutometer_cheek : ", cutometer_cheek);
  console.log("setSkinScore 내, skinsurvey : ", skinsurvey);







  for (let str_gubun of str_list) {
    if (str_gubun !== "탄력") {
      console.log("str_gubun : ", str_gubun);

      let avr_value = GetGubunByAverage(markvu, vapometer_C_Left, vapometer_C_Right, cutometer_cheek, str_gubun);
      console.log("avr_value11 : ", avr_value);

      score = GetSkinConcernScore(sex, AgeReal, str_gubun, avr_value);
      list_avr_score_data[str_gubun] = score;
      // console.log("list_avr_score_data : ", list_avr_score_data);

    } else {
      if (course_flg === "I") {
        console.log("course_flg : I ", course_flg);

        let avr_value = GetGubunByAverage(markvu, vapometer_C_Left, vapometer_C_Right, cutometer_cheek, str_gubun);
        console.log("avr_value22 : ", avr_value);

        score = GetSkinConcernScore(sex, AgeReal, str_gubun, avr_value);
        list_avr_score_data[str_gubun] = score;
        // console.log("list_avr_score_data : ", list_avr_score_data);
      }
    }
  }
  console.log("LAST / list_avr_score_data : ", list_avr_score_data);



  rsr_list.pore = parseFloat(list_avr_score_data["모공"].toFixed(1));
  rsr_list.wrinkle = parseFloat(list_avr_score_data["주름"].toFixed(1));
  rsr_list.futurewrinkles = parseFloat(list_avr_score_data["미래주름"].toFixed(1));
  rsr_list.pigmentation = parseFloat(list_avr_score_data["색소침착"].toFixed(1));
  rsr_list.melanin = parseFloat(list_avr_score_data["멜라닌"].toFixed(1));
  rsr_list.transdermal = parseFloat(list_avr_score_data["경피수분손실도"].toFixed(1));
  rsr_list.redness = parseFloat(list_avr_score_data["붉은기"].toFixed(1));
  rsr_list.porphyrin = parseFloat(list_avr_score_data["포피린"].toFixed(1));
  rsr_list.elasticity = Object.keys(list_avr_score_data).length === 9 ? parseFloat(list_avr_score_data["탄력"].toFixed(1)) : 0;

  console.log("rsr_list  : ", rsr_list);
  console.log("list_avr_score_data.length  : ", Object.keys(list_avr_score_data).length);

  updateAgingData(rsr_list.elasticity, rsr_list.wrinkle, rsr_list.futurewrinkles);
  updatePigmentationData(rsr_list.pigmentation, rsr_list.melanin);
  updateSensitivityData(rsr_list.transdermal, rsr_list.redness);
  updateSebumData(rsr_list.pore, rsr_list.porphyrin);


  //피부점수 값
  skin_score = Math.floor(Object.values(list_avr_score_data).reduce((total, current) => total + current) / Object.keys(list_avr_score_data).length);
  document.getElementById('get_skin_score').textContent = skin_score;

  //하위 2가지 관리항목 추출

  let sorted_skin_data = Object.entries(list_avr_score_data).sort((a, b) => a[1] - b[1]);
  // console.log("sorted_skin_data : ", sorted_skin_data);


  selected_subdata = sorted_skin_data[0][0];
  selected_subdata2 = sorted_skin_data[1][0];
  console.log("sorted_skin_data : ", selected_subdata);

  document.getElementById('selected_subdata').textContent = selected_subdata;
  document.getElementById('selected_subdata2').textContent = selected_subdata2;

  //SensitiveType 결과
  let SensitiveType_result = setSensitiveType(skinsurvey);
  console.log("SensitiveType_AllResult : ", SensitiveType_result);

  document.getElementById('SensitiveType_No').textContent = SensitiveType_result.sensitiveTypeNumber;
  document.getElementById('SensitiveType_Text').textContent = SensitiveType_result.sensitiveTypeResult;




  //솔루션 타입 결과

  console.log("list_avr_score_data ====== :", list_avr_score_data);

  let solution_type_number = GetSolutionTypeNumber(t_zone_result, u_zone_result, list_avr_score_data, skinsurvey);
  console.log("solution_type_number check : ", solution_type_number);
  $("#solution_type_number").text(solution_type_number);

  let solution_type_result = GetSolution_Result(solution_type_number);
  console.log("solution_type_result check : ", solution_type_result);
  $("#solution_type_text").text(solution_type_result);


}






// SensitiveType 결과 로직
function setSensitiveType(survey) {
  // console.log("start setSensitiveType");
  console.log("setSensitiveType 내, survey 값 : ", survey);
  console.log("survey.s4_1 타입 : ", typeof (survey.s4_1));

  survey.s4_1 = parseFloat(survey.s4_1);
  survey.s4_2 = parseFloat(survey.s4_2);
  survey.s4_3 = parseFloat(survey.s4_3);
  survey.s4_4 = parseFloat(survey.s4_4);
  survey.s4_5 = parseFloat(survey.s4_5);
  survey.s4_6 = parseFloat(survey.s4_6);

  // console.log("setSensitiveType 내, survey 값22 : ", survey);
  // console.log("survey.s4_1 타입22 : ", typeof (survey.s4_1));

  let totalSurveyPoint = 0;
  if (survey.s4_1 === null || survey.s4_1 === 0) {
    totalSurveyPoint = 5;
    // console.log("totalSurveyPoint 00: ", totalSurveyPoint);
  } else {
    totalSurveyPoint =
      + survey.s4_1
      + survey.s4_2
      + survey.s4_3
      + survey.s4_4
      + survey.s4_5
      + survey.s4_6

    // console.log("totalSurveyPoint 11: ", totalSurveyPoint);
  }
  // console.log("totalSurveyPoint 222: ", totalSurveyPoint);

  if (0 < totalSurveyPoint && totalSurveyPoint <= 3) {
    sensitiveTypeNumber = "S0";
  } else if (4 <= totalSurveyPoint && totalSurveyPoint <= 10) {
    sensitiveTypeNumber = "S1";
  } else if (11 <= totalSurveyPoint && totalSurveyPoint <= 16) {
    if ((survey.s2_3 + survey.s2_4) >= (survey.s2_1 + survey.s2_2)) {
      sensitiveTypeNumber = "S2";
    }

    if ((survey.s2_1 + survey.s2_2) > (survey.s2_3 + survey.s2_4)) {
      sensitiveTypeNumber = "S3";
    }
  } else if ((12 <= (survey.s4_1 + survey.s4_2 + survey.s4_3 + survey.s4_4)) &&
    (6 <= (survey.s4_5 + survey.s4_6))) {
    sensitiveTypeNumber = "S4";
  } else {
    sensitiveTypeNumber = "S4";
  }

  let sensitiveTypeResult = GetSensitiveTypeResult(sensitiveTypeNumber);

  let sensitiveAllResult = {
    'sensitiveTypeNumber': sensitiveTypeNumber,
    'sensitiveTypeResult': sensitiveTypeResult
  }

  // console.log("sensitiveTypeNumber : ", sensitiveTypeNumber);
  // console.log("sensitiveTypeResult : ", sensitiveTypeResult);
  // console.log("sensitiveAllResult : ", sensitiveAllResult);
  return sensitiveAllResult;
}
















//Result_Concern_Entity
const list_rce = [{ "gender": "M", "age": 19, "gubun": "모공", "first": 32, "second": 37, "third": 42, "fourth": 52, "fifth": 57, "sixth": 62, "A": 37.6, "B": 44.6, "C": 0, "D": 0, "E": 0, "F": 0, "G": 34.4, "H": 34.2, "AVG": 38 }, { "gender": "M", "age": 19, "gubun": "주름", "first": 9.2, "second": 12.2, "third": 14.6, "fourth": 16.4, "fifth": 17.6, "sixth": 22.2, "A": 18.8, "B": 0, "C": 12.7, "D": 13.7, "E": 15.8, "F": 16, "G": 0, "H": 0, "AVG": 15 }, { "gender": "M", "age": 19, "gubun": "미래주름", "first": 0, "second": 2, "third": 5, "fourth": 11, "fifth": 14, "sixth": 17, "A": 8, "B": 0, "C": 0, "D": 0, "E": 7, "F": 7, "G": 9, "H": 9, "AVG": 8 }, { "gender": "M", "age": 19, "gubun": "색소침착", "first": 8.5, "second": 13.6, "third": 18.1, "fourth": 21.3, "fifth": 24.6, "sixth": 34.6, "A": 15.1455, "B": 21.5273, "C": 0, "D": 0, "E": 13.5455, "F": 14.2364, "G": 21.9091, "H": 21.5273, "AVG": 18 }, { "gender": "M", "age": 19, "gubun": "멜라닌", "first": 3.8, "second": 6.6, "third": 9.5, "fourth": 12, "fifth": 15.1, "sixth": 24.8, "A": 9.83535, "B": 16.4, "C": 0, "D": 0, "E": 9.23636, "F": 9.21818, "G": 11.6182, "H": 11.0546, "AVG": 16 }, { "gender": "M", "age": 19, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 6.36136, "B": 16.4833, "C": 0, "D": 0, "E": 6.71818, "F": 7.39631, "G": 10.0281, "H": 10.0361, "AVG": 10 }, { "gender": "M", "age": 19, "gubun": "포피린", "first": 14, "second": 18, "third": 22, "fourth": 29, "fifth": 35, "sixth": 39, "A": 10, "B": 18, "C": 0, "D": 0, "E": 0, "F": 0, "G": 10, "H": 10, "AVG": 12 }, { "gender": "M", "age": 19, "gubun": "탄력", "first": 0.915962, "second": 0.834322, "third": 0.752682, "fourth": 0.671042, "fifth": 0.589402, "sixth": 0.507762, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 19, "gubun": "경피수분손실도", "first": 8.85, "second": 12.4, "third": 14, "fourth": 17.4, "fifth": 21, "sixth": 39.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 24, "gubun": "모공", "first": 32, "second": 37, "third": 42, "fourth": 52, "fifth": 57, "sixth": 62, "A": 37.6, "B": 44.6, "C": 0, "D": 0, "E": 0, "F": 0, "G": 34.4, "H": 34.2, "AVG": 38 }, { "gender": "M", "age": 24, "gubun": "주름", "first": 9.2, "second": 12.2, "third": 14.6, "fourth": 16.4, "fifth": 17.6, "sixth": 22.2, "A": 18.8, "B": 0, "C": 12.7, "D": 13.7, "E": 15.8, "F": 16, "G": 0, "H": 0, "AVG": 15 }, { "gender": "M", "age": 24, "gubun": "미래주름", "first": 0, "second": 2, "third": 5, "fourth": 11, "fifth": 14, "sixth": 17, "A": 8, "B": 0, "C": 0, "D": 0, "E": 7, "F": 7, "G": 9, "H": 9, "AVG": 8 }, { "gender": "M", "age": 24, "gubun": "색소침착", "first": 8.5, "second": 13.6, "third": 18.1, "fourth": 21.3, "fifth": 24.6, "sixth": 34.6, "A": 15.1455, "B": 21.5273, "C": 0, "D": 0, "E": 13.5455, "F": 14.2364, "G": 21.9091, "H": 21.5273, "AVG": 18 }, { "gender": "M", "age": 24, "gubun": "멜라닌", "first": 3.8, "second": 6.6, "third": 9.5, "fourth": 12, "fifth": 15.1, "sixth": 24.8, "A": 9.83535, "B": 16.4, "C": 0, "D": 0, "E": 9.23636, "F": 9.21818, "G": 11.6182, "H": 11.0546, "AVG": 16 }, { "gender": "M", "age": 24, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 6.36136, "B": 16.4833, "C": 0, "D": 0, "E": 6.71818, "F": 7.39631, "G": 10.0281, "H": 10.0361, "AVG": 10 }, { "gender": "M", "age": 24, "gubun": "포피린", "first": 14, "second": 18, "third": 22, "fourth": 29, "fifth": 35, "sixth": 39, "A": 10, "B": 18, "C": 0, "D": 0, "E": 0, "F": 0, "G": 10, "H": 10, "AVG": 12 }, { "gender": "M", "age": 24, "gubun": "탄력", "first": 0.915962, "second": 0.834322, "third": 0.752682, "fourth": 0.671042, "fifth": 0.589402, "sixth": 0.507762, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 24, "gubun": "경피수분손실도", "first": 8.85, "second": 12.4, "third": 14, "fourth": 17.4, "fifth": 21, "sixth": 39.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 29, "gubun": "모공", "first": 32, "second": 37, "third": 42, "fourth": 52, "fifth": 57, "sixth": 62, "A": 37.6, "B": 44.6, "C": 0, "D": 0, "E": 0, "F": 0, "G": 34.4, "H": 34.2, "AVG": 38 }, { "gender": "M", "age": 29, "gubun": "주름", "first": 9.2, "second": 12.2, "third": 14.6, "fourth": 16.4, "fifth": 17.6, "sixth": 22.2, "A": 18.8, "B": 0, "C": 12.7, "D": 13.7, "E": 15.8, "F": 16, "G": 0, "H": 0, "AVG": 15 }, { "gender": "M", "age": 29, "gubun": "미래주름", "first": 0, "second": 2, "third": 5, "fourth": 11, "fifth": 14, "sixth": 17, "A": 8, "B": 0, "C": 0, "D": 0, "E": 7, "F": 7, "G": 9, "H": 9, "AVG": 8 }, { "gender": "M", "age": 29, "gubun": "색소침착", "first": 8.5, "second": 13.6, "third": 18.1, "fourth": 21.3, "fifth": 24.6, "sixth": 34.6, "A": 15.1455, "B": 21.5273, "C": 0, "D": 0, "E": 13.5455, "F": 14.2364, "G": 21.9091, "H": 21.5273, "AVG": 18 }, { "gender": "M", "age": 29, "gubun": "멜라닌", "first": 3.8, "second": 6.6, "third": 9.5, "fourth": 12, "fifth": 15.1, "sixth": 24.8, "A": 9.83535, "B": 16.4, "C": 0, "D": 0, "E": 9.23636, "F": 9.21818, "G": 11.6182, "H": 11.0546, "AVG": 16 }, { "gender": "M", "age": 29, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 6.36136, "B": 16.4833, "C": 0, "D": 0, "E": 6.71818, "F": 7.39631, "G": 10.0281, "H": 10.0361, "AVG": 10 }, { "gender": "M", "age": 29, "gubun": "포피린", "first": 14, "second": 18, "third": 22, "fourth": 29, "fifth": 35, "sixth": 39, "A": 10, "B": 18, "C": 0, "D": 0, "E": 0, "F": 0, "G": 10, "H": 10, "AVG": 12 }, { "gender": "M", "age": 29, "gubun": "탄력", "first": 0.915962, "second": 0.834322, "third": 0.752682, "fourth": 0.671042, "fifth": 0.589402, "sixth": 0.507762, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 29, "gubun": "경피수분손실도", "first": 8.85, "second": 12.4, "third": 14, "fourth": 17.4, "fifth": 21, "sixth": 39.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 34, "gubun": "모공", "first": 38, "second": 43, "third": 48, "fourth": 58, "fifth": 65, "sixth": 68, "A": 42.2, "B": 48.3, "C": 0, "D": 0, "E": 0, "F": 0, "G": 39.4, "H": 39.8, "AVG": 42 }, { "gender": "M", "age": 34, "gubun": "주름", "first": 11.2, "second": 14.2, "third": 15.8, "fourth": 17.8, "fifth": 20.6, "sixth": 31.2, "A": 21.2, "B": 0, "C": 15, "D": 16.3, "E": 18.5, "F": 18.4, "G": 0, "H": 0, "AVG": 18 }, { "gender": "M", "age": 34, "gubun": "미래주름", "first": 0, "second": 2, "third": 5, "fourth": 11, "fifth": 14, "sixth": 17, "A": 8, "B": 0, "C": 0, "D": 0, "E": 7, "F": 7, "G": 9, "H": 9, "AVG": 8 }, { "gender": "M", "age": 34, "gubun": "색소침착", "first": 8.8, "second": 15.5, "third": 18, "fourth": 20, "fifth": 24.7, "sixth": 32.1, "A": 15.75, "B": 33.625, "C": 0, "D": 0, "E": 15.8125, "F": 17.2813, "G": 21.9063, "H": 22.2813, "AVG": 21 }, { "gender": "M", "age": 34, "gubun": "멜라닌", "first": 3.3, "second": 8, "third": 10.3, "fourth": 11.5, "fifth": 15.8, "sixth": 39.8, "A": 10.2813, "B": 20.2188, "C": 0, "D": 0, "E": 10.375, "F": 10.9063, "G": 12.6875, "H": 14.125, "AVG": 13 }, { "gender": "M", "age": 34, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 6.36136, "B": 16.4833, "C": 0, "D": 0, "E": 6.71818, "F": 7.39631, "G": 10.0281, "H": 10.0361, "AVG": 10 }, { "gender": "M", "age": 34, "gubun": "포피린", "first": 14, "second": 18, "third": 22, "fourth": 29, "fifth": 35, "sixth": 39, "A": 10, "B": 18, "C": 0, "D": 0, "E": 0, "F": 0, "G": 10, "H": 10, "AVG": 12 }, { "gender": "M", "age": 34, "gubun": "탄력", "first": 0.876296, "second": 0.794096, "third": 0.711896, "fourth": 0.629696, "fifth": 0.547496, "sixth": 0.465296, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 34, "gubun": "경피수분손실도", "first": 8.85, "second": 12.4, "third": 14, "fourth": 17.4, "fifth": 21, "sixth": 39.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 39, "gubun": "모공", "first": 38, "second": 43, "third": 48, "fourth": 58, "fifth": 65, "sixth": 68, "A": 42.2, "B": 48.3, "C": 0, "D": 0, "E": 0, "F": 0, "G": 39.4, "H": 39.8, "AVG": 42 }, { "gender": "M", "age": 39, "gubun": "주름", "first": 11.2, "second": 14.2, "third": 15.8, "fourth": 17.8, "fifth": 20.6, "sixth": 31.2, "A": 21.2, "B": 0, "C": 15, "D": 16.3, "E": 18.5, "F": 18.4, "G": 0, "H": 0, "AVG": 18 }, { "gender": "M", "age": 39, "gubun": "미래주름", "first": 0, "second": 2, "third": 5, "fourth": 11, "fifth": 14, "sixth": 17, "A": 8, "B": 0, "C": 0, "D": 0, "E": 7, "F": 7, "G": 9, "H": 9, "AVG": 8 }, { "gender": "M", "age": 39, "gubun": "색소침착", "first": 8.8, "second": 15.5, "third": 18, "fourth": 20, "fifth": 24.7, "sixth": 32.1, "A": 15.75, "B": 33.625, "C": 0, "D": 0, "E": 15.8125, "F": 17.2813, "G": 21.9063, "H": 22.2813, "AVG": 21 }, { "gender": "M", "age": 39, "gubun": "멜라닌", "first": 3.3, "second": 8, "third": 10.3, "fourth": 11.5, "fifth": 15.8, "sixth": 39.8, "A": 10.2813, "B": 20.2188, "C": 0, "D": 0, "E": 10.375, "F": 10.9063, "G": 12.6875, "H": 14.125, "AVG": 13 }, { "gender": "M", "age": 39, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 6.36136, "B": 16.4833, "C": 0, "D": 0, "E": 6.71818, "F": 7.39631, "G": 10.0281, "H": 10.0361, "AVG": 10 }, { "gender": "M", "age": 39, "gubun": "포피린", "first": 14, "second": 18, "third": 22, "fourth": 29, "fifth": 35, "sixth": 39, "A": 10, "B": 18, "C": 0, "D": 0, "E": 0, "F": 0, "G": 10, "H": 10, "AVG": 12 }, { "gender": "M", "age": 39, "gubun": "탄력", "first": 0.876296, "second": 0.794096, "third": 0.711896, "fourth": 0.629696, "fifth": 0.547496, "sixth": 0.465296, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 39, "gubun": "경피수분손실도", "first": 8.85, "second": 12.4, "third": 14, "fourth": 17.4, "fifth": 21, "sixth": 39.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 44, "gubun": "모공", "first": 42, "second": 47, "third": 52, "fourth": 62, "fifth": 67, "sixth": 72, "A": 58, "B": 54, "C": 0, "D": 0, "E": 0, "F": 0, "G": 58, "H": 58, "AVG": 57 }, { "gender": "M", "age": 44, "gubun": "주름", "first": 19, "second": 22, "third": 25, "fourth": 31, "fifth": 34, "sixth": 37, "A": 29, "B": 0, "C": 27, "D": 27, "E": 29, "F": 29, "G": 0, "H": 0, "AVG": 28.2 }, { "gender": "M", "age": 44, "gubun": "미래주름", "first": 0, "second": 2, "third": 5, "fourth": 11, "fifth": 14, "sixth": 17, "A": 8, "B": 0, "C": 0, "D": 0, "E": 7, "F": 7, "G": 9, "H": 9, "AVG": 8 }, { "gender": "M", "age": 44, "gubun": "색소침착", "first": 14, "second": 19, "third": 24, "fourth": 34, "fifth": 39, "sixth": 44, "A": 25, "B": 35, "C": 0, "D": 0, "E": 22, "F": 22, "G": 35, "H": 35, "AVG": 29 }, { "gender": "M", "age": 44, "gubun": "멜라닌", "first": 14, "second": 19, "third": 24, "fourth": 34, "fifth": 39, "sixth": 44, "A": 30, "B": 30, "C": 0, "D": 0, "E": 25, "F": 25, "G": 32, "H": 32, "AVG": 29 }, { "gender": "M", "age": 44, "gubun": "붉은기", "first": 4, "second": 7, "third": 10, "fourth": 16, "fifth": 19, "sixth": 22, "A": 10, "B": 18, "C": 0, "D": 0, "E": 9, "F": 9, "G": 16, "H": 16, "AVG": 13 }, { "gender": "M", "age": 44, "gubun": "포피린", "first": 14, "second": 18, "third": 22, "fourth": 29, "fifth": 35, "sixth": 39, "A": 10, "B": 18, "C": 0, "D": 0, "E": 0, "F": 0, "G": 10, "H": 10, "AVG": 12 }, { "gender": "M", "age": 44, "gubun": "탄력", "first": 0.798059, "second": 0.721019, "third": 0.643979, "fourth": 0.566939, "fifth": 0.489899, "sixth": 0.412859, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 44, "gubun": "경피수분손실도", "first": 8.85, "second": 12.4, "third": 14, "fourth": 17.4, "fifth": 21, "sixth": 39.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 49, "gubun": "모공", "first": 45, "second": 50, "third": 55, "fourth": 65, "fifth": 70, "sixth": 75, "A": 61, "B": 57, "C": 0, "D": 0, "E": 0, "F": 0, "G": 61, "H": 61, "AVG": 60 }, { "gender": "M", "age": 49, "gubun": "주름", "first": 20, "second": 23, "third": 26, "fourth": 32, "fifth": 35, "sixth": 38, "A": 29, "B": 0, "C": 29, "D": 29, "E": 29, "F": 29, "G": 0, "H": 0, "AVG": 29 }, { "gender": "M", "age": 49, "gubun": "미래주름", "first": 0, "second": 2, "third": 5, "fourth": 11, "fifth": 14, "sixth": 17, "A": 8, "B": 0, "C": 0, "D": 0, "E": 7, "F": 7, "G": 9, "H": 9, "AVG": 8 }, { "gender": "M", "age": 49, "gubun": "색소침착", "first": 15, "second": 20, "third": 25, "fourth": 35, "fifth": 40, "sixth": 45, "A": 26, "B": 36, "C": 0, "D": 0, "E": 24, "F": 24, "G": 35, "H": 35, "AVG": 30 }, { "gender": "M", "age": 49, "gubun": "멜라닌", "first": 17, "second": 22, "third": 27, "fourth": 37, "fifth": 42, "sixth": 47, "A": 32, "B": 34, "C": 0, "D": 0, "E": 27, "F": 27, "G": 36, "H": 36, "AVG": 32 }, { "gender": "M", "age": 49, "gubun": "붉은기", "first": 4, "second": 7, "third": 10, "fourth": 16, "fifth": 19, "sixth": 22, "A": 10, "B": 18, "C": 0, "D": 0, "E": 9, "F": 9, "G": 16, "H": 16, "AVG": 13 }, { "gender": "M", "age": 49, "gubun": "포피린", "first": 14, "second": 18, "third": 22, "fourth": 29, "fifth": 35, "sixth": 39, "A": 10, "B": 18, "C": 0, "D": 0, "E": 0, "F": 0, "G": 10, "H": 10, "AVG": 12 }, { "gender": "M", "age": 49, "gubun": "탄력", "first": 0.798059, "second": 0.721019, "third": 0.643979, "fourth": 0.566939, "fifth": 0.489899, "sixth": 0.412859, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 49, "gubun": "경피수분손실도", "first": 8.85, "second": 12.4, "third": 14, "fourth": 17.4, "fifth": 21, "sixth": 39.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 54, "gubun": "모공", "first": 46, "second": 51, "third": 56, "fourth": 66, "fifth": 71, "sixth": 76, "A": 62, "B": 58, "C": 0, "D": 0, "E": 0, "F": 0, "G": 62, "H": 62, "AVG": 61 }, { "gender": "M", "age": 54, "gubun": "주름", "first": 21, "second": 24, "third": 27, "fourth": 33, "fifth": 36, "sixth": 39, "A": 30, "B": 0, "C": 30, "D": 30, "E": 30, "F": 30, "G": 0, "H": 0, "AVG": 30 }, { "gender": "M", "age": 54, "gubun": "미래주름", "first": 0, "second": 2, "third": 5, "fourth": 11, "fifth": 14, "sixth": 17, "A": 8, "B": 0, "C": 0, "D": 0, "E": 7, "F": 7, "G": 9, "H": 9, "AVG": 8 }, { "gender": "M", "age": 54, "gubun": "색소침착", "first": 17, "second": 22, "third": 27, "fourth": 37, "fifth": 42, "sixth": 47, "A": 27, "B": 37, "C": 0, "D": 0, "E": 26, "F": 26, "G": 38, "H": 38, "AVG": 32 }, { "gender": "M", "age": 54, "gubun": "멜라닌", "first": 19, "second": 24, "third": 29, "fourth": 39, "fifth": 44, "sixth": 49, "A": 34, "B": 36, "C": 0, "D": 0, "E": 30, "F": 30, "G": 37, "H": 37, "AVG": 34 }, { "gender": "M", "age": 54, "gubun": "붉은기", "first": 4, "second": 7, "third": 10, "fourth": 16, "fifth": 19, "sixth": 22, "A": 10, "B": 18, "C": 0, "D": 0, "E": 9, "F": 9, "G": 16, "H": 16, "AVG": 13 }, { "gender": "M", "age": 54, "gubun": "포피린", "first": 14, "second": 18, "third": 22, "fourth": 29, "fifth": 35, "sixth": 39, "A": 10, "B": 18, "C": 0, "D": 0, "E": 0, "F": 0, "G": 10, "H": 10, "AVG": 12 }, { "gender": "M", "age": 54, "gubun": "탄력", "first": 0.747938, "second": 0.675478, "third": 0.603018, "fourth": 0.530558, "fifth": 0.458098, "sixth": 0.385638, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 54, "gubun": "경피수분손실도", "first": 8.85, "second": 12.4, "third": 14, "fourth": 17.4, "fifth": 21, "sixth": 39.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 59, "gubun": "모공", "first": 48, "second": 53, "third": 58, "fourth": 68, "fifth": 73, "sixth": 78, "A": 65, "B": 59, "C": 0, "D": 0, "E": 0, "F": 0, "G": 64, "H": 64, "AVG": 63 }, { "gender": "M", "age": 59, "gubun": "주름", "first": 21, "second": 24, "third": 27, "fourth": 33, "fifth": 36, "sixth": 39, "A": 32, "B": 0, "C": 30, "D": 30, "E": 30, "F": 30, "G": 0, "H": 0, "AVG": 30.4 }, { "gender": "M", "age": 59, "gubun": "미래주름", "first": 0, "second": 2, "third": 5, "fourth": 11, "fifth": 14, "sixth": 17, "A": 8, "B": 0, "C": 0, "D": 0, "E": 7, "F": 7, "G": 9, "H": 9, "AVG": 8 }, { "gender": "M", "age": 59, "gubun": "색소침착", "first": 19, "second": 24, "third": 29, "fourth": 39, "fifth": 44, "sixth": 49, "A": 29, "B": 39, "C": 0, "D": 0, "E": 28, "F": 28, "G": 40, "H": 40, "AVG": 34 }, { "gender": "M", "age": 59, "gubun": "멜라닌", "first": 23, "second": 28, "third": 33, "fourth": 43, "fifth": 48, "sixth": 53, "A": 37, "B": 39, "C": 0, "D": 0, "E": 35, "F": 35, "G": 41, "H": 41, "AVG": 38 }, { "gender": "M", "age": 59, "gubun": "붉은기", "first": 4, "second": 7, "third": 10, "fourth": 16, "fifth": 19, "sixth": 22, "A": 10, "B": 18, "C": 0, "D": 0, "E": 9, "F": 9, "G": 16, "H": 16, "AVG": 13 }, { "gender": "M", "age": 59, "gubun": "포피린", "first": 14, "second": 18, "third": 22, "fourth": 29, "fifth": 35, "sixth": 39, "A": 10, "B": 18, "C": 0, "D": 0, "E": 0, "F": 0, "G": 10, "H": 10, "AVG": 12 }, { "gender": "M", "age": 59, "gubun": "탄력", "first": 0.747938, "second": 0.675478, "third": 0.603018, "fourth": 0.530558, "fifth": 0.458098, "sixth": 0.385638, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 59, "gubun": "경피수분손실도", "first": 8.85, "second": 12.4, "third": 14, "fourth": 17.4, "fifth": 21, "sixth": 39.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 69, "gubun": "모공", "first": 50, "second": 55, "third": 60, "fourth": 70, "fifth": 75, "sixth": 80, "A": 69, "B": 61, "C": 0, "D": 0, "E": 0, "F": 0, "G": 65, "H": 65, "AVG": 65 }, { "gender": "M", "age": 69, "gubun": "주름", "first": 23, "second": 26, "third": 29, "fourth": 35, "fifth": 38, "sixth": 41, "A": 34, "B": 0, "C": 31, "D": 31, "E": 32, "F": 32, "G": 0, "H": 0, "AVG": 32 }, { "gender": "M", "age": 69, "gubun": "미래주름", "first": 0, "second": 2, "third": 5, "fourth": 11, "fifth": 14, "sixth": 17, "A": 8, "B": 0, "C": 0, "D": 0, "E": 7, "F": 7, "G": 9, "H": 9, "AVG": 8 }, { "gender": "M", "age": 69, "gubun": "색소침착", "first": 22, "second": 27, "third": 32, "fourth": 42, "fifth": 47, "sixth": 52, "A": 32, "B": 40, "C": 0, "D": 0, "E": 33, "F": 33, "G": 42, "H": 42, "AVG": 37 }, { "gender": "M", "age": 69, "gubun": "멜라닌", "first": 26, "second": 31, "third": 36, "fourth": 46, "fifth": 51, "sixth": 56, "A": 41, "B": 43, "C": 0, "D": 0, "E": 38, "F": 38, "G": 43, "H": 43, "AVG": 41 }, { "gender": "M", "age": 69, "gubun": "붉은기", "first": 4, "second": 7, "third": 10, "fourth": 16, "fifth": 19, "sixth": 22, "A": 10, "B": 18, "C": 0, "D": 0, "E": 9, "F": 9, "G": 16, "H": 16, "AVG": 13 }, { "gender": "M", "age": 69, "gubun": "포피린", "first": 14, "second": 18, "third": 22, "fourth": 29, "fifth": 35, "sixth": 39, "A": 10, "B": 18, "C": 0, "D": 0, "E": 0, "F": 0, "G": 10, "H": 10, "AVG": 12 }, { "gender": "M", "age": 69, "gubun": "탄력", "first": 0.747938, "second": 0.675478, "third": 0.603018, "fourth": 0.530558, "fifth": 0.458098, "sixth": 0.385638, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 69, "gubun": "경피수분손실도", "first": 8.85, "second": 12.4, "third": 14, "fourth": 17.4, "fifth": 21, "sixth": 39.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 70, "gubun": "모공", "first": 52, "second": 57, "third": 62, "fourth": 72, "fifth": 77, "sixth": 82, "A": 70, "B": 62, "C": 0, "D": 0, "E": 0, "F": 0, "G": 68, "H": 68, "AVG": 67 }, { "gender": "M", "age": 70, "gubun": "주름", "first": 25, "second": 28, "third": 31, "fourth": 37, "fifth": 40, "sixth": 43, "A": 36, "B": 0, "C": 33, "D": 33, "E": 34, "F": 34, "G": 0, "H": 0, "AVG": 34 }, { "gender": "M", "age": 70, "gubun": "미래주름", "first": 0, "second": 2, "third": 5, "fourth": 11, "fifth": 14, "sixth": 17, "A": 8, "B": 0, "C": 0, "D": 0, "E": 7, "F": 7, "G": 9, "H": 9, "AVG": 8 }, { "gender": "M", "age": 70, "gubun": "색소침착", "first": 26, "second": 31, "third": 36, "fourth": 46, "fifth": 51, "sixth": 56, "A": 36, "B": 44, "C": 0, "D": 0, "E": 37, "F": 37, "G": 46, "H": 46, "AVG": 41 }, { "gender": "M", "age": 70, "gubun": "멜라닌", "first": 30, "second": 35, "third": 40, "fourth": 50, "fifth": 55, "sixth": 60, "A": 43, "B": 53, "C": 0, "D": 0, "E": 41, "F": 41, "G": 46, "H": 46, "AVG": 45 }, { "gender": "M", "age": 70, "gubun": "붉은기", "first": 4, "second": 7, "third": 10, "fourth": 16, "fifth": 19, "sixth": 22, "A": 10, "B": 18, "C": 0, "D": 0, "E": 9, "F": 9, "G": 16, "H": 16, "AVG": 13 }, { "gender": "M", "age": 70, "gubun": "포피린", "first": 14, "second": 18, "third": 22, "fourth": 29, "fifth": 35, "sixth": 39, "A": 10, "B": 18, "C": 0, "D": 0, "E": 0, "F": 0, "G": 10, "H": 10, "AVG": 12 }, { "gender": "M", "age": 70, "gubun": "탄력", "first": 0.747938, "second": 0.675478, "third": 0.603018, "fourth": 0.530558, "fifth": 0.458098, "sixth": 0.385638, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "M", "age": 70, "gubun": "경피수분손실도", "first": 8.85, "second": 12.4, "third": 14, "fourth": 17.4, "fifth": 21, "sixth": 39.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 19, "gubun": "모공", "first": 25, "second": 29, "third": 33, "fourth": 41, "fifth": 45, "sixth": 49, "A": 33.5, "B": 39, "C": 0, "D": 0, "E": 0, "F": 0, "G": 26.8, "H": 27.3, "AVG": 31.6 }, { "gender": "F", "age": 19, "gubun": "주름", "first": 7.4, "second": 11, "third": 12, "fourth": 13.6, "fifth": 15.6, "sixth": 19.4, "A": 16.8, "B": 0, "C": 10.2, "D": 10.9, "E": 14.5, "F": 14.7, "G": 0, "H": 0, "AVG": 13.4 }, { "gender": "F", "age": 19, "gubun": "미래주름", "first": 1, "second": 4, "third": 7, "fourth": 13, "fifth": 16, "sixth": 19, "A": 9, "B": 0, "C": 0, "D": 0, "E": 10, "F": 10, "G": 11, "H": 11, "AVG": 10.2 }, { "gender": "F", "age": 19, "gubun": "색소침착", "first": 3.8, "second": 11.3, "third": 14, "fourth": 17, "fifth": 21.2, "sixth": 34, "A": 13.6, "B": 23.7, "C": 0, "D": 0, "E": 12.3, "F": 12.7, "G": 16.1, "H": 16, "AVG": 15.7 }, { "gender": "F", "age": 19, "gubun": "멜라닌", "first": 1.2, "second": 4.8, "third": 6.2, "fourth": 7.7, "fifth": 10.8, "sixth": 20.2, "A": 7.3, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 7.6, "H": 7.9, "AVG": 7.6 }, { "gender": "F", "age": 19, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 3.5, "B": 9.8, "C": 0, "D": 0, "E": 3.9, "F": 4.2, "G": 6, "H": 6.1, "AVG": 5.1 }, { "gender": "F", "age": 19, "gubun": "포피린", "first": 0, "second": 5, "third": 15, "fourth": 30, "fifth": 45, "sixth": 50, "A": 11, "B": 19, "C": 0, "D": 0, "E": 0, "F": 0, "G": 9, "H": 9, "AVG": 12 }, { "gender": "F", "age": 19, "gubun": "탄력", "first": 1.053344, "second": 0.939084, "third": 0.824824, "fourth": 0.710564, "fifth": 0.596304, "sixth": 0.482044, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 19, "gubun": "경피수분손실도", "first": 7.1, "second": 9.15, "third": 11.35, "fourth": 14.25, "fifth": 16.75, "sixth": 32.1, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 24, "gubun": "모공", "first": 25, "second": 29, "third": 33, "fourth": 41, "fifth": 45, "sixth": 49, "A": 33.5, "B": 39, "C": 0, "D": 0, "E": 0, "F": 0, "G": 26.8, "H": 27.3, "AVG": 31.6 }, { "gender": "F", "age": 24, "gubun": "주름", "first": 7.4, "second": 11, "third": 12, "fourth": 13.6, "fifth": 15.6, "sixth": 19.4, "A": 16.8, "B": 0, "C": 10.2, "D": 10.9, "E": 14.5, "F": 14.7, "G": 0, "H": 0, "AVG": 13.4 }, { "gender": "F", "age": 24, "gubun": "미래주름", "first": 1, "second": 4, "third": 7, "fourth": 13, "fifth": 16, "sixth": 19, "A": 9, "B": 0, "C": 0, "D": 0, "E": 10, "F": 10, "G": 11, "H": 11, "AVG": 10.2 }, { "gender": "F", "age": 24, "gubun": "색소침착", "first": 3.8, "second": 11.3, "third": 14, "fourth": 17, "fifth": 21.2, "sixth": 34, "A": 13.6, "B": 23.7, "C": 0, "D": 0, "E": 12.3, "F": 12.7, "G": 16.1, "H": 16, "AVG": 15.7 }, { "gender": "F", "age": 24, "gubun": "멜라닌", "first": 1.2, "second": 4.8, "third": 6.2, "fourth": 7.7, "fifth": 10.8, "sixth": 20.2, "A": 7.3, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 7.6, "H": 7.9, "AVG": 7.6 }, { "gender": "F", "age": 24, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 3.5, "B": 9.8, "C": 0, "D": 0, "E": 3.9, "F": 4.2, "G": 6, "H": 6.1, "AVG": 5.1 }, { "gender": "F", "age": 24, "gubun": "포피린", "first": 0, "second": 5, "third": 15, "fourth": 30, "fifth": 45, "sixth": 50, "A": 11, "B": 19, "C": 0, "D": 0, "E": 0, "F": 0, "G": 9, "H": 9, "AVG": 12 }, { "gender": "F", "age": 24, "gubun": "탄력", "first": 1.053344, "second": 0.939084, "third": 0.824824, "fourth": 0.710564, "fifth": 0.596304, "sixth": 0.482044, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 24, "gubun": "경피수분손실도", "first": 7.1, "second": 9.15, "third": 11.35, "fourth": 14.25, "fifth": 16.75, "sixth": 32.1, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 29, "gubun": "모공", "first": 25, "second": 29, "third": 33, "fourth": 41, "fifth": 45, "sixth": 49, "A": 33.5, "B": 39, "C": 0, "D": 0, "E": 0, "F": 0, "G": 26.8, "H": 27.3, "AVG": 31.6 }, { "gender": "F", "age": 29, "gubun": "주름", "first": 7.4, "second": 11, "third": 12, "fourth": 13.6, "fifth": 15.6, "sixth": 19.4, "A": 16.8, "B": 0, "C": 10.2, "D": 10.9, "E": 14.5, "F": 14.7, "G": 0, "H": 0, "AVG": 13.4 }, { "gender": "F", "age": 29, "gubun": "미래주름", "first": 1, "second": 4, "third": 7, "fourth": 13, "fifth": 16, "sixth": 19, "A": 9, "B": 0, "C": 0, "D": 0, "E": 10, "F": 10, "G": 11, "H": 11, "AVG": 10.2 }, { "gender": "F", "age": 29, "gubun": "색소침착", "first": 3.8, "second": 11.3, "third": 14, "fourth": 17, "fifth": 21.2, "sixth": 34, "A": 13.6, "B": 23.7, "C": 0, "D": 0, "E": 12.3, "F": 12.7, "G": 16.1, "H": 16, "AVG": 15.7 }, { "gender": "F", "age": 29, "gubun": "멜라닌", "first": 1.2, "second": 4.8, "third": 6.2, "fourth": 7.7, "fifth": 10.8, "sixth": 20.2, "A": 7.3, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 7.6, "H": 7.9, "AVG": 7.6 }, { "gender": "F", "age": 29, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 3.5, "B": 9.8, "C": 0, "D": 0, "E": 3.9, "F": 4.2, "G": 6, "H": 6.1, "AVG": 5.1 }, { "gender": "F", "age": 29, "gubun": "포피린", "first": 0, "second": 5, "third": 15, "fourth": 30, "fifth": 45, "sixth": 50, "A": 11, "B": 19, "C": 0, "D": 0, "E": 0, "F": 0, "G": 9, "H": 9, "AVG": 12 }, { "gender": "F", "age": 29, "gubun": "탄력", "first": 1.053344, "second": 0.939084, "third": 0.824824, "fourth": 0.710564, "fifth": 0.596304, "sixth": 0.482044, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 29, "gubun": "경피수분손실도", "first": 7.1, "second": 9.15, "third": 11.35, "fourth": 14.25, "fifth": 16.75, "sixth": 32.1, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 34, "gubun": "모공", "first": 29, "second": 33, "third": 37, "fourth": 45, "fifth": 49, "sixth": 53, "A": 36.1, "B": 40.1, "C": 0, "D": 0, "E": 0, "F": 0, "G": 31.9, "H": 32.2, "AVG": 35.1 }, { "gender": "F", "age": 34, "gubun": "주름", "first": 7.6, "second": 12.2, "third": 13.8, "fourth": 15.2, "fifth": 17, "sixth": 26.8, "A": 18, "B": 0, "C": 11.6, "D": 12.6, "E": 15.9, "F": 16.1, "G": 0, "H": 0, "AVG": 14.8 }, { "gender": "F", "age": 34, "gubun": "미래주름", "first": 1, "second": 4, "third": 7, "fourth": 13, "fifth": 16, "sixth": 19, "A": 9, "B": 0, "C": 0, "D": 0, "E": 10, "F": 10, "G": 11, "H": 11, "AVG": 10.2 }, { "gender": "F", "age": 34, "gubun": "색소침착", "first": 4.3, "second": 13.3, "third": 15.8, "fourth": 18.5, "fifth": 22, "sixth": 36.8, "A": 14.5, "B": 25.9, "C": 0, "D": 0, "E": 13.6, "F": 14.4, "G": 18.5, "H": 18.7, "AVG": 17.6 }, { "gender": "F", "age": 34, "gubun": "멜라닌", "first": 2, "second": 6, "third": 7.8, "fourth": 9.5, "fifth": 12.3, "sixth": 30.8, "A": 7.3, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 9, "H": 9.8, "AVG": 8.7 }, { "gender": "F", "age": 34, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 3.5, "B": 9.8, "C": 0, "D": 0, "E": 3.9, "F": 4.2, "G": 6, "H": 6.1, "AVG": 5.3 }, { "gender": "F", "age": 34, "gubun": "포피린", "first": 0, "second": 5, "third": 15, "fourth": 30, "fifth": 45, "sixth": 50, "A": 11, "B": 19, "C": 0, "D": 0, "E": 0, "F": 0, "G": 9, "H": 9, "AVG": 12 }, { "gender": "F", "age": 34, "gubun": "탄력", "first": 0.917858, "second": 0.836938, "third": 0.756018, "fourth": 0.675098, "fifth": 0.594178, "sixth": 0.513258, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 34, "gubun": "경피수분손실도", "first": 6.15, "second": 9.35, "third": 11.6, "fourth": 13, "fifth": 15.7, "sixth": 29.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 39, "gubun": "모공", "first": 31, "second": 35, "third": 39, "fourth": 47, "fifth": 51, "sixth": 55, "A": 37, "B": 42.4, "C": 0, "D": 0, "E": 0, "F": 0, "G": 33.3, "H": 34, "AVG": 36.7 }, { "gender": "F", "age": 39, "gubun": "주름", "first": 8.4, "second": 13.6, "third": 14.8, "fourth": 16, "fifth": 17.4, "sixth": 28.2, "A": 18.6, "B": 0, "C": 12.9, "D": 14, "E": 16.7, "F": 17.1, "G": 0, "H": 0, "AVG": 15.8 }, { "gender": "F", "age": 39, "gubun": "미래주름", "first": 1, "second": 4, "third": 7, "fourth": 13, "fifth": 16, "sixth": 19, "A": 9, "B": 0, "C": 0, "D": 0, "E": 10, "F": 10, "G": 11, "H": 11, "AVG": 10.2 }, { "gender": "F", "age": 39, "gubun": "색소침착", "first": 7, "second": 14.2, "third": 16.8, "fourth": 20.2, "fifth": 23.5, "sixth": 36.7, "A": 15.3, "B": 26.8, "C": 0, "D": 0, "E": 15.5, "F": 15.5, "G": 19.7, "H": 19.6, "AVG": 18.7 }, { "gender": "F", "age": 39, "gubun": "멜라닌", "first": 2.2, "second": 7.3, "third": 8.8, "fourth": 11.3, "fifth": 14.3, "sixth": 30.2, "A": 8.1, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 10, "H": 10.8, "AVG": 9.6 }, { "gender": "F", "age": 39, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 3.5, "B": 9.8, "C": 0, "D": 0, "E": 3.9, "F": 4.2, "G": 6, "H": 6.1, "AVG": 5.6 }, { "gender": "F", "age": 39, "gubun": "포피린", "first": 0, "second": 5, "third": 15, "fourth": 30, "fifth": 45, "sixth": 50, "A": 11, "B": 19, "C": 0, "D": 0, "E": 0, "F": 0, "G": 9, "H": 9, "AVG": 12 }, { "gender": "F", "age": 39, "gubun": "탄력", "first": 0.917858, "second": 0.836938, "third": 0.756018, "fourth": 0.675098, "fifth": 0.594178, "sixth": 0.513258, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 39, "gubun": "경피수분손실도", "first": 6.15, "second": 9.35, "third": 11.6, "fourth": 13, "fifth": 15.7, "sixth": 29.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 44, "gubun": "모공", "first": 34, "second": 38, "third": 42, "fourth": 50, "fifth": 54, "sixth": 58, "A": 39.3, "B": 44.6, "C": 0, "D": 0, "E": 0, "F": 0, "G": 34.8, "H": 35.2, "AVG": 38.5 }, { "gender": "F", "age": 44, "gubun": "주름", "first": 8, "second": 14.8, "third": 15.6, "fourth": 17.4, "fifth": 20.2, "sixth": 24, "A": 19.7, "B": 0, "C": 14.9, "D": 15.1, "E": 18.3, "F": 18.4, "G": 0, "H": 0, "AVG": 17.3 }, { "gender": "F", "age": 44, "gubun": "미래주름", "first": 1, "second": 4, "third": 7, "fourth": 13, "fifth": 16, "sixth": 19, "A": 9, "B": 0, "C": 0, "D": 0, "E": 10, "F": 10, "G": 11, "H": 11, "AVG": 10.2 }, { "gender": "F", "age": 44, "gubun": "색소침착", "first": 5.6, "second": 15.2, "third": 17.3, "fourth": 20.5, "fifth": 23.3, "sixth": 40.8, "A": 16.6, "B": 29.1, "C": 0, "D": 0, "E": 16, "F": 16.2, "G": 19.4, "H": 19.5, "AVG": 19.5 }, { "gender": "F", "age": 44, "gubun": "멜라닌", "first": 3.3, "second": 8.5, "third": 11.2, "fourth": 13.3, "fifth": 15.8, "sixth": 30.2, "A": 8.4, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 11.7, "H": 12.2, "AVG": 10.8 }, { "gender": "F", "age": 44, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 3.5, "B": 9.8, "C": 0, "D": 0, "E": 3.9, "F": 4.2, "G": 6, "H": 6.1, "AVG": 5.6 }, { "gender": "F", "age": 44, "gubun": "포피린", "first": 0, "second": 5, "third": 15, "fourth": 30, "fifth": 45, "sixth": 50, "A": 11, "B": 19, "C": 0, "D": 0, "E": 0, "F": 0, "G": 9, "H": 9, "AVG": 12 }, { "gender": "F", "age": 44, "gubun": "탄력", "first": 0.876296, "second": 0.794096, "third": 0.711896, "fourth": 0.629696, "fifth": 0.547496, "sixth": 0.465296, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 44, "gubun": "경피수분손실도", "first": 6.15, "second": 9.35, "third": 11.6, "fourth": 13, "fifth": 15.7, "sixth": 29.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 49, "gubun": "모공", "first": 36, "second": 40, "third": 44, "fourth": 52, "fifth": 56, "sixth": 60, "A": 43.9, "B": 46, "C": 0, "D": 0, "E": 0, "F": 0, "G": 38.5, "H": 38.9, "AVG": 41.8 }, { "gender": "F", "age": 49, "gubun": "주름", "first": 16, "second": 16.8, "third": 17.8, "fourth": 18.4, "fifth": 20.6, "sixth": 26.4, "A": 21.9, "B": 0, "C": 16.6, "D": 17.1, "E": 18.4, "F": 18.8, "G": 0, "H": 0, "AVG": 18.6 }, { "gender": "F", "age": 49, "gubun": "미래주름", "first": 1, "second": 4, "third": 7, "fourth": 13, "fifth": 16, "sixth": 19, "A": 9, "B": 0, "C": 0, "D": 0, "E": 10, "F": 10, "G": 11, "H": 11, "AVG": 10.2 }, { "gender": "F", "age": 49, "gubun": "색소침착", "first": 13.2, "second": 16.2, "third": 17.8, "fourth": 20.5, "fifth": 23.8, "sixth": 37.7, "A": 17.2, "B": 31, "C": 0, "D": 0, "E": 16.9, "F": 17.4, "G": 20.8, "H": 20.8, "AVG": 20.7 }, { "gender": "F", "age": 49, "gubun": "멜라닌", "first": 8, "second": 9.7, "third": 11.3, "fourth": 15.2, "fifth": 18.5, "sixth": 24.5, "A": 9.2, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 13.4, "H": 14, "AVG": 12.2 }, { "gender": "F", "age": 49, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 3.5, "B": 9.8, "C": 0, "D": 0, "E": 3.9, "F": 4.2, "G": 6, "H": 6.1, "AVG": 6 }, { "gender": "F", "age": 49, "gubun": "포피린", "first": 0, "second": 5, "third": 15, "fourth": 30, "fifth": 45, "sixth": 50, "A": 11, "B": 19, "C": 0, "D": 0, "E": 0, "F": 0, "G": 9, "H": 9, "AVG": 12 }, { "gender": "F", "age": 49, "gubun": "탄력", "first": 0.876296, "second": 0.794096, "third": 0.711896, "fourth": 0.629696, "fifth": 0.547496, "sixth": 0.465296, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 49, "gubun": "경피수분손실도", "first": 6.15, "second": 9.35, "third": 11.6, "fourth": 13, "fifth": 15.7, "sixth": 29.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 54, "gubun": "모공", "first": 41, "second": 45, "third": 49, "fourth": 57, "fifth": 61, "sixth": 65, "A": 46.3, "B": 52.1, "C": 0, "D": 0, "E": 0, "F": 0, "G": 46.1, "H": 45.1, "AVG": 47.4 }, { "gender": "F", "age": 54, "gubun": "주름", "first": 14.4, "second": 17.6, "third": 19.6, "fourth": 21.8, "fifth": 23.8, "sixth": 25.6, "A": 23.1, "B": 0, "C": 17.6, "D": 19.4, "E": 22.3, "F": 21.9, "G": 0, "H": 0, "AVG": 20.9 }, { "gender": "F", "age": 54, "gubun": "미래주름", "first": 1, "second": 4, "third": 7, "fourth": 13, "fifth": 16, "sixth": 19, "A": 9, "B": 0, "C": 0, "D": 0, "E": 10, "F": 10, "G": 11, "H": 11, "AVG": 10.2 }, { "gender": "F", "age": 54, "gubun": "색소침착", "first": 14.5, "second": 19.8, "third": 22.8, "fourth": 28.2, "fifth": 29.5, "sixth": 35.3, "A": 19.1, "B": 35.2, "C": 0, "D": 0, "E": 22.5, "F": 23.3, "G": 26, "H": 27, "AVG": 25.5 }, { "gender": "F", "age": 54, "gubun": "멜라닌", "first": 10.5, "second": 13.5, "third": 17.8, "fourth": 21.5, "fifth": 25, "sixth": 33.5, "A": 11.3, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 18.4, "H": 19.4, "AVG": 16.4 }, { "gender": "F", "age": 54, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 3.5, "B": 9.8, "C": 0, "D": 0, "E": 3.9, "F": 4.2, "G": 6, "H": 6.1, "AVG": 5.6 }, { "gender": "F", "age": 54, "gubun": "포피린", "first": 0, "second": 5, "third": 15, "fourth": 30, "fifth": 45, "sixth": 50, "A": 11, "B": 19, "C": 0, "D": 0, "E": 0, "F": 0, "G": 9, "H": 9, "AVG": 12 }, { "gender": "F", "age": 54, "gubun": "탄력", "first": 0.795516, "second": 0.729396, "third": 0.663276, "fourth": 0.597156, "fifth": 0.531036, "sixth": 0.464916, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 54, "gubun": "경피수분손실도", "first": 6.15, "second": 9.35, "third": 11.6, "fourth": 13, "fifth": 15.7, "sixth": 29.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 59, "gubun": "모공", "first": 41, "second": 45, "third": 49, "fourth": 57, "fifth": 61, "sixth": 65, "A": 46.3, "B": 52.1, "C": 0, "D": 0, "E": 0, "F": 0, "G": 46.1, "H": 45.1, "AVG": 47.4 }, { "gender": "F", "age": 59, "gubun": "주름", "first": 14.4, "second": 17.6, "third": 19.6, "fourth": 21.8, "fifth": 23.8, "sixth": 25.6, "A": 23.1, "B": 0, "C": 17.6, "D": 19.4, "E": 22.3, "F": 21.9, "G": 0, "H": 0, "AVG": 20.9 }, { "gender": "F", "age": 59, "gubun": "미래주름", "first": 1, "second": 4, "third": 7, "fourth": 13, "fifth": 16, "sixth": 19, "A": 9, "B": 0, "C": 0, "D": 0, "E": 10, "F": 10, "G": 11, "H": 11, "AVG": 10.2 }, { "gender": "F", "age": 59, "gubun": "색소침착", "first": 14.5, "second": 19.8, "third": 22.8, "fourth": 28.2, "fifth": 29.5, "sixth": 35.3, "A": 19.1, "B": 35.2, "C": 0, "D": 0, "E": 22.5, "F": 23.3, "G": 26, "H": 27, "AVG": 25.5 }, { "gender": "F", "age": 59, "gubun": "멜라닌", "first": 10.5, "second": 13.5, "third": 17.8, "fourth": 21.5, "fifth": 25, "sixth": 33.5, "A": 11.3, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 18.4, "H": 19.4, "AVG": 16.4 }, { "gender": "F", "age": 59, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 3.5, "B": 9.8, "C": 0, "D": 0, "E": 3.9, "F": 4.2, "G": 6, "H": 6.1, "AVG": 5.6 }, { "gender": "F", "age": 59, "gubun": "포피린", "first": 0, "second": 5, "third": 15, "fourth": 30, "fifth": 45, "sixth": 50, "A": 11, "B": 19, "C": 0, "D": 0, "E": 0, "F": 0, "G": 9, "H": 9, "AVG": 12 }, { "gender": "F", "age": 59, "gubun": "탄력", "first": 0.795516, "second": 0.729396, "third": 0.663276, "fourth": 0.597156, "fifth": 0.531036, "sixth": 0.464916, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 59, "gubun": "경피수분손실도", "first": 6.15, "second": 9.35, "third": 11.6, "fourth": 13, "fifth": 15.7, "sixth": 29.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 69, "gubun": "모공", "first": 41, "second": 45, "third": 49, "fourth": 57, "fifth": 61, "sixth": 65, "A": 46.3, "B": 52.1, "C": 0, "D": 0, "E": 0, "F": 0, "G": 46.1, "H": 45.1, "AVG": 47.4 }, { "gender": "F", "age": 69, "gubun": "주름", "first": 14.4, "second": 17.6, "third": 19.6, "fourth": 21.8, "fifth": 23.8, "sixth": 25.6, "A": 23.1, "B": 0, "C": 17.6, "D": 19.4, "E": 22.3, "F": 21.9, "G": 0, "H": 0, "AVG": 20.9 }, { "gender": "F", "age": 69, "gubun": "미래주름", "first": 1, "second": 4, "third": 7, "fourth": 13, "fifth": 16, "sixth": 19, "A": 9, "B": 0, "C": 0, "D": 0, "E": 10, "F": 10, "G": 11, "H": 11, "AVG": 10.2 }, { "gender": "F", "age": 69, "gubun": "색소침착", "first": 14.5, "second": 19.8, "third": 22.8, "fourth": 28.2, "fifth": 29.5, "sixth": 35.3, "A": 19.1, "B": 35.2, "C": 0, "D": 0, "E": 22.5, "F": 23.3, "G": 26, "H": 27, "AVG": 25.5 }, { "gender": "F", "age": 69, "gubun": "멜라닌", "first": 10.5, "second": 13.5, "third": 17.8, "fourth": 21.5, "fifth": 25, "sixth": 33.5, "A": 11.3, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 18.4, "H": 19.4, "AVG": 16.4 }, { "gender": "F", "age": 69, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 3.5, "B": 9.8, "C": 0, "D": 0, "E": 3.9, "F": 4.2, "G": 6, "H": 6.1, "AVG": 5.6 }, { "gender": "F", "age": 69, "gubun": "포피린", "first": 0, "second": 5, "third": 15, "fourth": 30, "fifth": 45, "sixth": 50, "A": 11, "B": 19, "C": 0, "D": 0, "E": 0, "F": 0, "G": 9, "H": 9, "AVG": 12 }, { "gender": "F", "age": 69, "gubun": "탄력", "first": 0.795516, "second": 0.729396, "third": 0.663276, "fourth": 0.597156, "fifth": 0.531036, "sixth": 0.464916, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 69, "gubun": "경피수분손실도", "first": 6.15, "second": 9.35, "third": 11.6, "fourth": 13, "fifth": 15.7, "sixth": 29.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 70, "gubun": "모공", "first": 55, "second": 60, "third": 65, "fourth": 70, "fifth": 75, "sixth": 80, "A": 69, "B": 61, "C": 0, "D": 0, "E": 0, "F": 0, "G": 65, "H": 65, "AVG": 65 }, { "gender": "F", "age": 70, "gubun": "주름", "first": 26, "second": 29, "third": 32, "fourth": 35, "fifth": 38, "sixth": 41, "A": 34, "B": 0, "C": 31, "D": 31, "E": 32, "F": 32, "G": 0, "H": 0, "AVG": 32 }, { "gender": "F", "age": 70, "gubun": "미래주름", "first": 2, "second": 5, "third": 8, "fourth": 11, "fifth": 14, "sixth": 17, "A": 8, "B": 0, "C": 0, "D": 0, "E": 7, "F": 7, "G": 9, "H": 9, "AVG": 8 }, { "gender": "F", "age": 70, "gubun": "색소침착", "first": 27, "second": 32, "third": 37, "fourth": 42, "fifth": 47, "sixth": 52, "A": 32, "B": 40, "C": 0, "D": 0, "E": 33, "F": 33, "G": 42, "H": 42, "AVG": 37 }, { "gender": "F", "age": 70, "gubun": "멜라닌", "first": 31, "second": 36, "third": 41, "fourth": 46, "fifth": 51, "sixth": 56, "A": 41, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 43, "H": 43, "AVG": 42.3 }, { "gender": "F", "age": 70, "gubun": "붉은기", "first": 1.8, "second": 3.6, "third": 5.4, "fourth": 7.2, "fifth": 11, "sixth": 12.8, "A": 10, "B": 18, "C": 0, "D": 0, "E": 9, "F": 9, "G": 16, "H": 16, "AVG": 13 }, { "gender": "F", "age": 70, "gubun": "포피린", "first": 0, "second": 18, "third": 22, "fourth": 29, "fifth": 35, "sixth": 50, "A": 10, "B": 18, "C": 0, "D": 0, "E": 0, "F": 0, "G": 10, "H": 10, "AVG": 12 }, { "gender": "F", "age": 70, "gubun": "탄력", "first": 0.795516, "second": 0.729396, "third": 0.663276, "fourth": 0.597156, "fifth": 0.531036, "sixth": 0.464916, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }, { "gender": "F", "age": 70, "gubun": "경피수분손실도", "first": 6.15, "second": 9.35, "third": 11.6, "fourth": 13, "fifth": 15.7, "sixth": 29.3, "A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "AVG": 0 }]
//Result_Sensitive_Entity
const list_rse = [{ "s_type": "S0", "s_type_name": "건강한 피부", "s_result": "일상 생활 습관, 계절 또는 환경 변화 등에 반응성이 적은 건강한 피부 입니다." }, { "s_type": "S1", "s_type_name": "가벼운 민감성", "s_result": "일상 생활 습관, 계절 또는 환경 변화 등에 간지러운 것 같은 느낌 혹은 오돌도돌 피부가 거칠고 건조한 느낌을 가끔씩 받을 수 있습니다." }, { "s_type": "S2", "s_type_name": "지복합 민감", "s_result": "일상 생활 습관, 계절 또는 환경 변화 등에 의해 트러블이 자주 생기며 종종 가려움 혹은 속건조등이 동반됩니다." }, { "s_type": "S3", "s_type_name": "건성 민감", "s_result": "일상 생활 습관, 계절 또는 환경 변화 등에 의해 자주 가렵고 따가움을 느끼며, 각질 부각과 트러블이 발생할 수 있습니다." }, { "s_type": "S4", "s_type_name": "붉은기 민감", "s_result": "일상 생활 습관, 계절 또는 환경 변화 등에 의해 자주 화끈거리고 붉어질 수 있습니다." }]
//Result_Soultion_Entity
const list_rsse = [{ "s_type_number": "1", "s_type_gomin": "건성 / 안티에이징 고민(주름 & 탄력)", "s_result": "각질층 수분량이 부족하여 건조한 피부입니다.\n\n탄력섬유인 콜라겐과 엘라스틴이 노화로 인해 감소되면서 주름이 생성되거나 탄력이 저하 될 수 있습니다.", "s_beauty_tip": "- 너무 과도한 세안은 피하고, 미온수로 세안하는 것이 좋습니다.\n\n- 세안 후 건조한상태로 장시간 방치하기 보다는 바로 스킨케어 제품을 바르는것이 중요합니다.\n\n- 스킨케어 시 탄력 전용 제품을 사용하고, 다른 곳에 비해 눈가 잔주름이 빨리 나타나므로 눈가 전용 제품 사용을 추천합니다." }, { "s_type_number": "2", "s_type_gomin": "건성 / 미백고민(칙칙함 & 색소침착)", "s_result": "각질층 수분량이 부족하여 건조한 피부입니다.\n\n자외선 노출 시 멜라닌 색소세포의 자극으로 균일하지 않은 피부톤을 가질 수 있습니다.", "s_beauty_tip": "- 매일 6잔(1.5L) 이상의 충분한 수분을 섭취하고 적절한 수분 상태를 유지하며, 충분한 수면을 통해 피로가 쌓이지 않도록 하는것이 좋습니다.\n\n- 피부가 건조하면 잡티가 생기기 쉬우므로 고보습제품으로 유수분을 충분히 채워주고 미백제품을 통해 기미와 집티를 꾸준히 관리해 줍니다.\n\n- 기미와 잡티가 진해지는것을 예방하기 위해 자외선차단제를 반드시 4계절 사용하는것이 중요합니다." }, { "s_type_number": "3", "s_type_gomin": "건성 / 안티에이징 & 미백고민", "s_result": "각질층 수분량이 부족하여 건조한 피부입니다.\n\n자외선이 지속적으로 피부에 노출되면 콜라겐이 손상되어 주름을 증가시키고, 멜라닌 색소세포의 자극으로 균일하지 않은 피부톤을 가질 수 있습니다.", "s_beauty_tip": "- 수분을 빼앗는 흡연이나 음주, 카페인 섭취는 줄이고 생선 등 콜라겐이 함유되어 있는 음식이나 항산화성분이 많이 함유된 식품을 섭취하는 것이 좋습니다.\n\n- 피부 탄력 유지에 중요한 역할을 하는 콜라겐,엘라스틴을 강화하는 탄력 전용 제품 사용을 추천합니다.\n\n- 주름이 생성되고 색소침착이 진해지는것을 예방하기위해 자외선차단제를 반드시 4계절 사용하는것이 중요합니다." }, { "s_type_number": "4", "s_type_gomin": "건성 / 고민없음", "s_result": "각질층 수분량이 부족하여 건조한 피부입니다. \n\n모공이 대체적으로 작은편이며, 각질 턴오버가 원활하지 않아 거친 피부결을 가질 수 있습니다.", "s_beauty_tip": "- 수분을 빼앗는 흡연이나 음주, 카페인 섭취는 줄이고 생선 등 콜라겐이 함유되어 있는 음식이나 항산화성분이 많이 함유된 식품을 섭취하는 것이 좋습니다.\n\n- 세안 후 건조한상태로 장시간 방치하기 보다는 바로 스킨케어 제품을 바르는것이 중요합니다.\n\n- 건조한 피부환경은 잔주름을 빨리 유발하므로 유수분 공급을 충분히 할 수 있는 기초제품과 함께 안티에이징 제품을 꾸준히 사용하여 노화를 예방하는것을 추천합니다." }, { "s_type_number": "5", "s_type_gomin": "지성 / 안티에이징고민(주름 & 탄력)", "s_result": "피지가 과도하게 분비되는 피부입니다.\n\n과도한 피지로 모공이 넓어질 수 있으며, 콜라겐과 엘라스틴이 감소됨에 따라서 넓어진 모공도 주름처럼 변화 할 수 있습니다.", "s_beauty_tip": "- 클렌징시 모공이 발달되어있는 부분은 한번 더 롤링하여 꼼꼼한 세안으로 과잉피지를 깨끗하게 제거하는 것이 좋습니다. \n\n- 수분을 빼앗는 흡연이나 음주, 카페인 섭취는 줄이고 생선 등 콜라겐이 함유되어 있는 음식이나 항산화성분이 많이 함유된 식품을 섭취하는 것이 좋습니다.\n\n- 주름이 생성되지 않도록 자외선을 철저히 차단해 줍니다. 따라서 자외선차단제를 반드시 4계절 사용하는것이 중요합니다." }, { "s_type_number": "6", "s_type_gomin": "지성 / 미백고민(칙칙함 & 색소침착)", "s_result": "자외선이 지속적으로 피부에 노출 될 경우 멜라닌 색소세포가 생성되어 피부톤이 균일하지 않을 수 있으며, 열감으로 인하여 피지분비가 촉진 될 수 있습니다.\n\n각질이나 피지가 뒤엉켜 잘못 된 케어를 진행하였을때 피부에 흔적으로 남을 수 있습니다.", "s_beauty_tip": "- 클렌징시 모공이 발달되어있는 부분은 한번 더 롤링을하여 꼼꼼한 세안으로 과잉피지를 깨끗하게 제거하는 것이 좋습니다. \n\n- 기미와 잡티가 진해지는것을 예방하기 위해 자외선차단제를 반드시 4계절 사용하는것이 중요합니다.\n\n- 칙칙함과 색소침착을 케어하기 위한 미백 기능의 고기능성 에센스와 크림으로 지속적인 관리를 추천합니다." }, { "s_type_number": "7", "s_type_gomin": "지성 / 안티에이징 & 미백고민", "s_result": "과도한 피지분비로 인해 노화속도는 느린편입니다.\n\n자외선이 지속적으로 피부에 노출 될 경우 콜라겐이 손상되어 주름이 증가하거나, 색소침착이 발생될 수 있습니다.", "s_beauty_tip": "- 클렌징시 모공이 발달되어있는 부분은 한번 더 롤링을하여 꼼꼼한 세안으로 과잉피지를 깨끗하게 제거하는 것이 좋습니다. \n\n- 주름이 생성되거나 색소침착이 진해지는것을 예방하기위해 자외선차단제를 반드시 4계절 사용하는것이 중요합니다.\n\n- 피부를 맑게하는 비타민 C와 비타민 A(당근. 양배추, 시금치, 호박 등)등 항산화성분이 많이 함유된 식품의 섭취를 추천합니다." }, { "s_type_number": "8", "s_type_gomin": "지성 / 고민없음", "s_result": "산화된 피지가 각질세포의 턴오버를 저하시켜 피부가 탁해보일 수 있습니다.\n\n좁은 모공으로 많은 양의 피지가 원활하게 분비되지 못할 경우 피부의 문제점이 야기 될 수 있습니다.", "s_beauty_tip": "- 클렌징시 모공이 발달되어있는 부분은 한번 더 롤링을하여 꼼꼼한 세안으로 과잉피지를 깨끗하게 제거하는 것이 좋습니다.\n\n- 세포산화와 피지분비를 촉진하는 맵거나 기름진 음식, 지나치게 단 음식은 피하는것을 추천합니다.\n\n- 매일 6잔(1.5L) 이상의 충분한 수분을 섭취하고 충분한 수면을 통해 피로가 쌓이지 않도록 하는것이 좋습니다." }, { "s_type_number": "9", "s_type_gomin": "중성 / 안티에이징고민(주름 & 탄력)", "s_result": "유수분 발란스가 좋은 피부 입니다.\n\n자외선은 콜라겐을 손상시켜 주름이 생성될 수 있으며, 수분이 감소하게 되면 엘라스틴에 영향을 미칠 수 있습니다.\n\n계절이나 환경의 변화에 케어하는 습관이 필요합니다.", "s_beauty_tip": "- 유 수분이 균형을 이루는 현재 피부 상태를 유지할 수 있도록 매일 6잔(1.5L) 이상의 충분한 수분을 섭취하고, 적절한 실내 습도를 유지하는것이 좋습니다.\n\n- 주름을 생성하게 하는 자외선을 철저히 차단하기 위해 자외선차단제를 반드시 4계절 사용하는것이 중요합니다.\n\n- 스킨케어 시 탄력 전용 제품을 꼭 발라주고, 다른 곳에 비해 눈가 잔주름이 빨리 나타나므로 눈가 전용 제품 사용을 추천합니다." }, { "s_type_number": "10", "s_type_gomin": "중성 / 미백고민(칙칙함 & 색소침착)", "s_result": "유수분 발란스가 좋은 피부 입니다.\n\n건조한 피부일 경우 피부 장벽이 약화되어 자외선의 자극으로 색소침착이 생성 될 수 있습니다.\n\n전체적으로 칙칙한 피부일경우 스트레스, 외부자극, 묵은각질등이 원인일 수 있습니다.", "s_beauty_tip": "- 유 수분이 균형을 이루는 현재 피부 상태를 유지할 수 있도록 매일 6잔(1.5L) 이상의 충분한 수분을 섭취하고, 적절한 실내 습도를 유지하는것이 좋습니다.\n\n- 기미와 잡티가 진해지는것을 예방하기 위해 자외선차단제를 반드시 4계절 사용하는것이 중요합니다.\n\n- 피부를 맑게하는 비타민 C(딸기, 파프리카, 키위 등)와 비타민 A(당근. 양배추, 시금치, 호박 등)등 항산화성분이 많이 함유된 식품의 섭취를 추천합니다." }, { "s_type_number": "11", "s_type_gomin": "중성 / 안티에이징 & 미백고민", "s_result": "유수분 발란스가 좋은 피부 입니다.\n\n지속적인 자외선 노출 시 콜라겐 손상으로 주름이 생성되거나, 멜라닌 색소세포가 생성 될 수 있습니다.", "s_beauty_tip": "- 유 수분이 균형을 이루는 현재 피부 상태를 유지할 수 있도록 매일 6잔(1.5L) 이상의 충분한 수분을 섭취하고, 적절한 실내 습도를 유지하는것이 좋습니다.\n\n- 주름을 생성시키고 색소침착이 진해지는것을 예방하기위해 자외선차단제를 반드시 4계절 사용하는것이 중요합니다.\n\n- 건조한 피부환경은 잔주름을 빨리 유발하므로 유수분 공급을 충분히 할 수 있는 기초제품과 함께 안티에이징 제품을 꾸준히 사용하여 노화를 예방하는것을 추천합니다. " }, { "s_type_number": "12", "s_type_gomin": "중성 / 고민없음", "s_result": "유수분 발란스가 좋은 피부 입니다.\n\n피부가 당기는 부분이 없고 피부 장벽 기능 또한 좋은 건강한 피부 입니다.", "s_beauty_tip": "- 유 수분이 균형을 이루는 현재 피부 상태를 유지할 수 있도록 매일 6잔(1.5L) 이상의 충분한 수분을 섭취하고, 적절한 실내 습도를 유지하는것이 좋습니다.\n\n- 수분을 빼앗는 흡연이나 음주, 카페인 섭취는 줄이고 생선 등 콜라겐이 함유되어 있는 음식이나 항산화성분이 많이 함유된 식품을 섭취하는 것이 중요합니다.\n\n- 세안 후 건조한상태로 장시간 방치하기 보다는 바로 스킨케어 제품을 바르는것이 중요합니다." }, { "s_type_number": "13", "s_type_gomin": "복합성 / 안티에이징고민(주름 & 탄력)", "s_result": "피부가 건조한 부분은 잔주름이 발생될 가능성이 높습니다.\n\n건조한 피부에서는 엘라스틴에 영향을 미칠 수 있습니다.탄력감소와 주름이 생성될 수 있습니다.", "s_beauty_tip": "- 클렌징시 모공이 발달되어있는 부분은 한번 더 롤링하여 꼼꼼한 세안으로 과잉피지를 깨끗하게 제거하는 것이 좋습니다.\n\n- 주름을 생성시키고 색소침착이 진해지는것을 예방하기위해 자외선차단제를 반드시 4계절 사용하는것이 중요합니다.\n\n- 스킨케어 시 탄력 전용 제품을 꼭 발라주고, 다른 곳에 비해 눈가 잔주름이 빨리 나타나므로 눈가 전용 제품 사용을 추천합니다" }, { "s_type_number": "14", "s_type_gomin": "복합성 / 미백고민(칙칙함 & 색소침착)", "s_result": "피부가 건조한 부분은 피부 보호막이 잘 유지되지않아 외부 자극에 쉽게 칙칙해 질 수 있습니다.\n\n피지분비가 과도한 부분은 과도한 피지와 각질로 인해 피부톤이 균일하지 않게 보일 수 있습니다.", "s_beauty_tip": "- 클렌징시 모공이 발달되어있는 부분은 한번 더 롤링하여 꼼꼼한 세안으로 과잉피지를 깨끗하게 제거하는 것이 좋습니다.\n\n- 피부가 건조하면 잡티가 생기기 쉬우므로 고보습제품으로 유수분을 충분히 채워주고 미백제품을 통해 기미와 집티를 꾸준히 관리를 추천합니다." }, { "s_type_number": "15", "s_type_gomin": "복합성 / 안티에이징 & 미백고민", "s_result": "수분이 부족한 부분은 엘라스틴에 영향을 미칠 수 있습니다.\n\n탄력감소와 주름 생성이 진행 될 수 있습니다.\n\n건조한 피부 부위는 피부 보호막의 기능이 약해 색소침착이 쉽게 생성 될 수 있습니다.\n\n피지분비가 많은 피부 부위는 과도한 각질과 뒤엉킴으로 피부가 칙칙해 보일 수 있습니다.", "s_beauty_tip": "- 클렌징시 모공이 발달되어있는 부분은 한번 더 롤링하여 꼼꼼한 세안으로 과잉피지를 깨끗하게 제거하는 것이 좋습니다. \n\n- 주름을 생성시키고 색소침착이 진해지는것을 예방하기위해 자외선차단제를 반드시 4계절 사용하는것이 중요합니다.\n\n- 기미와 잡티가 진해지는것을 예방하기 위해 자외선차단제를 반드시 4계절 사용하는것을 추천합니다." }, { "s_type_number": "16", "s_type_gomin": "복합성 / 고민없음", "s_result": "피부결이 전체적으로 고르지 못해 보일 수 있습니다.\n\n외부 환경의 변화에 따라서 피부 부위별 유수분 발란스 차이가 발생될 수 있습니다.", "s_beauty_tip": "- 클렌징시 모공이 발달되어있는 부분은 한번 더 롤링하여 꼼꼼한 세안으로 과잉피지를 깨끗하게 제거하는 것이 좋습니다.\n\n- 세안 후 건조한상태로 장시간 방치하기 보다는 바로 스킨케어 제품을 바르는것이 중요합니다.\n\n- 수분을 빼앗는 흡연이나 음주, 카페인 섭취는 줄이고 생선 등 콜라겐이 함유되어 있는 음식이나 항산화성분이 많이 함유된 식품을 섭취하는 것을 추천합니다." }, { "s_type_number": "17", "s_type_gomin": "심각한 민감피부", "s_result": "온도변화나 외부자극에 예민하게 반응할 수 있습니다.\n\n건조한 피부의 경우 피부 장벽이 손상되어 피부가 자극을 느끼기 쉬우며 열감이 느껴지는 경우도 있습니다.", "s_beauty_tip": "- 피부 온도 변화나 찬 바람, 자외선에 쉽게 자극 받을 수 있으므로 평소 충분한 보습을 통해 유수분 균형을 맞춰주고 피부 장벽을 강화할수 있는 스킨케어제품을 사용하는것이 좋습니다.\n\n- 팩이나 마사지를 장시간 하지 않으며, 과도한 세안이나 자극적인 필링은 피하는것이 중요합니다.\n\n- 저자극 제품을 꾸준하게 사용하되 자신의 피부에 맞는 화장품 선택이 중요하므로 구입 전 성분을 꼼꼼하게 살펴보고 목 등에 발라 사전 테스트 후 사용하는것을 추천합니다." }, { "s_type_number": "18", "s_type_gomin": "심각한 여드름 피부", "s_result": "각질이 모공을 막아 원활하게 피지분비가 되지 않을때 흔적이 발생 될 수 있습니다.\n\n흔적이 발생 된 후 멜라닌의 증가로 자국이 나타날 수 있습니다.\n\n피부결이 거칠고 칙칙해 보일 수 있습니다.", "s_beauty_tip": "- 트러블 예방을 위해 가급적 매일 머리를 감는 것이 좋으며, 트러블 부위를 손으로 짜거나 만지지 않는것이 좋습니다.\n\n- 피부정화와 진정효과가 있는 스킨케어 제품과, 적당한 유수분공급을 통해 유수분 균형을 이루어  피부 장벽을 강화하는것을 추천합니다.\n\n- 트러블을 유발하는 맵거나 기름진 음식, 지나치게 단 음식은 피하고 매일 6잔(1.5L) 이상의 충분한 수분을 섭취하며 충분한 수면을 통해 피로가 쌓이지 않도록 하는것이 중요합니다." }, { "s_type_number": "19", "s_type_gomin": "심각한 민감 & 여드름 피부", "s_result": "피부장벽이 손상되어 쉽게 자극을 느끼기 쉬우며, 열감이 느껴질 수 있는 피부입니다.\n\n각질 턴오버 저하로 피부 고민이 발생 될 수 있습니다.", "s_beauty_tip": "- 팩이나 마사지를 장시간 하지 않으며, 과도한 세안이나 자극적인 필링은 피하는것이 중요합니다.\n\n- 저자극 제품을 꾸준하게 사용하되 자신의 피부에 맞는 화장품 선택이 중요하므로 구입 전 성분을 꼼꼼하게 살펴보고 목 등에 발라 사전 테스트 후 사용하는것을 추천합니다.\n\n- 트러블 예방을 위해 가급적 매일 머리를 감는 것이 좋으며, 트러블 부위를 손으로 짜거나 만지지 않는것이 좋습니다." }]
const list_rule_data = [{ "solution_type_number": "1", "solution_type_name": "건성 A", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "1", "solution_type_name": "건성 A", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "1", "solution_type_name": "건성 A", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "1", "solution_type_name": "건성 A", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "1", "solution_type_name": "건성 A", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "1", "solution_type_name": "건성 A", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "2", "solution_type_name": "건성 T", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "2", "solution_type_name": "건성 T", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "2", "solution_type_name": "건성 T", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "2", "solution_type_name": "건성 T", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "2", "solution_type_name": "건성 T", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "2", "solution_type_name": "건성 T", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "3", "solution_type_name": "건성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "3", "solution_type_name": "건성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "3", "solution_type_name": "건성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "3", "solution_type_name": "건성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "3", "solution_type_name": "건성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "3", "solution_type_name": "건성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "3", "solution_type_name": "건성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "3", "solution_type_name": "건성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "3", "solution_type_name": "건성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "4", "solution_type_name": "건성 -", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "4", "solution_type_name": "건성 -", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "4", "solution_type_name": "건성 -", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "4", "solution_type_name": "건성 -", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": false, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "5", "solution_type_name": "지성 A", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "5", "solution_type_name": "지성 A", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "5", "solution_type_name": "지성 A", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "5", "solution_type_name": "지성 A", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "5", "solution_type_name": "지성 A", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "5", "solution_type_name": "지성 A", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "6", "solution_type_name": "지성 T", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "6", "solution_type_name": "지성 T", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "6", "solution_type_name": "지성 T", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "6", "solution_type_name": "지성 T", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "6", "solution_type_name": "지성 T", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "6", "solution_type_name": "지성 T", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "7", "solution_type_name": "지성 AT", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "7", "solution_type_name": "지성 AT", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "7", "solution_type_name": "지성 AT", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "7", "solution_type_name": "지성 AT", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "7", "solution_type_name": "지성 AT", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "7", "solution_type_name": "지성 AT", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "7", "solution_type_name": "지성 AT", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "7", "solution_type_name": "지성 AT", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "7", "solution_type_name": "지성 AT", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "8", "solution_type_name": "지성 -", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "8", "solution_type_name": "지성 -", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "8", "solution_type_name": "지성 -", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "8", "solution_type_name": "지성 -", "tzone_value_01": false, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "9", "solution_type_name": "중성 A", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "9", "solution_type_name": "중성 A", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "9", "solution_type_name": "중성 A", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "9", "solution_type_name": "중성 A", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "9", "solution_type_name": "중성 A", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "9", "solution_type_name": "중성 A", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "10", "solution_type_name": "중성 T", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "10", "solution_type_name": "중성 T", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "10", "solution_type_name": "중성 T", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "10", "solution_type_name": "중성 T", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "10", "solution_type_name": "중성 T", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "10", "solution_type_name": "중성 T", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "11", "solution_type_name": "중성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "11", "solution_type_name": "중성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "11", "solution_type_name": "중성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "11", "solution_type_name": "중성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "11", "solution_type_name": "중성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "11", "solution_type_name": "중성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "11", "solution_type_name": "중성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "11", "solution_type_name": "중성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "11", "solution_type_name": "중성 AT", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "12", "solution_type_name": "중성 -", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "12", "solution_type_name": "중성 -", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "12", "solution_type_name": "중성 -", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "12", "solution_type_name": "중성 -", "tzone_value_01": true, "tzone_value_02": true, "tzone_value_03": true, "uzone_value_01": false, "uzone_value_02": true, "uzone_value_03": false, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "13", "solution_type_name": "복합성 A", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "13", "solution_type_name": "복합성 A", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "13", "solution_type_name": "복합성 A", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "13", "solution_type_name": "복합성 A", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "13", "solution_type_name": "복합성 A", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "13", "solution_type_name": "복합성 A", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "14", "solution_type_name": "복합성 T", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "14", "solution_type_name": "복합성 T", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "14", "solution_type_name": "복합성 T", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "14", "solution_type_name": "복합성 T", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "14", "solution_type_name": "복합성 T", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "14", "solution_type_name": "복합성 T", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "15", "solution_type_name": "복합성 AT", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "15", "solution_type_name": "복합성 AT", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "15", "solution_type_name": "복합성 AT", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": true, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "15", "solution_type_name": "복합성 AT", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "15", "solution_type_name": "복합성 AT", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "15", "solution_type_name": "복합성 AT", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": true, "FFutrueWrinkle_value_05": true, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "15", "solution_type_name": "복합성 AT", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": true, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": true, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "15", "solution_type_name": "복합성 AT", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": true, "FMelanin_value_05": true, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "15", "solution_type_name": "복합성 AT", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": true, "FPore_value_05": true, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": true, "FPigmentation_value_05": true, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "16", "solution_type_name": "복합성 -", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "16", "solution_type_name": "복합성 -", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": true, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "16", "solution_type_name": "복합성 -", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": true, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "16", "solution_type_name": "복합성 -", "tzone_value_01": true, "tzone_value_02": false, "tzone_value_03": true, "uzone_value_01": true, "uzone_value_02": false, "uzone_value_03": true, "FPore_value_01": true, "FPore_value_02": true, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": true, "FFutrueWrinkle_value_02": true, "FFutrueWrinkle_value_03": true, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": true, "FPigmentation_value_02": true, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": true, "FMelanin_value_02": true, "FMelanin_value_03": true, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "17", "solution_type_name": "심각한 민감피부", "tzone_value_01": false, "tzone_value_02": false, "tzone_value_03": false, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": false, "FRedness_value_02": false, "FRedness_value_03": false, "FRedness_value_04": true, "FRedness_value_05": true, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": true, "FPorphyrin_value_02": true, "FPorphyrin_value_03": true, "FPorphyrin_value_04": false, "FPorphyrin_value_05": false }, { "solution_type_number": "18", "solution_type_name": "심각한 여드름 피부", "tzone_value_01": false, "tzone_value_02": false, "tzone_value_03": false, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": true, "FRedness_value_02": true, "FRedness_value_03": true, "FRedness_value_04": false, "FRedness_value_05": false, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": false, "FPorphyrin_value_02": false, "FPorphyrin_value_03": false, "FPorphyrin_value_04": true, "FPorphyrin_value_05": true }, { "solution_type_number": "19", "solution_type_name": "심각한 민감&여드름 피부", "tzone_value_01": false, "tzone_value_02": false, "tzone_value_03": false, "uzone_value_01": false, "uzone_value_02": false, "uzone_value_03": false, "FPore_value_01": false, "FPore_value_02": false, "FPore_value_03": false, "FPore_value_04": false, "FPore_value_05": false, "FFutrueWrinkle_value_01": false, "FFutrueWrinkle_value_02": false, "FFutrueWrinkle_value_03": false, "FFutrueWrinkle_value_04": false, "FFutrueWrinkle_value_05": false, "FRedness_value_01": false, "FRedness_value_02": false, "FRedness_value_03": false, "FRedness_value_04": true, "FRedness_value_05": true, "FPigmentation_value_01": false, "FPigmentation_value_02": false, "FPigmentation_value_03": false, "FPigmentation_value_04": false, "FPigmentation_value_05": false, "FMelanin_value_01": false, "FMelanin_value_02": false, "FMelanin_value_03": false, "FMelanin_value_04": false, "FMelanin_value_05": false, "FPorphyrin_value_01": false, "FPorphyrin_value_02": false, "FPorphyrin_value_03": false, "FPorphyrin_value_04": true, "FPorphyrin_value_05": true }]

function GetSolutionTypeNumber(t_zone_result, u_zone_result, list_Concern, survey) {
  let result = '';

  const rse = {};
  let expression = '';

  // 17, 18, 19번의 경우 포피린과 붉은기가 40점 이하일 경우 사용될 변수
  let FRedness_40_under = false;
  let FPorphyrin_40_under = false;

  if (t_zone_result.includes('건성')) {
    rse.tzone_value_01 = true;
    expression = 'tzone_value_01 === true ';
  } else if (t_zone_result.includes('중성')) {
    rse.tzone_value_02 = true;
    expression = 'tzone_value_02 === true ';
  } else if (t_zone_result.includes('지성')) {
    rse.tzone_value_03 = true;
    expression = 'tzone_value_03 === true ';
  }

  if (u_zone_result.includes('건성')) {
    rse.uzone_value_01 = true;
    expression += ' && uzone_value_01 === true ';
  } else if (u_zone_result.includes('중성')) {
    rse.uzone_value_02 = true;
    expression += ' && uzone_value_02 === true ';
  } else if (u_zone_result.includes('지성')) {
    rse.uzone_value_03 = true;
    expression += ' && uzone_value_03 === true ';
  }

  // ConcernRule
  Object.keys(list_Concern).forEach(key => {
    switch (key) {
      case '주름':
        if (list_Concern[key] >= 80) {
          rse.FPore_value_01 = true;
          expression += ' && FPore_value_01 === true ';
        } else if (list_Concern[key] < 80 && list_Concern[key] >= 60) {
          rse.FPore_value_02 = true;
          expression += ' && FPore_value_02 === true ';
        } else if (list_Concern[key] < 60 && list_Concern[key] >= 40) {
          rse.FPore_value_03 = true;
          expression += ' && FPore_value_03 === true ';
        } else if (list_Concern[key] < 40 && list_Concern[key] >= 20) {
          rse.FPore_value_04 = true;
          expression += ' && FPore_value_04 === true ';
        } else {
          rse.FPore_value_05 = true;
          expression += ' && FPore_value_05 === true ';
        }
        break;
      case '미래주름':
        if (list_Concern[key] >= 80) {
          rse.FFutrueWrinkle_value_01 = true;
          expression += ' && FFutrueWrinkle_value_01 === true ';
        } else if (list_Concern[key] < 80 && list_Concern[key] >= 60) {
          rse.FFutrueWrinkle_value_02 = true;
          expression += ' && FFutrueWrinkle_value_02 === true ';
        } else if (list_Concern[key] < 60 && list_Concern[key] >= 40) {
          rse.FFutrueWrinkle_value_03 = true;
          expression += ' && FFutrueWrinkle_value_03 === true ';
        } else if (list_Concern[key] < 40 && list_Concern[key] >= 20) {
          rse.FFutrueWrinkle_value_04 = true;
          expression += ' && FFutrueWrinkle_value_04 === true ';
        } else {
          rse.FFutrueWrinkle_value_05 = true;
          expression += ' && FFutrueWrinkle_value_05 === true ';
        }
        break;
      case '붉은기':
      case '홍조':
        if (list_Concern[key] >= 80) {
          rse.FRedness_value_01 = true;
          expression += ' && FRedness_value_01 === true ';
        } else if (list_Concern[key] < 80 && list_Concern[key] >= 60) {
          rse.FRedness_value_02 = true;
          expression += ' && FRedness_value_02 === true ';
        } else if (list_Concern[key] < 60 && list_Concern[key] >= 40) {
          rse.FRedness_value_03 = true;
          expression += ' && FRedness_value_03 === true ';
        } else if (list_Concern[key] < 40 && list_Concern[key] >= 20) {
          rse.FRedness_value_04 = true;
          expression += ' && FRedness_value_04 === true ';
          FRedness_40_under = true;
        } else {
          rse.FRedness_value_05 = true;
          expression += ' && FRedness_value_05 === true ';
          FRedness_40_under = true;
        }
        break;
      case '색소침착':
        if (list_Concern[key] >= 80) {
          rse.FPigmentation_value_01 = true;
          expression += ' && FPigmentation_value_01 === true ';
        } else if (list_Concern[key] < 80 && list_Concern[key] >= 60) {
          rse.FPigmentation_value_02 = true;
          expression += ' && FPigmentation_value_02 === true ';
        } else if (list_Concern[key] < 60 && list_Concern[key] >= 40) {
          rse.FPigmentation_value_03 = true;
          expression += ' && FPigmentation_value_03 === true ';
        } else if (list_Concern[key] < 40 && list_Concern[key] >= 20) {
          rse.FPigmentation_value_04 = true;
          expression += ' && FPigmentation_value_04 === true ';
        } else {
          rse.FPigmentation_value_05 = true;
          expression += ' && FPigmentation_value_05 === true ';
        }
        break;
      case '멜라닌':
        if (list_Concern[key] >= 80) {
          rse.FMelanin_value_01 = true;
          expression += ' && FMelanin_value_01 === true ';
        } else if (list_Concern[key] < 80 && list_Concern[key] >= 60) {
          rse.FMelanin_value_02 = true;
          expression += ' && FMelanin_value_02 === true ';
        } else if (list_Concern[key] < 60 && list_Concern[key] >= 40) {
          rse.FMelanin_value_03 = true;
          expression += ' && FMelanin_value_03 === true ';
        } else if (list_Concern[key] < 40 && list_Concern[key] >= 20) {
          rse.FMelanin_value_04 = true;
          expression += ' && FMelanin_value_04 === true ';
        } else {
          rse.FMelanin_value_05 = true;
          expression += ' && FMelanin_value_05 === true ';
        }
        break;
      case '포피린':
        if (list_Concern[key] >= 80) {
          rse.FPorphyrin_value_01 = true;
          expression += ' && FPorphyrin_value_01 === true ';
        } else if (list_Concern[key] < 80 && list_Concern[key] >= 60) {
          rse.FPorphyrin_value_02 = true;
          expression += ' && FPorphyrin_value_02 === true ';
        } else if (list_Concern[key] < 60 && list_Concern[key] >= 40) {
          rse.FPorphyrin_value_03 = true;
          expression += ' && FPorphyrin_value_03 === true ';
        } else if (list_Concern[key] < 40 && list_Concern[key] >= 20) {
          rse.FPorphyrin_value_04 = true;
          expression += ' && FPorphyrin_value_04 === true ';
          FPorphyrin_40_under = true;
        } else {
          rse.FPorphyrin_value_05 = true;
          expression += ' && FPorphyrin_value_05 === true ';
          FPorphyrin_40_under = true;
        }
        break;
      default:
        break;
    }
  });




  console.log("====== rse : ", rse);
  console.log("******** expression11 : ", expression);


  // tzone_value_01 === true  && uzone_value_01 === true  && FPore_value_01 === true  && FFutrueWrinkle_value_03 === true  && FPigmentation_value_03 === true  && FMelanin_value_02 === true  && FRedness_value_03 === true  && FPorphyrin_value_02 === true 

  let foundRows;
  // if (
  //   survey.s1_12 === 'Y' && FRedness_40_under === true && FPorphyrin_40_under === true) {
  //   // 19번 피부타입은 고민에서 민감과 여드름 선택이고 포피린과 붉은기가 40점 이하일 경우
  //   expression = 'FRedness_value_04 === true && FPorphyrin_value_04 === true';
  //   foundRows = list_rule_data.filter(row => FRedness_value_04 === true && FPorphyrin_value_04 === true);
  // } else if (FRedness_40_under === true) {
  //   // 붉은기 점수가 40점 이하일 경우
  //   expression = 'FRedness_value_04 === true';
  //   foundRows = list_rule_data.filter(row => eval(expression));
  // } else if (survey.s1_12 === 'Y' && FPorphyrin_40_under === true) {
  //   // 18번 피부타입은 고민에서 여드름 선택이고 포피린 점수가 40점 이하일 경우
  //   expression = 'FPorphyrin_value_04 === true';
  //   foundRows = list_rule_data.filter(row => eval(expression));
  // } else {
  //   // 위 해당 조건이 일치하지 않는 경우
  //   foundRows = list_rule_data.filter(row => eval(''));
  //   console.log('## foundRows > ',foundRows)

  // }

  if (
    survey.s1_12 === 'Y' && FRedness_40_under === true && FPorphyrin_40_under === true) {
    // 19번 피부타입은 고민에서 민감과 여드름 선택이고 포피린과 붉은기가 40점 이하일 경우
    foundRows = list_rule_data.filter(row => row.FRedness_value_04 === true && row.FPorphyrin_value_04 === true);
  } else if (FRedness_40_under === true) {
    // 붉은기 점수가 40점 이하일 경우
    foundRows = list_rule_data.filter(row => row.FRedness_value_04 === true);
  } else if (survey.s1_12 === 'Y' && FPorphyrin_40_under === true) {
    // 18번 피부타입은 고민에서 여드름 선택이고 포피린 점수가 40점 이하일 경우
    foundRows = list_rule_data.filter(row => row.FPorphyrin_value_04 === true);
  } else {
    foundRows = list_rule_data.filter(row => {
      return Object.keys(rse).every(key => row[key] === rse[key]);
    });
  }









  console.log("******** expression22 : ", expression);


  console.log("foundRows :", foundRows);

  if (foundRows && foundRows.length === 0) {
    // LoginSession.Selected_C_ResultPageData.solution_type_number 값을 사용해야 합니다.
    return null;
  } else {
    return foundRows[0].solution_type_number;
  }
}




function GetSolution_Beautytips(solution_number) {
  const from_rse = list_rsse.filter(
    item => item.s_type_number === solution_number,
  );

  let result = '';

  if (from_rse != null) {
    from_rse.forEach(rse => {
      result = rse.s_beauty_tip;
    });
  }

  return result;
}

function GetSolution_Result(solution_number) {
  const from_rse = list_rsse.filter(
    item => item.s_type_number === solution_number,
  );

  let result = '';

  if (from_rse != null) {
    from_rse.forEach(rse => {
      result = rse.s_result;
    });
  }

  return result;
}

function GetSensitiveTypeResult(sensitive_type) {
  const from_rse = list_rse.filter(item => item.s_type === sensitive_type);

  let result = '';

  if (from_rse != null) {
    from_rse.forEach(rse => {
      result = rse.s_result;
    });
  }

  return result;
}

function GetSkinConcernScore(_gender, _age, _gubun, _value) {
  let result = 0;

  const age_area = GetAgeArea(_age);

  const from_rce = list_rce.filter(
    item => item.gender === _gender && item.gubun === _gubun && item.age === age_area,
  );

  if (_gubun === '탄력' && _value === -1) {
    result = 50;
  } else if (_gubun === '탄력' && _value > -1) {
    from_rce.forEach(rce => {
      let totalRange;
      let specificValue;
      result = 100;

      if (_value >= rce.sixth) {
        totalRange = rce.sixth - rce.fifth;
        specificValue = _value - rce.fifth;
        result -= specificValue / totalRange * 20 + 80;
      } else {
        result = -1;
      }
    });
  } else if (_gubun === '경피수분손실도' && _value === -1) {
    result = 50;
  } else {
    from_rce.forEach(rce => {
      let totalRange;
      let specificValue;
      result = 100;

      if (_value >= rce.fifth) {
        totalRange = rce.sixth - rce.fifth;
        specificValue = _value - rce.fifth;
        result -= specificValue / totalRange * 20 + 80;
      } else if (_value >= rce.fourth) {
        totalRange = rce.fifth - rce.fourth;
        specificValue = _value - rce.fourth;
        result -= specificValue / totalRange * 20 + 60;
      } else if (_value >= rce.third) {
        totalRange = rce.fourth - rce.third;
        specificValue = _value - rce.third;
        result -= specificValue / totalRange * 20 + 40;
      } else if (_value >= rce.second) {
        totalRange = rce.third - rce.second;
        specificValue = _value - rce.second;
        result -= specificValue / totalRange * 20 + 20;
      } else if (_value >= rce.first) {
        totalRange = rce.second - rce.first;
        specificValue = _value - rce.first;
        result -= specificValue / totalRange * 20;
      }
    });
  }

  if (result > 100) {
    return 100;
  } else if (result < 0) {
    return 0;
  }

  return result;
}

function GetAgeArea(_age) {
  if (_age <= 19) {
    return 19;
  } else if (_age >= 20 && _age <= 24) {
    return 24;
  } else if (_age >= 25 && _age <= 29) {
    return 29;
  } else if (_age >= 30 && _age <= 34) {
    return 34;
  } else if (_age >= 35 && _age <= 39) {
    return 39;
  } else if (_age >= 40 && _age <= 44) {
    return 44;
  } else if (_age >= 45 && _age <= 49) {
    return 49;
  } else if (_age >= 50 && _age <= 54) {
    return 54;
  } else if (_age >= 55 && _age <= 59) {
    return 59;
  } else if (_age >= 60 && _age <= 69) {
    return 69;
  } else {
    return 70;
  }
}

function GetSkinConcernGrade(_gender, _age, _gubun, _value) {
  if (_gubun === '탄력' && _value === -1) {
    return '보통';
  } else if (_gubun === '경피수분손실도' && _value === -1) {
    return '보통';
  }

  let result = '';

  const age_area = GetAgeArea(_age);

  const from_rce = list_rce.filter(
    item => item.gender === _gender && item.gubun === _gubun && item.age === age_area,
  );

  from_rce.forEach(rce => {
    if (rce.second >= _value) {
      // 매우좋음
      result = '매우\r\n좋음';
    } else if (rce.second < _value && rce.third >= _value) {
      // 좋음
      result = '좋음';
    } else if (rce.third < _value && rce.fourth >= _value) {
      // 보통
      result = '보통';
    } else if (rce.fourth < _value && rce.fifth >= _value) {
      // 관심필요
      result = '관심\r\n필요';
    } else if (rce.fifth < _value) {
      // 집중관리
      result = '집중\r\n관리';
    }
  });

  return result;
}









function showErrorModal() {
  $('.search-result-layer-error').addClass('open');
  // console.log("안내 모달창");
}

