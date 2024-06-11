var API_URL = 'http://localhost:8000/v1/sch/visit/merged/list';
var direct_API_URL = 'http://localhost:8000/v1/sch/direct/';

// var API_URL = 'https://10.93.22.215:8000/v1/sch/visit/merged/list';
// var direct_API_URL = 'https://10.93.22.215:8000/v1/sch/direct/';

const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
const surveyDate = moment().format('YYYY/MM/DD');
const surveyToday = moment().format('YYYY-MM-DD');
const surveyHour = moment().format('HH:mm');

var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 20, //데이터 호출 개수
    startIndex: 0,
}

var selectValue = null; //(확인 팝업) 방문경로 체크 변수   
var selectValue_add = null; //(등록 팝업) 방문경로 체크 변수   

var search_date = surveyToday; // 오늘날짜를 초기값 설정(전역변수)


$(document).ready(function () {
    fnGetVisitList(page_param);

    var manager_name = localStorage.getItem('manager_name');
    console.log("manager_name : ", manager_name);
    console.log("test : ")

    $('input[name="learned"]').on('change', function () {
        selectValue = parseInt($(this).val());
    })
    $('input[name="learned-add"]').on('change', function () {
        selectValue_add = parseInt($(this).val());
    })  

    $("#today_date").val(surveyToday);



});

const datePicker = document.querySelector('input[type="date"]');
// input 요소의 값이 변경될 때 이벤트 리스너를 등록합니다.
datePicker.addEventListener('change', (event) => {
    // 선택한 날짜를 변수에 저장합니다.
    const selectedDate = event.target.value;
    console.log('선택한 날짜:', selectedDate);

    // 선택한 날짜로 search_date를 업데이트
    search_date = selectedDate;

    // 선택한 날짜에 해당하는 고객 데이터를 검색하기 위해 fnGetVisitList 함수를 호출합니다.
    fnGetVisitList(page_param);
});



var list = null;
var fnGetVisitList = function (param) {
    console.log('## fnGetVisitList call')
    $('#visit-list > tr').remove()

    ajax.get(API_URL + '?rsvn_date=' + search_date, param, function (result) {
        list = result;
        console.log("fnGetVisitList 의 result(list) : ", list);
        console.log("list개수 : ", list.length);

        $.each(list.reverse(), function (idx, data) {
            page_param.totalCount = data.total_count

            // data.index = idx + 1;
            data.index = list.length - idx; //배열 revers, idx도 역순으로

            //rsvn_date 날짜 변경
            // var change_date = data.rsvn_date.slice(0, 10);
            // data.rsvn_date = change_date;

            //핸드폰 번호 뒷자리만
            var lastPhonNum = '';
            lastPhonNum = data.phone.substring(7, 11);          
            data.phone_last = lastPhonNum;


            //예약 타입 구분
            var reservationType = '';
            if (data.visitkey === 0) {
                reservationType = 'Direct';
            } else {
                reservationType = 'Online';
            }
            data.rsvn_date = reservationType;


            // 프로그램 이름 변경 (코드 -> 프로그램명)
            var programName = '';
            switch (data.ProgramCode) {
                case 'PC001014':
                    programName = '피부측정 프로그램';
                    break;
                case 'PC001013':
                    programName = '마이 스킨 솔루션';
                    break;
                case 'PC001010':
                    programName = '두피측정 프로그램';
                    break;
                default:
                    programName = data.ProgramCode;
                    break;
            }
            data.ProgramCode = programName;

            template.prepend($('#visit-item'), $('#visit-list'), data, function () {
                // todo define
            });
        })
        // fnSetUI('list');
        fnAddPagenation();
    });
}

var fnGetVisitDetail = function (visitkey, skey) {
    document.getElementById('info-popup').style.display = 'block';
    $('#content_detail').set(API_URL + visitkey + '/' + skey, {}, function (result) {
        fnSetUI('detail')
    });
}












var fnSetUI = function (cmd) {
    let cmds = ['list', 'detail', 'write']
    const section = '#content_'
    cmds.forEach(function (c) {
        sect = section + c;
        $(sect).hide();
    });
    $(section + cmd).show();
    window.scrollTo(0, 170);
}

