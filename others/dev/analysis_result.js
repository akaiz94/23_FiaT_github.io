var ResultMarkvu_API_URL = 'http://127.0.0.1:8000/v1/skin/markvu/result/';
var ResultVapometer_API_URL = 'http://127.0.0.1:8000/v1/skin/vapometer/';
var ResultCutometer_API_URL = 'http://127.0.0.1:8000/v1/skin/cutometer/';
var SkinSurvey_API_URL = 'http://127.0.0.1:8000/v1/svy/skin/';  // 피부설문




$(document).ready(function () {
  console.log('analysis_result page start -> ')
  console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
  console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));
  console.log("custom_sex : ", localStorage.getItem('custom_sex'));

  var surveyNo = localStorage.getItem('custom_surveyNo');
  console.log('surveyNo : ', surveyNo);
  var custom_sex = localStorage.getItem('custom_sex');

  console.log('custom_sex : ', custom_sex);


  if (custom_sex === 'F') {
    $('#opinionsImage').attr('src', './resource/images/img-report001-F.png');
  } else if (custom_sex === 'M') {
    $('#opinionsImage').attr('src', './resource/images/img-report001-M.png');
  }




  $.ajax({
    url: ResultMarkvu_API_URL + '?surveyNo=' + surveyNo,
    type: 'GET',
    success: function (data) {
      //console.log('ResultMarkvu_API_URL 응답 : ', data); 
      markvu = data[0];
      // console.log("ResultMarkvu_API_URL 응답값 : ", markvu);


      //T존
      var tzone_subun_value = markvu.FSubun_A;
      var tzone_ubun_value = (markvu.FSebum_A + markvu.FSebum_B) / 2;
      var t_zone_subun = tzone_subun_value;
      var t_zone_ubun = tzone_ubun_value;

      //U존
      var uzone_subun_value = (markvu.FSubun_G + markvu.FSubun_H) / 2;
      var uzone_ubun_value = (markvu.FSebum_G + markvu.FSebum_H) / 2;
      var u_zone_subun = uzone_subun_value;
      var u_zone_ubun = uzone_ubun_value;

      // console.log("t_zone_subun :",t_zone_subun );
      // console.log("t_zone_ubun :",t_zone_ubun );
      // console.log("u_zone_subun :",u_zone_subun );
      // console.log("u_zone_ubun :",u_zone_ubun );

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


      // console.log("tzone_subun_result : ",tzone_subun_result);
      // console.log("tzone_ubun_result : ",tzone_ubun_result);
      // console.log("t_zone_result : ",t_zone_result);
      // console.log("**************************");

      // console.log("uzone_subun_result : ",uzone_subun_result);
      // console.log("uzone_ubun_result : ",uzone_ubun_result);
      // console.log("u_zone_result : ",u_zone_result);

      $('#t_zone_result').text(t_zone_result);
      $('#u_zone_result').text(u_zone_result);

      updateTZoneData(t_zone_subun, t_zone_ubun);
      updateUZoneData(u_zone_subun, u_zone_ubun);

      //#2nd. 바포미터 요청(경피수분손실도 값)
      $.ajax({
        // url: ResultVapometer_API_URL + surveyNo,
        url: ResultVapometer_API_URL + '?surveyNo=' + 1966,
        type: 'GET',
        success: function (data) {
          vapometer = data[0];
          console.log("ResultVapometer_API_URL 응답값 : ", vapometer);


          //#3rd. 큐토미터 요청(탄력 값)
          $.ajax({
            // url: ResultVapometer_API_URL + surveyNo,
            url: ResultCutometer_API_URL + '?surveyNo=' + 1956,
            type: 'GET',
            success: function (data) {
              cutometer = data[0];
              console.log("ResultCutometer_API_URL 응답값 : ", cutometer);

              //#4th. 문진(피부) 요청
              $.ajax({
                // url: SkinSurvey_API_URL + surveyNo,
                url: SkinSurvey_API_URL + '?surveyNo=' + 1908,
                type: 'GET',
                success: function (data) {
                  skinsurvey = data[0];
                  console.log("SkinSurvey_API_URL 응답값 : ", skinsurvey);

                  // ###모든 데이터값 매핑 함수!
                  setSkinScore(markvu, vapometer, cutometer, skinsurvey, 'I');


                }, error: function (xhr, status, error) {

                  console.error('SkinSurvey_API_URL 오류 : ', error);
                }
              })


            }, error: function (xhr, status, error) {

              console.error('ResultCutometer_API_URL 오류 : ', error);
            }
          })


        }, error: function (xhr, status, error) {

          console.error('ResultVapometer_API_URL 오류 : ', error);
        }
      })



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


      /*
       *
       *24. 05. 25 opinion 이미지 그리기
       */
      


      var opinionCanvas = document.getElementById('opinionCanvas');
      var opinion_ctx = opinionCanvas.getContext('2d');
      var backgroundCanvas = document.getElementById('backgroundCanvas');
      var background_ctx = backgroundCanvas.getContext('2d');

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


      var backgroundImage = new Image();      
      if (custom_sex === 'F') {
        backgroundImage.src = './resource/images/img-report001-F.png';
      } else if (custom_sex === 'M') {
        backgroundImage.src = './resource/images/img-report001-M.png';
      }


      // 이미지 로드 완료 시 호출되는 함수
      backgroundImage.onload = function () {
        // 배경 이미지를 캔버스에 그립니다
        background_ctx.drawImage(backgroundImage, 0, 0, backgroundCanvas.width, backgroundCanvas.height);
      };

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



    },
    error: function (xhr, status, error) {

      console.error('ResultMarkvu_API_URL 응답 오류: ', error);
    }


  })




  $('#custom_info_saveButton').on('click', function (event) {

    console.log("저장 버튼 클릭");

    localStorage.setItem('opinionCanvas', opinionCanvas.toDataURL());
    localStorage.setItem('backgroundCanvas', backgroundCanvas.toDataURL());

    var canvasImgData = localStorage.getItem('opinionCanvas');
    var backgroundImgData = localStorage.getItem('backgroundCanvas');

    console.log("canvasImgData : ", typeof(canvasImgData));   


  })
});




/*
******************* 이후 차트생성 및 로직 **********************
*/


