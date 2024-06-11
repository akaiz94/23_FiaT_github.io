var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 5,
    startIndex: 0,
}
$(document).ready(function () {
    window.scrollTo(0, 470);

    console.log('analysis3_result page start -> ')
    $('#manager_name').text(localStorage.getItem('manager_name'));
    $('#custom_name').text(localStorage.getItem('custom_name'));

    if (localStorage.getItem('manager_name').length === 2) {
        // $("#title_date").css("margin-right","90px");   
        document.getElementById("title_date").style.marginRight = "90px";
        document.getElementById("title_count").style.marginRight = "145px";
    }


    $('#visitDate').text(localStorage.getItem('visitDate'));



    $.ajax({
        url: 'https://citylab.amorepacific.com/gpiopeApi/genoResult2?btCustIdNo=100084743&btCustIdNoClassifiCode=01',
        type: 'GET',
        success: function (response) {
            console.log('유전자결과 응답 : ', response);

         
        },
        error: function (xhr, status, error) {
            console.error('유전자결과 에러 : ', error);
            ㄴ
        }
    })

});