var fnAddPagenation = function () {
    $('#pagination').addPage(page_param);
}


var fnAddPagenation2 = function () {
    $('#pagination').addPage(page_param);
}


var fnSetCurrentPage = function (num) {
    page_param.currentPage = num
    page_param.startIndex = (num - 1) * page_param.pageSize
    fnGetVisitList(page_param)
}


//연도 Select 태그에 옵션 추가
var yearSelect = document.querySelector('select[name=custom_year]');
for (var year = 1930; year <= 2020; year++) {
    var option = document.createElement('option');
    option.textContent = year;
    yearSelect.appendChild(option);
}

//월 Select 태그에 옵션 추가
var monthselect = document.querySelector('select[name=custom_month]');
for (var month = 1; month <= 12; month++) {
    var option = document.createElement('option');
    option.textContent = String(month).padStart(2, '0');
    monthselect.appendChild(option);
}


//일 Select 태그에 옵션 추가
var dayselect = document.querySelector('select[name=custom_day]');
for (var day = 1; day <= 31; day++) {
    var option = document.createElement('option');
    option.textContent = String(day).padStart(2, '0');
    dayselect.appendChild(option);
}



// 팝업창 내 생년월일
var selectedYear = "";
var selectedMonth = "";
var selectedDay = "";

$('select[name="custom_year').on('change', function () {
    selectedYear = $(this).val();
});
$('select[name="custom_month').on('change', function () {
    selectedMonth = $(this).val();
});
$('select[name="custom_day').on('change', function () {
    selectedDay = $(this).val();
});





