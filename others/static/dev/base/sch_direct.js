var API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/sch/direct/';
var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 1000,
    startIndex: 0,
}
$(document).ready(function () {
    fnGetList(page_param);
    console.log('paramObj : ', paramObj)
});

var fnGetList = function (param) {
    ajax.get(API_URL, param, function (result) {
        var list = result;
        $('#sch_direct_list').find('tr').remove();
        $.each(list, function (idx, data) {
            page_param.totalCount = data.total_count
            template.prepend($('#sch_direct_item'), $('#sch_direct_list'), data, function () {
                // data transfer here
            });
        })
        fnSetUI('list');
        fnAddPagenation();
    });
}

var fnGetDetail = function (id) {
    $('#content_detail').set(API_URL + id, {}, function (result) {
        fnSetUI('detail')
    });
}

var fnValidate = function () {
    var result = $('#sch_direct_form').isValidate();
    return result;
}

var fnPost = function () {
    if (fnValidate()) {
        var param = $('#sch_direct_form').json();
        ajax.post(API_URL, param, function (result) {
            console.log('result:', result)
            $('#sch_direct_form').clear()
            fnGetList()
        });
    }
}

var fnSetUI = function (cmd) {
    let cmds = ['list', 'detail', 'write']
    const section = '#content_'
    cmds.forEach(function (c) {
        sect = section + c;
        $(sect).hide();
    });
    $(section + cmd).show();
    window.scrollTo(0, 0);
}

var fnAddPagenation = function () {
    $('#pagination').addPage(page_param);
}

var fnSetCurrentPage = function (num) {
    page_param.currentPage = num
    page_param.startIndex = (num - 1) * page_param.pageSize
    fnGetList(page_param)
}