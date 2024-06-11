var API_URL = 'http://localhost:8000/v1/sch/visit/merged/list';


var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 10,
    startIndex: 0,
}

var page_param_name = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 8,
    startIndex: 0,
}
const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
const surveyDate = moment().format('YYYY/MM/DD');
const surveyToday = moment().format('YYYY-MM-DD');
const surveyHour = moment().format('HH:mm');
var search_date = surveyToday;


$(document).ready(function () {
    console.log('solution_counsel2 page start!!-> ')
    fnGetVisitList(page_param);
    fnGetVisitList_name(page_param_name);

    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));
    
    
  $('#manager_name').text(localStorage.getItem('manager_name'));
  $('[id="custom_name"]').text(localStorage.getItem('custom_name'));

});

/**
 * 
 * 당일 고객 리스트 
 * 
 * */


var fnGetVisitList = function (param) {
    console.log('## fnGetVisitList call')
    $('#visit-list > tr').remove()
    ajax.get(API_URL + '?rsvn_date=' + search_date, param, function (result) {
        var list = result;
        console.log("fnGetVisitList 의 result(list) : ", list);

        $.each(list.reverse(), function (idx, data) {
            page_param.totalCount = data.total_count
            data.index = list.length - idx; //배열 revers, idx도 역순으로

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

var fnAddPagenation = function () {
    $('#pagination').addPage(page_param);
}


var fnSetCurrentPage = function (num) {
    page_param.currentPage = num
    page_param.startIndex = (num - 1) * page_param.pageSize
    fnGetVisitList(page_param)
}




/**
 * 
 * 솔루션 제안 모음 
 * */

var search_custom_name ="홍김똥";
$('#search_name').click(function () {
    console.log('search_name click!!!');

    search_custom_name = $('input[name="search"]').val();
    console.log('성명:', search_custom_name);

    fnGetVisitList_name();
})

var fnGetVisitList_name = function (param) {
    console.log('## fnGetVisitList_name call')
    $('#visit-list-name > tr').remove()
    ajax.get(API_URL + '?name=' + search_custom_name, param, function (result) {
        var list = result;
        console.log("fnGetVisitList_name 의 result(list) : ", list);

        $.each(list, function (idx, data) {
            page_param.totalCount = data.total_count

            //rsvn_date 날짜 변경
            var change_date = data.rsvn_date.slice(0, 10);
            data.rsvn_date = change_date;

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


            template.prepend($('#visit-item-name'), $('#visit-list-name'), data, function () {
                // todo define
            });
        })
        // fnSetUI('list');
        fnAddPagenation_name();
    });
}

var fnAddPagenation_name = function () {
    $('#pagination_name').addPage(page_param_name);
}


var fnGetVisitDetail_name = function (visitkey, skey) {
    document.getElementById('info-popup').style.display = 'block';
    $('#content_detail').set(API_URL + visitkey + '/' + skey, {}, function (result) {
        fnSetUI('detail')
    });
}


var fnSetCurrentPage_name = function (num) {
    page_param_name.currentPage = num
    page_param_name.startIndex = (num - 1) * page_param_name.pageSize
    fnGetVisitList_name(page_param_name)
}


function openMsgLayer(name, phone, birthdate, sex, userkey, surveyNo) {
    // 여기에서 msg-layer를 열거나 필요한 작업을 수행하세요.

    console.log("========================");
    $('.report-layer').addClass('open');

    
    localStorage.setItem('custom_sex', sex);
    localStorage.setItem('custom_name', name);
    localStorage.setItem('custom_userkey', userkey);
    localStorage.setItem('custom_surveyNo', surveyNo);

    console.log('custom_name : ', name);
    console.log('phone :', phone);
    console.log('birthdate : ', birthdate);
    console.log('sex : ', sex);

    $('.custom_name').text(localStorage.getItem('custom_name'));


}




Handlebars.registerHelper('maskName', function (name) {
    if (name.length < 3) {
        return name.charAt(0) + '*';
    }
    return name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1);
});

