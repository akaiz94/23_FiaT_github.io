var API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/visit/merged/list';


var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 1000,
    startIndex: 0,
}

var page_param_name = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 1000,
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
    console.log('## fnGetVisitList call');
    $('#visit-list > tr').remove();

    ajax.get(API_URL + '?rsvn_date=' + search_date, param, function (result) {

        list = result;

        list = list.filter(item => item.cancelYN !== "3");
        list.sort((a, b) => {
            // Convert rsvn_time to comparable format (24-hour time)
            let timeA = a.rsvn_time.padStart(4, '0'); // Ensure it is 4 characters
            let timeB = b.rsvn_time.padStart(4, '0'); // Ensure it is 4 characters
            return timeB.localeCompare(timeA);
        });

        console.log("fnGetVisitList 의 result(list): ", list);
        console.log("list개수 : ", list.length);

        // 비동기 요청을 추적하기 위한 배열
        var promises = [];

        $.each(list, function (idx, data) {
            console.log("고객 리스트별 data 값 : ", data);

            //시간에 세미콜론 추가
            let rsvn_time_colon = ''
            if (data.rsvn_time.length === 4) {
                rsvn_time_colon = data.rsvn_time.slice(0, 2) + ':' + data.rsvn_time.slice(2);
            } else {
                rsvn_time_colon = data.rsvn_time;
            }
            data.rsvn_time_colon = rsvn_time_colon;

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
                case '0':
                    progress_check = '대기';
                    break;
                case '1':
                    progress_check = '대기';
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
                default:
                    progress_check = '확인 필요';
                    break;
            }
            data.progress_check = progress_check;
            console.log("data.progress_check : ", data.progress_check);

            // 비동기 요청을 Promise 배열에 저장
            var promise = new Promise(function (resolve, reject) {
                $.ajax({
                    url: API_URL + '?name=' + data.name + '&phone=' + data.phone + '&pageSize=1000',
                    type: 'GET',
                    success: function (response) {
                        console.log('=====================');
                        console.log('리스트 별 고객검색 결과 성공 : ', response);
                        //해당고객 방문 날짜   
                        visit_rsvn_date = data.rsvn_date.substring(0, 10).replace('-', '. ').replace('-', '. ');

                        // 프로그램별 방문회차 카운트 입력2 (같은날짜, 시간대 고려)
                        let select_visit1 = 0; // 다른날짜
                        select_visit1 = response.filter(item =>
                            item.ProgramCode === data.ProgramCode &&
                            data.rsvn_date > item.rsvn_date &&
                            item.cancelYN !== "3"
                        ).length;
                        console.log("select_visit1 데이터 값 : ", response.filter(item =>
                            item.ProgramCode === data.ProgramCode &&
                            data.rsvn_date > item.rsvn_date &&
                            item.cancelYN !== "3"
                        ));

                        let select_visit2 = 0; // 같은날짜
                        select_visit2 = response.filter(item =>
                            item.ProgramCode === data.ProgramCode &&
                            data.rsvn_date === item.rsvn_date &&
                            data.rsvn_time >= item.rsvn_time &&
                            item.cancelYN !== "3"
                        ).length;
                        console.log("select_visit2 데이터 값 : ", response.filter(item =>
                            item.ProgramCode === data.ProgramCode &&
                            data.rsvn_date === item.rsvn_date &&
                            data.rsvn_time >= item.rsvn_time &&
                            item.cancelYN !== "3"
                        ));

                        data.visitCount = select_visit1 + select_visit2;
                        resolve(data); // 비동기 작업 완료 시 resolve
                    },
                    error: function (xhr, status, error) {
                        console.error('리스트 별 고객검색 결과 에러 : ', error);
                        reject(error); // 비동기 작업 실패 시 reject
                    }
                });
            });

            promises.push(promise); // Promise 배열에 추가
        });

        // 모든 비동기 작업이 완료된 후 데이터 추가
        Promise.all(promises).then(function (results) {
            results.forEach(function (data) {
                template.prepend($('#visit-item'), $('#visit-list'), data, function () {
                    // todo define
                });
            });




            // fnSetUI('list');
            fnAddPagenation();
        }).catch(function (error) {
            console.error('Error processing visit list:', error);
        });
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
    console.log('## fnGetVisitList_name call');
    $('#visit-list-name > tr').remove();

    ajax.get(API_URL + '?name=' + search_custom_name, param, function (result) {

        list = result;
        console.log("fnGetVisitList_name 의 result(list): ", list);
        list = list.filter(item => item.cancelYN !== "3");
        list.sort((a, b) => {
            // Convert rsvn_date to comparable format (24-hour time)
            let timeA = a.rsvn_date.padStart(4, '0'); // Ensure it is 4 characters
            let timeB = b.rsvn_date.padStart(4, '0'); // Ensure it is 4 characters
            return timeA.localeCompare(timeB);
        });

        console.log("fnGetVisitList_name의 정렬 후 result(list): ", list);
        console.log("list_name개수 : ", list.length);

        // 비동기 요청을 추적하기 위한 배열
        var promises = [];

        $.each(list, function (idx, data) {
            console.log("고객 리스트별 data 값 : ", data);

            //시간에 세미콜론 추가
            let rsvn_time_colon = ''
            if (data.rsvn_time.length === 4) {
                rsvn_time_colon = data.rsvn_time.slice(0, 2) + ':' + data.rsvn_time.slice(2);
            } else {
                rsvn_time_colon = data.rsvn_time;
            }
            data.rsvn_time_colon = rsvn_time_colon;


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



            // 비동기 요청을 Promise 배열에 저장
            var promise = new Promise(function (resolve, reject) {
                $.ajax({
                    url: API_URL + '?name=' + data.name + '&phone=' + data.phone + '&pageSize=1000',
                    type: 'GET',
                    success: function (response) {
                        console.log('=====================');
                        console.log('리스트 별 고객검색 결과 성공 : ', response);
                        //해당고객 방문 날짜   
                        visit_rsvn_date = data.rsvn_date.substring(0, 10).replace('-', '. ').replace('-', '. ');

                        // 프로그램별 방문회차 카운트 입력2 (같은날짜, 시간대 고려)
                        let select_visit1 = 0; // 다른날짜
                        select_visit1 = response.filter(item =>
                            item.ProgramCode === data.ProgramCode &&
                            data.rsvn_date > item.rsvn_date &&
                            item.cancelYN !== "3"
                        ).length;
                        console.log("select_visit1 데이터 값 : ", response.filter(item =>
                            item.ProgramCode === data.ProgramCode &&
                            data.rsvn_date > item.rsvn_date &&
                            item.cancelYN !== "3"
                        ));

                        let select_visit2 = 0; // 같은날짜
                        select_visit2 = response.filter(item =>
                            item.ProgramCode === data.ProgramCode &&
                            data.rsvn_date === item.rsvn_date &&
                            data.rsvn_time >= item.rsvn_time &&
                            item.cancelYN !== "3"
                        ).length;
                        console.log("select_visit2 데이터 값 : ", response.filter(item =>
                            item.ProgramCode === data.ProgramCode &&
                            data.rsvn_date === item.rsvn_date &&
                            data.rsvn_time >= item.rsvn_time &&
                            item.cancelYN !== "3"
                        ));

                        data.visitCount = select_visit1 + select_visit2;
                        resolve(data); // 비동기 작업 완료 시 resolve
                    },
                    error: function (xhr, status, error) {
                        console.error('리스트 별 고객검색 결과 에러 : ', error);
                        reject(error); // 비동기 작업 실패 시 reject
                    }
                });
            });

            promises.push(promise); // Promise 배열에 추가
        });

        // 모든 비동기 작업이 완료된 후 데이터 추가
        Promise.all(promises).then(function (results) {
            results.forEach(function (data) {
                template.prepend($('#visit-item-name'), $('#visit-list-name'), data, function () {
                    // todo define
                });
            });




            // fnSetUI('list');
            fnAddPagenation_name();
        }).catch(function (error) {
            console.error('Error processing visit list:', error);
        });
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


