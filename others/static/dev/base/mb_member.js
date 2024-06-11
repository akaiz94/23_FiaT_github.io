var API_URL = 'http://localhost:8000/v1/mb/member/';
var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 10,
    startIndex: 0,
}
$(document).ready(function () {
    fnGetList(page_param);
    console.log('paramObj : ', paramObj)

    $('#searchForm').on('submit', function (e) {
        e.preventDefault();
        fnSearch();
    })
});

var fnGetList = function (param) {
    // console.log('    $('#mb_member_list').find('tr').remove();
    ajax.get(API_URL, param, function (result) {
        var list = result;
        $('#mb_member_list').find('tr').remove();
        $.each(list, function (idx, data) {
            page_param.totalCount = data.total_count
            template.prepend($('#mb_member_item'), $('#mb_member_list'), data, function () {
                // data transfer here
            });
        })
        fnSetUI('list');
        fnAddPagenation();
    });
}

var fnSearch = function () {
    var params = $('#searchForm').json();
    page_param = Object.assign({}, params, page_param);
    fnGetList(page_param)
}

var fnGetDetail = function (id) {
    $('#content_detail').set(API_URL + id, {}, function (result) {
        fnSetUI('detail')
    });
}

var fnValidate = function () {
    var result = $('#mb_member_form').isValidate();
    return result;
}

var fnPost = function () {
    if (fnValidate()) {
        var param = $('#mb_member_form').json();
        ajax.post(API_URL, param, function (result) {
            console.log('result:', result)
            $('#mb_member_form').clear()
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