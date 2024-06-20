var API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/skin/concern/';
var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 10,
    startIndex: 0,
}
$(document).ready(function () {
    fnGetList(page_param);
    console.log('paramObj : ', paramObj)
});

var fnGetList = function (param) {
    // console.log('    $('#skin_concern_list').find('tr').remove();
    ajax.get(API_URL, param, function (result) {
        var list = result;
        $.each(list, function (idx, data) {
            page_param.totalCount = data.total_count
            template.prepend($('#skin_concern_item'), $('#skin_concern_list'), data, function () {
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
    var result = $('#skin_concern_form').isValidate();
    return result;
}

var fnPost = function () {
    if (fnValidate()) {
        var param = $('#skin_concern_form').json();
        ajax.post(API_URL, param, function (result) {
            console.log('result:', result)
            $('#skin_concern_form').clear()
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