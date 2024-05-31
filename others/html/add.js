var API_URL = 'http://127.0.0.1:8000/v1/sch/visit/';
var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 20, //데이터 호출 개수
    startIndex: 0,
}


$(document).ready(function () {
    fnGetVisitList(page_param);

    var manager_name = localStorage.getItem('manager_name');
    console.log("manager_name : ", manager_name);
    console.log("test : ")

});

var fnGetVisitList = function (param) {
    console.log('## fnGetVisitList call')
    $('#visit-list > tr').remove()
    ajax.get(API_URL, param, function (result) {
        var list = result;
        console.log("fnGetVisitList 의 result(list) : ", list);

        $.each(list, function (idx, data) {
            page_param.totalCount = data.total_count
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
    option.textContent = month;
    monthselect.appendChild(option);
}


//일 Select 태그에 옵션 추가
var dayselect = document.querySelector('select[name=custom_day]');
for (var day = 1; day <= 31; day++) {
    var option = document.createElement('option');
    option.textContent = day;
    dayselect.appendChild(option);
}






var selectValue = null; //방문경로 체크 변수   

function openMsgLayer(name, phone, birthdate, sex, userkey, surveyNo) {
    // 여기에서 msg-layer를 열거나 필요한 작업을 수행하세요.

    var registerButton = document.querySelector('.button[data-target=".msg-layer"]');
    registerButton.click();
    console.log('custom_name : ', name);
    console.log('phone :', phone);
    console.log('birthdate : ', birthdate);
    console.log('sex : ', sex);

    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const visitDate = currentTime.substring(0, 4) + ". " + currentTime.substring(5, 7) + ". " + currentTime.substring(8, 10);

    localStorage.setItem('custom_userkey', userkey);
    localStorage.setItem('custom_surveyNo', surveyNo);
    localStorage.setItem('custom_sex', sex);
    localStorage.setItem('custom_name', name);
    localStorage.setItem('visitDate', visitDate);



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



    $('#custom_info_saveButton').click(function () {
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        // const currentTime = new Date();        

        console.log("고객정보 저장버튼 클릭!");

        // console.log("앞 번호 : ", document.getElementById('phone_first').text);
        // console.log("가운데 번호 : ", document.getElementById('phone_middle').value);
        localStorage.setItem('custom_userkey', userkey);

        console.log("이름 : ", $("#custom_name").val());

        console.log("생일(년도) : ", $("#birth_year").val());
        console.log("생일(월) : ", $("#birth_month").val());
        console.log("생일(일) : ", $("#birth_day").val());

        console.log("앞 번호 : ", $("#phone_first").val());
        console.log("가운데 번호 : ", $("#phone_middle").val());
        console.log("뒷 번호 : ", $("#phone_last").val());

        console.log("국적 : ", $("#nation").val());
        console.log("이메일 : ", $("#email").val());

            
        $('input[name="learned"]').on('change', function(){           
            selectValue = parseInt($(this).val());
            console.log("방문경로 체크숫자11 : ", selectValue);
           
        })
        console.log("방문경로 체크숫자22 : ", selectValue);
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
            // window.location.href = './solution_questionnaire.html';
        }

        // $.ajax({
        //     // url: SkinSurvey_API_URL + surveyNo,
        //     url: ResultMarkvu_API_URL + surveyNo,
        //     type: 'GET',
        //     success: function (response) {
        //         console.log("ResultMarkvu_API_URL 응답값 : ", response);
        //         alert("마크뷰 데이터 조회 완료")


        //     }, error: function (xhr, status, error) {
        //         console.error('ResultMarkvu_API_URL 오류 : ', error);
        //         alert("마크뷰 측정을 먼저 진행해주세요.")

        //     }
        // })

        // window.location.href = './solution_questionnaire.html';

    })
}



$('#custom_info_saveButton-add').click(function () {
    


    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    // const currentTime = new Date();        
    console.log("고객정보-add 저장버튼 클릭!");

    // console.log("앞 번호 : ", document.getElementById('phone_first').text);
    // console.log("가운데 번호 : ", document.getElementById('phone_middle').value);
    // localStorage.setItem('custom_userkey', userkey);

    console.log("이름 : ", $("#custom_name-add").val());

    console.log("생일(년도) : ", $("#birth_year-add").val());
    console.log("생일(월) : ", $("#birth_month-add").val());
    console.log("생일(일) : ", $("#birth_day-add").val());

    // HTML에서 라디오 버튼 요소를 가져옵니다.
    var maleRadioButton = document.getElementById("gender_01-add");
    var femaleRadioButton = document.getElementById("gender_02-add");

    // 변수를 초기화합니다.
    var gender = "";

    // 라디오 버튼의 상태를 확인하고 변수에 값을 할당합니다.
    if (maleRadioButton.checked) {
        gender = "M"; // 남성 선택 시
    } else if (femaleRadioButton.checked) {
        gender = "F"; // 여성 선택 시
    }

    // 변수 gender를 사용하시면 됩니다.
    console.log("성별: " + gender);


    console.log("앞 번호 : ", $("#phone_first-add").val());
    console.log("가운데 번호 : ", $("#phone_middle-add").val());
    console.log("뒷 번호 : ", $("#phone_last-add").val());

    console.log("국적 : ", $("#nation-add").val());
    console.log("이메일 : ", $("#email-add").val());

    console.log("체크숫자 : ", $('input[name="learned-add"]:checked').length);


    if ($("#custom_name-add").val() === "") {
        $("#custom_detail").html("'성명'을");
        showErrorModal();
    } else if ($("#birth_year-add").val() === "" || $("#birth_month-add").val() === "" || $("#birth_day-add").val() === "") {
        $("#custom_detail").html("'생년월일'을");
        showErrorModal();
    } else if ($("#phone_first-add").val() === "" || $("#phone_middle-add").val() === "" || $("#phone_last-add").val() === "") {
        $("#custom_detail").html("'핸드폰 번호'를");
        showErrorModal();
    } else if ($("#email-add").val() === "") {
        $("#custom_detail").html("'이메일'을");
        showErrorModal();
    } else if ($('input[name="learned-add"]:checked').length === 0) {
        $("#custom_detail").html("'방문경로'를");
        showErrorModal();
    }
    else {
        console.log("이메일 확인");
        window.location.href = './solution_questionnaire.html';
    }



    // $.ajax({
    //     // url: SkinSurvey_API_URL + surveyNo,
    //     url: ResultMarkvu_API_URL + surveyNo,
    //     type: 'GET',
    //     success: function (response) {
    //         console.log("ResultMarkvu_API_URL 응답값 : ", response);
    //         alert("마크뷰 데이터 조회 완료")


    //     }, error: function (xhr, status, error) {
    //         console.error('ResultMarkvu_API_URL 오류 : ', error);
    //         alert("마크뷰 측정을 먼저 진행해주세요.")

    //     }
    // })

    // window.location.href = './solution_questionnaire.html';

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
        option.textContent = month;
        monthselect.appendChild(option);
    }


    //일 Select 태그에 옵션 추가
    var dayselect = document.querySelector('select[name=custom_day-add]');
    for (var day = 1; day <= 31; day++) {
        var option = document.createElement('option');
        option.textContent = day;
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






