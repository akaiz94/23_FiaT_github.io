var API_URL = 'http://127.0.0.1:8000/v1/sch/visit/';

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


$(document).ready(function () {
    console.log('solution_counsel page start!!-> ')
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

var fnAddPagenation = function () {
    $('#pagination').addPage(page_param);
}


// var fnGetVisitDetail = function (visitkey, skey) {
//     document.getElementById('info-popup').style.display = 'block';
//     $('#content_detail').set(API_URL + visitkey + '/' + skey, {}, function (result) {
//         fnSetUI('detail')
//     });
// }


var fnSetCurrentPage = function (num) {
    page_param.currentPage = num
    page_param.startIndex = (num - 1) * page_param.pageSize
    fnGetVisitList(page_param)
}




/**
 * 
 * 솔루션 제안 모음 
 * */

var fnGetVisitList_name = function (param) {
    console.log('## fnGetVisitList_name call')
    $('#visit-list-name > tr').remove()
    ajax.get(API_URL, param, function (result) {
        var list = result;
        console.log("fnGetVisitList_name 의 result(list) : ", list);

        $.each(list, function (idx, data) {
            page_param.totalCount = data.total_count
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
    var registerButton = document.querySelector('.button[data-target="#solution_proposal"]');
    registerButton.click();

    console.log('custom_name : ', name);
    console.log('phone :', phone);
    console.log('birthdate : ', birthdate);
    console.log('sex : ', sex);

    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const visitDate = currentTime.substring(0,4) + ". " + currentTime.substring(5,7) + ". " +  currentTime.substring(8,10);
   
    
    // localStorage.setItem('custom_userkey', userkey);
    // localStorage.setItem('custom_surveyNo', surveyNo);
    localStorage.setItem('custom_sex', sex);
    localStorage.setItem('custom_name', name);
    // localStorage.setItem('visitDate', visitDate);    
    
    console.log("localStorage custom_sex 값22 : ", localStorage.getItem('custom_sex'));
    console.log("localStorage custom_name 값22 : ", localStorage.getItem('custom_name'));




    const birth_year = birthdate.substring(0, 4);
    const birth_month = birthdate.substring(4, 6);
    const birth_date = birthdate.substring(6, 8);

    // console.log("birth_year : ",birth_year);
    // console.log("birth_month : ",birth_month);
    // console.log("birth_date : ",birth_date);  

    const phone_first = phone.substring(0, 3);
    const phone_middle = phone.substring(3, 7);
    const phone_last = phone.substring(7, 11);



}



Handlebars.registerHelper('maskName', function (name) {
    if (name.length < 3) {
        return name.charAt(0) + '*';
    }
    return name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1);
});