function openMsgLayer(name, phone, birthdate, sex, userkey, surveyNo, email, vst_path) {
    // 여기에서 msg-layer를 열거나 필요한 작업을 수행하세요.

    console.log("===========================");
    var registerButton = document.querySelector('.button[data-target=".msg-layer"]');

    registerButton.click();
    console.log('custom_name : ', name);
    console.log('phone :', phone);
    console.log('birthdate : ', birthdate);
    console.log('sex : ', sex);
    console.log('surveyNo : ', surveyNo);
    console.log('userkey : ', userkey);

    var find_info = list.find(item => item.m_surveyno === surveyNo && item.m_userkey === userkey);
    console.log("find_info : ", find_info);

    const visitDate = currentTime.substring(0, 4) + ". " + currentTime.substring(5, 7) + ". " + currentTime.substring(8, 10);

    const birth_year = birthdate.substring(0, 4);
    const birth_month = birthdate.substring(4, 6);
    const birth_date = birthdate.substring(6, 8);

    // console.log("birth_year : ",birth_year);
    // console.log("birth_month : ",birth_month);
    // console.log("birth_date : ",birth_date);  

    const phone_first = phone.substring(0, 3);
    const phone_middle = phone.substring(3, 7);
    const phone_last = phone.substring(7, 11);



    if (name !== null) {
        document.getElementById('custom_name').value = name;
    }

    if (birthdate !== null) {
        document.getElementById('birth_year').text = birth_year;
        document.getElementById('birth_month').text = birth_month;
        document.getElementById('birth_day').text = birth_date;
    }



    if (phone !== null) {
        document.getElementById('phone_first').text = phone_first;
        document.getElementById('phone_middle').value = phone_middle;
        document.getElementById('phone_last').value = phone_last;
    }

    if (sex === 'F') {
        document.getElementById('gender_02').checked = true;
    } else if (sex === 'M') {
        document.getElementById('gender_01').checked = true;
    }

    console.log("email : ", email);
    console.log("vst_path : ", vst_path);


    $("#email").val(email);

    checkRadioButton(vst_path);


    $('#custom_info_saveButton').click(function () {
        console.log("고객정보 저장버튼 클릭!");

        // console.log("앞 번호 : ", document.getElementById('phone_first').text);
        // console.log("가운데 번호 : ", document.getElementById('phone_middle').value);
        localStorage.setItem('custom_sex', sex);
        localStorage.setItem('custom_name', name);
        localStorage.setItem('custom_userkey', userkey);
        localStorage.setItem('custom_surveyNo', surveyNo);
        localStorage.setItem('visitDate', visitDate);

        localStorage.removeItem('analysis2_result-backgroundCanvas');
        localStorage.removeItem('analysis2_result-opinionCanvas');
        localStorage.removeItem('analysis2_result-comment01');
        localStorage.removeItem('analysis2_result-comment02');
        localStorage.removeItem('analysis2_result-comment03');

        localStorage.removeItem('analysis_result-backgroundCanvas');
        localStorage.removeItem('analysis_result-opinionCanvas');
        localStorage.removeItem('analysis_result-comment01');
        localStorage.removeItem('analysis_result-comment02');
        localStorage.removeItem('analysis_result-comment03');




        console.log("이름 : ", $("#custom_name").val());

        console.log("생일(년도) : ", $("#birth_year").val());
        console.log("생일(월) : ", $("#birth_month").val());
        console.log("생일(일) : ", $("#birth_day").val());

        selectedYear = $("#birth_year").val();
        selectedMonth = $("#birth_month").val();
        selectedDay = $("#birth_day").val();

        console.log("생년 : ", selectedYear);
        console.log("월 : ", selectedMonth);
        console.log("일 : ", selectedDay);

        console.log("앞 번호 : ", $("#phone_first").val());
        console.log("가운데 번호 : ", $("#phone_middle").val());
        console.log("뒷 번호 : ", $("#phone_last").val());

        console.log("국적 : ", $("#nation").val());
        console.log("인종 : ", $("#race").val());
        console.log("이메일 : ", $("#email").val());

        console.log("방문경로 체크숫자 : ", selectValue);
        console.log("체크숫자 : ", $('input[name="learned"]:checked').length);





        if ($("#custom_name").val() === "") {
            $("#custom_detail").html("'성명'을");
            showErrorModal();
        } else if ($("#birth_year").val() === "" || $("#birth_month").val() === "" || $("#birth_day").val() === "") {
            $("#custom_detail").html("'생년월일'을");
            showErrorModal();
        } else if ($("#phone_first").val() === "" || $("#phone_middle").val() === "" || $("#phone_last").val() === "") {
            $("#custom_detail").html("'핸드폰 번호'를");
            showErrorModal();
        } else if ($("#email").val() === "") {
            $("#custom_detail").html("'이메일'을");
            showErrorModal();
        } else if ($('input[name="learned"]:checked').length === 0) {
            $("#custom_detail").html("'방문경로'를");
            showErrorModal();
        }
        else {
            console.log("선택 완료");
            $("#custom_detail_main").html('문진(피부)로 이동합니다.');
            showErrorModal();

            setTimeout(function () {
                window.location.href = './solution_questionnaire.html';;
            }, 1000); // 2초 
        }


    })
}

//방문경로 체크 로직
function checkRadioButton(vst_path) {
    var radioId = '';
    console.log(vst_path);

    switch (vst_path) {
        case '0':
            radioId = 'learned_001';
            break;
        case '1':
            radioId = 'learned_002';
            break;
        case '2':
            radioId = 'learned_003';
            break;
        case '3':
            radioId = 'learned_004';
            break;
        case '4':
            radioId = 'learned_005';
            break;
        case '5':
            radioId = 'learned_006';
            break;
        case '6':
            radioId = 'learned_007';
            break;
        case '7':
            radioId = 'learned_008';
            break;
        case '8':
            radioId = 'learned_009';
            break;
        case '9':
            radioId = 'learned_010';
            break;
    }
    console.log('radioId : ', radioId);
    if (radioId) {
        document.getElementById(radioId).checked = true;
    }
}




