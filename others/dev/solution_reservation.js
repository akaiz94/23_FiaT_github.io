var API_URL = 'http://127.0.0.1:8000/v1/sch/visit/';
var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 20,
    startIndex: 0,
}
$(document).ready(function () {
    fnGetVisitList(page_param);
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
        fnSetUI('list');
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
    window.scrollTo(0, 500);
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
for(var year = 1930; year <= 2020; year++){
    var option = document.createElement('option');
    option.textContent = year;
    yearSelect.appendChild(option);
}

//월 Select 태그에 옵션 추가
var monthselect = document.querySelector('select[name=custom_month]');
for(var month = 1; month <= 12; month++){
    var option = document.createElement('option');
    option.textContent = month;
    monthselect.appendChild(option);
}


//일 Select 태그에 옵션 추가
var dayselect = document.querySelector('select[name=custom_day]');
for(var day = 1; day <= 31; day++){
    var option = document.createElement('option');
    option.textContent = day;
    dayselect.appendChild(option);
}



function openMsgLayer(name, phone, birthdate, userkey, surveyNo) {
    // 여기에서 msg-layer를 열거나 필요한 작업을 수행하세요.
    console.log('Name clicked:', name);
    console.log('phone :', phone);
    console.log('birthdate ', birthdate);

    console.log('userkey:', userkey);
    console.log('surveyNo:', surveyNo);

    localStorage.setItem('custom_userkey', userkey);
    localStorage.setItem('custom_surveyNo', surveyNo);

    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));

    
    document.getElementById('custom_name').value = name;   


    var registerButton = document.querySelector('.button[data-target=".msg-layer"]');
    registerButton.click();

}









$('#custom_info_saveButton').click(function () {

    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    // const currentTime = new Date();        

    console.log("고객정보 저장버튼 클릭!");
    window.location.href = './solution_questionnaire.html';
    


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
})


