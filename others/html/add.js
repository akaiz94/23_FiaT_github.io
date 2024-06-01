
var search_custom_name ="홍길동";
$('#search_name').click(function () {
    console.log('search_name click!!!');

    search_custom_name = $('input[name="search"]').val();
    console.log('성명:', search_custom_name);


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