$('#custom_searchButton').click(function () {
    console.log('고객 찾기 버튼 클릭!!');

    console.log('custom_name_search : ', $("#custom_name-search").val());

    console.log("찾는 고객 앞 번호 : ", $("#phone_first-search").val());
    console.log("찾는 고객 가운데 번호 : ", $("#phone_middle-search").val());
    console.log("찾는 고객 뒷 번호 : ", $("#phone_last-search").val());

    var search_phone =  $("#phone_first-search").val() + $("#phone_middle-search").val() + $("#phone_last-search").val();
    console.log ("search_phone : ", search_phone);

    $('#visit-list2 > tr').remove()



    if ($("#phone_last-search").val() === "") { 
        //이름만 검색
        $.ajax({
            url: API_URL + '?name=' +  $("#custom_name-search").val(),
            type: 'GET',       

            success: function (response) {
                console.log("API_URL(고객찾기 - 이름) 응답값 : ", response);
                if(response.length === 0){
                    //고객이 없을경우
                    console.log("고객없음 name");              
                    $('.search-result-layer').addClass('open');      


                } else{
                    //고객 찾아졌을경우
                    console.log("고객있음 name : ", response);
                    $('.search-layer').removeClass('open');
                    $('.search-result-layer').removeClass('open');      
    
                    $('.search-custom-layer').addClass('open');                  


                    $.each(response.reverse(), function (idx, data) {
                        page_param.totalCount = data.total_count            
                        // data.index = idx + 1;
                        data.index = response.length - idx; //배열 revers, idx도 역순으로

                        const birthdate_after = data.birthdate.substring(0, 4) + "-" + data.birthdate.substring(4, 6) + "-" + data.birthdate.substring(6, 8);
                        data.birthdate = birthdate_after;
            
                        template.prepend($('#visit-item2'), $('#visit-list2'), data, function () {
                            // todo define
                        });
                    })
                    // fnSetUI('list');
                    fnAddPagenation2();
                }
         
            }, error: function (xhr, status, error) {
                console.error('API_URL(고객찾기 - 이름) 오류 : ', error);
            
            }
        })
    } else {
        //이름 + 전화번호 검색
        $.ajax({
            url: API_URL + '?name=' +  $("#custom_name-search").val() +'&phone=' +  search_phone,
            type: 'GET',       

            success: function (response) {
                console.log("API_URL(고객찾기 - 이름+번호) 응답값 : ", response);
                if(response.length === 0){
                    //고객이 없을경우
                    console.log("고객없음 name+phone");
                    $('.search-result-layer').addClass('open');    


                } else{
                    //고객 찾아졌을경우
                    console.log("고객있음 name+phone");
                    $('.search-layer').removeClass('open');
                    $('.search-result-layer').removeClass('open');        
    
                    $('.search-custom-layer').addClass('open');

                    $.each(response.reverse(), function (idx, data) {
                        page_param.totalCount = data.total_count            
                        // data.index = idx + 1;
                        data.index = response.length - idx; //배열 revers, idx도 역순으로

                        const birthdate_after = data.birthdate.substring(0, 4) + "-" + data.birthdate.substring(4, 6) + "-" + data.birthdate.substring(6, 8);
                        data.birthdate = birthdate_after;
            
            
                        template.prepend($('#visit-item2'), $('#visit-list2'), data, function () {
                            // todo define
                        });
                    })
                    // fnSetUI('list');
                    fnAddPagenation2();
                }         
            }, error: function (xhr, status, error) {
                console.error('API_URL(고객찾기- 이름+번호) 오류 : ', error);            
            }
        })
    }
})




// 팝업창 내 생년월일
var selectedYear_add = "";
var selectedMonth_add = "";
var selectedDay_add = "";

$('select[name="custom_year-add').on('change', function () {
    selectedYear_add = $(this).val();
});
$('select[name="custom_month-add').on('change', function () {
    selectedMonth_add = $(this).val();
});
$('select[name="custom_day-add').on('change', function () {
    selectedDay_add = $(this).val();
});


