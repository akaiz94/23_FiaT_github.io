var API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/mb/manager/login'

$(document).ready(function () {
    

    $('#loginButton').on('click', function (e) {
        e.preventDefault(); // 기본 폼 제출 방지
        login();
    });
});

function login() {
    var formData = {
        ManagerID: $("#ManagerID").val(),
        Password: $("#Password").val(),
    };
    console.log("formData: {}", formData);
    $.ajax({
        type: "POST",
        url: API_URL,
        data: JSON.stringify(formData),
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            // 로그인 성공 시 처리
            localStorage.setItem("access_token", response.access_token);
            $("#loginResult").html("로그인 성공!");

            localStorage.setItem('manager_name', response.manager.Name);

            console.log("Manager_API_URL 응답값 : ", response);
            console.log('manager_name : ', response.Name);
            // 페이지 이동 또는 다른 동작 수행
            location.href = "/"
        },
        error: function (error) {
            // 로그인 실패 시 처리
            console.error("로그인 실패:", error);
            if (error.status === 401) {
                $("#loginResult").html("로그인 실패: " + error.responseJSON.detail);
                showErrorModal()
            } else {
                $("#loginResult").html("로그인 실패: 서버 오류");
            }
        },
    });
}


// {
//     type: "POST",
//         url: "https://amore-citylab.amorepacific.com:8000/v1/mb/manager/login",
//     data: JSON.stringify(formData),
//     contentType: "application/json",
//     dataType: "json", // 서버에서 받을 데이터 타입
//     success: function(response) {
//     // 로그인 성공 시 처리
//     $("#loginResult").html("로그인 성공!");
//     // 페이지 이동 또는 다른 동작 수행
// },
//     error: function(error) {
//         // 로그인 실패 시 처리
//         console.error("로그인 실패:", error);
//         $("#loginResult").html("로그인 실패: " + error.responseJSON.message);
//     }
// }


/*
});*/

// var page_param = {
//     totalCount: 5,
//     currentPage: 1,
//     pageSize: 1000,
//     startIndex: 0,
// }

// var Manager_API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/mb/manager/';

// $(document).ready(function () {

//     console.log('login page start -> ');

//     console.log("custom_userkey : ", localStorage.getItem('custom_userkey'));
//     console.log("custom_surveyNo : ", localStorage.getItem('custom_surveyNo'));

//     var surveyNo = localStorage.getItem('custom_surveyNo');
//     console.log('surveyNo : ', surveyNo);




//     $('#loginButton').on('click', function (event) {
//         event.preventDefault();
//         var login_id = $('#login_id').val();
//         var login_pw = $('#login_pw').val();

//         console.log("login_id : ", login_id);
//         console.log("login_pw : ", login_pw);


//         $.ajax({
//             url: Manager_API_URL + login_id,
//             type: 'GET',
//             contentType: 'application/json',

//             success: function (response) {
//                 localStorage.setItem('manager_name', response.Name);

//                 console.log("Manager_API_URL 응답값 : ", response);
//                 console.log('manager_name : ', response.Name);

//                 window.location.href = './index.html';


//             }, error: function (xhr, status, error) {
//                 console.error('Manager_API_URL 오류 : ', error);
//                 showErrorModal();
//             }
//         })



//     })
// });


function showErrorModal() {
    $('.search-result-layer').addClass('open');
    console.log("에러 모달창");
}





