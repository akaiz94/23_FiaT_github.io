var API_URL = 'https://amore-citylab.amorepacific.com:8000/v1/cms/board/';
var page_param = {
    totalCount: 5,
    currentPage: 1,
    pageSize: 5,
    startIndex: 0,
    cont_div_cd: paramObj.board
}
$(document).ready(function () {
    fnGetboardList(page_param);
    console.log('paramObj : ', paramObj)
});

var fnGetboardList = function (param) {
    console.log('## fnGetboardList call')
    $('#board-list > tr').remove()
    ajax.get(API_URL, param, function (result) {
        var list = result;
        $.each(list, function (idx, data) {
            data.idx = idx
            template.prepend($('#board-item'), $('#board-list'), data, function () {
                // var title = `<a href="javascript:fnGetboardDetail()">`+data.title+`</a>`;
                // $('#board_title').html(title)
            });
        })
        fnSetUI('list');
        fnAddPagenation();
    });
}

var fnGetboardDetail = function (id) {
    $('#content_detail').set(API_URL + id, {}, function (result) {
        fnSetUI('detail')
    });
}

var fnValidate = function () {
    var result = $('#board_form').isValidate();
    return result;
}

var fuPostboard = function () {
    if (fnValidate()) {
        var param = $('#board_form').json();
        ajax.post(API_URL, param, function (result) {
            console.log('result:', result)
            $('#board_form').clear()
            fnGetboardList()
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
    fnGetboardList(page_param)
}