$('#custom_info_saveButton-add').click(function () {

    // const currentTime = new Date();        
    console.log("고객정보-add 저장버튼 클릭!");

    // console.log("앞 번호 : ", document.getElementById('phone_first').text);
    // console.log("가운데 번호 : ", document.getElementById('phone_middle').value);
    // localStorage.setItem('custom_userkey', userkey);

    console.log("이름 : ", $("#custom_name-add").val());

    // 성별 결정
    var maleRadioButton = document.getElementById("gender_01-add");
    var femaleRadioButton = document.getElementById("gender_02-add");
    var gender = "";
    if (maleRadioButton.checked) {
        gender = "M"; // 남성 선택 시
    } else if (femaleRadioButton.checked) {
        gender = "F"; // 여성 선택 시
    }

    console.log("성별: " + gender);

    console.log("생년 : ", selectedYear_add);
    console.log("월 : ", selectedMonth_add);
    console.log("일 : ", selectedDay_add);


    console.log("앞 번호 : ", $("#phone_first-add").val());
    console.log("가운데 번호 : ", $("#phone_middle-add").val());
    console.log("뒷 번호 : ", $("#phone_last-add").val());

    console.log("국적 : ", $("#nation-add").val());
    console.log("인종 : ", $("#race-add").val());
    console.log("이메일 : ", $("#email-add").val());


    console.log("프로그램 : ", $("#program-add").val());

    var program_name = '';
    if ($("#program-add").val() === "피부측정 프로그램") {
        program_name = "PC001014";
    } else if ($("#program-add").val() === "마이 스킨 솔루션") {
        program_name = "PC001013";
    } else if ($("#program-add").val() === "두피측정 프로그램") {
        program_name = "PC001010";
    }
    console.log("program_name : ", program_name);


    console.log("방문경로 체크숫자 : ", selectValue_add);
    console.log("체크숫자 : ", $('input[name="learned-add"]:checked').length);




    if ($("#custom_name-add").val() === "") {
        $("#custom_detail").html("'성명'을");
        showErrorModal();
    } else if (selectedYear_add === "" || selectedMonth_add === "" || selectedDay_add === "") {
        $("#custom_detail").html("'생년월일'을");
        showErrorModal();
    } else if (gender === "") {
        $("#custom_detail").html("'성별'을");
        showErrorModal();
    } else if ($("#phone_first-add").val() === "" || $("#phone_middle-add").val() === "" || $("#phone_last-add").val() === "") {
        $("#custom_detail").html("'전화번호'를");
        showErrorModal();
    } else if ($("#email-add").val() === "") {
        $("#custom_detail").html("'이메일'을");
        showErrorModal();
    } else if ($('input[name="learned-add"]:checked').length === 0) {
        $("#custom_detail").html("'방문경로'를");
        showErrorModal();
    }
    else {
        console.log("고객정보 DB등록 요청.");

        var requestData = {
            "skey": null,
            "reg_date": currentTime,
            "rsvn_date": surveyDate,
            "rsvn_time": surveyHour, //
            "name": String($("#custom_name-add").val()),
            "course_flg": "B", //
            "phone": String($("#phone_first-add").val() + $("#phone_middle-add").val() + $("#phone_last-add").val()),
            "sex": String(gender),
            "birthdate": String(selectedYear_add + selectedMonth_add + selectedDay_add),
            "birthdatetp": "",
            "cstmid": null,
            "ucstmid": null,
            "userkey": null,
            "surveyNo": null,
            "progress_flg": "1", // 진행상태
            "vst_path": String(selectValue_add),
            "vst_txt": "",
            "email": String($("#email-add").val()),
            "comment": "",
            "group_id": null,
            "programcode": program_name, //
            "apnonid": null,
            "brandcourse": "IC",
            "create_dt": currentTime,
            "update_dt": currentTime
        }
        // console.log("surveyNo-Type : ", typeof (parseInt(surveyNo)));
        // console.log("userKey-Type : ", typeof (parseInt(7777)));
        // console.log("cheek_Left-Type : ", typeof (cheek_Left));
        // console.log("cheek_Right-Type : ", typeof (cheek_Right));
        // console.log("currentTime-Type : ", typeof (currentTime));

        console.log("info_add requestData : ", requestData);

        $.ajax({
            url: direct_API_URL,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),

            success: function (response) {
                console.log("direct_API_URL 응답값 : ", response);
                $("#custom_detail_main").html("고객정보 저장 완료");
                showErrorModal();

                setTimeout(function () {
                    window.location.href = './solution_reservation.html';;
                }, 1000); // 2초 딜레이

            }, error: function (xhr, status, error) {
                console.error('direct_API_URL 오류 : ', error);
                $("#custom_detail_main").html("고객정보 저장 실패");
                showErrorModal();
            }
        })
    }
})


