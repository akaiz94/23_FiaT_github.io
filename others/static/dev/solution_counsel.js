var API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/merged/list';


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
    console.log('solution_counsel page start!!-> ')
    fnGetVisitList(page_param);
    fnGetVisitList_name(page_param_name);

    console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
    console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));

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

        list = result;


        list.sort((a, b) => {
            let timeA = parseInt(a.rsvn_time.replace(":", ""));
            let timeB = parseInt(b.rsvn_time.replace(":", ""));
            return timeA - timeB;
        });
        console.log("fnGetVisitList 의 result(list): ", list);


        console.log("list개수 : ", list.length);

        $.each(list.reverse(), function (idx, data) {
            console.log("고객 리스트별 data 값 : ", data);

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
            data.reservationType = reservationType;



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
            data.ProgramName = programName;

            // 상담 진행 구분
            var progress_check = '';
            switch (data.progress_flg) {

                // **이전 버전
                case '0':
                    progress_check = '대기';
                    break;
                case '1':
                    progress_check = '문진 진행';
                    break;
                case '2':
                    progress_check = '문진 완료';
                    break;
                case '3':
                    progress_check = '기기1 측정 완료';
                    break;
                case '4':
                    progress_check = '기기2 측정 완료';
                    break;
                case '5':
                    progress_check = '기기3 측정 완료';
                    break;
                case '6':
                    progress_check = '기기 측정 완료';
                    break;
                case '7':
                    progress_check = '상담';
                    break;
                case '8':
                    progress_check = '상담 완료';
                    break;
                case '9':
                    progress_check = '연구원 상담';
                    break;

                // **리뉴얼 이후 버전      
                case '10':
                    progress_check = '상담 완료';
                    break;
                case '101':
                    progress_check = '피부 문진';
                    break;
                case '102':
                    progress_check = '두피 문진';
                    break;
                case '103':
                    progress_check = '피부 측정';
                    break;
                case '104':
                    progress_check = '두피 측정';
                    break;
                // case '105':
                //     progress_check = '피부 측정 완료';
                //     break;
                // case '106':
                //     progress_check = '두피 측정 완료';
                //     break;
                case '107':
                    progress_check = '피부 상담';
                    break;
                case '108':
                    progress_check = '피부 상담 완료';
                    break;
                case '109':
                    progress_check = '두피 상담';
                    break;
                case '110':
                    progress_check = '두피 상담 완료';
                    break;
                case '111':
                    progress_check = '마이 스킨 솔루션';
                    break;
                // case '10':
                //     progress_check = '완료';
                //     break;    

                default:
                    progress_check = '확인 필요';
                    break;
            }
            data.progress_check = progress_check;
            console.log("data.progress_check : ", data.progress_check);


            var visit_count = 0; //프로그램별 방문회차 카운트
            $.ajax({
                url: API_URL + '?name=' + data.name + '&phone=' + data.phone + '&pageSize=30',


                type: 'GET',
                success: function (response) {
                    console.log('=====================');
                    console.log('리스트 별 고객검색 결과 성공 : ', response);


                    //프로그램별 방문회차 카운트 입력1 
                    // visit_count = response.filter(item => item.ProgramCode === data.ProgramCode && data.rsvn_date >= item.rsvn_date).length;
                    // console.log('프로그램 방문회차 visit_count : ', visit_count);

                    // data.visitCount = visit_count;
                    // console.log('프로그램 방문회차 data.visitCount : ', data.visitCount);

                    visit_rsvn_date = data.rsvn_date.substring(0, 10).replace('-', '. ').replace('-', '. ');//해당고객 방문 날짜   

                    // raw_rsvn_date = data.rsvn_date; //피부 결과, 두피결과, 마이스킨솔루션 프로그램 측정회차 카운트용 1
                    // raw_rsvn_time = data.rsvn_time; //피부 결과, 두피결과, 마이스킨솔루션 프로그램 측정회차 카운트용 2


                    //프로그램별 방문회차 카운트 입력2 (같은날짜, 시간대 고려)
                    var select_visit1 = 0 //다른날짜
                    select_visit1 = response.filter(item => item.ProgramCode === data.ProgramCode && data.rsvn_date > item.rsvn_date).length;
                    console.log("select_visit1 데이터 값 : ", response.filter(item => item.ProgramCode === data.ProgramCode && data.rsvn_date > item.rsvn_date))

                    var select_visit2 = 0 //같은날짜
                    select_visit2 = response.filter(item => item.ProgramCode === data.ProgramCode && data.rsvn_date === item.rsvn_date && data.rsvn_time >= item.rsvn_time).length;
                    console.log("select_visit1 데이터 값 : ", response.filter(item => item.ProgramCode === data.ProgramCode && data.rsvn_date === item.rsvn_date && data.rsvn_time >= item.rsvn_time))

                    data.visitCount = select_visit1 + select_visit2;




                    //비동기적으로 html을 로드
                    template.prepend($('#visit-item'), $('#visit-list'), data, function () {
                        // todo define
                    });


                },

                error: function (xhr, status, error) {
                    console.error('리스트 별 고객검색 결과  에러 : ', error);
                }
            })

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

var search_custom_name = "홍김똥";
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
            console.log("고객 리스트별 data 값 : ", data);

            page_param.totalCount = data.total_count

            // data.index = idx + 1;
            data.index = list.length - idx; //배열 revers, idx도 역순으로

            //rsvn_date 날짜 변경
            var change_date = data.rsvn_date.slice(0, 10);
            data.rsvn_date_split = change_date;




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
            data.reservationType = reservationType;



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
            data.ProgramName = programName;



            //핸드폰 번호 뒷자리만
            var lastPhonNum = '';
            lastPhonNum = data.phone.substring(7, 11);
            data.phone_last = lastPhonNum;

            //생년월일 yyyy-mm-dd
            var changeBirthday = '';
            changeBirthday = data.birthdate.substring(0, 4) + '-' + data.birthdate.substring(4, 6) + '-' + data.birthdate.substring(6, 8);
            data.changeBirthday = changeBirthday;


            console.log("*****url : ", API_URL + '?name=' + data.name + '&phone=' + data.phone + '&pageSize=30')

            var visit_count = 0; //프로그램별 방문회차 카운트
            $.ajax({
                url: API_URL + '?name=' + data.name + '&phone=' + data.phone + '&pageSize=30',


                type: 'GET',
                success: function (response) {
                    console.log('=====================');
                    console.log('리스트 별 고객검색 결과 성공 : ', response);


                    //프로그램별 방문회차 카운트 입력1 
                    // visit_count = response.filter(item => item.ProgramCode === data.ProgramCode && data.rsvn_date >= item.rsvn_date).length;
                    // console.log('프로그램 방문회차 visit_count : ', visit_count);

                    // data.visitCount = visit_count;
                    // console.log('프로그램 방문회차 data.visitCount : ', data.visitCount);

                    visit_rsvn_date = data.rsvn_date.substring(0, 10).replace('-', '. ').replace('-', '. ');//해당고객 방문 날짜   

                    // raw_rsvn_date = data.rsvn_date; //피부 결과, 두피결과, 마이스킨솔루션 프로그램 측정회차 카운트용 1
                    // raw_rsvn_time = data.rsvn_time; //피부 결과, 두피결과, 마이스킨솔루션 프로그램 측정회차 카운트용 2


                    //프로그램별 방문회차 카운트 입력2 (같은날짜, 시간대 고려)
                    var select_visit1 = 0 //다른날짜
                    select_visit1 = response.filter(item => item.ProgramCode === data.ProgramCode && data.rsvn_date > item.rsvn_date).length;
                    console.log("select_visit1 데이터 값 : ", response.filter(item => item.ProgramCode === data.ProgramCode && data.rsvn_date > item.rsvn_date))

                    var select_visit2 = 0 //같은날짜
                    select_visit2 = response.filter(item => item.ProgramCode === data.ProgramCode && data.rsvn_date === item.rsvn_date && data.rsvn_time >= item.rsvn_time).length;
                    console.log("select_visit1 데이터 값 : ", response.filter(item => item.ProgramCode === data.ProgramCode && data.rsvn_date === item.rsvn_date && data.rsvn_time >= item.rsvn_time))

                    data.visitCount = select_visit1 + select_visit2;




                    //비동기적으로 html을 로드
                    template.prepend($('#visit-item-name'), $('#visit-list-name'), data, function () {
                        // todo define
                    });


                },

                error: function (xhr, status, error) {
                    console.error('리스트 별 고객검색 결과  에러 : ', error);
                }
            })


            // template.prepend($('#visit-item-name'), $('#visit-list-name'), data, function () {
            //     // todo define
            // });
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


function openMsgLayer(name, phone, birthdate, sex, userkey, surveyNo, email, vst_path, ucstmid, rsvn_date, rsvn_time, ProgramCode, visitkey, skey, ProgramCode, progress_flg) {
    // 여기에서 msg-layer를 열거나 필요한 작업을 수행하세요.

    console.log("========================");
    $('.proposal-layer').addClass('open');

    localStorage.removeItem('custom_sex');
    localStorage.removeItem('custom_name');
    localStorage.removeItem('custom_userkey');
    localStorage.removeItem('custom_surveyNo');
    localStorage.removeItem('visitDate');

    localStorage.removeItem('AgeReal');
    localStorage.removeItem('custom_ucstmid');
    localStorage.removeItem('custom_sex');
    localStorage.removeItem('custom_phone');

    localStorage.removeItem('visit_rsvn_date');
    localStorage.removeItem('raw_rsvn_date');
    localStorage.removeItem('raw_rsvn_time');
    localStorage.removeItem('ProgramCode');
    localStorage.removeItem('visitkey');
    localStorage.removeItem('skey');
    localStorage.removeItem('ProgramCode');

    localStorage.removeItem('custom_markvu');
    localStorage.removeItem('custom_antera');
    localStorage.removeItem('custom_cutometer');
    localStorage.removeItem('custom_vapometer');
    localStorage.removeItem('custom_asm');

    localStorage.removeItem('custom_skinResult');
    localStorage.removeItem('custom_sculpResult');

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


    var AgeReal = calculateAge(birthdate);
    console.log("진짜 나이는 : ", AgeReal);

    localStorage.setItem('custom_sex', sex);
    localStorage.setItem('custom_name', name);
    localStorage.setItem('custom_userkey', userkey);
    localStorage.setItem('custom_surveyNo', surveyNo);

    var rsvn_date_after = rsvn_date.substring(0, 10).replace('-', '. ').replace('-', '. ');//해당고객 방문 날짜   

    localStorage.setItem('AgeReal', AgeReal);
    localStorage.setItem('custom_ucstmid', ucstmid);
    localStorage.setItem('custom_sex', sex);
    localStorage.setItem('custom_phone', phone);
    localStorage.setItem('visit_rsvn_date', rsvn_date_after);

    localStorage.setItem('raw_rsvn_date', rsvn_date);
    localStorage.setItem('raw_rsvn_time', rsvn_time);
    localStorage.setItem('ProgramCode', ProgramCode);
    localStorage.setItem('visitkey', visitkey);
    localStorage.setItem('skey', skey);
    localStorage.setItem('ProgramCode', ProgramCode);
    localStorage.setItem('progress_flg', progress_flg);


    $('.custom_name').text(name);
}



Handlebars.registerHelper('maskName', function (name) {
    if (name.length < 3) {
        return name.charAt(0) + '*';
    }
    return name.charAt(0) + '*'.repeat(name.length - 2) + name.charAt(name.length - 1);
});






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