//********add 창 */

//연도 Select 태그에 옵션 추가
var yearSelect = document.querySelector('select[name=custom_year-add]');
for (var year = 1930; year <= 2020; year++) {
    var option = document.createElement('option');
    option.textContent = year;
    yearSelect.appendChild(option);
}

//월 Select 태그에 옵션 추가
var monthselect = document.querySelector('select[name=custom_month-add]');
for (var month = 1; month <= 12; month++) {
    var option = document.createElement('option');
    option.textContent = String(month).padStart(2, '0');
    monthselect.appendChild(option);
}


//일 Select 태그에 옵션 추가
var dayselect = document.querySelector('select[name=custom_day-add]');
for (var day = 1; day <= 31; day++) {
    var option = document.createElement('option');
    option.textContent = String(day).padStart(2, '0');
    dayselect.appendChild(option);
}




function showErrorModal() {
    $('.search-result-layer-error').addClass('open');
    // console.log("에러 모달창");
}

Handlebars.registerHelper('maskName', function (name) {
    if (name.length < 3) {
        return name.charAt(0) + '*';
    }
    return name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1);
});





/*
*
* 24.06.01 중복확인버튼, (기존고객 정보 자동입력)
*
*/


$('#checkDuplicate-add').click(function (event) {
    event.preventDefault(); //폼 기본 동작 비활성화
    console.log('중복확인버튼 클릭');

    var phone_number_dul = $("#phone_first-add").val() + $("#phone_middle-add").val() + $("#phone_last-add").val();
    // ajax.get(API_URL + 'list?phone=' + phone_number, param, function (result) {
    //     list = result;
    //     console.log("fnGetVisitList 의 result(list) : ", list);
    //     console.log("list개수 : ", list.length);
    // });   

    console.log('phone_number_dul: ', phone_number_dul);

    $.ajax({
        url: API_URL + '?phone=' + phone_number_dul,
        type: 'GET',

        success: function (response) {
            console.log("핸드폰 중복 체크 성공 응답값 : ", response);
            if (response.length === 0) {
                $("#custom_detail_main").html("신규 고객입니다.");
                showErrorModal();

                $("#custom_name-add").val("");

                const birth_year = ""
                const birth_month = ""
                const birth_day = ""
                $("#birth_year-add").text("");
                $("#birth_month-add").text("");
                $("#birth_day-add").text("");

                selectedYear_add = "";
                selectedMonth_add = "";
                selectedDay_add = "";
                $("#gender_01-add").prop("checked", false);
                $("#gender_02-add").prop("checked", false);
                $("#email-add").val("");

            }

            else if (response.length > 0) {
                $("#custom_detail_main").html("방문 고객입니다.");
                showErrorModal();

                $("#custom_name-add").val(response[0].name);

                const birth_year = response[0].birthdate.substring(0, 4);
                const birth_month = response[0].birthdate.substring(4, 6);
                const birth_day = response[0].birthdate.substring(6, 8);
                $("#birth_year-add").text(birth_year);
                $("#birth_month-add").text(birth_month);
                $("#birth_day-add").text(birth_day);

                selectedYear_add = birth_year;
                selectedMonth_add = birth_month;
                selectedDay_add = birth_day;



                if (response[0].sex === "F") {
                    $("#gender_02-add").prop("checked", true);
                } else if (response[0].sex === "M") {
                    $("#gender_01-add").prop("checked", true);
                }
                $("#email-add").val(response[0].email);

                $("#program-add").css("color", "#e7c1da");

            }

        }, error: function (xhr, status, error) {
            console.error('핸드폰 중복 오류 : ', error);
            $("#custom_detail_main").html("확인이 불가능합니다. (error)");
            showErrorModal();
        }
    })



})


